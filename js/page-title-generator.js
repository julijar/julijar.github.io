// page-title-generator.js - Dynamic Page Title Generator
(function() {
    'use strict';
    
    // Configuration object for page titles and descriptions
    const pageConfig = {
        // Default site info
        siteName: "Julija Rukanskaitė",
        siteSymbol: "☼",
        defaultTitle: "Product Designer",
        
        // Page-specific configurations
        pages: {
            // Main pages
            'index.html': {
                title: 'Product Designer',
                description: 'Design & Research for thoughtful automation & trust - Product designer focused on emerging technology',
                keywords: 'product design, UX design, emerging technology, automation, trust'
            },
            '': { // Root domain
                title: 'Product Designer',
                description: 'Design & Research for thoughtful automation & trust - Product designer focused on emerging technology',
                keywords: 'product design, UX design, emerging technology, automation, trust'
            },
            '/': { // Root path
                title: 'Product Designer',
                description: 'Design & Research for thoughtful automation & trust - Product designer focused on emerging technology',
                keywords: 'product design, UX design, emerging technology, automation, trust'
            },
            
            // About pages
            'bio.html': {
                title: 'Bio',
                description: 'Product designer and design researcher focused on design for trust, safety, and emerging technology',
                keywords: 'bio, about, designer background, experience'
            },
            'Bio.html': { // Handle case sensitivity
                title: 'Bio',
                description: 'Product designer and design researcher focused on design for trust, safety, and emerging technology',
                keywords: 'bio, about, designer background, experience'
            },
            
            // Services
            'services.html': {
                title: 'Services',
                description: 'Product design services - Discovery, Prototypes, Launch & Growth support',
                keywords: 'design services, UX consulting, product design, prototyping'
            },
            
            // Project pages
            'policykit.html': {
                title: 'PolicyKit Design',
                description: 'Redesign of a no-code Slack integration for online community governance',
                keywords: 'PolicyKit, community governance, Slack integration, no-code design'
            },
            'juni.html': {
                title: 'Juni Automations',
                description: 'End-to-end design of a no-code automated workflow builder for Juni fintech',
                keywords: 'Juni, fintech, automation, workflow builder, UX design'
            },
            'lips.html': {
                title: 'Lips Onboarding',
                description: 'End-to-end design of a progressive web app for wom*n and LGBTQ+ creators',
                keywords: 'Lips, PWA, LGBTQ+, creator platform, onboarding design'
            },
            'library-rituals.html': {
                title: 'Library Research',
                description: 'Service design research into reading rituals during Covid-19',
                keywords: 'library research, service design, Covid-19, reading rituals'
            },
            'arttice.html': {
                title: 'Arttice Platform',
                description: 'Platform design for networking and mapping cultural players and artists',
                keywords: 'Arttice, cultural platform, artist networking, platform design'
            },
            'thesis.html': {
                title: 'Object Detection Radio',
                description: 'A ludic device that sonifies machine learning prediction probabilities',
                keywords: 'thesis, object detection, machine learning, sonification'
            },
            'case-study.html': {
                title: 'Case Study',
                description: 'Product design case study by Julija Rukanskaitė',
                keywords: 'case study, design process, UX methodology'
            }
        }
    };

    /**
     * Get the current page filename
     * @returns {string} The current page filename
     */
    function getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        // Handle root paths
        if (!filename || filename === '' || path === '/') {
            return 'index.html';
        }
        
        return filename;
    }

    /**
     * Generate formatted page title
     * @param {string} page - Optional page filename, uses current page if not provided
     * @returns {string} Formatted page title
     */
    function generatePageTitle(page = null) {
        const currentPage = page || getCurrentPage();
        const pageData = pageConfig.pages[currentPage];
        
        if (pageData) {
            return `${pageConfig.siteName} ${pageConfig.siteSymbol} ${pageData.title} ${pageConfig.siteSymbol}`;
        }
        
        // Fallback for unknown pages
        return `${pageConfig.siteName} ${pageConfig.siteSymbol} ${pageConfig.defaultTitle} ${pageConfig.siteSymbol}`;
    }

    /**
     * Generate page description
     * @param {string} page - Optional page filename, uses current page if not provided
     * @returns {string} Page description
     */
    function generatePageDescription(page = null) {
        const currentPage = page || getCurrentPage();
        const pageData = pageConfig.pages[currentPage];
        
        return pageData ? pageData.description : 'Product designer focused on design for trust, safety, and emerging technology';
    }

    /**
     * Generate page keywords
     * @param {string} page - Optional page filename, uses current page if not provided
     * @returns {string} Page keywords
     */
    function generatePageKeywords(page = null) {
        const currentPage = page || getCurrentPage();
        const pageData = pageConfig.pages[currentPage];
        
        const baseKeywords = 'product design, UX design, UI design, design research, emerging technology, trust, safety';
        const pageKeywords = pageData ? pageData.keywords : '';
        
        return pageKeywords ? `${pageKeywords}, ${baseKeywords}` : baseKeywords;
    }

    /**
     * Set the page title dynamically
     * @param {string} page - Optional page filename, uses current page if not provided
     */
    function setPageTitle(page = null) {
        document.title = generatePageTitle(page);
    }

    /**
     * Get all page info for current page
     * @param {string} page - Optional page filename, uses current page if not provided
     * @returns {object} Object containing title, description, and keywords
     */
    function getPageInfo(page = null) {
        const currentPage = page || getCurrentPage();
        
        return {
            filename: currentPage,
            title: generatePageTitle(currentPage),
            description: generatePageDescription(currentPage),
            keywords: generatePageKeywords(currentPage),
            shortTitle: pageConfig.pages[currentPage]?.title || pageConfig.defaultTitle
        };
    }

    /**
     * Update meta tags with generated content
     */
    function updateMetaTags() {
        const info = getPageInfo();
        
        // Update title
        document.title = info.title;
        
        // Update or create meta description
        let descMeta = document.querySelector('meta[name="description"]');
        if (descMeta) {
            descMeta.setAttribute('content', info.description);
        } else {
            descMeta = document.createElement('meta');
            descMeta.setAttribute('name', 'description');
            descMeta.setAttribute('content', info.description);
            document.head.appendChild(descMeta);
        }
        
        // Update or create meta keywords
        let keywordsMeta = document.querySelector('meta[name="keywords"]');
        if (keywordsMeta) {
            keywordsMeta.setAttribute('content', info.keywords);
        } else {
            keywordsMeta = document.createElement('meta');
            keywordsMeta.setAttribute('name', 'keywords');
            keywordsMeta.setAttribute('content', info.keywords);
            document.head.appendChild(keywordsMeta);
        }
        
        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', info.title);
        
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', info.description);
        
        // Update Twitter Card tags
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) twitterTitle.setAttribute('content', info.title);
        
        const twitterDesc = document.querySelector('meta[name="twitter:description"]');
        if (twitterDesc) twitterDesc.setAttribute('content', info.description);
    }

    /**
     * Add a new page configuration
     * @param {string} filename - The filename (e.g., 'new-page.html')
     * @param {object} config - Page configuration object
     */
    function addPageConfig(filename, config) {
        pageConfig.pages[filename] = config;
    }

    /**
     * Get list of all configured pages
     * @returns {array} Array of page configurations
     */
    function getAllPages() {
        return Object.keys(pageConfig.pages).map(filename => ({
            filename,
            ...pageConfig.pages[filename],
            fullTitle: generatePageTitle(filename)
        }));
    }

    // Auto-initialize when DOM is ready
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', updateMetaTags);
        } else {
            updateMetaTags();
        }
    }

    // Expose public API
    window.PageTitleGenerator = {
        // Main functions
        generateTitle: generatePageTitle,
        generateDescription: generatePageDescription,
        generateKeywords: generatePageKeywords,
        setTitle: setPageTitle,
        getPageInfo: getPageInfo,
        updateMetaTags: updateMetaTags,
        
        // Utility functions
        getCurrentPage: getCurrentPage,
        addPageConfig: addPageConfig,
        getAllPages: getAllPages,
        
        // Configuration access
        config: pageConfig
    };

    // Auto-initialize
    init();

})();

// Example usage:
// console.log(PageTitleGenerator.generateTitle()); // "Julija Rukanskaitė ☼ Product Designer ☼"
// console.log(PageTitleGenerator.getPageInfo()); // Full page info object
// PageTitleGenerator.setTitle(); // Updates document.title
// PageTitleGenerator.updateMetaTags(); // Updates all meta tags