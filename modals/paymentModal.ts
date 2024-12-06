import { type Locator, type Page } from '@playwright/test';

export class PaymentModal {
  readonly page: Page;
  readonly paypalMethod: Locator;
  readonly payFreeTrial: Locator;
  readonly confirmAndPay: Locator;


  constructor(page: Page) {
    this.page = page;
    this.paypalMethod = page.locator('div[data-value="paypal"]')
    this.payFreeTrial = page.getByText('Activate free trial')
    this.confirmAndPay = page.getByText('Confirm and pay')
  }

  async finishPurchase() {
    try {
      this.payFreeTrial.click()
    } catch {
      this.confirmAndPay.click()
    }
    if (this.page.url().includes("paypal")) {
      //IMPLEMENT PAYMENT IN SANDBOX IN FUTURE
    }
  }

  async choosePaymentMethod() { //ONLY IMPLEMENTED PAYPAL FOR THE TECH TASK BUT CAN BE REUSABLE BY ADDING OPTION ON WHICH METHOD AND FILLING DE STEPS IN THE MIDDLE
    this.paypalMethod.click()
  }
}