<script lang="ts">
  import ToggleButtonOnOff from '../ToggleButtonOnOff/ToggleButtonOnOff.svelte';

  export let value;
</script>

<div class="notification-container__wrapper">
  <aside class="notification-container">
    <div class="notification-container__text"><slot name="text"></slot></div>

    <label class="notification-container__form">
      <div class="notification-container__label">
        <div class="notification-container__icon"><slot name="icon"></slot></div>
        <span><slot name="label"></slot></span>
      </div>

      <div class="notification-container__toggle">
        <ToggleButtonOnOff bind:value />
      </div>
    </label>
  </aside>
</div>

<style>
  .notification-container__wrapper {
    container-type: inline-size;
  }
  .notification-container {
    --Text-text-primary: black;
    --surface-utility: rgba(117, 128, 138, 0.15);

    border-radius: 0.75rem;
    background: var(--surface-utility);
    display: flex;
    padding: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    color: var(--Text-text-primary);
    text-align: center;
    font-family: var(--od-font-stack-sans);
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 125%; /* 1.25rem */
  }

  :global(.is-dark-mode) .notification-container {
    --Text-text-primary: white;
    --surface-utility: rgba(48, 50, 54, 0.6);
  }

  .notification-container__form {
    display: flex;
    height: 2.5rem;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    border-radius: 1000rem;
    background: var(--surface-utility, rgba(117, 128, 138, 0.15));
    cursor: pointer;
    width: 100%;
    max-width: 400px;
  }

  .notification-container__label {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .notification-container__icon {
    display: flex;
  }

  .notification-container__icon :global(svg) {
    width: 20px;
    height: 20px;
    stroke: var(--Text-text-primary);
  }

  @container (min-width: 520px) {
    .notification-container {
      text-align: left;
      flex-direction: row;
      align-items: center;
      max-width: unset;
      justify-content: space-between;
      margin: 0 auto;
      border-radius: 1000rem;
      padding: 0.75rem 0.75rem 0.75rem 1.5rem;
      gap: 1rem;
    }
    .notification-container__form {
      width: auto;
      padding: 0.5rem 0.5rem 0.5rem 1rem;
    }
  }

  :global(#audio-visual-plugin-mount, #reduced-motion-plugin-mount) {
    max-width: 47.875rem;
  }

  /*
   * By default Odyssey removes padding so our component butts against the edge.
   * In that case, add some margin equivalent to what Odyssey removed.
   */
  :global([class*='u-richtext'] > [data-mount]) .notification-container {
    margin: 0 15px;
  }
</style>
