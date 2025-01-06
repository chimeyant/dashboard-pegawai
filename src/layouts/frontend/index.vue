<template>
  <div
    id="preloader"
    style="
      position: absolute;
      zIndex: 10000;
      background: #fafafa;
      width: 100%;
      height: 100%;
    "
  >
    <img
      style="
        opacity: 0.9;
        position: absolute;
        top: calc(50% - 50px);
        left: calc(50% - 50px);
      "
      src="/images/loading.gif"
      alt="loading"
    >
  </div>
  <v-theme-provider
    theme="light"
    with-background
  >
    <div class="lighten">
      <v-progress-linear
        v-model="loading"
        :active="loading < 100"
        :buffer-value="bufferValue"
        absolute
        color="orange-darken-3"
        class="top-loading"
      />
      <v-app>
        <v-main
          id="main-wrap"
          class="page-enter-active"
          :class="{ 'page-fade-transition-exit': loading >= 100 }"
        >
          <router-view />
        </v-main>
      </v-app>

      <div class="text-center ma-2">

        <v-snackbar
          v-model="snackbar.state"
          :color="snackbar.color"
          multi-line
        >
          {{  snackbar.text }}
        </v-snackbar>
      </div>
    </div>
  </v-theme-provider>
</template>

<style lang="scss">
.top-loading {
  z-index: 9999;
}

#main-wrap {
  padding: 0;
}
</style>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAppStore } from "../../store/app";
import { mapActions, mapState } from "pinia";

export default {
  components: {
    "header-main": Header,
    "footer-main": Footer,
  },

  data() {
    return {
      loading: 0,
      interval: 0,
      bufferValue: 10,
    };
  },
  mounted() {
    // Preloader and Progress bar setup
    this.startBuffer();
    setTimeout(() => {
      this.loading = 100;
      clearInterval(this.interval);
    }, 1000);

    // Remove Loading Screen
    const preloader = document.getElementById("preloader");
    if (preloader !== null || undefined) {
      preloader.remove();
    }
  },
  methods: {
    startBuffer() {
      clearInterval(this.interval);

      this.interval = setInterval(() => {
        this.loading += Math.random() * (15 - 5) + 5;
        this.bufferValue += Math.random() * (15 - 5) + 6;
      }, 100);
    },
  },
  computed: {
    ...mapState(useAppStore, {
      snackbar: "snackbar",
    }),
  },
};
</script>


