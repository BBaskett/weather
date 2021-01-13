<script lang="ts">
  import { ZIPCODE } from "../stores";
  async function getWeather() {
    const res = await fetch("http://localhost:5001/weather");
    const json = await res.json();
    return json;
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

<h1 class="uk-heading-small uk-text-center">ZIP Weather</h1>
<form>
  <div class="uk-inline">
    <span class="uk-form-icon" uk-icon="icon: location" />
    <input
      type="text"
      class="uk-input"
      placeholder="ZIP Code"
      maxlength="5"
      pattern="[0-9]{'{'}4,5{'}'}"
      bind:value={$ZIPCODE} />
    <a
      class="uk-form-icon uk-form-icon-flip {$ZIPCODE === undefined || $ZIPCODE === '' ? 'uk-invisible' : ''}"
      uk-icon="icon: close"
      on:click|preventDefault={() => ($ZIPCODE = '')} />
  </div>
  <button
    class="uk-button uk-button-primary"
    type="submit"
    disabled={$ZIPCODE === undefined || $ZIPCODE === '' || $ZIPCODE.length < 4}
    on:click|preventDefault={getWeather}>
    <span uk-icon="search" />
    Search
  </button>
</form>
<p class="uk-text-small uk-text-light uk-text-center">
  <a
    href="https://tools.usps.com/go/ZipLookupAction"
    target="_blank"
    rel="noreferrer noopener">What's a ZIP Code?</a>
</p>
