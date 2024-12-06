import { expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly title: Promise<string>;
    readonly productTitle: Locator;
    readonly promoBanner: Locator;
    readonly carruselMainPhoto: Locator;
    readonly carruselSlider: Locator;
    readonly loginButton: Locator;
    readonly registerButton: Locator;
    readonly downloadButton: Locator;
    readonly descriptionText: Locator;
    readonly switchToYearly: Locator;
    readonly activateTrial: Locator;
    readonly addToFav: Locator;
    readonly reviewButton: Locator;
    readonly reviewField: Locator;
    readonly reviewScore: Locator;
    readonly singlepurchaseSwitch: Locator;
    readonly addToCart: Locator;
    readonly footerColophon: Locator;
    readonly upsellBanner: Locator;
    readonly upsellBannerClose: Locator;


    constructor(page: Page) {
        this.page = page;
        this.title = page.title()

        this.productTitle = page.locator('#product-title')
        this.promoBanner = page.locator('div.c-banner--promo')
        this.carruselMainPhoto = page.locator('div.fotorama__wrap')
        this.carruselSlider = page.locator('div.fotorama__nav__shaft')
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.registerButton = page.getByRole('button', { name: 'Sign Up' });
        this.downloadButton = page.locator('//*[text()="Download for free"]');
        this.switchToYearly = page.getByRole('switch', { checked: false });
        this.activateTrial = page.getByText('Activate Free trial', { exact: false });
        this.addToFav = page.locator('button.favorite-off');
        this.reviewButton = page.locator('#review-section > div > div > button');
        this.reviewField = page.locator('div.c-product-box--review');
        this.reviewScore = page.locator('div.bar-review')
        this.singlepurchaseSwitch = page.locator('#product-price-usd')
        this.addToCart = page.locator('input[name="add-to-cart"]')
        this.footerColophon = page.locator('#colophon')
        this.upsellBanner = page.locator('#promo-upsell-popup-favorite')
        this.upsellBannerClose = page.locator('#promo-upsell-popup-favorite-close')

    }

    async userClicksOn(clickOn: string) {
        const buttonMap = new Map<string, Locator>([
            ['FreeDownload', this.downloadButton],
            ['AddToCart', this.addToCart],
            ['FreeTrial', this.activateTrial],
            ['FavItem', this.addToFav],
            ['SwitchYealy', this.switchToYearly],
        ]);

        const buttonToClick = buttonMap.get(clickOn);

        if (!buttonToClick) {
            throw new Error(`Invalid click target: ${clickOn}`);
        }

        await buttonToClick.waitFor({ state: 'visible', timeout: 5000 });
        await buttonToClick.click();
    }

    async checkItemIsfav() {
        expect(this.page.locator('button.favorite-on')).toBeVisible
    }

    async upsellBannerShows() {
        await this.upsellBanner.isVisible()
        await this.upsellBannerClose.click()
    }

    async changeToSinglePurchase() {
        await this.singlepurchaseSwitch.click();
    }

}