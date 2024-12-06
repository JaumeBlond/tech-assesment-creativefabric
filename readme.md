

# CREATIVE FABRICA TECH ASSESMENT

This repository contains automated tests for the Product Page of the website https://www.creativefabrica.com. The tests are written in TypeScript using Playwright to ensure functionality such as product purchasing, subscription trials, adding to favorites, and more.

  

## Prerequisites

Before running the tests, make sure you have the following installed:

 - Node.js (v14 or higher) - Install from nodejs.org.
 - Playwright - A browser automation library used for the tests.

You can install the needed dependencies by running:
  

    npm install

This will install Playwright and the needed dependencies for testing.

  

## How to Run the Tests
To run the test:

    cd product-page-tests

    npx playwright test

This will trigger all tests located within the tests folder. The browsers will pop up once again, launched by Playwright, to execute your tests.


## Scenarios That Have Been Tested

Some scenarios covered in these tests are:

  

 - Page Content Load: Checks whether product page content is loaded
   successfully as an unlogged user.
 - Unlogged User Purchase: Emulates the action of purchasing a product
   as an unlogged user.
 - Logged User Purchase: Emulates the action of purchasing a product as
   a logged user.
 - Trial Period Subscription: Verifies that a user can subscribe to a
   trial period.
 - Add to Cart: Tests adding a product in the cart and proceeding to
   checkout.
 - Switch to Single Purchase: Checks that switching from subscription to
   a single purchase and further to payment is possible.

# Limitations

Please note that Cloudflare blocks some automated interactions, especially for unlogged users. Therefore:

Some flows, for example, clicking on buttons like "Download for Free" or "Activate Free Trial", won't be performed successfully because of the Cloudflare bot protection mechanism.

These tests may fail when trying to advance with actions that require bypassing the Cloudflare validation for non-authenticated users.

Because of these limitations, the automation is highly limited and may not fully simulate all user interactions on the page.

  

# Future Improvements

Cloudflare Bypass: Cloudflare challenges should be handled with a more robust way. This may include advanced browser capabilities from Playwright in order to handle bot protection or integrate a headless browser with a bypass mechanism, such as Puppeteer Extra with Cloudflare bypass.

Payment Integration: Most of the payment-related tests are not fully implemented and can be enhanced further with sandbox payment gateway testing.

  

# Conclusion

Due to the presence of Cloudflare protection on the site, some tests may not be able to complete successfully. While the automation covers the basic flow, full end-to-end testing may not be feasible without bypassing these protections.

  
