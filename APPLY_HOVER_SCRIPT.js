// MYDAYONE HOVER EFFECT - READY TO APPLY
// Copy this entire script and paste in your browser console

console.log('🚀 Applying MyDayOne Hover Effect...');

// Load GSAP
const gsapScript = document.createElement('script');
gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
gsapScript.onload = function() {
    console.log('✅ GSAP loaded');
    
    // Add CSS
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
    
    // Create 4 hover images
    const hoverImages = [];
    for (let i = 0; i < 4; i++) {
        const img = document.createElement('div');
        img.className = `mydayone-hover-img mydayone-hover-img-${i + 1}`;
        document.body.appendChild(img);
        hoverImages.push(img);
    }
    
    // Scattered positions
    const positions = [
        { x: -200, y: -100 },
        { x: 150, y: -80 },
        { x: -180, y: 120 },
        { x: 180, y: 100 }
    ];
    
    // Find MyDayOne elements
    const mydayoneElements = [];
    
    // Find logo by alt text
    document.querySelectorAll('img').forEach(img => {
        const alt = (img.alt || '').toLowerCase();
        if (alt.includes('mydayone') || alt.includes('my day')) {
            mydayoneElements.push(img);
            console.log('✅ Found logo:', img);
        }
    });
    
    // Find home links
    document.querySelectorAll('a[href="/"]').forEach(link => {
        mydayoneElements.push(link);
        console.log('✅ Found home link:', link);
    });
    
    console.log(`🎯 Found ${mydayoneElements.length} MyDayOne elements`);
    
    // Add event listeners to each MyDayOne element
    mydayoneElements.forEach((element) => {
        // Add green outline
        element.classList.add('mydayone-active');
        
        // MOUSEENTER: Show scattered images
        element.addEventListener('mouseenter', function(event) {
            console.log('🎨 MOUSE ENTERED MyDayOne!');
            
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            
            hoverImages.forEach((img, index) => {
                const pos = positions[index];
                img.style.left = (mouseX + pos.x) + 'px';
                img.style.top = (mouseY + pos.y) + 'px';
                
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
        });
        
        // MOUSEMOVE: Move images with cursor
        element.addEventListener('mousemove', function(event) {
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            
            hoverImages.forEach((img, index) => {
                const pos = positions[index];
                gsap.to(img, {
                    duration: 0.3,
                    left: (mouseX + pos.x) + 'px',
                    top: (mouseY + pos.y) + 'px',
                    ease: "power2.out"
                });
            });
        });
        
        // MOUSELEAVE: Hide images
        element.addEventListener('mouseleave', function() {
            console.log('🎨 MOUSE LEFT MyDayOne!');
            
            hoverImages.forEach((img, index) => {
                gsap.to(img, {
                    duration: 0.4,
                    opacity: 0,
                    scale: 0.3,
                    rotation: (index - 2) * 30,
                    ease: "power2.in",
                    delay: index * 0.05
                });
            });
        });
    });
    
    console.log('🎉 HOVER EFFECT APPLIED SUCCESSFULLY!');
    alert('✅ MyDayOne hover effect is now active!\n\nLook for GREEN OUTLINES around your logo and hover over them!');
};

document.head.appendChild(gsapScript);
