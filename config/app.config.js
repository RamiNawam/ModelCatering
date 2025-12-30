// DUNYA Catering Application Configuration
module.exports = {
    development: {
        port: process.env.PORT || 3000,
        clientPort: 3001,
        stripePublishableKey:
            process.env.STRIPE_PUBLISHABLE_KEY ||
            'pk_test_51234567890123456789012345678901234567890123456789012345678901234567890123456789',
        stripeSecretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_YOUR_STRIPE_SECRET_KEY_HERE',
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
        cors: {
            origin: ['http://localhost:3001', 'http://127.0.0.1:3001'],
            credentials: true
        },
        database: {
            // Add database configuration when needed
            // url: process.env.DATABASE_URL || 'mongodb://localhost:27017/dunya-catering'
        }
    },

    production: {
        port: process.env.PORT || 8080,
        stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        stripeSecretKey: process.env.STRIPE_SECRET_KEY,
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
        cors: {
            origin: process.env.ALLOWED_ORIGINS?.split(',') || ['https://yourdomain.com'],
            credentials: true
        },
        database: {
            // Production database configuration
            // url: process.env.DATABASE_URL
        }
    },

    test: {
        port: 3002,
        stripePublishableKey: 'pk_test_test_key',
        stripeSecretKey: 'sk_test_test_key',
        webhookSecret: 'whsec_test_secret',
        cors: {
            origin: '*',
            credentials: false
        }
    }
};

// Get configuration for current environment
const getConfig = () => {
    const env = process.env.NODE_ENV || 'development';
    return module.exports[env];
};

module.exports.getConfig = getConfig;
