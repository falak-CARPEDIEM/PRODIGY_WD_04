// THEME TOGGLE
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

function setTheme(theme) {
  if (theme === "light") {
    body.classList.add("light-theme");
    if (themeToggle) themeToggle.textContent = "☀️";
  } else {
    body.classList.remove("light-theme");
    if (themeToggle) themeToggle.textContent = "🌙";
  }
  localStorage.setItem("portfolio-theme", theme);
}
// small helper to open demo safely
function openDemoInNewTab(url) {
  window.open(url, "_blank", "noopener");
}

// initial theme from localStorage
const savedTheme = localStorage.getItem("portfolio-theme");
setTheme(savedTheme === "light" ? "light" : "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = body.classList.contains("light-theme");
    setTheme(isLight ? "dark" : "light");
  });
}

// MOBILE MENU
const mobileMenuBtn = document.getElementById("mobile-menu");
const mobileNav = document.getElementById("mobile-nav");

if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
    });
  });
}

// ACTIVE LINK ON SCROLL
const navLinks = document.querySelectorAll(".nav-links a");

function updateActiveLink() {
  const scrollPos = window.scrollY + 120;

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    const section = document.querySelector(href);
    if (!section) return;

    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);

// NEXT SECTION BUTTON (bottom center)
const nextBtn = document.getElementById("next-section");
const allSections = Array.from(document.querySelectorAll("section"));
const headerOffset = 80; // nav ka approx height

if (nextBtn && allSections.length) {
  nextBtn.addEventListener("click", () => {
    const scrollPos = window.scrollY + headerOffset + 1;
    let currentIndex = 0;

    allSections.forEach((sec, i) => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        currentIndex = i;
      }
    });

    const nextIndex = (currentIndex + 1) % allSections.length;
    const targetY = allSections[nextIndex].offsetTop - headerOffset;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  });
}

// SCROLL REVEAL ANIMATIONS
// SCROLL REVEAL ANIMATIONS + HIDE PROFILE ON SKILLS
// SCROLL REVEAL ANIMATIONS + HIDE PROFILE ON SKILLS
const revealTargets = [];

document.addEventListener("DOMContentLoaded", () => {
  const selectors = [
    ".hero",
    ".about",
    ".skills-section",
    ".portfolio",
    ".resume",
    ".contact",
    ".stat-card",
    ".project-card",
    ".resume-item",
    ".profile-card"
  ];

  // scroll reveal
  selectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      el.classList.add("reveal");
      revealTargets.push(el);
    });
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealTargets.forEach((el) => observer.observe(el));

  // ---- HIDE PROFILE WHEN SKILLS IN VIEW ----
  const skillsSection = document.getElementById("skills");
  const profileCard = document.querySelector(".profile-card");

  if (skillsSection && profileCard) {
    const hideObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.classList.add("hide-profile");
          } else {
            document.body.classList.remove("hide-profile");
          }
        });
      },
      { threshold: 0.4 }
    );

    hideObserver.observe(skillsSection);
  }
});
