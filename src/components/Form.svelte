<script lang="ts">
  import { WEATHER, ZIPCODE } from "../stores";

  async function getWeather() {
    // Check for cached call
    if (window.localStorage.getItem($ZIPCODE)) {
      return ($WEATHER = JSON.parse(window.localStorage.getItem($ZIPCODE)));
    }
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${$ZIPCODE}&appid=0ea7fe29dac4eeced7fadd06e999190e&units=imperial`
      );
      const json = await res.json();
      if (json.cod !== 200) {
        throw `Error: ${json.message}`;
      }
      // Cache new calls
      window.localStorage.setItem($ZIPCODE, JSON.stringify(json));
      return ($WEATHER = json);
    } catch (e) {
      return UIkit.notification({
        message: e,
        status: "danger",
        pos: "top-center",
        timeout: 5000,
      });
    }
  }
</script>

<div class="uk-position-center">
  <div class="uk-text-center">
    <img
      data-src="/images/zipper.svg"
      height="128"
      width="128"
      alt="zipper"
      uk-img
    />
  </div>
  <header class="uk-text-center uk-margin-medium">
    <h1 class="uk-margin-small-bottom">zip weather</h1>
    <h6 class="uk-margin-remove">
      <span class="uk-text-small uk-text-muted">weather in a zip</span>
    </h6>
  </header>

  <form on:submit|preventDefault>
    <div class="uk-inline">
      <span class="uk-form-icon" uk-icon="icon: location" />
      <input
        type="text"
        class="uk-input"
        placeholder="zip code"
        maxlength="5"
        pattern="[0-9]{'{'}4,5{'}'}"
        bind:value={$ZIPCODE}
        on:keypress={(event) => {
          if (event.key === "Enter") {
            return getWeather();
          }
        }}
      />
      <a
        class="uk-form-icon uk-form-icon-flip"
        uk-icon="icon: search"
        on:click={getWeather}
      />
    </div>
  </form>
  <p class="uk-text-small uk-text-light uk-text-center">
    <a
      href="https://tools.usps.com/go/ZipLookupAction"
      target="_blank"
      rel="noreferrer noopener">what's a zip code?</a
    >
  </p>
</div>

<style type="text/scss">
  form {
    display: flex;
    @media only screen and (max-width: 400px) {
      flex-direction: column;
    }
  }
</style>
