<script>
  /**
   * @file
   * An accessible, reusable toggle button/glorified checkbox with ON/OFF text
   */

  import ToggleButton from "../ToggleButton/ToggleButton.svelte";
  export let value;
</script>

<div class="toggle-button-onoff">
  <span class="toggle-button-onoff__text" class:toggle-button-onoff__text--on={value}>
    {value ? "On" : "Off"}
  </span>
  <ToggleButton bind:value />
</div>

<style>
  .toggle-button-onoff {
    display: flex;
    align-items: center;
  }
  .toggle-button-onoff__text {
    text-transform: uppercase;
    font-family: ABC Sans Nova;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-align: right;
    width: 1.875rem;
    margin-right: 0.75rem;
    color: rgba(255, 255, 255, 0.8);
    transition: color 0.3s;
  }
  .toggle-button-onoff__text--on {
    color: #fff;
  }
</style>