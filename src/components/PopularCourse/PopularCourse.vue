<template>
  <div class="root">
    <div class="parallax-wrap">
      <dot-parallax />
    </div>
    <v-container>
      <div class="floating-title">
        <title-main
          head="Kursus Terpouler"
          desc="Berikut adalah beberapa kursus yang terpopuler"
          :align="isMobile ? 'center' : 'left'"
          dark
          color="primary"
        />
      </div>
    </v-container>
    <div class="slider-wrap">
      <div
        v-if="loaded"
        class="carousel"
      >
        <splide
          ref="splide"
          :options="slickOptions"
        >
          <splide-slide>
            <div class="props item-props-first">
              <div />
            </div>
          </splide-slide>
          <splide-slide
            v-for="(item, index) in courseData"
            :key="index"
          >
            <div class="item">
              <general-card
                :img="item.img"
                :title="item.title"
                :desc="item.desc"
                :rating="item.rating"
                :price="item.price"
              />
            </div>
          </splide-slide>
          <splide-slide>
            <div class="props item-props-last">
              <div />
            </div>
          </splide-slide>
        </splide>
      </div>
      <v-btn
        icon
        fab
        class="nav prev"
        @click="prev()"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn
        icon
        fab
        class="nav next"
        @click="next()"
      >
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./popular-course-style.scss";
</style>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import imgAPI from "@/assets/images/imgAPI";
import GeneralCard from "../Cards/General";
import Title from "../Title";
import DotParallax from "../Parallax/Dot";

const courseData = [
  {
    img: imgAPI.education[9],
    title: "Vivamus sit amet",
    rating: 5,
    price: 50,
    desc: "Ut sed eros finibus, placerat orci id, dapibus mauris. Vestibulum consequat…",
  },
  {
    img: imgAPI.education[5],
    title: "Vivamus sit amet",
    rating: 4,
    price: 10,
    desc: "Ut sed eros finibus, placerat orci id, dapibus mauris. Vestibulum consequat…",
  },
  {
    img: imgAPI.education[3],
    title: "Vivamus sit amet",
    rating: 5,
    price: 50,
    desc: "Ut sed eros finibus, placerat orci id, dapibus mauris. Vestibulum consequat…",
  },
  {
    img: imgAPI.education[4],
    title: "Vivamus sit amet",
    rating: 3,
    price: 25,
    desc: "Ut sed eros finibus, placerat orci id, dapibus mauris. Vestibulum consequat…",
  },
  {
    img: imgAPI.education[8],
    title: "Vivamus sit amet",
    rating: 5,
    price: 50,
    desc: "Ut sed eros finibus, placerat orci id, dapibus mauris. Vestibulum consequat…",
  },
  {
    img: imgAPI.education[7],
    title: "Vivamus sit amet",
    rating: 5,
    price: 40,
    desc: "Ut sed eros finibus, placerat orci id, dapibus mauris. Vestibulum consequat…",
  },
];

export default {
  components: {
    "title-main": Title,
    DotParallax,
    GeneralCard,
    Splide,
    SplideSlide,
  },
  data() {
    return {
      imgAPI,
      loaded: false,
      courseData,
      slickOptions: {
        pagination: false,
        direction: "ltr",
        speed: 500,
        perPage: 4,
        perMove: 1,
        arrows: false,
        autoWidth: true,
        reducedMotion: {
          speed: 500,
          rewindSpeed: 1000,
        },
        breakpoints: {
          1100: {
            perPage: 4,
          },
          800: {
            perPage: 3,
          },
          600: {
            perPage: 2,
          },
        },
      },
    };
  },
  computed: {
    isMobile() {
      const xsDown = this.$vuetify.display.xsAndDown;
      return xsDown;
    },
  },
  mounted() {
    this.loaded = true;

    setTimeout(() => {
      if (this.$vuetify.locale.isRtl) {
        this.slickOptions.direction = "rtl";
      } else {
        this.slickOptions.direction = "ltr";
      }
    }, 200);
  },
  methods: {
    next() {
      this.$refs.splide.go(">");
    },
    prev() {
      this.$refs.splide.go("<");
    },
  },
};
</script>
