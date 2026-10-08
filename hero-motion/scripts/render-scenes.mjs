import { spawnSync } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";
import ffprobe from "ffprobe-static";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const portfolioRoot = path.resolve(projectRoot, "..");
const outputDir = path.join(portfolioRoot, "public", "media", "hero");
const renderDir = path.join(projectRoot, "renders");
const scenes = [
  "home-hero",
  "about-hero",
  "projects-hero",
  "resume-hero",
  "contact-hero",
  "services-section",
];
const ffprobePath = ffprobe.path;

if (!ffmpegPath || !ffprobePath) {
  throw new Error("The local FFmpeg or FFprobe binary is unavailable. Reinstall hero-motion dev dependencies.");
}

const renderEnv = {
  ...process.env,
  HYPERFRAMES_FFMPEG_PATH: ffmpegPath,
  HYPERFRAMES_FFPROBE_PATH: ffprobePath,
};

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    env: renderEnv,
    encoding: "utf8",
    stdio: options.inherit ? "inherit" : "pipe",
    shell: process.platform === "win32" && command === "npx",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    const output = [result.stdout, result.stderr].filter(Boolean).join("\n");
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}.\n${output}`);
  }
  return result.stdout ?? "";
}

function encode(args) {
  const result = spawnSync(ffmpegPath, args, {
    cwd: projectRoot,
    env: renderEnv,
    encoding: "utf8",
    stdio: "pipe",
    windowsHide: true,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`FFmpeg failed with exit code ${result.status}.\n${result.stderr}`);
  }
}

async function verifyVideo(filePath, scene, expectedDuration = 6, expectedWidth = 1280, expectedHeight = 720) {
  const details = JSON.parse(run(ffprobePath, [
    "-v", "error",
    "-select_streams", "v:0",
    "-show_entries", "stream=width,height,r_frame_rate,codec_name",
    "-show_entries", "format=duration",
    "-of", "json",
    filePath,
  ]));
  const video = details.streams?.[0];
  const duration = Number(details.format?.duration);
  const fileSize = (await stat(filePath)).size;

  if (video?.width !== expectedWidth || video?.height !== expectedHeight) {
    throw new Error(`${filePath} is ${video?.width}x${video?.height}, expected ${expectedWidth}x${expectedHeight}.`);
  }
  if (!Number.isFinite(duration) || Math.abs(duration - expectedDuration) > 0.08) {
    throw new Error(`${filePath} is ${duration}s, expected ${expectedDuration} seconds.`);
  }
  if (expectedDuration === 6 && fileSize >= 2_000_000) {
    throw new Error(`${scene} output is ${(fileSize / 1_000_000).toFixed(2)} MB; lower its encode bitrate.`);
  }
  console.log(`${path.basename(filePath)} · ${video.codec_name} · ${duration.toFixed(3)}s · ${(fileSize / 1_000_000).toFixed(2)} MB`);
}

await mkdir(outputDir, { recursive: true });
await mkdir(renderDir, { recursive: true });

const master = path.join(renderDir, "portfolio-hero-scenes-1920.mp4");
run("npx", [
  "--yes", "hyperframes@0.8.141", "render",
  "--format", "mp4",
  "--video-bitrate", "8M",
  "--workers", "1",
  "--output", master,
], { inherit: true });
await verifyVideo(master, "combined source", scenes.length * 6, 1920, 1080);

for (const [index, scene] of scenes.entries()) {
  const mp4 = path.join(outputDir, `${scene}.mp4`);
  const webm = path.join(outputDir, `${scene}.webm`);
  const poster = path.join(outputDir, `${scene}.jpg`);

  encode([
    "-y", "-ss", String(index * 6), "-i", master, "-t", "6",
    "-vf", "scale=1280:720:flags=lanczos,format=yuv420p",
    "-an", "-c:v", "libx264", "-preset", "slow", "-profile:v", "high",
    "-b:v", "1600k", "-maxrate", "1600k", "-bufsize", "3200k",
    "-g", "180", "-movflags", "+faststart", mp4,
  ]);
  encode([
    "-y", "-ss", String(index * 6), "-i", master, "-t", "6",
    "-vf", "scale=1280:720:flags=lanczos,format=yuv420p",
    "-an", "-c:v", "libvpx-vp9", "-deadline", "good", "-cpu-used", "4",
    "-b:v", "1500k", "-row-mt", "1", webm,
  ]);
  encode(["-y", "-i", mp4, "-frames:v", "1", "-q:v", "2", poster]);

  await verifyVideo(mp4, `${scene} MP4`);
  await verifyVideo(webm, `${scene} WebM`);
  console.log(`${path.basename(poster)} · ${( (await stat(poster)).size / 1000).toFixed(0)} KB`);
}
