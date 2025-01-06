<template>
  <div>
    <apexchart
      type="pie"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: {
    labels: {
      type: Array,
      default: ["Struktural", "JFT", "JFU"],
    },
    datas: {
      type: Array,
      default: [487, 7603, 2336],
    },
  },
  setup(props, { emit }) {
    const series = ref(props.datas);

    watch(
      () => props.datas,
      (newVal) => {
        series.value = newVal;
      }
    );

    const chartOptions = {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: props.labels,
      legend: {
        position: "top",
      },
      responsive: [
        {
          breakpoint: 300,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "top",
              show: false,
            },
          },
        },
      ],
    };

    return {
      series,
      chartOptions,
    };
  },
};
</script>
