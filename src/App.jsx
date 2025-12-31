import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  FileText, Send, Award, X, Github, ArrowRight, Linkedin, Mail, Lock, Loader2, Code2, Menu, ArrowUp, Moon, Sun
} from 'lucide-react';
import {
  FaReact, FaNodeJs, FaPython, FaAngular, FaJava, FaDocker, FaGitAlt, FaLinkedin, FaGithub, FaEnvelope,
  FaLightbulb, FaCode, FaUsers
} from 'react-icons/fa';
import {
  SiTailwindcss, SiMongodb, SiMysql, SiSpring, SiFlask, SiBootstrap, SiSocketdotio, SiTypescript
} from 'react-icons/si';
import emailjs from '@emailjs/browser';

// --- TRANSLATIONS ---
const translations = {
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      skills: "Skills",
      resume: "Resume"
    },
    hero: {
      badge: "Full Stack Developer",
      name: "Med Mokhtar",
      lastName: "Nasrali.",
      typingPhrases: [
        "I build scalable web applications",
        "I create elegant user interfaces",
        "I solve complex problems",
        "I write clean, maintainable code"
      ],
      description: "Specialized in building scalable applications with Spring Boot, Angular, and MERN Stack.",
      cta: "View Work",
      github: "Visit GitHub profile",
      linkedin: "Visit LinkedIn profile"
    },
    techStack: "Technical Stack",
    certifications: "Certifications",
    projects: {
      title: "Selected Work",
      comingSoon: "Coming Soon",
      workInProgress: "Work in Progress",
      viewCode: "View Code",
      viewCodeGithub: "View Code on GitHub",
      livePreview: "Live Preview",
      live: "Live",
      code: "Code",
      privateRepo: "Private Repository",
      keyFeatures: "Key Features",
      viewDetails: "View details for"
    },
    contact: {
      title: "Contact Me",
      subtitle: "Available for freelance opportunities and full-time roles.",
      namePlaceholder: "Name",
      emailPlaceholder: "Email",
      messagePlaceholder: "Message",
      send: "Send Message",
      sending: "Sending...",
      success: "✓ Message sent successfully!",
      error: "✗ Failed to send message. Please try again.",
      nameRequired: "Name is required",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email",
      messageRequired: "Message is required",
      messageMinLength: "Message must be at least 10 characters"
    },
    footer: "All rights reserved"
  },
  fr: {
    nav: {
      about: "À propos",
      projects: "Projets",
      skills: "Compétences",
      resume: "CV"
    },
    hero: {
      badge: "Développeur Full Stack",
      name: "Med Mokhtar",
      lastName: "Nasrali.",
      typingPhrases: [
        "Je développe des applications web évolutives",
        "Je crée des interfaces utilisateur élégantes",
        "Je résous des problèmes complexes",
        "J'écris du code propre et maintenable"
      ],
      description: "Spécialisé dans le développement d'applications évolutives avec Spring Boot, Angular et MERN Stack.",
      cta: "Voir mes projets",
      github: "Visiter le profil GitHub",
      linkedin: "Visiter le profil LinkedIn"
    },
    techStack: "Stack Technique",
    certifications: "Certifications",
    projects: {
      title: "Projets Sélectionnés",
      comingSoon: "Bientôt disponible",
      workInProgress: "En cours de développement",
      viewCode: "Voir le code",
      viewCodeGithub: "Voir le code sur GitHub",
      livePreview: "Aperçu en direct",
      live: "Démo",
      code: "Code",
      privateRepo: "Dépôt privé",
      keyFeatures: "Fonctionnalités clés",
      viewDetails: "Voir les détails pour"
    },
    contact: {
      title: "Contactez-moi",
      subtitle: "Disponible pour des missions freelance et des postes à temps plein.",
      namePlaceholder: "Nom",
      emailPlaceholder: "Email",
      messagePlaceholder: "Message",
      send: "Envoyer le message",
      sending: "Envoi en cours...",
      success: "✓ Message envoyé avec succès !",
      error: "✗ Échec de l'envoi du message. Veuillez réessayer.",
      nameRequired: "Le nom est requis",
      emailRequired: "L'email est requis",
      emailInvalid: "Veuillez entrer un email valide",
      messageRequired: "Le message est requis",
      messageMinLength: "Le message doit contenir au moins 10 caractères"
    },
    footer: "Tous droits réservés"
  }
};

// --- HOOKS & UTILITIES ---

// Language Hook
const useLanguage = () => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = translations[language];

  return [language, setLanguage, t];
};

// Typing Animation Hook
const useTypingAnimation = (phrases, typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (charIndex < currentPhrase.length) {
          setDisplayText(currentPhrase.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting
        if (charIndex > 0) {
          setDisplayText(currentPhrase.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          // Move to next phrase
          setIsDeleting(false);
          setPhraseIndex((phraseIndex + 1) % phrases.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
};

// Dark Mode Hook
const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return [darkMode, setDarkMode];
};

// Scroll to Top Hook
const useScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { showButton, scrollToTop };
};

// Intersection Observer Hook for Scroll Animations
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
};

// --- SKELETON COMPONENTS ---
const ImageSkeleton = () => (
  <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>
);

const ProjectCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
    <div className="h-64 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3 animate-pulse"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4 animate-pulse"></div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
    </div>
  </div>
);

// Scroll to Top Button Component
const ScrollToTop = ({ showButton, scrollToTop }) => {
  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Animated Section Wrapper
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const [ref, isInView] = useInView();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- LAZY LOADED IMAGE COMPONENT ---
const LazyImage = ({ src, alt, className, onError, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !imageSrc) {
            setImageSrc(src);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.01, rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, imageSrc]);

  return (
    <div ref={imgRef} className="relative w-full h-full">
      {isLoading && !hasError && <ImageSkeleton />}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={() => setIsLoading(false)}
          onError={(e) => {
            setHasError(true);
            setIsLoading(false);
            if (onError) onError(e);
          }}
          {...props}
        />
      )}
    </div>
  );
};

// --- DATA SECTION ---

const TECH_STACK = [
  { name: "React", icon: <FaReact className="text-blue-500" /> },
  { name: "Angular", icon: <FaAngular className="text-red-600" /> },
  { name: "Spring Boot", icon: <SiSpring className="text-green-600" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "Python", icon: <FaPython className="text-yellow-500" /> },
  { name: "Flask", icon: <SiFlask className="text-black" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
  { name: "MySQL", icon: <SiMysql className="text-blue-600" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-500" /> },
  { name: "Bootstrap", icon: <SiBootstrap className="text-purple-600" /> },
  { name: "Java", icon: <FaJava className="text-red-500" /> },
];

const SOFT_SKILLS_DATA = [
  {
    name: "Problem Solving",
    description: "I approach challenges with creativity and logic, finding efficient solutions to complex architectural problems.",
    icon: <FaLightbulb className="text-yellow-500 text-5xl" />,
  },
  {
    name: "Clean Code",
    description: "Writing maintainable, readable, and scalable code is my top priority for long-term project success.",
    icon: <FaCode className="text-teal-500 text-5xl" />,
  },
  {
    name: "Collaboration",
    description: "I thrive in team environments, ensuring smooth communication and workflow between designers and developers.",
    icon: <FaUsers className="text-pink-500 text-5xl" />,
  },
];

const LICENSES_DATA = [
  {
    title: "Software Development Onsite Full-Time",
    issuer: "Coding Dojo Africa",
    date: "September 2024",
    link: "https://app.diplomasafe.com/en-US/diploma/d6c16bbde18c53cccbd0346f91dc5b862e49831b6",
  },
  {
    title: "Introduction to CIP",
    issuer: "OPSWAT Academy",
    date: "January 2025",
    link: "https://learn.opswatacademy.com/certificate/o9FmP6k3RQ",
  },
];

const PROJECTS = [
  {
    id: 6,
    title: "Sensy",
    shortDesc: "Sensitivity converter application for gamers.",
    fullDesc: "A web application designed to help gamers convert their mouse sensitivity settings across different games and DPI values. Built with React and styled with Tailwind CSS, Sensy provides an intuitive interface for calculating and converting sensitivity settings, ensuring consistent aim across multiple gaming titles.",
    features: ["Cross-Game Sensitivity Conversion", "DPI Calculator", "Clean Modern UI", "Instant Results"],
    tech: ["React", "Tailwind CSS"],
    image: "https://placehold.co/800x600/a78bfa/ffffff?text=Sensy",
    gradient: "bg-purple-100",
    github: "https://github.com/med-mokhtar-nasrali/Sensy",
    link: "https://medmokhtarnasrali.short.gy/sensy"
  },
  {
    id: 5,
    title: "Eagle Vision 3D Platform",
    shortDesc: "Interactive architecture showcase with 3D tours and AI assistance.",
    fullDesc: "A cutting-edge architectural platform allowing users to take immersive virtual tours of properties via 3D models. The system features a real-time AI Chatbot linked to the database to answer queries about house availability and details. Includes a secure Admin Dashboard for architects to modify property specs, manage assets via Cloudinary, and track user inquiries in real-time.",
    features: ["3D Virtual Tours", "AI Real-Estate Chatbot", "Admin/Architect Dashboard", "Real-time Availability"],
    tech: ["React", "Express", "MySQL", "Tailwind", "Cloudinary", "JWT", "Sonner"],
    image: "/3d.png",
    gradient: "bg-stone-100",
    github: "#",
    link: "#",
    status: "Coming Soon"
  },
  {
    id: 1,
    title: "Freshka",
    shortDesc: "Direct connection platform between farmers and clients.",
    fullDesc: "A Web Application serving as a direct connection between farmers and clients. This application allows farmers to sell their fresh products directly to clients and provide flexible fees through discounts. The platform also increases farmers' engagement through a forum which allows chatting, posting, or commenting, creating a sense of community.",
    features: ["Direct Sales System", "Farmer Forum & Chat", "Discount Management", "Admin Dashboard"],
    tech: ["Spring Boot", "Angular", "MySQL", "Java", "Spring Security"],
    image: "/freskhabg.png",
    gradient: "bg-green-100",
    github: "https://github.com/jabranebenhadjmessaoud/JavaFinalProject",
    link: "https://github.com/jabranebenhadjmessaoud/JavaFinalProject"
  },
  {
    id: 2,
    title: "CookMe",
    shortDesc: "Recipe discovery based on available ingredients.",
    fullDesc: "A web application that helps users discover and create recipes by solving everyday common challenges like lack of ingredients according to dietary needs/preferences, or time constraints. Includes real-time chat and personalized recommendations.",
    features: ["Ingredient-Based Search", "Real-Time Chat (Socket.io)", "Dietary Filters", "Recipe Ratings"],
    tech: ["MEAN Stack", "Angular", "Node.js", "Socket.io", "MongoDB"],
    image: "/cookme.png",
    gradient: "bg-orange-100",
    github: "https://github.com/med-mokhtar-nasrali/MERN-Project",
    link: "https://github.com/med-mokhtar-nasrali/MERN-Project"
  },
  {
    id: 3,
    title: "TalentNest",
    shortDesc: "Freelancing platform solving unemployment & trust issues.",
    fullDesc: "A web application designed to tackle challenges in employment and freelancing platforms. Features job posting for recruiters, portfolio showcases for freelancers, and a matching algorithm to recommend suitable candidates.",
    features: ["Job Matching Algo", "Portfolio Showcase", "Stripe Connect", "Review System"],
    tech: ["Python", "Flask", "MySQL", "Bootstrap", "Stripe"],
    image: "/talentnest.png",
    gradient: "bg-blue-100",
    github: "https://github.com/med-mokhtar-nasrali/TalentNest",
    link: "https://github.com/med-mokhtar-nasrali/TalentNest"
  },
  {
    id: 4,
    title: "Smart Grocery",
    shortDesc: "MERN stack pantry and grocery list manager.",
    fullDesc: "A full-stack web application designed to simplify grocery management. It allows users to track pantry items with expiration dates, generate intelligent shopping lists, and receive alerts to minimize food waste.",
    features: ["Expiration Alerts", "Pantry Tracking", "Smart Shopping List", "JWT Auth"],
    tech: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
    image: "/smartgrocery.png",
    gradient: "bg-emerald-100",
    github: "https://github.com/med-mokhtar-nasrali/Smart-Grocery-List-Pantry-Manager",
    link: "https://github.com/med-mokhtar-nasrali/Smart-Grocery-List-Pantry-Manager"
  }
];

// --- COMPONENTS ---

// 1. Modal Component with Accessibility
const ProjectModal = ({ project, close }) => {
  const isPrivate = project.status === "Coming Soon";
  const modalRef = useRef(null);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        close();
      }
      
      // Trap focus within modal
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements?.[0];
        const lastElement = focusableElements?.[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Focus the modal when it opens
    modalRef.current?.focus();
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [close]);

  return (
    <motion.div
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      onClick={close}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        ref={modalRef}
        initial={{ y: 50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        exit={{ y: 50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto"
        tabIndex={-1}
      >
        <button 
          onClick={close} 
          className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition z-10 shadow-sm"
          aria-label="Close modal"
        >
          <X size={20} className="text-gray-900 dark:text-white" />
        </button>

        {/* Header Image */}
        <div className={`h-56 w-full ${project.gradient} relative overflow-hidden`}>
          <img
            src={project.image}
            alt={`${project.title} project screenshot`}
            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          {isPrivate && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
              <span className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Work in Progress
              </span>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start mb-2">
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{project.title}</h2>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed whitespace-pre-line text-sm sm:text-base">{project.fullDesc}</p>

          <div className="mb-6">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Key Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                  <div className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full" aria-hidden="true"></div> {feat}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 mb-8 border-t border-gray-100 dark:border-gray-700 pt-6">
            {project.tech.map(t => (
              <span key={t} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs font-semibold">
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {isPrivate ? (
              <button 
                disabled 
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-400 py-3 rounded-lg font-bold text-center cursor-not-allowed flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-600"
                aria-label="Private repository, not available"
              >
                <Lock size={18} aria-hidden="true" /> Private Repository
              </button>
            ) : (
              <>
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${project.id === 6 ? 'flex-1' : 'w-full'} bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-bold text-center hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-lg shadow-gray-200 dark:shadow-gray-700 flex items-center justify-center gap-2 transform hover:scale-105`}
                  aria-label={`View ${project.title} code on GitHub`}
                >
                  <Github size={18} aria-hidden="true" /> {project.id === 6 ? 'View Code' : 'View Code on GitHub'}
                </a>
                {project.id === 6 && project.link && project.link !== "#" && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-lg font-bold text-center hover:bg-blue-700 dark:hover:bg-blue-600 transition shadow-lg shadow-blue-200 dark:shadow-blue-800 flex items-center justify-center gap-2 transform hover:scale-105"
                    aria-label={`View ${project.title} live preview`}
                  >
                    <ArrowRight size={18} aria-hidden="true" /> Live Preview
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Navbar = ({ darkMode, setDarkMode, language, setLanguage, t }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4 transition-all" role="navigation" aria-label="Main navigation">
      <div className="flex justify-between items-center">
        <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight">
          Med Mokhtar <span className="text-gray-400 dark:text-gray-500">Nasrali</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500 dark:text-gray-400">
          <a href="#about" className="hover:text-black dark:hover:text-white transition focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 rounded-sm" aria-label="Navigate to About section">{t.nav.about}</a>
          <a href="#projects" className="hover:text-black dark:hover:text-white transition focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 rounded-sm" aria-label="Navigate to Projects section">{t.nav.projects}</a>
          <a href="#tech-licenses" className="hover:text-black dark:hover:text-white transition focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 rounded-sm" aria-label="Navigate to Skills section">{t.nav.skills}</a>
        </div>
        
        {/* Right Side Controls */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            className="px-3 py-1.5 text-xs font-bold uppercase hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 text-gray-700 dark:text-gray-300"
            aria-label={`Switch to ${language === 'en' ? 'French' : 'English'}`}
          >
            {language === 'en' ? '🇫🇷 FR' : '🇬🇧 EN'}
          </button>
          
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-700" />}
          </button>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={20} className="text-gray-900 dark:text-white" />
          </button>
          
          {/* Resume Button - Desktop */}
          <a
            href="/Med-Mokhtar-Nasrali-Resume.pdf"
            download
            className="hidden md:flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-full text-xs font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2"
            aria-label="Download resume"
          >
            <FileText size={14} aria-hidden="true" /> {t.nav.resume}
          </a>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4"
          >
            <div className="flex flex-col gap-4">
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition font-medium focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 rounded-sm"
                aria-label="Navigate to About section"
              >
                {t.nav.about}
              </a>
              <a 
                href="#projects" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition font-medium focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 rounded-sm"
                aria-label="Navigate to Projects section"
              >
                {t.nav.projects}
              </a>
              <a 
                href="#tech-licenses" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition font-medium focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 rounded-sm"
                aria-label="Navigate to Skills section"
              >
                {t.nav.skills}
              </a>
              <a
                href="/Med-Mokhtar-Nasrali-Resume.pdf"
                download
                className="flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-full text-xs font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2"
                aria-label="Download resume"
              >
                <FileText size={14} aria-hidden="true" /> {t.nav.resume}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const TechBanner = () => (
  <div className="py-12 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 overflow-hidden relative">
    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10"></div>
    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10"></div>

    <div className="flex animate-loop-scroll whitespace-nowrap">
      {[...TECH_STACK, ...TECH_STACK].map((tech, index) => (
        <div key={index} className="mx-12 flex flex-col items-center gap-2 group cursor-default">
          <span className="text-4xl text-gray-400 dark:text-gray-600 group-hover:text-black dark:group-hover:text-white transition duration-300 transform group-hover:scale-110">
            {tech.icon}
          </span>
          <span className="text-xs font-medium text-gray-300 dark:text-gray-700 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition">{tech.name}</span>
        </div>
      ))}
    </div>
  </div>
);



const Contact = ({ t }) => {
  const form = useRef();
  const [status, setStatus] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });

  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (!formData.user_name.trim()) {
      errors.user_name = t.contact.nameRequired;
    }
    
    // Email validation
    if (!formData.user_email.trim()) {
      errors.user_email = t.contact.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      errors.user_email = t.contact.emailInvalid;
    }
    
    // Message validation
    if (!formData.message.trim()) {
      errors.message = t.contact.messageRequired;
    } else if (formData.message.trim().length < 10) {
      errors.message = t.contact.messageMinLength;
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setStatus('sending');
    setFormErrors({});
    
    emailjs.sendForm('service_2xabfoy', 'template_12id7e9', form.current, 'zK1VYa0njiHvCc8MG')
      .then(() => { 
        setStatus('success'); 
        setFormData({ user_name: '', user_email: '', message: '' });
        e.target.reset(); 
      }, () => setStatus('error'));
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 max-w-2xl mx-auto">
      <AnimatedSection>
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.contact.title}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">{t.contact.subtitle}</p>

          <div className="flex justify-center gap-6 mt-6" role="list" aria-label="Social media links">
            <a 
              href="https://github.com/med-mokhtar-nasrali" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition text-2xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 rounded transform hover:scale-110"
              aria-label="Visit GitHub profile"
            >
              <FaGithub aria-hidden="true" />
            </a>
            <a 
              href="https://www.linkedin.com/in/mohamed-mokhtar-nasrali-458144339/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition text-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded transform hover:scale-110"
              aria-label="Visit LinkedIn profile"
            >
              <FaLinkedin aria-hidden="true" />
            </a>
            <a 
              href="mailto:mokhtarbackup03@gmail.com" 
              className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition text-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded transform hover:scale-110"
              aria-label="Send email"
            >
              <FaEnvelope aria-hidden="true" />
            </a>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <form ref={form} onSubmit={sendEmail} className="space-y-4" aria-label="Contact form">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input 
                type="text" 
                name="user_name" 
                placeholder={t.contact.namePlaceholder}
                value={formData.user_name}
                onChange={handleChange}
                className={`w-full bg-gray-50 dark:bg-gray-800 border ${formErrors.user_name ? 'border-red-500 dark:border-red-400' : 'border-gray-200 dark:border-gray-700'} text-gray-900 dark:text-white rounded-lg p-3 focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition`}
                aria-label={t.contact.namePlaceholder}
                disabled={status === 'sending'}
              />
              {formErrors.user_name && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1">{formErrors.user_name}</p>
              )}
            </div>
            <div>
              <input 
                type="email" 
                name="user_email" 
                placeholder={t.contact.emailPlaceholder}
                value={formData.user_email}
                onChange={handleChange}
                className={`w-full bg-gray-50 dark:bg-gray-800 border ${formErrors.user_email ? 'border-red-500 dark:border-red-400' : 'border-gray-200 dark:border-gray-700'} text-gray-900 dark:text-white rounded-lg p-3 focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition`}
                aria-label={t.contact.emailPlaceholder}
                disabled={status === 'sending'}
              />
              {formErrors.user_email && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1">{formErrors.user_email}</p>
              )}
            </div>
          </div>
          <div>
            <textarea 
              name="message" 
              placeholder={t.contact.messagePlaceholder}
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className={`w-full bg-gray-50 dark:bg-gray-800 border ${formErrors.message ? 'border-red-500 dark:border-red-400' : 'border-gray-200 dark:border-gray-700'} text-gray-900 dark:text-white rounded-lg p-3 focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition`}
              aria-label={t.contact.messagePlaceholder}
              disabled={status === 'sending'}
            ></textarea>
            {formErrors.message && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">{formErrors.message}</p>
            )}
          </div>
          <button 
            type="submit" 
            className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-bold transition hover:bg-gray-800 dark:hover:bg-gray-200 shadow-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 transform hover:scale-105"
            disabled={status === 'sending'}
            aria-label={status === 'sending' ? t.contact.sending : t.contact.send}
          >
            {status === 'sending' ? (
              <>
                <Loader2 size={18} className="animate-spin" aria-hidden="true" /> {t.contact.sending}
              </>
            ) : (
              <>
                <Send size={18} aria-hidden="true" /> {t.contact.send}
              </>
            )}
          </button>
          {status === 'success' && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-600 dark:text-green-400 text-center text-sm font-medium bg-green-50 dark:bg-green-900/20 p-3 rounded-lg" 
              role="status" 
              aria-live="polite"
            >
              {t.contact.success}
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 dark:text-red-400 text-center text-sm font-medium bg-red-50 dark:bg-red-900/20 p-3 rounded-lg" 
              role="alert" 
              aria-live="assertive"
            >
              {t.contact.error}
            </motion.p>
          )}
        </form>
      </AnimatedSection>
    </section>
  );
};

// --- MAIN APP ---
function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [darkMode, setDarkMode] = useDarkMode();
  const [language, setLanguage, t] = useLanguage();
  const { showButton, scrollToTop } = useScrollToTop();
  const typingText = useTypingAnimation(t.hero.typingPhrases);

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black font-sans transition-colors duration-300">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} t={t} />

      {/* Hero Section with Parallax */}
      <section id="about" className="pt-32 sm:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">

          <motion.div
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center md:text-left"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase bg-gray-100 dark:bg-gray-800 rounded-full"
            >
              {t.hero.badge}
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight leading-[1.1]">
              {t.hero.name} <br />
              <span className="text-gray-400 dark:text-gray-500">{t.hero.lastName}</span>
            </h1>
            
            {/* Typing Animation */}
            <div className="h-16 sm:h-20 mb-4">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-200 font-semibold min-h-[2.5rem]">
                {typingText}
                <span className="animate-pulse text-blue-600 dark:text-blue-400">|</span>
              </p>
            </div>
            
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">
              {t.hero.description}
            </p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <a 
                href="#projects" 
                className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2"
                aria-label={t.hero.cta}
              >
                {t.hero.cta} <ArrowRight size={16} aria-hidden="true" />
              </a>
              <div className="flex gap-2 justify-center md:justify-start">
                <a 
                  href="https://github.com/med-mokhtar-nasrali" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2"
                  aria-label={t.hero.github}
                >
                  <FaGithub size={20} aria-hidden="true" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/mohamed-mokhtar-nasrali-458144339/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  aria-label={t.hero.linkedin}
                >
                  <FaLinkedin size={20} aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-2xl rotate-3 hover:rotate-0 transition duration-500 transform hover:scale-105">
              <LazyImage
                src="/profile.png"
                alt="Med Mokhtar Nasrali - Full Stack Developer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative gradient background */}
            <div className="absolute -z-10 top-10 -right-10 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl opacity-20 dark:opacity-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Moving Tech Banner */}
      <TechBanner />

      {/* Technical Skills & Licenses Section */}
      <section id="tech-licenses" className="py-16 sm:py-24 px-4 sm:px-6 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Tech Stack List */}
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">{t.techStack}</h2>
            <div className="space-y-6 sm:space-y-8">
              {[
                { category: "Frontend", items: ["Angular", "React", "Tailwind CSS", "Bootstrap", "Three.js"] },
                { category: "Backend", items: ["Spring Boot", "Node.js", "Express", "Flask", "Python"] },
                { category: "Database", items: ["MySQL", "MongoDB", "PostgreSQL"] },
                { category: "Tools", items: ["Git", "Docker", "Trello", "Figma"] }
              ].map((skill, idx) => (
                <div key={idx}>
                  <h3 className="text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map(s => (
                      <span key={s} className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium shadow-sm hover:border-gray-400 dark:hover:border-gray-500 transition cursor-default transform hover:scale-105">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Licenses / Certifications */}
          <AnimatedSection delay={0.2}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">{t.certifications}</h2>
            <div className="grid gap-4">
              {LICENSES_DATA.map((lic, idx) => (
                <a
                  key={idx}
                  href={lic.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 sm:gap-4 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md hover:border-blue-200 dark:hover:border-blue-500 transition group focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transform hover:scale-105"
                  aria-label={`View ${lic.title} certification`}
                >
                  <div className="text-blue-600 dark:text-blue-400 mt-1 bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white transition flex-shrink-0">
                    <Award size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{lic.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{lic.issuer} • {lic.date}</p>
                  </div>
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12">{t.projects.title}</h2>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {PROJECTS.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 0.1}>
              <motion.article
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group shadow-sm flex flex-col relative h-full"
              >
              <div 
                onClick={() => setSelectedProject(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
                className={`h-64 w-full ${project.gradient} relative overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-inset`}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${project.title}`}
              >
                <LazyImage
                  src={project.image}
                  alt={`${project.title} project preview`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                {project.status === "Coming Soon" && (
                  <div className="absolute top-4 right-4 bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                    <Loader2 size={12} className="animate-spin" aria-hidden="true" /> Work in Progress
                  </div>
                )}
              </div>
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                <h3 
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded"
                  role="button"
                  tabIndex={0}
                >
                  {project.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-3">{project.shortDesc}</p>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 4).map(t => (
                      <span key={t} className="text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                  {project.status === "Coming Soon" ? (
                    <button 
                      disabled
                      className="w-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 py-2 px-4 rounded-lg text-xs font-bold text-center cursor-not-allowed flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-600"
                      aria-label="Project coming soon"
                    >
                      <Loader2 size={14} className="animate-spin" aria-hidden="true" /> Coming Soon
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-black dark:bg-white text-white dark:text-black py-2 px-4 rounded-lg text-xs font-bold text-center hover:bg-gray-800 dark:hover:bg-gray-200 transition transform hover:scale-105 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2"
                        aria-label={`View ${project.title} code on GitHub`}
                      >
                        <Github size={14} aria-hidden="true" /> Code
                      </a>
                      {project.id === 6 && project.link && project.link !== "#" ? (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-lg text-xs font-bold text-center hover:bg-blue-700 dark:hover:bg-blue-600 transition transform hover:scale-105 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                          aria-label={`View ${project.title} live demo`}
                        >
                          <ArrowRight size={14} aria-hidden="true" /> Live
                        </a>
                      ) : (
                        <button 
                          disabled
                          className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-400 py-2 px-4 rounded-lg text-xs font-bold text-center cursor-not-allowed flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-600"
                          aria-label="Live demo not available"
                        >
                          <Lock size={14} aria-hidden="true" /> Live
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              </motion.article>
            </AnimatedSection>
          ))}
        </div>
      </section>




      {/* Contact Section */}
      <Contact t={t} />

      <footer className="py-6 sm:py-8 text-center text-gray-400 dark:text-gray-500 text-xs sm:text-sm bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800" role="contentinfo">
        <p>© {new Date().getFullYear()} Med Mokhtar Nasrali. {t.footer}.</p>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop showButton={showButton} scrollToTop={scrollToTop} />

      {/* MODAL POPUP */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} close={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;