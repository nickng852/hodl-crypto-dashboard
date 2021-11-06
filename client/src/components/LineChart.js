import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ chart }) => {
  return (
    <>
      {chart.map((result, index) => {
        const chartLabel = [];
        const chartData = [];

        for (let i = 0; i < result.history?.length; i++) {
          chartLabel.push(i);
          chartData.push(result.history[i]);
        }

        const data = (canvas) => {
          const ctx = canvas.getContext("2d");
          const gradient = ctx.createLinearGradient(0, 0, 0, 500);
          gradient.addColorStop(0, "rgba(34, 153, 84,0.4)");
          gradient.addColorStop(1, "rgba(34, 153, 84,0.01)");

          return {
            labels: chartLabel,
            datasets: [
              {
                data: chartData,
                fill: true,
                backgroundColor: gradient,
                borderColor: "#218c74",
                borderWidth: 3,
              },
            ],
          };
        };

        const options = {
          scales: {
            y: {
              display: false,
            },
            x: {
              display: false,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          radius: 0,
          tension: 0.4,
        };

        return (
          <>
            <h1>{result.slug}</h1>
            <Line id="canvas" key={result.id} data={data} options={options} />
          </>
        );
      })}
    </>
  );
};

export default LineChart;
