/**
 * 以太坊
 * 1. 每天交易额(交易额<eth>)
 * 2. 每天手续费(手续费<eth>)
 * 3. 平均单笔交易的交易额(平均单笔交易额<eth>)
 * 4. 平均单笔交易的手续费(平均单笔手续费<eth>)
 * 5. 每天交易数量(ETH交易数量<笔>)
 */

const query = require("./query.js");

function eth_daliy_query(request) {
  let start = "2018-09-01";
  let end = "2018-12-31";
  if (request && request.start) {
    start = request.start;
    end = request.end;
  }

  const sql = `
    SELECT 
      SUM(value/POWER(10,18)) AS sum_tx_ether,
      SUM(gas_price*(receipt_gas_used/POWER(10,18))) AS sum_tx_gas,
      AVG(value/POWER(10,18)) AS avg_tx_ether,
      AVG(gas_price*(receipt_gas_used/POWER(10,18))) AS avg_tx_gas,
      COUNT(value) AS count_tx,
      DATE(timestamp) AS tx_date
    FROM
      \`bigquery-public-data.ethereum_blockchain.transactions\` AS transactions,
      \`bigquery-public-data.ethereum_blockchain.blocks\` AS blocks
    WHERE TRUE
      AND transactions.block_number = blocks.number
      AND receipt_status = 1
      AND value > 0
    GROUP BY tx_date
    HAVING tx_date >= '${start}' AND tx_date <= '${end}'
    ORDER BY tx_date
  `;
  return query(sql);
}

module.exports = eth_daliy_query;