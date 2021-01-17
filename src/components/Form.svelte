<script lang="ts">
  import { UNITS, WEATHER, ZIPCODE } from "../stores";

  async function getWeather() {
    const response = await fetch(
      `/.netlify/functions/currentWeather?zipcode=${$ZIPCODE}&units=${$UNITS}`
    );
    const json = await response.json();
    if (response.status === 200) {
      return ($WEATHER = json);
    } else {
      return UIkit.notification({
        message: json,
        status: "danger",
        pos: "top-center",
        timeout: 5000,
      });
    }
  }
</script>

<div class="uk-position-center" id="wrapper">
  <div class="uk-text-center">
    <img
      data-src="/images/zip.svg"
      height="128"
      width="128"
      alt="zip_logo"
      uk-img
    />
  </div>
  <header class="uk-text-center uk-margin-medium">
    <h1 class="uk-margin-small-bottom">zip weather</h1>
    <h2 class="uk-margin-remove uk-text-small uk-text-muted">
      weather in a zip
    </h2>
  </header>

  <form on:submit|preventDefault>
    <fieldset class="uk-fieldset">
      <div class="uk-inline">
        <span class="uk-form-icon" uk-icon="icon: location" />
        <input
          type="text"
          class="uk-input uk-text-center"
          name="zipcode_input"
          placeholder="zip code"
          maxlength="5"
          pattern="[0-9]{'{'}4,5{'}'}"
          style="padding-right: 40px"
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
    </fieldset>
    <fieldset class="uk-fieldset uk-margin-auto uk-margin-top uk-width-1-3">
      <select class="uk-select uk-input" bind:value={$UNITS}>
        <option value="imperial">F</option>
        <option value="metric">C</option>
        <option value="standard">K</option>
      </select>
    </fieldset>
  </form>
  <p class="uk-text-small uk-text-light uk-text-center">
    <a
      href="https://tools.usps.com/go/ZipLookupAction"
      target="_blank"
      rel="noreferrer noopener">find my zip code</a
    >
  </p>
</div>

<style type="text/scss">
</style>
