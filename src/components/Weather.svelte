<script lang="ts">
  import { WEATHER, ZIPCODE } from "../stores";
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
  }
</style>

<div id="weather-wrapper">
  <header>
    <span class="uk-text-small uk-text-light">
      <a href="/" class="uk-link-text">&leftarrow;&nbsp;back</a>
    </span>
    <span class="uk-text-small uk-text-light">
      weather for
      <a
        class="uk-link-text"
        href="https://www.unitedstateszipcodes.org/{$ZIPCODE}"
        target="_blank"
        rel="noreferrer noopener">{$ZIPCODE}</a>
    </span>
  </header>
  <main class="uk-container">
    <div class="uk-position-center uk-text-center">
      <h1 class="uk-heading-line"><span>{name}</span></h1>
      <p class="uk-text-medium">{main}</p>
      <img
        data-src="http://openweathermap.org/img/wn/{icon}@4x.png"
        width=""
        height=""
        alt=""
        uk-img />
      <p class="uk-text-large">{Math.round(temp)}</p>
      <button
        class="uk-button uk-button-primary"
        type="button"
        uk-toggle="target: #offcanvas-overlay">more info</button>
    </div>
  </main>
  <footer class="uk-text-center">
    <p class="uk-text-small uk-text-light">
      weather data provided by
      <a
        class="uk-link-text"
        href="https://openweathermap.org/"
        target="_blank"
        rel="noreferrer noopener">openweather api</a>
    </p>
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
          <td>{temp_min}&nbsp;&deg;F</td>
        </tr>
        <tr>
          <th>Current</th>
          <td>{temp}&nbsp;&deg;F</td>
        </tr>
        <tr>
          <th>Maximum</th>
          <td>{temp_max}&nbsp;&deg;F</td>
        </tr>
        <tr>
          <th>Feels Like</th>
          <td>{feels_like}&nbsp;&deg;F</td>
        </tr>
      </tbody>
    </table>
    <h4>Wind</h4>
    <table class="uk-table uk-table-small">
      <tbody>
        <tr>
          <th>Speed</th>
          <td>{wind.speed}&nbsp;mph</td>
        </tr>
        <tr>
          <th>Direction</th>
          <td>{compass(wind.deg)}</td>
        </tr>
        {#if wind.gust}
          <tr>
            <th>Gust</th>
            <td>{wind.gust}&nbsp;mph</td>
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
