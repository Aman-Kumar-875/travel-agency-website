// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Image handling is now managed by image-manager.js
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Search Popup
    const searchBtn = document.getElementById('search-btn');
    const searchPopup = document.getElementById('search-popup');
    const closeSearch = document.getElementById('close-search');
    
    if (searchBtn && searchPopup && closeSearch) {
        searchBtn.addEventListener('click', function() {
            searchPopup.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
        });
        
        closeSearch.addEventListener('click', function() {
            searchPopup.classList.remove('active');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
        
        // Close popup when clicking outside the search container
        searchPopup.addEventListener('click', function(e) {
            if (e.target === searchPopup) {
                searchPopup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Search Form Submission
    const searchForm = document.getElementById('search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const destination = document.getElementById('destination').value;
            const checkIn = document.getElementById('check-in').value;
            const checkOut = document.getElementById('check-out').value;
            const adults = document.getElementById('adults').value;
            const children = document.getElementById('children').value;
            
            // Validate form
            if (!destination || !checkIn || !checkOut) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Check if check-in date is before check-out date
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            
            if (checkInDate >= checkOutDate) {
                alert('Check-out date must be after check-in date.');
                return;
            }
            
            // Simulate form submission - in a real application, this would send data to a server
            alert(`Thank you for your search!
                Destination: ${destination}
                Check-in: ${checkIn}
                Check-out: ${checkOut}
                Adults: ${adults}
                Children: ${children}
                
                We'll redirect you to available packages for your search criteria.`);
            
            // Close the popup
            searchPopup.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // In a real application, you would redirect to a search results page
            window.location.href = `packages.html?destination=${encodeURIComponent(destination)}&checkin=${checkIn}&checkout=${checkOut}&adults=${adults}&children=${children}`;
        });
    }
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (testimonialSlides.length > 0 && dots.length > 0) {
        let currentSlide = 0;
        
        // Function to show a specific slide
        function showSlide(index) {
            // Hide all slides
            testimonialSlides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show the selected slide and activate corresponding dot
            testimonialSlides[index].classList.add('active');
            dots[index].classList.add('active');
            
            // Update current slide index
            currentSlide = index;
        }
        
        // Next slide function
        function nextSlide() {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= testimonialSlides.length) {
                nextIndex = 0;
            }
            showSlide(nextIndex);
        }
        
        // Previous slide function
        function prevSlide() {
            let prevIndex = currentSlide - 1;
            if (prevIndex < 0) {
                prevIndex = testimonialSlides.length - 1;
            }
            showSlide(prevIndex);
        }
        
        // Event listeners for next and previous buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
        
        // Auto-advance slides every 5 seconds
        setInterval(nextSlide, 5000);
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            // Simulate form submission
            alert(`Thank you for subscribing to our newsletter with email: ${email}`);
            
            // Clear the form
            emailInput.value = '';
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Set minimum date for check-in and check-out inputs
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    
    if (checkInInput && checkOutInput) {
        // Set minimum date to today
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayString = `${yyyy}-${mm}-${dd}`;
        
        checkInInput.setAttribute('min', todayString);
        
        // Update check-out min date when check-in date changes
        checkInInput.addEventListener('change', function() {
            checkOutInput.setAttribute('min', this.value);
            
            // If check-out date is before new check-in date, reset it
            if (checkOutInput.value && checkOutInput.value < this.value) {
                checkOutInput.value = '';
            }
        });
    }
    
    // Add animation when elements come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.destination-card, .package-card, .section-title, .team-member, .achievement-item, .gallery-item, .blog-post');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    document.querySelectorAll('.destination-card, .package-card, .section-title, .team-member, .achievement-item, .gallery-item, .blog-post').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();

    // Package Filter Functionality (packages.html)
    const packageFilterForm = document.getElementById('package-filter-form');
    const packageCards = document.querySelectorAll('.package-card');
    
    if (packageFilterForm && packageCards.length > 0) {
        packageFilterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const destinationFilter = document.getElementById('filter-destination').value;
            const durationFilter = document.getElementById('filter-duration').value;
            const budgetFilter = document.getElementById('filter-budget').value;
            
            packageCards.forEach(card => {
                let showCard = true;
                
                if (destinationFilter && card.dataset.region !== destinationFilter) {
                    showCard = false;
                }
                
                if (durationFilter && card.dataset.duration !== durationFilter) {
                    showCard = false;
                }
                
                if (budgetFilter && card.dataset.budget !== budgetFilter) {
                    showCard = false;
                }
                
                card.style.display = showCard ? 'block' : 'none';
            });
        });
    }
    
    // Package Detail Popup (packages.html)
    const packageDetailBtns = document.querySelectorAll('.package-details-btn');
    const packageDetailPopup = document.getElementById('package-detail-popup');
    
    if (packageDetailBtns.length > 0 && packageDetailPopup) {
        const closePackageDetail = document.getElementById('close-package-detail');
        const packageDetailContent = document.getElementById('package-detail-content');
        
        packageDetailBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const packageId = this.dataset.package;
                const packageDetailTemplate = document.getElementById(`${packageId}-detail`);
                
                if (packageDetailTemplate) {
                    packageDetailContent.innerHTML = packageDetailTemplate.innerHTML;
                    packageDetailPopup.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    
                    // Set up booking form submission
                    const bookingForm = packageDetailContent.querySelector(`#booking-form-${packageId}`);
                    if (bookingForm) {
                        bookingForm.addEventListener('submit', function(e) {
                            e.preventDefault();
                            alert('Thank you for your booking request! Our team will contact you shortly to confirm your reservation.');
                            packageDetailPopup.classList.remove('active');
                            document.body.style.overflow = 'auto';
                        });
                    }
                } else {
                    // If template doesn't exist, show a message
                    packageDetailContent.innerHTML = `
                        <h2>${packageId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
                        <p>Detailed information about this package will be available soon. Please contact us for more details.</p>
                        <button class="btn-primary" onclick="window.location.href='contact.html'">Contact Us</button>
                    `;
                    packageDetailPopup.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        if (closePackageDetail) {
            closePackageDetail.addEventListener('click', function() {
                packageDetailPopup.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
            
            packageDetailPopup.addEventListener('click', function(e) {
                if (e.target === packageDetailPopup) {
                    packageDetailPopup.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }
    
    // Gallery Filtering (gallery.html)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Lightbox Functionality (gallery.html)
    const lightbox = document.getElementById('gallery-lightbox');
    
    if (lightbox && galleryItems.length > 0) {
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        const lightboxPrev = lightbox.querySelector('.lightbox-prev');
        const lightboxNext = lightbox.querySelector('.lightbox-next');
        
        let currentIndex = 0;
        const visibleItems = () => Array.from(galleryItems).filter(item => item.style.display !== 'none');
        
        // Open lightbox when clicking on gallery item
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const items = visibleItems();
                currentIndex = items.indexOf(this);
                
                const img = this.querySelector('img');
                const caption = this.querySelector('.gallery-caption');
                
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;
                lightboxCaption.querySelector('h3').textContent = caption.querySelector('h3').textContent;
                lightboxCaption.querySelector('p').textContent = caption.querySelector('p').textContent;
                
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close lightbox
        if (lightboxClose) {
            lightboxClose.addEventListener('click', function() {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
            
            // Close lightbox when clicking outside the image
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    lightbox.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
        
        // Navigate to previous image
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', function() {
                const items = visibleItems();
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                
                const item = items[currentIndex];
                const img = item.querySelector('img');
                const caption = item.querySelector('.gallery-caption');
                
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;
                lightboxCaption.querySelector('h3').textContent = caption.querySelector('h3').textContent;
                lightboxCaption.querySelector('p').textContent = caption.querySelector('p').textContent;
            });
        }
        
        // Navigate to next image
        if (lightboxNext) {
            lightboxNext.addEventListener('click', function() {
                const items = visibleItems();
                currentIndex = (currentIndex + 1) % items.length;
                
                const item = items[currentIndex];
                const img = item.querySelector('img');
                const caption = item.querySelector('.gallery-caption');
                
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;
                lightboxCaption.querySelector('h3').textContent = caption.querySelector('h3').textContent;
                lightboxCaption.querySelector('p').textContent = caption.querySelector('p').textContent;
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft' && lightboxPrev) {
                lightboxPrev.click();
            } else if (e.key === 'ArrowRight' && lightboxNext) {
                lightboxNext.click();
            }
        });
    }
    
    // Contact Form Submission (contact.html)
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const inquiryType = document.getElementById('inquiry-type').value;
            const message = document.getElementById('message').value;
            
            // Validate form (basic validation)
            if (!name || !email || !subject || !inquiryType || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            alert(`Thank you for contacting us, ${name}! We have received your message and will get back to you shortly.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // FAQ Accordion (contact.html)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                // Toggle active class on the clicked header
                this.classList.toggle('active');
                
                // Toggle icon
                const icon = this.querySelector('.accordion-icon i');
                if (icon) {
                    if (icon.classList.contains('fa-plus')) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    } else {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                }
                
                // Toggle content visibility
                const content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        });
    }
    
    // Achievement Number Animation (about.html)
    const achievementNumbers = document.querySelectorAll('.achievement-number');
    
    if (achievementNumbers.length > 0) {
        let animated = false;
        
        function animateNumbers() {
            if (animated) return;
            
            achievementNumbers.forEach(number => {
                const target = parseInt(number.getAttribute('data-count').replace(/,/g, ''));
                let current = 0;
                const increment = Math.ceil(target / 50);
                const duration = 1500; // Animation duration in milliseconds
                const stepTime = Math.abs(Math.floor(duration / (target / increment)));
                
                const timer = setInterval(() => {
                    current += increment;
                    
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    let formattedValue = current.toString();
                    if (number.textContent.includes('+')) {
                        formattedValue += '+';
                    }
                    
                    number.textContent = formattedValue;
                }, stepTime);
            });
            
            animated = true;
        }
        
        // Check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Start animation when achievements section is in viewport
        function checkIfInView() {
            const achievements = document.querySelector('.achievements');
            if (achievements && isInViewport(achievements)) {
                animateNumbers();
                window.removeEventListener('scroll', checkIfInView);
            }
        }
        
        window.addEventListener('scroll', checkIfInView);
        checkIfInView(); // Check on page load
    }

    // Process URL parameters for packages page
    function processUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const destination = urlParams.get('destination');
        
        if (destination && window.location.pathname.includes('packages.html')) {
            const filterDestination = document.getElementById('filter-destination');
            
            if (filterDestination) {
                // Try to find a matching option
                const options = Array.from(filterDestination.options);
                const matchingOption = options.find(option => 
                    option.text.toLowerCase().includes(destination.toLowerCase())
                );
                
                if (matchingOption) {
                    filterDestination.value = matchingOption.value;
                    
                    // Trigger the filter
                    if (packageFilterForm) {
                        const submitEvent = new Event('submit');
                        packageFilterForm.dispatchEvent(submitEvent);
                    }
                }
            }
        }
    }
    
    // Process URL parameters on page load
    processUrlParams();
}); 