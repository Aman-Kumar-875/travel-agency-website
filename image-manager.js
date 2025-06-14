// // Image registry with fallbacks
// const ImageRegistry = {
//     // Hero and banner backgrounds
//     'hero-bg': {
//         remote: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3',
//         local: 'images/hero-bg.jpg',
//         fallback: 'linear-gradient(135deg, #1e5799 0%, #207cca 50%, #2989d8 100%)'
//     },
//     'about-banner': {
//         remote: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0',
//         local: 'images/about-bg.jpg',
//         fallback: 'linear-gradient(135deg, #603813 0%, #b29f94 100%)'
//     },
//     'destinations-banner': {
//         remote: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da',
//         local: 'images/destinations-bg.jpg',
//         fallback: 'linear-gradient(135deg, #3498db 0%, #2c3e50 100%)'
//     },
//     'packages-banner': {
//         remote: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d',
//         local: null,
//         fallback: 'linear-gradient(135deg, #2980b9 0%, #6dd5fa 100%)'
//     },
//     'gallery-banner': {
//         remote: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3',
//         local: null,
//         fallback: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)'
//     },
//     'blog-banner': {
//         remote: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1',
//         local: null,
//         fallback: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)'
//     },
//     'contact-banner': {
//         remote: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a',
//         local: null,
//         fallback: 'linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%)'
//     },
//     'newsletter-bg': {
//         remote: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0',
//         local: null,
//         fallback: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))'
//     },
    
//     // Destinations
//     'taj-mahal': {
//         remote: 'https://images.unsplash.com/photo-1548013146-72479768bada',
//         local: 'images/taj-mahal.jpg',
//         fallback: 'https://placehold.co/800x600/e8d2a9/333333?text=Taj+Mahal'
//     },
//     'jaipur': {
//         remote: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66',
//         local: null,
//         fallback: 'https://placehold.co/800x600/f8a978/333333?text=Jaipur'
//     },
//     'goa': {
//         remote: 'https://images.unsplash.com/photo-1580741186434-c5e9ca5099f2',
//         local: null,
//         fallback: 'https://placehold.co/800x600/a3d9ff/333333?text=Goa+Beaches'
//     },
//     'kerala': {
//         remote: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23',
//         local: null,
//         fallback: 'https://placehold.co/800x600/7fcd91/333333?text=Kerala+Backwaters'
//     },
//     'varanasi': {
//         remote: 'https://images.unsplash.com/photo-1588416499018-d8c621e1d2c1',
//         local: null,
//         fallback: 'https://placehold.co/800x600/ffb347/333333?text=Varanasi+Ghats'
//     },
//     'darjeeling': {
//         remote: 'https://images.unsplash.com/photo-1591089101324-2280d9260000',
//         local: null,
//         fallback: 'https://placehold.co/800x600/b5e8a5/333333?text=Darjeeling+Tea+Gardens'
//     },
    
//     // Packages
//     'golden-triangle': {
//         remote: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da',
//         local: null,
//         fallback: 'https://placehold.co/800x600/f5d76e/333333?text=Golden+Triangle+Tour'
//     },
//     'kerala-tour': {
//         remote: 'https://images.unsplash.com/photo-1602301413679-62c8f733feb1',
//         local: null,
//         fallback: 'https://placehold.co/800x600/7fcd91/333333?text=Kerala+Backwaters+Tour'
//     },
//     'rajasthan-tour': {
//         remote: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00',
//         local: null,
//         fallback: 'https://placehold.co/800x600/f8a978/333333?text=Rajasthan+Heritage+Tour'
//     }
// };

// Cache for image status
const ImageCache = {
    status: {},
    
    // Set image status
    setStatus: function(key, isLoaded) {
        this.status[key] = isLoaded;
        // Also store in localStorage for persistence
        try {
            const cache = JSON.parse(localStorage.getItem('wanderlust_image_cache') || '{}');
            cache[key] = isLoaded;
            localStorage.setItem('wanderlust_image_cache', JSON.stringify(cache));
        } catch (e) {
            console.log('Error storing image cache in localStorage', e);
        }
    },
    
    // Get image status
    getStatus: function(key) {
        // Check memory cache first
        if (this.status[key] !== undefined) {
            return this.status[key];
        }
        
        // Try to get from localStorage
        try {
            const cache = JSON.parse(localStorage.getItem('wanderlust_image_cache') || '{}');
            if (cache[key] !== undefined) {
                this.status[key] = cache[key];
                return cache[key];
            }
        } catch (e) {
            console.log('Error retrieving image cache from localStorage', e);
        }
        
        return null; // Status unknown
    },
    
    // Load cache from localStorage
    loadCache: function() {
        try {
            const cache = JSON.parse(localStorage.getItem('wanderlust_image_cache') || '{}');
            this.status = cache;
        } catch (e) {
            console.log('Error loading image cache from localStorage', e);
        }
    }
};

// Image Manager
const ImageManager = {
    // Initialize the image manager
    init: function() {
        // Load cache from localStorage
        ImageCache.loadCache();
        
        // Preload key images
        this.preloadKeyImages();
        
        // Fix all images on the page
        this.fixAllImages();
        
        // Fix all background images
        this.fixAllBackgroundImages();
    },
    
    // Preload key images
    preloadKeyImages: function() {
        Object.keys(ImageRegistry).forEach(key => {
            const entry = ImageRegistry[key];
            
            // Skip if we already know the status
            if (ImageCache.getStatus(key) !== null) {
                return;
            }
            
            // Try local image first if available
            if (entry.local) {
                const img = new Image();
                img.onload = () => {
                    ImageCache.setStatus(key, true);
                };
                img.onerror = () => {
                    // If local fails, try remote
                    this.tryRemoteImage(key);
                };
                img.src = entry.local;
            } else {
                // No local image, try remote
                this.tryRemoteImage(key);
            }
        });
    },
    
    // Try loading a remote image
    tryRemoteImage: function(key) {
        const entry = ImageRegistry[key];
        
        if (!entry.remote) {
            ImageCache.setStatus(key, false);
            return;
        }
        
        const img = new Image();
        img.onload = () => {
            ImageCache.setStatus(key, true);
        };
        img.onerror = () => {
            ImageCache.setStatus(key, false);
            console.log(`Failed to load image: ${key}`);
        };
        img.src = entry.remote;
    },
    
    // Get the best available image URL for a key
    getBestImageUrl: function(key) {
        const entry = ImageRegistry[key];
        if (!entry) {
            console.log(`No image entry found for key: ${key}`);
            return null;
        }
        
        const status = ImageCache.getStatus(key);
        
        // If we know the local image works, use it
        if (entry.local && (status === true || status === null)) {
            return entry.local;
        }
        
        // If we know the remote image works, use it
        if (status === true || status === null) {
            return entry.remote;
        }
        
        // Both failed or status unknown, use fallback
        return entry.fallback;
    },
    
    // Fix all images on the page
    fixAllImages: function() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Skip images that already have error handlers
            if (img.hasAttribute('data-error-handled')) return;
            
            // Mark image as having error handler
            img.setAttribute('data-error-handled', 'true');
            
            // Add error event handler
            img.addEventListener('error', function() {
                const altText = this.alt || 'Image';
                let fallbackUrl;
                
                // Try to find a matching image in our registry
                let matchingKey = null;
                
                // Check if the image URL matches any of our registry entries
                const src = this.src.toLowerCase();
                Object.keys(ImageRegistry).forEach(key => {
                    const entry = ImageRegistry[key];
                    if (entry.remote && src.includes(entry.remote.toLowerCase())) {
                        matchingKey = key;
                    }
                    if (entry.local && src.includes(entry.local.toLowerCase())) {
                        matchingKey = key;
                    }
                });
                
                // If we found a matching key, use its fallback
                if (matchingKey && ImageRegistry[matchingKey].fallback) {
                    fallbackUrl = ImageRegistry[matchingKey].fallback;
                } else {
                    // Otherwise, determine fallback based on alt text
                    if (altText.toLowerCase().includes('taj mahal') || altText.toLowerCase().includes('agra')) {
                        fallbackUrl = 'https://placehold.co/800x600/e8d2a9/333333?text=Taj+Mahal';
                    } else if (altText.toLowerCase().includes('jaipur') || altText.toLowerCase().includes('rajasthan')) {
                        fallbackUrl = 'https://placehold.co/800x600/f8a978/333333?text=Jaipur';
                    } else if (altText.toLowerCase().includes('goa') || altText.toLowerCase().includes('beach')) {
                        fallbackUrl = 'https://placehold.co/800x600/a3d9ff/333333?text=Goa+Beaches';
                    } else if (altText.toLowerCase().includes('kerala') || altText.toLowerCase().includes('backwater')) {
                        fallbackUrl = 'https://placehold.co/800x600/7fcd91/333333?text=Kerala+Backwaters';
                    } else if (altText.toLowerCase().includes('varanasi') || altText.toLowerCase().includes('ghat')) {
                        fallbackUrl = 'https://placehold.co/800x600/ffb347/333333?text=Varanasi+Ghats';
                    } else if (altText.toLowerCase().includes('darjeeling') || altText.toLowerCase().includes('tea')) {
                        fallbackUrl = 'https://placehold.co/800x600/b5e8a5/333333?text=Darjeeling+Tea+Gardens';
                    } else if (this.classList.contains('post-image')) {
                        fallbackUrl = 'https://placehold.co/800x400/f5f5f5/333333?text=Blog+Post+Image';
                    } else if (this.classList.contains('recent-post-img')) {
                        fallbackUrl = 'https://placehold.co/70x70/f5f5f5/333333?text=Post';
                    } else if (altText.toLowerCase().includes('team') || this.src.includes('randomuser.me')) {
                        fallbackUrl = 'https://placehold.co/200x200/e0e0e0/333333?text=Team+Member';
                    } else {
                        fallbackUrl = `https://placehold.co/800x600/f5f5f5/333333?text=${encodeURIComponent(altText)}`;
                    }
                }
                
                console.log(`Image failed to load: ${this.src}`);
                console.log(`Replacing with fallback: ${fallbackUrl}`);
                
                this.src = fallbackUrl;
            });
            
            // Force reload for images that might have already failed
            if (img.complete && (img.naturalWidth === 0 || img.naturalHeight === 0)) {
                const event = new Event('error');
                img.dispatchEvent(event);
            }
        });
    },
    
    // Fix all background images
    fixAllBackgroundImages: function() {
        // Common elements with background images
        const elementsWithBg = [
            { selector: '.hero', key: 'hero-bg' },
            { selector: '.page-banner', key: null }, // Will be determined based on page
            { selector: '.newsletter', key: 'newsletter-bg' },
            { selector: '.testimonial-slide', key: null },
            { selector: '.destination-card', key: null },
            { selector: '.package-card', key: null }
        ];
        
        // Determine page-banner key based on current page
        const path = window.location.pathname.toLowerCase();
        let pageBannerKey = null;
        
        if (path.includes('about')) {
            pageBannerKey = 'about-banner';
        } else if (path.includes('destinations')) {
            pageBannerKey = 'destinations-banner';
        } else if (path.includes('packages')) {
            pageBannerKey = 'packages-banner';
        } else if (path.includes('gallery')) {
            pageBannerKey = 'gallery-banner';
        } else if (path.includes('blog')) {
            pageBannerKey = 'blog-banner';
        } else if (path.includes('contact')) {
            pageBannerKey = 'contact-banner';
        }
        
        // Process each element type
        elementsWithBg.forEach(item => {
            const elements = document.querySelectorAll(item.selector);
            
            elements.forEach(el => {
                // Skip elements already checked
                if (el.hasAttribute('data-bg-checked')) return;
                el.setAttribute('data-bg-checked', 'true');
                
                let key = item.key;
                
                // For page-banner, use the determined key
                if (item.selector === '.page-banner' && pageBannerKey) {
                    key = pageBannerKey;
                }
                
                // For cards, try to determine the key based on content
                if (!key && (item.selector === '.destination-card' || item.selector === '.package-card')) {
                    const cardText = el.textContent.toLowerCase();
                    
                    if (cardText.includes('taj') || cardText.includes('agra')) {
                        key = 'taj-mahal';
                    } else if (cardText.includes('jaipur') || cardText.includes('rajasthan')) {
                        key = 'jaipur';
                    } else if (cardText.includes('goa') || cardText.includes('beach')) {
                        key = 'goa';
                    } else if (cardText.includes('kerala') || cardText.includes('backwater')) {
                        key = 'kerala';
                    } else if (cardText.includes('varanasi') || cardText.includes('ghat')) {
                        key = 'varanasi';
                    } else if (cardText.includes('darjeeling') || cardText.includes('tea')) {
                        key = 'darjeeling';
                    } else if (cardText.includes('golden triangle')) {
                        key = 'golden-triangle';
                    } else if (cardText.includes('kerala tour')) {
                        key = 'kerala-tour';
                    } else if (cardText.includes('rajasthan tour') || cardText.includes('heritage tour')) {
                        key = 'rajasthan-tour';
                    }
                }
                
                // If we have a key, try to use the best image
                if (key && ImageRegistry[key]) {
                    const entry = ImageRegistry[key];
                    const status = ImageCache.getStatus(key);
                    
                    // If we know the image fails, use fallback immediately
                    if (status === false) {
                        this.applyBackgroundFallback(el, entry.fallback, item.selector);
                        return;
                    }
                    
                    // Try to load the best image
                    const bestUrl = this.getBestImageUrl(key);
                    
                    if (bestUrl) {
                        // If it's a gradient fallback
                        if (bestUrl.startsWith('linear-gradient')) {
                            this.applyBackgroundFallback(el, bestUrl, item.selector);
                        } else {
                            // It's an image URL, check if it loads
                            const testImg = new Image();
                            testImg.onload = () => {
                                // Image loaded successfully, apply it
                                el.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${bestUrl}')`;
                                ImageCache.setStatus(key, true);
                            };
                            testImg.onerror = () => {
                                // Image failed, use fallback
                                this.applyBackgroundFallback(el, entry.fallback, item.selector);
                                ImageCache.setStatus(key, false);
                            };
                            testImg.src = bestUrl;
                        }
                    }
                } else {
                    // No key found, check the current background image
                    const bgStyle = window.getComputedStyle(el).backgroundImage;
                    const bgUrl = bgStyle.match(/url\(['"]?([^'"]+)['"]?\)/);
                    
                    if (bgUrl && bgUrl[1]) {
                        // Test if the current background image loads
                        const testImg = new Image();
                        testImg.onload = () => {
                            // Background image loaded successfully, no action needed
                        };
                        testImg.onerror = () => {
                            // Background image failed, use a generic fallback
                            let fallbackBg;
                            
                            if (item.selector === '.hero') {
                                fallbackBg = 'linear-gradient(135deg, #1e5799 0%, #207cca 50%, #2989d8 100%)';
                            } else if (item.selector === '.page-banner') {
                                fallbackBg = 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)';
                            } else if (item.selector === '.newsletter') {
                                fallbackBg = 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))';
                            } else if (item.selector === '.testimonial-slide') {
                                fallbackBg = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
                            } else {
                                fallbackBg = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
                            }
                            
                            this.applyBackgroundFallback(el, fallbackBg, item.selector);
                        };
                        testImg.src = bgUrl[1];
                    }
                }
            });
        });
    },
    
    // Apply background fallback
    applyBackgroundFallback: function(element, fallback, selector) {
        console.log(`Applying background fallback: ${fallback}`);
        element.style.backgroundImage = fallback;
        
        // If it's a banner or hero, ensure text is visible
        if (selector === '.hero' || selector === '.page-banner' || selector === '.newsletter') {
            const textElements = element.querySelectorAll('h1, h2, p');
            textElements.forEach(text => {
                text.style.color = 'white';
                text.style.textShadow = '1px 1px 3px rgba(0, 0, 0, 0.7)';
            });
        }
    }
};

// Initialize the image manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    ImageManager.init();
});

// Export the ImageManager for use in other scripts
window.ImageManager = ImageManager; 