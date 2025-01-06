<template>
  <v-row class="mx-5">
    <v-row class="my-5 pb-10 animate__animated animate__fadeInDown">
      <v-col cols="10">
        <span class="text-grey text-body-2">Selamat datang...!, <span class="font-weight-bold">{{ user.name }}</span> </span>

      </v-col>
      <v-col cols="2">
        <v-select
          label="Tahun Kegiatan"
          variant="outlined"
          density="compact"
          hide-details="auto"
          :color="theme.color"
          :items="tahuns"
          v-model="tahun"
        ></v-select>
      </v-col>

      <v-col
        cols="12"
        sm="12"
        md="4"
      >
        <simple-card
          title="Jumlah Pegawai Laki-Laki"
          icon="mdi-account-tie"
          count="5.356"
          chip-title="30%"
          chip-icon="mdi-arrow-down-bold-circle-outline"
        />
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="4"
      >
        <simple-card
          title="Jumlah Pegawai Perempuan"
          icon="mdi-account-tie"
          count="5.070"
          chip-title="30%"
          chip-icon="mdi-arrow-down-bold-circle-outline"
        />
      </v-col>

      <v-col
        cols="12"
        sm="12"
        md="4"
      >
        <simple-card
          title="Total Pegawai"
          icon="mdi-account-group"
          count="10.426"
          chip-title="30%"
          chip-icon="mdi-arrow-down-bold-circle-outline"
        />
      </v-col>

    </v-row>
    <v-row class="mt-5">
      <v-col cols="12">
        <div class="text-grey font-weight-bold">Berdasarkan Golongan</div>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="8"
      >
        <chart-basic />
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="4"
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols=12>
            <chart-pie class="mt-10" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-row>
</template>

<script   >
import { useAppStore } from "@/store/app";
import { computed, onBeforeMount, onMounted, ref } from "vue";
import SimpleCard from "@/components/Card/SImpleCard.vue";
import ChartBasic from "../../components/Chart/Basic/index.vue";
import ChartPie from "../../components/Chart/Pie/Index.vue";

export default {
  components: {
    SimpleCard,
    ChartBasic,
    ChartPie,
  },
  setup() {
    const store = useAppStore();
    const data = computed(() => store.getAppInfo);
    const user = computed(() => store.user);
    const theme = computed(() => store.theme);
    const headers = [
      { title: "No", key: "num", align: "end", width: 50 },
      { title: "TA/SUPPORT", key: "name", align: "start" },
      { title: "Todo", key: "todo", align: "center" },
      { title: "On Progress", key: "on-progress", align: "center" },
      { title: "Done", key: "done", align: "center" },
    ];
    const records = ref([]);
    const tahuns = ref([
      {
        value: 2024,
        title: "2024",
      },
      {
        value: 2023,
        title: "2023",
      },
      {
        value: 2022,
        title: "2022",
      },
    ]);

    const tahun = ref(null);

    const getRacapTas = async () => {
      const result = await store.http.get("/api/v2/dashboard/recap-tas");

      records.value = result.data;
    };

    onMounted(() => {
      store.setPage({
        title: "Dashboard",
        subtitle: "Berikut adalah data visualisasi aplikasi anda",
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
    });

    return {
      data,
      headers,
      records,
      user,
      theme,
      tahuns,
      tahun,
    };
  },
};
</script>
