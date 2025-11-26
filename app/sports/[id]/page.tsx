'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';

// Sports data with comprehensive content
const sportsData: Record<string, {
  name: string;
  tagline: string;
  heroImage: string;
  expertiseTitle: string;
  expertiseDescription: string;
  faqs: { question: string; answer: string }[];
  services: { title: string; description: string; icon: string }[];
  productTitle: string;
  productDescription: string;
  productImage: string;
  productFeatures: { title: string; description: string }[];
}> = {
  'cricket-turf': {
    name: 'Cricket Turf',
    tagline: 'designed for optimal performance, durability, and safety',
    heroImage: 'https://images.unsplash.com/photo-1540747913346-19e32778e8cd?w=1600&h=600&fit=crop',
    expertiseTitle: 'Cricket Turf Construction India',
    expertiseDescription: 'At Amico Sports, we deliver ICC-standard cricket turf solutions designed for optimal performance, durability, and safety. Whether for professional clubs, schools, or recreational grounds, our expertise ensures your pitch exceeds expectations. Using cutting-edge artificial cricket turf from international suppliers, we\'ve built 50+ cricket fields and 200+ cricket turfs that are reshaping how the game is played. Our commitment to quality has established us as a leader in cricket turf in India, helping players at every level enjoy the best playing surfaces available.',
    faqs: [
      {
        question: 'Why Invest in a Cricket Turf?',
        answer: 'Cricket turfs provide consistent playing conditions year-round, require minimal maintenance, and offer excellent durability. They are cost-effective in the long run and can be used in all weather conditions.'
      },
      {
        question: 'Why Choose Artificial Cricket Turf?',
        answer: 'Artificial cricket turf offers superior ball bounce consistency, all-weather playability, lower maintenance costs, and longer lifespan compared to natural grass. It\'s the preferred choice for modern cricket facilities.'
      },
      {
        question: 'What Dimensions Do You Need?',
        answer: 'Standard cricket pitch dimensions are 22 yards (20.12 meters) in length. The width of the pitch is 10 feet (3.05 meters). The overall playing area varies based on your requirements and available space.'
      }
    ],
    services: [
      {
        title: 'Design & Consultation',
        description: 'Custom layouts optimized for your site and usage needs.',
        icon: 'design'
      },
      {
        title: 'Earthworks & Preparation',
        description: 'Ground leveling, drainage installation, and base preparation for durability.',
        icon: 'earthwork'
      },
      {
        title: 'Turf Installation',
        description: 'Professional installation of premium artificial cricket turf, ensuring seamless and long-lasting results.',
        icon: 'turf'
      },
      {
        title: 'ICC Certification Assistance',
        description: 'Support in obtaining ICC Quality certification for your field.',
        icon: 'certification'
      },
      {
        title: 'Post-Installation Maintenance',
        description: 'Maintenance packages to keep your turf performing at its best.',
        icon: 'maintenance'
      }
    ],
    productTitle: 'Premium Artificial Cricket Turf',
    productDescription: 'Our products are trusted by professional clubs, schools, and recreational facilities globally, ensuring you receive the best in the industry. Our artificial cricket turf solutions are transforming the landscape of cricket in India, providing players with the best surfaces available. As an official partner of leading manufacturers, we deliver top-quality materials for your cricket field.',
    productImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=600&fit=crop',
    productFeatures: [
      {
        title: 'High-Performance Turf Systems',
        description: 'Advanced fiber technology providing superior ball bounce and spin characteristics matching natural turf.'
      },
      {
        title: 'Durability and Longevity',
        description: 'UV-stabilized materials resistant to wear and weather, ensuring 8-10 years of optimal performance.'
      },
      {
        title: 'Safe and Comfortable',
        description: 'Shock-absorbing underlays reduce player fatigue and injury risk while maintaining excellent playability.'
      },
      {
        title: 'Low Maintenance',
        description: 'Minimal upkeep required compared to natural grass, saving time and costs while maintaining consistent quality.'
      }
    ]
  },
  'tennis-courts': {
    name: 'Tennis Courts',
    tagline: 'designed for optimal playability, durability, and safety',
    heroImage: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=1600&h=600&fit=crop',
    expertiseTitle: 'Tennis Court Construction India',
    expertiseDescription: 'At Amico Sports, we deliver ITF-standard tennis court solutions designed for optimal playability, durability, and safety. Whether for professional clubs, schools, or recreational grounds, our expertise ensures your court exceeds expectations. Using cutting-edge tennis court surfaces from leading suppliers, we\'ve built 100+ tennis courts that are reshaping how the game is played. Our commitment to quality has established us as a leader in tennis court construction in India, helping players at every level enjoy the best playing surfaces available.',
    faqs: [
      {
        question: 'Why Invest in a Tennis Court?',
        answer: 'Tennis courts provide excellent recreational and competitive opportunities, add value to properties, and offer year-round playability with proper surface selection.'
      },
      {
        question: 'Why Choose Artificial Tennis Courts?',
        answer: 'Artificial tennis courts offer consistent ball bounce, minimal maintenance, all-weather playability, and superior durability compared to clay or grass courts.'
      },
      {
        question: 'What Dimensions Do You Need?',
        answer: 'A standard tennis court is 78 feet (23.77 m) long and 36 feet (10.97 m) wide for doubles. Singles courts are 78 feet by 27 feet (8.23 m). Additional space is recommended for run-off areas.'
      }
    ],
    services: [
      {
        title: 'Design & Consultation',
        description: 'Custom layouts optimized for your site and usage needs.',
        icon: 'design'
      },
      {
        title: 'Earthworks & Preparation',
        description: 'Ground leveling, drainage installation, and base preparation for durability.',
        icon: 'earthwork'
      },
      {
        title: 'Surface Installation',
        description: 'Professional installation of premium acrylic or synthetic surfaces, ensuring seamless and long-lasting results.',
        icon: 'turf'
      },
      {
        title: 'ITF Certification Assistance',
        description: 'Support in obtaining ITF certification for your court.',
        icon: 'certification'
      },
      {
        title: 'Post-Installation Maintenance',
        description: 'Maintenance packages to keep your court performing at its best.',
        icon: 'maintenance'
      }
    ],
    productTitle: 'Professional Tennis Court Surfaces',
    productDescription: 'Our products are trusted by professional clubs, schools, and recreational facilities globally, ensuring you receive the best in the industry. Our tennis court solutions are transforming the landscape of tennis in India, providing players with world-class surfaces.',
    productImage: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=600&fit=crop',
    productFeatures: [
      {
        title: 'High-Performance Surface Systems',
        description: 'Advanced acrylic surfaces providing superior ball bounce and consistent play characteristics.'
      },
      {
        title: 'Durability and Longevity',
        description: 'UV-stabilized materials resistant to wear and weather, ensuring years of optimal performance.'
      },
      {
        title: 'Safe and Comfortable',
        description: 'Cushioned surfaces reduce joint stress and injury risk while maintaining excellent playability.'
      },
      {
        title: 'Low Maintenance',
        description: 'Minimal upkeep required, saving time and costs while maintaining consistent quality.'
      }
    ]
  },
  'football-turf': {
    name: 'Football Turf',
    tagline: 'designed for optimal playability, durability, and safety',
    heroImage: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1600&h=600&fit=crop',
    expertiseTitle: 'Football Turf Construction India',
    expertiseDescription: 'At Amico Sports, we deliver FIFA-standard football turf solutions designed for optimal playability, durability, and safety. Whether for professional clubs, schools, or recreational grounds, our expertise ensures your pitch exceeds expectations. Using cutting-edge artificial football turf from Limonta, we\'ve built 7 FIFA-quality football fields and 50+ football turfs that are reshaping how the game is played. Our commitment to quality has established us as a leader in football turf in India, helping players at every level enjoy the best playing surfaces available.',
    faqs: [
      {
        question: 'Why Invest in a Football Turf?',
        answer: 'Football turfs provide consistent playing conditions year-round, require minimal maintenance compared to natural grass, and offer excellent durability. They enable more playing hours and are cost-effective in the long run.'
      },
      {
        question: 'Why Choose Artificial Football Turf?',
        answer: 'Artificial football turf offers all-weather playability, consistent ball roll and bounce, superior durability, lower water consumption, and reduced maintenance costs. It\'s the modern solution for football facilities worldwide.'
      },
      {
        question: 'What Dimensions Do You Need?',
        answer: 'Standard football pitch dimensions range from 100-110 meters in length and 64-75 meters in width. FIFA recommends 105m x 68m for international matches. We can customize based on your available space and requirements.'
      }
    ],
    services: [
      {
        title: 'Design & Consultation',
        description: 'Custom layouts optimized for your site and usage needs.',
        icon: 'design'
      },
      {
        title: 'Earthworks & Preparation',
        description: 'Ground leveling, drainage installation, and base preparation for durability.',
        icon: 'earthwork'
      },
      {
        title: 'Turf Installation',
        description: 'Professional installation of premium artificial football turf, ensuring seamless and long-lasting results.',
        icon: 'turf'
      },
      {
        title: 'FIFA Certification Assistance',
        description: 'Support in obtaining FIFA Quality certification for your field.',
        icon: 'certification'
      },
      {
        title: 'Post-Installation Maintenance',
        description: 'Maintenance packages to keep your turf performing at its best.',
        icon: 'maintenance'
      }
    ],
    productTitle: 'Limonta Artificial Football Turf',
    productDescription: 'Limonta products are trusted by professional clubs, schools, and recreational facilities globally, ensuring you receive the best in the industry. Our artificial football turf solutions are transforming the landscape of football in India, providing players with the best surfaces available. As an official partner of Limonta, a world leader in artificial turf technology, we deliver top-quality materials for your football field.',
    productImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
    productFeatures: [
      {
        title: 'High-Performance Turf Systems',
        description: 'Advanced fiber technology providing superior ball roll, bounce, and player interaction matching natural grass.'
      },
      {
        title: 'Durability and Longevity',
        description: 'UV-stabilized materials resistant to wear and weather, ensuring years of optimal performance with FIFA Quality certification.'
      },
      {
        title: 'Safe and Comfortable',
        description: 'Shock-absorbing underlays reduce player fatigue and injury risk while maintaining excellent playability.'
      },
      {
        title: 'Eco-Friendly',
        description: 'Sustainable manufacturing processes and recyclable materials, reducing water consumption and environmental impact.'
      }
    ]
  },
  'basketball-courts': {
    name: 'Basketball Courts',
    tagline: 'designed for optimal performance, durability, and safety',
    heroImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1600&h=600&fit=crop',
    expertiseTitle: 'Basketball Court Construction India',
    expertiseDescription: 'At Amico Sports, we deliver FIBA-standard basketball court solutions designed for optimal performance, durability, and safety. Whether for professional clubs, schools, or recreational grounds, our expertise ensures your court exceeds expectations. Using cutting-edge basketball court surfaces from leading suppliers, we\'ve built numerous basketball courts that provide exceptional playing conditions. Our commitment to quality has established us as a leader in basketball court construction in India.',
    faqs: [
      {
        question: 'Why Invest in a Basketball Court?',
        answer: 'Basketball courts provide excellent recreational opportunities, add value to properties, and can be used for multiple sports. They require minimal space compared to other sports facilities.'
      },
      {
        question: 'Why Choose Acrylic Basketball Courts?',
        answer: 'Acrylic basketball courts offer consistent ball bounce, excellent grip, weather resistance, and require minimal maintenance. They provide professional-quality playing conditions.'
      },
      {
        question: 'What Dimensions Do You Need?',
        answer: 'A FIBA standard basketball court is 28 meters long and 15 meters wide. NBA courts are slightly larger at 28.7m x 15.2m. We can customize dimensions based on your available space.'
      }
    ],
    services: [
      {
        title: 'Design & Consultation',
        description: 'Custom layouts optimized for your site and usage needs.',
        icon: 'design'
      },
      {
        title: 'Earthworks & Preparation',
        description: 'Ground leveling, drainage installation, and base preparation for durability.',
        icon: 'earthwork'
      },
      {
        title: 'Surface Installation',
        description: 'Professional installation of premium acrylic surfaces, ensuring seamless and long-lasting results.',
        icon: 'turf'
      },
      {
        title: 'FIBA Certification Assistance',
        description: 'Support in obtaining FIBA certification for your court.',
        icon: 'certification'
      },
      {
        title: 'Post-Installation Maintenance',
        description: 'Maintenance packages to keep your court performing at its best.',
        icon: 'maintenance'
      }
    ],
    productTitle: 'Professional Basketball Court Surfaces',
    productDescription: 'Our basketball court products are trusted by professional clubs, schools, and recreational facilities, ensuring you receive the best in the industry. Our solutions provide players with world-class playing surfaces that meet international standards.',
    productImage: 'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=800&h=600&fit=crop',
    productFeatures: [
      {
        title: 'High-Performance Surface Systems',
        description: 'Advanced acrylic surfaces providing superior ball bounce and grip for optimal performance.'
      },
      {
        title: 'Durability and Longevity',
        description: 'Weather-resistant materials ensuring years of consistent performance in all conditions.'
      },
      {
        title: 'Safe and Comfortable',
        description: 'Cushioned surfaces reduce impact stress and enhance player safety.'
      },
      {
        title: 'Low Maintenance',
        description: 'Easy to clean and maintain, saving time and operational costs.'
      }
    ]
  },
  'badminton-courts': {
    name: 'Badminton Courts',
    tagline: 'designed for optimal performance, durability, and safety',
    heroImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1600&h=600&fit=crop',
    expertiseTitle: 'Badminton Court Construction India',
    expertiseDescription: 'At Amico Sports, we deliver BWF-standard badminton court solutions designed for optimal performance, durability, and safety. Whether for professional clubs, schools, or recreational grounds, our expertise ensures your court exceeds expectations. Using premium badminton court flooring from leading suppliers, we\'ve built numerous badminton courts that provide exceptional playing conditions. Our commitment to quality has established us as a leader in badminton court construction in India.',
    faqs: [
      {
        question: 'Why Invest in a Badminton Court?',
        answer: 'Badminton courts provide excellent recreational opportunities, require minimal space, and can accommodate multiple skill levels. They are cost-effective to build and maintain.'
      },
      {
        question: 'Why Choose Professional Badminton Flooring?',
        answer: 'Professional badminton flooring offers consistent shuttle bounce, excellent grip, shock absorption for player safety, and durability. It\'s essential for quality gameplay.'
      },
      {
        question: 'What Dimensions Do You Need?',
        answer: 'A standard badminton court is 13.4 meters long and 6.1 meters wide. Additional space is needed around the court for player movement and safety. Multiple courts can be arranged in larger facilities.'
      }
    ],
    services: [
      {
        title: 'Design & Consultation',
        description: 'Custom layouts optimized for your site and usage needs.',
        icon: 'design'
      },
      {
        title: 'Earthworks & Preparation',
        description: 'Ground leveling and base preparation for durability.',
        icon: 'earthwork'
      },
      {
        title: 'Flooring Installation',
        description: 'Professional installation of premium PVC or wooden flooring, ensuring seamless results.',
        icon: 'turf'
      },
      {
        title: 'BWF Certification Assistance',
        description: 'Support in obtaining BWF certification for your court.',
        icon: 'certification'
      },
      {
        title: 'Post-Installation Maintenance',
        description: 'Maintenance packages to keep your court performing at its best.',
        icon: 'maintenance'
      }
    ],
    productTitle: 'Professional Badminton Court Flooring',
    productDescription: 'Our badminton court products are trusted by professional clubs, schools, and recreational facilities, ensuring you receive the best in the industry. Our solutions provide players with world-class playing surfaces that meet BWF standards.',
    productImage: 'https://images.unsplash.com/photo-1536944310005-c730f80bc2ca?w=800&h=600&fit=crop',
    productFeatures: [
      {
        title: 'High-Performance Flooring Systems',
        description: 'Advanced PVC or wooden surfaces providing superior shuttle response and player grip.'
      },
      {
        title: 'Durability and Longevity',
        description: 'High-quality materials ensuring years of consistent performance.'
      },
      {
        title: 'Safe and Comfortable',
        description: 'Shock-absorbing properties reduce joint stress and injury risk.'
      },
      {
        title: 'Low Maintenance',
        description: 'Easy to clean and maintain, ensuring long-lasting quality.'
      }
    ]
  },
  'pickleball-courts': {
    name: 'Pickleball Courts',
    tagline: 'designed for optimal playability, durability, and safety',
    heroImage: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1600&h=600&fit=crop',
    expertiseTitle: 'Pickleball Court Construction India',
    expertiseDescription: 'At Amico Sports, we deliver USAPA-standard pickleball court solutions designed for optimal playability, durability, and safety. Whether for professional clubs, schools, or recreational grounds, our expertise ensures your court exceeds expectations. Using cutting-edge pickleball court surfaces, we\'ve built numerous pickleball courts that are introducing this rapidly growing sport across India. Our commitment to quality has established us as a leader in pickleball court construction in India.',
    faqs: [
      {
        question: 'Why Invest in a Pickleball Court?',
        answer: 'Pickleball is one of the fastest-growing sports globally. Courts require minimal space, are cost-effective to build, and can accommodate players of all ages and skill levels.'
      },
      {
        question: 'Why Choose Professional Pickleball Surfaces?',
        answer: 'Professional pickleball surfaces offer consistent ball bounce, excellent traction, weather resistance, and durability. They provide the quality needed for competitive and recreational play.'
      },
      {
        question: 'What Dimensions Do You Need?',
        answer: 'A standard pickleball court is 44 feet (13.41m) long and 20 feet (6.10m) wide. Multiple courts can fit in the space of a single tennis court, making them space-efficient.'
      }
    ],
    services: [
      {
        title: 'Design & Consultation',
        description: 'Custom layouts optimized for your site and usage needs.',
        icon: 'design'
      },
      {
        title: 'Earthworks & Preparation',
        description: 'Ground leveling, drainage installation, and base preparation for durability.',
        icon: 'earthwork'
      },
      {
        title: 'Surface Installation',
        description: 'Professional installation of premium acrylic surfaces, ensuring seamless and long-lasting results.',
        icon: 'turf'
      },
      {
        title: 'USAPA Certification Assistance',
        description: 'Support in obtaining USAPA certification for your court.',
        icon: 'certification'
      },
      {
        title: 'Post-Installation Maintenance',
        description: 'Maintenance packages to keep your court performing at its best.',
        icon: 'maintenance'
      }
    ],
    productTitle: 'Professional Pickleball Court Surfaces',
    productDescription: 'Our pickleball court products are trusted by clubs and recreational facilities, ensuring you receive the best in the industry. Our solutions provide players with world-class playing surfaces that meet USAPA standards.',
    productImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&h=600&fit=crop',
    productFeatures: [
      {
        title: 'High-Performance Surface Systems',
        description: 'Advanced acrylic surfaces providing superior ball response and player traction.'
      },
      {
        title: 'Durability and Longevity',
        description: 'Weather-resistant materials ensuring years of consistent performance.'
      },
      {
        title: 'Safe and Comfortable',
        description: 'Cushioned surfaces reduce joint stress for players of all ages.'
      },
      {
        title: 'Low Maintenance',
        description: 'Easy to maintain with minimal upkeep requirements.'
      }
    ]
  },
  'padel-courts': {
    name: 'Padel Courts',
    tagline: 'designed for optimal playability, durability, and safety',
    heroImage: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=1600&h=600&fit=crop',
    expertiseTitle: 'Padel Court Construction India',
    expertiseDescription: 'At Amico Sports, we deliver International Padel Federation standard padel court solutions designed for optimal playability, durability, and safety. Whether for professional clubs or recreational grounds, our expertise ensures your court exceeds expectations. Using premium padel court materials including tempered glass walls and synthetic grass, we\'re introducing this exciting sport across India. Our commitment to quality has established us as a leader in padel court construction in India.',
    faqs: [
      {
        question: 'Why Invest in a Padel Court?',
        answer: 'Padel is rapidly growing globally and in India. It\'s social, easy to learn, and provides excellent entertainment. Padel courts attract members and generate revenue for clubs and facilities.'
      },
      {
        question: 'Why Choose Professional Padel Court Construction?',
        answer: 'Professional padel courts require precise glass wall installation, proper turf selection, and structural expertise. Quality construction ensures safety, durability, and optimal playing conditions.'
      },
      {
        question: 'What Dimensions Do You Need?',
        answer: 'A standard padel court is 20 meters long and 10 meters wide, enclosed by 3-4 meter high walls. The court includes tempered glass walls and metal mesh panels.'
      }
    ],
    services: [
      {
        title: 'Design & Consultation',
        description: 'Custom layouts optimized for your site and usage needs.',
        icon: 'design'
      },
      {
        title: 'Earthworks & Preparation',
        description: 'Ground leveling, drainage installation, and base preparation for durability.',
        icon: 'earthwork'
      },
      {
        title: 'Court Installation',
        description: 'Professional installation of glass walls, mesh panels, and synthetic grass turf.',
        icon: 'turf'
      },
      {
        title: 'Certification Assistance',
        description: 'Support in meeting international padel standards.',
        icon: 'certification'
      },
      {
        title: 'Post-Installation Maintenance',
        description: 'Maintenance packages to keep your court performing at its best.',
        icon: 'maintenance'
      }
    ],
    productTitle: 'Professional Padel Court Systems',
    productDescription: 'Our padel court products include tempered glass walls, metal mesh panels, and premium synthetic grass, ensuring you receive the best in the industry. Our solutions provide players with world-class playing facilities.',
    productImage: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=600&fit=crop',
    productFeatures: [
      {
        title: 'High-Performance Court Systems',
        description: 'Tempered safety glass walls and premium synthetic grass providing optimal playing conditions.'
      },
      {
        title: 'Durability and Longevity',
        description: 'High-quality materials ensuring years of safe and consistent performance.'
      },
      {
        title: 'Safe and Comfortable',
        description: 'Safety glass and shock-absorbing turf reduce injury risk.'
      },
      {
        title: 'Low Maintenance',
        description: 'Minimal upkeep required for glass walls and synthetic surfaces.'
      }
    ]
  },
  'squash-courts': {
    name: 'Squash Courts',
    tagline: 'designed for optimal performance, durability, and safety',
    heroImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&h=600&fit=crop',
    expertiseTitle: 'Squash Court Construction India',
    expertiseDescription: 'At Amico Sports, we deliver WSF-standard squash court solutions designed for optimal performance, durability, and safety. Whether for professional clubs or recreational facilities, our expertise ensures your court exceeds expectations. Using premium squash court materials including wall panels and hardwood flooring, we\'ve built numerous squash courts across India. Our commitment to quality has established us as a leader in squash court construction in India.',
    faqs: [
      {
        question: 'Why Invest in a Squash Court?',
        answer: 'Squash courts provide excellent recreational and competitive opportunities, require minimal space compared to other sports, and offer year-round indoor play. They add significant value to sports facilities.'
      },
      {
        question: 'Why Choose Professional Squash Court Construction?',
        answer: 'Professional squash courts require precise wall construction for consistent ball rebound, proper flooring for player movement, and acoustic treatment. Quality construction ensures optimal playing conditions.'
      },
      {
        question: 'What Dimensions Do You Need?',
        answer: 'A standard squash court is 9.75 meters long, 6.4 meters wide, and 5.64 meters high. Precise dimensions are crucial for proper gameplay according to WSF standards.'
      }
    ],
    services: [
      {
        title: 'Design & Consultation',
        description: 'Custom layouts optimized for your site and usage needs.',
        icon: 'design'
      },
      {
        title: 'Construction & Preparation',
        description: 'Structural construction and preparation for court installation.',
        icon: 'earthwork'
      },
      {
        title: 'Wall & Floor Installation',
        description: 'Professional installation of wall panels and hardwood flooring.',
        icon: 'turf'
      },
      {
        title: 'WSF Certification Assistance',
        description: 'Support in obtaining WSF certification for your court.',
        icon: 'certification'
      },
      {
        title: 'Post-Installation Maintenance',
        description: 'Maintenance packages to keep your court performing at its best.',
        icon: 'maintenance'
      }
    ],
    productTitle: 'Professional Squash Court Systems',
    productDescription: 'Our squash court products include high-quality wall panels, hardwood flooring, and glass back walls, ensuring you receive the best in the industry. Our solutions provide players with world-class playing facilities that meet WSF standards.',
    productImage: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&h=600&fit=crop',
    productFeatures: [
      {
        title: 'High-Performance Wall Systems',
        description: 'Precision-engineered wall panels providing consistent ball rebound characteristics.'
      },
      {
        title: 'Durability and Longevity',
        description: 'Premium materials ensuring years of consistent performance.'
      },
      {
        title: 'Professional Flooring',
        description: 'Hardwood flooring providing excellent grip and shock absorption.'
      },
      {
        title: 'Acoustic Treatment',
        description: 'Sound-dampening materials for optimal playing environment.'
      }
    ]
  },
  'athletic-tracks': {
    name: 'Athletic Tracks',
    tagline: 'designed for optimal performance, durability, and safety',
    heroImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&h=600&fit=crop',
    expertiseTitle: 'Athletic Track Construction India',
    expertiseDescription: 'At Amico Sports, we deliver World Athletics certified running track solutions designed for optimal performance, durability, and safety. Whether for schools, universities, or sports complexes, our expertise ensures your track exceeds expectations. Using cutting-edge polyurethane and rubber surfaces, we\'ve built numerous athletic tracks across India. Our commitment to quality has established us as a leader in athletic track construction in India.',
    faqs: [
      {
        question: 'Why Invest in an Athletic Track?',
        answer: 'Athletic tracks provide professional training facilities for runners, enable hosting of athletics events, and offer all-weather performance. They add significant value to educational and sports institutions.'
      },
      {
        question: 'Why Choose Synthetic Athletic Tracks?',
        answer: 'Synthetic athletic tracks offer consistent performance in all weather conditions, excellent shock absorption, durability, and require minimal maintenance compared to traditional surfaces.'
      },
      {
        question: 'What Dimensions Do You Need?',
        answer: 'A standard outdoor athletic track is 400 meters in length with 6-8 lanes. Each lane is 1.22 meters wide. We can customize track configurations based on available space and requirements.'
      }
    ],
    services: [
      {
        title: 'Design & Consultation',
        description: 'Custom layouts optimized for your site and usage needs.',
        icon: 'design'
      },
      {
        title: 'Earthworks & Preparation',
        description: 'Ground leveling, drainage installation, and base preparation for durability.',
        icon: 'earthwork'
      },
      {
        title: 'Track Installation',
        description: 'Professional installation of polyurethane or rubber track surfaces.',
        icon: 'turf'
      },
      {
        title: 'World Athletics Certification',
        description: 'Support in obtaining World Athletics certification for your track.',
        icon: 'certification'
      },
      {
        title: 'Post-Installation Maintenance',
        description: 'Maintenance packages to keep your track performing at its best.',
        icon: 'maintenance'
      }
    ],
    productTitle: 'Professional Athletic Track Surfaces',
    productDescription: 'Our athletic track products are trusted by schools, universities, and sports complexes, ensuring you receive the best in the industry. Our solutions provide athletes with world-class running surfaces that meet World Athletics standards.',
    productImage: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&h=600&fit=crop',
    productFeatures: [
      {
        title: 'High-Performance Surface Systems',
        description: 'Advanced polyurethane and rubber surfaces providing superior traction and energy return.'
      },
      {
        title: 'Durability and Longevity',
        description: 'UV-stabilized materials ensuring years of consistent performance in all weather conditions.'
      },
      {
        title: 'Safe and Comfortable',
        description: 'Excellent shock absorption reducing injury risk and athlete fatigue.'
      },
      {
        title: 'Low Maintenance',
        description: 'Minimal upkeep required while maintaining world-class performance.'
      }
    ]
  },
  'swimming-pools': {
    name: 'Swimming Pools',
    tagline: 'designed for optimal performance, durability, and safety',
    heroImage: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=1600&h=600&fit=crop',
    expertiseTitle: 'Swimming Pool Construction India',
    expertiseDescription: 'At Amico Sports, we deliver Olympic-standard swimming pool solutions designed for optimal performance, durability, and safety. Whether for professional clubs, schools, or recreational facilities, our expertise ensures your pool exceeds expectations. Using advanced filtration, water treatment, and construction technologies, we\'ve built numerous swimming pools across India. Our commitment to quality has established us as a leader in swimming pool construction in India.',
    faqs: [
      {
        question: 'Why Invest in a Swimming Pool?',
        answer: 'Swimming pools provide excellent recreational and competitive opportunities, promote health and fitness, and add significant value to properties and institutions. They can be used year-round with proper heating.'
      },
      {
        question: 'Why Choose Professional Pool Construction?',
        answer: 'Professional pool construction ensures proper structural integrity, efficient filtration systems, water treatment, and safety features. Quality construction provides decades of reliable service.'
      },
      {
        question: 'What Dimensions Do You Need?',
        answer: 'Olympic swimming pools are 50 meters long and 25 meters wide with a minimum depth of 2 meters. Semi-Olympic pools are 25m x 12.5m. We can customize dimensions based on your requirements and available space.'
      }
    ],
    services: [
      {
        title: 'Design & Consultation',
        description: 'Custom designs optimized for your site and usage needs.',
        icon: 'design'
      },
      {
        title: 'Excavation & Construction',
        description: 'Professional excavation and structural construction.',
        icon: 'earthwork'
      },
      {
        title: 'Systems Installation',
        description: 'Professional installation of filtration, circulation, and treatment systems.',
        icon: 'turf'
      },
      {
        title: 'Certification Assistance',
        description: 'Support in meeting swimming federation standards.',
        icon: 'certification'
      },
      {
        title: 'Maintenance Services',
        description: 'Comprehensive maintenance packages for optimal pool operation.',
        icon: 'maintenance'
      }
    ],
    productTitle: 'Professional Swimming Pool Systems',
    productDescription: 'Our swimming pool products include advanced filtration systems, automated water treatment, energy-efficient heating, and safety features, ensuring you receive the best in the industry. Our solutions provide swimmers with world-class facilities.',
    productImage: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop',
    productFeatures: [
      {
        title: 'Advanced Filtration Systems',
        description: 'State-of-the-art filtration ensuring crystal-clear water quality.'
      },
      {
        title: 'Durable Construction',
        description: 'High-quality materials and construction methods ensuring decades of service.'
      },
      {
        title: 'Energy-Efficient Systems',
        description: 'Modern heating and circulation systems minimizing operational costs.'
      },
      {
        title: 'Safety Features',
        description: 'Comprehensive safety features including non-slip surfaces and emergency systems.'
      }
    ]
  }
};

// Icon component based on type
function ServiceIcon({ type }: { type: string }) {
  const icons = {
    design: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" stroke="currentColor">
        <path d="M8 56L56 8M56 8H32M56 8V32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 32L48 48" strokeWidth="3" strokeLinecap="round"/>
        <rect x="8" y="24" width="24" height="24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    earthwork: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" stroke="currentColor">
        <path d="M8 40L20 28L32 36L52 16" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 48H56V56H8V48Z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="36" y="8" width="16" height="8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    turf: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" stroke="currentColor">
        <circle cx="32" cy="32" r="20" strokeWidth="3"/>
        <path d="M32 12V52M12 32H52" strokeWidth="3" strokeLinecap="round"/>
        <path d="M20 20L44 44M44 20L20 44" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
    certification: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" stroke="currentColor">
        <path d="M8 8H56V40H8V8Z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 24L28 32L44 16" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M28 40V56L32 52L36 56V40" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    maintenance: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" stroke="currentColor">
        <circle cx="32" cy="32" r="16" strokeWidth="3"/>
        <path d="M32 8V16M32 48V56M8 32H16M48 32H56" strokeWidth="3" strokeLinecap="round"/>
        <path d="M14 14L20 20M44 20L50 14M14 50L20 44M44 44L50 50" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    )
  };
  
  return <div className="text-gray-700">{icons[type as keyof typeof icons] || icons.design}</div>;
}

// Accordion component for FAQs and Product Features
function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left hover:text-[#232b7c] transition-colors"
      >
        <span className="text-lg font-medium text-gray-900">{title}</span>
        <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center transition-transform ${isOpen ? 'rotate-45 border-[#232b7c]' : ''}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-700 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

export default function SportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const sport = sportsData[id];

  if (!sport) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <img 
          src={sport.heroImage} 
          alt={sport.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-3">{sport.name}</h1>
          <p className="text-lg md:text-xl font-light">{sport.tagline}</p>
        </div>
        {/* Back to Home */}
        <a 
          href="/"
          className="absolute top-24 left-4 md:left-8 bg-white/90 hover:bg-white text-[#232b7c] px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all flex items-center gap-2 shadow-lg text-sm md:text-base z-20"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Back</span>
        </a>
      </div>

      {/* Expertise Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mb-8">
          <p className="text-[#C8A05C] text-sm font-semibold tracking-wider mb-3">OUR EXPERTISE</p>
          <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6">{sport.expertiseTitle}</h2>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            {sport.expertiseDescription}
          </p>
        </div>

        {/* FAQs */}
        <div className="mt-12">
          {sport.faqs.map((faq, index) => (
            <Accordion key={index} title={faq.question}>
              {faq.answer}
            </Accordion>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-[#3454D1] py-6 md:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white text-lg md:text-xl font-normal text-center md:text-left">
            Contact Us to Build Your Own {sport.name.includes('Courts') || sport.name.includes('Turf') ? sport.name : sport.name + ' Facility'} and Learn More!
          </p>
          <a 
            href="#"
            className="bg-gray-900 text-white px-6 md:px-8 py-3 md:py-3.5 rounded hover:bg-gray-800 transition-colors whitespace-nowrap font-medium text-sm md:text-base"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mb-12">
          <p className="text-[#C8A05C] text-sm font-semibold tracking-wider mb-3">OUR SERVICES</p>
          <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-4">What We Do</h2>
          <p className="text-gray-700 text-base md:text-lg">
            We provide comprehensive {sport.name.toLowerCase()} construction solutions, tailored to meet your specific requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12">
          {sport.services.map((service, index) => (
            <div key={index} className="text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-4">
                <ServiceIcon type={service.icon} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <p className="text-gray-700 text-center text-base md:text-lg">
          Our end-to-end approach ensures a smooth and efficient process, from concept to completion.
        </p>
      </div>

      {/* Products Section */}
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#C8A05C] text-sm font-semibold tracking-wider mb-3">PRODUCTS</p>
          <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6">{sport.productTitle}</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start mb-8">
            <div>
              <p className="text-gray-700 leading-relaxed mb-8 text-base md:text-lg">
                {sport.productDescription}
              </p>
              
              {/* Product Features */}
              <div>
                {sport.productFeatures.map((feature, index) => (
                  <Accordion key={index} title={feature.title} defaultOpen={index === 0}>
                    {feature.description}
                  </Accordion>
                ))}
              </div>
            </div>
            
            <div className="order-first lg:order-last">
              <img 
                src={sport.productImage} 
                alt={sport.productTitle}
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-[#232b7c] py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-white mb-4 md:mb-6">Ready to Build Your {sport.name}?</h2>
          <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
            Get in touch with our team for a consultation and quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#232b7c] px-6 md:px-8 py-3 md:py-4 rounded-full font-bold hover:bg-[#C8A05C] hover:text-white transition-all shadow-lg text-sm md:text-base">
              GET A QUOTE
            </button>
            <button className="bg-transparent border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold hover:bg-white hover:text-[#232b7c] transition-all text-sm md:text-base">
              CONTACT US
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
