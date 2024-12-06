import { type Locator, type Page } from '@playwright/test';

export class PaymentModal {
  readonly page: Page;
  readonly paypalMethod: Locator;
  readonly payFreeTrial: Locator;
  readonly confirmAndPay: Locator;

  constructor(page: Page) {
    this.page = page;
    this.paypalMethod = page.locator('div[data-value="paypal"]');
    this.payFreeTrial = page.getByText('Activate free trial');
    this.confirmAndPay = page.getByText('Confirm and pay');
  }

  async finishPurchase() {
    try {
      await this.payFreeTrial.click();
    } catch {
      await this.confirmAndPay.click();
    }

    if (this.page.url().includes("paypal")) {
      // PAYMENT IN SANDBOX: Implement payment steps in the future if PayPal sandbox is to be used
      // Example: Fill in sandbox credentials and confirm the payment.
    }
  }

  async choosePaymentMethod() {
    await this.paypalMethod.click();
  }
}
