import React, { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

const faqData = [
    {
        question: "What technologies do you use?",
        answer: "I use React, Node.js, Angular, Spring Boot, Python, Flask, and more."
    },
    {
        question: "Where can I see your projects?",
        answer: "Scroll to the Projects section on this page."
    },
    {
        question: "How to contact you?",
        answer: "You can use the email or social links in the Contact section below."
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
