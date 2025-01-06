<template>
  <v-row class="py-5 px-5">
    <v-col cols="12">
      <div class="font-weight-bold text-grey-darken-1 text-h6">Hai, Selamat Datang..!, {{ user.name }}</div>
      <div class="font-weight-thin">
        Berikut ini adalah dashboard data yang ada miliki
      </div>
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="6"
    >
      <simple-card
        title="Jumlah Formasi"
        icon="mdi-hand-heart"
        :count="dashboarddata.total_formasi"
        chip-title="-"
        chip-icon="mdi-arrow-down-bold-circle-outline"
      />
    </v-col>
    <v-col
      cols="12"
      sm=12
      md="6"
    >
      <simple-card
        title="Jumlah Pelamar"
        icon="mdi-account-group"
        :count="dashboarddata.total_pelamar"
        chip-title="-"
        chip-icon="mdi-arrow-up-bold-circle-outline"
      />
    </v-col>

    <v-col
      cols="12"
      sm=12
      md="6"
    >

      <v-col cols="12">
        <div class="text-grey font-weight-bold">Riwayat Permohonan Anda</div>
      </v-col>
      <v-col cols="12">
        <v-table density="compact">
          <thead>
            <tr>
              <th class="text-left">
                Kegiatan
              </th>
              <th class="text-left">
                Jabatan/Formasi
              </th>
              <th class="text-center">
                Waktu
              </th>
              <th class="text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in dashboarddata.riwayat"
              :key="item.uuid"
            >
              <td>{{ item.event }}</td>
              <td>{{ item.formasi }}</td>
              <td>{{ item.waktu }}</td>
              <td>
                <v-chip
                  size="small"
                  :color="item.status == '0' ? 'grey': item.status == '1' ? 'grey' : item.status == '2' ? 'red' : item.status == '3' ? 'grey' :item.status == '7' ? 'red':'green' "
                >
                  {{ item.status == "0" ? "Draft": item.status=="1" ? "Pengajuan"  : item.status == "2" ? "Ditolak" : item.status == '3' ?"Perbaikan" : item.status=="4" ? "Verifikasi" : item.statu=="5" ? "Verifikasi" : item.statu=="6" ? "Lulus" :"Tidak Lulus"    }}
                </v-chip>
              </td>

            </tr>
          </tbody>
        </v-table>
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
          <v-col
            cols=12
            class=""
          >
            <chart-pie class="mt-10" />
          </v-col>
        </v-row>
      </v-col>
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md=6
    >
      <v-col cols="12">
        <div class="text-grey font-weight-bold">Informasi Proses Permohonan</div>
      </v-col>
      <v-col cols=12>
        <div class="text-body-1 font-weight-light">
          <v-timeline
            align="start"
            side="end"
            density="compact"
          >
            <v-timeline-item
              :dot-color="item.status.color"
              size="small"
              v-for="(item, index) in dashboarddata.logspermohonan"
            >
              <div class="d-flex">
                <strong class="me-4">{{ item.tanggal }}</strong>
                <div>
                  <strong>{{ item.title }}</strong>
                  <div class="text-caption">
                    {{ item.body }}
                  </div>
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </div>
      </v-col>

    </v-col>
  </v-row>

</template>

<script lang="ts"  >
import { useAppStore } from "@/store/app";
import { computed, onBeforeMount, onMounted, ref } from "vue";
import SimpleCard from "@/components/Card/SImpleCard.vue";

export default {
  components: {
    SimpleCard,
  },
  setup() {
    const store = useAppStore();
    const data = computed(() => store.getAppInfo);
    const user = computed(() => store.user);
    const headers = [
      { title: "No", key: "num", align: "end", width: 50 },
      { title: "TA/SUPPORT", key: "name", align: "start" },
      { title: "Todo", key: "todo", align: "center" },
      { title: "On Progress", key: "on-progress", align: "center" },
      { title: "Done", key: "done", align: "center" },
    ];
    const records = ref([]);

    const dashboarddata: any = ref({});

    const fetchRecords = async () => {
      const result: any = await store.http.get("api/v1/peserta/dashboard");

      dashboarddata.value = result.data;
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
      fetchRecords();
    });

    return {
      data,
      headers,
      records,
      dashboarddata,
      user,
    };
  },
};
</script>
