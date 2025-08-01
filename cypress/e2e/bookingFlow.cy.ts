import { generateBookingData } from '../support/utils';
import { getAuthToken } from '../support/auth';



describe('Restful Booker API - Booking, update, delete', () => {
    const baseUrl = Cypress.env('apiBaseUrl');
    let token: string;
    let createdBookings: number[] = [];

    beforeEach(() => {
        getAuthToken().then((authToken) => {
            token = authToken;
        });
    });

    afterEach(() => {
        // Cleanup created bookings
        createdBookings.forEach((id) => {
            cy.apiRequest('DELETE', `${baseUrl}/booking/${id}`, {}, {
                Cookie: `token=${token}`
            }).then((res) => {
                expect([200, 201, 404]).to.include(res.status);
            });
        });
        createdBookings = [];
    });

    it('should create and retrieve a booking | POST and GET', () => {
        const bookingData = generateBookingData();

        cy.apiRequest('POST', `${baseUrl}/booking`, bookingData).then((res) => {
            expect(res.status).to.eq(200);
            const bookingId = res.body.bookingid;
            createdBookings.push(bookingId);

            cy.apiRequest('GET', `${baseUrl}/booking/${bookingId}`).then((getRes) => {
                expect(getRes.status).to.eq(200);
                expect(getRes.body).to.deep.equal(bookingData);
            });
        });
    });

    it('should update a booking | POST and PATCH ', () => {
        const bookingData = generateBookingData();
        const updatedData = generateBookingData({ firstname: 'UpdatedName' });

        cy.apiRequest('POST', `${baseUrl}/booking`, bookingData).then((res) => {
            const bookingId = res.body.bookingid;
            createdBookings.push(bookingId);

            cy.apiRequest('PATCH', `${baseUrl}/booking/${bookingId}`, updatedData, {
                Cookie: `token=${token}`
            }).then((updateRes) => {
                expect(updateRes.status).to.eq(200);
                expect(updateRes.body.firstname).to.eq('UpdatedName');
            });
        });
    });

    it('should return 403 when updating without token | POST and PUT', () => {
        const bookingData = generateBookingData();

        cy.apiRequest('POST', `${baseUrl}/booking`, bookingData).then((res) => {
            const bookingId = res.body.bookingid;
            createdBookings.push(bookingId);

            cy.apiRequest('PUT', `${baseUrl}/booking/${bookingId}`, {
                ...bookingData,
                firstname: 'Unauthorized Attempt'
            }).then((unauthRes) => {
                expect(unauthRes.status).to.eq(403);
            });
        });
    });

    it('should delete a booking | POST and DELETE and GET', () => {
        const bookingData = generateBookingData();

        cy.apiRequest('POST', `${baseUrl}/booking`, bookingData).then((res) => {
            const bookingId = res.body.bookingid;

            cy.apiRequest('DELETE', `${baseUrl}/booking/${bookingId}`, {}, {
                Cookie: `token=${token}`
            }).then((delRes) => {
                expect(delRes.status).to.eq(201);

                cy.apiRequest('GET', `${baseUrl}/booking/${bookingId}`).then((getRes) => {
                    expect(getRes.status).to.eq(404);
                });
            });
        });
    });
});
