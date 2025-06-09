// MYDAYONE HOVER EFFECT - COMPLETE IMPLEMENTATION
// Step-by-step implementation with event listeners

console.log('🚀 Starting MyDayOne Hover Effect Implementation...');

// STEP 1: Load GSAP Library
const gsapScript = document.createElement('script');
gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
gsapScript.onload = function() {
    console.log('✅ GSAP loaded successfully');
    initializeHoverEffect();
};
document.head.appendChild(gsapScript);

function initializeHoverEffect() {
    // STEP 2: Create CSS Styles for Hover Images
    const css = `
        .mydayone-hover-img {
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
        }
        .mydayone-hover-img-1 { transform: rotate(-8deg) !important; width: 140px !important; height: 180px !important; }
        .mydayone-hover-img-2 { transform: rotate(5deg) !important; width: 160px !important; height: 220px !important; }
        .mydayone-hover-img-3 { transform: rotate(-3deg) !important; width: 130px !important; height: 170px !important; }
        .mydayone-hover-img-4 { transform: rotate(7deg) !important; width: 155px !important; height: 210px !important; }
        .mydayone-active { outline: 2px solid #00ff00 !important; outline-offset: 2px !important; }
    `;
    
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    console.log('✅ CSS styles added');

    // STEP 3: Create 4 Hover Images (Hidden by default)
    const hoverImages = [];
    for (let i = 0; i < 4; i++) {
        const img = document.createElement('div');
        img.className = `mydayone-hover-img mydayone-hover-img-${i + 1}`;
        document.body.appendChild(img);
        hoverImages.push(img);
    }
    console.log('✅ Created 4 hover images');

    // STEP 4: Define Scattered Positions Around Cursor
    const positions = [
        { x: -200, y: -100 },  // Top-left
        { x: 150, y: -80 },    // Top-right
        { x: -180, y: 120 },   // Bottom-left
        { x: 180, y: 100 }     // Bottom-right
    ];

    // STEP 5: Find MyDayOne Elements
    const mydayoneElements = [];
    
    // Find by image alt text
    document.querySelectorAll('img').forEach(img => {
        const alt = (img.alt || '').toLowerCase();
        if (alt.includes('mydayone') || alt.includes('my day')) {
            mydayoneElements.push(img);
            console.log('✅ Found MyDayOne logo by alt:', img.alt);
        }
    });
    
    // Find by href (home links)
    document.querySelectorAll('a[href="/"]').forEach(link => {
        mydayoneElements.push(link);
        console.log('✅ Found MyDayOne link by href:', link);
    });

    console.log(`🎯 Total MyDayOne elements found: ${mydayoneElements.length}`);

    // STEP 6: Animation Functions
    function showHoverImages(event) {
        console.log('🎨 MOUSE ENTERED MyDayOne!');
        
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        
        hoverImages.forEach((img, index) => {
            // Position image around cursor
            const pos = positions[index];
            img.style.left = (mouseX + pos.x) + 'px';
            img.style.top = (mouseY + pos.y) + 'px';
            
            // Animate image appearing
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
        });
    }

    function moveHoverImages(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        
        hoverImages.forEach((img, index) => {
            const pos = positions[index];
            
            // Smooth movement following mouse
            gsap.to(img, {
                duration: 0.3,
                left: (mouseX + pos.x) + 'px',
                top: (mouseY + pos.y) + 'px',
                ease: "power2.out"
            });
        });
    }

    function hideHoverImages() {
        console.log('🎨 MOUSE LEFT MyDayOne!');
        
        hoverImages.forEach((img, index) => {
            // Animate images disappearing
            gsap.to(img, {
                duration: 0.4,
                opacity: 0,
                scale: 0.3,
                rotation: (index - 2) * 30,
                ease: "power2.in",
                delay: index * 0.05
            });
        });
    }

    // STEP 7: Add Event Listeners to MyDayOne Elements
    mydayoneElements.forEach((element, index) => {
        // Add visual indicator
        element.classList.add('mydayone-active');
        console.log(`✅ Added event listeners to element ${index + 1}`);
        
        // MOUSEENTER: Show images when mouse enters
        element.addEventListener('mouseenter', showHoverImages);
        
        // MOUSEMOVE: Move images when mouse moves
        element.addEventListener('mousemove', moveHoverImages);
        
        // MOUSELEAVE: Hide images when mouse leaves
        element.addEventListener('mouseleave', hideHoverImages);
    });

    console.log('🎉 HOVER EFFECT IMPLEMENTATION COMPLETE!');
    console.log('👀 Look for GREEN OUTLINES around MyDayOne elements');
    console.log('🖱️ Hover over green-outlined elements to see the effect!');
    
    // Show success notification
    setTimeout(() => {
        alert('✅ MyDayOne hover effect ready!\n\nLook for GREEN OUTLINES and hover over them to see 4 scattered images!');
    }, 1000);
}

// STEP 8: Error Handling
gsapScript.onerror = function() {
    console.error('❌ Failed to load GSAP library');
    alert('❌ Failed to load animation library. Please check your internet connection.');
};
