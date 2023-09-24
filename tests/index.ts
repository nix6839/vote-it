import { test as base, expect } from '@playwright/experimental-ct-react';
import { createWorkerFixture } from 'playwright-msw';
import { handlers } from './mocks/handlers.ts';

import type { MockServiceWorker } from 'playwright-msw';

const test = base.extend<{
  worker: MockServiceWorker;
}>({
  worker: createWorkerFixture(handlers),
});

export { expect, test };
