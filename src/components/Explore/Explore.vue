<template>
  <div
    :class="[isRtl ? 'rtl' : 'ltr']"
    class="root"
  >
    <div class="parallax-wrap">
      <dot-parallax />
    </div>
    <v-container :class="{ 'fixed-width': isDesktop }">
      <div class="px-6">
        <title-main
          head="Title"
          desc="Subtitle"
          :align="isMobile ? 'center' : 'left'"
          color="primary"
        />
      </div>
      <div
        v-if="loaded"
        class="massonry"
      >
        <div>
          <v-row>
            <v-col
              v-for="(item, index) in categoriesData"
              :key="index"
              cols="6"
              lg="4"
              sm="6"
              class="pa-sm-6 pa-2"
            >
              <div
                :data-aos-delay="index * 200"
                data-aos="fade-up"
                data-aos-duration="400"
              >
                <div>
                  <category-card
                    :img="item.img"
                    :title="item.title"
                    :desc="item.desc"
                  />
                </div>
              </div>
            </v-col>
            <v-col
              cols="6"
              lg="4"
              sm="6"
              class="pa-sm-6 pa-2"
            >
              <div
                :data-aos-delay="(categoriesData.length * 0.2) + 's'"
                data-aos="fade-up"
                data-aos-duration="400"
              >
                <div class="card-wrap">
                  <span class="fold" />
                  <v-btn
                    class="all-category-card"
                    href="#"
                  >
                    <span class="figure">
                      <img
                        :src="imgAPI.education[10]"
                        alt="img"
                      >
                    </span>
                    <span class="property">
                      <span class="title-category">ALL COURSE</span>
                      <v-icon>mdi-arrow-right</v-icon>
                    </span>
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
@import "./explore-style.scss";
</style>

<script>
import AOS from "aos";
import imgAPI from "@/assets/images/imgAPI";
import Title from "../Title";
import DotParallax from "../Parallax/Dot";
import CategoryCard from "../Cards/Category";

export default {
  components: {
    "title-main": Title,
    CategoryCard,
    DotParallax,
  },
  data() {
    return {
      loaded: false,
      imgAPI,
      isRtl: false,
      categoriesData: [
        {
          img: imgAPI.education[0],
          title: "Photography",
          desc: "Nulla lobortis nunc vitae nisi semper semper.",
        },
        {
          img: imgAPI.education[4],
          title: "Artificial Intelligence",
          desc: "Nulla lobortis nunc vitae nisi semper semper.",
        },
        {
          img: imgAPI.education[7],
          title: "Architect",
          desc: "Nulla lobortis nunc vitae nisi semper semper.",
        },
        {
          img: imgAPI.education[2],
          title: "Geography",
          desc: "Nulla lobortis nunc vitae nisi semper semper.",
        },
        {
          img: imgAPI.education[6],
          title: "Art",
          desc: "Nulla lobortis nunc vitae nisi semper semper.",
        },
      ],
    };
  },
  computed: {
    isDesktop() {
      const mdUp = this.$vuetify.display.mdAndUp;
      return mdUp;
    },
    isMobile() {
      const xsDown = this.$vuetify.display.xsAndDown;
      return xsDown;
    },
  },
  mounted() {
    this.loaded = true;
    AOS.init({
      once: true,
    });
    setTimeout(() => {
      if (this.$vuetify.rtl) {
        this.isRtl = true;
      }
    }, 200);
  },
};
</script>
