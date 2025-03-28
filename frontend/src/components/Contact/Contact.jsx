import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="bg-[#0F0F1A] text-white py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-purple-300 mb-6">
          Get in Touch
        </h2>
        <p className="text-gray-400 mb-8">
          Have questions? Feel free to reach out.
        </p>

        <form className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 bg-[#1C1C2E] text-white rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 bg-[#1C1C2E] text-white rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full p-3 bg-[#1C1C2E] text-white rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
          ></textarea>

          <button className="w-full bg-[#553181] hover:bg-[#8162a7] text-white font-semibold py-3 rounded-md transition">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
