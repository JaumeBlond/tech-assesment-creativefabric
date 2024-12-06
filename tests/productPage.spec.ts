import { test , expect } from '@playwright/test';
import { ProductPage } from '../pages/productPage';
import { AuthModal } from '../modals/authModal';
import { CheckoutPage } from '../pages/cartConfirmPage';
import { PaymentModal } from '../modals/paymentModal';
import { CartPage } from '../pages/cartPage';
const BASE_URL = 'https://www.creativefabrica.com/product';

const products = [
  { productUrl: '/christmas-tree-lantern-bundle/' }
];

// Loop through each product
products.forEach(({ productUrl }) => {
  test.describe(`Testing product: ${productUrl}`, () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(BASE_URL + productUrl);
    });

    test.afterEach(async ({ page }, testInfo) => {
      // If the test failed, take a screenshot and attach it to the report
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

      //Check main web content loads properly given unlogged user
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
      await expect(productPage.singlepurchaseSwitch).toBeVisible();
      await expect(productPage.footerColophon).toBeVisible();

    });

    test('Unlogged user can purchase an asset', async ({ page }) => {
      const productPage = new ProductPage(page);
      const checkoutPage = new CheckoutPage(page);
      const authModal = new AuthModal(page);
      const paymentModal = new PaymentModal(page);

      await productPage.userClicksOn("FreeDownload") //FROM HERE WILL FAIL DUE TO CLOUDFARE VALIDATION FOR BOTS
      await checkoutPage.confirmPurchase()
      await authModal.login()
      await checkoutPage.confirmPurchase()
      await paymentModal.choosePaymentMethod()
    });

    test('Logged user can purchase an asset', async ({ page }) => {
      const productPage = new ProductPage(page);
      const authModal = new AuthModal(page);
      const paymentModal = new PaymentModal(page);

      await authModal.login()
      await productPage.userClicksOn("FreeDownload") //FROM HERE WILL FAIL DUE TO CLOUDFARE VALIDATION FOR BOTS
      await paymentModal.choosePaymentMethod()
      await paymentModal.finishPurchase()

    });

    test('Switch to single purchase and buy the asset', async ({ page }) => {
      const productPage = new ProductPage(page);
      const cartPage = new CartPage(page);
      const authModal = new AuthModal(page);

      const currentProduct = productUrl.replace(/\//g, '').replace(/-/g, ' ');


      await authModal.login()
      await productPage.changeToSinglePurchase()
      await productPage.userClicksOn("AddToCart") //FROM HERE WILL FAIL DUE TO CLOUDFARE VALIDATION FOR BOTS
      await cartPage.checkProductAndProceed(currentProduct)
      await cartPage.proceedToPayment()
    });

    test('New user subscribe [Trial period]', async ({ page }) => {
      const productPage = new ProductPage(page);
      const authModal = new AuthModal(page);
      const paymentModal = new PaymentModal(page);

      await authModal.login()
      await productPage.userClicksOn("FreeTrial") //FROM HERE WILL FAIL DUE TO CLOUDFARE VALIDATION FOR BOTS
      await paymentModal.choosePaymentMethod()
      await paymentModal.finishPurchase()
    });


    test.skip('Favorite the item', async ({ page }) => {
      const productPage = new ProductPage(page);
      const authModal = new AuthModal(page);

      await authModal.login()
      await productPage.userClicksOn("FavItem")
      await productPage.upsellBannerShows() //Not Implemented and appears when unfaving which might not be a desired behaviour
      await productPage.checkItemIsfav()
    });


    test('Suscribe yearly ', async ({ page }) => {
      const productPage = new ProductPage(page);
      const authModal = new AuthModal(page);
      const paymentModal = new PaymentModal(page);

      authModal.login()
      productPage.userClicksOn("SwitchYealy") //FROM HERE WILL FAIL DUE TO CLOUDFARE VALIDATION ON FOREING ACCOUNTS AND BOTS
      paymentModal.choosePaymentMethod()
      paymentModal.finishPurchase()
    });


    test.skip('Add a review', async ({ page }) => {
      //To implement
    });

  });
});
