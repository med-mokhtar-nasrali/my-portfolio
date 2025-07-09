import { useState } from "react";

const ProjectCard = ({ title, desc, image, fullDesc, githubLink }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-md transition transform hover:-translate-y-2 hover:shadow-2xl animate-fadeIn flex flex-col items-center cursor-pointer"
            >
                {image && (
                    <img
                        src={image}
                        alt={title}
                        className="w-full max-h-56 object-cover rounded-lg mb-6 mx-auto"
                    />
                )}
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-300 text-sm">{desc}</p>
            </div>

            {/* Modal Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
                >
                    {/* Modal content */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gray-900 rounded-xl max-w-full sm:max-w-3xl p-6 sm:p-8 text-gray-200 shadow-xl animate-fadeIn scale-up overflow-y-auto max-h-[90vh]"
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{title}</h2>
                        {image && (
                            <img
                                src={image}
                                alt={title}
                                className="w-full max-h-56 sm:max-h-72 object-cover rounded-lg mb-6 mx-auto"
                            />
                        )}
                        <p className="text-sm sm:text-base whitespace-pre-line">{fullDesc || desc}</p>

                        {githubLink && (
                            <a
                                href={githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-6 mr-4 px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-white font-semibold transition"
                            >
                                View on GitHub
                            </a>
                        )}

                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-6 px-6 py-2 bg-teal-500 hover:bg-teal-600 rounded-md text-white font-semibold"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <style>{`
        @keyframes scaleUp {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .scale-up {
          animation: scaleUp 0.3s ease forwards;
        }
      `}</style>
        </>
    );
};

export default ProjectCard;
