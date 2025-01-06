<template>
  <v-row :class="device.mobile || device.tablet ? `` :`mx-1 mt-1`">
    <v-col cols="12">
      <form-container
        @btn-save="printReport"
        width="500"
        title="Laporan Rekapitulasi Kerugian Daerah"
        add-caption="Export"
        add-icon="mdi-cloud-download"
      >
        <div>
          <v-col cols="12">
            <v-select
              label="Tahun"
              variant="outlined"
              density="compact"
              :color="theme.color"
              hide-details="auto"
              v-model="record.tahun"
              :items="tahuns"
            ></v-select>
          </v-col>
        </div>
      </form-container>

      <!-- Sammpel Mobile View -->

    </v-col>

  </v-row>
</template>

<script lang="ts" >
import { computed, onMounted, ref } from "vue";
import { useAppStore } from "@/store/app";
import FrameTable from "@/components/Form/FormTable.vue";
import FrameForm from "@/components/Form/FormDialog.vue";
import FormConfirmDelete from "@/components/Form/FormConfirmDelete.vue";
import FormHelper from "@/components/Form/FormHelper.vue";
import FormContainer from "@/components/Form/FormContainer.vue";
import { useRoute, useRouter } from "vue-router";
import * as XLSX from "xlsx";

export default {
  components: {
    FrameTable,
    FrameForm,
    FormConfirmDelete,
    FormHelper,
    FormContainer,
  },
  setup() {
    const store = useAppStore();
    const route = useRoute();
    const router = useRouter();
    const device = computed(() => store.device);
    const theme = computed(() => store.getTheme);
    const page = computed(() => store.page);
    const colors = computed(() => store.colors);
    const table = computed(() => store.table);
    const list = computed(() => store.lists);
    const rules = computed(() => store.rules);
    const record: any = computed(() => store.record);
    const records: any = computed(() => store.records);
    const endpoint = "api/v1/sidakuda/skp2k/";

    const winheight = window.innerHeight - 320;
    const headers: {}[] = [
      { title: "Nomor", key: "nomor", align: "start" },
      { title: "Tanggal", key: "tanggal", align: "center" },
      { title: "Dokumen", key: "docfile", align: "center" },
      {
        title: "Aksi",
        key: "id",
        align: "center",
        width: 100,
        sortable: false,
      },
    ];

    /**
     * Custome Declare Pgae
     */
    const flname = ref(null);
    const initialDatas = ref([]);
    const sktjms = ref([]);
    const tahuns = ref([
      { title: "2024", value: 2024 },
      { title: "2023", value: 2023 },
      { title: "2021", value: 2021 },
      { title: "2020", value: 2020 },
    ]);

    /**
     * Function Page
     */
    const addNew = () => {
      store.setRecord({});
      store.setForm({
        add: true,
        edit: false,
      });
    };

    const fetchRecords = async ({
      page = 1,
      itemsPerPage = device.value.mobile || device.value.tablet ? 1000 : 10,
      sortBy = null,
      search = null,
    }) => {
      const params = {
        page: page ? page : 1,
        itemsPerPage:
          device.value.mobile || device.value.tablet
            ? 1000
            : itemsPerPage
            ? itemsPerPage
            : 10,
        search: search,
        sortBy: sortBy,
      };

      const result: any = await store.fetchRecords(endpoint, params);

      store.setRecords(result?.data.data ? result.data.data : []);
      table.value.totalItems = result?.data.meta.total;
    };

    const postRecord = async () => {
      const result: any = await store.postRecord(endpoint, record.value);

      if (result?.data.success) {
        store.setSnackbar(result.data.message, colors.value.SUCCESS);
        store.setForm({
          add: false,
          edit: false,
        });
        records.value.push(result.data.data);
      }
    };

    const showRecord = async (payload: any) => {
      const result = await store.showRecord(endpoint + payload);
      store.setRecord(result?.data.data);
      store.setForm({
        add: true,
        edit: true,
      });
    };

    const postUpdate = async () => {
      const result: any = await store.postRecord(
        endpoint + record.value.id,
        record.value,
        "update"
      );

      if (result?.data.success) {
        store.setSnackbar(result.data.message, colors.value.SUCCESS);
        store.setForm({
          add: false,
          edit: false,
        });
        store.changeRecord(result.data.data);
      }
    };

    const postConfirmDelete = (payload: any) => {
      store.setRecord({
        id: payload,
      });
      store.setForm({
        add: false,
        edit: false,
        delete: true,
      });
    };

    const postDelete = async () => {
      const result: any = await store.postRecord(
        endpoint + record.value.id,
        {},
        "delete"
      );

      if (result?.data.success) {
        store.setSnackbar(result.data.message, colors.value.SUCCESS);
        store.setForm({
          add: false,
          edit: false,
          delete: false,
        });
        store.removeRecord(result.data.data.id);
        store.setRecord({});
      }
    };

    const postConfirmBulkDelete = () => {
      alert(table.value.selects);
    };

    const openHelper = () => {
      store.setForm({
        help: true,
      });
    };

    /**
     * Costome page function
     * @param param0
     */

    const fetchInitialDatas = async () => {
      try {
        const endpoint = "api/v1/combo/initial-data";
        const result = await store.http.get(endpoint);
        initialDatas.value = result.data.data;
      } catch (error) {
        store.catchError(error);
      }
    };

    const fetchSktjms = async () => {
      try {
        const endpoint = "api/v1/combo/sktjm";
        const result = await store.http.get(endpoint);
        sktjms.value = result.data.data;
      } catch (error) {
        store.catchError(error);
      }
    };

    const load = async ({ done }) => {
      const params = {
        page: list.value.page,
        itemsPerPage: list.value.itemsPerPage,
      };

      fetchMobileView(params);

      setTimeout(() => {
        if (list.value.page < list.value.lastPage) {
          fetchMobileView(params);
        } else {
          done("empty");
        }
      }, 1000);
    };

    const fetchMobileView = async function (params) {
      const result: any = await store.fetchRecords(endpoint, params);
      result.data.data.forEach((element) => {
        records.value.push(element);
      });

      store.setList({
        page: result.data.meta.current_page + 1,
        lastPage: result.data.meta.last_page,
      });
    };

    /**
     * Custome Pages Function
     */
    const postUploadFile = async () => {
      const file = flname.value.files[0];

      const result: any = await store.uploadFile(file, "documents");
      record.value.docfile = result.data.name;
      store.setSnackbar("Proses upload berhasil", theme.value.color);
    };

    const download = (url: string) => {
      window.open(url);
    };

    const printReport = async () => {
      try {
        const endpoint = "/api/v1/sidakuda/laporan-rekapitulasi/2024";

        const result = await store.http.get(endpoint);

        const datas: [] = result.data.data;
        //var dataxls = XLSX.utils.json_to_sheet(result.data.data);
        //var dataxls = XLSX.utils.table_to_sheet(result.data);

        // A workbook is the name given to an Excel file
        // Create a new workbook and worksheet

        const workbook = XLSX.utils.book_new();
        const worksheet = {};

        // Add merged headers
        // Define header data with merged cells
        worksheet["A1"] = {
          v: "NO",
          t: "s",
          s: {
            font: { bold: true },
            alignment: { horizontal: "center" },
          },
        };
        worksheet["B1"] = { v: "NAMA", t: "s" };
        worksheet["C1"] = { v: "STATUS", t: "s" };
        worksheet["D1"] = { v: "NIP", t: "s" };
        worksheet["E1"] = { v: "SKPD TEMPAT KEJADIAN", t: "s" };
        worksheet["F1"] = { v: "JABATAN LAMA", t: "s" };
        worksheet["G1"] = { v: "JABATAN BARU", t: "s" };
        worksheet["H1"] = { v: "JENIS KERUGIAN", t: "s" };
        worksheet["I1"] = { v: "NILAI KERUGIAN", t: "s" };
        worksheet["J1"] = { v: "TAHUN KEJADIAN", t: "s" };
        worksheet["K1"] = { v: "INFORMASI KERUGIAN", t: "s" };
        worksheet["M1"] = { v: "LAPORAN HASIL VERIFIKASI", t: "s" };
        worksheet["O1"] = { v: "SK TPKD", t: "s" };
        worksheet["Q1"] = { v: "BERITA ACARA PEMERIKSAAN", t: "s" };
        worksheet["S1"] = { v: "TANGGAPAN PIHAK MERUGIKAN", t: "s" };
        worksheet["U1"] = { v: "TANGGAPAN PPKD", t: "s" };
        worksheet["W1"] = { v: "LAPORAN HASIL KERUGIAN", t: "s" };
        worksheet["Y1"] = { v: "SURAT PENDAPATAN PPKD", t: "s" };
        worksheet["AA1"] = { v: "PENUGASAN PENUNTUTAN", t: "s" };
        worksheet["AC1"] = { v: "TANGGAPAN PENUGASAN PENUNTUTAN", t: "s" };
        worksheet["AE1"] = { v: "SKTJM", t: "s" };
        worksheet["AG1"] = { v: "LAPORAN PENOLAKAN", t: "s" };
        worksheet["AI1"] = { v: "SP2KS", t: "s" };
        worksheet["AK1"] = { v: "TANDA TERIMA", t: "s" };
        worksheet["AM1"] = { v: "BERITA ACARA TIDAK BERSEDIA", t: "s" };
        worksheet["AO1"] = { v: "SURAT PENAGIHAN", t: "s" };
        worksheet["AQ1"] = { v: "SURAT PERINGATAN PERTAMA", t: "s" };
        worksheet["AS1"] = { v: "SURAT PERINGATAN KEDUA", t: "s" };
        worksheet["AU1"] = { v: "PERNYATAAN WANPRESTASI", t: "s" };
        worksheet["AW1"] = { v: "SURAT KETERANGAN LUNAS", t: "s" };
        worksheet["AY1"] = { v: "SURAT KEBERATAN", t: "s" };
        worksheet["BA1"] = { v: "HASIL PUTUSAN SIDANG", t: "s" };
        worksheet["BC1"] = { v: "SK PEMBEBASAN TANGGUNG", t: "s" };
        worksheet["BE1"] = { v: "USULAN PENGHAPUSAN", t: "s" };
        worksheet["BG1"] = { v: "SP2K", t: "s" };
        worksheet["BI1"] = { v: "SURAT PELIMPAHAN KE PUPN", t: "s" };

        // Merge cells for headers
        worksheet["!merges"] = [
          { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
          { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },
          { s: { r: 0, c: 2 }, e: { r: 1, c: 2 } },
          { s: { r: 0, c: 3 }, e: { r: 1, c: 3 } },
          { s: { r: 0, c: 4 }, e: { r: 1, c: 4 } },
          { s: { r: 0, c: 5 }, e: { r: 1, c: 5 } },
          { s: { r: 0, c: 6 }, e: { r: 1, c: 6 } },
          { s: { r: 0, c: 7 }, e: { r: 1, c: 7 } },
          { s: { r: 0, c: 8 }, e: { r: 1, c: 8 } },
          { s: { r: 0, c: 9 }, e: { r: 1, c: 9 } },
          { s: { r: 0, c: 10 }, e: { r: 0, c: 11 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 12 }, e: { r: 0, c: 13 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 14 }, e: { r: 0, c: 15 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 16 }, e: { r: 0, c: 17 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 18 }, e: { r: 0, c: 19 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 20 }, e: { r: 0, c: 21 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 22 }, e: { r: 0, c: 23 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 24 }, e: { r: 0, c: 25 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 26 }, e: { r: 0, c: 27 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 28 }, e: { r: 0, c: 29 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 30 }, e: { r: 0, c: 31 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 32 }, e: { r: 0, c: 33 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 34 }, e: { r: 0, c: 35 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 36 }, e: { r: 0, c: 37 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 38 }, e: { r: 0, c: 39 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 40 }, e: { r: 0, c: 41 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 42 }, e: { r: 0, c: 43 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 44 }, e: { r: 0, c: 45 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 46 }, e: { r: 0, c: 47 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 48 }, e: { r: 0, c: 49 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 50 }, e: { r: 0, c: 51 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 52 }, e: { r: 0, c: 53 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 54 }, e: { r: 0, c: 55 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 56 }, e: { r: 0, c: 57 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 58 }, e: { r: 0, c: 59 } }, //merge colom informasi kerugian
          { s: { r: 0, c: 60 }, e: { r: 0, c: 61 } }, //merge colom informasi kerugian
        ];

        // Add sub-headers
        worksheet["A2"] = {
          v: "NO",
          t: "s",
          s: {
            font: { bold: true },
            alignment: { horizontal: "center", vertical: "center" },
          },
        };
        worksheet["B2"] = { v: "NAMA", t: "s" };
        worksheet["C2"] = { v: "STATUS", t: "s" };
        worksheet["D2"] = { v: "NIP", t: "s" };
        worksheet["E2"] = { v: "SKPD TEMPAT KEJADIAN", t: "s" };
        worksheet["F2"] = { v: "JABATAN LAMA", t: "s" };
        worksheet["G2"] = { v: "JABATAN BARU", t: "s" };
        worksheet["H2"] = { v: "JENIS KERUGIAN", t: "s" };
        worksheet["I2"] = { v: "NILAI KERUGIAN", t: "s" };
        worksheet["J2"] = { v: "TAHUN KEJADIAN", t: "s" };
        worksheet["K2"] = { v: "Nomor", t: "s" };
        worksheet["L2"] = { v: "Tanggal", t: "s" };
        worksheet["M2"] = { v: "Nomor", t: "s" };
        worksheet["N2"] = { v: "Tanggal", t: "s" };
        worksheet["O2"] = { v: "Nomor", t: "s" };
        worksheet["P2"] = { v: "Tanggal", t: "s" };
        worksheet["Q2"] = { v: "Nomor", t: "s" };
        worksheet["R2"] = { v: "Tanggal", t: "s" };
        worksheet["S2"] = { v: "Nomor", t: "s" };
        worksheet["T2"] = { v: "Tanggal", t: "s" };
        worksheet["U2"] = { v: "Nomor", t: "s" };
        worksheet["P2"] = { v: "Tanggal", t: "s" };
        worksheet["W2"] = { v: "Nomor", t: "s" };
        worksheet["X2"] = { v: "Tanggal", t: "s" };
        worksheet["Y2"] = { v: "Nomor", t: "s" };
        worksheet["Z2"] = { v: "Tanggal", t: "s" };
        worksheet["AA2"] = { v: "Nomor", t: "s" };
        worksheet["AB2"] = { v: "Tanggal", t: "s" };
        worksheet["AC2"] = { v: "Nomor", t: "s" };
        worksheet["AD2"] = { v: "Tanggal", t: "s" };
        worksheet["AE2"] = { v: "Nomor", t: "s" };
        worksheet["AF2"] = { v: "Tanggal", t: "s" };
        worksheet["AG2"] = { v: "Nomor", t: "s" };
        worksheet["AH2"] = { v: "Tanggal", t: "s" };
        worksheet["AI2"] = { v: "Nomor", t: "s" };
        worksheet["AJ2"] = { v: "Tanggal", t: "s" };
        worksheet["AK2"] = { v: "Nomor", t: "s" };
        worksheet["AL2"] = { v: "Tanggal", t: "s" };
        worksheet["AM2"] = { v: "Nomor", t: "s" };
        worksheet["AN2"] = { v: "Tanggal", t: "s" };
        worksheet["AO2"] = { v: "Nomor", t: "s" };
        worksheet["AP2"] = { v: "Tanggal", t: "s" };
        worksheet["AQ2"] = { v: "Nomor", t: "s" };
        worksheet["AR2"] = { v: "Tanggal", t: "s" };
        worksheet["AS2"] = { v: "Nomor", t: "s" };
        worksheet["AT2"] = { v: "Tanggal", t: "s" };
        worksheet["AU2"] = { v: "Nomor", t: "s" };
        worksheet["AV2"] = { v: "Tanggal", t: "s" };
        worksheet["AW2"] = { v: "Nomor", t: "s" };
        worksheet["AX2"] = { v: "Tanggal", t: "s" };
        worksheet["AY2"] = { v: "Nomor", t: "s" };
        worksheet["AZ2"] = { v: "Tanggal", t: "s" };
        worksheet["BA2"] = { v: "Nomor", t: "s" };
        worksheet["BB2"] = { v: "Tanggal", t: "s" };
        worksheet["BC2"] = { v: "Nomor", t: "s" };
        worksheet["BD2"] = { v: "Tanggal", t: "s" };
        worksheet["BE2"] = { v: "Nomor", t: "s" };
        worksheet["BF2"] = { v: "Tanggal", t: "s" };
        worksheet["BG2"] = { v: "Nomor", t: "s" };
        worksheet["BH2"] = { v: "Tanggal", t: "s" };
        worksheet["BI2"] = { v: "Nomor", t: "s" };
        worksheet["BJ2"] = { v: "Tanggal", t: "s" };

        // Add data here
        let currentRow = 3;
        let nomor = 1;
        datas.forEach((element: any) => {
          worksheet[`A${currentRow}`] = { v: nomor, t: "s" };
          worksheet[`B${currentRow}`] = { v: element.name, t: "s" };
          worksheet[`C${currentRow}`] = { v: element.employee_status, t: "s" };
          worksheet[`D${currentRow}`] = { v: element.nip, t: "s" };
          worksheet[`E${currentRow}`] = { v: element.skpd_scene, t: "s" };
          worksheet[`F${currentRow}`] = { v: element.jabatan_lama, t: "s" };
          worksheet[`G${currentRow}`] = { v: element.jabatan_baru, t: "s" };
          worksheet[`H${currentRow}`] = { v: element.jenis_kerugian, t: "s" };
          worksheet[`I${currentRow}`] = { v: element.nilai_kerugian, t: "s" };
          worksheet[`J${currentRow}`] = { v: element.tahun_kejadian, t: "s" };
          worksheet[`AE${currentRow}`] = { v: element.sktjm_nomor, t: "s" };
          worksheet[`AF${currentRow}`] = { v: element.sktjm_tanggal, t: "s" };
          worksheet[`AO${currentRow}`] = {
            v: element.surat_penagihan_nomor,
            t: "s",
          };
          worksheet[`AP${currentRow}`] = {
            v: element.surat_penagihan_tanggal,
            t: "s",
          };
          worksheet[`AQ${currentRow}`] = {
            v: element.surat_peringatan_nomor,
            t: "s",
          };
          worksheet[`AR${currentRow}`] = {
            v: element.surat_peringatan_tanggal,
            t: "s",
          };

          currentRow++;
          nomor++;
        });

        // Define the range of the worksheet

        worksheet["!ref"] = `A1:BJ${currentRow - 1}`;

        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

        // Write the workbook to a file and trigger download
        XLSX.writeFile(workbook, "report.xlsx");
      } catch (error) {
        store.catchError(error);
      }
    };

    onMounted(() => {
      store.setPage({
        title: "SKP2K",
        subtitle: "Berikut Daftar Seluruh SKP2K Yang Tersedia ",
        dataUrl: endpoint,
        actions: {
          refresh: false,
          add: false,
          edit: false,
          delete: false,
          bulkdelete: false,
          export: false,
          print: false,
          help: true,
          back: false,
        },
      });

      fetchInitialDatas();
      fetchSktjms();
    });

    return {
      device,
      router,
      theme,
      page,
      rules,
      colors,
      headers,
      records,
      record,
      fetchRecords,
      table,
      list,
      winheight,
      addNew,
      postRecord,
      postUpdate,
      showRecord,
      postConfirmDelete,
      postDelete,
      postConfirmBulkDelete,
      openHelper,
      load,
      initialDatas,
      sktjms,
      flname,
      postUploadFile,
      download,
      printReport,
      tahuns,
    };
  },
};
</script>
