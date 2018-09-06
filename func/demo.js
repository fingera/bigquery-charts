
const query = require("./query.js");

const sql = `
SELECT 
  SUM(value/POWER(10,18)) AS sum_tx_ether,
  AVG(gas_price*(receipt_gas_used/POWER(10,18))) AS avg_tx_gas_cost,
  DATE(timestamp) AS tx_date
FROM
  \`bigquery-public-data.ethereum_blockchain.transactions\` AS transactions,
  \`bigquery-public-data.ethereum_blockchain.blocks\` AS blocks
WHERE TRUE
  AND transactions.block_number = blocks.number
  AND receipt_status = 1
  AND value > 0
GROUP BY tx_date
HAVING tx_date >= '2018-01-01' AND tx_date <= '2018-12-31'
ORDER BY tx_date
`;

function demo(request) {
  return query(sql);
}

module.exports = demo;