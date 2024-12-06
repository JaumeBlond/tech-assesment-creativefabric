import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly toCheckoutButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.toCheckoutButton = page.locator('//*[text()="Download for free"]');
    }

    async confirmPurchase() {
        expect(await this.page.title()).not.toContain('Just a moment');
    }

}