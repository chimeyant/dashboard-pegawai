<template>
  <div>
    <v-card
      light
      class="rounded-0 animate__animated animate__fadeIn"
    >
      <v-card-title :class="`row bg-` + theme.color  ">
        <v-row class="pa-3">
          <v-text-field
            variant="solo"
            label="Pencarian"
            placeholder="Silahkan klik kolom untuk mencari data pada kolom tertentu"
            density="compact"
            hide-details
            rounded=""
            append-inner-icon="mdi-database-search"
            v-model:model-value="table.search"
          ></v-text-field>
          <v-spacer v-if="device.laptop || device.desktop || device.tv"></v-spacer>
          <div
            class="bg-white rounded-pill pa-2"
            v-show="device.laptop || device.desktop || device.tv"
          >
            <v-tooltip
              text="Tambah Data"
              location="top"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  icon="mdi-plus"
                  size="x-small"
                  :color="colors.ADD"
                  class="text-white mx-1"
                  v-bind="props"
                  v-show="page.actions.add"
                  @click="addNewEvent"
                >
                </v-btn>
              </template>
            </v-tooltip>
            <v-tooltip
              text="Cetak"
              location="top"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  icon="mdi-printer"
                  size="x-small"
                  :color="colors.DWONLOAD"
                  class="text-white mx-1"
                  v-bind="props"
                  v-show="page.actions.print"
                  @click="printEvent"
                >
                </v-btn>
              </template>
            </v-tooltip>
            <v-tooltip
              text="Export"
              location="top"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  icon="mdi-file-excel"
                  size="x-small"
                  :color="colors.DWONLOAD"
                  class="text-white mx-1"
                  v-bind="props"
                  v-show="page.actions.export"
                  @click="exportEvent"
                >
                </v-btn>

              </template>
            </v-tooltip>
            <v-tooltip
              text="Hapus Data Terpilih"
              location="top"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  icon="mdi-delete-sweep"
                  size="x-small"
                  :color="colors.DELETE"
                  class="text-white mx-1"
                  v-bind="props"
                  v-show="page.actions.bulkdelete"
                  @click="bulkDeleteEvent"
                >
                </v-btn>
              </template>
            </v-tooltip>
            <v-tooltip
              text="Refresh Data"
              location="top"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  icon="mdi-refresh"
                  size="x-small"
                  :color="colors.REFRESH"
                  class="text-white mx-1"
                  @click="refreshEvent"
                  v-bind="props"
                  v-show="page.actions.refresh"
                >
                </v-btn>
              </template>
            </v-tooltip>
            <v-tooltip
              text="Kembali"
              location="top"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  icon="mdi-page-previous"
                  size="x-small"
                  :color="colors.BACK"
                  class="text-white mx-1"
                  @click="backEvent"
                  v-bind="props"
                  v-show="page.actions.back"
                >
                </v-btn>
              </template>
            </v-tooltip>
            <v-tooltip
              text="Bantuan"
              location="top"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  icon="mdi-help"
                  size="x-small"
                  :color="colors.HELP"
                  class="text-white mx-1"
                  v-bind="props"
                  v-show="page.actions.help"
                  @click="helpEvent"
                >
                </v-btn>
              </template>
            </v-tooltip>
          </div>

          <div
            v-if="device.mobile || device.tablet"
            class="ml-2 mt-1"
          >
            <v-menu location="start">
              <template v-slot:activator="{ props }">
                <v-btn
                  icon="mdi-dots-vertical"
                  v-bind="props"
                  size="x-small"
                ></v-btn>

              </template>

              <v-list density="compact">
                <v-list-item
                  title="Tambah Data"
                  v-show="page.actions.add"
                  @click="addNewEvent"
                >
                  <template v-slot:prepend>
                    <v-icon
                      :class="`text-`+ colors.ADD "
                      icon="mdi-plus-circle"
                    ></v-icon>
                  </template>
                </v-list-item>
                <v-list-item
                  title="Refresh Data"
                  v-show="page.actions.add"
                  @click="refreshEvent"
                >
                  <template v-slot:prepend>
                    <v-icon
                      :class="`text-`+ theme.color "
                      icon="mdi-refresh-circle"
                    ></v-icon>
                  </template>
                </v-list-item>

              </v-list>
            </v-menu>
          </div>
        </v-row>
      </v-card-title>
      <v-card-item>
        <slot />
      </v-card-item>
    </v-card>
  </div>
</template>

<script>
import { useAppStore } from "@/store/app";
import { computed } from "vue";

export default {
  setup(props, { emit }) {
    const store = useAppStore();
    const device = computed(() => store.device);
    const colors = computed(() => store.colors);
    const theme = computed(() => store.theme);
    const page = computed(() => store.page);
    const table = computed(() => store.table);

    const refreshEvent = () => {
      emit("btn-refresh", {});
    };

    const addNewEvent = () => {
      emit("btn-add-new");
    };

    const exportEvent = () => {
      emit("btn-export");
    };

    const printEvent = () => {
      emit("btn-print");
    };

    const bulkDeleteEvent = () => {
      emit("btn-bulk-delete");
    };

    const backEvent = () => {
      emit("btn-back");
    };

    const helpEvent = () => {
      emit("btn-help");
    };

    return {
      device,
      colors,
      theme,
      page,
      table,
      refreshEvent,
      addNewEvent,
      exportEvent,
      printEvent,
      bulkDeleteEvent,
      helpEvent,
      backEvent,
    };
  },
};
</script>
