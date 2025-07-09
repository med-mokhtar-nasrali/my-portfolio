// src/components/ContactForm.jsx
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
    const form = useRef();
    const [status, setStatus] = useState("");
    const [sending, setSending] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setSending(true);
        emailjs
            .sendForm(
                "service_2xabfoy",    // <-- Replace with your EmailJS Service ID
                "template_12id7e9",   // <-- Replace with your EmailJS Template ID
                form.current,
                "zK1VYa0njiHvCc8MG"     // <-- Replace with your EmailJS Public Key
            )
            .then(
                () => {
                    setStatus("Message sent successfully! 🎉");
                    setSending(false);
                    form.current.reset();
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
        <div className="max-w-xl mx-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 shadow-xl ring-1 ring-teal-500/40">
            <h3 className="text-3xl font-bold mb-6 text-center text-teal-400 tracking-wide">
                Send Me a Message
            </h3>

            <form ref={form} onSubmit={sendEmail} className="space-y-6" noValidate>
                <input
                    type="text"
                    name="user_name"
                    placeholder="Your Name"
                    required
                    className="w-full bg-gray-800 text-gray-100 placeholder-gray-400 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                />

                <input
                    type="email"
                    name="user_email"
                    placeholder="Your Email"
                    required
                    className="w-full bg-gray-800 text-gray-100 placeholder-gray-400 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                />

                <textarea
                    name="message"
                    rows="5"
                    placeholder="Your Message"
                    required
                    className="w-full bg-gray-800 text-gray-100 placeholder-gray-400 rounded-xl px-5 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                ></textarea>

                <button
                    type="submit"
                    disabled={sending}
                    className={`w-full py-3 rounded-xl font-semibold text-lg
            text-white bg-gradient-to-r from-teal-400 to-blue-500
            hover:from-teal-500 hover:to-blue-600
            transition disabled:opacity-60 disabled:cursor-not-allowed
            shadow-lg`}
                >
                    {sending ? "Sending..." : "Send"}
                </button>

                {status && (
                    <p
                        className={`text-center mt-2 font-medium ${status.includes("successfully") ? "text-green-400" : "text-red-400"
                            }`}
                    >
                        {status}
                    </p>
                )}
            </form>
        </div>
    );
}
