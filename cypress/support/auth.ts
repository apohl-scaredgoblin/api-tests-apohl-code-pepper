import {MyApiResponse} from "./types";

export function getAuthToken(): Cypress.Chainable<string> {
    return cy.apiRequest('POST', `${Cypress.env('apiBaseUrl')}/auth`, {
        username: Cypress.env('apiUser'),
        password: Cypress.env('apiPass')
    }).then((res: MyApiResponse) => {
        expect(res.status).to.eq(200);
        return res.body.token;
    });
}