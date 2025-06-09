// MyDayOne Scattered Images Hover Effect
// Add this script to your React website

(function() {
    'use strict';
    
    console.log('🚀 MyDayOne Hover Effect Loading...');
    
    // Configuration
    const CONFIG = {
        imageUrl: 'https://i.ibb.co/wvnTg2d/OIP.jpg',
        imageCount: 4,
        positions: [
            { x: -200, y: -100 }, // Top left
            { x: 150, y: -80 },   // Top right
            { x: -180, y: 120 },  // Bottom left
            { x: 180, y: 100 }    // Bottom right
        ],
        selectors: [
            'img[alt*="My DayOne"]',
            'img[alt*="MyDayOne"]',
            'img[alt*="mydayone"]',
            '[href="/"]',
            'a[href="/"]',
            'div:contains("MyDayOne")',
            'h1:contains("MyDayOne")',
            '.logo',
            'header img',
            'nav img'
        ]
    };
    
    // CSS Styles
    const styles = `
        .mydayone-hover-image {
            position: fixed;
            width: 150px;
            height: 200px;
            pointer-events: none;
            opacity: 0;
            z-index: 9999;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
            transition: all 0.3s ease;
            background-image: url('${CONFIG.imageUrl}');
        }
        
        .mydayone-hover-image-1 { 
            transform: rotate(-8deg);
            width: 140px;
            height: 180px;
        }
        .mydayone-hover-image-2 { 
            transform: rotate(5deg);
            width: 160px;
            height: 220px;
        }
        .mydayone-hover-image-3 { 
            transform: rotate(-3deg);
            width: 130px;
            height: 170px;
        }
        .mydayone-hover-image-4 { 
            transform: rotate(7deg);
            width: 155px;
            height: 210px;
        }
    `;
    
    // Add styles to page
    function addStyles() {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
        console.log('✅ Styles added');
    }
    
    // Create hover images
    function createHoverImages() {
        const images = [];
        
        for (let i = 0; i < CONFIG.imageCount; i++) {
            const img = document.createElement('div');
            img.className = `mydayone-hover-image mydayone-hover-image-${i + 1}`;
            img.id = `mydayoneHoverImage${i + 1}`;
            document.body.appendChild(img);
            images.push(img);
            console.log(`✅ Created hover image ${i + 1}`);
        }
        
        return images;
    }
    
    // Find MyDayOne elements
    function findMyDayOneElements() {
        const elements = [];
        
        // Try different selectors
        CONFIG.selectors.forEach(selector => {
            try {
                const found = document.querySelectorAll(selector);
                found.forEach(el => {
                    if (!elements.includes(el)) {
                        elements.push(el);
                        console.log(`✅ Found element with selector "${selector}":`, el);
                    }
                });
            } catch (e) {
                // Ignore invalid selectors
            }
        });
        
        // Also search by text content
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            const text = el.textContent || '';
            if (text.toLowerCase().includes('mydayone') || text.toLowerCase().includes('my day one')) {
                if (!elements.includes(el) && el.children.length === 0) {
                    elements.push(el);
                    console.log('✅ Found element by text content:', el);
                }
            }
        });
        
        return elements;
    }
    
    // Add hover effect to element
    function addHoverEffect(element, hoverImages) {
        console.log('🎯 Adding hover effect to:', element);
        
        element.addEventListener('mouseenter', function(e) {
            console.log('🎨 HOVER ENTER!', e.target);
            
            hoverImages.forEach((img, index) => {
                const pos = CONFIG.positions[index];
                const finalX = e.clientX + pos.x;
                const finalY = e.clientY + pos.y;
                
                img.style.left = finalX + 'px';
                img.style.top = finalY + 'px';
                
                // Use GSAP if available, otherwise use CSS transitions
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(img, {
                        opacity: 0,
                        scale: 0.5,
                        rotation: (index - 2) * 20
                    }, {
                        duration: 0.6 + (index * 0.1),
                        opacity: 1,
                        scale: 1,
                        rotation: (index - 2) * 8,
                        ease: "back.out(1.7)",
                        delay: index * 0.1
                    });
                } else {
                    setTimeout(() => {
                        img.style.opacity = '1';
                        img.style.transform = `scale(1) rotate(${(index - 2) * 8}deg)`;
                    }, index * 100);
                }
            });
        });
        
        element.addEventListener('mousemove', function(e) {
            hoverImages.forEach((img, index) => {
                const pos = CONFIG.positions[index];
                const finalX = e.clientX + pos.x;
                const finalY = e.clientY + pos.y;
                
                if (typeof gsap !== 'undefined') {
                    gsap.to(img, {
                        duration: 0.3,
                        left: finalX + 'px',
                        top: finalY + 'px',
                        ease: "power2.out"
                    });
                } else {
                    img.style.left = finalX + 'px';
                    img.style.top = finalY + 'px';
                }
            });
        });
        
        element.addEventListener('mouseleave', function() {
            console.log('🎨 HOVER LEAVE!');
            
            hoverImages.forEach((img, index) => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(img, {
                        duration: 0.4,
                        opacity: 0,
                        scale: 0.3,
                        rotation: (index - 2) * 30,
                        ease: "power2.in",
                        delay: index * 0.05
                    });
                } else {
                    setTimeout(() => {
                        img.style.opacity = '0';
                        img.style.transform = `scale(0.3) rotate(${(index - 2) * 30}deg)`;
                    }, index * 50);
                }
            });
        });
    }
    
    // Initialize the effect
    function init() {
        console.log('🎯 Initializing MyDayOne hover effect...');
        
        // Add styles
        addStyles();
        
        // Create hover images
        const hoverImages = createHoverImages();
        
        // Find MyDayOne elements
        const elements = findMyDayOneElements();
        
        if (elements.length === 0) {
            console.warn('⚠️ No MyDayOne elements found. Retrying in 2 seconds...');
            setTimeout(init, 2000);
            return;
        }
        
        // Add hover effect to each element
        elements.forEach(element => {
            addHoverEffect(element, hoverImages);
        });
        
        console.log(`✅ MyDayOne hover effect initialized for ${elements.length} elements!`);
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Also try again after a delay for React apps
    setTimeout(init, 1000);
    setTimeout(init, 3000);
    
})();
