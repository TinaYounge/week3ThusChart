var ctx = document.getElementById("myChart");
ctx.width = 400;
ctx.height = 250;
const key = "769d9980-319f-4137-8300-c2c935518543";
const cryptoURL =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5&convert=USD&CMC_PRO_API_KEY=" +
  key;
function generateURL() {
  return cryptoURL;
}
async function fetchCoinData() {
  let bitCoinData = {};
  try {
    const response = await fetch(cryptoURL);
    const json = await response.json();
    bitCoinData = json.data;
    data = bitCoinData;
    console.log({ bitCoinData });
  } catch (error) {
    console.log(error);
  } finally {
    renderLineGraph(bitCoinData);
  }
}
fetchCoinData();
let colors = [
  ["blue", "darkblue"],
  ["green", "darkgreen"],
  ["red", "darkred"],
];
function changeColor1() {
  myChart.destroy();
  colors = [
    ["yellow", "orange"],
    ["brown", "darkbrown"],
    ["grey", "darkgrey"],
  ];
  renderLineGraph(data);
}

function changeColor2() {
  myChart.destroy();
  colors = [
    ["green", "darkgreen"],
    ["red", "darkred"],
    ["blue", "darkblue"],
  ];
  renderLineGraph(data);
}
function changeColor3() {
  myChart.destroy();
  colors = [
    ["red", "darkred"],
    ["green", "darkgreen"],
    ["orange", "darkorange"],
  ];
  renderLineGraph(data);
}
let myChart;
let data;
function renderLineGraph(data) {
  console.log({ data });
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["current", "1h", "24h", "7d", "30d", "60d", "90d"],
      datasets: [
        {
          label: data[0].name,
          data: getPriceChange(data, 0),
          backgroundColor: [colors[0][0]],
          borderColor: [colors[0][1]],
          borderWidth: 1,
        },
        {
          label: data[1].name,
          data: getPriceChange(data, 1),
          backgroundColor: [colors[1][0]],
          borderColor: [colors[1][1]],
          borderWidth: 1,
        },
        {
          label: data[2].name,
          data: getPriceChange(data, 2),
          backgroundColor: [colors[2][0]],
          borderColor: [colors[2][1]],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              var label = context.dataset.label || "";

              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(context.parsed.y);
              }
              return label;
            },
          },
        },
      },
    },
  });
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

function getPriceChange(data, num) {
  const bitcoinChanges = data[num].quote.USD;
  let currentBitcoinPrice = bitcoinChanges.price;
  let bitcoinPricechange1h = calculatePriceFromPercentageChange(
    bitcoinChanges.price,
    bitcoinChanges.percent_change_1h
  );
  let bitcoinPricechange24h = calculatePriceFromPercentageChange(
    bitcoinChanges.price,
    bitcoinChanges.percent_change_24h
  );
  let bitcoinPricechange7d = calculatePriceFromPercentageChange(
    bitcoinChanges.price,
    bitcoinChanges.percent_change_7d
  );
  let bitcoinPricechange30d = calculatePriceFromPercentageChange(
    bitcoinChanges.price,
    bitcoinChanges.percent_change_30d
  );
  let bitcoinPricechange60d = calculatePriceFromPercentageChange(
    bitcoinChanges.price,
    bitcoinChanges.percent_change_60d
  );
  let bitcoinPricechange90d = calculatePriceFromPercentageChange(
    bitcoinChanges.price,
    bitcoinChanges.percent_change_90d
  );

  return [
    currentBitcoinPrice,
    bitcoinPricechange1h,
    bitcoinPricechange24h,
    bitcoinPricechange7d,
    bitcoinPricechange30d,
    bitcoinPricechange60d,
    bitcoinPricechange90d,
  ];
}
