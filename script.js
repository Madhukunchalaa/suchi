document.addEventListener("DOMContentLoaded", () => {
    // 1. Particle System
    createParticles();

    // 2. Scroll Animations
    setupScrollAnimations();

    // 3. Proposal Logic
    setupProposalInteractions();

    // 4. Music Logic
    setupMusicPlayer();
});

function setupMusicPlayer() {
    const musicBtn = document.getElementById("musicBtn");
    const bgMusic = document.getElementById("bgMusic");

    if (!musicBtn || !bgMusic) {
        console.error("Music elements not found!");
        return;
    }

    // Set volume
    bgMusic.volume = 0.5;

    musicBtn.addEventListener("click", () => {
        if (bgMusic.paused) {
            const playPromise = bgMusic.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        musicBtn.textContent = "⏸️";
                        musicBtn.classList.add("playing");
                        musicBtn.title = "Pause Music";
                    })
                    .catch((error) => {
                        console.error("Playback failed:", error);
                        alert("Music couldn't play. Error: " + error.message);
                    });
            }
        } else {
            bgMusic.pause();
            musicBtn.textContent = "🎵";
            musicBtn.classList.remove("playing");
            musicBtn.title = "Play Music";
        }
    });

    // Handle song ending
    bgMusic.addEventListener('ended', () => {
        bgMusic.currentTime = 0;
        bgMusic.play();
    });
}

function setupScrollAnimations() {
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                if (entry.target.querySelector(".anim-text")) {
                    entry.target.querySelectorAll(".line").forEach((line) => line.classList.add("active"));
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    // Initial hero animation
    setTimeout(() => {
        document.querySelectorAll(".anim-text .line").forEach((line) => line.classList.add("active"));
    }, 500);
}

function createParticles() {
    const container = document.getElementById("particles-js");
    if(!container) return;
    
    for (let i = 0; i < 20; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement("div");
    const isHeart = Math.random() > 0.6;

    if (isHeart) {
        particle.classList.add("heart-particle");
        particle.innerHTML = "❤";
        particle.style.fontSize = `${Math.random() * 20 + 10}px`;
        particle.style.color = Math.random() > 0.5 ? "var(--color-pink)" : "var(--color-gold)";
    } else {
        particle.classList.add("particle");
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = "rgba(255, 255, 255, 0.5)";
    }

    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.opacity = Math.random() * 0.3 + 0.1;

    const duration = Math.random() * 15 + 10;
    particle.style.transition = `top ${duration}s linear, opacity ${duration / 2}s ease-in-out`;

    container.appendChild(particle);

    setTimeout(() => animateParticle(particle), 100);
}

function animateParticle(particle) {
    particle.style.top = "-10px";
    particle.addEventListener("transitionend", () => {
        particle.style.transition = "none";
        particle.style.top = "105vh";
        particle.style.left = `${Math.random() * 100}vw`;
        void particle.offsetWidth;
        const duration = Math.random() * 10 + 5;
        particle.style.transition = `top ${duration}s linear`;
        setTimeout(() => { particle.style.top = "-10px"; }, 100);
    }, { once: true });
}

function setupProposalInteractions() {
    const noBtn = document.querySelector(".love-btn.no");
    const yesBtn = document.querySelector(".love-btn.yes");
    const popup = document.getElementById("lovePopup");
    const closeBtn = document.querySelector(".close-popup");

    if (noBtn) {
        const moveButton = () => {
            const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
            const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
            noBtn.style.position = "absolute";
            noBtn.style.left = `${x}px`;
            noBtn.style.top = `${y}px`;
        };
        noBtn.addEventListener("mouseenter", moveButton);
        noBtn.addEventListener("touchstart", moveButton);
    }

    if (yesBtn && popup) {
        yesBtn.addEventListener("click", () => {
            popup.classList.remove("hidden");
            popup.classList.add("show");
            createConfetti();
        });
    }

    if (closeBtn && popup) {
        closeBtn.addEventListener("click", () => {
            popup.classList.remove("show");
            setTimeout(() => popup.classList.add("hidden"), 500);
        });
    }
}

function createConfetti() {
    const colors = ["#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f", "gold", "pink"];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = Math.random() * 2 + 3 + "s";
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}
