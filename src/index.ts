import acto from '@abcnews/alternating-case-to-object';
import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { getMountValue, selectMounts } from '@abcnews/mount-utils';
import type { Mount } from '@abcnews/mount-utils';
import AppAudioVisualToggle from './components/AppAudioVisualToggle/AppAudioVisualToggle.svelte';
import AppReducedMotionToggle from './components/AppReducedMotionToggle/AppReducedMotionToggle.svelte';

let appMountEl: Mount;
let appProps;

function mountApp(mountpoint, Component) {
  [appMountEl] = selectMounts(mountpoint);

  if (appMountEl) {
    appProps = acto(getMountValue(appMountEl));
    new Component({
      target: appMountEl,
      props: appProps
    });
  }
}

function mountOdysseyApp(mountpoint, Component) {
  whenOdysseyLoaded.then(() => {
    mountApp(mountpoint, Component);
  });
}

mountOdysseyApp('audio-visual-plugin-mount', AppAudioVisualToggle);
mountOdysseyApp('reduced-motion-plugin-mount', AppReducedMotionToggle);

if (process.env.NODE_ENV === 'development') {
  console.debug(`[interactive-plugins] public path: ${__webpack_public_path__}`);
}
