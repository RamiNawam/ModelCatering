// Jest setup file for DUNYA Catering tests
process.env.NODE_ENV = 'test';

// Set test environment variables
process.env.STRIPE_PUBLISHABLE_KEY = 'pk_test_test_key';
process.env.STRIPE_SECRET_KEY = 'sk_test_test_key';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_secret';
process.env.PORT = '3002';

// Global test timeout
jest.setTimeout(10000);

// Mock console methods in tests
global.console = {
    ...console
    // Uncomment to hide console.log in tests
    // log: jest.fn(),
    // warn: jest.fn(),
    // error: jest.fn(),
};

// Global test helpers
global.testHelpers = {
    mockBookingData: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        eventDate: '2024-12-15',
        eventType: 'wedding',
        guests: '100',
        package: 'premium',
        message: 'Special dietary requirements'
    },

    mockStripeCard: {
        number: '4242424242424242',
        exp_month: 12,
        exp_year: 2025,
        cvc: '123'
    }
};
