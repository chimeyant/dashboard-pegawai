<template>
  <v-row :class="device.mobile || device.tablet ? ``:`mx-1 mt-1 justify-center`">
    <v-col
      cols="12"
      sm="12"
      md="6"
    >
      <form-full-page
        title="Perubahan Kata Sandi"
        @btnAddNew="postUpdate"
      >
        <v-row class="py-5">
          <v-col
            cols="12"
            sm="12"
            md="4"
          >
            <div>
              <v-avatar size="150">
                <v-img
                  :src="avatar"
                  alt=""
                  srcset=""
                  cover
                >
                </v-img>
              </v-avatar>
            </div>
            <input
              type="file"
              accept="image/*"
              style="display: none;"
              ref="fileInput"
              @change="postFileUpload"
            >
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="8"
          >
            <v-row class="mt-2">
              <v-col cols="12">
                <v-text-field
                  label="Email"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  v-model="record.email"
                  :color="theme.color"
                  :rules="rules.email"
                  disabled
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Kata Sandi Baru"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  v-model="record.password"
                  :color="theme.color"
                  :type="showpassword ?`text`:`password`"
                  :append-inner-icon="showpassword ? `mdi-eye-off`:`mdi-eye`"
                  @click:append-inner="setShowPassword"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Ulang Kata Sandi Baru"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  v-model="record.repassword"
                  :color="theme.color"
                  :type="showpassword ?`text`:`password`"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>

            </v-row>
            <v-row class="justify-end px-1 py-2">

              <v-btn
                prepend-icon="mdi-content-save"
                :color="colors.ADD"
                class="mx-2"
                variant="outlined"
                style="text-transform: none;"
                @click="postUpdate"
              >Simpan</v-btn>

            </v-row>
          </v-col>

        </v-row>
      </form-full-page>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { useAppStore } from "@/store/app";
import FormFullPage from "@/components/Form/FormFullPage";
import { computed, onMounted, ref } from "vue";

export default {
  components: {
    FormFullPage,
  },
  setup() {
    const store = useAppStore();

    const device = computed(() => store.device);
    const theme = computed(() => store.theme);
    const record = computed(() => store.record);
    const rules = computed(() => store.rules);
    const colors = computed(() => store.colors);
    const endpoint = "api/v1/auth/user-info";
    const avatar = ref(null);
    const showpassword = ref(false);

    const fileInput = ref(null);

    const fetchUserInfo = async () => {
      const result:any = await store.showRecord(endpoint);

      store.setRecord(result.data);

      avatar.value = record.value.avatar_path;
    };

    const postUpdate = async () => {
      if (record.value.password != record.value.repassword) {
        store.setSnackbar(
          "Oppps..., Kata sandi tidak sama...!",
          colors.value.ERROR
        );

        return;
      }
      const endpoint = "api/v1/auth/change-password";

      const result = await store.postRecord(endpoint, record.value, "store");

      store.setSnackbar(result?.data.message, colors.value.SUCCESS);
    };

    const setShowPassword = () => {
      if (showpassword.value) {
        showpassword.value = false;
      } else {
        showpassword.value = true;
      }
    };

    onMounted(() => {
      store.setPage({
        title: "Ganti Kata Sandi",
        subtitle:
          "Silahkan ganti kata sandi secara gradual untuk keamanan akun anda",
        actions: {
          refresh: false,
          add: true,
          edit: false,
          delete: false,
          bulkdelete: false,
          export: false,
          print: false,
          help: false,
        },
      });

      fetchUserInfo();
    });
    return {
      device,
      theme,
      colors,
      record,
      rules,
      avatar,
      fileInput,
      postUpdate,
      showpassword,
      setShowPassword,
    };
  },
};
</script>
