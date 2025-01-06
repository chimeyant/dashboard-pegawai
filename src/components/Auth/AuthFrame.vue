<template>
  <div class="form-page">
    <div class="page-wrap">
      <hidden point="mdUp">
        <div class="logo logo-header">
          <a>
            <img
              src="/images/logo-banten.png"
              alt="logo"
            >
          </a>
        </div>
      </hidden>
      <v-container class="max-lg inner-wrap">
        <v-card class="card form-box fragment-fadeUp">
          <v-btn
            href="/"
            icon
            variant="text"
            class="backtohome"
          >

            <v-icon>mdi-home-outline</v-icon>
            <v-icon>mdi-keyboard-backspace</v-icon>

          </v-btn>
          <div class="auth-frame">
            <v-row>
              <v-col
                md="5"
                cols="12"
              >
                <hidden point="smDown">
                  <div class="greeting">
                    <div class="deco">
                      <div class="primary-light" />
                      <div class="secondary-main" />
                      <div class="secondary-light" />
                    </div>
                    <div class="logo">
                      <img
                        src="/images/logo-banten.png"
                        alt="logo"
                      >
                      <p class="use-text-subtitle2">
                        {{ title }}
                      </p>
                    </div>
                    <h4 class="use-text-title2 pb-2">
                      {{ subtitle }}
                    </h4>
                    <h6 class="use-text-paragraph">
                      {{ wizard }}
                    </h6>
                  </div>
                </hidden>
              </v-col>
              <v-col
                md="7"
                cols="12"
              >
                <div class="form-wrap">
                  <slot />
                </div>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./form-style.scss";
</style>

<script>
import Hidden from "@/components/Hidden/index.vue";

export default {
  components: {
    Hidden,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    wizard: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
};
</script>
