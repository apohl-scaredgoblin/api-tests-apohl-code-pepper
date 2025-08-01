declare global{ namespace Cypress {
    interface Chainable<Subject> {
        apiRequest<T=any>(
            method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
            url: string,
            body?: any,
            headers?: any
        ): Chainable<Response<T>>;
        }
    }
}

// @ts-ignore
Cypress.Commands.add('apiRequest', <T>(method, url, body = {}, headers = {}) => {
    return cy.request<T>({
        method,
        url,
        body,
        headers,
        failOnStatusCode: false // optional: don't fail on non-2xx responses
    });
});


