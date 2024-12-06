// Importing Playwright test utilities and necessary Page Objects
import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/productPage';
import { AuthModal } from '../modals/authModal';
import { CheckoutPage } from '../pages/cartConfirmPage';
import { PaymentModal } from '../modals/paymentModal';
import { CartPage } from '../pages/cartPage';

const BASE_URL = 'https://www.creativefabrica.com/product';

// Array of product URLs to be tested
const products = [
  { productUrl: '/christmas-tree-lantern-bundle/' }
];

products.forEach(({ productUrl }) => {
  test.describe(`Testing product: ${productUrl}`, () => {

    // Navigate to product page before each test
    test.beforeEach(async ({ page }) => {
      await page.goto(BASE_URL + productUrl);
    });

    // Capture a screenshot if a test fails
    test.afterEach(async ({ page }, testInfo) => {
      if (testInfo.status === 'failed') {
        const screenshot = await page.screenshot({ path: `screenshots/${testInfo.title.replace(/ /g, '_')}.png` });
        await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
      }
    });

    test('Page content loads properly', async ({ page }) => {
      const productPage = new ProductPage(page);
      const currentProduct = productUrl.replace(/\//g, '').replace(/-/g, ' ');
      const currentTitle = await productPage.title;
      expect(currentTitle.toLowerCase()).toContain(currentProduct.toLowerCase());

      // Validate visibility of key elements
      await expect(productPage.promoBanner).toBeVisible();
      await expect(productPage.loginButton).toBeVisible();
      await expect(productPage.registerButton).toBeVisible();
      await expect(productPage.productTitle).toContainText(currentProduct, { ignoreCase: true });
      await expect(productPage.reviewScore).toBeVisible();
      await expect(productPage.downloadButton).toBeVisible();
      await expect(productPage.carruselMainPhoto).toBeVisible();
      await expect(productPage.carruselSlider).toBeVisible();
      await expect(productPage.switchToYearly).toBeVisible();
      await expect(productPage.singlepurchaseSwitch).toBeVisible();
      await expect(productPage.addToFav).toBeVisible();
      await expect(productPage.reviewButton).toBeDisabled();
      await expect(productPage.footerColophon).toBeVisible();
    });

    test('Unlogged user can purchase an asset', async ({ page }) => {
      const productPage = new ProductPage(page);
      const checkoutPage = new CheckoutPage(page);
      const authModal = new AuthModal(page);
      const paymentModal = new PaymentModal(page);

      await productPage.userClicksOn("FreeDownload"); // This will likely fail due to Cloudflare validation
      await checkoutPage.confirmPurchase();
      await authModal.login();
      await checkoutPage.confirmPurchase();
      await paymentModal.choosePaymentMethod();
    });

    test('Logged user can purchase an asset', async ({ page }) => {
      const productPage = new ProductPage(page);
      const authModal = new AuthModal(page);
      const paymentModal = new PaymentModal(page);

      await authModal.login();
      await productPage.userClicksOn("FreeDownload"); // This will likely fail due to Cloudflare validation
      await paymentModal.choosePaymentMethod();
      await paymentModal.finishPurchase();
    });

    test('Switch to single purchase and buy the asset', async ({ page }) => {
      const productPage = new ProductPage(page);
      const cartPage = new CartPage(page);
      const authModal = new AuthModal(page);

      const currentProduct = productUrl.replace(/\//g, '').replace(/-/g, ' ');

      await authModal.login();
      await productPage.changeToSinglePurchase();
      await productPage.userClicksOn("AddToCart"); // This will likely fail due to Cloudflare validation
      await cartPage.checkProductAndProceed(currentProduct);
      await cartPage.proceedToPayment();
    });

    // Test for new user subscribing via trial period
    test('New user subscribe [Trial period]', async ({ page }) => {
      const productPage = new ProductPage(page);
      const authModal = new AuthModal(page);
      const paymentModal = new PaymentModal(page);

      await authModal.login();
      await productPage.userClicksOn("FreeTrial"); // This will likely fail due to Cloudflare validation
      await paymentModal.choosePaymentMethod();
      await paymentModal.finishPurchase();
    });

    // Test for subscribing to a yearly plan
    test('Suscribe yearly', async ({ page }) => {
      const productPage = new ProductPage(page);
      const authModal = new AuthModal(page);
      const paymentModal = new PaymentModal(page);

      await authModal.login();
      await productPage.userClicksOn("SwitchYealy"); // This will likely fail due to Cloudflare validation
      await paymentModal.choosePaymentMethod();
      await paymentModal.finishPurchase();
    });

  });
});
