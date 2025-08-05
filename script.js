// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNavbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Menu filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // Filter menu items
        menuItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
                item.classList.remove('hidden');
                // Trigger animation
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                }, 300);
            }
        });
    });
});

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const count = parseInt(counter.innerText);
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Trigger counter animation when section is in view
const statsSection = document.querySelector('.stats-section');
let statsAnimated = false;

const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            animateCounters();
            statsAnimated = true;
        }
    });
}, observerOptions);

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Back to top button functionality
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form submissions
const bookingForm = document.getElementById('bookingForm');
const newsletterForm = document.querySelector('.newsletter-form');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Show success message (you can customize this)
        alert('Thank you for your reservation! We will contact you soon to confirm your booking.');
        
        // Reset form
        this.reset();
        
        // Here you would typically send the data to your server
        console.log('Booking form submitted:', Object.fromEntries(formData));
    });
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        
        // Reset form
        this.reset();
        
        // Here you would typically send the email to your server
        console.log('Newsletter subscription:', email);
    });
}

// Mobile menu close on link click
const navLinks = document.querySelectorAll('.nav-link');
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Add loading animation to buttons
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const originalText = this.innerHTML;
        
        // Add loading state (only for form submissions)
        if (this.type === 'submit') {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.disabled = true;
            
            // Restore button after 2 seconds (in real app, this would be after server response)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Add hover effects to cards
const cards = document.querySelectorAll('.menu-card, .special-card, .testimonial-card, .offer-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Preloader (optional)
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Restaurant hours logic
function updateRestaurantStatus() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    let isOpen = false;
    
    if (currentDay >= 1 && currentDay <= 5) { // Monday to Friday
        isOpen = currentHour >= 11 && currentHour < 22; // 11 AM to 10 PM
    } else { // Saturday and Sunday
        isOpen = currentHour >= 10 && currentHour < 23; // 10 AM to 11 PM
    }
    
    const statusElement = document.querySelector('.restaurant-status');
    if (statusElement) {
        statusElement.textContent = isOpen ? 'Open Now' : 'Closed';
        statusElement.className = `restaurant-status ${isOpen ? 'open' : 'closed'}`;
    }
}

// Update restaurant status on page load
updateRestaurantStatus();

// Add CSS for restaurant status
const style = document.createElement('style');
style.textContent = `
    .restaurant-status {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .restaurant-status.open {
        background: #4CAF50;
        color: white;
    }
    
    .restaurant-status.closed {
        background: #f44336;
        color: white;
    }
`;
document.head.appendChild(style);

// Add scroll-triggered animations
const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
};

const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe elements for animation
document.querySelectorAll('.menu-card, .special-card, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// Add touch gestures for mobile menu navigation
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
});

function handleGesture() {
    const swipeThreshold = 100;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe right - could open mobile menu
            console.log('Swipe right detected');
        } else {
            // Swipe left - could close mobile menu
            console.log('Swipe left detected');
        }
    }
}

// Add performance optimization
const throttle = (func, delay) => {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
};

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Navbar scroll effect with throttling
    const navbar = document.getElementById('mainNavbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button with throttling
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
}, 100));

console.log('Royal Spice Restaurant website loaded successfully!');


// menu-section
document.addEventListener("DOMContentLoaded", async () => {
  const menuContainer = document.querySelector(".menu-items");
  const filterButtons = document.querySelectorAll(".filter-btn");

  async function getMenuData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(window.foodData);
      }, 300);
    });
  }

  function createMenuCard(item) {
    return `
      <div class="col-lg-4 col-md-6 mb-4 menu-item ${item.category}">
        <div class="menu-card">
          <img src="${item.image}" alt="${item.name}" class="menu-image">
          <div class="menu-content">
            <div>
              <h5 class="menu-name">${item.name}</h5>
              <p class="menu-description">${item.description}</p>
            </div>
            <span class="menu-price"><small>From</small> ₹${item.price}</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderMenuItems(data) {
    menuContainer.innerHTML = data.map(createMenuCard).join("");
  }

  function filterMenu(category) {
    const items = document.querySelectorAll(".menu-item");
    items.forEach(item => {
      if (category === "all" || item.classList.contains(category)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  const data = await getMenuData();
  renderMenuItems(data);

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".filter-btn.active")?.classList.remove("active");
      btn.classList.add("active");
      filterMenu(btn.getAttribute("data-filter"));
    });
  });
});
