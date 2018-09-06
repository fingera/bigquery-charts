
const BigQuery = require('@google-cloud/bigquery');

const client = new BigQuery({
  projectId: "lyjstudyproxy",
  keyFilename: "/home/liuyujun/lyjstudyproxy.json",
});

function query_bigquery(sql) {
  return client.query(sql);
}

module.exports = query_bigquery;
