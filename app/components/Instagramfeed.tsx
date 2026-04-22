'use client';

import Script from 'next/script';

export function InstagramFeed() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-serif text-[#1A2266] mb-4">
                        Follow Us on Instagram
                    </h2>
                    <p className="text-gray-500">Catch the latest project highlights and reels</p>
                </div>

                {/* Elfsight Widget Container */}
                <div
                    className="elfsight-app-2bbf345e-9c6b-45ed-8198-c88cd9c6c8aa"
                    data-elfsight-app-lazy
                />

                {/* Elfsight Platform Script */}
                <Script
                    src="https://elfsightcdn.com/platform.js"
                    strategy="afterInteractive"
                />
            </div>
        </section>
    );
}