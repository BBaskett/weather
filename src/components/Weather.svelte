<script lang="ts">
  import { WEATHER, ZIPCODE } from "../stores";
  const {
    weather: {
      [0]: { main, description, icon },
    },
    main: { temp_min, temp, temp_max },
    wind,
    clouds,
    dt,
    sys,
    name,
  } = $WEATHER;
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
    main {
      flex: 2 1 auto;
    }
  }
</style>

<div id="weather-wrapper">
  <header>
    <p class="uk-text-small uk-text-light">
      Weather for
      <a
        class="uk-link-text"
        href="https://www.unitedstateszipcodes.org/{$ZIPCODE}"
        target="_blank"
        rel="noreferrer noopener">{$ZIPCODE}</a>
    </p>
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
        class="uk-button uk-button-default"
        type="button"
        uk-toggle="target: #offcanvas-overlay">More Info</button>
    </div>
  </main>
  <footer class="uk-text-center">
    <p class="uk-text-small uk-text-light">
      Weather data provided by
      <a class="uk-link-text" href="https://openweathermap.org/">OpenWeather API</a>
    </p>
  </footer>
</div>

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
      </tbody>
    </table>
    <h4>Wind</h4>
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
      </tbody>
    </table>
    <h4>Clouds</h4>
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
