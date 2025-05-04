// Initialize Locomotive Scroll
let scroll;

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Loader
const loader = document.querySelector('.loader');
const progressFill = document.querySelector('.progress-fill');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Update accent color to match byhuy.com style
    document.documentElement.style.setProperty('--accent-color', '#e6c0a8');
    
    // Initialize cursor immediately to ensure it's visible throughout
    initCustomCursor();
    
    // Preload animations
    initLoader();
    
    // Initialize smooth scrolling after loader completes
    setTimeout(() => {
        initLocomotiveScroll();
        initGSAP();
        initMenuToggle();
        initCounters();
        initFormAnimations();
        initSectionNumberAnimations();
        initWorkNumberAnimations();
        initParallaxImages();
        initTextSplitting();
        initSectionTransitions();
        initSmoothNavigation();
        initAboutTextAnimation(); // Add this new line
        initHoverAnimations(); // Keep this line
    }, 2000); // Wait for loader to finish
});
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main-container"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main-container" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main-container", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main-container").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

// Loader animation
function initLoader() {
    const tl = gsap.timeline();
    
    // Animate the loading text with a slight bounce
    tl.from('.loader h1', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    tl.to(progressFill, {
        width: '100%',
        duration: 1.8,
        ease: 'power2.inOut'
    });
    
    tl.to(loader, {
        y: '-100%',
        duration: 1,
        ease: 'power4.inOut',
        delay: 0.3,
        onComplete: () => {
            loader.style.display = 'none';
        }
    });
}

// Initialize Locomotive Scroll
function initLocomotiveScroll() {
    scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        multiplier: 0.8,
        lerp: 0.07, // Adjusted for smoother transitions
        // Add custom easing
        easing: function(t) {
            // easeInOutQuint from easings.net
            return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
        },
        smartphone: {
            smooth: true,
            lerp: 0.07
        },
        tablet: {
            smooth: true,
            lerp: 0.07
        }
    });
    
    // Update scroll position for ScrollTrigger
    scroll.on('scroll', ScrollTrigger.update);
    
    // Tell ScrollTrigger to use these proxy methods
    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
        scrollTop(value) {
            return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: document.querySelector('[data-scroll-container]').style.transform ? 'transform' : 'fixed'
    });
    
    // Refresh ScrollTrigger and update LocomotiveScroll
    ScrollTrigger.addEventListener('refresh', () => scroll.update());
    ScrollTrigger.refresh();
}

// Text splitting for animated typography
function initTextSplitting() {
    // Split title text for character animation
    const title = document.querySelector('.title');
    if (title) {
        const titleText = title.innerHTML;
        const words = titleText.split(' ');
        let newHTML = '';
        
        words.forEach(word => {
            newHTML += `<span class="word">${word} </span>`;
        });
        
        title.innerHTML = newHTML;
        
        // Animate each word
        gsap.from('.word', {
            opacity: 0,
            y: 50,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 2.2
        });
    }
    
    // Split section titles for character animation
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        const titleText = title.innerHTML;
        const words = titleText.split(' ');
        let newHTML = '';
        
        words.forEach(word => {
            newHTML += `<span class="title-word">${word} </span>`;
        });
        
        title.innerHTML = newHTML;
    });
}

// Update these functions in your main.js file

// Initialize GSAP animations
function initGSAP() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Header animation with blur effect
    gsap.from('header', {
        y: -100,
        opacity: 0,
        duration: 1.2,
        delay: 2,
        ease: 'power3.out'
    });
    
    // Hero section animations
    gsap.from('.hero-content', {
        opacity: 0,
        duration: 1.5,
        delay: 2,
        ease: 'power3.out'
    });
    
    // Subtitle reveal with a slight delay
    gsap.from('.subtitle', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 3,
        ease: 'power3.out'
    });
    
    // Scroll indicator fade in
    gsap.from('.scroll-indicator', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 3.5,
        ease: 'power3.out'
    });
    
    // Tech Stack section animations
    ScrollTrigger.create({
        trigger: '.tech-stack',
        scroller: '[data-scroll-container]',
        start: 'top 80%',
        onEnter: () => {
            // Animate section header
            gsap.from('.tech-stack .section-header', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
            
            // Animate each tech item with stagger
            gsap.from('.tech-item', {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 0.3
            });
        }
    });
    
    // About section reveal
    ScrollTrigger.create({
        trigger: '.about',
        scroller: '[data-scroll-container]',
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => {
            // Animate section header
            gsap.from('.about .section-header', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
            
            gsap.from('.about-text p', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 0.3
            });
        }
    });
    
    // Image reveal animation with mask effect
    ScrollTrigger.create({
        trigger: '.about-image',
        scroller: '[data-scroll-container]',
        start: 'top 80%',
        onEnter: () => {
            gsap.to('.image-reveal', {
                scale: 1,
                duration: 1.5,
                ease: 'power2.out'
            });
        }
    });
    
    // Projects section animations - IMPROVED VERSION
    ScrollTrigger.create({
        trigger: '.projects',
        scroller: '[data-scroll-container]',
        start: 'top bottom',
        end: 'bottom center',
        onEnter: () => {
            // Animate section header with a slide and reveal effect
            const headerTl = gsap.timeline();
            
            headerTl.from('.projects .section-header', {
                x: -100,
                opacity: 0,
                duration: 1,
                ease: 'back.out(1.7)'
            });
            
            // Create a staggered 3D reveal effect for project items
            const projectItems = document.querySelectorAll('.project-item');
            
            projectItems.forEach((item, index) => {
                const delay = index * 0.15;
                const direction = index % 2 === 0 ? -1 : 1;
                
                // Create a timeline for each project
                const tl = gsap.timeline({delay: delay});
                
                // Initial state - scale down and rotate slightly
                gsap.set(item, {
                    opacity: 0,
                    scale: 0.8,
                    rotationY: direction * 15,
                    transformOrigin: direction > 0 ? 'left center' : 'right center'
                });
                
                // Animate in with 3D effect
                tl.to(item, {
                    opacity: 1,
                    scale: 1,
                    rotationY: 0,
                    duration: 1.2,
                    ease: 'elastic.out(1, 0.75)'
                });
                
                // Subtle hover animation
                item.addEventListener('mouseenter', () => {
                    gsap.to(item, {
                        y: -15,
                        scale: 1.03,
                        boxShadow: '0 30px 30px rgba(0,0,0,0.2)',
                        duration: 0.5,
                        ease: 'power3.out'
                    });
                });
                
                item.addEventListener('mouseleave', () => {
                    gsap.to(item, {
                        y: 0,
                        scale: 1,
                        boxShadow: '0 0 0 rgba(0,0,0,0)',
                        duration: 0.5,
                        ease: 'power2.inOut'
                    });
                });
            });
        },
        once: false // Allow animation to replay if scrolled back into view
    });
    
    // Contact section animations
    ScrollTrigger.create({
        trigger: '.contact',
        scroller: '[data-scroll-container]',
        start: 'top 80%',
        onEnter: () => {
            // Animate section header
            gsap.from('.contact .section-header', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
            
            gsap.from('.info-item', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 0.3
            });
            
            gsap.from('.form-group', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                delay: 0.6,
                ease: 'power3.out'
            });
        }
    });
}

// Animate section numbers for byhuy.com style
function initSectionNumberAnimations() {
    const sectionNumbers = document.querySelectorAll('.section-number');
    
    sectionNumbers.forEach(number => {
        ScrollTrigger.create({
            trigger: number.closest('section'),
            scroller: '[data-scroll-container]',
            start: 'top 80%',
            onEnter: () => {
                gsap.from(number, {
                    x: -50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            }
        });
    });
}

// Animate work numbers for byhuy.com style
function initWorkNumberAnimations() {
    const projectNumbers = document.querySelectorAll('.project-number');
    
    projectNumbers.forEach(number => {
        ScrollTrigger.create({
            trigger: number.closest('.project-item'),
            scroller: '[data-scroll-container]',
            start: 'top 90%',
            onEnter: () => {
                gsap.from(number, {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power3.out'
                });
            }
        });
    });
}

// Enhanced parallax for images
function initParallaxImages() {
    // Parallax effect for hero images
    gsap.utils.toArray('.image-container').forEach(container => {
        const depth = container.dataset.scrollSpeed;
        const movement = -(depth * 150);
        
        gsap.from(container, {
            y: movement,
            opacity: 0,
            duration: 1.5,
            delay: 2.5,
            ease: 'power3.out'
        });
        
        ScrollTrigger.create({
            trigger: '.hero',
            scroller: '[data-scroll-container]',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
                const yPos = movement * self.progress;
                gsap.set(container, { y: yPos });
            }
        });
    });
    
    // Parallax for project images
    gsap.utils.toArray('.project-item').forEach(item => {
        const img = item.querySelector('.project-image');
        
        ScrollTrigger.create({
            trigger: item,
            scroller: '[data-scroll-container]',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
                const scale = 1 + (self.progress * 0.2);
                gsap.set(img, { scale: scale });
            }
        });
    });
}

// Custom cursor with enhanced interactions
function initCustomCursor() {
    document.addEventListener('mousemove', (e) => {
        // Position both elements directly at the cursor position
        // The -50% transform in CSS is causing the misalignment
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        
        cursorOutline.style.left = `${e.clientX}px`;
        cursorOutline.style.top = `${e.clientY}px`;
    });
    
    // Enhanced cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .work-item, input, textarea, .service-item');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(cursorOutline, {
                width: 70,
                height: 70,
                opacity: 0.4,
                borderColor: 'var(--accent-color)',
                backgroundColor: 'rgba(230, 192, 168, 0.1)',
                duration: 0.3
            });
            
            gsap.to(cursorDot, {
                backgroundColor: 'var(--accent-color)',
                scale: 1.5,
                duration: 0.3
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(cursorOutline, {
                width: 40,
                height: 40,
                opacity: 1,
                backgroundColor: 'transparent',
                duration: 0.3
            });
            
            gsap.to(cursorDot, {
                backgroundColor: 'var(--accent-color)',
                scale: 1,
                duration: 0.3
            });
        });
    });
    
    // Special effect for work items
    document.querySelectorAll('.work-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(cursorOutline, {
                width: 80,
                height: 80,
                mixBlendMode: 'difference',
                duration: 0.3
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(cursorOutline, {
                mixBlendMode: 'normal',
                duration: 0.3
            });
        });
    });
}

// Mobile menu toggle with enhanced animations
function initMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    let overlay;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        
        if (menuToggle.classList.contains('active')) {
            // Create overlay if it doesn't exist
            if (!document.querySelector('.menu-overlay')) {
                overlay = document.createElement('div');
                overlay.classList.add('menu-overlay');
                document.body.appendChild(overlay);
            } else {
                overlay = document.querySelector('.menu-overlay');
            }
            
            // Add active class to overlay
            setTimeout(() => {
                overlay.classList.add('active');
            }, 10);
            
            // Add mobile-active class to nav-links
            navLinks.classList.add('mobile-active');
            navLinks.style.display = 'flex';
            
            // Animate hamburger icon
            gsap.to('.bar:first-child', {
                rotate: 45,
                y: 8,
                backgroundColor: 'var(--accent-color)',
                duration: 0.4,
                ease: 'power2.inOut'
            });
            
            gsap.to('.bar:nth-child(2)', {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.inOut'
            });
            
            gsap.to('.bar:last-child', {
                rotate: -45,
                y: -8,
                backgroundColor: 'var(--accent-color)',
                duration: 0.4,
                ease: 'power2.inOut'
            });
            
            // Animate nav links
            const navItems = document.querySelectorAll('.nav-links li');
            gsap.to(navLinks, {
                opacity: 1,
                duration: 0.5,
                ease: 'power3.out'
            });
            
            gsap.to(navItems, {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.8,
                delay: 0.3,
                ease: 'power3.out'
            });
            
            // Disable body scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Get overlay
            overlay = document.querySelector('.menu-overlay');
            
            // Remove active class from overlay
            if (overlay) {
                overlay.classList.remove('active');
            }
            
            // Animate hamburger icon back
            gsap.to('.bar:first-child', {
                rotate: 0,
                y: 0,
                backgroundColor: 'var(--text-color)',
                duration: 0.4,
                ease: 'power2.inOut'
            });
            
            gsap.to('.bar:nth-child(2)', {
                opacity: 1,
                duration: 0.4,
                ease: 'power2.inOut'
            });
            
            gsap.to('.bar:last-child', {
                rotate: 0,
                y: 0,
                backgroundColor: 'var(--text-color)',
                duration: 0.4,
                ease: 'power2.inOut'
            });
            
            // Animate nav links out
            const navItems = document.querySelectorAll('.nav-links li');
            gsap.to(navItems, {
                opacity: 0,
                y: 20,
                stagger: 0.05,
                duration: 0.5,
                ease: 'power3.in'
            });
            
            gsap.to(navLinks, {
                opacity: 0,
                duration: 0.5,
                ease: 'power3.in',
                onComplete: () => {
                    navLinks.classList.remove('mobile-active');
                    navLinks.style.display = 'none';
                    
                    // Remove overlay after animation
                    if (overlay) {
                        setTimeout(() => {
                            overlay.remove();
                        }, 500);
                    }
                }
            });
            
            // Re-enable body scroll
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (menuToggle.classList.contains('active')) {
                menuToggle.click();
            }
        });
    });
}

// Animate counters with improved animation
function initCounters() {
    ScrollTrigger.create({
        trigger: '.stats-container',
        scroller: '[data-scroll-container]',
        start: 'top 80%',
        onEnter: () => {
            const counters = document.querySelectorAll('.counter');
            const speed = 200;
            
            counters.forEach(counter => {
                // Set data-target attribute for counters if not already set
                if (!counter.getAttribute('data-target')) {
                    if (counter.textContent.trim() === '0') {
                        // Assign random values between 50-150 for demo purposes
                        const randomValue = Math.floor(Math.random() * 100) + 50;
                        counter.setAttribute('data-target', randomValue);
                    } else {
                        counter.setAttribute('data-target', counter.textContent);
                    }
                }
                
                const target = +counter.getAttribute('data-target');
                const inc = target / speed;
                let count = 0;
                
                const updateCount = () => {
                    if (count < target) {
                        count += inc;
                        counter.innerText = Math.floor(count);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCount();
            });
        },
        once: true
    });
}

// Form animations with enhanced effects
function initFormAnimations() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input.nextElementSibling, {
                width: '100%',
                duration: 0.5,
                ease: 'power2.inOut'
            });
            
            // Animate the label
            const label = input.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                gsap.to(label, {
                    y: -5,
                    color: 'var(--accent-color)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                gsap.to(input.nextElementSibling, {
                    width: '0%',
                    duration: 0.5,
                    ease: 'power2.inOut'
                });
                
                // Reset the label
                const label = input.previousElementSibling;
                if (label && label.tagName === 'LABEL') {
                    gsap.to(label, {
                        y: 0,
                        color: 'var(--text-color)',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            }
        });
    });
    
    // Form submission with enhanced animation
    const form = document.querySelector('form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerText;
        
        // Create a loading animation
        gsap.to(submitBtn, {
            scale: 0.95,
            duration: 0.2,
            ease: 'power2.inOut',
            onComplete: () => {
                submitBtn.innerText = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    gsap.to(submitBtn, {
                        scale: 1,
                        backgroundColor: 'var(--accent-color)',
                        color: 'var(--primary-color)',
                        duration: 0.3,
                        ease: 'power2.out',
                        onComplete: () => {
                            submitBtn.innerText = 'Message Sent!';
                            
                            // Reset form
                            setTimeout(() => {
                                form.reset();
                                
                                gsap.to(submitBtn, {
                                    backgroundColor: 'transparent',
                                    color: 'var(--text-color)',
                                    duration: 0.3,
                                    ease: 'power2.inOut',
                                    onComplete: () => {
                                        submitBtn.innerText = originalText;
                                        submitBtn.disabled = false;
                                    }
                                });
                                
                                // Reset line animations
                                document.querySelectorAll('.line::after').forEach(line => {
                                    gsap.to(line, {
                                        width: '0%',
                                        duration: 0.3,
                                        ease: 'power2.inOut'
                                    });
                                });
                                
                                // Reset labels
                                document.querySelectorAll('label').forEach(label => {
                                    gsap.to(label, {
                                        y: 0,
                                        color: 'var(--text-color)',
                                        duration: 0.3,
                                        ease: 'power2.out'
                                    });
                                });
                            }, 2000);
                        }
                    });
                }, 1500);
            }
        });
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    if (scroll) {
        scroll.update();
    }
});

function initHoverAnimations() {
  // 1. Skill items hover effect with 3D rotation
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach(item => {
    item.addEventListener('mouseenter', (e) => {
      const rect = item.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const rotateX = (mouseY - rect.height / 2) / 10;
      const rotateY = (rect.width / 2 - mouseX) / 10;
      
      gsap.to(item, {
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1.05,
        boxShadow: '0 10px 30px rgba(252, 180, 137, 0.2)',
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 800
      });
    });
    
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const rotateX = (mouseY - rect.height / 2) / 10;
      const rotateY = (rect.width / 2 - mouseX) / 10;
      
      gsap.to(item, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.2,
        ease: 'power2.out'
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
        duration: 0.6,
        ease: 'power3.out'
      });
    });
  });
  
  // 2. Project items hover effect
  const projectItems = document.querySelectorAll('.project-item');
  
  projectItems.forEach(item => {
    const projectImage = item.querySelector('.project-image');
    const projectOverlay = item.querySelector('.project-overlay');
    const projectNumber = item.querySelector('.project-number');
    
    item.addEventListener('mouseenter', () => {
      gsap.to(projectImage, {
        scale: 1.1,
        duration: 0.7,
        ease: 'power2.out'
      });
      
      gsap.to(projectOverlay, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
      
      gsap.to(projectNumber, {
        y: -10,
        scale: 1.2,
        color: 'var(--accent-color)',
        textShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        duration: 0.4,
        ease: 'back.out(1.7)'
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(projectImage, {
        scale: 1,
        duration: 0.7,
        ease: 'power2.inOut'
      });
      
      gsap.to(projectOverlay, {
        opacity: 0,
        y: '20%',
        duration: 0.5,
        ease: 'power3.inOut'
      });
      
      gsap.to(projectNumber, {
        y: 0,
        scale: 1,
        color: 'var(--accent-color)',
        textShadow: 'none',
        duration: 0.4,
        ease: 'power2.inOut'
      });
    });
  });
  
  // 3. Paragraph text hover effect
  const paragraphs = document.querySelectorAll('.subtitle');
  
  paragraphs.forEach(paragraph => {
    paragraph.addEventListener('mouseenter', () => {
      gsap.to(paragraph, {
        color: '#ffffff',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    paragraph.addEventListener('mouseleave', () => {
      gsap.to(paragraph, {
        color: 'var(--text-color-muted)',
        duration: 0.5,
        ease: 'power2.inOut'
      });
    });
  });
  
  // 4. Social links hover effect
  const socialLinks = document.querySelectorAll('.social-link');
  
  socialLinks.forEach(link => {
    const icon = link.querySelector('i');
    
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        backgroundColor: 'var(--accent-color)',
        y: -5,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
      
      gsap.to(icon, {
        color: 'var(--primary-color)',
        scale: 1.2,
        rotation: 360,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
    
    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        y: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
      
      gsap.to(icon, {
        color: 'var(--text-color)',
        scale: 1,
        rotation: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      });
    });
  });
  
  // 5. New Submit button hover effect with pulse animation
  const submitBtn = document.querySelector('.submit-btn');
  
  if (submitBtn) {
    submitBtn.addEventListener('mouseenter', () => {
      // Create a pulsing glow effect
      gsap.to(submitBtn, {
        boxShadow: '0 0 20px var(--accent-color)',
        backgroundColor: 'var(--accent-color)',
        color: 'var(--primary-color)',
        duration: 0.5,
        ease: 'power2.out'
      });
      
      // Create a pulse animation
      const pulseTimeline = gsap.timeline({repeat: -1, yoyo: true});
      pulseTimeline.to(submitBtn, {
        boxShadow: '0 0 30px var(--accent-color)',
        duration: 0.8,
        ease: 'power1.inOut'
      });
      
      // Store the timeline on the button element to stop it later
      submitBtn._pulseTimeline = pulseTimeline;
    });
    
    submitBtn.addEventListener('mouseleave', () => {
      // Stop the pulse animation
      if (submitBtn._pulseTimeline) {
        submitBtn._pulseTimeline.kill();
        submitBtn._pulseTimeline = null;
      }
      
      gsap.to(submitBtn, {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        color: 'var(--text-color)',
        duration: 0.5,
        ease: 'power2.inOut'
      });
    });
  }
}

// Add this new function to handle smooth navigation
function initSmoothNavigation() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section id from the href
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection && scroll) {
                // Use Locomotive Scroll to smoothly scroll to the target
                scroll.scrollTo(targetSection);
            }
        });
    });
}

function initSectionTransitions() {
    // Get all sections
    const sections = document.querySelectorAll('section[data-scroll-section]');
    
    sections.forEach((section, index) => {
        // Create a timeline for each section
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                scroller: '[data-scroll-container]',
                start: 'top bottom', // Animation starts when top of section reaches bottom of viewport
                end: 'top top', // Animation ends when top of section reaches top of viewport
                scrub: 1, // Smooth scrubbing effect
            }
        });
        
        // Add animations to the timeline
        tl.fromTo(section, {
            opacity: 0.4,
            y: 100,
        }, {
            opacity: 1,
            y: 0,
            ease: "power4.out", // You can use any easing from easings.net here
            duration: 1
        });
        
        // Add a different animation for section content
        const content = section.querySelector('.container');
        if (content) {
            tl.fromTo(content, {
                opacity: 0.6,
                scale: 0.95,
            }, {
                opacity: 1,
                scale: 1,
                ease: "back.out(1.7)", // Another easing option
                duration: 1
            }, "-=0.8"); // Overlap with the previous animation
        }
    });
}

// Add this function to your main.js file
function optimizeScrollAnimations() {
    // Store all ScrollTrigger instances for cleanup
    let scrollTriggers = [];
    
    // Function to kill all existing ScrollTrigger instances
    function clearScrollTriggers() {
        scrollTriggers.forEach(trigger => trigger.kill());
        scrollTriggers = [];
    }
    
    // Function to create optimized ScrollTrigger with proper tracking
    function createOptimizedTrigger(config) {
        const trigger = ScrollTrigger.create(config);
        scrollTriggers.push(trigger);
        return trigger;
    }
    
    // Update the initGSAP function to use optimized triggers
    window.initGSAP = function() {
        // Clear any existing triggers first
        clearScrollTriggers();
        
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        // Header animation with blur effect
        gsap.from('header', {
            y: -100,
            opacity: 0,
            duration: 1.2,
            delay: 2,
            ease: 'power3.out'
        });
        
        // Hero section animations
        gsap.from('.hero-content', {
            opacity: 0,
            duration: 1.5,
            delay: 2,
            ease: 'power3.out'
        });
        
        // Subtitle reveal with a slight delay
        gsap.from('.subtitle', {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 3,
            ease: 'power3.out'
        });
        
        // Scroll indicator fade in
        gsap.from('.scroll-indicator', {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 3.5,
            ease: 'power3.out'
        });
        
        // Tech Stack section animations
        createOptimizedTrigger({
            trigger: '.tech-stack',
            scroller: '[data-scroll-container]',
            start: 'top 80%',
            onEnter: () => {
                // Animate section header
                gsap.from('.tech-stack .section-header', {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                });
                
                // Animate each tech item with stagger
                gsap.from('.tech-item', {
                    y: 100,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    delay: 0.3
                });
            },
            // Add this to prevent multiple triggers
            once: true
        });
        
        // About section reveal
        createOptimizedTrigger({
            trigger: '.about',
            scroller: '[data-scroll-container]',
            start: 'top bottom',
            end: 'bottom top',
            onEnter: () => {
                // Animate section header
                gsap.from('.about .section-header', {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                });
                
                gsap.from('.about-text p', {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    delay: 0.3
                });
            },
            // Add this to prevent multiple triggers
            once: true
        });
        
        // Projects section animations
        createOptimizedTrigger({
            trigger: '.projects',
            scroller: '[data-scroll-container]',
            start: 'top bottom',
            end: 'bottom center',
            onEnter: () => {
                // Animate section header
                gsap.from('.projects .section-header', {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                });
                
                // Animate project items with stagger
                gsap.from('.project-item', {
                    y: 100,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    delay: 0.3
                });
            },
            // Add this to prevent multiple triggers
            once: true
        });
        
        // Contact section animations
        createOptimizedTrigger({
            trigger: '.contact',
            scroller: '[data-scroll-container]',
            start: 'top 80%',
            onEnter: () => {
                // Animate section header
                gsap.from('.contact .section-header', {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                });
                
                gsap.from('.info-item', {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    delay: 0.3
                });
                
                gsap.from('.form-group', {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    delay: 0.6,
                    ease: 'power3.out'
                });
            },
            // Add this to prevent multiple triggers
            once: true
        });
    };
    
    // Update the initParallaxImages function
    window.initParallaxImages = function() {
        // Parallax effect for hero images
        gsap.utils.toArray('.image-container').forEach(container => {
            const depth = container.dataset.scrollSpeed;
            const movement = -(depth * 150);
            
            gsap.from(container, {
                y: movement,
                opacity: 0,
                duration: 1.5,
                delay: 2.5,
                ease: 'power3.out'
            });
            
            createOptimizedTrigger({
                trigger: '.hero',
                scroller: '[data-scroll-container]',
                start: 'top top',
                end: 'bottom top',
                scrub: 1, // Smoother scrubbing with a slight delay
                onUpdate: (self) => {
                    const yPos = movement * self.progress;
                    gsap.set(container, { y: yPos });
                }
            });
        });
        
        // Parallax for project images
        gsap.utils.toArray('.project-item').forEach(item => {
            const img = item.querySelector('.project-image');
            
            createOptimizedTrigger({
                trigger: item,
                scroller: '[data-scroll-container]',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1, // Smoother scrubbing with a slight delay
                onUpdate: (self) => {
                    const scale = 1 + (self.progress * 0.2);
                    gsap.set(img, { scale: scale });
                }
            });
        });
    };
    
    // Add event listener for scroll direction change
    let lastScrollTop = 0;
    document.querySelector('[data-scroll-container]').addEventListener('scroll', function() {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (Math.abs(lastScrollTop - st) > 200) { // Only update on significant scroll
            lastScrollTop = st;
            // Update ScrollTrigger to prevent animation glitches
            ScrollTrigger.update();
        }
    }, { passive: true });
    
    // Handle resize events
    window.addEventListener('resize', debounce(() => {
        // Kill all triggers and reinitialize on resize
        clearScrollTriggers();
        ScrollTrigger.refresh();
        initGSAP();
        initParallaxImages();
    }, 250));
    
    // Debounce function to limit frequent calls
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
    
    // Initialize the optimized animations
    return {
        init: function() {
            clearScrollTriggers();
            window.initGSAP();
            window.initParallaxImages();
        }
    };
}
function initAboutTextAnimation() {
    // Get the paragraphs in the about section
    const aboutParagraphs = document.querySelectorAll('.about-text p');
    
    // Process each paragraph
    aboutParagraphs.forEach(paragraph => {
        // Get the text content
        const text = paragraph.textContent;
        // Split the text into individual characters with spans
        let newHTML = '';
        
        // Create a span for each character
        for (let i = 0; i < text.length; i++) {
            if (text[i] === ' ') {
                newHTML += ' ';
            } else {
                newHTML += `<span class="char">${text[i]}</span>`;
            }
        }
        
        // Replace the paragraph content with the spans
        paragraph.innerHTML = newHTML;
        
        // Create a scroll trigger for this paragraph
        ScrollTrigger.create({
            trigger: paragraph,
            scroller: '[data-scroll-container]',
            start: 'top 80%', // Start when the top of the paragraph is 80% from the top of the viewport
            end: 'bottom 20%', // End when the bottom of the paragraph is 20% from the top of the viewport
            onUpdate: (self) => {
                // Get all character spans in this paragraph
                const chars = paragraph.querySelectorAll('.char');
                
                // Calculate how many characters to highlight based on scroll progress
                const totalChars = chars.length;
                const charsToHighlight = Math.floor(self.progress * totalChars);
                
                // Apply highlighting to characters
                chars.forEach((char, index) => {
                    if (index < charsToHighlight) {
                        // Highlight this character
                        gsap.to(char, {
                            color: 'var(--accent-color)',
                            fontWeight: '600',
                            duration: 0.2,
                            ease: 'power1.out'
                        });
                    } else {
                        // Reset this character
                        gsap.to(char, {
                            color: 'var(--text-color-muted)',
                            fontWeight: '400',
                            duration: 0.2,
                            ease: 'power1.out'
                        });
                    }
                });
            }
        });
    });
}