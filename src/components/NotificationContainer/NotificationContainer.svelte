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
    --background: rgba(16, 49, 106, 0.1);
    --colour: black;
    --icon-colour: black;
    border-radius: 1.5rem;
    background: var(--background);
    color: var(--colour);
    padding: 1.66rem 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
  }
  .notification-container__icon :global(svg) {
    width: 45px;
    height: 45px;
  }

  .notification-container__text {
    font-family: ABCSerif, serif;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: 125%;
    flex: 1;
  }
  .notification-container__form {
    display: flex;
    align-items: center;
  }
  .notification-container__label {
    font-family: ABCSans, sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 18px;
    text-align: left;
    margin-right: 1.25rem;
  }
  @container (min-width: 701px) {
    .notification-container__icon {
      margin-right: 1.5rem;
    }
    .notification-container__text {
      margin-right: 1.25rem;
    }
  }

  @container (max-width: 700px) {
    .notification-container__icon {
      margin-bottom: 1rem;
    }
    .notification-container__text {
      margin-bottom: 1.5rem;
    }
    .notification-container {
      max-width: 375px;
      margin: 0 auto;
      flex-direction: column;
      text-align: center;
    }

    .notification-container__icon :global(svg) {
      width: 32px;
      height: 32px;
    }
  }

  :global(.is-dark-mode) .notification-container {
    --background: #a0beeb4d;
    --colour: white;
    --icon-colour: white;
  }
  :global(.is-dark-mode) .notification-container .notification-container__icon :global(svg path) {
    stroke: white;
  }
</style>
