// BENNET-STYLE HOVER EFFECT FOR MYDAYONE LOGO
// Exact recreation of Bennet website hover animation

console.log('🚀 Creating Bennet-style hover effect for MyDayOne...');

// Load GSAP
const gsapScript = document.createElement('script');
gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
gsapScript.onload = function() {
    console.log('✅ GSAP loaded - Creating Bennet-style effect');
    
    // Bennet-style CSS
    const css = `
        .bennet-hover-img {
            position: fixed !important;
            width: 180px !important;
            height: 240px !important;
            background-image: url('https://i.ibb.co/wvnTg2d/OIP.jpg') !important;
            background-size: cover !important;
            background-position: center !important;
            border-radius: 8px !important;
            box-shadow: 0 25px 50px rgba(0,0,0,0.8) !important;
            pointer-events: none !important;
            opacity: 0 !important;
            z-index: 999999 !important;
            transform-origin: center center !important;
        }
        
        .bennet-hover-img-1 { 
            width: 160px !important; 
            height: 220px !important;
        }
        .bennet-hover-img-2 { 
            width: 200px !important; 
            height: 260px !important;
        }
        .bennet-hover-img-3 { 
            width: 170px !important; 
            height: 230px !important;
        }
        .bennet-hover-img-4 { 
            width: 190px !important; 
            height: 250px !important;
        }
        
        .mydayone-bennet-active {
            outline: 3px solid #ff6b6b !important;
            outline-offset: 3px !important;
            transition: all 0.3s ease !important;
        }
        
        .mydayone-bennet-active:hover {
            transform: scale(1.05) !important;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    
    // Create 4 Bennet-style hover images
    const bennetImages = [];
    for (let i = 0; i < 4; i++) {
        const img = document.createElement('div');
        img.className = `bennet-hover-img bennet-hover-img-${i + 1}`;
        document.body.appendChild(img);
        bennetImages.push(img);
    }
    console.log('✅ Created 4 Bennet-style images');
    
    // Bennet-style positions (closer to cursor, more dynamic)
    const bennetPositions = [
        { x: -120, y: -80, rotation: -12 },   // Top-left
        { x: 80, y: -60, rotation: 8 },      // Top-right  
        { x: -100, y: 90, rotation: -6 },    // Bottom-left
        { x: 100, y: 70, rotation: 10 }      // Bottom-right
    ];
    
    // Find MyDayOne logo
    const mydayoneElements = [];
    
    // Find by image alt
    document.querySelectorAll('img').forEach(img => {
        const alt = (img.alt || '').toLowerCase();
        if (alt.includes('mydayone') || alt.includes('my day')) {
            mydayoneElements.push(img);
            console.log('✅ Found MyDayOne logo:', img);
        }
    });
    
    // Find by href
    document.querySelectorAll('a[href="/"]').forEach(link => {
        mydayoneElements.push(link);
        console.log('✅ Found MyDayOne link:', link);
    });
    
    console.log(`🎯 Found ${mydayoneElements.length} MyDayOne elements`);
    
    // Bennet-style animation functions
    function showBennetImages(event) {
        console.log('🎨 BENNET-STYLE HOVER ACTIVATED!');
        
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        
        bennetImages.forEach((img, index) => {
            const pos = bennetPositions[index];
            
            // Position image
            img.style.left = (mouseX + pos.x) + 'px';
            img.style.top = (mouseY + pos.y) + 'px';
            
            // Bennet-style entrance animation
            gsap.fromTo(img, {
                opacity: 0,
                scale: 0.3,
                rotation: pos.rotation + (Math.random() * 20 - 10),
                x: Math.random() * 40 - 20,
                y: Math.random() * 40 - 20
            }, {
                duration: 0.8 + (index * 0.15),
                opacity: 1,
                scale: 1,
                rotation: pos.rotation,
                x: 0,
                y: 0,
                ease: "elastic.out(1, 0.8)",
                delay: index * 0.1
            });
            
            // Add jiggle animation (Bennet-style)
            gsap.to(img, {
                duration: 2 + Math.random(),
                rotation: pos.rotation + (Math.random() * 6 - 3),
                x: Math.random() * 8 - 4,
                y: Math.random() * 8 - 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 1 + (index * 0.2)
            });
        });
    }
    
    function moveBennetImages(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        
        bennetImages.forEach((img, index) => {
            const pos = bennetPositions[index];
            
            // Smooth following with slight lag (Bennet-style)
            gsap.to(img, {
                duration: 0.6 + (index * 0.1),
                left: (mouseX + pos.x) + 'px',
                top: (mouseY + pos.y) + 'px',
                ease: "power2.out"
            });
        });
    }
    
    function hideBennetImages() {
        console.log('🎨 BENNET-STYLE HOVER ENDED!');
        
        bennetImages.forEach((img, index) => {
            // Stop jiggle animations
            gsap.killTweensOf(img);
            
            // Bennet-style exit animation
            gsap.to(img, {
                duration: 0.5,
                opacity: 0,
                scale: 0.2,
                rotation: bennetPositions[index].rotation + (Math.random() * 60 - 30),
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                ease: "power2.in",
                delay: index * 0.08
            });
        });
    }
    
    // Apply Bennet-style hover to MyDayOne elements
    mydayoneElements.forEach((element) => {
        // Add Bennet-style visual indicator
        element.classList.add('mydayone-bennet-active');
        
        // Add event listeners
        element.addEventListener('mouseenter', showBennetImages);
        element.addEventListener('mousemove', moveBennetImages);
        element.addEventListener('mouseleave', hideBennetImages);
        
        console.log('✅ Added Bennet-style hover to element');
    });
    
    console.log('🎉 BENNET-STYLE HOVER EFFECT READY!');
    console.log('🔥 Hover over the RED-OUTLINED MyDayOne logo!');
    
    // Success notification
    setTimeout(() => {
        alert('🔥 Bennet-style hover effect activated!\n\nLook for RED OUTLINE around MyDayOne logo and hover over it to see 4 images animate like the Bennet website!');
    }, 1000);
};

gsapScript.onerror = function() {
    console.error('❌ Failed to load GSAP');
    alert('❌ Animation library failed to load');
};

document.head.appendChild(gsapScript);
