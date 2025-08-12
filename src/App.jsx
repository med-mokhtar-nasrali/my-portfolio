import AnimatedBackground from "./components/AnimatedBackground";
import { FaGithub, FaLinkedin, FaEnvelope, FaReact, FaNode, FaPython, FaAngular } from "react-icons/fa";
import { HiCube } from "react-icons/hi";
import { SiMongodb, SiTailwindcss, SiSpring, SiFlask, SiMysql } from "react-icons/si";
import ProjectCard from "./components/ProjectCard";
import Skills from "./components/Skills";
import Licenses from "./components/Licenses";
import Navbar from "./components/Navbar";
import SimpleFAQBot from "./components/SimpleFAQBot";
import ContactForm from "./components/ContactForm";



function App() {
  return (
    <>
      <AnimatedBackground />
      <main className="relative z-10 min-h-screen overflow-x-hidden">
        <Navbar />

        <section
          id="about"
          className="py-28 px-6 max-w-4xl mx-auto flex flex-col items-center gap-8 text-center"
        >
          <img
            src="/Profile.jpg"
            alt="Mohamed Mokhtar Nasrali"
            className="w-56 h-56 rounded-full object-cover shadow-2xl hover:scale-110 transition-transform duration-500 ease-in-out"
          />
          <h1 className="text-5xl font-extrabold max-w-3xl leading-tight text-white drop-shadow-md">
            Hello, I’m Mohamed Mokhtar Nasrali
          </h1>
          <p className="max-w-3xl text-xl text-gray-400 leading-relaxed tracking-wide">
            With a strong enthusiasm for web development and its practical applications, I have honed my skills through dedicated learning and hands-on experience. My fast learning abilities and keen attention to detail have enabled me to excel in creating innovative and impactful solutions. I thrive in collaborative environments, enjoy tackling challenges, and eagerly embrace every opportunity to grow and learn. My goal is to join a dynamic team where I can apply my skills effectively and build a meaningful career as a developer.
          </p>
        </section>



        {/* Technologies */}
        <section id="technologies" className="py-20 px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Technologies I Use</h2>
          <div className="flex flex-wrap justify-center gap-8 text-5xl text-teal-400">
            {[
              { Icon: FaReact, name: "React" },
              { Icon: FaAngular, name: "Angular" },
              { Icon: SiTailwindcss, name: "Tailwind" },
              { Icon: HiCube, name: "Three.js" },
              { Icon: FaNode, name: "Node.js" },
              { Icon: SiSpring, name: "Spring" },
              { Icon: FaPython, name: "Python" },
              { Icon: SiFlask, name: "Flask" },
              { Icon: SiMongodb, name: "MongoDB" },
              { Icon: SiMysql, name: "MySQL" },
            ].map(({ Icon, name }) => (
              <div
                key={name}
                className="flex flex-col items-center cursor-pointer transform transition hover:scale-110 hover:text-teal-500 animate-float"
                aria-label={name}
                title={name}
              >
                <Icon className="animate-pulseSlow" />
                <span className="text-sm mt-1">{name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <Skills />

        {/* Licenses */}
        <Licenses />


        {/* PROJECTS */}
        <section id="projects" className="py-20 px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <ProjectCard
              title="Freshka"
              desc="A Web Application serving as a direct connection between farmers and clients. This application allows farmers to sell their fresh products directly to clients and provide flexible fees through discounts. The platform also increases farmers' engagement through a forum which allows chatting, posting, or commenting creating a sense of community."
              image="/freskhabg.png"
              fullDesc={`• UI/UX Design : Developed user-friendly wireframes in Figma facilitating the task distribution and ensuring a functional and optimized user experience.

• Full-Stack Development : Developed the entirety of Front and Back-end secured CRUD web application with login and registration, homepage, user pages and forum.

• Debugging & Deployment : Resolved merging issues in a timely manner ensuring the smooth running of the platform.

Skills: Java · Spring Boot · Spring Security · Angular · HTML · Cascading Style Sheets (CSS) · JavaScript · TypeScript · Bootstrap (Framework) · MySQL · Trello · Figma · Canva · Git · GitHub.`}
              githubLink="https://github.com/jabranebenhadjmessaoud/JavaFinalProject"
            />

            <ProjectCard
              title="CookMe"
              desc="A web application that helps users discover and create recipes by solving everyday common challenges like lack of ingredients according to dietary needs/preferences, or time constraints."
              image="/cookme.png"
              fullDesc={`• Visitors:
• Access to the homepage and general platform overview.
Registered Users:
• Full access to search recipes, save favorites, leave comments and ratings, and chat with others.
Admins:
• Manage users, recipes, and categories via an intuitive admin dashboard.
Key Features:
• Ingredient-Based Search: Users can input available ingredients to discover matching recipes.
• Category and Time Filters: Find recipes by type (e.g., breakfast, vegan) or cooking duration.
• Real-Time Chat: Share cooking tips and connect with other users in a live chat environment.
• Personalized Recommendations: Suggestions for picky eaters or adventurous cooks looking to try something new.
• Comments and Ratings: Users can comment on and rate posts to share feedback and enhance the community experience.
Built with Node.js, Express.js, Angular, Socket.io, and MongoDB.

Skills: Angular · Express.js · Nodejs · TypeScript · MongoDB · HTML · Socket.io · Trello · Bootstrap (Framework) · JavaScript · Angular Material · Figma · Cascading Style Sheets (CSS)`}
              githubLink="https://github.com/med-mokhtar-nasrali/MERN-Project"
            />

            <ProjectCard
              title="TalentNest"
              desc="A web application designed to tackle challenges in employment and freelancing platforms, such as unemployment, platform saturation, trust issues, and poor quality services."
              image="/talentnest.png"
              fullDesc={`Visitors:
•Design the homepage and implement intuitive navigation for seamless platform exploration.
•Provide easy access to FAQ and support resources.
Freelancers:
•Enable profile creation and portfolio showcase with dynamic forms.
•Facilitate job application workflows to connect freelancers with opportunities.
Recruiters:
•Create job posting functionality for recruiters to list opportunities efficiently.
•Develop a freelancer matching algorithm to recommend suitable candidates based on skills and history.
•Implement a ratings and reviews system for feedback on completed work.
Admins:
•Manage users and ensure smooth platform operation with an intuitive dashboard.
•Integrate analytics and reporting features for tracking platform performance.
Built with HTML, CSS,Bootstrap,Python, Flask, and SQL

Skills: Python · Flask · MySQL · Stripe Connect · HTML · Trello · Bootstrap (Framework) · JavaScript · Figma · Jinja · Cascading Style Sheets (CSS)`}
              githubLink="https://github.com/med-mokhtar-nasrali/TalentNest"
            />

            <ProjectCard
              title="Smart Grocery"
              desc="A MERN stack web app for efficient pantry and grocery list management. Features secure authentication, real-time updates, and user-friendly design built with React and Tailwind CSS."
              image="/smartgrocery.png"
              fullDesc={`Smart Grocery is a full-stack web application designed to simplify grocery management. It allows users to track pantry items with expiration dates, generate intelligent shopping lists, and receive alerts to minimize food waste. The app features user authentication, a clean UI with React, and a scalable backend.

Technologies & Languages Used:
Frontend: React.js, Tailwind CSS, Axios
Backend: Node.js, Express.js, MongoDB, JWT
Other: Vite, Git`}
              githubLink="https://github.com/med-mokhtar-nasrali/Smart-Grocery-List-Pantry-Manager"
            />
          </div>
        </section>


        <section id="contact" className="py-20 px-4">
          <ContactForm />
        </section>


        {/* CONTACT */}
        <section id="contact" className="py-20 flex flex-col items-center gap-4">
          <h2 className="text-3xl font-bold">Contact Me</h2>
          <div className="flex gap-6 text-3xl">
            <a href="https://github.com/med-mokhtar-nasrali" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/mohamed-mokhtar-nasrali-458144339/" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a href="mailto:mokhtarbackup03@gmail.com">
              <FaEnvelope />
            </a>
          </div>
        </section>
        <SimpleFAQBot />
      </main>
    </>
  );
}

export default App;
