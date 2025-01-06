<!-- eslint-disable quotes -->
<!-- eslint-disable quotes -->
<template>
  <v-navigation-drawer
    v-if="isMobile"
    v-model="openDrawer"
    fixed
    temporary
    class="mobile-nav"
  >
    <v-icon>md-home</v-icon>
    <mobile-menu :open="openDrawer" />
  </v-navigation-drawer>

  <v-app-bar
    id="header"
    v-scroll="handleScroll"
    :class="{ fixed: fixed, 'open-drawer': openDrawer }"
    class="header"
    app
  >
    <v-container :class="{ 'fixed-width': mdUp }">
      <div class="header-content">
        <nav
          :class="{ invert: invert }"
          class="nav-logo"
        >
          <v-btn
            v-if="isMobile"
            :class="{ 'is-active': openDrawer }"
            class="hamburger hamburger--spin mobile-menu"
            text
            icon
            @click.stop="handleToggleOpen"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
          <div class="logo">
            <div v-if="invert">
              <img
                :src="logo"
                alt="logo"
              >
              <span>
                Sekretariat Daerah Kab. Tangerang
              </span>
            </div>
            <span v-if="!invert && loaded">
              <a
                v-smooth-scroll="{ offset: 100 }"
                href="#home"
                class="anchor-link scrollactive-item"
              >
                <img
                  :src="logo"
                  alt="logo"
                >
                <span>
                  SEKDA Kab. Tangerang
                </span>
              </a>
            </span>
          </div>
        </nav>
        <nav
          :class="{ invert: invert }"
          class="nav-menu"
        >
          <div v-if="isDesktop">
            <ul class="scrollactive-nav">
              <li
                v-for="(item, index) in menuList"
                :key="index"
              >
                <v-btn
                  v-if="!invert"
                  v-smooth-scroll="{ offset: -100 }"
                  :href="'/' + item.url"
                  :class="{ active: activeMenu === item.name }"
                  class="menu-link"
                  variant="text"
                  @click="scrollToMyEl(item.name)"
                >
                  <span class="text">
                    {{ item.name }}
                  </span>
                </v-btn>
                <v-btn
                  v-else
                  :href="item.url"
                  variant="text"
                >
                  <span class="text">
                    {{ item.name }}
                  </span>
                </v-btn>
              </li>
              <li>
                <v-btn
                  href="/kontak"
                  variant="text"
                >
                  <span class="text">
                    KONTAK
                  </span>
                </v-btn>
              </li>
            </ul>
          </div>
        </nav>
        <nav class="nav-menu nav-auth">
          <hidden point="xsDown">
            <div class="deco" />

            <v-btn
              href="login"
              class="text-btn"
              variant="text"
              v-text="'login'"
            />
            <v-btn
              href="register"
              class="text-btn"
              variant="outlined"
              v-text="'Register'"
            />
          </hidden>
        </nav>
      </div>
    </v-container>

  </v-app-bar>

</template>

<style lang="scss" scoped>
@import "./header-style.scss";
</style>

<script>
import { inject } from "vue";
import logo from "@/assets/images/logo-sti.png";

let counter = 0;
function createData(name, url, offset) {
  counter += 1;
  return {
    id: counter,
    name,
    url,
    offset,
  };
}

export default {
  components: {},
  props: {
    invert: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const smoothScroll = inject("smoothScroll");
    function scrollToMyEl(elemId) {
      const myEl = document.getElementById(elemId);
      smoothScroll({
        scrollTo: myEl, // scrollTo is also allowed to be number
        hash: `#${elemId}`, // required if updateHistory is true
        offset: -100,
      });
    }

    return {
      scrollToMyEl,
    };
  },
  data() {
    return {
      logo,
      loaded: false,
      sections: {},
      activeMenu: "",
      fixed: false,
      openDrawer: null,
      menuList: [
        createData("Beranda", "#Beranda"),
        createData("Produk", "#Produk"),
        createData("Kursus", "#Kursus"),
        createData("Explore", "#" + "Explore", -40),
      ],
    };
  },
  computed: {
    isMobile() {
      const mdDown = this.$vuetify.display.mdAndDown;
      return mdDown;
    },
    isDesktop() {
      const lgUp = this.$vuetify.display.lgAndUp;
      return lgUp;
    },
    mdUp() {
      const mdUp = this.$vuetify.display.mdAndUp;
      return mdUp;
    },
  },
  mounted() {
    this.loaded = true;
    const id = window.location.hash;
    const content = id.replace("#", "");
    const element = document.getElementById(content);
    if (element) {
      element.scrollIntoView();
    }

    const section = document.querySelectorAll(".scroll-nav-content > *");
    Array.prototype.forEach.call(section, (e) => {
      this.sections[e.id] = e.offsetTop;
    });
  },
  methods: {
    handleScroll() {
      const scrollPosition =
        document.documentElement.scrollTop || document.body.scrollTop;
      const topPosition = scrollPosition + 100;

      Object.keys(this.sections).forEach((i) => {
        if (this.sections[i] <= topPosition) {
          this.activeMenu = i;
        }
      });

      if (scrollPosition > 70) {
        this.fixed = true;
      } else {
        this.fixed = false;
      }
    },
    handleToggleOpen() {
      this.openDrawer = !this.openDrawer;
    },
  },
};
</script>
