// MYDAYONE HOVER EFFECT - IMAGES APPEAR IN CENTER
// 4 images appear in the center of the screen when hovering

console.log('🚀 Starting CENTER hover effect...');

const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
script.onload = function() {
    console.log('✅ GSAP loaded successfully');
    
    const css = `
        .center-hover-img {
            position: fixed;
            width: 200px;
            height: 250px;
            background: url('https://i.ibb.co/wvnTg2d/OIP.jpg') center/cover;
            border-radius: 15px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.8);
            pointer-events: none;
            opacity: 0;
            z-index: 999999;
            transform-origin: center center;
        }
        .logo-center-active {
            outline: 3px solid #ff6b6b !important;
            outline-offset: 5px !important;
            transition: transform 0.3s ease !important;
        }
        .logo-center-active:hover {
            transform: scale(1.1) !important;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    console.log('✅ CSS added');
    
    // Create 4 images
    const images = [];
    for(let i = 0; i < 4; i++) {
        const img = document.createElement('div');
        img.className = 'center-hover-img';
        document.body.appendChild(img);
        images.push(img);
    }
    console.log('✅ Created 4 images');
    
    // Find logo elements
    const logos = [];
    
    document.querySelectorAll('img').forEach(img => {
        if(img.alt && img.alt.toLowerCase().includes('my')) {
            logos.push(img);
            console.log('✅ Found by alt:', img.alt);
        }
    });
    
    document.querySelectorAll('img').forEach(img => {
        if(img.src && img.src.includes('mydayone')) {
            logos.push(img);
            console.log('✅ Found by src:', img.src);
        }
    });
    
    document.querySelectorAll('a[href="/"]').forEach(link => {
        logos.push(link);
        console.log('✅ Found home link');
    });
    
    if(logos.length === 0) {
        const firstImg = document.querySelector('img');
        if(firstImg) {
            logos.push(firstImg);
            console.log('✅ Using first image as fallback');
        }
    }
    
    console.log(`🎯 Total logos found: ${logos.length}`);
    
    // Add hover effect
    logos.forEach((logo, index) => {
        logo.classList.add('logo-center-active');
        console.log(`✅ Added center effect to logo ${index + 1}`);
        
        logo.addEventListener('mouseenter', function(e) {
            console.log('🎨 CENTER HOVER STARTED!');
            
            // Get screen center
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            // Position images in center with slight offsets
            const centerPositions = [
                {x: centerX - 250, y: centerY - 150, rotation: -15},  // Top-left of center
                {x: centerX + 50, y: centerY - 120, rotation: 10},    // Top-right of center
                {x: centerX - 200, y: centerY + 80, rotation: -8},    // Bottom-left of center
                {x: centerX + 100, y: centerY + 100, rotation: 12}    // Bottom-right of center
            ];
            
            images.forEach((img, i) => {
                const pos = centerPositions[i];
                
                // Position in center
                img.style.left = pos.x + 'px';
                img.style.top = pos.y + 'px';
                
                // Animate appearance
                gsap.fromTo(img, {
                    opacity: 0,
                    scale: 0.3,
                    rotation: pos.rotation + (Math.random() * 40 - 20),
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50
                }, {
                    opacity: 1,
                    scale: 1,
                    rotation: pos.rotation,
                    x: 0,
                    y: 0,
                    duration: 0.8 + (i * 0.15),
                    ease: "elastic.out(1, 0.8)",
                    delay: i * 0.1
                });
                
                // Add floating animation
                gsap.to(img, {
                    y: "+=20",
                    rotation: pos.rotation + 5,
                    duration: 2 + Math.random(),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: 1 + (i * 0.3)
                });
            });
        });
        
        logo.addEventListener('mouseleave', function() {
            console.log('🎨 CENTER HOVER ENDED!');
            
            images.forEach((img, i) => {
                // Stop floating animations
                gsap.killTweensOf(img);
                
                // Animate disappearance
                gsap.to(img, {
                    opacity: 0,
                    scale: 0.2,
                    rotation: Math.random() * 360,
                    x: Math.random() * 200 - 100,
                    y: Math.random() * 200 - 100,
                    duration: 0.6,
                    ease: "power2.in",
                    delay: i * 0.1
                });
            });
        });
    });
    
    console.log('🎉 CENTER HOVER EFFECT IS READY!');
    console.log('🎯 Images will appear in the CENTER of the screen!');
    
    alert('✅ Center hover effect loaded!\n\nHover over the MyDayOne logo and 4 images will appear in the CENTER of your screen!');
};

script.onerror = function() {
    console.error('❌ Failed to load GSAP');
    alert('❌ Failed to load animation library');
};

document.head.appendChild(script);
