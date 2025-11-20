// ========================================
// CONFIGURATION - EDIT YOUR DETAILS HERE
// ========================================
const CONFIG = {
    resumeViewURL: 'Dharna_Srinath_Resume.pdf', // Link to view resume (Google Drive, Dropbox, etc.)
    resumeDownloadURL: 'Dharna_Srinath_Resume.pdf', // Path to downloadable resume PDF
    typingText: 'Full Stack Developer', // Text to display with typing effect
    typingSpeed: 100 // Milliseconds per character
};

// ========================================
// SMOOTH SCROLLING FOR NAVIGATION
// ========================================
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

// ========================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ========================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Add scrolled class to navbar
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// RESUME BUTTON HANDLERS
// ========================================
document.getElementById('viewResumeBtn').addEventListener('click', function(e) {
    e.preventDefault();
    // Open resume in new tab
    window.open(CONFIG.resumeViewURL, '_blank');
});

document.getElementById('downloadResumeBtn').addEventListener('click', function(e) {
    e.preventDefault();
    // Create temporary link for download
    const link = document.createElement('a');
    link.href = CONFIG.resumeDownloadURL;
    link.download = 'Srinath_Resume.pdf'; // Name of downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// ========================================
// ANIMATED COUNTER FOR STATS
// ========================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
}

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

// Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// Observer for skill categories - fade in animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// Observer for project cards
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'all 0.6s ease-out';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
    projectObserver.observe(card);
});

// Observer for timeline items
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateX(-50px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.8s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
});

// Observer for certification cards
const certObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'scale(0.9)';
                entry.target.style.transition = 'all 0.5s ease-out';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, 50);
            }, index * 150);
        }
    });
}, observerOptions);

document.querySelectorAll('.cert-card').forEach(card => {
    certObserver.observe(card);
});

// ========================================
// CONTACT FORM SUBMISSION
// ========================================
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Here you can add your form submission logic
    // Example: Send to email service, backend API, etc.
    
    // For demo purposes, show success message
    alert(`Thank you ${name}! Your message has been sent successfully. I'll get back to you at ${email} soon.`);
    
    // Reset form
    this.reset();
    
    // Optional: Integrate with email service
    // Example with EmailJS, Formspree, or your own backend:
    
    // Functional Email Sending Code
emailjs.send("SERVICE_ID", "TEMPLATE_ID", {
    to_email: "dhagads267@gmail.com",
    from_name: name,
    from_email: email,
    subject: subject,
    message: message
}, "PUBLIC_KEY")
.then((response) => {
    alert("Message sent successfully!");
    document.getElementById('contactForm').reset();
})
.catch((error) => {
    alert("Error sending message. Try again.");
});


});

// ========================================
// TYPING EFFECT FOR HERO SUBTITLE
// ========================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        typeWriter(typingElement, CONFIG.typingText, CONFIG.typingSpeed);
    }
});

// ========================================
// FORM VALIDATION WITH VISUAL FEEDBACK
// ========================================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            if (this.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(this.value)) {
                    this.style.borderColor = '#10b981';
                } else {
                    this.style.borderColor = '#ef4444';
                }
            } else {
                this.style.borderColor = '#10b981';
            }
        } else {
            this.style.borderColor = 'rgba(99, 102, 241, 0.3)';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--primary-color)';
    });
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'scale(1.1) translateY(-5px)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'scale(1) translateY(0)';
    });
}

createScrollToTop();

// ========================================
// CERTIFICATE VIEW LINKS
// ========================================
document.querySelectorAll('.cert-view').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // Open certificate in new tab
        // Replace '#' with actual certificate URL
        const certURL = this.getAttribute('href');
        if (certURL && certURL !== '#') {
            window.open(certURL, '_blank');
        } else {
            alert('Please update the certificate URL in the HTML');
        }
    });
});

// ========================================
// LAZY LOADING IMAGES
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// PREVENT RIGHT CLICK ON RESUME BUTTONS (Optional Security)
// ========================================
// Uncomment if you want to prevent right-click on resume buttons
/*
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
});
*/

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c Welcome to My Portfolio! ', 'background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%c Interested in working together? Let\'s connect! ', 'color: #6366f1; font-size: 14px;');

// ========================================
// PAGE LOAD PERFORMANCE
// ========================================
window.addEventListener('load', () => {
    console.log('Page loaded successfully!');
    
    // Add loaded class to body for any CSS transitions
    document.body.classList.add('loaded');
});

// ========================================
// MOBILE MENU TOGGLE (if needed for smaller screens)
// ========================================
// Uncomment if you want to add a hamburger menu for mobile
/*
function createMobileMenu() {
    const nav = document.querySelector('nav');
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '☰';
    menuBtn.style.cssText = `
        display: none;
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 1001;
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        font-size: 1.5rem;
        border-radius: 5px;
        cursor: pointer;
    `;
    
    document.body.appendChild(menuBtn);
    
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('mobile-open');
    });
    
    // Show button on mobile
    if (window.innerWidth <= 768) {
        menuBtn.style.display = 'block';
    }
    
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            menuBtn.style.display = 'block';
        } else {
            menuBtn.style.display = 'none';
            nav.classList.remove('mobile-open');
        }
    });
}

createMobileMenu();
*/

// ========================================
// END OF SCRIPT
// ========================================