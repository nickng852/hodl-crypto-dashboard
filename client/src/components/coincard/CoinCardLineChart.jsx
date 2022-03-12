import { Line } from "react-chartjs-2";

const LineChart = ({ coins }) => {
  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 150);
    gradient.addColorStop(0, "rgba(34, 153, 84,1)");
    gradient.addColorStop(1, "rgba(34, 153, 84,0.01)");

    console.log(coins.id);

    return {
      labels: coins.id,
      datasets: [
        {
          data: coins.history,
          fill: true,
          backgroundColor: gradient,
          borderColor: "#218c74",
          borderWidth: 2,
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
      <h1>{coins.slug}</h1>
      <Line id="canvas" key={coins.id} data={data} options={options} />
    </>
  );
};

export default LineChart;
