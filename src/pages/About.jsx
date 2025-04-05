import { motion } from "framer-motion";
import { useEffect } from "react";
import { FaRegLightbulb, FaRegHandshake, FaChartLine } from "react-icons/fa";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Expertise data with images
  const expertiseData = [
    {
      name: "UI/UX Design",
      description:
        "Creating intuitive interfaces and exceptional user experiences",
      image: "/images/uiux.png",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      name: "React Development",
      description: "Building interactive and responsive web applications",
      icon: "⚛️",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
    },
    {
      name: "PHP & C#",
      description: "Developing robust backend systems and applications",
      icon: "🐘",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      name: "JavaScript",
      description: "Crafting dynamic and engaging user interactions",
      icon: "📜",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      name: "HTML/CSS",
      description: "Structuring and styling the modern web",
      icon: "🎨",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      name: "Mobile-First Design",
      description: "Ensuring optimal experiences across all devices",
      icon: "📱",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
  ];

  // Key metrics (inspired by SPINX)
  const metrics = [
    { label: "Years of Experience", value: "5+" },
    { label: "Projects Completed", value: "30+" },
    { label: "Client Satisfaction", value: "100%" },
  ];

  // Core philosophy section (Connect, Create, Evolve from SPINX)
  const corePhilosophy = [
    {
      title: "Connect",
      icon: <FaRegHandshake className="text-5xl text-blue-500 mb-4" />,
      description:
        "I believe the most effective connections are emotional. I help you connect with your audience in exciting and engaging ways, focusing on your success by defining your needs and achieving your goals.",
    },
    {
      title: "Create",
      icon: <FaRegLightbulb className="text-5xl text-blue-500 mb-4" />,
      description:
        "I collaborate to develop the best strategies and inspired solutions for your brand. I leverage intelligence and technology to create great experiences, with a customized approach for every unique project.",
    },
    {
      title: "Evolve",
      icon: <FaChartLine className="text-5xl text-blue-500 mb-4" />,
      description:
        "What matters is not just what I've done in the past, but what I'll be doing next. I believe in looking towards the future with my clients, helping brands breathe, grow and evolve in the digital landscape.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section with Mission Statement */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/dv.jpg")' }}
        ></div>
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Designing the Future
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90"
          >
            Crafting digital experiences that inspire and transform the way
            people interact with technology.
          </motion.p>
        </div>
      </section>

      {/* Key Metrics Section (inspired by SPINX) */}
      <section className="py-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {metric.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-lg">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-24 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8"
          >
            My Vision
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            I am a passionate UI/UX Designer and Developer with over 5 years of
            experience creating beautiful and functional digital experiences. My
            mission is to solve real-world problems through innovative design
            and development, crafting solutions that are both aesthetically
            pleasing and highly functional.
          </motion.p>
        </div>
      </section>

      {/* Core Philosophy Section (Connect, Create, Evolve from SPINX) */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-16 text-center"
          >
            My Approach
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {corePhilosophy.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md"
              >
                <div className="flex justify-center">{item.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - Grid Layout */}
      <section className="py-24 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-16 text-center"
          >
            Expertise
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertiseData.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 rounded-lg shadow-sm flex flex-col ${skill.bgColor}`}
              >
                {skill.image ? (
                  <div className="mb-6 h-48 overflow-hidden rounded-md bg-white dark:bg-gray-800 p-4 flex items-center justify-center">
                    <img
                      src={skill.image}
                      alt={skill.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  skill.icon && (
                    <div className="mb-6 h-32 flex items-center justify-center">
                      <span className="text-6xl">{skill.icon}</span>
                    </div>
                  )
                )}
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {skill.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width Image Section with profile picture */}
      <section className="relative py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img src="/profile.jpg" alt="Profile" className="w-full h-auto" />
            </div>
          </div>
          <div className="md:w-1/2 md:pl-16">
            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-8"
            >
              Turning Ideas Into Reality
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-300 leading-relaxed"
            >
              With a focus on user-centered design, I transform complex
              challenges into elegant solutions. My approach combines aesthetic
              sensibility with technical expertise to create digital experiences
              that not only look beautiful but also function seamlessly.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Personal Message Section (inspired by SPINX CEO message) */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 md:p-12">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center"
          >
            A Personal Message
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              As a dedicated UI/UX designer and developer, I'm driven by a
              relentless pursuit of excellence in the digital space. My journey
              in this field has been focused on transforming the digital
              presence of brands and individuals, creating intuitive and
              engaging experiences that connect with users on an emotional
              level.
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              My philosophy merges creativity with technology, crafting
              innovative solutions that resonate with my clients' goals. I
              believe in pushing the boundaries of what's possible, constantly
              learning and adapting to new technologies and design paradigms.
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Looking ahead, I'm excited about the future and the opportunities
              it holds. Innovation will continue to be the driving force behind
              my work, and I am committed to investing time in new ideas and
              technologies that will shape the next generation of digital
              solutions.
            </p>

            <div className="text-right">
              <p className="font-semibold text-gray-900 dark:text-white">
                Gideon William Ogunu
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                UI/UX Designer & Developer
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-16 text-center"
          >
            Achievements
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Best UI/UX Design Award",
                description:
                  "Recognized for outstanding design work on the Mosaic Grove project",
                year: "2023",
              },
              {
                title: "Certified React Developer",
                description:
                  "Completed advanced React development certification",
                year: "2022",
              },
              {
                title: "Innovation Award",
                description:
                  "Awarded for innovative solutions in the Let's Buy e-commerce platform",
                year: "2021",
              },
            ].map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col"
              >
                <span className="text-5xl font-bold text-blue-600 dark:text-blue-500 mb-6">
                  {achievement.year}
                </span>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-8"
          >
            Let's Build Something Amazing Together
          </motion.h2>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            href="/contact"
            className="inline-block py-4 px-8 bg-white text-blue-600 font-semibold rounded-md text-lg hover:bg-gray-100 transition-colors"
          >
            Get In Touch
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default About;
