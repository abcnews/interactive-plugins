# interactive-plugins

This project provides a set of plugins that editors can include in articles to let readers control their experience.

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

When this plugin is used, a class is added to the `<body>` on load and defaults to the reader's platform prefers-reduced-motion setting.

Devs should check the body for the applicable class rather than using the media query:

```js
const prefersRedudcedMotion = document.body.classList.contains('is-reduced-motion');
```

Or in CSS:

```css
.is-reduced-motion .myThing{ animation: none; }
```

 An inverse class `is-high-motion` is also provided when reduced-motion isn't set.

## Developing

This project uses Storybook where you can preview components, including light & dark variants: `npm run storybook`.

The audio visual plugin functionality is best tested in production using the Resource Override plugin, or by creating your own document to link to your development server: `npm run dev`.

## Authors

- Ash Kyd ([Kyd.Ashley@abc.net.au](mailto:Kyd.Ashley@abc.net.au))
- Joshua Byrd ([Byrd.Joshua@abc.net.au](mailto:Byrd.Joshua@abc.net.au))