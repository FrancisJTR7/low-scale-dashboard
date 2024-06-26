const bigquery = require('./client');

async function fetchData() {
  const query = 'SELECT * FROM `analytics.pacing__armra`';
  const options = {
    query: query,
    location: 'US', // Specify the location if needed
  };

  try {
    const [rows] = await bigquery.query(options);
    console.log('Data fetched successfully:', rows); // Add this line
    return rows;
  } catch (err) {
    console.error('ERROR:', err);
    throw err;
  }
}

module.exports = fetchData;
