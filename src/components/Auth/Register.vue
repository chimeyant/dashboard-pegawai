<template>
  <AuthFrame
    title="Registrasi"
    subtitle="Senang Bertemu Anda"
    wizard="Silahkan tekan tombol registrasi untuk melanjutkan..!"
  >
    <div>
      <div class="head">
        <div class="text-h4 font-weight-bold">
          Registrasi
        </div>
        <hidden point="smDown">
          <v-btn
            class="button-link"
            variant="text"
            size="small"
            @click="$router.push({name:'login'})"
          >
            <v-icon class="icon signArrow">
              mdi-arrow-right
            </v-icon>
            Sudah Memiliki Akun
          </v-btn>

        </hidden>
      </div>
      <social-auth />
      <div class="separator text-body-2 text-grey">
        <p>
          atau dengan email
        </p>
      </div>
      <v-form
        ref="form"
        v-model="valid"
      >
        <v-row class="spacing3">
          <v-col
            cols="12"
            sm="12"
            class="px-3"
          >
            <v-text-field
              prepend-inner-icon="mdi-account"
              v-model="name"
              label="Nama Lengkap"
              color="secondary"
              name="name"
              variant="outlined"
              filled
              required
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            class="px-3"
          >
            <v-text-field
              v-model="email"
              prepend-inner-icon="mdi-email"
              label="Email"
              :rules="emailRules"
              color="secondary"
              name="email"
              variant="outlined"
              filled
              required
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            class="px-3"
          >
            <v-text-field
              v-model="phone"
              prepend-inner-icon="mdi-whatsapp"
              label="Nomor Whatsapp"
              color="secondary"
              name="phone"
              variant="outlined"
              filled
              placeholder="Contoh Pengisian : 0812xxxxxx"
              required
            />
          </v-col>
        </v-row>
        <div class="form-helper">

        </div>
        <div class="btn-area mt-10">
          <v-btn
            @click="postRegister"
            size="large"
            block
            color="blue"
          >
            Registrasi
          </v-btn>
        </div>
      </v-form>
    </div>
  </AuthFrame>
</template>

<style lang="scss" scoped>
@import "./form-style.scss";
</style>

<script lang="ts">
import { useAppStore } from "@/store/app";
import { useRouter } from "vue-router";
import AuthFrame from "./AuthFrame";
import SocialAuth from "./SocialAuth.vue";
import Hidden from "@/components/Hidden";
import { ref } from "vue";

export default {
  components: {
    AuthFrame,
    SocialAuth,
    Hidden,
  },

  setup() {
    const store = useAppStore();
    const router = useRouter();

    const name = ref(null);
    const email = ref(null);
    const phone = ref(null);

    const emailRules = [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ];

    const requiredRules = [(v) => !!v || "This field is required"];

    const postRegister = async () => {
      const payload = {
        name: name.value,
        email: email.value,
        phone: phone.value,
      };

      const result = await store.postRegister(payload);
      if (result) {
        await router.push({ name: "register-success" });
      } else {
        return;
      }
    };

    const formLogin = () => {
      router.push({ name: "login" });
    };

    return {
      name,
      email,
      phone,
      emailRules,
      requiredRules,
      postRegister,
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
