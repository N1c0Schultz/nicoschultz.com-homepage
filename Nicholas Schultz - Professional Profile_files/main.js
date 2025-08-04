/**
 * Nicholas Schultz Professional Website
 * Main JavaScript File
 * Based on Nino Template Functionality
 */

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeScrollEffects();
    initializeCounters();
    initializeAnimations();
    // Contact form removed - using mailto functionality
    initializeSmoothScrolling();
    initializeProgressWrap();
    initializeCompanyScroller();
    initializePartnerLogos();
    initializeThemeToggle();
    initializePhotoModal();
    initializeModernServices();
    initializeExperienceCards();
});

// Mobile Menu Functionality
function initializeMobileMenu() {
    const sidebarToggle = document.querySelector('.sidebar-toggle-btn');
    const sidebar = document.querySelector('.sidebar__area');
    const bodyOverlay = document.querySelector('.body-overlay');
    const sidebarClose = document.querySelector('.sidebar__close-btn');
    const mobileLinks = document.querySelectorAll('.mean-nav a');

    // Open mobile menu
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            sidebar.classList.add('active');
            bodyOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close mobile menu
    function closeMobileMenu() {
        sidebar.classList.remove('active');
        bodyOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeMobileMenu);
    }

    if (bodyOverlay) {
        bodyOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking mobile links
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// Scroll Effects
function initializeScrollEffects() {
    const header = document.querySelector('.main-header');
    
    const updateHeaderBackground = () => {
        const scrollTop = window.pageYOffset;
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        
        // Header scroll effect with theme support
        if (scrollTop > 100) {
            if (isDarkMode) {
                header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
            header.style.backdropFilter = 'blur(10px)';
        } else {
            // Use CSS variables for theme-aware colors
            header.style.backgroundColor = '';
            header.style.backdropFilter = 'none';
        }
    };
    
    window.addEventListener('scroll', updateHeaderBackground);
    
    // Update header when theme changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                updateHeaderBackground();
            }
        });
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const start = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * easeOut);
            
            counter.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                counter.textContent = target;
            }
        };
        
        animate();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.7 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Animations on Scroll
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.wow');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Contact form functionality removed - site now uses mailto links for contact

// Smooth Scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Progress Wrap (Scroll to Top)
function initializeProgressWrap() {
    const progressWrap = document.querySelector('.progress-wrap');
    const progressPath = document.querySelector('.progress-wrap path');
    
    if (!progressWrap || !progressPath) return;
    
    const pathLength = progressPath.getTotalLength();
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    
    const updateProgress = () => {
        const scroll = window.pageYOffset;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
        
        // Show/hide button
        if (scroll > 300) {
            progressWrap.classList.add('active');
        } else {
            progressWrap.classList.remove('active');
        }
    };
    
    window.addEventListener('scroll', updateProgress);
    
    // Click to scroll to top
    progressWrap.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Company Scroller Animation
function initializeCompanyScroller() {
    const scroller = document.querySelector('.scroller__inner');
    if (!scroller) return;
    
    // Pause animation on hover
    scroller.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    scroller.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
    
    // Handle focus for accessibility
    const images = scroller.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('focus', function() {
            scroller.style.animationPlayState = 'paused';
        });
        
        img.addEventListener('blur', function() {
            scroller.style.animationPlayState = 'running';
        });
    });
}

// Partner Logos Click Functionality
function initializePartnerLogos() {
    // URL mapping for partner organizations
    const partnerUrls = {
        'FourSeasons': 'https://www.fourseasons.com/',
        'Nous': 'https://nousgroup.com/',
        'EquityTrustees': 'https://www.eqt.com.au/',
        'NSWPorts': 'https://www.nswports.com.au/',
        'RACQ': 'https://www.racq.com.au/',
        'VisionAustralia': 'https://www.visionaustralia.org/',
        'DairyAustralia': 'https://www.dairyaustralia.com.au/en',
        'MIT': 'https://www.mit.edu.au/',
        'Harvard': 'https://www.harvard.edu/',
        'RMIT': 'https://www.rmit.edu.au/',
        'SwinburneUniversity': 'https://www.swinburne.edu.au/',
        'MassGeneralHospital': 'https://www.massgeneral.org/',
        'BostonMedicalCenter': 'https://www.bmc.org/',
        'BrighamandWomansHospital': 'https://www.brighamandwomens.org/',
        'GippslandHealthAlliance': 'https://gha.net.au/',
        'BetterHealthNetwork': 'https://www.bhn.org.au/',
        'Healthscope': 'https://healthscope.com.au/',
        'AEMO': 'https://aemo.com.au/',
        'VGCCC': 'https://www.vgccc.vic.gov.au/',
        'BarwonWater': 'https://www.barwonwater.vic.gov.au/',
        'CentralCoastCouncil': 'https://www.centralcoast.nsw.gov.au/',
        'CardiniaShireCouncil': 'https://www.cardinia.vic.gov.au/'
    };

    // Organization display names for accessibility
    const orgNames = {
        'FourSeasons': 'Four Seasons',
        'Nous': 'Nous Group',
        'EquityTrustees': 'Equity Trustees',
        'NSWPorts': 'NSW Ports',
        'RACQ': 'RACQ',
        'VisionAustralia': 'Vision Australia',
        'DairyAustralia': 'Dairy Australia',
        'MIT': 'MIT',
        'Harvard': 'Harvard University',
        'RMIT': 'RMIT University',
        'SwinburneUniversity': 'Swinburne University',
        'MassGeneralHospital': 'Massachusetts General Hospital',
        'BostonMedicalCenter': 'Boston Medical Center',
        'BrighamandWomansHospital': 'Brigham and Women\'s Hospital',
        'GippslandHealthAlliance': 'Gippsland Health Alliance',
        'BetterHealthNetwork': 'Better Health Network',
        'Healthscope': 'Healthscope',
        'AEMO': 'AEMO',
        'VGCCC': 'Victorian Casino Control Commission',
        'BarwonWater': 'Barwon Water',
        'CentralCoastCouncil': 'Central Coast Council',
        'CardiniaShireCouncil': 'Cardinia Shire Council'
    };

    // Function to extract logo name from src path
    function getLogoName(src) {
        const filename = src.split('/').pop();
        const nameWithoutExt = filename.split('.')[0];
        return nameWithoutExt;
    }

    // Function to make logo clickable
    function makeLogoClickable(img) {
        const logoName = getLogoName(img.src);
        const url = partnerUrls[logoName];
        const orgName = orgNames[logoName];
        
        if (!url) {
            console.warn(`No URL mapping found for logo: ${logoName}`);
            return;
        }

        // Add visual and accessibility attributes
        img.classList.add('partner-logo-clickable');
        img.setAttribute('role', 'button');
        img.setAttribute('tabindex', '0');
        img.setAttribute('aria-label', `Visit ${orgName} website (opens in new tab)`);
        img.style.cursor = 'pointer';

        // Click event handler
        function handleClick(e) {
            e.preventDefault();
            e.stopPropagation();
            window.open(url, '_blank', 'noopener,noreferrer');
            
            // Announce to screen readers
            announceToScreenReader(`Opening ${orgName} website in new tab`);
        }

        // Keyboard event handler
        function handleKeydown(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                handleClick(e);
            }
        }

        // Add event listeners
        img.addEventListener('click', handleClick);
        img.addEventListener('keydown', handleKeydown);

    }

    // Find all partner logos and make them clickable
    const partnerLogos = document.querySelectorAll([
        '.scroller__inner img',
        '.org-logos img'
    ].join(', '));

    partnerLogos.forEach(img => {
        // Skip if image is not loaded yet
        if (!img.src) return;
        
        const logoName = getLogoName(img.src);
        if (partnerUrls[logoName]) {
            makeLogoClickable(img);
        }
    });

    // Handle dynamically loaded images
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    const imgs = node.querySelectorAll ? node.querySelectorAll('img') : 
                                 node.tagName === 'IMG' ? [node] : [];
                    
                    imgs.forEach(img => {
                        if (img.src) {
                            const logoName = getLogoName(img.src);
                            if (partnerUrls[logoName] && 
                                (img.closest('.scroller__inner') || img.closest('.org-logos'))) {
                                makeLogoClickable(img);
                            }
                        }
                    });
                }
            });
        });
    });

    // Observe changes to logo containers
    const logoContainers = document.querySelectorAll('.scroller__inner, .org-logos');
    logoContainers.forEach(container => {
        observer.observe(container, {
            childList: true,
            subtree: true
        });
    });

    // Helper function for screen reader announcements
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        // Screen reader only styles
        announcement.style.position = 'absolute';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.padding = '0';
        announcement.style.margin = '-1px';
        announcement.style.overflow = 'hidden';
        announcement.style.clip = 'rect(0, 0, 0, 0)';
        announcement.style.whiteSpace = 'nowrap';
        announcement.style.border = '0';
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

}

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggleButtons = document.querySelectorAll('.theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
        html.setAttribute('data-theme', 'dark');
    } else {
        html.setAttribute('data-theme', 'light');
    }
    
    // Add click event listeners to all theme toggle buttons
    themeToggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleTheme();
        });
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
    
    // Keyboard support for theme toggle
    themeToggleButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    });
}

// Toggle Theme Function
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Update theme
    html.setAttribute('data-theme', newTheme);
    
    // Save preference
    localStorage.setItem('theme', newTheme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', newTheme === 'dark' ? '#ffffff' : '#000000');
    }
    
    // Announce theme change for screen readers
    announceThemeChange(newTheme);
}

// Announce Theme Change for Accessibility
function announceThemeChange(theme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Switched to ${theme} mode`;
    
    // Add screen reader only styles
    announcement.style.position = 'absolute';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.padding = '0';
    announcement.style.margin = '-1px';
    announcement.style.overflow = 'hidden';
    announcement.style.clip = 'rect(0, 0, 0, 0)';
    announcement.style.whiteSpace = 'nowrap';
    announcement.style.border = '0';
    
    document.body.appendChild(announcement);
    
    // Remove announcement after a short delay
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Utility Functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance Monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    });
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// Photo Modal Functionality
function initializePhotoModal() {
    const modal = document.getElementById('photoModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    const clickableImages = document.querySelectorAll('.clickable-image');
    
    // These will be reassigned dynamically
    let modalImage = document.getElementById('modalImage');
    
    
    if (!modal || !modalImage || !modalClose || !modalOverlay) {
        console.warn('Photo modal elements not found');
        return;
    }
    
    let isModalOpen = false;
    let focusableElements = [];
    let firstFocusableElement = null;
    let lastFocusableElement = null;
    let previousActiveElement = null;
    
    // Function to open modal
    function openModal(imageSrc, imageAlt) {
        previousActiveElement = document.activeElement;
        
        // Get current modal elements
        const currentModalImage = document.getElementById('modalImage');
        
        if (!currentModalImage) {
            console.error('Modal image element not found');
            return;
        }
        
        currentModalImage.src = imageSrc;
        currentModalImage.alt = imageAlt;
        
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        isModalOpen = true;
        
        // Set up focus trap
        setupFocusTrap();
        
        // Focus the close button
        setTimeout(() => {
            modalClose.focus();
        }, 100);
        
        // Announce modal opening to screen readers
        announceToScreenReader('Image modal opened. Press Escape to close.');
    }
    
    // Function to close modal
    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        isModalOpen = false;
        
        // Clean up Harvard certificates modal if needed
        cleanupHarvardModal();
        
        // Restore focus to the element that opened the modal
        if (previousActiveElement) {
            previousActiveElement.focus();
        }
        
        // Announce modal closing to screen readers
        announceToScreenReader('Image modal closed.');
    }
    
    // Function to open Harvard Certificates Modal with all three certificates
    function openHarvardCertificatesModal() {
        previousActiveElement = document.activeElement;
        
        // Get the Harvard certificate images from the data attribute
        const harvardImageElement = document.querySelector('[data-cert-images]');
        let harvardCertificates = [];
        
        if (harvardImageElement) {
            const certImages = harvardImageElement.getAttribute('data-cert-images').split(',');
            harvardCertificates = [
                {
                    src: certImages[0].trim(),
                    alt: 'Harvard Strategic Management Certificate'
                },
                {
                    src: certImages[1].trim(),
                    alt: 'Harvard Project Management Certificate'
                },
                {
                    src: certImages[2].trim(),
                    alt: 'Harvard Real Estate Investment Certificate'
                }
            ];
        } else {
            // Fallback to hardcoded paths if data attribute not found
            harvardCertificates = [
                {
                    src: 'assets/certs/Harvard Strategic Management.jpg',
                    alt: 'Harvard Strategic Management Certificate'
                },
                {
                    src: 'assets/certs/Harvard Project Management.jpg',
                    alt: 'Harvard Project Management Certificate'
                },
                {
                    src: 'assets/certs/Harvard Real Estate Investment.jpg',
                    alt: 'Harvard Real Estate Investment Certificate'
                }
            ];
        }
        
        // Create custom Harvard modal content
        createHarvardModalContent(harvardCertificates);
        
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        isModalOpen = true;
        
        // Set up focus trap
        setupFocusTrap();
        
        // Focus the close button
        setTimeout(() => {
            modalClose.focus();
        }, 100);
        
        // Announce modal opening to screen readers
        announceToScreenReader('Harvard Professional Certificates modal opened. Use arrow keys to navigate between certificates. Press Escape to close.');
    }
    
    // Function to create Harvard modal content
    function createHarvardModalContent(certificates) {
        const imageContainer = modal.querySelector('.photo-modal-image-container');
        
        // Clear existing content safely
        while (imageContainer.firstChild) {
            imageContainer.removeChild(imageContainer.firstChild);
        }
        
        // Create certificates grid
        const certificatesGrid = document.createElement('div');
        certificatesGrid.className = 'harvard-certificates-grid';
        certificatesGrid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            max-width: 90vw;
            max-height: 90vh;
            overflow-y: auto;
            padding: 1rem;
        `;
        
        certificates.forEach((cert, index) => {
            const certContainer = document.createElement('div');
            certContainer.className = 'harvard-cert-item';
            certContainer.style.cssText = `
                text-align: center;
                transition: transform 0.3s ease;
            `;
            
            const certImage = document.createElement('img');
            certImage.src = cert.src;
            certImage.alt = cert.alt;
            certImage.style.cssText = `
                max-width: 100%;
                max-height: 400px;
                object-fit: contain;
                border-radius: 12px;
                border: 2px solid var(--primary-color);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
                margin-bottom: 1rem;
                transition: transform 0.3s ease;
            `;
            
            
            // Add hover effects
            certContainer.addEventListener('mouseenter', () => {
                certImage.style.transform = 'scale(1.05)';
                certContainer.style.transform = 'translateY(-5px)';
            });
            
            certContainer.addEventListener('mouseleave', () => {
                certImage.style.transform = 'scale(1)';
                certContainer.style.transform = 'translateY(0)';
            });
            
            // Add click to focus individual certificate
            certImage.addEventListener('click', (e) => {
                e.stopPropagation();
                // Highlight selected certificate
                certificates.forEach((_, i) => {
                    const container = certificatesGrid.children[i];
                    if (i === index) {
                        container.style.transform = 'scale(1.02)';
                        container.style.filter = 'brightness(1.1)';
                    } else {
                        container.style.transform = 'scale(0.95)';
                        container.style.filter = 'brightness(0.8)';
                    }
                });
                
                // Reset after 2 seconds
                setTimeout(() => {
                    certificates.forEach((_, i) => {
                        const container = certificatesGrid.children[i];
                        container.style.transform = 'scale(1)';
                        container.style.filter = 'brightness(1)';
                    });
                }, 2000);
                
                announceToScreenReader(`Focused on ${cert.alt}`);
            });
            
            certContainer.appendChild(certImage);
            certificatesGrid.appendChild(certContainer);
        });
        
        imageContainer.appendChild(certificatesGrid);
    }
    
    // Function to cleanup Harvard modal
    function cleanupHarvardModal() {
        const imageContainer = modal.querySelector('.photo-modal-image-container');
        if (imageContainer && imageContainer.querySelector('.harvard-certificates-grid')) {
            // Clear existing content safely
            while (imageContainer.firstChild) {
                imageContainer.removeChild(imageContainer.firstChild);
            }
            
            // Create new image element
            const img = document.createElement('img');
            img.className = 'photo-modal-image';
            img.id = 'modalImage';
            img.alt = 'Enlarged image';
            imageContainer.appendChild(img);
            
            // Re-attach image handlers after restoration
            attachImageHandlers();
        }
    }
    
    // Set up focus trap for accessibility
    function setupFocusTrap() {
        focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        firstFocusableElement = focusableElements[0];
        lastFocusableElement = focusableElements[focusableElements.length - 1];
    }
    
    // Announce to screen readers
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        // Screen reader only styles
        announcement.style.position = 'absolute';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.padding = '0';
        announcement.style.margin = '-1px';
        announcement.style.overflow = 'hidden';
        announcement.style.clip = 'rect(0, 0, 0, 0)';
        announcement.style.whiteSpace = 'nowrap';
        announcement.style.border = '0';
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Add click event listeners to all clickable images
    clickableImages.forEach(image => {
        image.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Check if this has multiple certificate images (Harvard certificates)
            if (this.hasAttribute('data-cert-images')) {
                openHarvardCertificatesModal();
            } else if (this.hasAttribute('data-cert-image')) {
                // Use the certificate image instead of the logo
                const certImageSrc = this.getAttribute('data-cert-image');
                // For card elements, get alt from the image inside, otherwise use the element's alt
                const imageAlt = this.alt || (this.querySelector('img') ? this.querySelector('img').alt : 'Certificate');
                openModal(certImageSrc, imageAlt);
            } else if (this.src) {
                // Default behavior for actual images without special data attributes
                const imageSrc = this.src;
                const imageAlt = this.alt;
                openModal(imageSrc, imageAlt);
            }
        });
        
        // Add keyboard support for clickable images
        image.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                
                // Check if this has multiple certificate images (Harvard certificates)
                if (this.hasAttribute('data-cert-images')) {
                    openHarvardCertificatesModal();
                } else if (this.hasAttribute('data-cert-image')) {
                    // Use the certificate image instead of the logo
                    const certImageSrc = this.getAttribute('data-cert-image');
                    // For card elements, get alt from the image inside, otherwise use the element's alt
                    const imageAlt = this.alt || (this.querySelector('img') ? this.querySelector('img').alt : 'Certificate');
                    openModal(certImageSrc, imageAlt);
                } else if (this.src) {
                    // Default behavior for actual images without special data attributes
                    const imageSrc = this.src;
                    const imageAlt = this.alt;
                    openModal(imageSrc, imageAlt);
                }
            }
        });
    });
    
    // Close modal when clicking close button
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
        if (!isModalOpen) return;
        
        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                closeModal();
                break;
                
            case 'Tab':
                // Handle focus trapping
                if (focusableElements.length === 0) return;
                
                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstFocusableElement) {
                        e.preventDefault();
                        lastFocusableElement.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastFocusableElement) {
                        e.preventDefault();
                        firstFocusableElement.focus();
                    }
                }
                break;
                
            case 'Enter':
                // Close modal if close button is focused
                if (document.activeElement === modalClose) {
                    e.preventDefault();
                    closeModal();
                }
                break;
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (isModalOpen) {
            // Recalculate modal positioning if needed
            setupFocusTrap();
        }
    });
    
    // Prevent modal from closing on modal content click
    const modalContent = modal.querySelector('.photo-modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Function to attach image handlers
    function attachImageHandlers() {
        const currentModalImage = document.getElementById('modalImage');
        if (currentModalImage) {
            // Remove existing handlers
            currentModalImage.replaceWith(currentModalImage.cloneNode(true));
            const newModalImage = document.getElementById('modalImage');
            
            // Handle image load errors
            newModalImage.addEventListener('error', function() {
                console.error('Image failed to load:', this.src);
                announceToScreenReader('Error: Image could not be loaded');
            });
            
            // Handle image load success
            newModalImage.addEventListener('load', function() {
                announceToScreenReader('Image loaded successfully');
            });
        }
    }
    
    // Attach initial handlers
    attachImageHandlers();
    
}

// Modern Services Section Functionality
function initializeModernServices() {
    const serviceCards = document.querySelectorAll('.service-card');
    let currentExpandedCard = null;
    
    if (serviceCards.length === 0) {
        return;
    }
    
    // Initialize clean card interactions
    serviceCards.forEach(card => {
        
        // Click to expand functionality
        card.addEventListener('click', function(e) {
            e.preventDefault();
            toggleServiceCard(card);
        });
        
        // Keyboard navigation support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleServiceCard(card);
            } else if (e.key === 'Escape') {
                if (card.classList.contains('expanded')) {
                    collapseServiceCard(card);
                }
            }
        });
        
        // Focus/blur events for accessibility
        card.addEventListener('focus', function() {
            card.setAttribute('aria-expanded', card.classList.contains('expanded'));
        });
    });
    
    // Toggle service card expansion
    function toggleServiceCard(card) {
        const isExpanded = card.classList.contains('expanded');
        
        if (isExpanded) {
            collapseServiceCard(card);
        } else {
            expandServiceCard(card);
        }
    }
    
    
    // Expand service card
    function expandServiceCard(card) {
        // Collapse any currently expanded card
        if (currentExpandedCard && currentExpandedCard !== card) {
            collapseServiceCard(currentExpandedCard);
        }
        
        // Expand the clicked card
        card.classList.add('expanded');
        card.setAttribute('aria-expanded', 'true');
        
        // Update expand indicator
        const indicator = card.querySelector('.service-expand-indicator i');
        if (indicator) {
            indicator.style.transform = 'rotate(45deg)';
        }
        
        // Show service details
        const details = card.querySelector('.service-details');
        if (details) {
            details.setAttribute('aria-hidden', 'false');
        }
        
        // Update current expanded card reference
        currentExpandedCard = card;
        
        // Smooth scroll to card (with offset for header)
        setTimeout(() => {
            const headerOffset = 100;
            const elementPosition = card.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }, 300);
        
        // Announce to screen readers
        announceToScreenReader(`${card.querySelector('.service-title').textContent} service details expanded`);
    }
    
    // Collapse service card
    function collapseServiceCard(card) {
        card.classList.remove('expanded');
        card.setAttribute('aria-expanded', 'false');
        
        // Reset expand indicator
        const indicator = card.querySelector('.service-expand-indicator i');
        if (indicator) {
            indicator.style.transform = 'rotate(0deg)';
        }
        
        // Hide service details
        const details = card.querySelector('.service-details');
        if (details) {
            details.setAttribute('aria-hidden', 'true');
        }
        
        // Clear current expanded card reference
        if (currentExpandedCard === card) {
            currentExpandedCard = null;
        }
        
        // Announce to screen readers
        announceToScreenReader(`${card.querySelector('.service-title').textContent} service details collapsed`);
    }
    
    // Click outside to collapse expanded cards
    document.addEventListener('click', function(e) {
        const clickedCard = e.target.closest('.service-card');
        
        if (!clickedCard && currentExpandedCard) {
            collapseServiceCard(currentExpandedCard);
        }
    });
    
    // ESC key to collapse all expanded cards
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentExpandedCard) {
            collapseServiceCard(currentExpandedCard);
            currentExpandedCard.focus(); // Return focus to the card
        }
    });
    
    // Handle window resize - collapse expanded cards on mobile breakpoint
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth <= 991 && currentExpandedCard) {
                // On mobile, we don't need to collapse as the design handles it
                // Just update the grid layout
                updateGridLayout();
            }
        }, 250);
    });
    
    // Update grid layout for responsive behavior
    function updateGridLayout() {
        const servicesGrid = document.querySelector('.services-grid');
        if (!servicesGrid) return;
        
        if (window.innerWidth <= 991) {
            // Mobile: single column, no special expanded behavior needed
            serviceCards.forEach(card => {
                if (card.classList.contains('expanded')) {
                    card.style.gridColumn = 'auto';
                }
            });
        } else {
            // Desktop: two columns, expanded cards span full width
            serviceCards.forEach(card => {
                if (card.classList.contains('expanded')) {
                    card.style.gridColumn = '1 / -1';
                }
            });
        }
    }
    
    
    // Initialize grid layout
    updateGridLayout();
    
    // Add animation classes for enhanced UX
    serviceCards.forEach((card, index) => {
        // Stagger the initial animation
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('service-card-animate-in');
    });
    
}

// Screen reader announcement helper (if not already defined)
if (typeof announceToScreenReader !== 'function') {
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        
        document.body.appendChild(announcement);
        announcement.textContent = message;
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

// Experience Cards Click Functionality
function initializeExperienceCards() {
    const experienceCards = document.querySelectorAll('.clickable-experience');
    
    if (experienceCards.length === 0) {
        return;
    }
    
    experienceCards.forEach(card => {
        const companyUrl = card.getAttribute('data-company-url');
        
        if (!companyUrl) {
            console.warn('Experience card missing data-company-url attribute');
            return;
        }
        
        // Click event handler
        function handleClick(e) {
            e.preventDefault();
            e.stopPropagation();
            window.open(companyUrl, '_blank', 'noopener,noreferrer');
            
            // Get company name for announcement
            const companyName = card.querySelector('.experience-company h4')?.textContent || 'company';
            announceToScreenReader(`Opening ${companyName} website in new tab`);
        }
        
        // Keyboard event handler
        function handleKeydown(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                handleClick(e);
            }
        }
        
        // Add event listeners
        card.addEventListener('click', handleClick);
        card.addEventListener('keydown', handleKeydown);
        
        // Add hover effect class for better UX
        card.classList.add('experience-card-clickable');
        
    });
    
}

// Function to close the current service card (for AI Transformation buttons)
function closeCurrentServiceCard(event) {
    event.stopPropagation(); // Prevent event bubbling
    
    // Find the currently expanded service card
    const expandedCard = document.querySelector('.service-card.expanded');
    if (expandedCard) {
        expandedCard.classList.remove('expanded');
        expandedCard.setAttribute('aria-expanded', 'false');
        
        // Reset expand indicator
        const indicator = expandedCard.querySelector('.service-expand-indicator i');
        if (indicator) {
            indicator.style.transform = 'rotate(0deg)';
        }
        
        // Hide service details
        const details = expandedCard.querySelector('.service-details');
        if (details) {
            details.setAttribute('aria-hidden', 'true');
        }
    }
}


