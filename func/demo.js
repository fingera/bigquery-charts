
const query = require("./query.js");

const sql = `
SELECT 
TIMESTAMP_TRUNC(transactions.block_timestamp, MINUTE) AS seconds, COUNT(transactions.to_address) AS count, SUM(transactions.value/POWER(10,18)) as value
FROM
\`bigquery-public-data.ethereum_blockchain.transactions\` AS transactions
WHERE TRUE
AND DATE(transactions.block_timestamp) = "2018-08-22"
AND TIMESTAMP_TRUNC(transactions.block_timestamp, HOUR) = "2018-08-22 07:00:00"
AND transactions.to_address = "0xa62142888aba8370742be823c1782d17a0389da1"
AND transactions.value > 0
GROUP BY seconds
ORDER BY seconds
`;

function demo(request) {
  return query(sql);
}

module.exports = demo;