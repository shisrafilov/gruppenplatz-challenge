import {defineConfig} from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    retries: process.env.CI ? 2 : 0,
    reporter: [["line"], ["allure-playwright"]],
    use: {
        baseURL: 'https://gruppenplatz.healthycloud.de/HC_GP_Public_Pages/',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
        viewport: {width: 1920, height: 1080}
    }
});
