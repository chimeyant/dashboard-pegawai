<template>
  <div>
    <v-dialog
      v-model="form.help"
      activator="parent"
      :width="width"
      persistent
    >
      <v-card class="rounded-0 animate__animated animate__fadeIn">
        <v-card-title :class="`row bg-` + theme.color + ` `+ theme.mode ">
          <v-icon
            size="x-small"
            :color="colors.DOT"
            class=" mr-2"
          >mdi-help-circle</v-icon>
          <span :class="`font-weight-bold text-body-1 pt-2 text-` + colors.TITLE">{{ title }}</span>
        </v-card-title>
        <v-card-text class="my-2">
          <slot />
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions class="">
          <v-row class="justify-end mx-5">
            <v-btn
              color="grey"
              @click="closeForm"
              class="mx-2"
              variant="tonal"
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
  },

  setup(props, { emit }) {
    const store = useAppStore();

    const form = computed(() => store.form);
    const theme = computed(() => store.theme);
    const colors = computed(() => store.colors);

    const closeForm = () => {
      store.setForm({
        add: false,
        edit: false,
        delete: false,
        help: false,
      });
    };

    return {
      theme,
      colors,
      form,
      closeForm,
    };
  },
};
</script>
