<template>
  <v-row :class="device.mobile || device.tablet ? `` :`mx-1 mt-1`">
    <v-col cols="12">
      <form-container
        @btn-save="printReport"
        width="500"
        title="Laporan Individual "
        add-caption="Cetak"
        add-icon="mdi-printer"
      >
        <div>
          <v-col cols="12">
            <v-autocomplete
              label="Pegawai"
              variant="outlined"
              density="compact"
              hide-details="auto"
              placeholder="Pilih Pegawai"
              :items="initialDatas"
              v-model="record.initial_data_uuid"
            ></v-autocomplete>
          </v-col>
        </div>
      </form-container>

      <!-- Sammpel Mobile View -->
      <div
        v-show="false"
        ref="printArea"
        v-html="responseHtml"
      >
      </div>

    </v-col>

  </v-row>
</template>

<script lang="ts" >
import { computed, nextTick, onMounted, ref } from "vue";
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
    const responseHtml = ref("");
    const printArea = ref(null);

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
        records.value.push(result.data);
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
        const endpoint =
          "/api/v1/sidakuda/laporan-individual/" +
          record.value.initial_data_uuid;

        const result = await store.http.get(endpoint);

        responseHtml.value = result.data;

        await nextTick();

        const printWindow = window.open("", "_blank", "width=800,height=600");

        // Write HTML to the new window
        printWindow.document.write(`
      <html>
        <head>
          <title>Print Preview</title>
          <style>
            @media print {
              body {
                margin: 10mm;
              }
            }
          </style>
        </head>
        <body>
          ${responseHtml.value}
          <script>
            window.onload = function() {
              window.print();
              window.close();
            }
          <\/script>
        </body>
      </html>
    `);

        // Close the document writing
        printWindow.document.close();
      } catch (error) {}
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
      responseHtml,
      printArea,
    };
  },
};
</script>


