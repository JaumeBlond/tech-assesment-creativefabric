import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {


    readonly page: Page;
    readonly itemInCart: Locator;
    readonly checkoutbutton: Locator;
    readonly proceedToPay: Locator;


    constructor(page: Page) {
        this.page = page;
        this.itemInCart = page.locator('div.cart-item-wrap')
        this.checkoutbutton = page.getByText('Proceed to checkout')
        this.proceedToPay = page.locator('button[data-value="Place order"]')
    }

    async checkProductAndProceed(productName: string) {
        await this.itemInCart.isVisible()
        await expect(this.page.getByText(productName, { exact: false })).toBeVisible();
        await this.checkoutbutton.click()
    }


    async proceedToPayment() {
        this.proceedToPay.click() //Also paypal to avoid adding non testing data
    }
}