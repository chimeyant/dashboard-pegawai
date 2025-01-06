<template>
  <div class="hero-content ">
    <v-container :class="{ 'fixed-width': isDesktop }">
      <v-row class="banner-wrap  ">
        <v-col
          class="px-6"
          cols="12"
          lg="6"
          md="7"
        >
          <div class="banner-text">
            <div class="title">
              <h3 class="use-text-title">
                SIGELIS
              </h3>
            </div>
            <h5 class="subtitle">
              Keajaiban Teknologi, Keajaiban Manusia: Bersama-sama Membangun Dunia yang Lebih Cerdas
            </h5>
            <v-card class="search-banner">
              <v-text-field
                label="Pencarian Permohonan"
                class="search"
                color="primary"
                hide-details
                variant="filled"
              />
              <div class="action">
                <v-btn
                  icon
                  variant="text"
                  class="button"
                  color="primary"
                >
                  <v-icon class="icon">
                    mdi-magnify
                  </v-icon>
                </v-btn>
              </div>
            </v-card>
          </div>
        </v-col>
        <v-col
          v-if="isTablet"
          lg="6"
          cols="12"
          class="md-5 pa-6 deco-grid"
        >
          <div class="deco-banner">
            <div class="artwork-bg">
              <div class="oval" />
              <div
                v-if="loaded"
                class="parallax-scene back"
              >

              </div>
              <img
                src="/images/education/banner-artwork.png"
                alt="artwork"
              >
              <div
                v-if="loaded"
                class="parallax-scene front"
              >
                <!-- <kinesis-container
                  :duration="1500"
                  easing="cubic-bezier(0.23, 1, 0.32, 1)"
                >
                  <kinesis-element
                    :strength="10"
                    type="translate"
                    tag="div"
                  >
                    <span class="icon-two" />
                  </kinesis-element>
                  <kinesis-element
                    :strength="15"
                    type="translate"
                    tag="div"
                  >
                    <span class="icon-one" />
                  </kinesis-element>
                </kinesis-container> -->
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div id="watched_counter" />
  </div>
</template>

<style lang="scss" scoped>
@import "./banner-style.scss";
</style>

<script>
export default {
  data() {
    return {
      loaded: false,
    };
  },
  computed: {
    isDesktop() {
      const mdDown = this.$vuetify.display.mdAndDown;
      return mdDown;
    },
    isTablet() {
      const smUp = this.$vuetify.display.smAndUp;
      return smUp;
    },
  },
  mounted() {
    this.loaded = true;
  },
};
</script>
