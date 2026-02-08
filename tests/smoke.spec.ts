import {test, expect} from '../fixtures/test';

test.describe('Smoke Tests - Critical Path', () => {

    test('01. Page loads successfully', async ({startPage}) => {
        await startPage.expectTitle();
        await startPage.expectMapToBeVisible();
    });

    test('02. Search returns results', async ({startPage}) => {
        await startPage.search('Berlin');

        await startPage.expectResultsToBeVisible();
        const count = await startPage.getResultCount();
        expect(count).toBeGreaterThan(0);
    });

    test('03. Filter reduces results', async ({startPage}) => {
        await startPage.search('Berlin');

        const initialCount = await startPage.getResultCount();
        await startPage.applyAgeFilter('Erwachsene');

        const filteredCount = await startPage.getResultCount();
        expect(filteredCount).toBeLessThanOrEqual(initialCount);
    });

    test('04. Map displays markers', async ({startPage}) => {
        await startPage.search('München');

        await startPage.expectMarkersToBeVisible();
        const markersCount = await startPage.getMarkerClustersCount();
        expect(markersCount).toBeGreaterThan(0);
    });

    test('05. Pagination works', async ({startPage}) => {
        await startPage.search('Berlin');

        await startPage.expectCurrentPage(1);
        await startPage.goToNextPage();
        await startPage.expectCurrentPage(2);
    });

    test('06. Click result card highlights it', async ({startPage}) => {
        await startPage.search('Hamburg');

        await startPage.clickResultCard(0);
        await startPage.expectResultCardHighlighted();
    });

    test('07. Results contain searched location', async ({startPage}) => {
        await startPage.search('Köln');

        await startPage.expectResultsToContainText('Köln');
    });
});
