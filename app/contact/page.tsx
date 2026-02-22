'use client'; // Required for interactive state

import {
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mnjbbjgg', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        alert("Something went wrong. Please try again or contact us via WhatsApp.");
      }
    } catch (error) {
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Header Section */}
      <section className="py-20 bg-[#F9F6F2] text-center">
        <h1 className="text-5xl font-serif uppercase tracking-widest text-[#3B1438] mb-4">
          The Concierge
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 font-light px-4">
          Whether you’re seeking styling advice or have a question about a specific piece, our experts are here to assist you.
        </p>
      </section>

      {/* Added responsive horizontal padding to the main container */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Contact Info (Left Side) - Pushed right with extra padding */}
        <div className="space-y-12 pl-2 md:pl-12 lg:pl-20">
          <div>
            <h2 className="text-xl font-medium mb-6 uppercase tracking-wider text-[#3B1438]">Direct Contact</h2>
            <div className="space-y-6">
              <a href="mailto:support@vellonex.co.uk" className="flex items-center gap-4 group">
                <EnvelopeIcon className="w-6 h-6 text-[#3B1438]" />
                <span className="group-hover:underline font-light text-sm">support@vellonex.co.uk</span>
              </a>
              <div className="flex items-center gap-4">
                <PhoneIcon className="w-6 h-6 text-[#3B1438]" />
                <span className="font-light text-sm">+44 (0) 7565 472445</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-6 uppercase tracking-wider text-[#3B1438]">Client Services</h2>
            <p className="font-light text-gray-600 mb-4 text-sm">Monday – Friday: 9am – 6pm GMT</p>
            <a 
              href="https://wa.me/447565472445" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 border border-[#3B1438] px-6 py-3 text-[#3B1438] hover:bg-[#3B1438] hover:text-white transition-all text-xs tracking-widest uppercase"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              Chat via WhatsApp
            </a>
          </div>
        </div>

        {/* The Form / Success Message (Right Side) */}
        <div className="bg-gray-50 p-8 rounded-sm">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input required name="name" type="text" placeholder="Name" className="w-full border-b border-gray-300 bg-transparent py-3 focus:border-[#3B1438] outline-none transition-colors text-sm" />
                <input required name="email" type="email" placeholder="Email" className="w-full border-b border-gray-300 bg-transparent py-3 focus:border-[#3B1438] outline-none transition-colors text-sm" />
              </div>
              <input required name="subject" type="text" placeholder="Subject" className="w-full border-b border-gray-300 bg-transparent py-3 focus:border-[#3B1438] outline-none transition-colors text-sm" />
              <textarea required name="message" rows={4} placeholder="Message" className="w-full border-b border-gray-300 bg-transparent py-3 focus:border-[#3B1438] outline-none transition-colors resize-none text-sm"></textarea>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full bg-[#3B1438] text-white py-4 uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Submit Inquiry"
                )}
              </button>
            </form>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in fade-in duration-700">
              <CheckCircleIcon className="w-16 h-16 text-green-600 mb-4" />
              <h2 className="text-2xl font-serif text-[#3B1438] mb-2 text-sm uppercase tracking-widest">Thank You</h2>
              <p className="text-gray-600 font-light text-sm">
                Your inquiry has been received. Our concierge team will be in touch shortly.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-6 text-[#3B1438] text-xs underline uppercase tracking-widest"
              >
                Send another message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}