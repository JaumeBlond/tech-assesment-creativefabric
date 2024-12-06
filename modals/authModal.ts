import { expect, type Locator, type Page } from '@playwright/test';
import { wait } from '../utils/utils';

export class AuthModal {
    readonly page: Page;
    readonly fbLogin: Locator;
    readonly googleLogin: Locator;
    readonly appleLogin: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly rememberMe: Locator;
    readonly policyCheck: Locator;
    readonly forgotPassword: Locator;
    readonly authSwitch: Locator;
    readonly loginButton: Locator;
    readonly registerButton: Locator;
    readonly myProfile: Locator;


    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.registerButton = page.getByRole('button', { name: 'Sign Up' });
        this.emailInput = page.locator('input[name="username"]')
        this.passwordInput = page.locator('#password-input-login')
        this.submitButton = page.locator('button[data-action="login"]')
        this.myProfile = page.getByText('My Profile')

    }

    async login() {
        await this.loginButton.click()
        await this.emailInput.fill("jaume.ros.97+test@gmail.com")
        await this.passwordInput.fill("123456789")
        await this.submitButton.click()
        await expect(this.myProfile).toBeVisible({ timeout: 5000 }) // BLOCK BY BEING A BOT
    }

    async register() {
        // TODO Can be done by calling API from mailinator or similars
    }
}