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

document.addEventListener('DOMContentLoaded', () => {
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
});
  