<template>
  <div class="d-flex justify-center">
    <v-card
      light
      class="rounded-0 animate__animated animate__fadeIn"
      :width="width"
    >
      <v-card-title :class="`row bg-` + theme.color  ">
        <v-row class="pa-3">

          <span :class="`font-weight-bold text-body-1 pt-2 text-` + colors.TITLE">{{ title }}</span>
        </v-row>
      </v-card-title>
      <v-card-item>
        <slot />
      </v-card-item>
      <v-divider></v-divider>
      <v-card-actions class="">
        <v-row class="justify-end mx-1">
          <v-btn
            :prepend-icon="addIcon"
            :color="colors.ADD"
            class="mx-2"
            variant="outlined"
            @click="saveEvent"
            style="text-transform: none;"
          >{{ addCaption }}</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { useAppStore } from "@/store/app";
import { computed, ref } from "vue";

export default {
  props: {
    width: {
      type: Number,
      default: 800,
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
      default: "Save",
    },
  },
  setup(props, { emit }) {
    const store = useAppStore();
    const device = computed(() => store.device);
    const colors = computed(() => store.colors);
    const theme = computed(() => store.theme);
    const page = computed(() => store.page);
    const table = computed(() => store.table);
    const width = ref(props.width);

    const saveEvent = () => {
      emit("btn-save");
    };

    const updateEvent = () => {
      emit("btn-update");
    };

    return {
      device,
      width,
      colors,
      theme,
      page,
      saveEvent,
      updateEvent,
    };
  },
};
</script>
