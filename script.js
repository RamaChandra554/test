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

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let count = parseInt(counter.innerText);
        if (count < target) {
            const increment = Math.ceil(target / speed);
            const updateCount = () => {
                count += increment;
                if (count > target) count = target;
                counter.innerText = count;
                if (count < target) {
                    setTimeout(updateCount, 10);
                }
            };
            updateCount();
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
        
        const formData = new FormData(this);
        
        alert('Thank you for your reservation! We will contact you soon to confirm your booking.');
        
        this.reset();
        
        console.log('Booking form submitted:', Object.fromEntries(formData));
    });
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        alert('Thank you for subscribing to our newsletter!');
        
        this.reset();
        
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
        
        if (this.type === 'submit') {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.disabled = true;
            
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
    const currentDay = now.getDay();
    
    let isOpen = false;
    
    if (currentDay >= 1 && currentDay <= 5) { 
        isOpen = currentHour >= 11 && currentHour < 22; 
    } else { 
        isOpen = currentHour >= 10 && currentHour < 23;
    }
    
    const statusElement = document.querySelector('.restaurant-status');
    if (statusElement) {
        statusElement.textContent = isOpen ? 'Open Now' : 'Closed';
        statusElement.className = `restaurant-status ${isOpen ? 'open' : 'closed'}`;
    }
}

updateRestaurantStatus();

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

// Scroll-triggered animations
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

document.querySelectorAll('.menu-card, .special-card, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// Touch gestures for mobile menu navigation
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
            console.log('Swipe right detected');
        } else {
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
    const navbar = document.getElementById('mainNavbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
}, 100));

console.log('Royal Spice Restaurant website loaded successfully!');


//-- MENU CARDS SECTION -//
document.addEventListener("DOMContentLoaded", async () => {
    const menuContainer = document.querySelector(".menu-items");
    const filterButtons = document.querySelectorAll(".filter-btn");

    const menuData = [
        {
            name: "Crispy Samosa",
            description: "Golden fried pastries filled with spiced potatoes and peas",
            price: 40,
            category: "appetizers",
            image: "https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg"
        },
        {
            name: "Hyderabadi Biryani",
            description: "Aromatic basmati rice with tender mutton and exotic spices",
            price: 350,
            category: "mains",
            image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
        },
        {
            name: "Masala Dosa",
            description: "Crispy rice crepe filled with seasoned potato curry",
            price: 180,
            category: "mains",
            image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg"
        },
        {
            name: "Vada Pav",
            description: "Fluffy lentil donuts served with coconut chutney",
            price: 60,
            category: "appetizers",
            image: "https://images.pexels.com/photos/17433337/pexels-photo-17433337.jpeg"
        },
        {
            name: "Butter Chicken Naan",
            description: "Tender chicken in rich tomato and cream gravy",
            price: 320,
            category: "mains",
            image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg"
        },
        {
            name: "Gulab Jamun",
            description: "Soft milk dumplings in aromatic sugar syrup",
            price: 40,
            category: "desserts",
            image: "https://images.pexels.com/photos/11887844/pexels-photo-11887844.jpeg"
        }
    ];

    // Simulate async fetch (optional)
    async function fetchMenuData() {
        return new Promise(resolve => {
            setTimeout(() => resolve(menuData), 300);
        });
    }

    function createMenuCard(item) {
        return `
        <div class="col-lg-4 col-md-4 col-6 mb-4 menu-item ${item.category}" data-aos="fade-up">
            <div class="menu-card">
                <img src="${item.image}" alt="${item.name}" class="menu-image" loading="lazy">
                <div class="menu-content d-flex justify-content-between align-items-center">
                    <div>
                        <h2 class="menu-name">${item.name}</h2>
                        <p class="menu-description">${item.description}</p>
                    </div>
                    <span class="menu-price"><small>From</small> ₹${item.price}</span>
                </div>
            </div>
        </div>`;
    }

    function renderMenuItems(data) {
        menuContainer.innerHTML = data.map(createMenuCard).join('');
        AOS.refresh();
    }

    function filterMenu(category) {
        const cards = document.querySelectorAll(".menu-item");
        cards.forEach(card => {
            if (category === "all" || card.classList.contains(category)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    const data = await fetchMenuData();
    renderMenuItems(data);

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector(".filter-btn.active")?.classList.remove('active');
            btn.classList.add('active');
            filterMenu(btn.getAttribute('data-filter'));
        });
    });
});


// SPECIALS SECTION
const specialsContainer = document.querySelector(".specials-row");

const specialsData = [
  {
    name: "Fish Curry Rice",
    image: "./imgs/todays-special-fish-curry.png",
    description: "Fresh fish cooked in coconut curry served with steamed rice",
    price: 180,
  },
  {
    name: "Chicken Biryani",
    image: "./imgs/todays-special- chicken-biryani.png",
    description: "Aromatic basmati rice with succulent chicken pieces",
    price: 280,
  },
  {
    name: "Royal Thali",
    image: "./imgs/todays-special-Royal-Thali.png",
    description: "Complete meal with variety of curries, rice, and bread",
    price: 220,
  },
  {
    name: "Shrimp Curry",
    image: "./imgs/todays-special-Shripm-curry.png",
    description: "Shrimp in spiced coconut curry served with rice",
    price: 260,
  }
];

function createSpecialCard(item) {
  return `
    <div class="col-6 col-md-6 col-lg-3 mb-4" data-aos="fade-up">
      <div class="special-cards">
        <img src="${item.image}" alt="${item.name}" class="special-image">
        <div class="special-content">
          <h5 class="special-name">${item.name}</h5>
          <p class="special-description">${item.description}</p>
          <div class="special-footer">
            <div class="special-price"><span class="text-dark">starts at  </span>₹${item.price}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderSpecials(data) {
  specialsContainer.innerHTML = data.map(createSpecialCard).join('');
  AOS.refresh();
}

renderSpecials(specialsData);
