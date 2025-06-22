import { useEffect, useState, useRef } from "react";

const skillsData = [
    { name: "Frontend", level: 90, color: "bg-teal-500" },
    { name: "Backend", level: 80, color: "bg-purple-500" },
    { name: "Databases", level: 75, color: "bg-yellow-500" },
    { name: "Fullstack", level: 85, color: "bg-pink-500" },
];

const Skills = () => {
    const [progress, setProgress] = useState(skillsData.map(() => 0));
    const sectionRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (!sectionRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let current = 0;
                    const animate = () => {
                        if (current > 100) return;
                        setProgress(skillsData.map(skill => (skill.level * current) / 100));
                        current += 2;
                        setTimeout(animate, 20);
                    };
                    animate();
                }
            },
            { threshold: 0.3 } // trigger when 30% visible
        );

        observer.observe(sectionRef.current);

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, [hasAnimated]);

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="py-20 px-4 max-w-4xl mx-auto text-center"
        >
            <h2 className="text-3xl font-bold mb-12">My Skills</h2>
            <div className="space-y-8">
                {skillsData.map((skill, i) => (
                    <div key={skill.name} className="text-left">
                        <div className="flex justify-between mb-1">
                            <span className="font-semibold text-lg">{skill.name}</span>
                            <span className="font-mono">{Math.round(progress[i])}%</span>
                        </div>
                        <div className="w-full h-6 rounded-full bg-gray-700 overflow-hidden">
                            <div
                                style={{ width: `${progress[i]}%` }}
                                className={`${skill.color} h-full rounded-full transition-width duration-300`}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
