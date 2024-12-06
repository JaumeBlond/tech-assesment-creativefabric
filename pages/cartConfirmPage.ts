import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly toCheckoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.toCheckoutButton = page.locator('//*[text()="Download for free"]');
    }

    async confirmPurchase() {
        // Ensure that the page title does not contain "Just a moment", which would indicate the page is still loading
        await expect(this.page.title()).not.toContain('Just a moment');

        // Additional validation: confirm that the "Download for free" button is visible
        await expect(this.toCheckoutButton).toBeVisible();
        await this.toCheckoutButton.click();
    }
}
