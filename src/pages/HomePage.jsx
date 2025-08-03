import React, { useState, useEffect, useRef } from 'react';
// Import Link and useNavigate from react-router-dom
import { Link, useNavigate } from 'react-router-dom';
import PasscodeModal from '../components/PasscodeModal';
import { useAuth } from '../context/AuthContext';


function HomePage() {
 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showHiddenServices, setShowHiddenServices] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { login } = useAuth();

  // Refs for DOM elements
  const teamSliderRef = useRef(null);
  const counterRefs = useRef([]);
  const servicesRef = useRef(null);

  // Hook for programmatic navigation
  const navigate = useNavigate();


  const handleLoginSuccess = () => {
    login(); 
    setShowModal(false);
    navigate('/admin'); 
  };

  // All CSS is now defined here, removing the need for Tailwind CSS.
  const allStyles = `
    /* --- CSS Variables and Body --- */
    :root {
        --primary: #5b6946;
        --text: #3B2C2C;
        --secondary: #faf3dd;
        --background: #fff;
        --dark: #1e1e1e;
        --gray: #ccc;
        --primary-dark: #4b553c;
    }

    body {
        background-color: var(--background);
        font-family: 'Montserrat', sans-serif;
        color: var(--text);
        overflow-x: hidden;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    *, *::before, *::after {
        box-sizing: inherit;
    }

    a {
      text-decoration: none;
    }

    /* --- Generic Utility Classes --- */
    .container {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    @media (min-width: 768px) { .container { max-width: 768px; } }
    @media (min-width: 1024px) { .container { max-width: 1080px; } }
    @media (min-width: 1280px) { .container { max-width: 1200px; } }
    
    .text-center { text-align: center; }
    
    /* --- Buttons --- */
    .btn-primary, .btn-secondary, .btn-red {
        cursor: pointer;
        display: inline-block;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-weight: 600;
        transition: all 0.3s ease;
        border-radius: 30px;
    }
    .btn-primary {
        background-color: var(--primary);
        color: white;
        border: none;
        padding: 12px 32px;
        border-radius: 30px;
         font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            z-index: 1;
    }
    .btn-primary:hover {
        background-color: transparent;
        transform: translateY(-3px);
       box-shadow: 0 10px 25px #5b6946;
    }
    .btn-secondary {
        background-color: transparent;
        color: var(--text); /* Default color for nav */
        border: 2px solid var(--primary);
        padding: 10px 28px;
    }
    .header .btn-secondary { /* Specific for hero section */
        color: white;
    }
    .btn-secondary:hover {
        background-color: var(--primary);
        color: white;
        transform: translateY(-3px);
    }
    .btn-red {
        background-color: var(--primary);
        color: white;
        border: 2px solid white;
        border-radius: 20px;
        padding: 10px 20px;
        transition: background-color 0.3s ease;
    }
    .btn-red:hover {
        background-color: var(--primary-dark);
    }
        .header-text {
            font-family: 'Montserrat', sans-serif;
        }
    
    /* --- Header and Navigation --- */
    .header {
        position: relative;
        min-height: 100vh;
        background-size: cover;
        background-position: center;
    }
    .hero-gradient-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom, rgba(22, 22, 26, 0.3), rgba(22, 22, 26, 0.9));
    }
    .header-nav {
        position: relative;
        z-index: 50;
        width: 100%;
        padding: 2.5rem 0;
    }
    .nav-container { display: flex; justify-content: space-between; align-items: center; }
    .nav-logo { display: flex; align-items: center;margin-left:-90px;margin-top:-20px }
    .nav-logo-text { font-size: 1.75rem; font-weight: 800; color: #252c37ff; }
    .nav-logo-text span { color: var(--primary); }

    .desktop-nav-wrapper { display: flex; justify-content: center; width: 100%; }
    .glass-nav {
        display: flex;
        width:83%;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        text-transform: uppercase;
        font-weight: bold;
        margin-top: 10px;
        max-width: 1080px; 
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        padding: 10px 30px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }
    .nav-link {
        position: relative;
        padding: 8px 0;
        color: #252c37ff;
        margin: 0 1rem;
    }
    .nav-link::after { content: ""; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background-color: var(--secondary); transition: width 0.3s ease; }
    .nav-link:hover::after { width: 100%; }
    
    .mobile-menu-icon { display: none; }
    .mobile-menu-button { color: #252c37ff; font-size: 1.5rem; background: none; border: none; cursor: pointer; }

    .mobile-menu {
        display: none;
        flex-direction: column;
        gap: 1rem;
        background-color: white;
        position: absolute;
        top: 80px;
        left: 0;
        width: 100%;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        padding: 1.5rem;
        z-index: 50;
    }
    .mobile-menu.is-open { display: flex; }
    .mobile-menu a { color: #252c37ff; font-size: 1.125rem; }
    .mobile-menu a:hover { color: var(--primary); }
    .mobile-menu .btn-secondary { width: fit-content; }
    
    @media (max-width: 767px) {
        .desktop-nav-wrapper { display: none; }
        .mobile-menu-icon { display: block; }
    }

    .hero-content-wrapper { position: relative; z-index: 10; height: 80vh; display: flex; align-items: center; padding-top: 5vh;      /* Pushes content down from the top */
    padding-bottom: 15vh; }
    .hero-content { width: 100%; }
    @media (min-width: 768px) { .hero-content { width: 70%; } }
    .hero-content h1 { font-family: 'Montserrat', sans-serif; font-size: 16px; line-height: 1; font-weight: 700; margin-bottom: 1.5rem; margin-left:-100px; }
    @media (min-width: 768px) { .hero-content h1 { font-size: 4.2rem; line-height: 1; } }
    .hero-content h1 .text-primary {
     color: var(--text); 
     text-shadow: 0 0 5px #d7d7d7, 0 0 10px #b1b1b1; 
     }
    .hero-content .neon-text {
        font-family: 'Montserrat', sans-serif;
        color: #5b6946;
        text-shadow: 0 0 5px #d7d7d7, 0 0 10px #b1b1b1, 0 0 20px #5b6946, 0 0 40px #5b6946;
        font-weight: bold;
    }
    .neon-text.flicker { animation: flicker 2s infinite; }
    @keyframes flicker { 0%, 19.999%, 22%, 62%, 64%, 84%, 86%, 100% { opacity: 1; } 20%, 21.999%, 63%, 63.999%, 85%, 85.999% { opacity: 0.4; } }
    .hero-content p { font-size: 1.125rem; color: #d1d5db; margin-bottom: 2rem; max-width: 42rem;margin-left:-100px;line-height: 1.5; }
    .hero-content .button-group { display: flex; flex-wrap: wrap; gap: 1rem;margin-left:-100px; }

    .scroll-down { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); font-size: 1.5rem; animation: bounce 2s infinite; }
    .scroll-down i { color: #faf3dd; }
    @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); } 40% { transform: translateY(-20px) translateX(-50%); } 60% { transform: translateY(-10px) translateX(-50%); } }

    /* --- General Section and Grid Layout --- */
    .section-padding { padding-top: 5rem; padding-bottom: 5rem; }
    .section-padding-sm { padding-top: 4rem; padding-bottom: 4rem; }
    
    .section-heading { text-align: center; margin-bottom: 4rem; }
    .section-heading h5 { color: var(--primary); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem; }
    .section-heading h2 { font-family: 'Montserrat', sans-serif; color: #5b6946; font-size: 2.25rem; font-weight: 700; margin-bottom: 1rem; }
    .section-heading p { color: #9ca3af; max-width: 42rem; margin: 0 auto; }

    .grid-container { display: grid; grid-template-columns: 1fr; gap: 2rem; }
    @media (min-width: 768px) { .grid-cols-md-2 { grid-template-columns: repeat(2, 1fr); } .grid-cols-md-4 { grid-template-columns: repeat(4, 1fr); } }
    @media (min-width: 1024px) { .grid-cols-lg-2 { grid-template-columns: repeat(2, 1fr); } .grid-cols-lg-3 { grid-template-columns: repeat(3, 1fr); } .grid-cols-lg-4 { grid-template-columns: repeat(4, 1fr); } }

    /* --- Feature & Event Cards --- */
    .feature-card { padding: 2rem; border-radius: 16px; background-color: rgba(255, 255, 255, 0.05); transition: all 0.3s ease; }
    .feature-card:hover { background-color: rgba(91, 105, 70, 0.1); transform: translateY(-5px); }
    .feature-icon { font-size: 2.5rem; color: var(--primary); margin-bottom: 1rem; }
    .feature-card h3 { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; color: var(--text); }
    .feature-card p { color: #9ca3af; }

    .event-card { border-radius: 16px; overflow: hidden; position: relative; transition: all 0.3s ease; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); }
    .event-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); }
    .event-card img { width: 100%; height: 16rem; object-fit: cover; }
    .event-card-title-overlay { position: absolute; bottom: 0; left: 0; width: 100%; padding: 1rem; background: linear-gradient(to top, black, transparent); }
    .event-card-title-overlay h3 { font-size: 1.25rem; font-weight: 600; color: white; }
    .event-card-title-overlay p { font-size: 0.875rem; color: #d1d5db; }
    .event-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent); transform: translateY(100%); transition: transform 0.3s ease; color: white; }
    .event-card:hover .event-overlay { transform: translateY(0); }
    .event-overlay p { font-size: 0.875rem; margin-bottom: 1rem; }
    .event-overlay .view-button { position: absolute; bottom: 1rem; right: 1rem; display: inline-block; padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 600; color: white; background-image: linear-gradient(to right, #8b5cf6, #ec4899); box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); transition: all 0.3s; font-size: 0.875rem; }
    .event-overlay .view-button:hover { background-image: linear-gradient(to right, #ec4899, #8b5cf6); transform: scale(1.05); }
    .event-rank { position: absolute; top: 16px; left: 16px; background-color: var(--primary); color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; font-weight: bold; font-size: 1.2rem; box-shadow: 0 5px 15px rgba(91, 105, 70, 0.4); z-index: 2; }
    
    .hidden-services { display: none; margin-top: 2.5rem; }
    .hidden-services.is-visible { display: grid; }
    #view-all-services-btn { padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: 600; color: white; background-image: linear-gradient(to right, #8b5cf6, #ec4899); border: none; cursor: pointer; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); transition: all 0.3s; }
    #view-all-services-btn:hover { background-image: linear-gradient(to right, #ec4899, #8b5cf6); transform: scale(1.05); }

    /* --- About Section --- */
    .about-grid { display: grid; grid-template-columns: 1fr; gap: 4rem; align-items: center; }
    @media (min-width: 768px) { .about-grid { grid-template-columns: repeat(2, 1fr); } }
    .about-features-list { margin-top: 1rem; }
    .about-features-list > div + div { margin-top: 1rem; }
    .about-feature-item { display: flex; align-items: flex-start; }
    .about-feature-item-icon { margin-right: 1rem; margin-top: 0.25rem; }
    .about-feature-item-icon > div { background-color: var(--primary); border-radius: 9999px; padding: 0.5rem; }
    .about-feature-item-icon i { color: white; }
    .about-feature-item-text h4 { color: var(--text); font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; }
    .about-feature-item-text p { color: #9ca3af; }
    
    .about-image-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
    .about-image-grid img { width: 100%; object-fit: cover; border-radius: 0.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    .about-image-grid .img-1, .about-image-grid .img-4 { height: 16rem; }
    .about-image-grid .img-2, .about-image-grid .img-3 { height: 10rem; }
    
    /* --- Counter Section --- */
    .counter-section { background-color: var(--primary); color: white; }
    .counter-section .grid-container { text-align: center; }
    .counter-box .counter-number { font-size: 2.25rem; font-weight: 700; margin-bottom: 0.5rem; }
    .counter-box p { font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; }

    /* --- Portfolio Section --- */
    .portfolio-section { background-attachment: fixed; background-position: center; background-size: cover; background-repeat: no-repeat; }
    .portfolio-section p { color: #6b7280; }
    .portfolio-card { position: relative; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
    .portfolio-card img { width: 100%; height: 18rem; object-fit: cover; transition: transform 0.5s ease; }
    .portfolio-card:hover img { transform: scale(1.05); }
    .portfolio-card-overlay { position: absolute; inset: 0; background-color: rgba(0, 0, 0, 0.4); transition: background-color 0.3s ease; }
    .portfolio-card:hover .portfolio-card-overlay { background-color: rgba(0, 0, 0, 0.6); }
    .portfolio-card-content { position: absolute; bottom: 0; left: 0; width: 100%; padding: 1.25rem; color: white; z-index: 10; }
    .portfolio-card-content h3 { font-size: 1.25rem; font-weight: 600; color: white; }
    .portfolio-card-content p { font-size: 0.875rem; color: #e2e8f0; }

    /* --- Testimonials Section --- */
    .testimonials-section { background-color: var(--secondary); }
    .testimonials-section .section-heading h2 { color: #5b6946; }
    .testimonials-section .section-heading p { color: #3B2C2C; font-size: 1.25rem; }
    .testimonial-card { background-color: #1e1e1e; color: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.2); transition: all 0.3s ease; }
    .testimonial-card:hover { transform: translateY(-5px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3); }
    .testimonial-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
    .testimonial-quote-icon { color: var(--primary); font-size: 1.5rem; }
    .testimonial-stars { color: #facc15; }
    .testimonial-text { color: #d1d5db; font-style: italic; margin-bottom: 1.5rem; }
    .testimonial-author { display: flex; align-items: center; }
    .testimonial-author img { width: 3rem; height: 3rem; border-radius: 50%; object-fit: cover; margin-right: 1rem; border: 1px solid #4b5563; }
    .testimonial-author h4 { font-weight: 600; color: white; }
    .testimonial-author p { font-size: 0.875rem; color: #9ca3af; }
    
    /* --- Team Section --- */
    .team-section { position: relative; background-image: linear-gradient(to right, #1f2937, #111827, #1f2937); color: white; padding: 6rem 0; }
    .team-bg-overlay { position: absolute; inset: 0; z-index: 0; background-image: url('https://picsum.photos/seed/teambg/1920/1080'); background-attachment: fixed; background-size: cover; background-position: center; }
    .team-bg-overlay::after { content: ''; position: absolute; inset: 0; background-color: rgba(0,0,0,0.3); }
    .team-section .container { position: relative; z-index: 10; }
    .team-section h2 { color: white; font-size: 2.25rem; margin-bottom: 1.5rem; }
    .team-section h2 span { color: #22c55e; }
    .team-section .divider { width: 6rem; height: 4px; background-color: #22c55e; margin: 0 auto 1.5rem auto; }
    .team-section p { color: #d1d5db; max-width: 42rem; margin: 0 auto; }
    
    .team-slider-container { width: 100%; padding: 40px 0; position: relative; overflow: hidden; }
    .team-slider-images { display: flex; align-items: center; justify-content: center; gap: 20px; }
    .team-slider-img { height: 400px; width: 100px; border-radius: 20px; position: relative; cursor: pointer; overflow: hidden; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1); }
    .team-slider-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
    .team-slider-img.active { width: 350px !important; box-shadow: 0 10px 20px rgb(27, 108, 32); border: 3px solid rgba(27, 108, 32, 0.3); }
    .team-slider-img:not(.active):hover { width: 120px; }
    .team-details { position: absolute; bottom: 0; left: 0; width: 100%; padding: 20px; background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6) 70%, transparent); text-align: center; transform: translateY(100%); transition: transform 0.5s ease; }
    .team-slider-img.active .team-details { transform: translateY(0); }
    .team-slider-img.active .team-details h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; color: white; }
    .team-slider-img.active .team-details p:first-of-type { color: #22c55e; margin-bottom: 0.75rem; }
    .team-slider-img.active .team-details p:last-of-type { font-size: 0.875rem; }
    .team-slider-img h1 { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%) rotate(-90deg); color: white; font-size: 24px; font-weight: 600; text-transform: uppercase; white-space: nowrap; transition: all 0.5s ease; }
    .team-slider-img.active h1 { opacity: 0; }
    
    /* --- Contact Section --- */
    .contact-section { background-color: var(--secondary); }
    .contact-grid { display: grid; grid-template-columns: 1fr; gap: 4rem; }
    @media (min-width: 1024px) { .contact-grid { grid-template-columns: repeat(2, 1fr); } }
    .contact-form .form-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
    @media (min-width: 768px) { .contact-form .form-grid { grid-template-columns: repeat(2, 1fr); } }
    .contact-form label { display: block; font-size: 0.875rem; font-weight: 500; color: #9ca3af; margin-bottom: 0.5rem; }
    .contact-form input, .contact-form select, .contact-form textarea { width: 100%; background-color: var(--background); border: 1px solid var(--gray); border-radius: 0.5rem; padding: 0.75rem; color: var(--text); }
    .contact-form input:focus, .contact-form select:focus, .contact-form textarea:focus { outline: none; border-color: var(--primary); }
    .contact-form .form-group { margin-bottom: 1.5rem; }
    .contact-form .submit-button { width: 100%; }
    
    .contact-info-card { background-color: var(--dark); color: white; padding: 2rem; border-radius: 0.75rem; height: 100%; }
    .contact-info-card h3 { font-size: 1.5rem; font-weight: 600; margin-bottom: 1.5rem; color: white; }
    .contact-info-item-group > .contact-info-item + .contact-info-item { margin-top: 1.5rem; }
    .contact-info-item { display: flex; align-items: flex-start; }
    .contact-info-item .icon { color: var(--primary); font-size: 1.25rem; margin-right: 1rem; width: 24px; text-align: center; }
    .contact-info-item h4 { font-weight: 600; margin-bottom: 0.25rem; color: white; }
    .contact-info-item p { color: #9ca3af; }
    .social-icon-group { display: flex; gap: 1rem; margin-top: 2.5rem; }
    .social-icon { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.1); color: white; transition: all 0.3s ease; }
    .social-icon:hover { background-color: var(--primary); transform: translateY(-3px); }

    /* --- CTA and Footer --- */
    .cta-section { background-color: var(--primary); color: white; text-align: center; }
    .cta-section h2 { color: white; font-size: 2.25rem; font-weight: 700; margin-bottom: 1.5rem; }
    .cta-section p { font-size: 1.25rem; max-width: 42rem; margin: 0 auto 2rem auto; }
    
    .footer { padding-top: 5rem; padding-bottom: 2.5rem; background-color: var(--dark); color: white; }
    .footer-grid-container { display: grid; grid-template-columns: 1fr; gap: 2.5rem; margin-bottom: 4rem; }
    @media (min-width: 768px) { .footer-grid-container { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .footer-grid-container { grid-template-columns: repeat(4, 1fr); } }
    .footer h3 { font-size: 1.25rem; font-weight: 600; margin-bottom: 1.5rem; color: white; }
    .footer p { color: #9ca3af; }
    .footer-links-list { list-style: none; padding: 0; }
    .footer-links-list li { margin-bottom: 0.75rem; }
    .footer-links-list a { color: var(--gray); transition: color 0.3s; }
    .footer-links-list a:hover { color: var(--primary); }
    .newsletter-form { display: flex; margin-bottom: 0.75rem; }
    .newsletter-form input { flex-grow: 1; background-color: var(--secondary); border: 1px solid var(--gray); border-radius: 0.5rem 0 0 0.5rem; padding: 0.75rem; color: var(--text); outline: none; }
    .newsletter-form button { background-color: var(--primary); border: none; padding: 0 1rem; border-radius: 0 0.5rem 0.5rem 0; color: white; cursor: pointer; }
    .footer-bottom { border-top: 1px solid #252c37ff; padding-top: 2rem; }
    .footer-bottom-content { display: flex; flex-direction: column; justify-content: space-between; align-items: center; }
    .footer-bottom-content p { color: #6b7280; font-size: 0.875rem; margin-bottom: 1rem; }
    .footer-bottom-links { display: flex; gap: 1.5rem; }
    .footer-bottom-links a { color: #6b7280; font-size: 0.875rem; }
    .footer-bottom-links a:hover { color: #9ca3af; }
    @media (min-width: 768px) { .footer-bottom-content { flex-direction: row; } .footer-bottom-content p { margin-bottom: 0; } }
    
    /* --- Back to Top Button --- */
    .back-to-top { position: fixed; bottom: 1.5rem; right: 1.5rem; background-color: var(--primary); width: 3rem; height: 3rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2); z-index: 50; }

    /* --- Animations --- */
    .fade-in { animation: fadeIn 0.8s ease-in-out; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .slide-in { animation: slideIn 0.8s ease-out; }
    @keyframes slideIn { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  `;

  // ... (keep all the existing useEffect hooks)
  // useEffect for AOS initialization
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 1000, once: false });
    }
  }, []);

  // useEffect for Counter Animation
  useEffect(() => {
    const counters = counterRefs.current.filter(Boolean);
    if (counters.length === 0) return;

    const animateCounter = (el, target) => {
      let start = 0;
      const duration = 3000;
      const increment = target / (duration / 16);
      let frameId = null;

      const update = () => {
        start += increment;
        if (start < target) {
          el.innerText = Math.floor(start);
          frameId = requestAnimationFrame(update);
        } else {
          el.innerText = target;
        }
      };
      update();
      return () => { if (frameId) cancelAnimationFrame(frameId); };
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          el.innerText = '0';
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(counter => observer.observe(counter));
    return () => counters.forEach(counter => { if(counter) observer.unobserve(counter) });
  }, []);

  // useEffect for Team Slider functionality
  useEffect(() => {
    const teamSlides = Array.from(teamSliderRef.current?.children || []);
    if (teamSlides.length === 0) return;

    const handleClick = (e) => {
      const targetSlide = e.target.closest('.team-slider-img');
      if (targetSlide) {
        teamSlides.forEach(s => s.classList.remove('active'));
        targetSlide.classList.add('active');
      }
    };

    teamSlides.forEach(slide => slide.addEventListener('click', handleClick));
    return () => teamSlides.forEach(slide => slide.removeEventListener('click', handleClick));
  }, []);

  // useEffect for smooth scrolling
  useEffect(() => {
    const anchors = document.querySelectorAll('a[href^="#"]');
    const handleClick = function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    };
    anchors.forEach(anchor => anchor.addEventListener('click', handleClick));
    return () => anchors.forEach(anchor => anchor.removeEventListener('click', handleClick));
  }, []);


  const allServices = [
    { rank: 5, img: "https://picsum.photos/seed/babyshower/400/300", alt: "Baby Shower", title: "Baby Shower", desc: "Celebrating new life", details: "Cherish the precious moments of welcoming a new life with our thoughtfully designed baby shower services." },
    { rank: 6, img: "https://picsum.photos/seed/cradle/400/300", alt: "Cradle Ceremony", title: "Cradle Ceremony", desc: "Traditional blessings", details: "Experience the rich cultural significance of the cradle ceremony, a time-honored tradition of blessing and welcoming a newborn." },
    { rank: 7, img: "https://picsum.photos/seed/naming/400/300", alt: "Naming Ceremony", title: "Naming Ceremony", desc: "First identity milestone", details: "Celebrate the meaningful moment of giving a name to your child with our personalized naming ceremony services." },
    { rank: 8, img: "https://picsum.photos/seed/halfsaree/400/300", alt: "Half Saree", title: "Half Saree", desc: "Cultural transition", details: "Mark the beautiful transition of a young girl into womanhood with our elegantly planned half saree ceremony." },
    { rank: 9, img: "https://picsum.photos/seed/dhoti/400/300", alt: "Dhoti Ceremony", title: "Dhoti Ceremony", desc: "Manhood celebration", details: "Commemorate the coming of age for young men with our traditional and meaningful dhoti ceremony services." },
    { rank: 10, img: "https://picsum.photos/seed/engagement/400/300", alt: "Engagement", title: "Engagement", desc: "Love's promise", details: "Create a memorable engagement celebration that captures the essence of your love and commitment." },
    { rank: 11, img: "https://picsum.photos/seed/haldi/400/300", alt: "Haldi Ceremony", title: "Haldi Ceremony", desc: "Auspicious tradition", details: "Experience the vibrant and sacred haldi ceremony, a colorful pre-wedding ritual filled with joy and blessings." },
    { rank: 12, img: "https://picsum.photos/seed/mehandi/400/300", alt: "Mehandi", title: "Mehandi", desc: "Artistic celebration", details: "Adorn yourself with intricate and beautiful mehandi designs that tell a story of tradition and artistry." },
    { rank: 13, img: "https://picsum.photos/seed/sangeeth/400/300", alt: "Sangeeth", title: "Sangeeth", desc: "Musical celebration", details: "Enjoy a spectacular musical night that brings together family and friends in a joyous pre-wedding celebration." },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: allStyles }} />

      {/* --- RENDER MODAL --- */}
      {/* Conditionally render the modal and pass the handler functions as props */}
     {showModal && (
        <PasscodeModal
          onClose={() => setShowModal(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      <header id="home" className="header" style={{ backgroundImage: `url(/images/hero_back.png)` }}>
        <div className="hero-gradient-overlay"></div>

        <nav className="header-nav">
          <div className="container nav-container">
            <div className="nav-logo">
              <span className="nav-logo-text">Event<span>Hub</span></span>
            </div>
            
            <div className="desktop-nav-wrapper">
              <div className="glass-nav">
                <a className="nav-link" href="#home">Home</a>
                <a className="nav-link" href="#services">Services</a>
                <a className="nav-link" href="#about">About</a>
                <a className="nav-link" href="#portfolio">Portfolio</a>
                <a className="nav-link" href="#testimonials">Testimonials</a>
                <a className="nav-link" href="#contact">Contact</a>
                {/* --- UPDATE: Add onClick to open modal --- */}
                <button className="btn-secondary" onClick={() => setShowModal(true)}>Login</button>
              </div>
            </div>

            <div className="mobile-menu-icon">
              <button className="mobile-menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>

          <div className={`mobile-menu ${isMobileMenuOpen ? 'is-open' : ''}`}>
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#portfolio" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</a>
            <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
             {/* --- UPDATE: Add onClick to open modal and close menu --- */}
            <button className="btn-secondary" onClick={() => {
              setShowModal(true);
              setIsMobileMenuOpen(false);
            }}>Login</button>
          </div>
        </nav>
        
        {/* The rest of your JSX remains the same */}
        <div className="container hero-content-wrapper">
          <div className="hero-content slide-in">
            
            <h1>
              <span className="text-primary">Create </span> <span className="neon-text ">Unforgettable</span>
              <span className="text-primary"> Moments</span>
            </h1>
            <p>From intimate gatherings to grand celebrations, EventHub delivers exceptional experiences tailored to your vision. Let us transform your dreams into reality.</p>
            <div className="button-group">
              <Link to="/estimate">
                 <button className="btn-primary">Start Planning</button>
              </Link>
              <button className="btn-secondary" onClick={() => servicesRef.current?.scrollIntoView({ behavior: 'smooth' })}>Explore Services</button>
            </div>
          </div>
        </div>

        <div className="scroll-down"><i className="fas fa-chevron-down"></i></div>
      </header>

      <main>
        {/* Services Section */}
        <section ref={servicesRef} id="services" className="section-padding">
          <div className="container">
            <div className="section-heading" data-aos="fade-up">
              <h5>What We Offer</h5>
              <h2>Our Premium Services</h2>
              <p>Discover our comprehensive range of personalized event planning services designed to make your special occasions extraordinary.</p>
            </div>
            <div className="grid-container grid-cols-lg-4 grid-cols-md-2">
              <div className="feature-card" data-aos="fade-up" data-aos-delay="100"><i className="feature-icon fas fa-ring"></i><h3>Weddings</h3><p>Create your dream wedding day with our full-service planning and coordination.</p></div>
              <div className="feature-card" data-aos="fade-up" data-aos-delay="200"><i className="feature-icon fas fa-birthday-cake"></i><h3>Birthday Parties</h3><p>Celebrate with custom themes, entertainment, and memorable experiences.</p></div>
              <div className="feature-card" data-aos="fade-up" data-aos-delay="300"><i className="feature-icon fas fa-heart"></i><h3>Engagements</h3><p>Plan a romantic and memorable engagement celebration tailored to your love story.</p></div>
              <div className="feature-card" data-aos="fade-up" data-aos-delay="400"><i className="feature-icon fas fa-music"></i><h3>Concerts & Festivals</h3><p>Large-scale event management with professional sound and lighting production.</p></div>
            </div>
          </div>
        </section>

        {/* Trending Events Section */}
        <section className="section-padding" style={{ backgroundColor: 'var(--secondary)' }}>
          <div className="container">
            <div className="section-heading slide-in">
              <h5>Popular Choices</h5>
              <h2>Trending Event Types</h2>
              <p>Explore our most requested event categories that are setting trends and creating lasting memories.</p>
            </div>
            <div className="grid-container grid-cols-lg-4 grid-cols-md-2">
              <div className="event-card fade-in" style={{ animationDelay: '0.1s' }}><div className="event-rank">1</div><img src="/images/w1.jpg" alt="Luxury Weddings" /><div className="event-card-title-overlay"><h3>Luxury Weddings</h3><p>Our most popular service</p></div><div className="event-overlay"><p>Create your dream wedding with our premium planning services, attention to detail, and exquisite decorations.</p><a href="#" className="view-button">View <i className="fas fa-arrow-right"></i></a></div></div>
              <div className="event-card fade-in" style={{ animationDelay: '0.2s' }}><div className="event-rank">2</div><img src="/images/b1.jpg" alt="Birthday Parties" /><div className="event-card-title-overlay"><h3>Birthday Parties</h3><p>Unique and creative</p></div><div className="event-overlay"><p>From vintage to futuristic, our birthday parties come with custom decorations, entertainment, and catering.</p><a href="#" className="view-button">View <i className="fas fa-arrow-right"></i></a></div></div>
              <div className="event-card fade-in" style={{ animationDelay: '0.3s' }}><div className="event-rank">3</div><img src="/images/c1.jpg" alt="Cultural Events" /><div className="event-card-title-overlay"><h3>Cultural Events</h3><p>Cultural Excellence</p></div><div className="event-overlay"><p>From any season to any occasion, our cultural events are designed to boost team morale and productivity.</p><a href="#" className="view-button">View <i className="fas fa-arrow-right"></i></a></div></div>
              <div className="event-card fade-in" style={{ animationDelay: '0.4s' }}><div className="event-rank">4</div><img src="/images/f1.jpg" alt="Festival Planning" /><div className="event-card-title-overlay"><h3>Festival Planning</h3><p>Large-scale events</p></div><div className="event-overlay"><p>From music festivals to cultural celebrations, we handle all aspects of large-scale event production.</p><a href="#" className="view-button">View <i className="fas fa-arrow-right"></i></a></div></div>
            </div>
            
            <div className={`hidden-services grid-container grid-cols-lg-4 grid-cols-md-2 ${showHiddenServices ? 'is-visible' : ''}`}>
              {allServices.map((service, index) => (
                <div key={service.rank} className="event-card fade-in" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
                  <div className="event-rank">{service.rank}</div>
                  <img src={service.img} alt={service.alt} />
                  <div className="event-card-title-overlay"><h3>{service.title}</h3><p>{service.desc}</p></div>
                  <div className="event-overlay"><p>{service.details}</p><a href="#" className="view-button">View <i className="fas fa-arrow-right"></i></a></div>
                </div>
              ))}
            </div>

            <div className="text-center" style={{ marginTop: '2.5rem' }}>
              {!showHiddenServices && (
                <button id="view-all-services-btn" onClick={() => setShowHiddenServices(true)}>
                  View All Services
                </button>
              )}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section-padding">
          <div className="container">
              <div className="about-grid">
                  <div data-aos="fade-right">
                      <div className="section-heading" style={{textAlign: 'left', marginBottom: '1.5rem'}}>
                          <h5>Our Advantage</h5>
                          <h2>Why Choose EventHub?</h2>
                      </div>
                      <div className="about-features-list">
                          <div className="about-feature-item"><div className="about-feature-item-icon"><div><i className="fas fa-check"></i></div></div><div className="about-feature-item-text"><h4>Experienced Team</h4><p>Our team brings years of industry experience to every project.</p></div></div>
                          <div className="about-feature-item"><div className="about-feature-item-icon"><div><i className="fas fa-star"></i></div></div><div className="about-feature-item-text"><h4>Personalized Service</h4><p>We create custom solutions tailored to your specific vision.</p></div></div>
                          <div className="about-feature-item"><div className="about-feature-item-icon"><div><i className="fas fa-magic"></i></div></div><div className="about-feature-item-text"><h4>Attention to Detail</h4><p>We manage every aspect with meticulous care and precision.</p></div></div>
                          <div className="about-feature-item"><div className="about-feature-item-icon"><div><i className="fas fa-handshake"></i></div></div><div className="about-feature-item-text"><h4>Vendor Network</h4><p>Access our extensive network of trusted vendors and partners.</p></div></div>
                      </div>
                      <button className="btn-primary" style={{marginTop: '2rem'}}>Learn More About Us</button>
                  </div>
                  <div className="about-image-grid">
                      <img data-aos="fade-up" src="/sliding/culturalevents.jpg" alt="Event 1" className="img-1" />
                      <img data-aos="fade-down" src="/sliding/gettogether.jpg" alt="Event 2" className="img-2" />
                      <img data-aos="fade-up" src="/sliding/background.jpg" alt="Event 3" className="img-3" />
                      <img data-aos="fade-down" src="/sliding/birthday.jpg" alt="Event 4" className="img-4" />
                  </div>
              </div>
          </div>
        </section>

        {/* Counter Section */}
        <section className="section-padding-sm counter-section">
          <div className="container">
            <div className="grid-container grid-cols-md-4">
              <div className="counter-box" data-aos="fade-up"><div className="counter-number" data-target="500" ref={el => counterRefs.current[0] = el}>0</div><p>Events Planned</p></div>
              <div className="counter-box" data-aos="fade-up" data-aos-delay="100"><div className="counter-number" data-target="98" ref={el => counterRefs.current[1] = el}>0</div><p>Client Satisfaction</p></div>
              <div className="counter-box" data-aos="fade-up" data-aos-delay="200"><div className="counter-number" data-target="10" ref={el => counterRefs.current[2] = el}>0</div><p>Years Experience</p></div>
              <div className="counter-box" data-aos="fade-up" data-aos-delay="300"><div className="counter-number" data-target="50" ref={el => counterRefs.current[3] = el}>0</div><p>Award Winning Events</p></div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="section-padding portfolio-section" style={{ backgroundImage: `url('/sliding/back.jpg')` }}>
          <div className="container">
            <div className="section-heading" data-aos="fade-up">
              <h5>Our Work</h5>
              <h2>Recent Event Highlights</h2>
              <p>Browse through our portfolio of recent events to get inspired for your next celebration.</p>
            </div>
            <div className="grid-container grid-cols-lg-3 grid-cols-md-2">
              <div className="portfolio-card" data-aos="fade-up" data-aos-delay="100"><img src="https://picsum.photos/seed/port1/400/500" alt="Wedding Event" /><div className="portfolio-card-overlay"></div><div className="portfolio-card-content"><h3>Elegant Garden Wedding</h3><p>Wedding | New York</p></div></div>
              <div className="portfolio-card" data-aos="fade-up" data-aos-delay="200"><img src="https://picsum.photos/seed/port2/400/500" alt="Corporate Event" /><div className="portfolio-card-overlay"></div><div className="portfolio-card-content"><h3>Tech Company Launch</h3><p>Corporate | San Francisco</p></div></div>
              <div className="portfolio-card" data-aos="fade-up" data-aos-delay="300"><img src="https://picsum.photos/seed/port3/400/500" alt="Birthday Party" /><div className="portfolio-card-overlay"></div><div className="portfolio-card-content"><h3>Luxury 30th Birthday</h3><p>Birthday | Miami</p></div></div>
              <div className="portfolio-card" data-aos="fade-up" data-aos-delay="400"><img src="https://picsum.photos/seed/port4/400/500" alt="Festival Event" /><div className="portfolio-card-overlay"></div><div className="portfolio-card-content"><h3>Summer Music Festival</h3><p>Festival | Los Angeles</p></div></div>
              <div className="portfolio-card" data-aos="fade-up" data-aos-delay="500"><img src="https://picsum.photos/seed/port5/400/500" alt="Charity Gala" /><div className="portfolio-card-overlay"></div><div className="portfolio-card-content"><h3>Annual Charity Gala</h3><p>Fundraiser | Chicago</p></div></div>
              <div className="portfolio-card" data-aos="fade-up" data-aos-delay="600"><img src="https://picsum.photos/seed/port6/400/500" alt="Private Party" /><div className="portfolio-card-overlay"></div><div className="portfolio-card-content"><h3>VIP Private Party</h3><p>Private Event | Las Vegas</p></div></div>
            </div>
            <div className="text-center" style={{marginTop: '3rem'}}><button className="btn-primary">View Full Portfolio</button></div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="section-padding testimonials-section">
            <div className="container">
                <div className="section-heading" data-aos="fade-up">
                    <h5>Client Feedback</h5>
                    <h2>What Our Clients Say</h2>
                    <p>Don’t just take our word for it — hear from our satisfied clients about their experiences.</p>
                </div>
                <div className="grid-container grid-cols-lg-3 grid-cols-md-2" style={{gap: '2.5rem'}}>
                    <div className="testimonial-card" data-aos="fade-up" data-aos-delay="100"><div className="testimonial-header"><div className="testimonial-quote-icon"><i className="fas fa-quote-left"></i></div><div className="testimonial-stars"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div></div><p className="testimonial-text">“EventHub transformed our wedding into the magical day we had always dreamed of...”</p><div className="testimonial-author"><img src="https://via.placeholder.com/64/8B5CF6/FFFFFF?text=J+M" alt="Client" /><div><h4>Jennifer & Michael</h4><p>Wedding Clients</p></div></div></div>
                    <div className="testimonial-card" data-aos="fade-up" data-aos-delay="200"><div className="testimonial-header"><div className="testimonial-quote-icon"><i className="fas fa-quote-left"></i></div><div className="testimonial-stars"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div></div><p className="testimonial-text">“Our corporate retreat was flawlessly executed thanks to EventHub...”</p><div className="testimonial-author"><img src="https://via.placeholder.com/64/EC4899/FFFFFF?text=R+J" alt="Client" /><div><h4>Robert Johnson</h4><p>CEO, TechInnovate</p></div></div></div>
                    <div className="testimonial-card" data-aos="fade-up" data-aos-delay="300"><div className="testimonial-header"><div className="testimonial-quote-icon"><i className="fas fa-quote-left"></i></div><div className="testimonial-stars"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div></div><p className="testimonial-text">“The 50th birthday party exceeded all expectations...”</p><div className="testimonial-author"><img src="https://via.placeholder.com/64/F59E0B/FFFFFF?text=S+W" alt="Client" /><div><h4>Samantha Williams</h4><p>Birthday Celebration</p></div></div></div>
                </div>
                <div className="text-center" style={{marginTop: '3rem'}}><button className="btn-primary" style={{backgroundColor: 'var(--primary)'}}>Read More Reviews</button></div>
            </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="team-bg-overlay"></div>
          <div className="container">
            <div className="text-center" style={{marginBottom: '4rem'}}>
              <h2>Our <span>Team</span></h2>
              <div className="divider"></div>
              <p>Meet our dedicated team of professionals who will bring your event vision to life.</p>
            </div>
            <div className="team-slider-container">
              <div className="team-slider-images" ref={teamSliderRef}>
                <div className="team-slider-img"><img src="https://via.placeholder.com/400x600.png/1f2937/ffffff?text=Mike" alt="Team Member Mike" /><h1>Mike</h1><div className="team-details"><h2>Mike Johnson</h2><p>Creative Director</p><p>With 15+ years of experience, Mike leads our creative team with innovative concepts.</p></div></div>
                <div className="team-slider-img"><img src="https://via.placeholder.com/400x600.png/1f2937/ffffff?text=Samite" alt="Team Member Samite" /><h1>Samite</h1><div className="team-details"><h2>Samantha Lee</h2><p>Event Coordinator</p><p>Samantha's attention to detail ensures every aspect of your event runs smoothly.</p></div></div>
                <div className="team-slider-img"><img src="https://via.placeholder.com/400x600.png/1f2937/ffffff?text=Hashi" alt="Team Member Hashi" /><h1>Hashi</h1><div className="team-details"><h2>Hashim Ahmed</h2><p>Technical Director</p><p>Hashim's expertise in audio-visual production creates the perfect ambiance.</p></div></div>
                <div className="team-slider-img active"><img src="https://via.placeholder.com/400x600.png/1f2937/ffffff?text=Kaity" alt="Team Member Kaity" /><h1>Kaity</h1><div className="team-details"><h2>Kaitlyn Taylor</h2><p>Lead Planner</p><p>Kaitlyn's creativity and organization skills make her the perfect person to transform your vision.</p></div></div>
                <div className="team-slider-img"><img src="https://via.placeholder.com/400x600.png/1f2937/ffffff?text=Lauren" alt="Team Member Lauren" /><h1>Lauren</h1><div className="team-details"><h2>Lauren Garcia</h2><p>Decor Specialist</p><p>Lauren's eye for design and aesthetics ensures your event space looks stunning.</p></div></div>
                <div className="team-slider-img"><img src="https://via.placeholder.com/400x600.png/1f2937/ffffff?text=Ryan" alt="Team Member Ryan" /><h1>Ryan</h1><div className="team-details"><h2>Ryan Wilson</h2><p>Logistics Manager</p><p>Ryan handles all the behind-the-scenes logistics to ensure your event runs flawlessly.</p></div></div>
                <div className="team-slider-img"><img src="https://via.placeholder.com/400x600.png/1f2937/ffffff?text=Daniel" alt="Team Member Daniel" /><h1>Daniel</h1><div className="team-details"><h2>Daniel Kim</h2><p>Catering Director</p><p>Daniel works with top chefs to create custom menus that delight your guests.</p></div></div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-padding contact-section">
          <div className="container">
            <div className="section-heading slide-in">
              <h5>Get In Touch</h5>
              <h2>Start Planning Your Event</h2>
              <p>Ready to create unforgettable memories? Contact us today to discuss your vision and let us bring it to life.</p>
            </div>
            <div className="contact-grid">
              <div className="contact-form fade-in">
                <form>
                  <div className="form-grid">
                    <div><label htmlFor="name">Your Name</label><input type="text" id="name" /></div>
                    <div><label htmlFor="email">Your Email</label><input type="email" id="email" /></div>
                  </div>
                  <div className="form-group"><label htmlFor="event">Event Type</label><select id="event"><option value="">Select Event Type</option><option value="wedding">Wedding</option><option value="corporate">Corporate Event</option><option value="birthday">Birthday Party</option><option value="festival">Festival/Concert</option><option value="other">Other</option></select></div>
                  <div className="form-group"><label htmlFor="message">Your Message</label><textarea id="message" rows="5"></textarea></div>
                  <button type="submit" className="btn-primary submit-button">Send Message</button>
                </form>
              </div>
              <div className="slide-in">
                <div className="contact-info-card">
                  <h3>Contact Information</h3>
                  <div className="contact-info-item-group">
                    <div className="contact-info-item"><div className="icon"><i className="fas fa-map-marker-alt"></i></div><div><h4>Our Location</h4><p>123 Event Avenue, New York, NY 10001</p></div></div>
                    <div className="contact-info-item"><div className="icon"><i className="fas fa-phone-alt"></i></div><div><h4>Phone Number</h4><p>+1 (555) 123-4567</p></div></div>
                    <div className="contact-info-item"><div className="icon"><i className="fas fa-envelope"></i></div><div><h4>Email Address</h4><p>info@eventhub.com</p></div></div>
                    <div className="contact-info-item"><div className="icon"><i className="fas fa-clock"></i></div><div><h4>Working Hours</h4><p>Monday - Friday: 9AM - 6PM</p></div></div>
                  </div>
                  <div className="social-icon-group"><h4>Follow Us</h4><div style={{display: 'flex', gap: '1rem', marginLeft: '1rem'}}><a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a><a href="#" className="social-icon"><i className="fab fa-instagram"></i></a><a href="#" className="social-icon"><i className="fab fa-twitter"></i></a><a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a></div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="section-padding-sm cta-section">
          <div className="container">
            <h2 className="fade-in">Ready to Plan Your Next Unforgettable Event?</h2>
            <p className="fade-in" style={{ animationDelay: '0.2s' }}>Let's create memories that will last a lifetime. Our team is ready to bring your vision to life.</p>
            <button className="btn-red fade-in" style={{ animationDelay: '0.3s' }}>Schedule a Consultation</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid-container">
            <div>
              <div style={{marginBottom: '1.5rem'}}><span className="nav-logo-text" style={{color: 'white'}}>Event<span style={{color: 'var(--primary)'}}>Hub</span></span></div>
              <p>Creating extraordinary events and unforgettable experiences for our clients since 2015.</p>
              <div className="social-icon-group" style={{marginTop: '1.5rem', gap: '1rem'}}><a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a><a href="#" className="social-icon"><i className="fab fa-instagram"></i></a><a href="#" className="social-icon"><i className="fab fa-twitter"></i></a><a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a></div>
            </div>
            <div>
              <h3>Quick Links</h3>
              <ul className="footer-links-list">
                <li><a href="#home">Home</a></li><li><a href="#services">Services</a></li><li><a href="#about">About Us</a></li><li><a href="#portfolio">Portfolio</a></li><li><a href="#testimonials">Testimonials</a></li><li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3>Services</h3>
              <ul className="footer-links-list">
                <li><a href="#">Wedding Planning</a></li><li><a href="#">Corporate Events</a></li><li><a href="#">Birthday Parties</a></li><li><a href="#">Festivals & Concerts</a></li><li><a href="#">Private Events</a></li><li><a href="#">Custom Theme Events</a></li>
              </ul>
            </div>
            <div>
              <h3>Newsletter</h3>
              <p>Subscribe to our newsletter to receive updates and event planning tips.</p>
              <form><div className="newsletter-form"><input type="email" placeholder="Your Email" /><button type="submit"><i className="fas fa-paper-plane"></i></button></div><p style={{fontSize: '0.75rem'}}>We'll never share your email with anyone else.</p></form>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>© {new Date().getFullYear()} EventHub. All Rights Reserved.</p>
              <div className="footer-bottom-links"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Cookie Policy</a></div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <a href="#home" className="back-to-top"><i className="fas fa-chevron-up"></i></a>
    </>
  );
}

export default HomePage;