export default function Footer() {
    return (
        <footer className="bg-[#232b7c] text-white relative overflow-hidden">
            {/* Top CTA Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-light mb-1">Step into a field of</h3>
                        <h3 className="text-2xl md:text-3xl font-bold">possibilites, Get in touch!</h3>
                    </div>
                    <a href="/contact" className="inline-block bg-white text-[#232b7c] px-8 py-3 text-[13px] font-bold tracking-widest hover:bg-[#a98946] hover:text-white transition-all uppercase rounded shadow-lg">
                        Contact Us
                    </a>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/20"></div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <h2 className="text-4xl font-black tracking-tighter uppercase">
                                AM<span className="text-[#a98946]">I</span>CO
                            </h2>
                        </div>
                    </div>

                    {/* Connect With Us */}
                    <div>
                        <h4 className="text-sm font-bold tracking-widest mb-6 uppercase">Connect With Us</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <span>
                                    Address: 14/122,<br /> Shipra Path, Mansarovar Sector 1,<br /> Mansarovar, Jaipur, Rajasthan 302020 <br />
                                    <a href="https://share.google/AaSEObkfmwaMBCYK2" target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-2 hover:text-gray-200">View on Google Maps</a>
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <div className="flex flex-col gap-1">
                                    <a href="tel:+918890777424" className="hover:text-gray-200 transition-colors">+91 88907 77424</a>
                                    <a href="tel:+919216388715" className="hover:text-gray-200 transition-colors">+91 92163 88715</a>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <a href="mailto:support@amicosportss.com" className="hover:text-gray-200 transition-colors">support@amicosportss.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Explore */}
                    <div>
                        <h4 className="text-sm font-bold tracking-widest mb-6 uppercase">Explore</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="/about" className="hover:text-gray-200 transition-colors">About Us</a></li>
                            <li><a href="/contact" className="hover:text-gray-200 transition-colors">Contact Us</a></li>
                            <li><a href="/product" className="hover:text-gray-200 transition-colors">Projects</a></li>
                            <li><a href="/brochure.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">Download Brochure</a></li>
                            <li><a href="#" className="hover:text-gray-200 transition-colors">Careers</a></li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h4 className="text-sm font-bold tracking-widest mb-6 uppercase">Follow Us Online</h4>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/amicosports/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors" aria-label="Facebook">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/amicosports/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors" aria-label="Instagram">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-gray-200 transition-colors" aria-label="LinkedIn">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            <a href="https://www.youtube.com/channel/UClHcUkd6phOiEZ9ADrj8hVg" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors" aria-label="YouTube">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center md:text-left">
                    <p className="text-xs text-gray-300">© 2025 Amico Sports | All rights reserved</p>
                </div>
            </div>

            {/* Decorative Shuttlecock (Visual Approximation) */}
            <div className="absolute bottom-20 right-0 opacity-20 pointer-events-none hidden lg:block">
                {/* We can't use an image we don't have, but we can put a subtle svg pattern or just leave it clean. 
                I'll leave it clean for now to avoid broken images, or I could reuse the logo if desired.
                The user asked for "like this" referring to the layout mainly. 
            */}
            </div>
        </footer>

    )
}