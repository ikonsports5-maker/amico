import React from 'react';

function ContactPage() {
  const contactInfo = [
    {
      title: "Our Office",
      details: ["123 Sports Arena Way", "New Delhi, Delhi 110001"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Contact Details",
      details: ["+91 98765 43210", "info@amicosports.com"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Business Hours",
      details: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: Closed"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-[#F5F5F2] min-h-screen">
      {/* Header Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#a98946] text-xs font-bold tracking-[0.2em] uppercase block mb-3">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-light text-[#1A2266] mb-6">
              Let's Build Your Vision
            </h1>
            <div className="w-20 h-1 bg-[#a98946] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information Cards */}
            <div className="lg:col-span-1 space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-5">
                  <div className="text-[#a98946] mt-1">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-[#1A2266] font-semibold text-lg mb-2">{info.title}</h3>
                    {info.details.map((line, i) => (
                      <p key={i} className="text-gray-500 text-sm leading-relaxed">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#1A2266] text-sm font-semibold mb-2 uppercase tracking-wider">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-[#F5F5F2] border-none rounded-lg p-4 text-gray-700 focus:ring-2 focus:ring-[#a98946] outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-[#1A2266] text-sm font-semibold mb-2 uppercase tracking-wider">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full bg-[#F5F5F2] border-none rounded-lg p-4 text-gray-700 focus:ring-2 focus:ring-[#a98946] outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[#1A2266] text-sm font-semibold mb-2 uppercase tracking-wider">Subject</label>
                    <input 
                      type="text" 
                      className="w-full bg-[#F5F5F2] border-none rounded-lg p-4 text-gray-700 focus:ring-2 focus:ring-[#a98946] outline-none transition-all"
                      placeholder="Padel Court Construction"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1A2266] text-sm font-semibold mb-2 uppercase tracking-wider">Message</label>
                    <textarea 
                      rows={5}
                      className="w-full bg-[#F5F5F2] border-none rounded-lg p-4 text-gray-700 focus:ring-2 focus:ring-[#a98946] outline-none transition-all"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full md:w-auto bg-[#1A2266] hover:bg-[#a98946] text-white font-bold py-4 px-10 rounded-full transition-colors duration-300 uppercase tracking-widest text-sm"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Optional Map Placeholder */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto h-[400px] bg-gray-200 rounded-2xl overflow-hidden shadow-inner relative">
          {/* You can drop a Google Maps iframe here */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-light italic">
            [ Interactive Map Location ]
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;