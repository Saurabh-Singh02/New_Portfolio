document.addEventListener("DOMContentLoaded", function () {
    const themeButton = document.getElementById("theme-button");
    const html = document.documentElement;

    // Check for saved theme preference or prefer OS theme
    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };

    // Set initial theme
    const setTheme = (theme) => {
        html.setAttribute("data-bs-theme", theme);
        localStorage.setItem("theme", theme);
        updateThemeIcon(theme);
    };

    // Update theme icon
    const updateThemeIcon = (theme) => {
        if (!themeButton) return;
        
        themeButton.innerHTML = theme === "dark" 
            ? '<i class="bi bi-moon-fill"></i>'
            : '<i class="bi bi-sun-fill"></i>';
        
        // Add animation to theme button
        themeButton.style.transform = "scale(1.1)";
        setTimeout(() => {
            themeButton.style.transform = "scale(1)";
        }, 150);
    };

    // Theme functionality
    if (themeButton) {
        // Set initial theme
        setTheme(getPreferredTheme());

        themeButton.addEventListener("click", () => {
            const currentTheme = html.getAttribute("data-bs-theme");
            setTheme(currentTheme === "dark" ? "light" : "dark");
        });

        // Listen for system theme changes
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
            if (!localStorage.getItem("theme")) {
                setTheme(e.matches ? "dark" : "light");
            }
        });
    }

    // Enhanced profile image handling
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        // Preload image for better performance
        const img = new Image();
        img.src = profileImage.src;
        img.onload = () => {
            profileImage.style.opacity = '1';
        };
        
        img.onerror = () => {
            // Fallback if image fails to load
            console.warn('Profile image failed to load');
            profileImage.style.backgroundColor = 'var(--primary-color)';
            profileImage.style.backgroundImage = 'linear-gradient(45deg, var(--primary-color), var(--primary-light))';
            profileImage.style.display = 'flex';
            profileImage.style.alignItems = 'center';
            profileImage.style.justifyContent = 'center';
            profileImage.style.color = 'white';
            profileImage.style.fontSize = '3rem';
            profileImage.style.fontWeight = 'bold';
            profileImage.innerHTML = 'SS';
        };
    }

    // Add smooth scrolling for anchor links (compatible with Bootstrap)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href === "#") return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // Add scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll(".service-card, .project-card, .skill-card, .education-item").forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Add loading animation
    window.addEventListener("load", () => {
        document.body.classList.add("loaded");
    });
});

// Scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollToTopBtn.setAttribute('title', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Handle responsive image loading
function handleImageOptimization() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading lazy for better performance
        if (!img.getAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Add error handling
        img.addEventListener('error', function() {
            this.style.opacity = '0';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 300);
        });
    });
}

// Initialize image optimization
handleImageOptimization();