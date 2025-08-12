import { useState, useEffect } from "react";
import { FaFolderOpen, FaGithub } from "react-icons/fa";

const ProjectCard = ({ title, desc, image, fullDesc, githubLink }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Close modal on ESC key press
    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [isOpen]);

    // Prevent background scroll when modal open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        setIsOpen(true);
                    }
                }}
                aria-label={`Open details for project: ${title}`}
                className="
          bg-gradient-to-tr from-gray-800 to-gray-900
          w-96 h-[26rem] rounded-2xl shadow-xl
          backdrop-blur-md cursor-pointer
          flex flex-col
          p-6
          transition-transform duration-300 ease-in-out
          hover:scale-[1.04] hover:shadow-2xl
          focus:outline-none focus:ring-4 focus:ring-teal-400
        "
            >
                {/* Image or Folder Icon */}
                <div className="flex justify-center mb-4 h-40">
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            className="object-cover rounded-xl shadow-md max-h-full max-w-full"
                            loading="lazy"
                        />
                    ) : (
                        <FaFolderOpen className="text-teal-400 text-9xl self-center" />
                    )}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-center text-white mb-2 truncate">
                    {title}
                </h3>

                {/* Short Description */}
                <p className="text-gray-300 text-center text-sm flex-grow mb-4 line-clamp-5">
                    {desc}
                </p>

                {/* Bottom Section */}
                <div className="flex justify-center gap-4">
                    {githubLink && (
                        <a
                            href={githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="
                inline-flex items-center gap-2
                px-5 py-2
                bg-teal-500 hover:bg-teal-600
                rounded-lg
                text-white font-semibold
                transition
                text-sm
                shadow-md
              "
                            aria-label={`View ${title} on GitHub`}
                        >
                            <FaGithub /> GitHub
                        </a>
                    )}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(true);
                        }}
                        className="
              px-5 py-2
              bg-gray-700 hover:bg-gray-600
              rounded-lg
              text-white font-semibold
              transition
              text-sm
              shadow-md
            "
                        aria-haspopup="dialog"
                        aria-expanded={isOpen}
                    >
                        Details
                    </button>
                </div>
            </div>

            {/* Modal Overlay */}
            {isOpen && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-6"
                >
                    {/* Modal Content */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gray-900 rounded-3xl max-w-full sm:max-w-4xl p-10 text-gray-200 shadow-2xl overflow-y-auto max-h-[90vh] animate-fadeIn scale-up"
                    >
                        <h2
                            id="modal-title"
                            className="text-4xl font-bold mb-6 flex items-center gap-3"
                        >
                            <FaFolderOpen className="text-teal-400" />
                            {title}
                        </h2>

                        {image && (
                            <img
                                src={image}
                                alt={title}
                                className="w-full max-h-96 object-cover rounded-xl mb-8 mx-auto shadow-lg"
                            />
                        )}

                        <p className="text-lg whitespace-pre-line">{fullDesc || desc}</p>

                        {githubLink && (
                            <a
                                href={githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center mt-8 px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-semibold transition gap-3 text-lg"
                            >
                                <FaGithub />
                                View on GitHub
                            </a>
                        )}

                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-10 px-8 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg text-white font-semibold text-lg"
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
        /* Clamp multiline text */
        .line-clamp-5 {
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }
        @keyframes fadeIn {
          from {opacity: 0;}
          to {opacity: 1;}
        }
      `}</style>
        </>
    );
};

export default ProjectCard;
