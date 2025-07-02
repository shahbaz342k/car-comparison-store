/* eslint-disable react/prop-types */
import { useEffect } from "react";

// SEO Component for meta tags
const SEOHead = ({ title, description, cars = [] }) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    try {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = description;
    } catch (error) {
      console.warn('Could not update meta description:', error);
    }

    // Add Open Graph tags for social sharing
    try {
      const ogTags = [
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'CarCompare Dashboard' }
      ];

      ogTags.forEach(({ property, content }) => {
        let ogTag = document.querySelector(`meta[property="${property}"]`);
        if (!ogTag) {
          ogTag = document.createElement('meta');
          ogTag.setAttribute('property', property);
          document.head.appendChild(ogTag);
        }
        ogTag.content = content;
      });
    } catch (error) {
      console.warn('Could not update Open Graph tags:', error);
    }

    // Add structured data for SEO
    try {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Car Comparison Dashboard",
        "description": description,
        "applicationCategory": "Automotive",
        "operatingSystem": "Web Browser",
        "url": window.location.href,
        "dateModified": new Date().toISOString(),
        "offers": cars.length > 0 ? {
          "@type": "AggregateOffer",
          "lowPrice": Math.min(...cars.map(car => car.price)),
          "highPrice": Math.max(...cars.map(car => car.price)),
          "priceCurrency": "USD",
          "offerCount": cars.length
        } : undefined
      };

      let scriptTag = document.querySelector('script[type="application/ld+json"][data-seo="carcompare"]');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        scriptTag.setAttribute('data-seo', 'carcompare');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData, null, 2);
      
      // Log for testing purposes
      console.log('SEO Data Updated:', {
        title,
        description,
        structuredData
      });
    } catch (error) {
      console.warn('Could not update structured data:', error);
    }
  }, [title, description, cars]);

  return null;
};

  export default SEOHead;