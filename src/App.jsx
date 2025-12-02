import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Send, Award, X, Github, ArrowRight, Linkedin, Mail, Lock, Loader2, Code2
} from 'lucide-react';
import {
  FaReact, FaNodeJs, FaPython, FaAngular, FaJava, FaDocker, FaGitAlt, FaLinkedin, FaGithub, FaEnvelope,
  FaLightbulb, FaCode, FaUsers
} from 'react-icons/fa';
import {
  SiTailwindcss, SiMongodb, SiMysql, SiSpring, SiFlask, SiBootstrap, SiSocketdotio, SiTypescript
} from 'react-icons/si';
import emailjs from '@emailjs/browser';

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
    id: 5,
    title: "Eagle Vision 3D Platform",
    shortDesc: "Interactive architecture showcase with 3D tours and AI assistance.",
    fullDesc: "A cutting-edge architectural platform allowing users to take immersive virtual tours of properties via 3D models. The system features a real-time AI Chatbot linked to the database to answer queries about house availability and details. Includes a secure Admin Dashboard for architects to modify property specs, manage assets via Cloudinary, and track user inquiries in real-time.",
    features: ["3D Virtual Tours", "AI Real-Estate Chatbot", "Admin/Architect Dashboard", "Real-time Availability"],
    tech: ["React", "MySQL", "Tailwind", "Cloudinary", "JWT", "Sonner"],
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

// 1. Modal Component
const ProjectModal = ({ project, close }) => {
  const isPrivate = project.status === "Coming Soon";

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={close}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        <button onClick={close} className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-gray-100 rounded-full transition z-10 shadow-sm">
          <X size={20} className="text-gray-900" />
        </button>

        {/* Header Image */}
        <div className={`h-56 w-full ${project.gradient} relative overflow-hidden`}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          {isPrivate && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
              <span className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Work in Progress
              </span>
            </div>
          )}
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-3xl font-bold text-gray-900">{project.title}</h2>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed whitespace-pre-line">{project.fullDesc}</p>

          <div className="mb-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Key Features</h3>
            <ul className="grid grid-cols-2 gap-2">
              {project.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                  <div className="w-1.5 h-1.5 bg-black rounded-full"></div> {feat}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 mb-8 border-t border-gray-100 pt-6">
            {project.tech.map(t => (
              <span key={t} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            {isPrivate ? (
              <button disabled className="flex-1 bg-gray-100 text-gray-400 py-3 rounded-lg font-bold text-center cursor-not-allowed flex items-center justify-center gap-2 border border-gray-200">
                <Lock size={18} /> Private Repository
              </button>
            ) : (
              <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 bg-black text-white py-3 rounded-lg font-bold text-center hover:bg-gray-800 transition shadow-lg shadow-gray-200 flex items-center justify-center gap-2">
                <Github size={18} /> View Code on GitHub
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex justify-between items-center transition-all">
    <div className="text-lg font-bold text-gray-900 tracking-tight">
      Med Mokhtar <span className="text-gray-400">Nasrali</span>
    </div>
    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
      <a href="#about" className="hover:text-black transition">About</a>
      <a href="#projects" className="hover:text-black transition">Projects</a>
      <a href="#tech-licenses" className="hover:text-black transition">Skills</a>
    </div>
    <a
      href="/Med-Mokhtar-Nasrali-Resume.pdf"
      download
      className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition shadow-md"
    >
      <FileText size={14} /> Resume
    </a>
  </nav>
);

const TechBanner = () => (
  <div className="py-12 bg-white border-y border-gray-100 overflow-hidden relative">
    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

    <div className="flex animate-loop-scroll whitespace-nowrap">
      {[...TECH_STACK, ...TECH_STACK].map((tech, index) => (
        <div key={index} className="mx-12 flex flex-col items-center gap-2 group cursor-default">
          <span className="text-4xl text-gray-400 group-hover:text-black transition duration-300 transform group-hover:scale-110">
            {tech.icon}
          </span>
          <span className="text-xs font-medium text-gray-300 group-hover:text-gray-500 transition">{tech.name}</span>
        </div>
      ))}
    </div>
  </div>
);



const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');
    emailjs.sendForm('service_2xabfoy', 'template_12id7e9', form.current, 'zK1VYa0njiHvCc8MG')
      .then(() => { setStatus('success'); e.target.reset(); }, () => setStatus('error'));
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Contact Me</h2>
        <p className="text-gray-500">Available for freelance opportunities and full-time roles.</p>

        <div className="flex justify-center gap-6 mt-6">
          <a href="https://github.com/med-mokhtar-nasrali" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition text-2xl"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/mohamed-mokhtar-nasrali-458144339/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 transition text-2xl"><FaLinkedin /></a>
          <a href="mailto:mokhtarbackup03@gmail.com" className="text-gray-400 hover:text-red-500 transition text-2xl"><FaEnvelope /></a>
        </div>
      </div>

      <form ref={form} onSubmit={sendEmail} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" name="user_name" placeholder="Name" required className="bg-gray-50 border border-gray-200 text-gray-900 rounded-lg p-3 focus:border-black focus:ring-1 focus:ring-black outline-none transition" />
          <input type="email" name="user_email" placeholder="Email" required className="bg-gray-50 border border-gray-200 text-gray-900 rounded-lg p-3 focus:border-black focus:ring-1 focus:ring-black outline-none transition" />
        </div>
        <textarea name="message" placeholder="Message" rows="4" required className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg p-3 focus:border-black focus:ring-1 focus:ring-black outline-none transition"></textarea>
        <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold transition hover:bg-gray-800 shadow-lg flex justify-center items-center gap-2">
          {status === 'sending' ? 'Sending...' : <><Send size={18} /> Send Message</>}
        </button>
        {status === 'success' && <p className="text-green-600 text-center text-sm font-medium">Message sent successfully.</p>}
      </form>
    </section>
  );
};

// --- MAIN APP ---
function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="bg-white min-h-screen text-gray-900 selection:bg-black selection:text-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section id="about" className="pt-40 pb-20 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left"
          >
            <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-gray-500 uppercase bg-gray-100 rounded-full">
              Full Stack Developer
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-[1.1]">
              Med Mokhtar <br />
              <span className="text-gray-400">Nasrali.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">
              Specialized in building scalable applications with Spring Boot, Angular, and MERN Stack.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="#projects" className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition shadow-lg flex items-center gap-2">
                View Work <ArrowRight size={16} />
              </a>
              <div className="flex gap-2">
                <a href="https://github.com/med-mokhtar-nasrali" target="_blank" rel="noreferrer" className="p-3 bg-gray-100 rounded-full text-gray-900 hover:bg-gray-200 transition"><FaGithub size={20} /></a>
                <a href="https://www.linkedin.com/in/mohamed-mokhtar-nasrali-458144339/" target="_blank" rel="noreferrer" className="p-3 bg-gray-100 rounded-full text-gray-900 hover:bg-gray-200 transition"><FaLinkedin size={20} /></a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-gray-100 shadow-2xl rotate-3 hover:rotate-0 transition duration-500">
              <img
                src="/profile.png"
                alt="Med Mokhtar Nasrali"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Moving Tech Banner */}
      <TechBanner />

      {/* Technical Skills & Licenses Section */}
      <section id="tech-licenses" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Tech Stack List */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Technical Stack</h2>
            <div className="space-y-8">
              {[
                { category: "Frontend", items: ["Angular", "React", "Tailwind CSS", "Bootstrap", "Three.js"] },
                { category: "Backend", items: ["Spring Boot", "Node.js", "Express", "Flask", "Python"] },
                { category: "Database", items: ["MySQL", "MongoDB", "PostgreSQL"] },
                { category: "Tools", items: ["Git", "Docker", "Trello", "Figma"] }
              ].map((skill, idx) => (
                <div key={idx}>
                  <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map(s => (
                      <span key={s} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 font-medium shadow-sm hover:border-gray-400 transition cursor-default">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Licenses / Certifications (Updated Data) */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Certifications</h2>
            <div className="grid gap-4">
              {LICENSES_DATA.map((lic, idx) => (
                <a
                  key={idx}
                  href={lic.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-200 transition group"
                >
                  <div className="text-blue-600 mt-1 bg-blue-100 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition">{lic.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{lic.issuer} • {lic.date}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Selected Work</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedProject(project)}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group shadow-sm flex flex-col relative"
            >
              <div className={`h-64 w-full ${project.gradient} relative overflow-hidden`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                {project.status === "Coming Soon" && (
                  <div className="absolute top-4 right-4 bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                    <Loader2 size={12} className="animate-spin" /> Work in Progress
                  </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-3">{project.shortDesc}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map(t => (
                    <span key={t} className="text-[10px] uppercase tracking-wider font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>




      {/* Contact Section */}
      <Contact />

      <footer className="py-8 text-center text-gray-400 text-sm bg-white border-t border-gray-100">
        <p>© {new Date().getFullYear()} Med Mokhtar Nasrali. All rights reserved.</p>
      </footer>

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