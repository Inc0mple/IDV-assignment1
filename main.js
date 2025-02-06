// main.js

// Fetch the PSI data from data.gov.sg
fetch('https://api.data.gov.sg/v1/environment/psi')
  .then(response => response.json())
  .then(data => {
    
    // Extract timestamp
    let timestamp = data.items[0].update_timestamp;
    $("#timestring").text(`Updated at: ${timestamp}`);

    // Extract readings object
    let readings = data.items[0].readings;

    // The 12 readings (keys) you want to display in table rows
    const readingKeys = [
      "o3_sub_index",
      "pm10_twenty_four_hourly",
      "pm10_sub_index",
      "co_sub_index",
      "pm25_twenty_four_hourly",
      "so2_sub_index",
      "co_eight_hour_max",
      "no2_one_hour_max",
      "so2_twenty_four_hourly",
      "pm25_sub_index",
      "psi_twenty_four_hourly",
      "o3_eight_hour_max"
    ];

    // Append table rows for each reading
    // Each row: reading name, plus the 5 region values (central, west, east, north, south)
    readingKeys.forEach(key => {
      let row = `
        <tr>
          <td>${key}</td>
          <td>${readings[key].central}</td>
          <td>${readings[key].west}</td>
          <td>${readings[key].east}</td>
          <td>${readings[key].north}</td>
          <td>${readings[key].south}</td>
        </tr>
      `;
      $("#PSItable").append(row);
    });

  })
  .catch(error => {
    console.error('Error fetching PSI data:', error);
    $("#timestring").text("Error fetching data from API");
  });
