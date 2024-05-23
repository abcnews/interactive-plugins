import acto from '@abcnews/alternating-case-to-object';
import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { getMountValue, selectMounts } from '@abcnews/mount-utils';
import type { Mount } from '@abcnews/mount-utils';
import App from './components/App/App.svelte';

let appMountEl: Mount;
let appProps;

whenOdysseyLoaded.then(() => {
  [appMountEl] = selectMounts('interactiveplugins');

  if (appMountEl) {
    appProps = acto(getMountValue(appMountEl));
    new App({
      target: appMountEl,
      props: appProps
    });
  }
});

if (process.env.NODE_ENV === 'development') {
  console.debug(`[interactive-plugins] public path: ${__webpack_public_path__}`);
}
