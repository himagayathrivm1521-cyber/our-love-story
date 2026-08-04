// ==================== FLOATING HEARTS ==================== 
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const hearts = ['❤️', '💕', '💖', '💗', '💝'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 7000);
    }, 500);
}

// ==================== FALLING PETALS ==================== 
function createFallingPetals() {
    const container = document.querySelector('.petals-container');
    const petals = ['🌹', '🌸', '🌺', '🌻', '🌷'];
    
    setInterval(() => {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 5 + 8) + 's';
        petal.style.delay = Math.random() * 2 + 's';
        
        container.appendChild(petal);
        
        setTimeout(() => petal.remove(), 12000);
    }, 800);
}

// ==================== MUSIC CONTROL ==================== 
function setupMusicControl() {
    const musicBtn = document.getElementById('musicToggle');
    const audio = document.getElementById('bgMusic');
    
    let isPlaying = false;
    
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.classList.remove('playing');
            musicBtn.textContent = '🎵 Music';
            isPlaying = false;
        } else {
            audio.play();
            musicBtn.classList.add('playing');
            musicBtn.textContent = '⏸️ Music';
            isPlaying = true;
        }
    });
}

// ==================== SMOOTH SCROLL ==================== 
function setupSmoothScroll() {
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
}

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==================== FIREWORKS EFFECT ==================== 
function createFireworks() {
    const container = document.querySelector('.fireworks-container');
    container.innerHTML = '';
    
    const colors = ['#ff1493', '#ff69b4', '#ffb6d9', '#ff6ec7', '#ff85d0'];
    const particleCount = 50;
    
    // Create multiple bursts
    for (let burst = 0; burst < 5; burst++) {
        setTimeout(() => {
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                particle.style.left = '50%';
                particle.style.top = '50%';
                particle.style.width = '8px';
                particle.style.height = '8px';
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.boxShadow = `0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`;
                
                const angle = (Math.PI * 2 * i) / particleCount;
                const velocity = 5 + Math.random() * 5;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                container.appendChild(particle);
                
                let x = 0;
                let y = 0;
                let life = 1;
                
                const animate = () => {
                    x += vx;
                    y += vy;
                    vy += 0.2; // gravity
                    life -= 0.02;
                    
                    particle.style.transform = `translate(${x}px, ${y}px)`;
                    particle.style.opacity = life;
                    
                    if (life > 0) {
                        requestAnimationFrame(animate);
                    } else {
                        particle.remove();
                    }
                };
                
                animate();
            }
        }, burst * 300);
    }
}

// ==================== HEART RAIN ANIMATION ==================== 
function createHeartRain() {
    const container = document.querySelector('.final-hearts');
    container.innerHTML = '';
    
    const heartCount = 30;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('span');
        heart.textContent = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = '2rem';
        heart.style.opacity = '0.8';
        heart.style.left = Math.random() * 100 + '%';
        
        container.appendChild(heart);
        
        const startY = -50;
        const endY = container.clientHeight;
        const duration = 2 + Math.random() * 2;
        
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                heart.style.transform = `translateY(${startY + (endY - startY) * progress}px) rotate(${progress * 360}deg)`;
                requestAnimationFrame(animate);
            } else {
                heart.remove();
            }
        };
        
        animate();
    }
}

// ==================== HANDLE YES BUTTON ==================== 
function handleYes() {
    // Create fireworks
    createFireworks();
    
    // Create heart rain
    createHeartRain();
    
    // Show final message after a short delay
    setTimeout(() => {
        const finalMessage = document.getElementById('final');
        finalMessage.classList.remove('hidden');
        
        // Continue heart rain effect
        setInterval(() => {
            if (!finalMessage.classList.contains('hidden')) {
                createHeartRain();
            }
        }, 2000);
    }, 500);
}

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== 
function setupObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = getComputedStyle(entry.target).animation;
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.memory-card, .letter-text p').forEach(el => {
        observer.observe(el);
    });
}

// ==================== PARALLAX EFFECT ==================== 
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const elements = document.querySelectorAll('.romantic-bg');
        
        elements.forEach(el => {
            el.style.transform = `translateY(${scrollY * 0.5}px)`;
        });
    });
}

// ==================== INITIALIZE ALL ==================== 
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    createFallingPetals();
    setupMusicControl();
    setupSmoothScroll();
    setupObserver();
    setupParallax();
    
    console.log('💕 Love Story Website Loaded! 💕');
});

// ==================== KEYBOARD NAVIGATION ==================== 
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        window.scrollBy(0, 100);
    } else if (e.key === 'ArrowUp') {
        window.scrollBy(0, -100);
    }
});

// ==================== EASTER EGG ==================== 
let clickCount = 0;
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('romantic-title')) {
        clickCount++;
        if (clickCount === 3) {
            alert('💕 I love you so much! Forever and always! 💕');
            clickCount = 0;
        }
    }
});
