// Global variables
let musicPlaying = false;
let audioContext = null;
let oscillator = null;
let gainNode = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainContent = document.getElementById('mainContent');
        
        loadingScreen.classList.add('hidden');
        mainContent.classList.add('visible');
        
        // Start floating hearts animation
        createFloatingHearts();
        
        // Initialize audio context
        initAudio();
    }, 2000);
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe timeline items and memory cards
    document.querySelectorAll('.timeline-item, .memory-card').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Create floating hearts
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const heartSymbols = ['💕', '💖', '💗', '💓', '💝', '💘', '💞'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 2000);
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle "Yes" button click
function handleYes() {
    // Play celebration sound
    playSound(523.25, 0.1); // C5
    setTimeout(() => playSound(659.25, 0.1), 100); // E5
    setTimeout(() => playSound(783.99, 0.2), 200); // G5
    
    // Create explosion of hearts
    // createHeartExplosion();
    
    // Show celebration section
    setTimeout(() => {
        document.getElementById('proposal').style.display = 'none';
        document.getElementById('celebration').style.display = 'flex';
        document.getElementById('celebration').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Create more hearts during celebration
        createCelebrationHearts();
    }, 500);
}

// Handle "No" button click
function handleNo() {
    const noButton = document.querySelector('.no-button');
    const messages = [
        'Are you sure? 💕',
        'Think again! 💖',
        'Pretty please? 💗',
        'I\'ll be sad! 🥺',
        'Last chance! 💝',
    ];
    
    // Play sad sound
    playSound(261.63, 0.2); // C4
    
    // Change button text
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    noButton.textContent = randomMessage;
    
    // Add shake animation (button stays in place)
    noButton.style.animation = 'shake 0.5s';
    setTimeout(() => {
        noButton.style.animation = '';
    }, 500);
}

// Create heart explosion effect
function createHeartExplosion() {
    const colors = ['#ff6b9d', '#ff8e9e', '#ffa5b5', '#ffb8c5'];
    const heartsContainer = document.querySelector('.hearts-container');
    
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💕';
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        
        const angle = (Math.PI * 2 * i) / 50;
        const velocity = Math.random() * 300 + 200;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(heart);
        
        let x = 0;
        let y = 0;
        let opacity = 1;
        
        const animate = () => {
            x += vx * 0.02;
            y += vy * 0.02;
            opacity -= 0.02;
            
            heart.style.transform = `translate(${x}px, ${y}px)`;
            heart.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                heart.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Create celebration hearts
function createCelebrationHearts() {
    const celebrationSection = document.getElementById('celebration');
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = '💕';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '0';
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        heart.style.animation = 'floatUp 3s ease-out forwards';
        heart.style.pointerEvents = 'none';
        
        celebrationSection.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }, 500);
}

// Initialize audio context
function initAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.log('Web Audio API not supported');
    }
}

// Play a simple sound
function playSound(frequency, duration) {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// Toggle background music
function toggleMusic() {
    const musicToggle = document.getElementById('musicToggle');
    
    if (!audioContext) {
        initAudio();
    }
    
    if (musicPlaying) {
        // Stop music
        if (oscillator) {
            oscillator.stop();
            oscillator = null;
        }
        musicToggle.textContent = '🎵';
        musicPlaying = false;
    } else {
        // Start simple background music
        const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
        let noteIndex = 0;
        
        function playNextNote() {
            if (!musicPlaying) return;
            
            playSound(notes[noteIndex], 0.3);
            noteIndex = (noteIndex + 1) % notes.length;
            
            setTimeout(playNextNote, 400);
        }
        
        musicPlaying = true;
        musicToggle.textContent = '🔇';
        playNextNote();
    }
}

// Add CSS animation for shake effect
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Reset no button position
        const noButton = document.querySelector('.no-button');
        noButton.style.position = 'static';
        noButton.style.left = '';
        noButton.style.top = '';
        noButton.style.zIndex = '';
        noButton.textContent = 'Hmm...';
    }
});

// Add touch support for mobile - disabled to prevent unwanted scrolling
// let touchStartY = 0;
// document.addEventListener('touchstart', function(e) {
//     touchStartY = e.touches[0].clientY;
// });

// document.addEventListener('touchend', function(e) {
//     const touchEndY = e.changedTouches[0].clientY;
//     const diff = touchStartY - touchEndY;
    
//     if (Math.abs(diff) > 50) {
//         // Swipe detected
//         const sections = document.querySelectorAll('section');
//         const currentSection = Array.from(sections).find(section => {
//             const rect = section.getBoundingClientRect();
//             return rect.top >= 0 && rect.top < window.innerHeight / 2;
//         });
        
//         if (currentSection) {
//             const currentIndex = Array.from(sections).indexOf(currentSection);
            
//             if (diff > 0 && currentIndex < sections.length - 1) {
//                 // Swipe up - go to next section
//                 sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
//             } else if (diff < 0 && currentIndex > 0) {
//                 // Swipe down - go to previous section
//                 sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
//             }
//         }
//     }
// });

// Add parallax effect on mouse move
document.addEventListener('mousemove', function(e) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const hearts = document.querySelectorAll('.floating-heart');
    hearts.forEach((heart, index) => {
        const speed = (index % 3 + 1) * 0.5;
        const xOffset = (x - 0.5) * speed * 20;
        const yOffset = (y - 0.5) * speed * 20;
        
        heart.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});
