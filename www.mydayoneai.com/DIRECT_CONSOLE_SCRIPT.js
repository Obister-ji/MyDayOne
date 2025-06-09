// DIRECT CONSOLE SCRIPT FOR YOUR LIVE WEBSITE
// Copy and paste this ENTIRE script into your browser console on https://my-day-one-zeta.vercel.app/

console.log('🚀 STARTING MYDAYONE HOVER EFFECT...');

// First, add GSAP if not available
if (typeof gsap === 'undefined') {
    console.log('📦 Loading GSAP...');
    const gsapScript = document.createElement('script');
    gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    gsapScript.onload = function() {
        console.log('✅ GSAP loaded!');
        initHoverEffect();
    };
    document.head.appendChild(gsapScript);
} else {
    console.log('✅ GSAP already available!');
    initHoverEffect();
}

function initHoverEffect() {
    console.log('🎯 Initializing hover effect...');
    
    // Remove any existing hover images
    document.querySelectorAll('.mydayone-hover-image').forEach(el => el.remove());
    
    // Add CSS styles
    const styles = `
        .mydayone-hover-image {
            position: fixed !important;
            width: 150px !important;
            height: 200px !important;
            pointer-events: none !important;
            opacity: 0 !important;
            z-index: 99999 !important;
            border-radius: 12px !important;
            overflow: hidden !important;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5) !important;
            background-size: cover !important;
            background-position: center center !important;
            background-repeat: no-repeat !important;
            background-image: url('https://i.ibb.co/wvnTg2d/OIP.jpg') !important;
            transition: none !important;
        }
        
        .mydayone-hover-image-1 { 
            transform: rotate(-8deg) !important;
            width: 140px !important;
            height: 180px !important;
        }
        .mydayone-hover-image-2 { 
            transform: rotate(5deg) !important;
            width: 160px !important;
            height: 220px !important;
        }
        .mydayone-hover-image-3 { 
            transform: rotate(-3deg) !important;
            width: 130px !important;
            height: 170px !important;
        }
        .mydayone-hover-image-4 { 
            transform: rotate(7deg) !important;
            width: 155px !important;
            height: 210px !important;
        }
    `;
    
    // Add styles to page
    let styleSheet = document.getElementById('mydayone-hover-styles');
    if (styleSheet) styleSheet.remove();
    
    styleSheet = document.createElement('style');
    styleSheet.id = 'mydayone-hover-styles';
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    console.log('✅ Styles added!');
    
    // Create 4 hover images
    const hoverImages = [];
    for (let i = 0; i < 4; i++) {
        const img = document.createElement('div');
        img.className = `mydayone-hover-image mydayone-hover-image-${i + 1}`;
        img.id = `mydayoneHoverImage${i + 1}`;
        document.body.appendChild(img);
        hoverImages.push(img);
        console.log(`✅ Created hover image ${i + 1}`);
    }
    
    // Find MyDayOne logo/elements
    const logoSelectors = [
        'img[alt*="My DayOne"]',
        'img[alt*="MyDayOne"]',
        'img[alt*="mydayone"]',
        'a[href="/"]',
        'a[href="/"] img',
        '[href="/"]',
        '[href="/"] img',
        'header img',
        'header a',
        'nav img',
        'nav a'
    ];
    
    const logoElements = [];
    
    logoSelectors.forEach(selector => {
        try {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (!logoElements.includes(el)) {
                    logoElements.push(el);
                    console.log(`✅ Found logo element with selector "${selector}":`, el);
                }
            });
        } catch (e) {
            console.log(`⚠️ Invalid selector: ${selector}`);
        }
    });
    
    // Also search by text content and image src
    document.querySelectorAll('*').forEach(el => {
        const text = (el.textContent || '').toLowerCase();
        const src = (el.src || '').toLowerCase();
        const alt = (el.alt || '').toLowerCase();
        
        if (text.includes('mydayone') || text.includes('my day one') || 
            src.includes('mydayone') || alt.includes('mydayone') ||
            src.includes('logo')) {
            if (!logoElements.includes(el)) {
                logoElements.push(el);
                console.log('✅ Found element by content/src:', el);
            }
        }
    });
    
    console.log(`🎯 Found ${logoElements.length} logo elements:`, logoElements);
    
    if (logoElements.length === 0) {
        console.error('❌ No logo elements found! Trying to find any clickable elements...');
        
        // Fallback: find any header links
        const headerLinks = document.querySelectorAll('header a, nav a, .header a, .nav a');
        headerLinks.forEach(el => logoElements.push(el));
        console.log(`🔄 Added ${headerLinks.length} header links as fallback`);
    }
    
    // Positions for scattered images
    const positions = [
        { x: -200, y: -100 }, // Top left
        { x: 150, y: -80 },   // Top right
        { x: -180, y: 120 },  // Bottom left
        { x: 180, y: 100 }    // Bottom right
    ];
    
    // Add hover effect to each logo element
    logoElements.forEach((element, index) => {
        console.log(`🎯 Adding hover effect to element ${index + 1}:`, element);
        
        // Add visual indicator
        element.style.border = '2px dashed red';
        element.style.boxSizing = 'border-box';
        
        element.addEventListener('mouseenter', function(e) {
            console.log('🎨 HOVER ENTER!', e.target);
            
            hoverImages.forEach((img, imgIndex) => {
                const pos = positions[imgIndex];
                const finalX = e.clientX + pos.x;
                const finalY = e.clientY + pos.y;
                
                img.style.left = finalX + 'px';
                img.style.top = finalY + 'px';
                
                gsap.fromTo(img, {
                    opacity: 0,
                    scale: 0.5,
                    rotation: (imgIndex - 2) * 20
                }, {
                    duration: 0.6 + (imgIndex * 0.1),
                    opacity: 1,
                    scale: 1,
                    rotation: (imgIndex - 2) * 8,
                    ease: "back.out(1.7)",
                    delay: imgIndex * 0.1
                });
            });
        });
        
        element.addEventListener('mousemove', function(e) {
            hoverImages.forEach((img, imgIndex) => {
                const pos = positions[imgIndex];
                gsap.to(img, {
                    duration: 0.3,
                    left: (e.clientX + pos.x) + 'px',
                    top: (e.clientY + pos.y) + 'px',
                    ease: "power2.out"
                });
            });
        });
        
        element.addEventListener('mouseleave', function() {
            console.log('🎨 HOVER LEAVE!');
            
            hoverImages.forEach((img, imgIndex) => {
                gsap.to(img, {
                    duration: 0.4,
                    opacity: 0,
                    scale: 0.3,
                    rotation: (imgIndex - 2) * 30,
                    ease: "power2.in",
                    delay: imgIndex * 0.05
                });
            });
        });
    });
    
    console.log('🎉 HOVER EFFECT SETUP COMPLETE!');
    console.log('👀 Look for RED DASHED BORDERS around elements');
    console.log('🖱️ Hover over elements with red borders to see the effect!');
    
    // Test visibility
    setTimeout(() => {
        console.log('🔍 Testing image visibility...');
        hoverImages.forEach((img, index) => {
            img.style.left = (100 + index * 200) + 'px';
            img.style.top = '50px';
            img.style.opacity = '1';
            img.style.zIndex = '99999';
            
            setTimeout(() => {
                img.style.opacity = '0';
            }, 2000);
        });
        console.log('✅ Test images should appear briefly at top of page');
    }, 1000);
}

console.log('📋 INSTRUCTIONS:');
console.log('1. Go to https://my-day-one-zeta.vercel.app/');
console.log('2. Open browser console (F12)');
console.log('3. Paste this ENTIRE script and press Enter');
console.log('4. Look for red dashed borders around elements');
console.log('5. Hover over red-bordered elements to see the effect!');
