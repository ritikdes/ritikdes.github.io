// --- TASK 1: RUNTIME TYPING EFFECT ---
const text = "Ritik Deshemaru";
const target = document.getElementById("typed-name");
let index = 0;

function type() {
    if (index < text.length) {
        target.textContent += text[index];
        index++;
        setTimeout(type, 100);  // 100ms delay cycles between characters
    }
}

// --- TASK 2: VIEWPORT SCROLL INTERSECTION OBSERVER ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { 
    threshold: 0.1 
});

// --- TASK 3: ACTIVE NAVIGATION LINK TRACKING ENGINE (SCROLL SPY) ---
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    let current = "";
    
    sections.forEach(section => {
        // Checks if current viewport view has scrolled past the top boundary threshold of the section
        if (window.scrollY >= (section.offsetTop - 140)) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });

    // --- MINI PROJECT: CONTACT FORM INTERCEPTION & VALIDATION ---
    const contactForm = document.getElementById("contact-form");
    const feedback = document.getElementById("form-message");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            // Stops the web page browser frame from hard refreshing on submit
            e.preventDefault();
            
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            
            // Safety Evaluation Block 1: Empty Field Guard
            if (!name || !email || !message) {
                feedback.textContent = "Please fill in all fields.";
                feedback.style.color = "#f87171"; // Vibrant light red text tint
                return;
            }
            
            // Safety Evaluation Block 2: Structural Syntax Email Verification Check
            if (!email.includes("@") || !email.includes(".")) {
                feedback.textContent = "Please enter a valid email address.";
                feedback.style.color = "#f87171";
                return;
            }
            
            // Action Success Resolution
            feedback.textContent = "Message sent! I'll get back to you soon.";
            feedback.style.color = "#4ade80"; // Bright emerald green confirmation text
            
            // Wipe input values clear so form resets for another use
            contactForm.reset();
        });
    }
});

// --- EXECUTE INITIALIZATION INTERFACE LOOPS ---
window.addEventListener("load", () => {
    type();
    
    document.querySelectorAll("section").forEach(section => {
        section.classList.add("hidden");
        observer.observe(section);
    });

    // --- TASK 4: MOBILE HAMBURGER MENU ACTIONS ---
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("open");
    });

    // Auto-close menu drawer when a link is tapped on mobile viewports
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
        });
    });
});