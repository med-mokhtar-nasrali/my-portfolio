import { useState, useEffect } from "react";

const navLinks = [
    { id: "about", label: "About" },
    { id: "technologies", label: "Technologies" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "licenses", label: "Licenses" },
    { id: "contact", label: "Contact" },
];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeId, setActiveId] = useState("about");

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + window.innerHeight / 3;
            let current = "about";
            for (const link of navLinks) {
                const section = document.getElementById(link.id);
                if (section && section.offsetTop <= scrollPos) {
                    current = link.id;
                }
            }
            setActiveId(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id) => {
        setMenuOpen(false);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-80 backdrop-blur-md z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-teal-400 cursor-pointer" onClick={() => scrollToSection("about")}>
                    MyPortfolio
                </div>

                {/* Desktop menu */}
                <ul className="hidden md:flex space-x-8 text-gray-300">
                    {navLinks.map(({ id, label }) => (
                        <li
                            key={id}
                            className={`cursor-pointer hover:text-teal-400 transition ${activeId === id ? "text-teal-400 font-semibold" : ""
                                }`}
                            onClick={() => scrollToSection(id)}
                        >
                            {label}
                        </li>
                    ))}
                </ul>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-gray-300 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <ul className="md:hidden bg-gray-900 bg-opacity-90 backdrop-blur-md flex flex-col space-y-2 py-4 px-6 text-gray-300">
                    {navLinks.map(({ id, label }) => (
                        <li
                            key={id}
                            className={`cursor-pointer hover:text-teal-400 transition ${activeId === id ? "text-teal-400 font-semibold" : ""
                                }`}
                            onClick={() => scrollToSection(id)}
                        >
                            {label}
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
