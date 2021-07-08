const cryptoURL =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=3&convert=USD&CMC_PRO_API_KEY=164359c0-aec7-4b9a-b562-783e4724fc85";

//Note: change coin to bitcoin
// const bitcoin = {
//   id: 1,
//   name: "Bitcoin",
//   symbol: "BTC",
//   slug: "bitcoin",
//   num_market_pairs: 9852,
//   date_added: "2013-04-28T00:00:00.000Z",
//   tags: [
//     "mineable",
//     "pow",
//     "sha-256",
//     "store-of-value",
//     "state-channels",
//     "coinbase-ventures-portfolio",
//     "three-arrows-capital-portfolio",
//     "polychain-capital-portfolio",
//   ],
//   max_supply: 21000000,
//   circulating_supply: 18651531,
//   total_supply: 18651531,
//   platform: null,
//   cmc_rank: 1,
//   last_updated: "2021-03-12T07:22:02.000Z",
//   quote: {
//     USD: {
//       price: 56772.22509134523,
//       volume_24h: 56146078171.69906,
//       percent_change_1h: 0.45440337,
//       percent_change_24h: 2.1565927,
//       percent_change_7d: 20.01380942,
//       percent_change_30d: 22.3897859,
//       percent_change_60d: 67.00783825,
//       percent_change_90d: 209.20232707,
//       market_cap: 1058888916230.2034,
//       last_updated: "2021-03-12T07:22:02.000Z",
//     },
//   },
// };
// // ethereum
// const ethereum = {
//   id: 1027,
//   name: "Ethereum",
//   symbol: "ETH",
//   slug: "ethereum",
//   num_market_pairs: 5918,
//   date_added: "2015-08-07T00:00:00.000Z",
//   tags: [
//     "mineable",
//     "pow",
//     "smart-contracts",
//     "ethereum",
//     "coinbase-ventures-portfolio",
//     "three-arrows-capital-portfolio",
//     "polychain-capital-portfolio",
//     "binance-labs-portfolio",
//     "arrington-xrp-capital",
//     "blockchain-capital-portfolio",
//     "boostvc-portfolio",
//     "cms-holdings-portfolio",
//     "dcg-portfolio",
//     "dragonfly-capital-portfolio",
//     "electric-capital-portfolio",
//     "fabric-ventures-portfolio",
//     "framework-ventures",
//     "hashkey-capital-portfolio",
//     "kinetic-capital",
//     "huobi-capital",
//     "alameda-research-portfolio",
//     "a16z-portfolio",
//     "1confirmation-portfolio",
//     "winklevoss-capital",
//     "usv-portfolio",
//     "placeholder-ventures-portfolio",
//     "pantera-capital-portfolio",
//     "multicoin-capital-portfolio",
//     "paradigm-xzy-screener",
//   ],
//   max_supply: null,
//   circulating_supply: 116605372.374,
//   total_supply: 116605372.374,
//   platform: null,
//   cmc_rank: 2,
//   last_updated: "2021-07-08T07:00:02.000Z",
//   quote: {
//     USD: {
//       price: 2214.426752731016,
//       volume_24h: 22060323132.90815,
//       percent_change_1h: -0.0990944,
//       percent_change_24h: -7.08782029,
//       percent_change_7d: 2.38003753,
//       percent_change_30d: -10.56826397,
//       percent_change_60d: -44.10982227,
//       percent_change_90d: 6.61681778,
//       market_cap: 258214056097.14777,
//       last_updated: "2021-07-08T07:00:02.000Z",
//     },
//   },
// };
// // Tether
// const Tether = {
//   id: 825,
//   name: "Tether",
//   symbol: "USDT",
//   slug: "tether",
//   num_market_pairs: 13764,
//   date_added: "2015-02-25T00:00:00.000Z",
//   tags: [
//     "payments",
//     "stablecoin",
//     "stablecoin-asset-backed",
//     "solana-ecosystem",
//   ],
//   max_supply: null,
//   circulating_supply: 62301822762.351685,
//   total_supply: 64469767616.826355,
//   platform: {
//     id: 1027,
//     name: "Ethereum",
//     symbol: "ETH",
//     slug: "ethereum",
//     token_address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
//   },
//   cmc_rank: 3,
//   last_updated: "2021-07-08T06:59:09.000Z",
//   quote: {
//     USD: {
//       price: 1.00069966947423,
//       volume_24h: 51665678683.13653,
//       percent_change_1h: -0.0141263,
//       percent_change_24h: 0.0594254,
//       percent_change_7d: 0.02700259,
//       percent_change_30d: -0.04283363,
//       percent_change_60d: 0.08920704,
//       percent_change_90d: -0.05255862,
//       market_cap: 62345413445.92739,
//       last_updated: "2021-07-08T06:59:09.000Z",
//     },
//   },
// };
// var ctx = document.getElementById("myChart");
// var ctx = document.getElementById("myChart").getContext("2d");
// var ctx = $("#myChart");
// var ctx = "myChart";
// var ctx = document.getElementById("myChart");
const totalCoin = ["Bitcoin", "Ethereum", "Tether"];
// 5. Consume Data into Chart
async function getCryptoPrices() {
  const response = await fetch(cryptoURL);
  const json = await response.json();
  // const Bitcoin = json.data[0];

  // renderLineGraph(Bitcoin);
  // renderLineGraph(json.data);
  for (let index = 0; index < 3; index++) {
    // const element = array[index];
    const coins = json.data[index];
    renderLineGraph(json.data[index]);
  }
}
getCryptoPrices();

function renderLineGraph(coin) {
  const ctx = document.getElementById("myChart");
  const price = coin.quote.USD.price;
  console.log("here", coin);
  const [ninetyAgoPrice] = getHistoricPrices(coin.quote.USD);
  const timeAgo = ["90d", "60d", "30d", "7d", "24h", "1h", "Current"];

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: timeAgo,
      // labels: ["Bitcoin", "Ethereum", "Tether"],
      datasets: [
        {
          label: [coin.name],
          borderWidth: 1,
          data: getHistoricPrices(coin.quote.USD),
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    },
    options: {
      tooltips: {
        enabled: true,
        mode: "nearest",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
              suggestedMax: price,
              suggestedMin: ninetyAgoPrice,
            },
          },
        ],
      },
    },
  });
  console.log("check", myChart);
}
function getHistoricPrices(prices) {
  const {
    percent_change_90d,
    percent_change_60d,
    percent_change_30d,
    percent_change_7d,
    percent_change_24h,
    percent_change_1h,
    price,
  } = prices;

  const ninetyAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_90d
  );
  const sixtyAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_60d
  );
  const thirtyAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_30d
  );
  const sevenAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_7d
  );
  const dayAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_24h
  );
  const hourAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_1h
  );

  return [
    ninetyAgoPrice,
    sixtyAgoPrice,
    thirtyAgoPrice,
    sevenAgoPrice,
    dayAgoPrice,
    hourAgoPrice,
    price,
  ];
}
function calculatePriceFromPercentageChange(currentPrice, percentageChange) {
  let denominator;
  let historicPrice;
  if (percentageChange >= 100) {
    percentageChange = percentageChange + 100;
    denominator = percentageChange * 0.01;
    historicPrice = currentPrice / denominator;
  }

  if (percentageChange < 100 && percentageChange > 0) {
    denominator = 1 + percentageChange / 100;
    historicPrice = currentPrice / denominator;
  }

  if (percentageChange < 0) {
    const original = (currentPrice / (100 + percentageChange)) * 100;
    historicPrice = original;
  }
  return historicPrice;
}
// var myChart = new Chart(ctx, {
//   type: "line",
//   data: {
//     labels: ["90d", "60d", "30d", "7d", "24h", "1h", "Current"],
//     datasets: [
//       {
//         label: "Price",
//         borderWidth: 1,
//         borderColor: "rgba(2, 99, 132, 1)",
//         data: getHistoricPrices(coin.quote.USD),
//         backgroundColor: "rgba(25, 99, 132, 0.2)",
//       },
//     ],
//   },
// });
