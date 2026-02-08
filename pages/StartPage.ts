import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './BasePage';

export class StartPage extends BasePage {
    readonly mainContainer: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly mapContainer: Locator;
    readonly markers: Locator;
    readonly markerClusters: Locator;
    readonly results: Locator;
    readonly resultCards: Locator;
    readonly paginationRecordsNumber: Locator;
    readonly nextPageButton: Locator;
    readonly currentPageButton: Locator;

    constructor(page: Page) {
        super(page);

        this.mainContainer = page.locator('[id*="MainContent"]');
        this.searchInput = page.getByPlaceholder(/Ort oder Postleitzahl/i);
        this.searchButton = page.getByRole('button', {name: /Gruppen suchen/i});
        this.mapContainer = page.locator('.leaflet-container');
        this.markers = page.locator('img[src*="mappin"]');
        this.markerClusters = page.locator('.marker-cluster');
        this.results = page.locator('.map-list-wrapper');
        this.resultCards = page.locator('.map-list-item');

        this.paginationRecordsNumber = page.getByTestId('Pagination.RecordsNumber');
        this.nextPageButton = page.getByRole('button', {name: /go to next page/i});
        this.currentPageButton = page.locator('.pagination-button.is--active');
    }

    async openStart() {
        await this.open();
    }

    async search(text: string) {
        await this.searchInput.click();
        await this.searchInput.fill(text);
        await this.page.waitForTimeout(500);

        const suggestion = this.page.locator('[role="listbox"] li').first();
        if (await suggestion.isVisible({timeout: 1000}).catch(() => false)) {
            await suggestion.click();
        }

        await this.searchButton.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
    }

    async applyAgeFilter(option: string) {
        await this.page.locator('input[readonly]').first().click();
        await this.page.getByText(option).click();
        await this.page.waitForTimeout(1000);
    }

    async clickResultCard(index: number = 0) {
        await this.resultCards.nth(index).click();
    }

    async goToNextPage() {
        await this.nextPageButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async getResultCount(): Promise<number> {
        const text = await this.paginationRecordsNumber.innerText();
        return parseInt(text);
    }

    async getCurrentPageNumber(): Promise<number> {
        const text = await this.currentPageButton.innerText();
        return parseInt(text);
    }

    async getMarkerClustersCount(): Promise<number> {
        return await this.markerClusters.count();
    }

    async expectTitle() {
        await expect(this.page).toHaveTitle('Gruppenplatz.de');
    }

    async expectMapToBeVisible() {
        await expect(this.mapContainer).toBeVisible({timeout: 5000});
    }

    async expectMarkersToBeVisible() {
        await expect(this.markerClusters.first()).toBeVisible({timeout: 5000});
    }

    async expectResultsToBeVisible() {
        await expect(this.results).toBeVisible({timeout: 5000});
    }

    async expectResultsToContainText(text: string) {
        const firstCard = this.resultCards.first();
        await expect(firstCard).toContainText(text, {timeout: 5000});
    }

    async expectCurrentPage(pageNumber: number) {
        const currentPage = await this.getCurrentPageNumber();
        expect(currentPage).toBe(pageNumber);
    }

    async expectResultCardHighlighted() {
        const selectedCard = this.page.locator('.map-list-item.selected-item');
        await expect(selectedCard).toBeVisible();
    }
}
