import {test} from '../fixtures/test';

test('Page loads', async ({startPage}) => {
    await startPage.openStart();
    await startPage.expectTitle()
    await startPage.expectMainContainerToBeVisible()
});

test('Search panel is visible', async ({startPage}) => {
    await startPage.openStart()
    await startPage.expectAddressSearchContainerToBeVisible()
})

test('Search updates map markers', async ({startPage: startPage}) => {
    await startPage.openStart();
    await startPage.search('Berlin');
    await startPage.expectMarkersToBeVisible();
});

test('Search shows results', async ({startPage}) => {
    await startPage.openStart();
    await startPage.search('Hamburg');
    await startPage.expectResultsToBeVisible();
});
