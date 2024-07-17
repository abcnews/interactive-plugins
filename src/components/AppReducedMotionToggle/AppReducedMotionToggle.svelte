<script lang="ts">
  /**
   * @file
   * A "prefers reduced motion" component.
   *
   * When this plugin is used, devs should check the body for the applicable class:
   *
   * ```js
   * const prefersReudcedMotion = document.body.classList.contains('is-reduced-motion');
   * ```
   *
   * Or in CSS:
   *
   * ```css
   * .is-reduced-motion .myThing{ animation: none; }
   * ```
   */
  import NotificationContainer from '../NotificationContainer/NotificationContainer.svelte';
  import { getJSON, setJSON } from '../../util/storage';
  const LOCALSTORAGE_KEY = 'ABC_NEWS_REDUCEDMOTION';
  const BODY_CLASS = 'is-reduced-motion';
  const INVERSE_BODY_CLASS = 'is-high-motion';

  const storageValue = getJSON(LOCALSTORAGE_KEY);
  /** the user's preference from localStorage/browser preference/or chosen manually with the toggle */
  let value = storageValue ?? window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let toggleCount = 0;

  $: {
    // Persist to localStorage (except for the initial value from above 👆)
    if (toggleCount > 0) {
      setJSON(LOCALSTORAGE_KEY, value);
    }
    toggleCount++;

    // Set a class on the body so we can target with CSS/other stuff.
    document.body.classList[value ? 'add' : 'remove'](BODY_CLASS);
    document.body.classList[!value ? 'add' : 'remove'](INVERSE_BODY_CLASS);
  }
</script>

<!-- When the toggle button changes -->
<NotificationContainer bind:value>
  <span slot="text">This story contains high&#8209;motion&nbsp;animation</span>
  <span slot="label">Reduce motion</span>

  <svg
    slot="icon"
    class="icon"
    width="62"
    height="40"
    viewBox="0 0 62 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="20.7313"
      y="20"
      width="28.2843"
      height="28.2843"
      rx="4"
      transform="rotate(-45 20.7313 20)"
      stroke-width="5"
    />
    <path d="M38.3385 5.31384L21.3984 5.31384" stroke-width="5" stroke-linecap="round" />
    <path d="M38.3385 34.6859L14.7667 34.6859" stroke-width="5" stroke-linecap="round" />
    <path d="M37.0654 24.8954L17.0979 24.8954" stroke-width="5" stroke-linecap="round" />
    <path d="M11.0879 24.8954L8.98993 24.8954" stroke-width="5" stroke-linecap="round" />
    <path d="M19.1127 15.1046L13.1562 15.1046" stroke-width="5" stroke-linecap="round" />
    <path d="M6.96908 15.1046H3" stroke-width="5" stroke-linecap="round" />
  </svg>
</NotificationContainer>

<style>
</style>
