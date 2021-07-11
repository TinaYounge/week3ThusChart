const cryptoURL =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=3&convert=USD&CMC_PRO_API_KEY=164359c0-aec7-4b9a-b562-783e4724fc85";

const totalCoin = ["Bitcoin", "Ethereum", "Tether"];
// 5. Consume Data into Chart
async function getCryptoPrices() {
  const response = await fetch(cryptoURL);
  const json = await response.json();
  renderLineGraph(json.data[0], json.data[1], json.data[2]);
}
getCryptoPrices();

function renderLineGraph(coin1, coin2, coin3) {
  const ctx = document.getElementById("myChart");

  const price1 = coin1.quote.USD.price;
  const price2 = coin2.quote.USD.price;
  const price3 = coin3.quote.USD.price;
  const [ninetyAgoPrice] = getHistoricPrices(coin1.quote.USD);
  // console.log("ninetyAgoPrice", ninetyAgoPrice);
  const coinColor = {
    Bitcoin: "rgba(255, 9, 132, 1)",
    Ethereum: "rgba(25, 9, 132, 1)",
    Tether: "rgba(235, 987, 3, 1)",
  };
  const coinBGColor = {
    Bitcoin: "rgba(255, 9, 132, 0.2)",
    Ethereum: "rgba(25, 9, 132, 0.2)",
    Tether: "rgba(235, 987, 3, 0.2)",
  };
  const timeAgo = ["90d", "60d", "30d", "7d", "24h", "1h", "Current"];
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: timeAgo,
      // labels: ["Bitcoin", "Ethereum", "Tether"],
      datasets: [
        {
          label: coin1.name + " USD",
          borderWidth: 1,
          data: getHistoricPrices(coin1.quote.USD),
          borderColor: coinColor[coin1.name],
          backgroundColor: coinBGColor[coin1.name],
        },
        {
          label: coin2.name + " USD",
          borderWidth: 1,
          data: getHistoricPrices(coin2.quote.USD),
          borderColor: coinColor[coin2.name],
          backgroundColor: coinBGColor[coin2.name],
        },
        {
          label: coin3.name + " USD",
          borderWidth: 1,
          data: getHistoricPrices(coin3.quote.USD),
          borderColor: coinColor[coin3.name],
          backgroundColor: coinBGColor[coin3.name],
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
              suggestedMax: price1,
              suggestedMin: ninetyAgoPrice,
            },
          },
        ],
      },
    },
  });
  // console.log("check", myChart);
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
    Math.floor(ninetyAgoPrice),
    Math.floor(sixtyAgoPrice),
    Math.floor(thirtyAgoPrice),
    Math.floor(sevenAgoPrice),
    Math.floor(dayAgoPrice),
    Math.floor(hourAgoPrice),
    Math.floor(price),
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
  // let historicPrice = Math.floor(historicPrice);
  return historicPrice;
  // console.log("price", historicPrice);
  // console.log("priceType", typeof historicPrice);
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
