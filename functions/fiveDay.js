const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const { queryStringParameters: params } = event;
  const key = "0ea7fe29dac4eeced7fadd06e999190e";
  const zipcode = params.zipcode;
  const units = params.units;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&appid=${key}&units=${units}`
    );
    const json = await response.json();
    if (response.status !== 200) {
      throw `Error: ${json.message}`;
    }
    return {
      statusCode: 200,
      body: JSON.stringify(json),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};
