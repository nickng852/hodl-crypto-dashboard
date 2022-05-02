import { useSelector } from "react-redux";
import {
  selectCoin,
  selectCoinPriceHistory,
} from "../../features/coins/coinsSlice";

import { Line } from "react-chartjs-2";
import moment from "moment";

const LineChart = ({
  chartLabel,
  chartStat,
  priceChange,
  coinCard,
  watchList,
  coinInfo,
}) => {
  const coin = useSelector(selectCoin);
  const coinPriceHistory = useSelector(selectCoinPriceHistory);

  if (coinInfo) {
    priceChange = coin?.change;

    for (let i = 0; i < coinPriceHistory?.length; i += 1) {
      chartLabel.push(
        moment.unix(coinPriceHistory[i]?.timestamp).format("YYYY/MM/DD h:mm a")
      ); // get each index from the individual array
      chartStat.push(coinPriceHistory[i]?.price); // get each array from the response
    }
  }

  const stat = (canvas) => {
    // LineChart Display
    const ctx = canvas.getContext("2d");

    let gradient;

    if (coinCard) {
      gradient = ctx.createLinearGradient(0, 0, 0, 110);
    } else if (watchList) {
      gradient = ctx.createLinearGradient(0, 0, 0, 50);
    } else if (coinInfo) {
      gradient = ctx.createLinearGradient(200, 200, 200, 500);
    }

    if (priceChange < 0) {
      gradient.addColorStop(0, "rgba(214, 69, 65, 0.5)");
      gradient.addColorStop(1, "rgba(214, 69, 65,0.01)");
    } else if (priceChange === 0) {
      gradient.addColorStop(0, "rgba(150, 150, 150, 0.5)");
      gradient.addColorStop(1, "rgba(150, 150, 150,0.01)");
    } else if (priceChange > 0) {
      gradient.addColorStop(0, "rgba(34, 153, 84,0.5)");
      gradient.addColorStop(1, "rgba(34, 153, 84,0.01)");
    }

    return {
      labels: chartLabel,
      datasets: [
        {
          data: chartStat,
          fill: true,
          backgroundColor: gradient,
          borderColor:
            (priceChange < 0 && "#e74c3c") ||
            (priceChange === 0 && "#b0b0b0") ||
            (priceChange > 0 && "#218c74"),
          borderWidth: (coinCard && "2") || (watchList && "1"),
        },
      ],
    };
  };

  // LineChart Option
  let options;

  if (coinCard || watchList) {
    options = {
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      radius: 0,
      pointHitRadius: 0,
      tension: 0.4,
      spanGaps: true, // skip null data value
    };
  } else if (coinInfo) {
    options = {
      maintainAspectRatio: false,
      scales: {
        x: {
          display: true,
          grid: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
        y: {
          display: true,
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      radius: 0,
      tension: 0.4,
      spanGaps: true, // skip null data value
    };
  }

  return (
    <>
      <Line data={stat} options={options} />
    </>
  );
};

export default LineChart;
