const typingText = document.getElementById("typingText");
const phrases = [
  "Full Stack Developer | B.Tech IT Student",
  "MERN Stack Enthusiast",
  "Building Scalable Web Solutions"
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];

  if (!deleting) {
    typingText.textContent = current.slice(0, charIndex + 1);
    charIndex += 1;

    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1300);
      return;
    }
  } else {
    typingText.textContent = current.slice(0, charIndex - 1);
    charIndex -= 1;

    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  const speed = deleting ? 45 : 80;
  setTimeout(typeLoop, speed);
}

typeLoop();

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeToggle.innerHTML =
    theme === "dark"
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  applyTheme(savedTheme);
}

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || "light";
  const next = current === "light" ? "dark" : "light";
  applyTheme(next);
  localStorage.setItem("theme", next);
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

const scrollTopButton = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 360) {
    scrollTopButton.classList.add("visible");
  } else {
    scrollTopButton.classList.remove("visible");
  }
});

scrollTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const formData = new FormData(contactForm);
  formData.append("_subject", "New Portfolio Contact Message");
  formData.append("_captcha", "false");
  formData.append("_template", "table");

  submitButton.disabled = true;
  formStatus.textContent = "Sending message...";

  try {
    const response = await fetch(
      "https://formsubmit.co/ajax/keerthipriya0802@gmail.com",
      {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData
      }
    );

    if (!response.ok) {
      throw new Error("Submission failed");
    }

    formStatus.textContent = "Message sent successfully.";
    contactForm.reset();
  } catch (error) {
    formStatus.textContent = "Could not send message right now. Please email directly.";
  } finally {
    submitButton.disabled = false;
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
