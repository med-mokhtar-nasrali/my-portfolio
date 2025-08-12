import React, { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

const faqData = [
    {
        question: "Who am I?",
        answer:
            "I am a Full Stack Developer with expertise in building web applications. I specialize in both frontend and backend development, creating seamless user experiences. I have a passion for coding and love to solve complex problems with elegant solutions.",
    },
    {
        question: "What technologies do you use?",
        answer: "I use React, Node.js, Angular, Spring Boot, Python, Flask, and more.",
    },
    {
        question: "What are my certifications?",
        answer: "I have a software development certificate from Coding Dojo Africa.",
    },
    {
        question: "What kind of projects have you worked on?",
        answer:
            "I’ve worked on various web applications including e-commerce platforms, community forums, and recipe-sharing apps. My projects often involve full-stack development using technologies like React, Angular, Node.js, Spring Boot, and Python. For example, Freshka connects farmers directly to clients, and CookMe is a recipe discovery app with real-time chat. Check my GitHub for more!",
    },
];

export default function SimpleFAQBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        setActiveIndex(null);
    };

    const toggleQuestion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Button */}
            <button
                onClick={toggleOpen}
                aria-label="Toggle FAQ Chatbot"
                className="bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:ring-teal-400 focus:outline-none rounded-full p-5 shadow-lg transition-colors duration-300 text-white text-2xl flex items-center justify-center"
            >
                {isOpen ? <FaTimes /> : <FaComments />}
            </button>

            {/* FAQ Panel */}
            {isOpen && (
                <div
                    role="region"
                    aria-live="polite"
                    className="mt-4 w-80 bg-gray-900 rounded-2xl shadow-xl p-6 text-gray-200 text-base font-sans max-h-[400px] overflow-y-auto"
                    style={{ boxShadow: "0 12px 24px rgb(14 165 233 / 0.3)" }}
                >
                    <h3 className="text-center text-xl font-bold text-teal-400 mb-5 select-none">
                        Need Help?
                    </h3>

                    <div className="space-y-4">
                        {faqData.map((item, index) => (
                            <div key={index}>
                                <button
                                    onClick={() => toggleQuestion(index)}
                                    aria-expanded={activeIndex === index}
                                    aria-controls={`faq-answer-${index}`}
                                    className="w-full text-left font-semibold text-teal-400 hover:underline focus:outline-none focus:ring-2 focus:ring-teal-400 rounded-md px-1"
                                >
                                    {item.question}
                                </button>

                                <div
                                    id={`faq-answer-${index}`}
                                    className={`mt-1 text-gray-300 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${activeIndex === index
                                            ? "max-h-96 opacity-100"
                                            : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
