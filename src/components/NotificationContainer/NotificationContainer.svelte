<script lang="ts">
  import ToggleButtonOnOff from '../ToggleButtonOnOff/ToggleButtonOnOff.svelte';

  export let value;
</script>

<div class="notification-container__wrapper">
  <aside class="notification-container">
    <div class="notification-container__icon"><slot name="icon"></slot></div>

    <div class="notification-container__text"><slot name="text"></slot></div>

    <label class="notification-container__form">
      <div class="notification-container__label"><slot name="label"></slot></div>

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
    --background: rgba(117, 128, 138, 0.15);
    --surface-utility-bolder: rgba(249, 250, 250, 0.81);
    --colour: black;
    --icon-colour: black;
    border-radius: 0.75rem;
    background: var(--background);
    color: var(--colour);
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    text-align: left;
    max-width: 22.375rem;
    margin: 0 auto;
  }
  .notification-container__icon :global(svg) {
    width: 40px;
    height: 40px;
    margin: 0.69rem 1rem;
  }

  .notification-container__text {
    font-family: ABCSerif, serif;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: 125%;
    flex: 1;
  }
  .notification-container__form {
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    padding: 0.8em;
    border-radius: 1000000px;
    background: var(--surface-utility-bolder);
    margin-top: 1rem;
  }
  .notification-container__label {
    /* Text Bold/md */
    font-family: 'ABC Sans Nova';
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 1.5rem */
    margin-right: 1.25rem;
  }
  @container (min-width: 651px) {
    .notification-container {
      max-width: inherit;
      width: 100%;
      border-radius: 1000000px;
    }
    .notification-container__icon {
      margin-right: 0.5rem;
    }
    .notification-container__text {
      margin-right: 1.25rem;
      font-size: 1.25rem;
    }

    .notification-container__form {
      width: auto;
      margin: 0 0.5rem 0 0;
    }
  }

  :global(.is-dark-mode) .notification-container {
    --background: rgba(48, 50, 54, 0.6);
    --surface-utility-bolder: rgba(24, 25, 27, 0.75);
    --colour: #ebebeb;
    --icon-colour: white;
  }
  :global(.is-dark-mode) .notification-container .notification-container__icon :global(svg path) {
    stroke: white;
  }

  :global(#audio-visual-plugin-mount, #reduced-motion-plugin-mount) {
    width: auto;
    max-width: 47.875rem;
  }
</style>
