# interactive-plugins

This project provides a set of plugins that editors can include in articles to let readers control their experience.

This code is designed to work with [Odyssey](https://github.com/abcnews/odyssey) in ABC News environments, and as such
is generally unsuitable for use in other projects. However it's published here in the hope others might be able to learn
from the techniques used or pull out components for use in their own projects.

## Plugins

### AppAudioVisualToggle

Allows readers to control autoplay sound in videos embedded within articles. This is a successor of the
original [odyssey audio visual plugin](https://github.dev/abcnews/odyssey-audio-visual-plugin).

#### Usage

1. Embed the Javascript document in your article (“[odyssey audio visual plugin]” - Content ID `#101718598`)
2. then insert the plugin into your article with this marker: `#audio-visual-plugin-mount`

This plugin integrates with Odyssey to enable audio in videos by default. The plugin also adds a class to the body should you want to develop a custom component:

```js
const isAudioEnabled = document.body.classList.contains('is-audio-enabled');
```

### AppReducedMotionToggle

Allows readers to disable high-motion content within articles. This feature improves accessibility for sensory overload/vestibular disorders.

#### Usage

1. Embed the Javascript document in your article (“[odyssey-reduced-motion-plugin]” - Content ID `#104109640`)
2. then insert the plugin into your article with this marker: `#reduced-motion-plugin-mount`

This plugin integrates with Odyssey to enable click-to-play videos by default.

When this plugin is used, a class is added to the `<body>` on load. It defaults to the reader's platform `prefers-reduced-motion` setting, but can be overridden by the user via the toggle button.

User preferences are stored in `localStorage` and will persist across sessions, taking precedence over the OS setting once set.

Devs should check the body for the applicable class rather than using the media query:

```js
const prefersReducedMotion = document.body.classList.contains('is-reduced-motion');
```

Or in CSS:

```css
.is-reduced-motion .myThing {
  animation: none;
}
```

An inverse class `is-high-motion` is also provided when reduced-motion isn't set.

Or as a $state var in Svelte 5:

```js
let prefersReducedMotion = $state(document.body.classList.contains('is-reduced-motion'));

function syncReducedMotion() {
  prefersReducedMotion = document.body.classList.contains('is-reduced-motion');
}

onMount(() => {
  syncReducedMotion(); // Fire immediately for initial sync

  const observer = new MutationObserver(syncReducedMotion);

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class'],
    childList: false,
    characterData: false
  });
  return () => observer.disconnect();
});
```

Use the following pattern if you want a Svelte 5 Runes shared state:

```ts
// reducedMotion.svelte.ts

class ReducedMotionStore {
  #value = $state(
    typeof document !== "undefined"
      ? document.body.classList.contains("is-reduced-motion")
      : false,
  );

  get current() {
    return this.#value;
  }

  #sync() {
    this.#value = document.body.classList.contains("is-reduced-motion");
  }

  observe() {
    this.#sync();

    const observer = new MutationObserver(() => this.#sync());

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
      childList: false,
      characterData: false,
    });

    return () => observer.disconnect();
  }
}

export const reducedMotion = new ReducedMotionStore();
```

Then consume in any Svelte component with:

```svelte
<script>
  import { reducedMotion } from './reducedMotion.svelte.ts';
  import { onMount } from 'svelte';

  onMount(() => reducedMotion.observe());
</script>

{#if reducedMotion.current}
  <p>Reduced motion is active</p>
{/if}
```

## Developing

This project uses Storybook where you can preview components, including light & dark variants: `npm run storybook`.

The audio visual plugin functionality is best tested in production using the Resource Override plugin, or by creating your own document to link to your development server: `npm run dev`.

All the plugins are bundled into the same script, but we have separate documents so we can track where the plugins are
used. When releasing a new version, please update each CoreMedia documents.

## Authors

- Ash Kyd ([Kyd.Ashley@abc.net.au](mailto:Kyd.Ashley@abc.net.au))
- Joshua Byrd ([Byrd.Joshua@abc.net.au](mailto:Byrd.Joshua@abc.net.au))
