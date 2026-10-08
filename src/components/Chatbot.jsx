import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaArrowRight, FaPaperPlane, FaRedoAlt, FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const intents = [
  {
    id: "about",
    phrases: ["about gideon", "tell me about gideon", "who is gideon", "who are you", "background", "introduce yourself", "about him"],
    text: "Gideon William Ogunu is a UI/UX designer and developer with over five years of experience creating digital experiences. He brings design and development together to make products that are useful, polished, and easy to use.",
    path: "/about",
    linkText: "Meet Gideon",
  },
  {
    id: "skills",
    phrases: ["skills", "tech stack", "technologies", "tools", "programming languages", "what can you build", "design software", "react", "javascript", "php", "figma", "html css", "html/css", "mobile first", "ui ux design", "ui/ux design"],
    text: "Gideon's expertise includes UI/UX and mobile-first design, React, JavaScript, HTML/CSS, PHP, and C#. His project work also shows graphic design and brand work.",
    path: "/about",
    linkText: "Explore his expertise",
  },
  {
    id: "projects",
    phrases: ["projects", "portfolio", "work", "case studies", "websites", "web development", "apps", "what have you made", "show me your work"],
    text: "His portfolio includes web development, UI design, logo design, and graphic design work. Browse the projects to see examples across those categories.",
    path: "/projects",
    linkText: "Browse projects",
  },
  {
    id: "services",
    phrases: ["services", "hire", "hire a designer", "hire a developer", "need a designer", "need a developer", "work together", "freelance", "what do you do", "what do you offer", "can you help", "website development", "build a website", "website design", "graphic design", "logo design", "logo", "branding", "ui ux design", "ui/ux design", "mobile app design"],
    text: "Gideon works across website development, UI/UX and mobile app design, and graphic design such as logos and branding. Share a little about your project and he can discuss the best fit.",
    path: "/contact",
    linkText: "Discuss a project",
  },
  {
    id: "contact",
    phrases: ["contact", "email", "get in touch", "reach gideon", "send a message", "collaborate", "phone number", "email address"],
    text: "You can email Gideon at gideonogunu@gmail.com or call +233 592678531. You can also send a message through the contact page.",
    path: "/contact",
    linkText: "Go to contact",
  },
  {
    id: "resume",
    phrases: ["resume", "résumé", "cv", "work experience", "education", "career history", "qualifications"],
    text: "Gideon's resume page has more detail about his professional background and experience.",
    path: "/resume",
    linkText: "View resume",
  },
  {
    id: "pricing",
    phrases: ["price", "pricing", "cost", "rates", "budget", "how much", "quote", "charge"],
    text: "Pricing depends on the project's scope and requirements, so I don't want to guess at a figure. Send Gideon the details and he can discuss a suitable quote.",
    path: "/contact",
    linkText: "Request a quote",
  },
  {
    id: "timeline",
    phrases: ["timeline", "deadline", "how long", "turnaround", "delivery time", "when can you finish"],
    text: "Timelines depend on the work involved and the project scope. Share your deadline and requirements with Gideon to discuss a realistic schedule.",
    path: "/contact",
    linkText: "Discuss your timeline",
  },
  {
    id: "location",
    phrases: ["location", "where are you based", "where is gideon", "which country", "based in"],
    text: "Gideon is based in Accra, Ghana. You can get in touch about working together remotely or locally.",
    path: "/contact",
    linkText: "Get in touch",
  },
  {
    id: "availability",
    phrases: ["available", "availability", "are you free", "taking clients", "accepting projects", "booked"],
    text: "I can't confirm Gideon's current availability, but you can contact him with your project details to check.",
    path: "/contact",
    linkText: "Check availability",
  },
];

const quickPrompts = [
  "Who is Gideon?",
  "Show me the projects",
  "What services do you offer?",
];

const normalize = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const scoreIntent = (query, intent) => {
  const matchedPhrases = intent.phrases.filter((phrase) => {
    const normalizedPhrase = normalize(phrase);
    return query.includes(normalizedPhrase) ||
      normalizedPhrase.split(" ").every((word) => query.split(" ").includes(word));
  });
  if (!matchedPhrases.length) return 0;

  const uniqueWords = new Set(matchedPhrases.flatMap((phrase) => normalize(phrase).split(" ")));
  const exactPhraseBonus = matchedPhrases.some((phrase) => query.includes(normalize(phrase))) ? 2 : 0;
  return uniqueWords.size + exactPhraseBonus;
};

const findResponses = (input) => {
  const query = normalize(input);
  const ranked = intents
    .map((intent) => ({ intent, score: scoreIntent(query, intent) }))
    .filter(({ score }) => score >= 2)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) return [];
  const selected = [ranked[0]];
  if (ranked[1] && ranked[1].score >= 3 && ranked[1].score >= ranked[0].score * 0.65) {
    selected.push(ranked[1]);
  }
  return selected.map(({ intent }) => intent);
};

const getBotReply = (input, previousIntent) => {
  const query = normalize(input);
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|howdy)$/.test(query)) {
    return {
      text: "Hi! I can help you explore Gideon's work, services, experience, or ways to get in touch.",
      suggestions: quickPrompts,
    };
  }
  if (/^(thanks|thank you|thx|bye|goodbye|see you)$/.test(query)) {
    return { text: "You're welcome! Feel free to ask if you'd like to explore anything else." };
  }
  if (/^(tell me more|more details|go on|and what else|what about that)$/.test(query) && previousIntent) {
    return { text: previousIntent.text, path: previousIntent.path, linkText: previousIntent.linkText };
  }

  const matches = findResponses(input);
  if (matches.length) {
    return {
      text: matches.map(({ text }) => text).join("\n\n"),
      path: matches[0].path,
      linkText: matches.length > 1 ? "Explore more" : matches[0].linkText,
      intent: matches[0],
    };
  }

  return {
    text: "I don't have a reliable answer for that yet. I can help with Gideon's background, skills, projects, services, resume, pricing, or contact details.",
    suggestions: ["Show me the projects", "How can I contact Gideon?"],
  };
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const pendingReplyRef = useRef(null);
  const previousIntentRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: "bot",
        text: "Hi, I'm Gideon's portfolio assistant. What would you like to know?",
        suggestions: quickPrompts,
      }]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => () => window.clearTimeout(pendingReplyRef.current), []);

  const handleSendMessage = (value = inputValue) => {
    const userMessage = value.trim();
    if (!userMessage || isTyping) return;

    setMessages((previous) => [...previous, { role: "user", text: userMessage }]);
    setInputValue("");
    setIsTyping(true);
    pendingReplyRef.current = window.setTimeout(() => {
      const reply = getBotReply(userMessage, previousIntentRef.current);
      if (reply.intent) previousIntentRef.current = reply.intent;
      setMessages((previous) => [...previous, { role: "bot", ...reply }]);
      setIsTyping(false);
    }, 350);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSendMessage();
  };

  const resetChat = () => {
    window.clearTimeout(pendingReplyRef.current);
    previousIntentRef.current = null;
    setIsTyping(false);
    setMessages([]);
  };

  return createPortal(
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex min-h-14 items-center gap-3 rounded-full bg-[#0A1240] px-3.5 text-white shadow-[0_12px_36px_rgba(10,18,64,0.3)] ring-1 ring-white/20 transition hover:scale-105 hover:bg-[#17245f] active:scale-95 sm:bottom-6 sm:right-6"
        aria-label="Open Gideon's portfolio assistant"
        aria-expanded={isOpen}
        style={{ minHeight: "56px" }}
      >
        <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white">
          <img src="/GWO.png" alt="" className="h-8 w-8 object-contain" />
        </span>
        <span className="pr-1 text-left">
          <span className="block text-sm font-semibold leading-tight">Ask Gideon</span>
          <span className="block text-[10px] text-white/70">Portfolio assistant</span>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-[5.25rem] right-3 z-50 flex h-[min(36rem,calc(100dvh-7rem))] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[1.35rem] border border-[#0A1240]/10 bg-[#f8f9fc] shadow-[0_24px_80px_rgba(10,18,64,0.24)] sm:bottom-24 sm:right-6"
            role="dialog"
            aria-modal="false"
            aria-label="Gideon's portfolio assistant"
          >
            <header className="relative overflow-hidden bg-[#0A1240] px-5 pb-5 pt-4 text-white">
              <div className="pointer-events-none absolute -right-8 -top-14 h-40 w-40 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -right-1 -top-8 h-28 w-28 rounded-full border border-white/10" />
              <div className="relative flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-white/20">
                    <img src="/GWO.png" alt="" className="h-9 w-9 object-contain" />
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0A1240] bg-emerald-400" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold tracking-wide">Gideon's assistant</h2>
                    <p className="mt-0.5 text-xs text-white/65">Here to help you explore</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={resetChat}
                    className="rounded-full p-2 text-white/75 transition hover:bg-white/10 hover:text-white focus-visible:outline-white"
                    aria-label="Start a new conversation"
                    title="New conversation"
                  >
                    <FaRedoAlt size={13} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-2 text-white/75 transition hover:bg-white/10 hover:text-white focus-visible:outline-white"
                    aria-label="Close chat"
                  >
                    <FaTimes size={16} />
                  </button>
                </div>
              </div>
              <div className="relative mt-4 flex items-center gap-2 text-[11px] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Ask about projects, skills, or working together
              </div>
            </header>

            <div
              className="flex-1 space-y-4 overflow-y-auto px-4 py-5"
              role="log"
              aria-live="polite"
              aria-label="Conversation"
            >
              {messages.map((message, index) => (
                <motion.div
                  key={`${index}-${message.role}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "bot" && (
                    <span className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-[#0A1240]/10">
                      <img src="/GWO.png" alt="" className="h-6 w-6 object-contain" />
                    </span>
                  )}
                  <div className={`max-w-[84%] ${message.role === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                        message.role === "user"
                          ? "rounded-br-md bg-[#0A1240] text-white"
                          : "rounded-bl-md border border-[#0A1240]/[0.06] bg-white text-slate-700 shadow-sm"
                      }`}
                    >
                      {message.text.split("\n\n").map((paragraph, paragraphIndex) => (
                        <p key={paragraphIndex} className={paragraphIndex ? "mt-2" : ""}>{paragraph}</p>
                      ))}
                    </div>
                    {message.path && (
                      <Link
                        to={message.path}
                        onClick={() => setIsOpen(false)}
                        className="mt-2 inline-flex items-center gap-1.5 px-1 text-xs font-semibold text-[#b71950] transition hover:text-[#8d113d]"
                      >
                        {message.linkText} <FaArrowRight size={10} />
                      </Link>
                    )}
                    {message.suggestions && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {message.suggestions.map((prompt) => (
                          <button
                            key={prompt}
                            onClick={() => handleSendMessage(prompt)}
                            disabled={isTyping}
                            className="rounded-full border border-[#0A1240]/10 bg-white px-2.5 py-1.5 text-left text-[11px] font-medium text-[#0A1240] transition hover:border-[#b71950]/40 hover:bg-[#fff4f7] disabled:opacity-50"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex items-end gap-2" aria-label="Assistant is typing">
                  <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-[#0A1240]/10">
                    <img src="/GWO.png" alt="" className="h-6 w-6 object-contain" />
                  </span>
                  <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-3.5 py-3 shadow-sm">
                    {[0, 1, 2].map((dot) => (
                      <span
                        key={dot}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0A1240]/40"
                        style={{ animationDelay: `${dot * 120}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="border-t border-[#0A1240]/[0.08] bg-white p-3.5">
              <div className="flex items-center gap-2 rounded-2xl border border-[#0A1240]/10 bg-[#f8f9fc] p-1.5 pl-3 transition focus-within:border-[#0A1240]/40 focus-within:ring-2 focus-within:ring-[#0A1240]/10">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="Ask me anything..."
                  aria-label="Your message"
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0A1240] text-white transition hover:bg-[#17245f] disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Send message"
                >
                  <FaPaperPlane size={14} />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-slate-400">Portfolio assistant · Replies are based on this site</p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
};

export default Chatbot;
