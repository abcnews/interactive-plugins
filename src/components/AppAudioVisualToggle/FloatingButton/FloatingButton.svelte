<script lang="ts">
  import { onMount } from 'svelte';
  import { useEffect } from '../../../util/useEffect';

  /**
   * The element that this button targets.
   * If this el scrolls off the screen, show ur button
   */
  export let targetElement;

  /** The current toggle value */
  export let value;
  let status = 'loading';
  let buttonObserver;
  let showButton = false;

  // targetElement is null onMount, so use reactivity instead
  $: targetElement && (status = 'loaded');

  // Showing and hiding the floating mute button
  $: {
    if (status === 'loaded') {
      //tear down any previous observers
      if (buttonObserver) {
        buttonObserver.disconnct();
      }
      buttonObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.intersectionRatio === 0) {
              showButton = true;
            } else {
              showButton = false;
            }
          });
        },
        {
          root: null,
          rootMargin: `0px 0px ${window.innerHeight}px`,
          threshold: 0.0
        }
      );

      buttonObserver.observe(targetElement);
    }
  }

  onMount(() => {
    return () => {
      // tear down the final observer
      if (buttonObserver) {
        buttonObserver.disconnect();
      }
    };
  });
</script>

<button
  class="app-oavp__floater"
  class:app-oavp__floater--visible={showButton}
  class:app-oavp__floater--enabled={value}
  aria-hidden={showButton}
  tabindex={showButton ? 0 : -1}
  on:click={() => (value = !value)}
>
  <div class="app-oavp__icon-wrapper">
    <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="19" height="19">
      <title>{true ? 'Mute audio' : 'Enable audio'}</title>
      <g fill-rule="evenodd">
        <path d="M11.355 3.078v18l-5-6h-4v-6h4z" transform="translate(-2.355 -2.078)" />
        <path
          class="app-oavp__graphic-enabled"
          d="M13.438 3.334c3.92.976 6.897 4.618 6.897 8.744 0 4.126-2.978 7.768-6.897 8.744v-2.074c2.825-.917 4.928-3.622 4.928-6.668 0-3.046-2.103-5.753-4.928-6.67zm.001 4.289c1.74.75 2.955 2.462 2.955 4.455 0 1.993-1.215 3.705-2.955 4.455v-2.281a2.892 2.892 0 0 0 0-4.348z"
          transform="translate(-2.355 -2.078)"
        />
        <path
          class="app-oavp__graphic-disabled"
          d="m19.855 8.078 1.5 1.5-2.5 2.5 2.5 2.5-1.5 1.5-2.5-2.5-2.5 2.5-1.5-1.5 2.5-2.5-2.5-2.5 1.5-1.5 2.5 2.5z"
          transform="translate(-2.355 -2.078)"
        />
      </g>
    </svg>
  </div>
</button>

<style>
  .app-oavp__floater {
    --defaultOpacity: 0;
    position: fixed;
    bottom: 15px;
    right: 15px;
    z-index: 100;
    background: rgba(0, 0, 0, 0.6);
    border: none;
    padding: 0.6rem;
    cursor: pointer;
    transition: all ease-out 0.5s;
    opacity: var(--defaultOpacity);
    transition: opacity 0.2s;
    border-radius: 100%;
    box-sizing: border-box;
    width: 2.6rem;
    height: 2.6rem;
  }
  .app-oavp__floater :global(svg path) {
    fill: white;
  }

  .app-oavp__floater:hover {
    background: black;
    opacity: 0.9;
  }

  .app-oavp__floater:active {
    opacity: 1;
  }

  .app-oavp__floater:focus-visible {
    outline: 2px solid black;
    outline-offset: 2px;
  }

  .app-oavp__graphic-disabled,
  .app-oavp__graphic-enabled {
    opacity: 0;
    transform-origin: 15px 10px;
    transition: all 0.15s;
  }

  .app-oavp__floater--enabled .app-oavp__graphic-enabled {
    scale: 1;
    opacity: 1;
  }

  .app-oavp__floater:not(.app-oavp__floater--enabled) .app-oavp__graphic-disabled {
    opacity: 1;
    scale: 1;
  }

  .app-oavp__floater--visible {
    --defaultOpacity: 0.8;
    pointer-events: auto;
    scale: 1;
  }

  .app-oavp__icon-wrapper {
    width: 20px;
    height: 20px;
  }

  :global(.is-dark-mode) .app-oavp__floater {
    background: rgba(255, 255, 255, 0.6);
  }
  :global(.is-dark-mode) .app-oavp__floater :global(svg path) {
    fill: black;
  }
  :global(.is-dark-mode) .app-oavp__floater:hover {
    background: white;
  }
  :global(.is-dark-mode) .app-oavp__floater:focus-visible {
    outline-color: white;
  }
</style>
