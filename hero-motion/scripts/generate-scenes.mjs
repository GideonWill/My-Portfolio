import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const compositionDir = path.join(projectRoot, "compositions");
const width = 1920;
const height = 1080;
const duration = 6;
const halfCycle = ((duration * 30) - 1) / 60;

const particles = [
  [8, 18, 3], [15, 72, 2], [21, 34, 3], [29, 84, 2], [36, 22, 2],
  [43, 58, 3], [51, 13, 2], [57, 91, 3], [64, 39, 2], [69, 77, 3],
  [76, 24, 2], [82, 61, 3], [89, 32, 2], [94, 82, 3], [12, 46, 2],
  [32, 49, 3], [47, 81, 2], [73, 53, 2], [86, 12, 3], [55, 29, 2],
].map(([x, y, size]) => `<i class="particle" style="--x:${x}%;--y:${y}%;--size:${size}px"></i>`).join("");

const scenes = [
  {
    id: "home-hero",
    content: `
      <div class="aurora aurora-wine"></div>
      <div class="aurora aurora-blue"></div>
      <div class="aurora aurora-soft"></div>
      <div class="particle-field">${particles}</div>
      <div class="horizon-glow"></div>`,
    styles: `
      .aurora { position:absolute; border-radius:50%; filter:blur(110px); mix-blend-mode:screen; }
      .aurora-wine { left:6%; top:19%; width:42%; height:52%; background:radial-gradient(ellipse,rgba(194,30,86,.56),rgba(194,30,86,.08) 54%,transparent 74%); }
      .aurora-blue { right:2%; top:1%; width:50%; height:68%; background:radial-gradient(ellipse,rgba(47,91,255,.40),rgba(47,91,255,.07) 57%,transparent 75%); }
      .aurora-soft { right:26%; bottom:4%; width:42%; height:36%; background:radial-gradient(ellipse,rgba(255,77,141,.20),transparent 68%); }
      .particle-field { position:absolute; inset:3% 2%; }
      .particle { position:absolute; left:var(--x); top:var(--y); width:var(--size); height:var(--size); border-radius:50%; background:rgba(255,255,255,.88); box-shadow:0 0 12px rgba(233,238,255,.75); opacity:.76; }
      .horizon-glow { position:absolute; right:8%; bottom:14%; width:47%; height:1px; background:linear-gradient(90deg,transparent,rgba(233,238,255,.24),rgba(255,77,141,.42),transparent); filter:blur(2px); }`,
    animation: `
      tl.to(".aurora-wine",{x:82,y:-30,scale:1.06,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".aurora-blue",{x:-74,y:32,scale:1.04,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".aurora-soft",{x:36,y:-22,opacity:0.62,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".particle-field",{x:24,y:-18,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".particle",{opacity:0.32,duration:HALF/2,ease:"sine.inOut",yoyo:true,repeat:3},0);`,
  },
  {
    id: "about-hero",
    content: `
      <div class="ambient-glow glow-wine"></div>
      <div class="ambient-glow glow-blue"></div>
      <div class="orbit orbit-outer"><i class="orbit-light light-wine"></i></div>
      <div class="orbit orbit-middle"><i class="orbit-light light-blue"></i></div>
      <div class="orbit orbit-inner"><i class="orbit-light light-white"></i></div>
      <div class="center-light"></div>`,
    styles: `
      .ambient-glow { position:absolute; width:38%; height:54%; border-radius:50%; filter:blur(110px); opacity:.46; }
      .glow-wine { left:16%; top:25%; background:radial-gradient(ellipse,rgba(194,30,86,.62),transparent 68%); }
      .glow-blue { right:12%; bottom:2%; background:radial-gradient(ellipse,rgba(47,91,255,.46),transparent 70%); }
      .orbit { position:absolute; left:50%; top:50%; border:1px solid rgba(233,238,255,.17); border-radius:50%; }
      .orbit-outer { width:590px; height:590px; margin:-295px 0 0 -295px; }
      .orbit-middle { width:430px; height:430px; margin:-215px 0 0 -215px; border-color:rgba(233,238,255,.12); }
      .orbit-inner { width:270px; height:270px; margin:-135px 0 0 -135px; border-color:rgba(255,77,141,.2); }
      .orbit::after { position:absolute; inset:14%; content:""; border:1px solid rgba(47,91,255,.12); border-radius:50%; }
      .orbit-light { position:absolute; top:-8px; left:50%; width:15px; height:15px; margin-left:-7px; border-radius:50%; }
      .light-wine { background:#FF4D8D; box-shadow:0 0 22px 7px rgba(255,77,141,.54); }
      .light-blue { top:auto; bottom:-6px; width:12px; height:12px; margin-left:-6px; background:#2F5BFF; box-shadow:0 0 22px 7px rgba(47,91,255,.62); }
      .light-white { top:50%; left:auto; right:-5px; width:9px; height:9px; margin:0; background:#fff; box-shadow:0 0 17px 5px rgba(233,238,255,.56); }
      .center-light { position:absolute; left:50%; top:50%; width:110px; height:110px; margin:-55px 0 0 -55px; border:1px solid rgba(233,238,255,.18); border-radius:50%; background:radial-gradient(circle,rgba(255,77,141,.2),rgba(10,18,64,.08) 68%); box-shadow:0 0 80px rgba(47,91,255,.15); }`,
    animation: `
      tl.to(".orbit-outer",{rotation:360,duration:CYCLE,ease:"none"},0);
      tl.to(".orbit-middle",{rotation:-360,duration:CYCLE,ease:"none"},0);
      tl.to(".orbit-inner",{rotation:360,duration:CYCLE,ease:"none"},0);
      tl.to(".glow-wine",{x:30,y:-18,opacity:0.62,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".glow-blue",{x:-28,y:20,opacity:0.4,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".center-light",{scale:1.12,opacity:0.72,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);`,
  },
  {
    id: "projects-hero",
    content: `
      <div class="glass-card card-back"><i></i><i></i><i></i></div>
      <div class="glass-card card-left"><i></i><i></i><i></i><i></i></div>
      <div class="glass-card card-center"><i></i><i></i><i></i><i></i></div>
      <div class="glass-card card-right"><i></i><i></i><i></i></div>
      <div class="glass-card card-front"><i></i><i></i><i></i></div>
      <div class="streak streak-one"></div>
      <div class="streak streak-two"></div>
      <div class="streak streak-three"></div>
      <div class="floor-glow"></div>`,
    styles: `
      .glass-card { position:absolute; width:250px; height:310px; padding:34px 28px; border:1px solid rgba(233,238,255,.25); border-radius:22px; background:linear-gradient(145deg,rgba(255,255,255,.12),rgba(47,91,255,.05) 48%,rgba(194,30,86,.1)); box-shadow:inset 0 1px rgba(255,255,255,.14),0 35px 90px rgba(2,8,35,.35); backdrop-filter:blur(14px); }
      .glass-card i { display:block; height:7px; margin:18px 0; border-radius:9px; background:linear-gradient(90deg,rgba(233,238,255,.55),rgba(233,238,255,.08)); }
      .glass-card i:first-child { width:70%; height:42px; margin-top:0; border:1px solid rgba(255,255,255,.08); border-radius:12px; background:linear-gradient(115deg,rgba(194,30,86,.66),rgba(47,91,255,.64)); }
      .glass-card i:nth-child(2) { width:88%; }
      .glass-card i:nth-child(3) { width:58%; }
      .glass-card i:nth-child(4) { width:76%; }
      .card-back { top:14%; left:28%; width:205px; height:260px; opacity:.42; }
      .card-left { top:30%; left:10%; width:220px; height:280px; opacity:.7; }
      .card-center { top:13%; left:39%; width:265px; height:330px; border-color:rgba(255,77,141,.34); }
      .card-right { top:27%; right:10%; width:230px; height:286px; opacity:.74; }
      .card-front { top:52%; right:28%; width:190px; height:238px; opacity:.5; }
      .streak { position:absolute; height:2px; transform-origin:left center; border-radius:50%; background:linear-gradient(90deg,transparent,rgba(233,238,255,.85),rgba(255,77,141,.76),transparent); box-shadow:0 0 16px rgba(255,77,141,.34); }
      .streak-one { top:28%; left:7%; width:34%; }
      .streak-two { top:69%; right:5%; width:30%; background:linear-gradient(90deg,transparent,rgba(47,91,255,.78),rgba(233,238,255,.62),transparent); }
      .streak-three { top:83%; left:26%; width:27%; height:1px; opacity:.7; }
      .floor-glow { position:absolute; left:16%; right:16%; bottom:8%; height:110px; border-radius:50%; background:radial-gradient(ellipse,rgba(47,91,255,.17),transparent 72%); filter:blur(30px); }`,
    animation: `
      tl.to(".card-back",{x:-16,y:18,rotation:-2,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".card-left",{x:-24,y:-18,rotation:2,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".card-center",{x:8,y:20,rotation:-1.2,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".card-right",{x:24,y:-15,rotation:1.8,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".card-front",{x:-12,y:-16,rotation:1.2,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".streak-one",{scaleX:0.38,opacity:0.24,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".streak-two",{scaleX:0.42,opacity:0.2,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".streak-three",{scaleX:0.36,opacity:0.16,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);`,
  },
  {
    id: "resume-hero",
    content: `
      <div class="ambient-glow glow-wine"></div>
      <div class="ambient-glow glow-blue"></div>
      <div class="folio folio-back"><i></i><i></i><i></i></div>
      <div class="folio folio-mid"><i></i><i></i><i></i><i></i></div>
      <div class="folio folio-front"><i></i><i></i><i></i><i></i><i></i></div>
      <div class="orbit-halo"></div>`,
    styles: `
      .ambient-glow { position:absolute; width:34%; height:52%; border-radius:50%; filter:blur(100px); opacity:.42; }
      .glow-wine { left:16%; top:17%; background:radial-gradient(ellipse,rgba(194,30,86,.62),transparent 68%); }
      .glow-blue { right:13%; bottom:5%; background:radial-gradient(ellipse,rgba(47,91,255,.5),transparent 70%); }
      .folio { position:absolute; top:50%; left:50%; padding:42px; border:1px solid rgba(233,238,255,.22); border-radius:18px; background:linear-gradient(140deg,rgba(233,238,255,.12),rgba(47,91,255,.04) 54%,rgba(194,30,86,.1)); box-shadow:inset 0 1px rgba(255,255,255,.16),0 35px 100px rgba(0,0,0,.26); backdrop-filter:blur(15px); }
      .folio i { display:block; height:7px; margin:23px 0; border-radius:8px; background:linear-gradient(90deg,rgba(233,238,255,.62),rgba(233,238,255,.06)); }
      .folio i:first-child { width:68%; height:46px; margin-top:0; background:linear-gradient(110deg,rgba(194,30,86,.48),rgba(47,91,255,.52)); }
      .folio i:nth-child(2) { width:90%; }
      .folio i:nth-child(3) { width:64%; }
      .folio i:nth-child(4) { width:78%; }
      .folio-back { width:360px; height:450px; margin:-252px 0 0 -98px; opacity:.34; }
      .folio-mid { width:390px; height:490px; margin:-226px 0 0 -245px; opacity:.6; }
      .folio-front { width:400px; height:500px; margin:-250px 0 0 -105px; border-color:rgba(255,77,141,.3); }
      .orbit-halo { position:absolute; top:50%; left:50%; width:760px; height:760px; margin:-380px 0 0 -380px; border:1px solid rgba(233,238,255,.1); border-radius:50%; box-shadow:0 0 100px rgba(47,91,255,.09); }`,
    animation: `
      tl.to(".folio-back",{x:28,y:-20,rotation:3,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".folio-mid",{x:-26,y:14,rotation:-2,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".folio-front",{x:10,y:22,rotation:1,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".glow-wine",{x:22,y:16,opacity:0.56,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".glow-blue",{x:-20,y:-14,opacity:0.32,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".orbit-halo",{rotation:8,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);`,
  },
  {
    id: "contact-hero",
    content: `
      <div class="aurora aurora-wine"></div>
      <div class="aurora aurora-blue"></div>
      <div class="aurora aurora-veil"></div>
      <div class="pulse-ring ring-one"></div>
      <div class="pulse-ring ring-two"></div>`,
    styles: `
      .aurora { position:absolute; border-radius:50%; filter:blur(130px); }
      .aurora-wine { left:12%; top:18%; width:40%; height:58%; background:radial-gradient(ellipse,rgba(194,30,86,.48),rgba(194,30,86,.06) 56%,transparent 74%); }
      .aurora-blue { right:8%; top:2%; width:46%; height:66%; background:radial-gradient(ellipse,rgba(47,91,255,.36),rgba(47,91,255,.05) 58%,transparent 76%); }
      .aurora-veil { left:34%; bottom:2%; width:44%; height:28%; background:radial-gradient(ellipse,rgba(255,77,141,.15),transparent 70%); }
      .pulse-ring { position:absolute; top:50%; left:50%; border:1px solid rgba(233,238,255,.12); border-radius:50%; }
      .ring-one { width:570px; height:570px; margin:-285px 0 0 -285px; }
      .ring-two { width:760px; height:760px; margin:-380px 0 0 -380px; border-color:rgba(255,77,141,.11); }`,
    animation: `
      tl.to(".aurora-wine",{x:30,y:18,scale:1.035,opacity:0.72,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".aurora-blue",{x:-26,y:-14,scale:1.03,opacity:0.72,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".aurora-veil",{x:18,y:-12,opacity:0.48,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".ring-one",{scale:1.035,opacity:0.64,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".ring-two",{scale:0.98,opacity:0.6,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);`,
  },
  {
    id: "services-section",
    content: `
      <div class="network-glow glow-wine"></div>
      <div class="network-glow glow-blue"></div>
      <svg class="network" viewBox="0 0 1920 1080" aria-hidden="true">
        <path class="wire wire-one" d="M330 690 C540 390 710 370 940 540" />
        <path class="wire wire-two" d="M940 540 C1160 710 1330 670 1580 390" />
        <path class="wire wire-three" d="M330 690 C650 840 1240 850 1580 390" />
      </svg>
      <i class="network-node node-one"></i>
      <i class="network-node node-two"></i>
      <i class="network-node node-three"></i>`,
    styles: `
      .network-glow { position:absolute; width:38%; height:44%; border-radius:50%; filter:blur(105px); opacity:.24; }
      .glow-wine { left:5%; top:37%; background:radial-gradient(ellipse,rgba(194,30,86,.65),transparent 70%); }
      .glow-blue { right:4%; top:15%; background:radial-gradient(ellipse,rgba(47,91,255,.58),transparent 70%); }
      .network { position:absolute; inset:0; width:100%; height:100%; overflow:visible; }
      .wire { fill:none; stroke:rgba(233,238,255,.64); stroke-width:3; stroke-linecap:round; stroke-dasharray:1800; stroke-dashoffset:1800; }
      .wire-one { stroke:#FF4D8D; filter:drop-shadow(0 0 12px rgba(255,77,141,.72)); }
      .wire-two { stroke:#2F5BFF; filter:drop-shadow(0 0 12px rgba(47,91,255,.75)); }
      .wire-three { stroke:rgba(233,238,255,.48); stroke-width:2; }
      .network-node { position:absolute; width:18px; height:18px; margin:-9px; border-radius:50%; background:#fff; box-shadow:0 0 0 12px rgba(233,238,255,.08),0 0 34px 12px rgba(255,77,141,.48); }
      .node-one { left:17.2%; top:63.9%; }
      .node-two { left:49%; top:50%; width:22px; height:22px; margin:-11px; background:#FF4D8D; box-shadow:0 0 0 14px rgba(255,77,141,.1),0 0 42px 14px rgba(255,77,141,.62); }
      .node-three { left:82.3%; top:36.1%; background:#2F5BFF; box-shadow:0 0 0 12px rgba(47,91,255,.1),0 0 34px 12px rgba(47,91,255,.55); }`,
    animation: `
      tl.fromTo(".wire",{strokeDashoffset:1800},{strokeDashoffset:0,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".network-node",{scale:1.28,opacity:0.68,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".glow-wine",{x:20,y:-10,opacity:0.32,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);
      tl.to(".glow-blue",{x:-18,y:14,opacity:0.34,duration:HALF,ease:"sine.inOut",yoyo:true,repeat:1},0);`,
  },
];

const prefixMarkupClasses = (value, id) =>
  value.replace(/class="([^"]+)"/g, (_, classNames) =>
      `class="${classNames.split(/\s+/).map((className) =>
        className === "clip" ? className : `${id}-${className}`
      ).join(" ")}"`
    );

const prefixStyleSelectors = (value, id) =>
  value.replace(/(^|[\s,{])\.([a-z][a-z0-9_-]*)/g, (_, before, className) =>
    className === "clip" ? `${before}.${className}` : `${before}.${id}-${className}`
  );

const prefixAnimationSelectors = (value, id) =>
  value.replace(/(["'])\.([a-z][a-z0-9_-]*)\1/g, (_, quote, className) =>
    `${quote}.${id}-${className}${quote}`
  );

const baseStyles = `
  * { box-sizing:border-box; }
  html, body { width:${width}px; height:${height}px; margin:0; overflow:hidden; background:#0A1240; }
  #root { position:relative; width:100%; height:100%; overflow:hidden; isolation:isolate; background:#0A1240; }
  .clip { position:absolute; inset:0; width:100%; height:100%; overflow:hidden; }
`;

await mkdir(compositionDir, { recursive: true });

for (const scene of scenes) {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${width}, height=${height}" />
    <title>${scene.id} ambient loop</title>
  </head>
  <body>
    <style>
      ${baseStyles}
      ${prefixStyleSelectors(scene.styles, scene.id)}
    </style>
    <div id="root" data-composition-id="${scene.id}" data-width="${width}" data-height="${height}" data-duration="${duration}" data-fps="30">
      <div id="${scene.id}-layer" class="clip" data-start="0" data-duration="${duration}" data-track-index="1">
        ${prefixMarkupClasses(scene.content, scene.id)}
      </div>
    </div>
    <script>
      const HALF = ${halfCycle};
      const CYCLE = ${halfCycle * 2};
      const tl = gsap.timeline({ paused: true });
      ${prefixAnimationSelectors(scene.animation, scene.id)}
      window.__timelines["${scene.id}"] = tl;
    </script>
  </body>
</html>
`;
  await writeFile(path.join(compositionDir, `${scene.id}.html`), html);
}

const hosts = scenes.map((scene, index) => `    <div
      id="${scene.id}"
      data-composition-id="${scene.id}"
      data-composition-src="compositions/${scene.id}.html"
      data-start="${index * duration}"
      data-duration="${duration}"
      data-track-index="1"
      data-width="${width}"
      data-height="${height}"
    ></div>`).join("\n");

const index = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${width}, height=${height}" />
    <title>Portfolio hero loops — review</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      * { box-sizing:border-box; }
      html, body { width:${width}px; height:${height}px; margin:0; overflow:hidden; background:#0A1240; }
      #root { position:relative; width:100%; height:100%; overflow:hidden; background:#0A1240; }
      #root > [data-composition-src] { position:absolute; inset:0; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${scenes.length * duration}" data-width="${width}" data-height="${height}" data-fps="30">
${hosts}
    </div>
    <script>
      window.__timelines["main"] = gsap.timeline({ paused: true });
    </script>
  </body>
</html>
`;

await writeFile(path.join(projectRoot, "index.html"), index);
console.log(`Generated ${scenes.length} looping compositions and the combined review timeline.`);
