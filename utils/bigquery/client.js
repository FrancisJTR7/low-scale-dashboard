const { BigQuery } = require('@google-cloud/bigquery');
const path = require('path');

// Load the JSON key file
const keyFilePath = path.join(process.cwd(), 'bigquery-key.json');

// Create a BigQuery client
const bigquery = new BigQuery({
  projectId: 'orcaanalytics',
  keyFilename: keyFilePath,
});

module.exports = bigquery;
