// =============================================================================
// Modules: Example
// =============================================================================
// Creates subtle background on large screens

// Import dependencies
// =============================================================================
import { module as es6Module } from 'modujs';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends es6Module {

  // Set initial values
  // =========================================================================
  constructor(m) {
    super(m);
  }

  // Init module
  // =========================================================================
  init() {

    // Create particle effect
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 80;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'c-particle';

        // Random size (small)
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Initial position
        resetParticle(particle);

        particlesContainer.appendChild(particle);

        // Animate
        animateParticle(particle);
    }

    function resetParticle(particle) {
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;

        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = '0';

        return {
            x: posX,
            y: posY
        };
    }

    function animateParticle(particle) {
        // Initial position
        const pos = resetParticle(particle);

        // Random animation properties
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;

        // Animate with GSAP-like timing
        setTimeout(() => {
            particle.style.transition = `all ${duration}s linear`;
            particle.style.opacity = Math.random() * 0.3 + 0.1;

            // Move in a slight direction
            const moveX = pos.x + (Math.random() * 20 - 10);
            const moveY = pos.y - Math.random() * 30; // Move upwards

            particle.style.left = `${moveX}%`;
            particle.style.top = `${moveY}%`;

            // Reset after animation completes
            setTimeout(() => {
                animateParticle(particle);
            }, duration * 1000);
        }, delay * 1000);
    }

    // Mouse interaction
    document.addEventListener('mousemove', (e) => {
        // Create particles at mouse position
        const mouseX = (e.clientX / window.innerWidth) * 100;
        const mouseY = (e.clientY / window.innerHeight) * 100;

        // Create temporary particle
        const particle = document.createElement('div');
        particle.className = 'c-particle';

        // Small size
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Position at mouse
        particle.style.left = `${mouseX}%`;
        particle.style.top = `${mouseY}%`;
        particle.style.opacity = '0.6';

        particlesContainer.appendChild(particle);

        // Animate outward
        setTimeout(() => {
            particle.style.transition = 'all 2s ease-out';
            particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
            particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
            particle.style.opacity = '0';

            // Remove after animation
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }, 10);

        // Subtle movement of gradient spheres
        const spheres = document.querySelectorAll('.c-gradient-sphere');
        const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 5;

        spheres.forEach(sphere => {
            const currentTransform = getComputedStyle(sphere).transform;
            sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
  }

  // Destroy
  // =========================================================================
  destroy() {}
}
