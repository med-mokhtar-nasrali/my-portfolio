import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
    const form = useRef();
    const [status, setStatus] = useState("");
    const [sending, setSending] = useState(false);
    const [errors, setErrors] = useState({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validate = (data) => {
        const newErrors = {};
        if (!data.user_name.trim()) newErrors.user_name = "Name is required";
        if (!data.user_email.trim()) newErrors.user_email = "Email is required";
        else if (!emailRegex.test(data.user_email))
            newErrors.user_email = "Please enter a valid email";
        if (!data.message.trim()) newErrors.message = "Message cannot be empty";
        return newErrors;
    };

    const sendEmail = (e) => {
        e.preventDefault();

        const formData = {
            user_name: form.current.user_name.value,
            user_email: form.current.user_email.value,
            message: form.current.message.value,
        };

        const validationErrors = validate(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        setSending(true);
        emailjs
            .sendForm(
                "service_2xabfoy", // Your EmailJS Service ID
                "template_12id7e9", // Your EmailJS Template ID
                form.current,
                "zK1VYa0njiHvCc8MG" // Your EmailJS Public Key
            )
            .then(
                () => {
                    setStatus("Message sent successfully! 🎉");
                    setSending(false);
                    form.current.reset();
                    setErrors({});
                    setTimeout(() => setStatus(""), 5000);
                },
                (error) => {
                    setStatus("Failed to send message. Please try again.");
                    setSending(false);
                    console.error("EmailJS error:", error);
                }
            );
    };

    return (
        <div className="max-w-lg mx-auto bg-gray-900 rounded-2xl p-10 border border-teal-600 shadow-lg">
            <h3 className="text-4xl font-extrabold mb-8 text-center text-teal-400 tracking-wide">
                Contact Me
            </h3>

            <form ref={form} onSubmit={sendEmail} noValidate className="space-y-7">
                {/* NAME */}
                <div>
                    <label
                        htmlFor="user_name"
                        className="block text-sm font-semibold text-gray-300 mb-2"
                    >
                        Name
                    </label>
                    <input
                        id="user_name"
                        name="user_name"
                        type="text"
                        placeholder="Your Name"
                        aria-invalid={errors.user_name ? "true" : "false"}
                        className={`w-full px-5 py-3 rounded-lg bg-gray-800 text-gray-200 placeholder-teal-400
            focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-60
            transition-shadow
            ${errors.user_name
                                ? "border-2 border-red-500 shadow-red-600"
                                : "border border-gray-700"
                            }`}
                    />
                    {errors.user_name && (
                        <p role="alert" className="mt-1 text-red-500 text-sm">
                            {errors.user_name}
                        </p>
                    )}
                </div>

                {/* EMAIL */}
                <div>
                    <label
                        htmlFor="user_email"
                        className="block text-sm font-semibold text-gray-300 mb-2"
                    >
                        Email
                    </label>
                    <input
                        id="user_email"
                        name="user_email"
                        type="email"
                        placeholder="you@example.com"
                        aria-invalid={errors.user_email ? "true" : "false"}
                        className={`w-full px-5 py-3 rounded-lg bg-gray-800 text-gray-200 placeholder-teal-400
            focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-60
            transition-shadow
            ${errors.user_email
                                ? "border-2 border-red-500 shadow-red-600"
                                : "border border-gray-700"
                            }`}
                    />
                    {errors.user_email && (
                        <p role="alert" className="mt-1 text-red-500 text-sm">
                            {errors.user_email}
                        </p>
                    )}
                </div>

                {/* MESSAGE */}
                <div>
                    <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-gray-300 mb-2"
                    >
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows="6"
                        placeholder="Your message here..."
                        aria-invalid={errors.message ? "true" : "false"}
                        className={`w-full px-5 py-3 rounded-lg bg-gray-800 text-gray-200 placeholder-teal-400
            resize-none focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-60
            transition-shadow
            ${errors.message
                                ? "border-2 border-red-500 shadow-red-600"
                                : "border border-gray-700"
                            }`}
                    ></textarea>
                    {errors.message && (
                        <p role="alert" className="mt-1 text-red-500 text-sm">
                            {errors.message}
                        </p>
                    )}
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-400 to-blue-500 text-gray-900 font-bold text-lg
          hover:from-teal-500 hover:to-blue-600
          focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-70
          transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {sending ? "Sending..." : "Send Message"}
                </button>

                {/* STATUS MESSAGE */}
                {status && (
                    <p
                        className={`mt-5 text-center font-semibold select-none ${status.includes("successfully") ? "text-green-400" : "text-red-400"
                            }`}
                        role="alert"
                    >
                        {status}
                    </p>
                )}
            </form>
        </div>
    );
}
