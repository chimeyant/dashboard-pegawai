<template>
  <v-row :class="device.mobile || device.tablet ? ``:`mx-1 mt-1 justify-center`">
    <v-col
      cols="12"
      sm="12"
      md="6"
    >
      <form-full-page
        title="Pengaturan Profile"
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
                <v-icon
                  style="z-index: 99; position: absolute;"
                  @click="openFileUpload"
                >
                  mdi-camera
                </v-icon>
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
                  label="Nama Lengkap"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  v-model="record.name"
                  :color="theme.color"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
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
                  label="Level"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  v-model="record.authent"
                  :color="theme.color"
                  disabled
                ></v-text-field>
              </v-col>
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
    const record: any = computed(() => store.record);
    const rules = computed(() => store.rules);
    const colors = computed(() => store.colors);
    const endpoint = "api/v1/auth/user-info";
    const avatar = ref(null);

    const fileInput = ref(null);

    const fetchUserInfo = async () => {
      const result: any = await store.showRecord(endpoint);

      store.setRecord(result.data.data);

      avatar.value = record.value.avatar_path;
    };

    const postUpdate = async () => {
      const endpoint = "api/v1/utility/user-update-profile";

      const result = await store.postRecord(endpoint, record.value, "store");

      await store.getUserInfo();

      store.setSnackbar(result?.data.message, colors.value.SUCCESS);
    };

    const openFileUpload = () => {
      fileInput.value.click();
    };

    const postFileUpload = async () => {
      const file = fileInput.value.files[0];

      const result = await store.uploadFile(file, "profiles");

      avatar.value = result.data.path;
      record.value.avatar = result.data.name;

      store.setSnackbar("Proses upload berhasil", colors.value.SUCCESS);
    };

    onMounted(() => {
      store.setPage({
        title: "Profile Pengguna",
        subtitle: "Berikut adalah profile anda",
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
      record,
      rules,
      avatar,
      fileInput,
      postUpdate,
      openFileUpload,
      postFileUpload,
    };
  },
};
</script>
