<template>
  <footer class="footer">
    <v-container class="max-lg">
      <v-row class="spacing4">
        <v-col
          class="pa-4"
          md="3"
          cols="12"
        >
          <div class="logo">
            <img
              :src="logo"
              alt="logo"
            >
            <h6 class="text-h6">
              Master App
            </h6>
          </div>
          <p class="footer-desc pb-2">
            Tomorrow's Tech, Today's Solutions
          </p>
          <p
            v-if="isDesktop"
            class="body-2"
          >
            &copy;&nbsp;
            Sender Technology Indonesia, PT
          </p>
        </v-col>
        <v-col
          class="pa-6"
          md="6"
          cols="12"
        >
          <v-expansion-panels
            v-if="isMobile"
            class="accordion-root"
          >
            <v-expansion-panel
              v-for="(footer, index) in footers"
              :key="index"
              class="accordion-content"
            >
              <v-expansion-panel-title>
                <h6 class="text-h6">
                  {{ footer.title }}
                </h6>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <ul>
                  <li
                    v-for="(item, index) in footer.description"
                    :key="index"
                  >

                  </li>
                </ul>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-row
            v-if="isDesktop"
            justify="space-around"
          >
            <v-col
              v-for="(footer, index) in footers"
              :key="index"
              sm="3"
              cols="12"
              class="px-lg-4 px-0 site-map-item"
            >
              <h6 class="title-nav">
                {{ footer.title }}
              </h6>
              <ul>
                <li
                  v-for="(item, index) in footer.description"
                  :key="index"
                >

                </li>
              </ul>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          md="3"
          cols="12"
          class="pa-4"
        >
          <div class="socmed">
            <v-btn
              variant="text"
              icon
              class="button"
            >
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn
              variant="text"
              icon
              class="button"
            >
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
            <v-btn
              variant="text"
              icon
              class="button"
            >
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn
              variant="text"
              icon
              class="button"
            >
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
          </div>

        </v-col>
      </v-row>
      <p
        v-if="isMobile"
        class="body-2 text-center"
      >
        &copy;&nbsp;
        Footer Text
      </p>
    </v-container>
  </footer>
</template>

<style scoped lang="scss">
@import "./footer-style";
</style>

<script lang="ts">
import logo from "@/assets/images/logo-sti.png";

export default {
  setup() {},
  data: () => ({
    logo,
    footers: [
      {
        title: "Company",
        description: ["Team", "History", "Contact us", "Locations"],
        link: ["#team", "#history", "#contact-us", "#locations"],
      },
      {
        title: "Resources",
        description: [
          "Resource",
          "Resource name",
          "Another resource",
          "Final resource",
        ],
        link: [
          "#resource",
          "#resource-name",
          "#another-resource",
          "#final-resource",
        ],
      },
      {
        title: "Legal",
        description: ["Privacy policy", "Terms of use"],
        link: ["#privacy-policy", "#terms-of-use"],
      },
    ],
  }),
  computed: {
    isDesktop() {
      const mdUp = this.$vuetify.display.mdAndUp;
      return mdUp;
    },
    isMobile() {
      const smDown = this.$vuetify.display.smAndDown;
      return smDown;
    },
    langList() {
      const list = [];
      const i18n = this.$i18n.locales;

      i18n.map((locale) => {
        list.push({
          title: this.$t("common." + locale.code),
          value: locale.code,
        });
        return false;
      });
      return list;
    },
  },
};
</script>
