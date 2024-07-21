<script lang="ts">
  /**
   * @file
   * An accessible, reusable toggle button/glorified checkbox with ON/OFF text
   */

  import ToggleButton from '../ToggleButton/ToggleButton.svelte';
  export let value;
</script>

<div class="toggle-button-onoff">
  <!--
    Hide on/off text for screen readers because it's already build into the
    checkbox in the ToggleButton
  -->
  <span class="toggle-button-onoff__text fffix" class:toggle-button-onoff__text--on={value} aria-hidden="true">
    {value ? 'On' : 'Off'}
  </span>
  <ToggleButton bind:value />
</div>

<style>
  .toggle-button-onoff {
    display: flex;
    align-items: center;
  }
  .toggle-button-onoff__text {
    text-align: right;
    font-family: var(--od-font-stack-sans);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 125%; /* 1.09375rem */
    letter-spacing: 0.0875rem;
    text-transform: uppercase;
    width: 1.875rem;
    margin-right: 0.75rem;
    transition:
      color 0.3s,
      opacity 0.3s;
    opacity: 0.8;
  }
  .toggle-button-onoff__text--on {
    opacity: 1;
  }

  :global(.is-dark-mode) .toggle-button-onoff__text--on,
  :global([data-scheme='dark']) .toggle-button-onoff__text--on {
    color: #d1e0f5;
  }
</style>
