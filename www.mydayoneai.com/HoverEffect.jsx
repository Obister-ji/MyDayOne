// HoverEffect.jsx - React Component for MyDayOne Scattered Images Hover Effect
// Add this component to your Next.js project

import React, { useEffect, useState } from 'react';

const HoverEffect = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load GSAP
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      setIsLoaded(true);
      initHoverEffect();
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(script);
      document.querySelectorAll('.mydayone-hover-img').forEach(el => el.remove());
    };
  }, []);

  const initHoverEffect = () => {
    // Create 4 hover images
    const images = [];
    for (let i = 0; i < 4; i++) {
      const img = document.createElement('div');
      img.className = `mydayone-hover-img mydayone-hover-img-${i + 1}`;
      img.style.cssText = `
        position: fixed !important;
        width: 150px !important;
        height: 200px !important;
        background-image: url('https://i.ibb.co/wvnTg2d/OIP.jpg') !important;
        background-size: cover !important;
        background-position: center !important;
        border-radius: 12px !important;
        box-shadow: 0 20px 40px rgba(0,0,0,0.7) !important;
        pointer-events: none !important;
        opacity: 0 !important;
        z-index: 999999 !important;
        ${i === 0 ? 'transform: rotate(-8deg) !important; width: 140px !important; height: 180px !important;' : ''}
        ${i === 1 ? 'transform: rotate(5deg) !important; width: 160px !important; height: 220px !important;' : ''}
        ${i === 2 ? 'transform: rotate(-3deg) !important; width: 130px !important; height: 170px !important;' : ''}
        ${i === 3 ? 'transform: rotate(7deg) !important; width: 155px !important; height: 210px !important;' : ''}
      `;
      document.body.appendChild(img);
      images.push(img);
    }

    // Find logo elements
    const findLogoElements = () => {
      const elements = [];
      
      // Find by image alt text
      document.querySelectorAll('img').forEach(img => {
        const alt = (img.alt || '').toLowerCase();
        if (alt.includes('mydayone') || alt.includes('my day')) {
          elements.push(img);
        }
      });
      
      // Find by href
      document.querySelectorAll('a[href="/"]').forEach(link => {
        elements.push(link);
      });
      
      return elements;
    };

    // Positions for scattered effect
    const positions = [
      { x: -200, y: -100 },
      { x: 150, y: -80 },
      { x: -180, y: 120 },
      { x: 180, y: 100 }
    ];

    // Add hover effect
    const addHoverEffect = () => {
      const logoElements = findLogoElements();
      
      logoElements.forEach((element) => {
        // Add visual indicator
        element.style.outline = '2px solid #00ff00';
        element.style.outlineOffset = '2px';
        
        const handleMouseEnter = (e) => {
          images.forEach((img, i) => {
            const pos = positions[i];
            img.style.left = (e.clientX + pos.x) + 'px';
            img.style.top = (e.clientY + pos.y) + 'px';
            
            if (window.gsap) {
              window.gsap.fromTo(img, {
                opacity: 0,
                scale: 0.5,
                rotation: (i - 2) * 20
              }, {
                duration: 0.6 + (i * 0.1),
                opacity: 1,
                scale: 1,
                rotation: (i - 2) * 8,
                ease: "back.out(1.7)",
                delay: i * 0.1
              });
            } else {
              img.style.opacity = '1';
            }
          });
        };

        const handleMouseMove = (e) => {
          images.forEach((img, i) => {
            const pos = positions[i];
            if (window.gsap) {
              window.gsap.to(img, {
                duration: 0.3,
                left: (e.clientX + pos.x) + 'px',
                top: (e.clientY + pos.y) + 'px',
                ease: "power2.out"
              });
            } else {
              img.style.left = (e.clientX + pos.x) + 'px';
              img.style.top = (e.clientY + pos.y) + 'px';
            }
          });
        };

        const handleMouseLeave = () => {
          images.forEach((img, i) => {
            if (window.gsap) {
              window.gsap.to(img, {
                duration: 0.4,
                opacity: 0,
                scale: 0.3,
                rotation: (i - 2) * 30,
                ease: "power2.in",
                delay: i * 0.05
              });
            } else {
              img.style.opacity = '0';
            }
          });
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Try to add hover effect multiple times (React might not be ready)
    addHoverEffect();
    setTimeout(addHoverEffect, 1000);
    setTimeout(addHoverEffect, 2000);
  };

  return null; // This component doesn't render anything visible
};

export default HoverEffect;
