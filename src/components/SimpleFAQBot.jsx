import React, { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

const faqData = [
    {
        question: "Who i am?",
        answer: "I am a Full Stack Developer with expertise in building web applications. I specialize in both frontend and backend development, creating seamless user experiences.I have a passion for coding and love to solve complex problems with elegant solutions."
    },
    {
        question: "What technologies do you use?",
        answer: "I use React, Node.js, Angular, Spring Boot, Python, Flask, and more."
    },
    {
        question: "What are my certifications?",
        answer: "I have a software development certificate from Coding Dojo Africa."
    },
    {
        question: "What kind of projects have you worked on?",
        answer: "I’ve worked on a variety of web applications ranging from e-commerce platforms to community forums and recipe-sharing apps. My projects often involve full-stack development using technologies like React, Angular, Node.js, Spring Boot, and Python. For example, I developed Freshka, a platform connecting farmers directly to clients, and CookMe, a recipe discovery app with real-time chat features. You can check out my GitHub for more details!"
    }
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
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Button */}
            <button
                onClick={toggleOpen}
                className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
                aria-label="FAQ Chatbot"
            >
                {isOpen ? <FaTimes /> : <FaComments />}
            </button>

            {/* FAQ Panel */}
            {isOpen && (
                <div className="mt-4 w-80 bg-white rounded-xl shadow-xl p-6 text-base">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Need Help?</h3>
                    <div className="space-y-4">
                        {faqData.map((item, index) => (
                            <div key={index}>
                                <button
                                    onClick={() => toggleQuestion(index)}
                                    className="w-full text-left font-medium text-blue-600 hover:underline"
                                >
                                    {item.question}
                                </button>
                                {activeIndex === index && (
                                    <p className="mt-1 text-gray-700">{item.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}
