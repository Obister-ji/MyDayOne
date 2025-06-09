'use client'

import { useEffect } from 'react'

export default function HoverEffect() {
  useEffect(() => {
    // Load GSAP
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'
    script.onload = () => {
      console.log('✅ GSAP loaded in React component')
      initHoverEffect()
    }
    document.head.appendChild(script)

    return () => {
      // Cleanup
      document.querySelectorAll('.mydayone-hover-img').forEach(el => el.remove())
      const gsapScript = document.querySelector('script[src*="gsap"]')
      if (gsapScript) {
        document.head.removeChild(gsapScript)
      }
    }
  }, [])

  const initHoverEffect = () => {
    console.log('🚀 Initializing hover effect in React...')

    // Create CSS
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
    `

    let styleEl = document.getElementById('mydayone-hover-styles')
    if (styleEl) styleEl.remove()

    styleEl = document.createElement('style')
    styleEl.id = 'mydayone-hover-styles'
    styleEl.textContent = css
    document.head.appendChild(styleEl)

    // Create 4 hover images
    const images: HTMLElement[] = []
    for (let i = 0; i < 4; i++) {
      const img = document.createElement('div')
      img.className = `mydayone-hover-img mydayone-hover-img-${i + 1}`
      document.body.appendChild(img)
      images.push(img)
    }
    console.log('✅ Created 4 hover images')

    // Find logo elements
    const findLogoElements = () => {
      const elements: Element[] = []
      
      // Find by class name
      document.querySelectorAll('.logo').forEach(el => {
        elements.push(el)
        console.log('✅ Found logo by class:', el)
      })
      
      // Find by text content
      document.querySelectorAll('*').forEach(el => {
        const text = (el.textContent || '').toLowerCase()
        if (text.includes('mydayone') && el.children.length === 0) {
          if (!elements.includes(el)) {
            elements.push(el)
            console.log('✅ Found logo by text:', el)
          }
        }
      })
      
      // Find by href
      document.querySelectorAll('a[href="/"]').forEach(link => {
        if (!elements.includes(link)) {
          elements.push(link)
          console.log('✅ Found logo by href:', link)
        }
      })
      
      return elements
    }

    // Positions for scattered effect
    const positions = [
      { x: -200, y: -100 },
      { x: 150, y: -80 },
      { x: -180, y: 120 },
      { x: 180, y: 100 }
    ]

    // Add hover effect
    const addHoverEffect = () => {
      const logoElements = findLogoElements()
      console.log(`🎯 Found ${logoElements.length} logo elements`)
      
      logoElements.forEach((element) => {
        // Add visual indicator
        element.classList.add('mydayone-active')
        console.log('✅ Added hover effect to:', element)
        
        const handleMouseEnter = (e: MouseEvent) => {
          console.log('🎨 HOVER DETECTED in React!')
          
          images.forEach((img, i) => {
            const pos = positions[i]
            img.style.left = (e.clientX + pos.x) + 'px'
            img.style.top = (e.clientY + pos.y) + 'px'
            
            if ((window as any).gsap) {
              (window as any).gsap.fromTo(img, {
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
              })
            } else {
              img.style.opacity = '1'
            }
          })
        }

        const handleMouseMove = (e: MouseEvent) => {
          images.forEach((img, i) => {
            const pos = positions[i]
            if ((window as any).gsap) {
              (window as any).gsap.to(img, {
                duration: 0.3,
                left: (e.clientX + pos.x) + 'px',
                top: (e.clientY + pos.y) + 'px',
                ease: "power2.out"
              })
            } else {
              img.style.left = (e.clientX + pos.x) + 'px'
              img.style.top = (e.clientY + pos.y) + 'px'
            }
          })
        }

        const handleMouseLeave = () => {
          console.log('🎨 HOVER LEFT in React!')
          
          images.forEach((img, i) => {
            if ((window as any).gsap) {
              (window as any).gsap.to(img, {
                duration: 0.4,
                opacity: 0,
                scale: 0.3,
                rotation: (i - 2) * 30,
                ease: "power2.in",
                delay: i * 0.05
              })
            } else {
              img.style.opacity = '0'
            }
          })
        }

        element.addEventListener('mouseenter', handleMouseEnter as EventListener)
        element.addEventListener('mousemove', handleMouseMove as EventListener)
        element.addEventListener('mouseleave', handleMouseLeave as EventListener)
      })
    }

    // Try to add hover effect multiple times (React might not be ready)
    addHoverEffect()
    setTimeout(addHoverEffect, 1000)
    setTimeout(addHoverEffect, 2000)
    
    console.log('🎉 React hover effect setup complete!')
  }

  return null // This component doesn't render anything visible
}
