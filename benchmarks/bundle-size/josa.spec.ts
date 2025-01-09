import { describe, it } from 'vitest';

import { getBundleSize } from './utils/get-bundle-size';

describe('find bundle size', () => {
  it('auto-josa', async () => {
    const bundleSize = await getBundleSize('auto-josa', 'josa');
    console.log(bundleSize);
  });

  it('josa', async () => {
    const bundleSize = await getBundleSize('josa', 'josa');
    console.log(bundleSize);
  });

  it('es-hangul', async () => {
    const bundleSize = await getBundleSize('es-hangul', 'josa');
    console.log(bundleSize);
  });
});
