window.addEventListener('load', () => {
    const preloadScreen = document.getElementById('preload-screen');
    const header = document.querySelector('.header');

    setTimeout(() => {
        preloadScreen.classList.add('fade-out');

        setTimeout(() => {
            header.style.opacity = '1';
            header.style.visibility = 'visible';
        }, 0.1); 
    }, 3000); 
});

const greetings = document.querySelectorAll('.greeting');
let currentIndex = 0;
const displayDuration = 3000; // Time each greeting is shown (in milliseconds)
const transitionDuration = 500; // Time for fade in/out (in milliseconds)

function showNextGreeting() {
     // Remove active class from current greeting
     greetings[currentIndex].classList.remove('active');
      
    // Update index
    currentIndex = (currentIndex + 1) % greetings.length;
      
    // Add active class to next greeting
    setTimeout(() => {
        greetings[currentIndex].classList.add('active');
    }, transitionDuration);
}

// Start the animation
greetings[currentIndex].classList.add('active');
setInterval(showNextGreeting, displayDuration + transitionDuration);


function navbars() {
    const nav = document.querySelector('.floating-nav');
    const hero = document.getElementById('hero');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                nav.classList.add('visible');
            } else {
                nav.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.5 // Navbar appears when 50% of hero section is visible
    });

    observer.observe(hero);
}

// site-wide cursor
const siteWide = document.querySelector('.custom-cursor.site-wide');

document.addEventListener('DOMContentLoaded', () => {
  // Show the cursor when mouse enters the document
  document.addEventListener('mouseenter', (e) => {
    siteWide.style.display = 'block';
  });

  // Hide the cursor when mouse leaves the document
  document.addEventListener('mouseleave', (e) => {
    siteWide.style.display = 'none';
  });

  // Track cursor movement
  document.addEventListener('mousemove', TrackCursor);

  // Add "active" class when mouse is pressed
  document.addEventListener('mousedown', () => siteWide.classList.add('active'));
  document.addEventListener('mouseup', () => siteWide.classList.remove('active'));
});

function TrackCursor(e) {
  const width = siteWide.clientWidth;
  const height = siteWide.clientHeight;
  siteWide.style.transform = `translate(${e.clientX - width / 2}px, ${e.clientY - height / 2}px)`;
}

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 1000);
}); 

