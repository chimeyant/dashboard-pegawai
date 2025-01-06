<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import { useAppStore } from "../../../store/app";

export default {
  setup() {
    const series = [
      {
        name: "Laki-laki",
        data: [
          0, 2, 10, 2, 80, 16, 291, 144, 2130, 841, 1150, 768, 1764, 1124, 75,
          27, 2,
        ],
      },
    ];

    const chartOptions = {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Gol Ia",
          "Gol Ib",
          "Gol Ic",
          "Gol Id",
          "Gol IIa",
          "Gol IIb",
          "Gol IIc",
          "Gol IId",
          "Gol IIIa",
          "Gol IIIb",
          "Gol IIIc",
          "Gol IIId",
          "Gol IVa",
          "Gol IVb",
          "Gol IVc",
          "Gol IVd",
        ],
      },
      yaxis: {
        title: {
          text: "Orang",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return " " + val + " Orang";
          },
        },
      },
    };
    return {
      series,
      chartOptions,
    };
  },
};
</script>
