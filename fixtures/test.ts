import {test as base} from '@playwright/test';
import {StartPage} from '../pages/StartPage';

type Fixtures = {
    startPage: StartPage;
};

export const test = base.extend<Fixtures>({
    startPage: async ({page}, use) => {
        await use(new StartPage(page));
    }
});

export {expect} from '@playwright/test';
