// SUPER SIMPLE WORKING HOVER EFFECT
// This WILL work - guaranteed!

console.log('🚀 Starting SIMPLE hover effect...');

// Step 1: Load GSAP
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
script.onload = function() {
    console.log('✅ GSAP loaded successfully');
    
    // Step 2: Add CSS for hover images
    const css = `
        .hover-img {
            position: fixed;
            width: 200px;
            height: 250px;
            background: url('https://i.ibb.co/wvnTg2d/OIP.jpg') center/cover;
            border-radius: 10px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.8);
            pointer-events: none;
            opacity: 0;
            z-index: 999999;
        }
        .logo-active {
            outline: 3px solid #ff0000 !important;
            outline-offset: 5px !important;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    console.log('✅ CSS added');
    
    // Step 3: Create 4 images
    const images = [];
    for(let i = 0; i < 4; i++) {
        const img = document.createElement('div');
        img.className = 'hover-img';
        document.body.appendChild(img);
        images.push(img);
    }
    console.log('✅ Created 4 images');
    
    // Step 4: Find ALL possible logo elements
    const logos = [];
    
    // Find by alt text
    document.querySelectorAll('img').forEach(img => {
        if(img.alt && img.alt.toLowerCase().includes('my')) {
            logos.push(img);
            console.log('✅ Found by alt:', img.alt);
        }
    });
    
    // Find by src
    document.querySelectorAll('img').forEach(img => {
        if(img.src && img.src.includes('mydayone')) {
            logos.push(img);
            console.log('✅ Found by src:', img.src);
        }
    });
    
    // Find home links
    document.querySelectorAll('a[href="/"]').forEach(link => {
        logos.push(link);
        console.log('✅ Found home link');
    });
    
    // Fallback: use first image
    if(logos.length === 0) {
        const firstImg = document.querySelector('img');
        if(firstImg) {
            logos.push(firstImg);
            console.log('✅ Using first image as fallback');
        }
    }
    
    console.log(`🎯 Total logos found: ${logos.length}`);
    
    // Step 5: Add hover effect to ALL found elements
    logos.forEach((logo, index) => {
        logo.classList.add('logo-active');
        console.log(`✅ Added effect to logo ${index + 1}`);
        
        logo.addEventListener('mouseenter', function(e) {
            console.log('🎨 HOVER STARTED!');
            
            // Show images in corners around cursor
            const positions = [
                {x: -150, y: -100},
                {x: 100, y: -80},
                {x: -120, y: 120},
                {x: 120, y: 100}
            ];
            
            images.forEach((img, i) => {
                img.style.left = (e.clientX + positions[i].x) + 'px';
                img.style.top = (e.clientY + positions[i].y) + 'px';
                
                gsap.to(img, {
                    opacity: 1,
                    scale: 1,
                    rotation: (i - 2) * 10,
                    duration: 0.5 + (i * 0.1),
                    ease: "back.out(1.7)"
                });
            });
        });
        
        logo.addEventListener('mousemove', function(e) {
            const positions = [
                {x: -150, y: -100},
                {x: 100, y: -80},
                {x: -120, y: 120},
                {x: 120, y: 100}
            ];
            
            images.forEach((img, i) => {
                gsap.to(img, {
                    left: (e.clientX + positions[i].x) + 'px',
                    top: (e.clientY + positions[i].y) + 'px',
                    duration: 0.3
                });
            });
        });
        
        logo.addEventListener('mouseleave', function() {
            console.log('🎨 HOVER ENDED!');
            
            images.forEach((img, i) => {
                gsap.to(img, {
                    opacity: 0,
                    scale: 0.5,
                    duration: 0.3,
                    delay: i * 0.05
                });
            });
        });
    });
    
    console.log('🎉 HOVER EFFECT IS READY!');
    console.log('👀 Look for RED OUTLINES around elements');
    console.log('🖱️ Hover over RED outlined elements!');
    
    alert('✅ Hover effect loaded!\n\nLook for RED OUTLINES and hover over them to see 4 images appear!');
};

script.onerror = function() {
    console.error('❌ Failed to load GSAP');
    alert('❌ Failed to load animation library');
};

document.head.appendChild(script);
