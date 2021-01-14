<script lang="ts">
  import { WEATHER, ZIPCODE } from "./stores";
  import Form from "./components/Form.svelte";
  import Weather from "./components/Weather.svelte";

  // DEV STUFF
  import { onMount } from "svelte";
  onMount(() => {
    $WEATHER = {
      coord: {
        lon: -74.6272,
        lat: 40.4775,
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01n",
        },
      ],
      base: "stations",
      main: {
        temp: 32.45,
        feels_like: 26.1,
        temp_min: 30.2,
        temp_max: 35.01,
        pressure: 1013,
        humidity: 80,
      },
      visibility: 10000,
      wind: {
        speed: 3.74,
        deg: 207,
      },
      clouds: {
        all: 1,
      },
      dt: 1610582346,
      sys: {
        type: 1,
        id: 5874,
        country: "US",
        sunrise: 1610540419,
        sunset: 1610574832,
      },
      timezone: -18000,
      id: 0,
      name: "Hillsborough",
      cod: 200,
    };
    $ZIPCODE = "07302";
  });
</script>

<style type="text/scss">
</style>

{#if $WEATHER}
  <Weather />
{:else}
  <Form />
{/if}
