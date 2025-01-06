<template>
  <div class="form-page">
    <div class="page-wrap">
      <v-snackbar
        v-model="snackbar"
        :timeout="4000"
        location="top right"
        class="notification"
      >
        <div class="action">
          Message Sent
        </div>
        <template #actions>
          <v-btn
            variant="text"
            icon
            @click="snackbar = false"
          >
            <v-icon>mdi-close</v-icon>

          </v-btn>
        </template>
      </v-snackbar>
      <hidden point="mdUp">
        <div class="logo logo-header">
        </div>
      </hidden>
      <v-container
        class="inner-wrap"
        style="width: 800px;"
      >
        <v-btn
          href="/home"
          icon
          variant="text"
          class="backtohome"
        >
          <v-icon>mdi-home</v-icon>
          <v-icon>mdi-keyboard-backspace</v-icon>
        </v-btn>
        <v-card class="card form-box fragment-fadeUp">
          <div class="full-form-wrap">
            <h3 class="use-text-title title-contact pb-3 text-center">
              Kontak Kami
            </h3>
            <p class="desc use-text-subtitle2 text-center">
              Silahkan Kirim Pesan Untuk Menghubungi Kami
            </p>
            <div class="form">
              <v-form
                ref="form"
                v-model="valid"
              >
                <v-row class="spacing6">
                  <v-col
                    cols="12"
                    sm="6"
                    class="px-6"
                  >
                    <v-text-field
                      v-model="name"
                      :rules="nameRules"
                      label="Nama Lengkap"
                      color="white"
                      filled
                      required
                      variant="outlined"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    class="px-6"
                  >
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="Email"
                      class="input light"
                      color="white"
                      filled
                      required
                      variant="outlined"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    class="px-6"
                  >
                    <v-text-field
                      v-model="phone"
                      label="Phone"
                      color="white"
                      class="input light"
                      filled
                      variant="outlined"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    class="px-6"
                  >
                    <v-text-field
                      v-model="company"
                      label="Phone"
                      color="white"
                      class="input light"
                      filled
                      variant="outlined"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    class="px-6"
                  >
                    <v-textarea
                      v-model="message"
                      rows="6"
                      color="white"
                      class="input light"
                      filled
                      label="Pesan"
                      variant="outlined"
                    />
                  </v-col>
                </v-row>
                <div class="btn-area flex">
                  <div class="form-control-label white-label">
                    <v-checkbox
                      v-model="checkbox"
                      :rules="[v => !!v || 'You must agree to continue!']"
                      label="Setuju"
                      :hide-details="hideDetail"
                      color="secondary"
                      class="white-label"
                      required
                    />
                    <span>
                      <a
                        href="#"
                        class="link"
                      >
                        Privacy
                      </a>
                    </span>
                  </div>
                  <v-btn
                    :block="isMobile"
                    color="secondary"
                    size="large"
                    @click="validate"
                  >
                    Kirim
                  </v-btn>
                </div>
              </v-form>
            </div>
          </div>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./form-style.scss";
@import "../Title/title-style.scss";
</style>

<script>
import logo from "@/assets/images/education-logo.svg";
import brand from "@/assets/text/brand";
import link from "@/assets/text/link";
import Hidden from "../Hidden";

export default {
  components: {
    Hidden,
  },
  data() {
    return {
      valid: true,
      snackbar: false,
      name: "",
      nameRules: [(v) => !!v || "Name is required"],
      email: "",
      hideDetail: true,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      phone: "",
      company: "",
      message: "",
      checkbox: false,
      logo,
      brand,
      routeLink: link,
    };
  },
  computed: {
    isMobile() {
      const xsDown = this.$vuetify.display.xsAndDown;
      return xsDown;
    },
  },
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        this.snackbar = true;
        this.hideDetail = true;
      } else {
        this.hideDetail = false;
      }
    },
  },
};
</script>
