<template>
  <div>
    <v-row class="justify-center">
      <div class="rounded-2 pa-2">
        <img
          :src="imagePreview"
          alt=""
          srcset=""
          width="150"
          height="150"
          class="border-1"
        >
        <input
          id="fileInput"
          type="file"
          ref="fileInput"
          style="display: none;"
          accept="image/*"
          @change="handleFileChange"
        />

        <v-progress-linear
          :model-value="progressUploader"
          bg-color="pink-lighten-3"
          color="pink-lighten-1"
          class="mb-2"
          v-show="stateUploader"
        ></v-progress-linear>
        <v-btn
          block
          variant="outlined"
          :color="theme.color"
          @click="openFileInput"
          style="text-transform: none !important;"
        >Upload Logo</v-btn>
      </div>

    </v-row>

  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useAppStore } from "../../store/app";
import axios from "axios";
import AuthProviders from "@/provider/authProviders";

export default {
  setup(props, { emit }) {
    const store = useAppStore();
    const theme = computed(() => store.theme);
    const fileInput = ref(null);
    const imagePreview = ref(null);
    const stateUploader = computed(() => store.uploader.state);
    const progressUploader = computed(() => store.uploader.progress);
    const apiUrl = import.meta.env.VITE_API_URL;
    const auth = new AuthProviders();
    const uploadresponse = ref({});

    const openFileInput = () => {
      document.getElementById("fileInput").click();
    };

    const handleFileChange = (event) => {
      const imageFile = fileInput.value.files[0];
      uploadFile(imageFile);
    };

    const uploadFile = async (fileInput) => {
      if (!fileInput) {
        alert("file belum di pilih");
      }
      store.starUpload();
      const formData = new FormData();
      formData.append("file", fileInput);
      formData.append("doctype", "tes");
      const endpoint = apiUrl + "/api/v2/media";
      const token = auth.token;
      await axios
        .post(endpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
          onUploadProgress: (progressEvent) => {
            const progress =
              Math.round(progressEvent.loaded * 100) / progressEvent.total;
            store.setUploaderProgress(progress);
          },
        })
        .then((res) => {
          imagePreview.value = res.data.path;
          uploadresponse.value = res.data;
        })
        .catch((error) => {
          store.catchError(error.response);
        })
        .finally(() => {
          store.finishUpload();
        });

      emit("onResponse", uploadresponse.value);
    };

    return {
      theme,
      openFileInput,
      fileInput,
      handleFileChange,
      stateUploader,
      progressUploader,
      uploadFile,
      imagePreview,
    };
  },
};
</script>
