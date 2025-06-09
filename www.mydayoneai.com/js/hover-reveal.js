// Helper function to get mouse position
function getMousePos(e) {
    return {
        x: e.clientX,
        y: e.clientY
    };
}

// Hover reveal effect
class HoverReveal {
    constructor(el) {
        this.DOM = {el: el};
        this.DOM.reveal = document.createElement('div');
        this.DOM.reveal.className = 'hover-reveal';
        this.DOM.reveal.innerHTML = `<div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
        document.body.appendChild(this.DOM.reveal);
        this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
        this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');
        this.initEvents();
    }

    initEvents() {
        this.positionElement = (ev) => {
            const mousePos = getMousePos(ev);
            const docScrolls = {
                left: window.pageXOffset || document.documentElement.scrollLeft,
                top: window.pageYOffset || document.documentElement.scrollTop
            };
            gsap.to(this.DOM.reveal, {
                duration: 0.7,
                top: `${mousePos.y - (this.DOM.reveal.offsetHeight * 0.5) - docScrolls.top}px`,
                left: `${mousePos.x - (this.DOM.reveal.offsetWidth * 0.5) - docScrolls.left}px`,
                ease: "power4.out"
            });
        };

        this.mouseenterFn = (ev) => {
            this.positionElement(ev);
            this.showImage();
        };

        this.mousemoveFn = ev => requestAnimationFrame(() => {
            this.positionElement(ev);
        });

        this.mouseleaveFn = () => {
            this.hideImage();
        };
        
        this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
        this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
        this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
    }

    showImage() {
        gsap.killTweensOf(this.DOM.revealInner);
        gsap.killTweensOf(this.DOM.revealImg);

        gsap.timeline({
            onStart: () => {
                this.DOM.reveal.style.opacity = 1;
                gsap.set(this.DOM.el, {zIndex: 1000});
            }
        })
        .add('begin')
        .add(gsap.to(this.DOM.revealInner, {
            duration: 0.4,
            ease: "sine.out",
            startAt: {x: '-100%'},
            x: '0%'
        }), 'begin')
        .add(gsap.to(this.DOM.revealImg, {
            duration: 0.4,
            ease: "sine.out",
            startAt: {x: '100%'},
            x: '0%'
        }), 'begin');
    }

    hideImage() {
        gsap.killTweensOf(this.DOM.revealInner);
        gsap.killTweensOf(this.DOM.revealImg);

        gsap.timeline({
            onComplete: () => {
                gsap.set(this.DOM.el, {zIndex: ''});
                gsap.set(this.DOM.reveal, {opacity: 0});
            }
        })
        .add('begin')
        .add(gsap.to(this.DOM.revealInner, {
            duration: 0.3,
            ease: "sine.out",
            x: '100%'
        }), 'begin')
        .add(gsap.to(this.DOM.revealImg, {
            duration: 0.3,
            ease: "sine.out",
            x: '-100%'
        }), 'begin');
    }
}

// Initialize the effect when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add GSAP if not already included
    if (typeof gsap === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js';
        script.onload = initHoverEffects;
        document.head.appendChild(script);
    } else {
        initHoverEffects();
    }

    function initHoverEffects() {
        // Initialize hover effect for elements with class 'mydayhover'
        document.querySelectorAll('.mydayhover').forEach(link => new HoverReveal(link));
    }
});