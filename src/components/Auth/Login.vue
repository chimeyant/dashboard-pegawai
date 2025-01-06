<template>
  <AuthFrame
    title="Login"
    subtitle="SIDAKUDA Ver. 1.0"
    wizard="Sistem Database Kerugian Daerah"
  >
    <div>
      <div class="head">
        <div class="text-h4 font-weight-bold">
          Login
        </div>
        <v-btn
          class="button-link"
          variant="text"
          size="small"
          @click="$router.push({name:'register'})"
        >
          <v-icon class="icon signArrow">
            mdi-arrow-right
          </v-icon>
          Buat Akun Baru
        </v-btn>
      </div>

      <social-auth />

      <div class="separator text-body-2 text-grey">
        <p>
          atau dengan email
        </p>
      </div>
      <v-form ref="form">
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
        <v-row class="spacing3">
          <v-col
            cols="12"
            sm="12"
            class="px-3"
          >
            <v-text-field
              v-model="email"
              label="Email"
              :rules="emailRules"
              color="secondary"
              name="email"
              variant="outlined"
              filled
              required
              prepend-inner-icon="mdi-email"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            class="px-3"
          >
            <v-text-field
              v-model="password"
              label="Kata Sandi"
              :rules="requiredRules"
              color="secondary"
              class="input"
              name="password"
              filled
              required
              :type="showpassword ?`text`: `password`"
              variant="outlined"
              prepend-inner-icon="mdi-key"
              :append-inner-icon="showpassword ? `mdi-eye`:`mdi-eye-off`"
              @click:appendInner="setShowPassword"
            />
          </v-col>
        </v-row>
        <div class="form-helper">

          <div class="form-control-label">
            <v-checkbox
              label="Ingat kata sandi?"
              class="text-body-2"
            ></v-checkbox>
          </div>
          <v-btn
            size="small"
            class="button-link text-body-2 mt-3"
            variant="text"
            @click="$router.push({name: 'forgot-password' })"
          >
            Lupa Kata Sandi?
          </v-btn>
        </div>
        <div class="btn-area mt-10">
          <v-btn
            size="large"
            block
            color="deep-orange-darken-4"
            @click="postSignin"
          >
            Masuk
          </v-btn>
        </div>
      </v-form>
    </div>
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

    const postSignin = async () => {
      const payload = {
        email: email.value,
        password: password.value,
      };

      const result = await store.postSignin(payload).then(async (res) => {
        if (res) {
          await store.getUserInfo().then((res) => {
            if (store.user.authent == "peserta") {
              router.push({ name: "peserta-dashboard" });
            } else {
              router.push({ name: "dashboard" });
            }
          });
        } else {
          errstatus.value = true;
          setTimeout(() => {
            errstatus.value = false;
          }, 3000);
        }
      });

      // if (result) {
      //   console.log(store.user);
      //   if (store.user.authent == "peserta") {
      //     router.push({ name: "peserta-dashboard" });
      //   } else {
      //     router.push({ name: "dashboard" });
      //   }
      // } else {
      //   errstatus.value = true;
      //   setTimeout(() => {
      //     errstatus.value = false;
      //   }, 5000);
      // }
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
      postSignin,
      setShowPassword,
      errstatus,
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
