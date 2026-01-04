document.addEventListener("DOMContentLoaded", () => {
  // Reveal animations on scroll
  const observerOptions = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        // Special handling for the hero text which has 'span.line' children
        if (entry.target.querySelector(".anim-text")) {
          const lines = entry.target.querySelectorAll(".line");
          lines.forEach((line) => line.classList.add("active"));
        }
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach((el) => observer.observe(el));

  // Also observe the hero text lines wrapper manually if needed,
  // but in HTML structure .anim-text children usually start active if in viewport.
  // Let's trigger hero animation on load
  setTimeout(() => {
    const heroLines = document.querySelectorAll(".anim-text .line");
    heroLines.forEach((line) => line.classList.add("active"));
  }, 500);

  // Dynamic Particles
  createParticles();
});

function createParticles() {
  const container = document.getElementById("particles-js");
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    createParticle(container);
  }
}

function createParticle(container) {
  const particle = document.createElement("div");
  const isHeart = Math.random() > 0.6; // 40% chance of being a heart

  if (isHeart) {
    particle.classList.add("heart-particle");
    particle.innerHTML = "❤";
    particle.style.fontSize = `${Math.random() * 20 + 10}px`;
    particle.style.color =
      Math.random() > 0.5 ? "var(--color-pink)" : "var(--color-gold)";
  } else {
    particle.classList.add("particle");
    const size = Math.random() * 4 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = "rgba(255, 255, 255, 0.5)";
  }

  // Random position
  particle.style.left = `${Math.random() * 100}vw`;
  particle.style.top = `${Math.random() * 100}vh`;

  // Random opacity
  particle.style.opacity = Math.random() * 0.3 + 0.1;

  // Animation
  const duration = Math.random() * 15 + 10; // Slower, more dreamy
  particle.style.transition = `top ${duration}s linear, opacity ${
    duration / 2
  }s ease-in-out`;

  container.appendChild(particle);

  // Animate
  setTimeout(() => {
    animateParticle(particle);
  }, 100);
}

function animateParticle(particle) {
  // Move up
  particle.style.top = "-10px";

  // Reset after animation
  particle.addEventListener(
    "transitionend",
    () => {
      particle.style.transition = "none";
      particle.style.top = "105vh"; // Reset to bottom
      particle.style.left = `${Math.random() * 100}vw`;

      // Force reflow
      void particle.offsetWidth;

      // Start rising again
      const duration = Math.random() * 10 + 5;
      particle.style.transition = `top ${duration}s linear`;
      setTimeout(() => {
        particle.style.top = "-10px";
      }, 100);
    },
    { once: true }
  );
}

// Proposal Interactions
document.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.querySelector(".love-btn.no");
  const yesBtn = document.querySelector(".love-btn.yes");
  const popup = document.getElementById("lovePopup");
  const closeBtn = document.querySelector(".close-popup");

  if (noBtn && yesBtn) {
    // "No" button evasion
    const moveButton = (e) => {
      const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
      const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

      noBtn.style.position = "absolute";
      noBtn.style.left = `${x}px`;
      noBtn.style.top = `${y}px`;
    };

    noBtn.addEventListener("mouseenter", moveButton);
    noBtn.addEventListener("touchstart", moveButton); // For mobile

    // "Yes" button celebration
    yesBtn.addEventListener("click", () => {
      popup.classList.remove("hidden");
      popup.classList.add("show");
      createConfetti();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      popup.classList.remove("show");
      setTimeout(() => popup.classList.add("hidden"), 500);
    });
  }
});

function createConfetti() {
  const colors = [
    "#f00",
    "#0f0",
    "#00f",
    "#ff0",
    "#0ff",
    "#f0f",
    "gold",
    "pink",
  ];

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = Math.random() * 2 + 3 + "s";

    document.body.appendChild(confetti);

    // Cleanup
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

// Background Music Control
document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bgMusic");

  // Set volume
  bgMusic.volume = 0.5;

  // Attempt autoplay immediately
  const playPromise = bgMusic.play();

  if (playPromise !== undefined) {
    playPromise
      .then((_) => {
        // Autoplay started!
        console.log("Autoplay started successfully");
      })
      .catch((error) => {
        // Autoplay was prevented.
        console.log("Autoplay prevented. Waiting for interaction.");

        const startAudio = () => {
          bgMusic.play();
          // Remove listeners once connected
          document.removeEventListener("click", startAudio);
          document.removeEventListener("touchstart", startAudio);
          document.removeEventListener("scroll", startAudio);
        };

        // Add listener to the whole document to start music on ANY interaction
        document.addEventListener("click", startAudio);
        document.addEventListener("touchstart", startAudio);
        document.addEventListener("scroll", startAudio);
      });
  }
});
