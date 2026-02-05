import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './BasePage';

export class StartPage extends BasePage {
    readonly mainContainer: Locator;
    readonly addressSearchContainer: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly results: Locator;
    readonly markers: Locator;

    constructor(page: Page) {
        super(page);
        this.mainContainer = page.locator('//div[@id="b1-b1-MainContent"]')
        this.addressSearchContainer = page.locator('//div[@id="b4-b1-AddressSearchContainer"]')
        this.searchInput = page.locator('//input[@type="search"]');
        this.searchButton = page.locator('//button[contains(@class, "OSFillParent")]');
        this.results = page.locator('//div[@data-list and contains(@class, "map-list")]');
        this.markers = page.locator('//div[contains(@class, "marker-cluster-small")]');
    }

    async openStart() {
        await this.open();
    }

    async expectTitle() {
        await expect(this.page).toHaveTitle('Gruppenplatz.de');
    }

    async expectMainContainerToBeVisible() {
        await expect(this.mainContainer).toBeVisible()
    }

    async expectAddressSearchContainerToBeVisible() {
        await expect(this.addressSearchContainer).toBeVisible()
    }

    async search(text: string) {
        await this.searchInput.fill(text);
        await this.searchButton.click();
    }

    async expectMarkersToBeVisible() {
        await expect(this.markers.first()).toBeVisible();
    }

    async expectResultsToBeVisible() {
        await expect(this.results).toBeVisible();
    }
}
