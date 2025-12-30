const request = require('supertest');
const app = require('../server/payment-handler');

describe('DUNYA Catering Server', () => {
    describe('Health Check', () => {
        test('GET /health should return server status', async () => {
            const response = await request(app).get('/health').expect(200);

            expect(response.body).toHaveProperty('status', 'healthy');
            expect(response.body).toHaveProperty('timestamp');
            expect(response.body).toHaveProperty('environment', 'test');
            expect(response.body).toHaveProperty('version');
        });
    });

    describe('Payment Intent Creation', () => {
        test('POST /create-payment-intent should create payment intent', async () => {
            const bookingData = global.testHelpers.mockBookingData;

            const response = await request(app)
                .post('/create-payment-intent')
                .send({
                    amount: 100.0,
                    currency: 'usd',
                    booking_data: bookingData
                })
                .expect(200);

            expect(response.body).toHaveProperty('clientSecret');
            expect(response.body).toHaveProperty('paymentIntentId');
        });

        test('POST /create-payment-intent should handle missing data', async () => {
            const response = await request(app).post('/create-payment-intent').send({}).expect(400);

            expect(response.body).toHaveProperty('error');
        });
    });

    describe('Bookings', () => {
        test('GET /bookings should return booking data', async () => {
            const response = await request(app).get('/bookings').expect(200);

            expect(response.body).toHaveProperty('bookings');
            expect(Array.isArray(response.body.bookings)).toBe(true);
        });
    });

    describe('Error Handling', () => {
        test('should return 404 for unknown routes', async () => {
            const response = await request(app).get('/unknown-route').expect(404);

            expect(response.body).toHaveProperty('error', 'Route not found');
        });
    });
});
