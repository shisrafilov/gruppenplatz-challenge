/**
 * The most basic page class that contains common methods
 */

import {Page} from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open() {
        await this.page.goto('');
    }
}
