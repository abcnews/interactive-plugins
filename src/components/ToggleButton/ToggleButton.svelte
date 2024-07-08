<script lang="ts">
  /**
   * @file
   * An accessible, reusable toggle button/glorified checkbox
   */

  export let value = false;
  let startingDrag = null;

  const DRAG_PIXEL_THRESHOLD = 10;

  // The following functions handles swipe gestures to change toggle state.
  function startSwipe(e) {
    startingDrag = e.clientX || e.touches?.[0]?.clientX;
  }

  function endSwipe(e) {
    const currentDrag = e.clientX || e.changedTouches?.[0]?.clientX;

    // if the difference is past the threshold, treat sthis as a drag event.
    const diff = currentDrag - (startingDrag || 0);
    if (Math.abs(diff) > DRAG_PIXEL_THRESHOLD) {
      // check if we dragged left or right, then set that on sthe checkbox.
      const direction = diff > 0 ? true : false;
      value = direction;
      e.target.dataset.dragged = true;
    }
  }

  function onClick(e) {
    // A drag gesture changed the toggle already, don't let onclick override it
    const dataset = e.target.dataset;
    if (dataset.dragged) {
      delete dataset.dragged;
      e.preventDefault();
      e.stopPropagation();
    }
  }
</script>

<div class="togglebutton">
  <input
    class="togglebutton__input"
    type="checkbox"
    bind:checked={value}
    on:touchstart={startSwipe}
    on:touchend={endSwipe}
    on:mousedown={startSwipe}
    on:mouseup={endSwipe}
    on:click={onClick}
  />
  <div class="togglebutton__graphic"></div>
</div>

<style>
  .togglebutton {
    display: inline-block;
    position: relative;
  }
  .togglebutton__graphic {
    --height: 1.5rem;
    --background: rgba(255, 255, 255, 0.5);
    --border: rgba(0, 0, 0, 0.8);
    --dot: rgba(0, 0, 0, 0.8);
    box-sizing: border-box;
    display: block;
    position: relative;
    width: 2.75rem;
    height: var(--height);
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: calc(var(--height) / 2);
    transition: all 0.3s;
  }
  .togglebutton__graphic::after {
    content: '';
    --dotHeight: calc(var(--height) - 0.5rem);
    display: block;
    width: var(--dotHeight);
    height: var(--dotHeight);
    background: var(--dot);
    border-radius: 100%;
    transform: translate(0.1875rem, 0.1875rem);
    transition:
      color 0.3s,
      transform 0.3s;
  }
  .togglebutton__input {
    /*
       * Position the checkbox over the entire widget, since that's the only interactive bit
       * https://www.sarasoueidan.com/blog/inclusively-hiding-and-styling-checkboxes-and-radio-buttons/
       */
    position: absolute;
    left: -0.25rem;
    top: -0.25rem;
    margin: 0;
    width: calc(100% + 0.5rem);
    height: calc(100% + 0.5rem);
    z-index: 2;
    opacity: 0;
  }
  .togglebutton__input:checked + .togglebutton__graphic {
    --dot: white;
    --background: #000;
    --border: rgba(255, 255, 255, 0);
  }
  .togglebutton__input:checked + .togglebutton__graphic::after {
    transform: translate(1.4375rem, 0.1875rem);
  }

  .togglebutton:active .togglebutton__graphic::after {
    opacity: 0.5;
  }

  .togglebutton__input:focus-visible + .togglebutton__graphic {
    outline: 3px solid white;
    outline-offset: 2px;
  }

  :global(.is-dark-mode) .togglebutton__graphic {
    --background: transparent;
    --border: rgba(255, 255, 255, 0.8);
    --dot: rgba(255, 255, 255, 0.6);
  }
  :global(.is-dark-mode) .togglebutton__input:checked + .togglebutton__graphic {
    --dot: black;
    --background: #d1e0f5;
  }
</style>
