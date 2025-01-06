<template>
  <div>
    <v-dialog
      v-model="form.delete"
      activator="parent"
      width="400"
      persistent
    >
      <v-card class="rounded-0 animate__animated animate__fadeIn">
        <v-card-title :class="`row bg-` + colors.ERROR + ` `+ theme.mode ">
          <v-icon
            size="x-small"
            :color="colors.DOT"
            class=" mr-2"
          >mdi-delete-circle</v-icon>
          <span :class="`font-weight-bold text-body-1 pt-2 animate__animated animate__flash animate__infinite text-` + colors.TITLE">Konfirmasi</span>
        </v-card-title>
        <v-card-text class="my-2">
          <span class="text-body-2">Apakah anda yakin akan menghapus data tersebut...?</span>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions class="">
          <v-row class="justify-end mx-5">

            <v-btn
              :color="colors.WARNING"
              class="mx-2"
              variant="outlined"
              @click="deleteEvent"
              style="text-transform: none;"
            >Ya, Saya Yakin</v-btn>
            <v-btn
              color="grey"
              @click="closeForm"
              class="mx-2"
              variant="flat"
              style="text-transform: none;"
            >Batal</v-btn>
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
    id: {
      type: String,
      required: true,
    },
  },

  setup(props, { emit }) {
    const store = useAppStore();

    const form = computed(() => store.form);
    const theme = computed(() => store.theme);
    const colors = computed(() => store.colors);

    const deleteEvent = () => {
      emit("btn-delete");
    };

    const closeForm = () => {
      store.setForm({
        add: false,
        edit: false,
        delete: false,
      });
    };

    return {
      theme,
      colors,
      form,
      deleteEvent,
      closeForm,
    };
  },
};
</script>
