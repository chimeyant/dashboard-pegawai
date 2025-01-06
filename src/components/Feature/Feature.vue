<template>
  <div
    ref="wrapper"
    v-scroll="runCounter"
    class="root"
  >
    <v-container class="max-md">
      <title-main
        head="Head"
        desc="SubTitel"
        align="center"
        color="primary"
      />
      <v-row class="spacing8 grid">
        <v-col
          sm="6"
          class="px-8"
        >
          <div class="counter-item">
            <figure>
              <img
                src="/images/education/hd-video.svg"
                alt="hd-video"
              >
            </figure>
            <div class="text">
              <h4 class="use-text-title">
                {{ !visible ? 0 : '' }}
                <count-up
                  v-if="visible"
                  :start-val="0"
                  :end-val="100"
                  :options="{ prefix: '+', suffix: 'K' }"
                />
              </h4>
              <h6 class="use-text-subtitle2">
                {{ "TES1" }}
              </h6>
            </div>
          </div>
        </v-col>
        <v-col
          sm="6"
          class="px-8"
        >
          <div class="counter-item">
            <figure>
              <img
                src="/images/education/presenter.svg"
                alt="presenter"
              >
            </figure>
            <div class="text">
              <h4 class="use-text-title">
                {{ !visible ? 0 : '' }}
                <count-up
                  v-if="visible"
                  :start-val="0"
                  :end-val="200"
                  :options="{ prefix: '+' }"
                />
              </h4>
              <h6 class="use-text-subtitle2">
                {{ 'TEs2' }}
              </h6>
            </div>
          </div>
        </v-col>
        <v-col
          sm="6"
          class="px-8"
        >
          <div class="counter-item">
            <figure>
              <img
                src="/images/education/money.svg"
                alt="money"
              >
            </figure>
            <div class="text">
              <h4 class="use-text-title">
                {{ !visible ? 0 : '' }}
                <count-up
                  v-if="visible"
                  :start-val="0"
                  :end-val="500"
                  :options="{ prefix: '$' }"
                />
              </h4>
              <h6 class="use-text-subtitle2">
                {{ "TEs3" }}
              </h6>
            </div>
          </div>
        </v-col>
        <v-col
          sm="6"
          class="px-8"
        >
          <div class="counter-item">
            <figure>
              <img
                src="/images/education/unlimited.svg"
                alt="unlimited"
              >
            </figure>
            <div class="text">
              <h4 class="use-text-title">
                Free
              </h4>
              <h6 class="use-text-subtitle2">
                {{ "Tes4" }}
              </h6>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
@import "feature-style.scss";
</style>

<script>
import CountUp from "vue-countup-v3";
import { ref } from "vue";
import Title from "../Title";

export default {
  components: {
    "title-main": Title,
    CountUp,
  },
  setup() {
    const visible = ref(false);
    const wrapper = ref(null);
    const offset = 500;
    function runCounter() {
      const scrollPosition =
        document.documentElement.scrollTop || document.body.scrollTop;
      const topPosition = scrollPosition + offset;

      if (topPosition > wrapper.value.offsetTop) {
        visible.value = true;
      }
    }

    return {
      visible,
      runCounter,
      wrapper,
    };
  },
};
</script>
