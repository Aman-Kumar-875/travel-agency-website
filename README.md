# Wanderlust Travels - Travel Agency Website

A responsive travel agency website showcasing destinations and travel packages in India.

## Features

- Responsive design that works on all device sizes
- Navigation menu with active state highlighting
- Search destination popup form on the homepage
- Package filtering on the packages page
- Gallery filtering and lightbox on the gallery page
- Contact form with validation
- FAQ accordion on the contact page
- Newsletter subscription form
- Testimonial slider
- Smooth scrolling for anchor links
- Animations for various elements
- Form validation and submission handling

## Pages

1. **Homepage (index.html)**: Features a search destination popup form, popular destinations in India, and travel packages.
2. **Destinations Page (destinations.html)**: Showcases various destinations in India with detailed information.
3. **Packages Page (packages.html)**: Displays travel packages with filtering options and detailed package information.
4. **About Page (about.html)**: Provides information about the travel agency, its mission, vision, team, and achievements.
5. **Gallery Page (gallery.html)**: Features a photo gallery with filtering options and a lightbox for viewing images.
6. **Blog Page (blog.html)**: Contains travel blog posts with a sidebar for search, recent posts, categories, and tags.
7. **Contact Page (contact.html)**: Includes a contact form, contact information, location map, and FAQ section.

## Image Handling

This website uses images from Unsplash. If you encounter issues with images not loading:

1. **Centralized Image Management**: The website includes a comprehensive image management system (`image-manager.js`) that:
   - Maintains a registry of all key images with remote URLs, local paths, and fallback options
   - Implements a caching system that remembers image load status across page visits using localStorage
   - Preloads key images to check availability
   - Automatically replaces broken images with appropriate placeholders
   - Provides themed gradient fallbacks for background images
   - Ensures text remains visible even when background images fail to load
   - Intelligently selects the best available image source (local → remote → fallback)

2. **Local Images**: For production use, it's recommended to download the images and store them locally in the `images` directory. Then update the image registry in `image-manager.js`. We've already downloaded some key images as examples:
   - `images/hero-bg.jpg`: Hero section background
   - `images/taj-mahal.jpg`: Taj Mahal destination image

3. **Image Registry**: The image registry in `image-manager.js` can be easily extended with new entries following this format:
   ```javascript
   'image-key': {
       remote: 'https://example.com/image.jpg',
       local: 'images/local-image.jpg', // or null if no local version exists
       fallback: 'https://placehold.co/800x600/color/text?text=Fallback+Text'
   }
   ```

4. **Fallback Strategy**: The system uses a multi-tier fallback approach:
   - First tries local images if available
   - Then tries remote Unsplash images
   - Falls back to themed placeholders from placehold.co
   - For background images, uses themed CSS gradients as a final fallback

5. **Adding New Images**: When adding new images to the website:
   - Add an entry to the ImageRegistry in `image-manager.js`
   - Consider downloading a local copy for reliability
   - Provide appropriate fallback options
   - Use semantic keys that describe the image content

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- Font Awesome for icons
- Google Maps for the location map

## Browser Compatibility

The website is compatible with:
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Safari (latest)
- Microsoft Edge (latest)
- Opera (latest)

## Setup Instructions

1. Clone or download the repository
2. Open any HTML file in a web browser to view the website
3. No server or build process is required as this is a static website

## Credits

- Images: [Unsplash](https://unsplash.com)
- Icons: [Font Awesome](https://fontawesome.com)
- Fonts: Google Fonts 