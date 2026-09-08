(function () {
  "use strict";

  // Hero typewriter effect
  function initTypewriter() {
    const el = document.getElementById("typewriter");
    const cursor = document.querySelector(".type-cursor");
    if (!el) return;

    const prefix = "Hi, I'm ";
    const name = "Nidhi Mishra";
    const speed = 70;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.innerHTML = prefix + '<span class="hero-name">' + name + "</span>";
      if (cursor) cursor.classList.add("is-done");
      return;
    }

    let i = 0;
    let typingName = false;

    function typeNext() {
      if (!typingName) {
        if (i < prefix.length) {
          el.textContent += prefix.charAt(i++);
          setTimeout(typeNext, speed);
        } else {
          el.innerHTML += '<span class="hero-name"></span>';
          typingName = true;
          i = 0;
          setTimeout(typeNext, speed);
        }
      } else {
        const nameSpan = el.querySelector(".hero-name");
        if (i < name.length) {
          nameSpan.textContent += name.charAt(i++);
          setTimeout(typeNext, speed + 15);
        } else if (cursor) {
          cursor.classList.add("is-done");
        }
      }
    }

    setTimeout(typeNext, 400);
  }

  initTypewriter();

  // AOS init
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 600, easing: "ease-out-cubic", once: true, offset: 60 });
  }

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => navLinks.classList.toggle("open"));

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  // Scroll-to-top button
  const scrollTop = document.querySelector(".scroll-top");

  if (scrollTop) {
    window.addEventListener("scroll", () => {
      scrollTop.classList.toggle("visible", window.scrollY > 400);
    });
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");

  function highlightNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach((a) => {
          a.style.color = a.getAttribute("href") === "#" + id ? "#60a5fa" : "";
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNav);

  // Contact form (client-side demo)
  const form = document.getElementById("contact-form");
  const success = document.getElementById("form-success");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (success) {
        success.hidden = false;
        form.reset();
        setTimeout(() => { success.hidden = true; }, 5000);
      }
    });
  }
})();
