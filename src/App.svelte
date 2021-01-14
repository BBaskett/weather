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
