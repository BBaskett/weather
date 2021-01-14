<script lang="ts">
  import { WEATHER, ZIPCODE } from "../stores";
  import { fade } from "svelte/transition";
  let error: string;
  async function getWeather() {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${$ZIPCODE}&appid=0ea7fe29dac4eeced7fadd06e999190e&units=imperial`
      );
      const json = await res.json();
      if (json.cod !== 200) {
        throw `Error: ${json.message}`;
      }
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

<style type="text/scss">
  form {
    display: flex;
    @media only screen and (max-width: 400px) {
      flex-direction: column;
    }
  }
</style>

<div class="uk-position-center">
  <div class="uk-flex">
    <img
      class="uk-margin-auto"
      data-src="/images/zipper.svg"
      height="128"
      width="128"
      alt="zipper"
      uk-img />
  </div>
  <header class="uk-text-center uk-margin-medium">
    <h1 class="uk-margin-small-bottom">zip weather</h1>
    <h6 class="uk-margin-remove">
      <span class="uk-text-small uk-text-muted">weather as simple as a zipper</span>
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
          if (event.key === 'Enter') {
            return event.preventDefault();
          }
        }} />
      <button
        class="uk-form-icon uk-form-icon-flip {$ZIPCODE === undefined || $ZIPCODE === '' ? 'uk-invisible' : ''}"
        uk-icon="icon: close"
        on:click|preventDefault={() => ($ZIPCODE = '')} />
    </div>
    <button
      class="uk-button uk-button-primary"
      type="submit"
      disabled={$ZIPCODE === undefined || $ZIPCODE === '' || $ZIPCODE.length < 4}
      on:click={getWeather}>
      <span uk-icon="search" />
      Search
    </button>
  </form>
  {#if error}
    <p class="uk-text-medium uk-text-danger uk-text-center" transition:fade>
      {error}
    </p>
  {/if}
  <p class="uk-text-small uk-text-light uk-text-center">
    <a
      href="https://tools.usps.com/go/ZipLookupAction"
      target="_blank"
      rel="noreferrer noopener">what's a ZIP Code?</a>
  </p>
</div>
