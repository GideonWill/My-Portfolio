import { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Simple Animated Logo Avatar Component
const LogoAvatar = () => {
  return (
    <div className="h-16 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center rounded-t-2xl">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
      >
        <img src="/GWO.png" alt="GWO Logo" className="w-8 h-8" />
      </motion.div>
    </div>
  );
};

// Knowledge base about the portfolio
const knowledgeBase = {
  about: {
    keywords: ["about", "who", "gideon", "william", "ogunu", "background", "bio", "introduction", "myself", "yourself"],
    response: "Gideon William Ogunu is a multi-talented Website Developer, Graphic Designer, and UI/UX Designer. He specializes in creating beautiful, user-centered digital experiences through clean code and intuitive interfaces. With expertise spanning web development, graphic design, and user experience design, he brings ideas to life holistically. You can learn more about him on the About page!"
  },
  skills: {
    keywords: ["skills", "technologies", "tech", "stack", "tools", "programming", "coding", "languages", "frameworks"],
    response: "As a Website Developer, Graphic Designer, and UI/UX Designer, Gideon is proficient in React, JavaScript, HTML/CSS, Node.js, Tailwind CSS for web development; Figma, Adobe Creative Suite (Photoshop, Illustrator, XD) for graphic and UI/UX design; and various design and development frameworks. He combines creative design thinking with technical expertise to create exceptional digital products."
  },
  projects: {
    keywords: ["projects", "work", "portfolio", "design", "development", "websites", "apps", "created", "built", "made"],
    response: "Gideon has worked on numerous projects showcasing his skills as a Website Developer, Graphic Designer, and UI/UX Designer. His work includes web development (Demargo Interior Contractors, AMB360 Cleaning Agency, Our Help Paige Foundation), graphic design (flyers, logos, branding materials, marketing assets), and UI/UX design (mobile app interfaces, dashboards, user flows). You can explore all his projects on the Projects page, organized by category: Graphic Design, Logo Design, Web Development, and UI Design."
  },
  contact: {
    keywords: ["contact", "email", "reach", "message", "hire", "work", "collaborate", "together", "get in touch", "connect"],
    response: "You can contact Gideon through the Contact page on this website. As a Website Developer, Graphic Designer, and UI/UX Designer, he's always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!"
  },
  resume: {
    keywords: ["resume", "cv", "experience", "education", "qualifications", "background", "career", "history"],
    response: "Gideon's resume is available on the Resume page, where you can find detailed information about his work experience, education, skills, and professional background as a Website Developer, Graphic Designer, and UI/UX Designer. It showcases his journey and expertise across all three disciplines."
  },
  services: {
    keywords: ["services", "offer", "provide", "help", "what do you do", "can you", "available for"],
    response: "Gideon offers comprehensive services as a Website Developer, Graphic Designer, and UI/UX Designer. His services include website development (responsive websites, web applications), graphic design (flyers, logos, branding, marketing materials), and UI/UX design (user research, wireframing, prototyping, interface design). He's available for freelance projects and collaborations. Check the Projects page to see examples of his work!"
  },
  pricing: {
    keywords: ["price", "cost", "rate", "charge", "expensive", "cheap", "budget", "money", "payment"],
    response: "Project pricing depends on the scope and requirements. As a Website Developer, Graphic Designer, and UI/UX Designer, Gideon offers competitive rates and can provide a custom quote based on your specific needs. Feel free to contact him through the Contact page to discuss your project and get a detailed quote."
  },
  timeline: {
    keywords: ["time", "deadline", "how long", "duration", "fast", "quick", "when", "schedule"],
    response: "Project timelines vary based on complexity and scope. Gideon works efficiently as a Website Developer, Graphic Designer, and UI/UX Designer to deliver quality work within agreed timeframes. For specific timeline estimates, please reach out through the Contact page with details about your project."
  },
  location: {
    keywords: ["location", "where", "based", "country", "city", "place", "from"],
    response: "Gideon is based in Ghana and works with clients globally as a Website Developer, Graphic Designer, and UI/UX Designer. Thanks to remote collaboration tools, he can work with clients from anywhere in the world!"
  },
  availability: {
    keywords: ["available", "free", "busy", "booked", "schedule", "now", "current"],
    response: "Gideon is currently available for new projects! As a Website Developer, Graphic Designer, and UI/UX Designer, he's excited to take on new challenges and collaborate on innovative projects. Reach out through the Contact page to discuss your ideas."
  },
  developer: {
    keywords: ["developer", "web developer", "website", "coding", "programming", "frontend", "backend"],
    response: "As a Website Developer, Gideon specializes in building responsive, modern websites and web applications. He's proficient in React, JavaScript, HTML/CSS, Node.js, and Tailwind CSS. He creates clean, efficient code and follows best practices to ensure optimal performance and user experience."
  },
  designer: {
    keywords: ["designer", "graphic designer", "graphic", "design", "creative", "art", "visual"],
    response: "As a Graphic Designer, Gideon creates stunning visual content including logos, flyers, branding materials, marketing assets, and more. He uses Adobe Creative Suite (Photoshop, Illustrator, XD) and has a keen eye for aesthetics, color theory, and typography to create impactful designs."
  },
  uiux: {
    keywords: ["ui", "ux", "ui/ux", "user interface", "user experience", "interaction", "usability"],
    response: "As a UI/UX Designer, Gideon specializes in creating intuitive, user-centered interfaces. He conducts user research, creates wireframes and prototypes, and designs seamless user experiences. He uses Figma and follows design thinking principles to ensure products are both beautiful and functional."
  }
};

// Conversation ending phrases
const endingPhrases = [
  "Is there anything else I can help you with?",
  "Feel free to ask if you have more questions!",
  "I'm here if you need anything else.",
  "Don't hesitate to reach out for more information.",
  "Would you like to know more about any specific topic?",
  "I hope that helps! Let me know if you need anything else."
];

// Greeting phrases
const greetingPhrases = [
  "Hello! I'm Gideon's virtual assistant. How can I help you today?",
  "Hi there! Welcome to Gideon's portfolio. What would you like to know?",
  "Hey! I'm here to help you explore Gideon's work. What are you interested in?",
  "Greetings! Feel free to ask me anything about Gideon's portfolio."
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send initial greeting
      const randomGreeting = greetingPhrases[Math.floor(Math.random() * greetingPhrases.length)];
      setMessages([{ role: "bot", text: randomGreeting }]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const findBestMatch = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    let bestMatch = null;
    let highestScore = 0;

    for (const [category, data] of Object.entries(knowledgeBase)) {
      let score = 0;
      data.keywords.forEach(keyword => {
        if (lowerInput.includes(keyword)) {
          score += 1;
        }
        // Partial match bonus
        if (keyword.includes(lowerInput) || lowerInput.includes(keyword)) {
          score += 0.5;
        }
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = data;
      }
    }

    return { match: bestMatch, score: highestScore };
  };

  const generateResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    // Check for conversation ending signals
    if (lowerInput.includes("thank") || lowerInput.includes("thanks") || lowerInput.includes("bye") || lowerInput.includes("goodbye")) {
      const randomEnding = endingPhrases[Math.floor(Math.random() * endingPhrases.length)];
      return randomEnding;
    }

    // Check for greetings
    if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
      return "Hello! How can I help you explore Gideon's portfolio today?";
    }

    // Find best match in knowledge base
    const { match: bestMatch, score } = findBestMatch(userInput);

    if (bestMatch && score > 0) {
      return bestMatch.response;
    }

    // Fallback response
    return "I'm not sure about that specific question, but I'd be happy to help you learn more about Gideon's work! You can explore his projects, skills, or contact information on this website. For specific inquiries, feel free to reach out through the Contact page.";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateResponse(userMessage);
      setMessages(prev => [...prev, { role: "bot", text: botResponse }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ 
          scale: 1,
          y: [0, -10, 0]
        }}
        transition={{
          scale: { type: "spring", stiffness: 300, damping: 20 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all touch-target"
        aria-label="Open chat"
        style={{ minHeight: "56px", minWidth: "56px" }}
      >
        <img src="/GWO.png" alt="GWO Logo" className="w-8 h-8" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-72 sm:w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <FaRobot size={14} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Want a Website or a Graphic Designer</h3>
                  <p className="text-[10px] text-blue-100">Online • Here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* 3D Avatar */}
            <div className="h-16 bg-gray-100 dark:bg-gray-900">
              <LogoAvatar />
            </div>

            {/* Messages */}
            <div className="h-56 overflow-y-auto p-3 space-y-3 bg-gray-50 dark:bg-gray-900">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-2 rounded-xl ${
                      message.role === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm shadow"
                    }`}
                  >
                    <p className="text-xs leading-relaxed">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-gray-800 p-2 rounded-xl rounded-bl-sm shadow">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Send message"
                >
                  <FaPaperPlane size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
