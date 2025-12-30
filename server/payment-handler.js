// DUNYA Catering Payment Handler
// Full-stack backend server with proper configuration management

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const { getConfig } = require('../config/app.config.js');

const config = getConfig();
const stripe = require('stripe')(config.stripeSecretKey);
const app = express();

// Security middleware
app.use(helmet());
app.use(compression());

// Logging middleware
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// CORS middleware
app.use(cors(config.cors));

// Body parsing middleware
app.use('/webhook', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../dist')));
}

// Create payment intent endpoint
app.post('/create-payment-intent', async(req, res) => {
    try {
        const { amount, currency = 'usd', booking_data } = req.body;

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe expects cents
            currency: currency,
            metadata: {
                event_date: booking_data.eventDate,
                event_type: booking_data.eventType,
                guests: booking_data.guests.toString(),
                package: booking_data.package,
                customer_name: booking_data.name,
                customer_email: booking_data.email,
                customer_phone: booking_data.phone
            }
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
    } catch (error) {
        res.status(400).send({
            error: {
                message: error.message
            }
        });
    }
});

// Webhook endpoint to handle payment confirmations
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.log('Webhook signature verification failed.', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

        // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object;
            console.log('PaymentIntent was successful!');

            // Here you would typically:
            // 1. Save booking to database
            // 2. Send confirmation email to customer
            // 3. Send notification to restaurant staff
            // 4. Update inventory/availability

            handleSuccessfulPayment(paymentIntent);
            break;
        }
        case 'payment_intent.payment_failed': {
            const failedPayment = event.data.object;
            console.log('PaymentIntent failed:', failedPayment.last_payment_error?.message);

            // Handle failed payment
            handleFailedPayment(failedPayment);
            break;
        }
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
});

// Handle successful payment
async function handleSuccessfulPayment(paymentIntent) {
    const bookingData = paymentIntent.metadata;

    console.log('Processing successful booking:', {
        amount: paymentIntent.amount / 100,
        customer: bookingData.customer_name,
        event_date: bookingData.event_date,
        guests: bookingData.guests,
        package: bookingData.package
    });

    // Here you would typically:
    // 1. Save to database
    // 2. Send confirmation emails
    // 3. Update calendar/availability

    // Simulate email sending
    await sendConfirmationEmail(bookingData, paymentIntent.amount / 100);

    // Simulate internal notification
    await notifyRestaurantStaff(bookingData, paymentIntent.amount / 100);
}

// Handle failed payment
async function handleFailedPayment(paymentIntent) {
    const bookingData = paymentIntent.metadata;

    console.log('Processing failed payment:', {
        customer: bookingData.customer_name,
        error: paymentIntent.last_payment_error?.message
    });

    // Here you would typically send a payment failed email
    // and possibly retry the payment or contact the customer
}

// Simulate sending confirmation email
async function sendConfirmationEmail(bookingData, amount) {
    console.log(`
    ========================================
    CONFIRMATION EMAIL SENT TO: ${bookingData.customer_email}
    ========================================
    
    Dear ${bookingData.customer_name},
    
    Thank you for choosing DUNYA Catering!
    
    Your booking has been confirmed:
    
    Event Date: ${bookingData.event_date}
    Event Type: ${bookingData.event_type}
    Number of Guests: ${bookingData.guests}
    Package: ${bookingData.package}
    Amount Paid: $${amount.toFixed(2)}
    
    We will contact you within 24 hours to finalize all details.
    
    Best regards,
    DUNYA Catering Team
    ========================================
    `);
}

// Simulate notifying restaurant staff
async function notifyRestaurantStaff(bookingData, amount) {
    console.log(`
    ========================================
    STAFF NOTIFICATION
    ========================================
    
    NEW BOOKING RECEIVED!
    
    Customer: ${bookingData.customer_name}
    Email: ${bookingData.customer_email}
    Phone: ${bookingData.customer_phone}
    Event Date: ${bookingData.event_date}
    Event Type: ${bookingData.event_type}
    Guests: ${bookingData.guests}
    Package: ${bookingData.package}
    Payment: $${amount.toFixed(2)} received
    
    Action Required: Contact customer within 24 hours
    ========================================
    `);
}

// Get booking details endpoint (for admin panel)
app.get('/bookings', async(req, res) => {
    // In production, this would query your database
    // For demo purposes, return mock data
    res.json({
        bookings: [
            {
                id: 'booking_001',
                customer_name: 'John Doe',
                event_date: '2024-12-15',
                event_type: 'wedding',
                guests: 150,
                package: 'luxury',
                amount_paid: 11687.5,
                status: 'confirmed'
            }
        ]
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        version: require('../package.json').version
    });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
}

// Error handling middleware
app.use((err, req, res) => {
    console.error('Error:', err);
    res.status(500).json({
        error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = config.port;

const server = app.listen(PORT, () => {
    console.log(`
    ========================================
    🍽️  DUNYA Catering Server Running
    ========================================
    
    Environment: ${process.env.NODE_ENV || 'development'}
    Server: http://localhost:${PORT}
    ${process.env.NODE_ENV !== 'production' ? `Frontend: http://localhost:${config.clientPort || 3001}` : ''}
    
    API Endpoints:
    POST /create-payment-intent
    POST /webhook
    GET  /bookings
    GET  /health
    
    ${process.env.NODE_ENV === 'production' ? 'Production mode - serving static files' : 'Development mode - CORS enabled'}
    ========================================
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});

module.exports = app;
