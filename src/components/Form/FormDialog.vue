<template>
  <div>
    <v-dialog
      v-model="form.add"
      activator="parent"
      :width="width"
      persistent
      :fullscreen="fullscreen"
    >
      <v-card class="rounded-0 animate__animated animate__fadeIn">
        <v-card-title :class="`row bg-` + theme.color + ` `+ theme.mode ">
          <v-icon
            size="x-small"
            :color="colors.DOT"
            class="animate__animated animate__flash animate__infinite mr-2"
          >mdi-file-document-edit</v-icon>
          <span :class="`font-weight-bold text-body-1 pt-2 text-` + colors.TITLE">{{ title }}</span>
        </v-card-title>
        <v-card-text class="my-2">
          <slot />
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions class="">
          <v-row class="justify-end mx-1">
            <v-btn
              :color="colors.EDIT"
              class="mx-2"
              variant="outlined"
              v-show="form.edit"
              @click="updateEvent"
              style="text-transform: none;"
              prepend-icon="mdi-content-save"
            >Ubah</v-btn>
            <v-btn
              :prepend-icon="addIcon"
              :color="colors.ADD"
              class="mx-2"
              variant="outlined"
              v-show="!form.edit"
              @click="storeEvent"
              style="text-transform: none;"
            >{{ addCaption }}</v-btn>
            <v-btn
              color="red"
              @click="closeForm"
              class="mx-2"
              variant="flat"
              style="text-transform: none;"
            >Tutup</v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { computed } from "vue";
import { useAppStore } from "../../store/app";

export default {
  props: {
    width: {
      type: String,
      default: "500",
    },
    title: {
      type: String,
      default: "",
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    addIcon: {
      type: String,
      default: "mdi-content-save",
    },
    addCaption: {
      type: String,
      default: "Tambah",
    },
  },

  setup(props, { emit }) {
    const store = useAppStore();

    const form = computed(() => store.form);
    const theme = computed(() => store.theme);
    const colors = computed(() => store.colors);

    const storeEvent = () => {
      emit("btn-add");
    };

    const updateEvent = () => {
      emit("btn-edit");
    };

    const closeForm = () => {
      store.setForm({
        add: false,
        edit: false,
      });
    };

    return {
      theme,
      colors,
      form,
      storeEvent,
      updateEvent,
      closeForm,
    };
  },
};
</script>
