<template>
  <AuthFrame
    title="Lupa Kata Sandi"
    subtitle="SIAMANDA"
    wizard="Versi 2.00"
  >
    <div style="min-height: 675px;">
      <div class="head">
        <div class="text-h4 font-weight-bold">
          Lupa Kata Sandi
        </div>
      </div>
      <div class="py-10">
        Silahkan masukan email anda
      </div>

      <v-form
        ref="form"
        class="py-5"
      >
        <v-row
          class="$spacing3 mb-10"
          v-if="errstatus"
        >
          <v-col class="px-3">
            <v-alert
              border="start"
              border-color="brown-lighten-4"
              elevation="2"
              color="red"
              class="text-body-2"
            >
              Opps..!, Pengguna atau Kata Sandi Tidak Benar
            </v-alert>
          </v-col>
        </v-row>
        <v-row class="spacing3 ">
          <v-col
            cols="12"
            sm="12"
            class="px-3"
          >
            <v-text-field
              v-model="email"
              label="Pengguna | Email"
              :rules="emailRules"
              color="secondary"
              name="email"
              variant="outlined"
              filled
              required
              prepend-inner-icon="mdi-card-account-details-outline"
            />
          </v-col>
        </v-row>

        <div class="btn-area mt-10">
          <v-btn
            size="large"
            block
            color="deep-orange-darken-4"
            @click="postForgotPassword"
          >
            Kirim
          </v-btn>
        </div>
      </v-form>

    </div>
    <span class="text-body-2 text-brown-lighten-1 font-weight-thin">Form Ver. 2.00</span>

  </AuthFrame>
</template>

<style lang="scss" scoped>
@import "./form-style.scss";
</style>

<script>
import { useRouter } from "vue-router";
import { useAppStore } from "../../store/app";
import { ref } from "vue";

import AuthFrame from "./AuthFrame";
import SocialAuth from "./SocialAuth.vue";

export default {
  components: {
    AuthFrame,
    SocialAuth,
  },
  setup() {
    const store = useAppStore();
    const router = useRouter();

    const email = ref(null);
    const password = ref(null);
    const errstatus = ref(false);
    const showpassword = ref(false);

    const emailRules = [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ];

    const requiredRules = [(v) => !!v || "This field is required"];

    const postForgotPassword = async () => {
      const payload = {
        email: email.value,
      };

      const result = await store.http.post(
        "api/v1/auth/reset-password",
        payload
      );

      if (result) {
        router.push({ name: "reset-success" });
      } else {
        errstatus.value = true;
        setTimeout(() => {
          errstatus.value = false;
        }, 5000);
      }
    };

    const setShowPassword = () => {
      if (showpassword.value) {
        showpassword.value = false;
      } else {
        showpassword.value = true;
      }
    };

    return {
      email,
      password,
      emailRules,
      requiredRules,
      showpassword,
      setShowPassword,
      errstatus,
      postForgotPassword,
    };
  },

  computed: {
    isMobile() {
      const smDown = this.$vuetify.display.smAndDown;
      return smDown;
    },
  },
};
</script>
