import { useEffect, useRef, useState } from "react";

const licensesData = [
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

const Licenses = () => {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!sectionRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
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
            id="licenses"
            ref={sectionRef}
            className="py-20 px-4 max-w-4xl mx-auto text-center"
        >
            <h2 className="text-3xl font-bold mb-12">Licenses & Certifications</h2>
            <div className="space-y-8">
                {licensesData.map(({ title, issuer, date, link }, i) => (
                    <a
                        key={i}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
              block p-6 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg
              transform transition-transform duration-500
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              hover:scale-105 hover:shadow-2xl
            `}
                        style={{ transitionDelay: `${i * 150}ms` }}
                    >
                        <h3 className="text-xl font-semibold mb-2">{title}</h3>
                        <p className="text-gray-400">{issuer}</p>
                        <p className="text-gray-500 text-sm mt-1">{date}</p>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Licenses;
