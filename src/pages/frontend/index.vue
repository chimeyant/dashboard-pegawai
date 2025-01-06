<template>
  <div>
    <div class="main-wrap">
      <header-main />
      <div class="container-wrap scroll-nav-content">
        <section id="Beranda">
          <banner />
        </section>
        <section
          id="Produk"
          class="space-top"
        >
          <feature />
        </section>
        <section
          id="Kursus"
          class="space-top-short"
        >
          <popular-course />
        </section>
        <section id="Explore">
          <explore />
        </section>
        <div id="about">
          <about />
        </div>
      </div>
      <footer-main />
    </div>
    <hidden point="mdDown">
      <page-nav />
    </hidden>
  </div>
</template>

<style scoped lang="scss">
@function section-margin($margin) {
  @return $margin * 20;
}
.main-wrap {
  position: relative;
  width: 100%;
  overflow: hidden;
  .v-theme--dark & {
    background-color: $dark-background-default;
  }
  .v-theme--light & {
    background-color: $light-background-paper;
  }
}
.space-bottom {
  padding-bottom: section-margin($spacing1);
  @include breakpoints-down(md) {
    padding-bottom: section-margin(6px);
  }
}
.space-bottom-short {
  padding-bottom: section-margin($spacing1 * 0.5);
}
.space-top {
  padding-top: section-margin($spacing1);
  @include breakpoints-down(md) {
    padding-top: section-margin(6px);
  }
  @include breakpoints-down(xs) {
    padding-top: section-margin(3px);
  }
}
.space-top-short {
  padding-top: section-margin($spacing1 * 0.5);
}
.container-wrap {
  > section {
    position: relative;
  }
}
</style>

<script lang="ts">
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import PopularCourse from "../../components/PopularCourse/PopularCourse.vue";
import Explore from "../../components/Explore/Explore.vue";
import About from "../../components/About/About.vue";
import PageNav from "../../components/PageNav/PageNav.vue";

export default {
  components: {
    "header-main": Header,
    Banner,
    "footer-main": Footer,
    Feature,
    PopularCourse,
    Explore,
    About,
    PageNav,
  },
  setup() {
    return {};
  },

  computed: {
    isTablet() {
      const mdDown = this.$vuetify.display.mdAndDown;
      return mdDown;
    },
  },
};
</script>
