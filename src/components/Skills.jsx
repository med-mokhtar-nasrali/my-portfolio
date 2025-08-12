import { useEffect, useState, useRef } from "react";
import { FaLightbulb, FaCode, FaUsers } from "react-icons/fa";

const skillsData = [
    {
        name: "Problem Solving",
        description: "I approach challenges with creativity and logic, finding efficient solutions.",
        icon: <FaLightbulb className="text-yellow-400 text-5xl" />,
    },
    {
        name: "Clean Code",
        description: "Writing maintainable, readable, and scalable code is my top priority.",
        icon: <FaCode className="text-teal-400 text-5xl" />,
    },
    {
        name: "Collaboration",
        description: "I thrive in team environments, ensuring smooth communication and workflow.",
        icon: <FaUsers className="text-pink-400 text-5xl" />,
    },
];

const Skills = () => {
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(sectionRef.current);

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="py-20 px-6 max-w-6xl mx-auto text-center"
        >
            <h2 className="text-4xl font-bold mb-16">What I Bring to the Table</h2>

            <div className="grid md:grid-cols-3 gap-10">
                {skillsData.map((skill, i) => (
                    <div
                        key={skill.name}
                        className={`p-8 rounded-2xl border border-gray-700 bg-gray-900/50 backdrop-blur-md shadow-lg 
                            transform transition-all duration-700 
                            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                        style={{ transitionDelay: `${i * 150}ms` }}
                    >
                        <div className="mb-6">{skill.icon}</div>
                        <h3 className="text-2xl font-semibold mb-4">{skill.name}</h3>
                        <p className="text-gray-300">{skill.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
