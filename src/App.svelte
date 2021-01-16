<script lang="ts">
  import { WEATHER } from "./stores";
  import Form from "./components/Form.svelte";
  import Weather from "./components/Weather.svelte";
  /* $WEATHER = {
    coord: { lon: -74.0469, lat: 40.7221 },
    weather: [
      { id: 804, main: "Clouds", description: "overcast clouds", icon: "04n" },
    ],
    base: "stations",
    main: {
      temp: 44.46,
      feels_like: 32.67,
      temp_min: 42.01,
      temp_max: 46.4,
      pressure: 1012,
      humidity: 87,
    },
    visibility: 10000,
    wind: { speed: 17.27, deg: 40, gust: 24.16 },
    clouds: { all: 90 },
    dt: 1610762337,
    sys: {
      type: 1,
      id: 4610,
      country: "US",
      sunrise: 1610713074,
      sunset: 1610747585,
    },
    timezone: -18000,
    id: 0,
    name: "Jersey City",
    cod: 200,
  }; */
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
