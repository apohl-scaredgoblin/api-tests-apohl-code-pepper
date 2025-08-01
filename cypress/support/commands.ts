declare global{ namespace Cypress {
    interface Chainable<Subject> {
        apiRequest(
            method: 'GET' | 'POST' | 'PUT' | 'DELETE',
            url: string,
            body?: any
        ): Chainable<Subject>;
        }
    }
}

Cypress.Commands.add('apiRequest', (method, url, body = {}, headers = {}) => {
    return cy.request({
        method,
        url,
        body,
        headers,
        failOnStatusCode: false // optional: don't fail on non-2xx responses
    });
});


