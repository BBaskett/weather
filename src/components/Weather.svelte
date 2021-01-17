<script lang="ts">
  import { UNITS, WEATHER, ZIPCODE } from "../stores";
  import { fade } from "svelte/transition";
  const {
    weather: {
      [0]: { main, description, icon },
    },
    main: { temp_min, temp, temp_max, feels_like, pressure, humidity },
    wind,
    clouds,
    visibility,
    sys,
    name,
  } = $WEATHER;
  const temperature =
    $UNITS === "imperial" ? "F" : $UNITS === "metric" ? "C" : "K";
  const speed = $UNITS === "imperial" ? "mph" : "m/s";

  function compass(degrees) {
    if (degrees > 0 && degrees < 45) return "N";
    if (degrees > 45 && degrees < 90) return "NE";
    if (degrees > 90 && degrees < 135) return "E";
    if (degrees > 135 && degrees < 180) return "SE";
    if (degrees > 180 && degrees < 225) return "S";
    if (degrees > 225 && degrees < 270) return "SW";
    if (degrees > 270 && degrees < 305) return "W";
    if (degrees > 305 && degrees < 360) return "NW";
  }
</script>

<div id="weather-wrapper" transition:fade>
  <header>
    <span class="uk-text-small uk-text-light">
      <a href="/" class="uk-link-text">&leftarrow;&nbsp;back</a>
    </span>
    <span class="uk-text-small uk-text-light ">
      weather for
      <a
        class="uk-link-text"
        href="https://www.unitedstateszipcodes.org/{$ZIPCODE}"
        target="_blank"
        rel="noreferrer noopener">{$ZIPCODE}</a
      >
    </span>
  </header>
  <main class="uk-container">
    <div class="uk-position-center uk-text-center">
      <h1 class="uk-heading-line"><span>{name}</span></h1>
      <p class="uk-text-medium">{main}</p>
      <img
        data-src="http://openweathermap.org/img/wn/{icon}@4x.png"
        alt="weather-img"
        uk-img
        transition:fade
      />
      <p class="uk-text-large">
        {Math.round(temp)}&nbsp;{$UNITS === "imperial"
          ? "F"
          : $UNITS === "metric"
          ? "C"
          : "K"}
      </p>
      <button
        class="uk-button uk-button-default uk-text-lowercase uk-background-default"
        type="button"
        uk-toggle="target: #offcanvas-overlay">more info</button
      >
    </div>
  </main>
  <footer class="uk-text-center uk-margin-remove">
    <span class="uk-text-small">
      weather data provided by
      <a
        class="uk-link-text"
        href="https://openweathermap.org/"
        target="_blank"
        rel="noreferrer noopener">openweather api</a
      >
    </span>
  </footer>
</div>

<!-- Overlay -->
<div id="offcanvas-overlay" uk-offcanvas="overlay: true">
  <div class="uk-offcanvas-bar">
    <button class="uk-offcanvas-close" type="button" uk-close />
    <h4>Weather</h4>
    <table class="uk-table uk-table-small">
      <tbody>
        <tr>
          <th>Overview</th>
          <td>{main}</td>
        </tr>
        <tr>
          <th>Description</th>
          <td>{description}</td>
        </tr>
      </tbody>
    </table>
    <h4>Temperatures</h4>
    <table class="uk-table uk-table-small">
      <tbody>
        <tr>
          <th>Minimum</th>
          <td>{Math.round(temp_min)}&nbsp;&deg;{temperature}</td>
        </tr>
        <tr>
          <th>Current</th>
          <td>{Math.round(temp)}&nbsp;&deg;{temperature}</td>
        </tr>
        <tr>
          <th>Maximum</th>
          <td>{Math.round(temp_max)}&nbsp;&deg;{temperature}</td>
        </tr>
        <tr>
          <th>Feels Like</th>
          <td>{Math.round(feels_like)}&nbsp;&deg;{temperature}</td>
        </tr>
      </tbody>
    </table>
    <h4>Wind</h4>
    <table class="uk-table uk-table-small">
      <tbody>
        <tr>
          <th>Speed</th>
          <td>{Math.round(wind.speed)}&nbsp;{speed}</td>
        </tr>
        {#if wind.deg}
          <tr>
            <th>Direction</th>
            <td>{compass(wind.deg)}</td>
          </tr>
        {/if}
        {#if wind.gust}
          <tr>
            <th>Gust</th>
            <td>{wind.gust}&nbsp;{speed}</td>
          </tr>
        {/if}
      </tbody>
    </table>
    <h4>Atmospheric</h4>
    <table class="uk-table uk-table-small">
      <tbody>
        <tr>
          <th>Humidity</th>
          <td>{humidity}%</td>
        </tr>
        <tr>
          <th>Pressure</th>
          <td>{pressure}&nbsp;hPa</td>
        </tr>
      </tbody>
    </table>
    <h4>Visibility</h4>
    <table class="uk-table uk-table-small">
      <tbody>
        <tr>
          <th>Distance</th>
          <td>{visibility}&nbsp;m</td>
        </tr>
      </tbody>
    </table>
    <h4>Clouds</h4>
    <table class="uk-table uk-table-small">
      <tbody>
        <tr>
          <th>Coverage</th>
          <td>{clouds.all}%</td>
        </tr>
      </tbody>
    </table>
    <h4>Sunrise/Sunset</h4>
    <table class="uk-table uk-table-small">
      <tbody>
        <tr>
          <th>Sunrise</th>
          <td>{new Date(sys.sunrise * 1000).toLocaleTimeString()}</td>
        </tr>
        <tr>
          <th>Sunset</th>
          <td>{new Date(sys.sunset * 1000).toLocaleTimeString()}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<style type="text/scss">
  #weather-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    header,
    footer {
      margin: 0.5em;
    }
    header {
      display: flex;
      justify-content: space-between;
    }
    main {
      flex: 2 1 auto;
    }
    footer {
      padding: 8px;
      background-color: rgba(255, 255, 255, 0.25);
      color: white;
    }
  }

  .uk-offcanvas-bar {
    background: #fff;
    color: #3b3b3b !important;
    * {
      color: #000 !important;
    }
  }
</style>
