const query = require("./func/query.js");

const sql = `
SELECT
token_address, COUNT(token_address) AS count
FROM \`bigquery-public-data.ethereum_blockchain.token_transfers\`
WHERE TRUE
GROUP BY token_address
ORDER BY count DESC
LIMIT 10
`;

query(sql).then((result) => {
  console.log(JSON.stringify(result));
  console.log("执行成功");
}).catch((reason) => {
  console.error(reason);
  console.error("执行失败");
});
