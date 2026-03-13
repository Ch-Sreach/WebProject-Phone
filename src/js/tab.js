console.log('Gen-Z Phone Shop loaded successfully!');

// TAB SYSTEM FUNCTIONALITY
/**
 * Opens a specific tab and hides others
 * @param {string} pageName - ID of the tab content to show
 * @param {HTMLElement} elmnt - The button element that was clicked
 */
function openPage(pageName, elmnt) {
    // Get all tab content elements
    const tabcontent = document.getElementsByClassName("tabcontent");
    
    // Hide all tab contents
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // Get all tab button elements
    const tablinks = document.getElementsByClassName("tablink");
    
    // Remove active class from all tab buttons
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the selected tab content
    const selectedTab = document.getElementById(pageName);
    if (selectedTab) {
        selectedTab.style.display = "block";
        selectedTab.classList.add("active");
    }
    
    // Add active class to clicked button
    if (elmnt) {
        elmnt.classList.add("active");
    }
}

// HERO SLIDER FUNCTIONALITY
let currentSlide = 0;

/**
 * Changes the current slide
 * @param {number} direction - 1 for next, -1 for previous
 */
function changeSlide(direction) {
    const slides = document.getElementsByClassName("slide");
    
    if (slides.length === 0) return;
    
    // Hide current slide
    slides[currentSlide].classList.remove("active");
    
    // Calculate new slide index
    currentSlide = currentSlide + direction;
    
    // Loop back to start or end
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    // Show new slide
    slides[currentSlide].classList.add("active");
}

/**
 * Auto-advance slides every 5 seconds
 */
function autoSlide() {
    changeSlide(1);
}

// Start auto-sliding when page loads
let slideInterval;

// MOBILE MENU TOGGLE
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// SHOPPING CART FUNCTIONALITY
let cartCount = 0;

/**
 * Add item to cart
 * @param {string} productName - Name of the product
 * @param {number} price - Price of the product
 */
function addToCart(productName, price) {
    cartCount++;
    updateCartCount();
    
    // Show notification
    showNotification(`${productName} added to cart!`);
    
    console.log(`Added to cart: ${productName} - $${price}`);
}

// Update cart count display
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

/**
 * Show notification message
 * @param {string} message - The message to display
 */
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #00bcd4;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(function() {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(function() {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// SMOOTH SCROLL FOR NAVIGATION
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for empty hash or javascript: links
        if (href === '#' || href.startsWith('javascript:')) {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (hamburger) {
                    hamburger.classList.remove('active');
                }
            }
        }
    });
});

// SCROLL TO TOP BUTTON
// Create scroll to top button
const scrollBtn = document.createElement('button');
scrollBtn.className = 'scroll-to-top';
scrollBtn.innerHTML = '↑';
scrollBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollBtn);

// Show/hide button based on scroll position
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

// Scroll to top when clicked
scrollBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// INITIALIZE ON PAGE LOAD
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded - initializing...');
    
    // Start auto-slider
    const slider = document.querySelector('.hero-slider');
    if (slider) {
        slideInterval = setInterval(autoSlide, 5000);
        
        // Pause auto-slide on hover
        slider.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', function() {
            slideInterval = setInterval(autoSlide, 5000);
        });
    }
    
    // Open default tab if it exists
    const defaultTab = document.getElementById('defaultOpen');
    if (defaultTab) {
        defaultTab.click();
    }
    
    // Add click handlers to all "Add to Cart" buttons
    const cartButtons = document.querySelectorAll('.btn-cart');
    cartButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            if (productCard) {
                const productName = productCard.querySelector('.product-name').textContent;
                const priceText = productCard.querySelector('.price-current').textContent;
                const price = parseFloat(priceText.replace('$', ''));
                
                addToCart(productName, price);
            }
        });
    });
    
    console.log('Initialization complete!');
});

// function openPage(pageName, elmnt) {
//     // Hide all tab contents
//     const tabcontent = document.getElementsByClassName("tabcontent");
//     for (let i = 0; i < tabcontent.length; i++) {
//         tabcontent[i].style.display = "none";
//     }

//     // Remove active class from all buttons
//     const tablinks = document.getElementsByClassName("tablink");
//     for (let i = 0; i < tablinks.length; i++) {
//         tablinks[i].classList.remove("active");
//     }

//     // Show selected tab
//     document.getElementById(pageName).style.display = "block";
//     elmnt.classList.add("active");
// }

// // Open first tab on page load
// document.getElementById("defaultOpen").click();

