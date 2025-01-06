<template>
  <AuthFrame
    title="Lupa Kata Sandi"
    subtitle="Senang Bertemu Anda"
    wizard="Semoga Sehat Selalu...!"
  >
    <div>
      <div class="head">
        <div class="text-h4 font-weight-bold">
          Reset Kata Sandi
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
            Login
          </v-btn>

        </hidden>
      </div>
      <div class="mt-16">
        <h3 class="mb-5">Konfirmasi...!</h3>
        <p class="text-body-2">
          Proses reset kata sandi anda berhasil, silahkan menunggu pesan terkait akun dan password anda dalam beberapa saat akan dikirim melalui Whatsapp Messenger"
        </p>
      </div>

    </div>
  </AuthFrame>
</template>

<style lang="scss" scoped>
@import "./form-style.scss";
</style>

<script lang="">
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
        router.push({ name: "login" });
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
