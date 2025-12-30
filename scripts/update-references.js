#!/usr/bin/env node
// Script to update asset references in HTML for production builds

const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '../dist');
const indexPath = path.join(distPath, 'index.html');

console.log('🔧 Updating asset references for production build...');

try {
    // Read the HTML file
    let html = fs.readFileSync(indexPath, 'utf8');

    // Update CSS reference to minified version
    html = html.replace(
        '<link rel="stylesheet" href="styles.css">',
        '<link rel="stylesheet" href="styles.min.css">'
    );

    // Update JS reference to minified version
    html = html.replace(
        '<script src="script.js"></script>',
        '<script src="script.min.js"></script>'
    );

    // Add cache busting timestamp
    const timestamp = Date.now();
    html = html.replace('href="styles.min.css"', `href="styles.min.css?v=${timestamp}"`);
    html = html.replace('src="script.min.js"', `src="script.min.js?v=${timestamp}"`);

    // Add production meta tags
    const metaTags = `    <meta name="robots" content="index, follow">
    <meta name="author" content="DUNYA Catering">
    <meta name="description" content="Professional catering services for all occasions. Book your event with DUNYA Catering - premium quality, exceptional service.">
    <meta property="og:title" content="DUNYA - Premium Catering Services">
    <meta property="og:description" content="Exquisite catering for every occasion. From intimate gatherings to grand celebrations.">
    <meta property="og:type" content="website">
    <meta property="og:image" content="/og-image.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="DUNYA - Premium Catering Services">
    <meta name="twitter:description" content="Exquisite catering for every occasion. Professional service, premium quality.">`;

    html = html.replace(
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        `<meta name="viewport" content="width=device-width, initial-scale=1.0">
${metaTags}`
    );

    // Write the updated HTML
    fs.writeFileSync(indexPath, html);

    console.log('✅ Asset references updated successfully!');
    console.log('   - CSS: styles.css → styles.min.css');
    console.log('   - JS: script.js → script.min.js');
    console.log('   - Added cache busting parameters');
    console.log('   - Added SEO meta tags');
} catch (error) {
    console.error('❌ Error updating asset references:', error.message);
    process.exit(1);
}
