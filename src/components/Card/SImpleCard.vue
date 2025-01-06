<template>
  <div class="relative zoom-in box">
    <v-row class="pa-7">
      <v-icon
        :color="theme.color"
        size="32"
      >{{ icon }}</v-icon>
      <v-spacer></v-spacer>
      <v-chip color="green">
        {{ chipTitle }} <v-icon class="ml-1">{{ chipIcon }}</v-icon>
      </v-chip>
    </v-row>
    <v-row class="pl-5">
      <div class="font-weight-bold text-h4">
        {{ count }}
      </div>
    </v-row>
    <v-row class="px-5 py-1">
      <div class="text-subtitle-1 text-grey">
        {{ title }}
      </div>
    </v-row>

  </div>
</template>
<style>
.relative {
  position: relative;
}
.zoom-in {
  transition-property: transform, box-shadow;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.box {
  height: 160px;
  box-shadow: 0 3px 5px #0000000b;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.6rem;
  position: relative;
}

.box::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
}
</style>

<script>
import { computed } from "vue";
import { useAppStore } from "../../store/app";

export default {
  props: {
    title: {
      type: String,
      default: "Title",
    },
    count: {
      type: String,
      default: "1.000",
    },
    icon: {
      type: String,
      default: "mdi-home",
    },
    chipTitle: {
      type: String,
      default: "Title",
    },
    chipIcon: {
      type: String,
      default: "mdi-arrow-down-bold-circle",
    },
  },
  setup(props, { emit }) {
    const store = useAppStore();

    const theme = computed(() => store.theme);
    return {
      theme,
    };
  },
};
</script>
