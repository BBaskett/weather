<script lang="ts">
  import { WEATHER } from "./stores";
  import Form from "./components/Form.svelte";
  import Weather from "./components/Weather.svelte";
</script>

{#if $WEATHER}
  <Weather />
{:else}
  <Form />
{/if}

<img src="/images/background.svg" alt="background" id="background" />

<style type="text/scss">
  #background {
    position: absolute;
    bottom: 0;
    z-index: -1;
  }
</style>
