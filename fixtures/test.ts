import {test as base} from '@playwright/test';
import {StartPage} from '../pages/StartPage';

type Fixtures = {
    startPage: StartPage;
};

export const test = base.extend<Fixtures>({
    startPage: async ({page}, use) => {
        const startPage = new StartPage(page);
        await startPage.openStart();
        await use(startPage);
    }
});

export {expect} from '@playwright/test';
