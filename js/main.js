(function () {
  "use strict";

  var backToTop = document.querySelector(".back-to-top");
  var contactForm = document.getElementById("contact-form");
  var navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  var navbarCollapse = document.getElementById("navbarNav");

  function handleScroll() {
    if (!backToTop) return;
    var scrolled = window.scrollY > 300;
    backToTop.classList.toggle("visible", scrolled);
    backToTop.setAttribute("aria-hidden", scrolled ? "false" : "true");
  }

  function closeMobileNav() {
    if (!navbarCollapse || !navbarCollapse.classList.contains("show")) return;
    var toggler = document.querySelector(".navbar-toggler");
    if (toggler && typeof bootstrap !== "undefined") {
      bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
    }
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMobileNav);
  });

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var honeypot = contactForm.querySelector('[name="_gotcha"]');
      if (honeypot && honeypot.value) return;

      var submitBtn = contactForm.querySelector('[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            window.location.href = "/thank-you.html";
          } else {
            throw new Error("Form submission failed");
          }
        })
        .catch(function () {
          alert(
            "We could not send your message. Please try again or contact us on WhatsApp."
          );
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        });
    });
  }

  document.querySelectorAll(".faq-button").forEach(function (button) {
    button.addEventListener("click", function () {
      var expanded = button.getAttribute("aria-expanded") === "true";
      var panelId = button.getAttribute("aria-controls");
      var panel = document.getElementById(panelId);

      button.setAttribute("aria-expanded", expanded ? "false" : "true");
      if (panel) {
        panel.hidden = expanded;
      }
    });
  });
})();
