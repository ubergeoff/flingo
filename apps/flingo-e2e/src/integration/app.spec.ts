import { getGreeting } from '../support/app.po';

describe('flingo', () => {
    beforeEach(() => cy.visit('/'));

    it('should display welcome message', () => {
        getGreeting().contains('Muuri example');
    });
});
