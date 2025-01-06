<template>
  <v-row :class="device.mobile || device.tablet ? ``:`mx-1 mt-1`">
    <v-col cols=12>
      <form-full-page
        title="Master Informasi Aplikasi"
        @btnAddNew="postUpdate"
        @btnRefresh="fetchRecord"
      >
        <v-row class="mx-1 mt-1 mb-2">
          <v-col
            cols="12"
            sm="12"
            md="10"
          >
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nama Aplikasi"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  v-model="record.app_name"
                  :color="theme.color"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Versi"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  v-model="record.app_ver"
                  :color="theme.color"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  label="Tema"
                  variant="outlined"
                  density="compact"
                  v-model="record.app_theme"
                  :items="themes"
                  :color="theme.color"
                  hide-details
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-select
                  label="Warna"
                  variant="outlined"
                  density="compact"
                  v-model="record.app_color"
                  :items="colors"
                  :color="theme.color"
                  hide-details
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nama Instansi"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  v-model="record.app_company"
                  :color="theme.color"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Slogan"
                  rows="3"
                  variant="outlined"
                  densirty="compact"
                  :color="theme.color"
                  hide-details
                  v-model="record.app_slogan"
                >
                </v-textarea>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Phone"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  v-model="record.app_phone"
                  :color="theme.color"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Alamat"
                  rows="3"
                  variant="outlined"
                  densirty="compact"
                  :color="theme.color"
                  hide-details
                  v-model="record.app_address"
                >
                </v-textarea>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="2"
          >
            <v-row class="justify-center content-center">
              <div>
                <img
                  :src="imgPath"
                  alt=""
                  srcset=""
                  height="150"
                  width="150"
                >
                <v-progress-linear
                  :model-value="uploaderProgress"
                  bg-color="pink-lighten-3"
                  color="pink-lighten-1"
                  class="mb-2"
                  v-show="uploaderState"
                ></v-progress-linear>
                <input
                  type="file"
                  ref="fileInput"
                  @change="onHandleChangeFile"
                  style="display: none;"
                />

                <v-btn
                  :color="theme.color"
                  block
                  variant="outlined"
                  @click="openFileUpload"
                >Upload</v-btn>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </form-full-page>
    </v-col>
  </v-row>
</template>

<script >
import { useAppStore } from "../../../store/app";
import { computed, onMounted, ref } from "vue";
import FormFullPage from "@/components/Form/FormFullPage";
import Uploader from "@/components/Uploader";

export default {
  components: {
    FormFullPage,
    Uploader,
  },
  setup() {
    const store = useAppStore();

    const device = computed(() => store.device);
    const theme = computed(() => store.theme);
    const color = computed(() => store.colors);
    const record = computed(() => store.record);
    const rules = computed(() => store.rules);
    const uploaderState = computed(() => store.uploader.state);
    const uploaderProgress = computed(() => store.uploader.progress);
    const fileInput = ref(null);
    const imgPath = ref(null);

    const themes = [
      {
        title: "Light",
        value: "light",
      },
      {
        title: "Dark",
        value: "dark",
      },
    ];

    const colors = [
      {
        title: "Red",
        value: "red",
      },
      {
        title: "Pink",
        value: "pink",
      },
      {
        title: "Purple",
        value: "purple",
      },
      {
        title: "Indigo",
        value: "indigo",
      },
      {
        title: "Brown",
        value: "brown",
      },
    ];

    const fetchRecord = async () => {
      const endpoint = "api/v1/master-data/app-info";
      const result = await store.showRecord(endpoint);
      store.setRecord(result.data);
      imgPath.value = result.data.app_logo_path;
    };

    const postUpdate = async () => {
      const endpoint = "api/v1/master-data/app-info/" + record.value.id;

      const result = await store.postRecord(endpoint, record.value, "update");

      await store.fetchAppInfo();

      store.setSnackbar(result.data.message, color.value.SUCCESS, "success");
    };

    const openFileUpload = () => {
      fileInput.value.click();
    };

    const onHandleChangeFile = async () => {
      const file = fileInput.value.files[0];
      const result = await store.uploadFile(file, "logo");
      imgPath.value = result.data.path;
      record.value.app_logo = result.data.name;
    };

    onMounted(() => {
      store.setPage({
        title: "Manjemen Informasi Aplikasi",
        subtitle: "Berikut adalah modul untuk pengaturan informasi aplikasi",
        actions: {
          refresh: true,
          add: true,
          edit: false,
          delete: false,
          bulkdelete: false,
          export: false,
          print: false,
          help: true,
        },
      });
      fetchRecord();
    });

    return {
      device,
      theme,
      record,
      rules,
      themes,
      colors,
      fetchRecord,
      postUpdate,
      openFileUpload,
      onHandleChangeFile,
      fileInput,
      imgPath,
      uploaderState,
      uploaderProgress,
    };
  },
};
</script>
