<template>
  <div class="root">
    <v-container class="fixed-width">
      <div>
        <v-row>
          <v-col
            md="6"
            cols="12"
            class="illu-wrap"
          >
            <hidden point="smDown">
              <div class="illustration one" />
              <figure class="illustration two">
                <img
                  :src="imgAPI.education[11]"
                  alt="about"
                >
              </figure>
              <figure class="illustration three">
                <img
                  :src="imgAPI.education[12]"
                  alt="about"
                >
              </figure>
              <figure class="illustration four">
                <img
                  :src="imgAPI.education[13]"
                  alt="about"
                >
              </figure>
              <div class="illustration five" />
            </hidden>
          </v-col>
          <v-col
            md="6"
            cols="12"
          >
            <div
              data-aos="fade-right"
              data-aos-offset="100"
              data-aos-delay="200"
              data-aos-duration="600"
            >
              <div>
                <div class="title-about">
                  <h3 class="use-text-title">
                    <span>{{ "TItle" }}</span>
                  </h3>
                </div>
                <p class="use-text.paragraph">
                  {{ 'Deskripsi' }}
                </p>
                <v-btn
                  :href="link.education.login"
                  class="white"
                >
                  {{ "LOGIN" }}
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
@import "./about-style.scss";
</style>

<script>
import AOS from "aos";
import imgAPI from "@/assets/images/imgAPI";
import link from "@/assets/text/link";
import Hidden from "../Hidden";

export default {
  components: {
    Hidden,
  },
  data: () => ({
    imgAPI,
    link,
  }),
  mounted() {
    this.loaded = true;
    AOS.init({
      once: true,
    });
  },
};
</script>
