<template>
  <v-row :class="device.mobile || device.tablet ? `` :`mx-1 mt-1`">
    <v-col cols="12">
      <frame-table
        @btnRefresh="fetchRecords"
        @btnAddNew="addNew"
        @btnHelp="openHelper"
        @btnBulkDelete="postConfirmBulkDelete"
        @btnBack=""
        v-show=" device.laptop || device.desktop || device.tv"
      >
        <v-data-table-server
          fixed-header
          :height="winheight"
          v-model:items-per-page="table.itemsPerPage"
          :headers="headers"
          density="comfortable"
          :items-length="table.totalItems"
          :items="records ? records :[]"
          :search="table.search"
          :loading="table.loading"
          item-value="id"
          @update:options="fetchRecords"
          show-select
          :items-per-page-options="[5,10,100,500]"
          items-per-page-text="data per halaman"
          no-data-text="Tidak ada data untuk ditampilkan"
          loading-text="Mohon menunggu"
          v-model="table.selects"
        >
          <template v-slot:loading>
            <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
          </template>
          <template v-slot:item.status={item}>
            <v-chip
              size="small"
              :color="item.status? item.status.color : 'grey'"
            >{{ item.status ? item.status.text :'NA'  }}</v-chip>
          </template>
          <template v-slot:item.docfile="{item}">
            <v-chip
              :color="theme.color"
              @click="download(item.docfile)"
            ><v-icon class="mr-2">mdi-cloud-download</v-icon> Dokumen</v-chip>
          </template>

          <template v-slot:item.id="{item}">
            <v-menu location="start">
              <template v-slot:activator="{ props }">
                <v-btn
                  icon="mdi-dots-vertical"
                  v-bind="props"
                  size="x-small"
                ></v-btn>

              </template>

              <v-list
                density="compact"
                nav
              >
                <v-list-item
                  title="Ubah Data"
                  @click="showRecord(item.id)"
                >
                  <template v-slot:prepend>
                    <v-icon
                      class="text-orange"
                      icon="mdi-pencil-circle"
                    ></v-icon>
                  </template>
                </v-list-item>
                <v-list-item
                  density="compact"
                  @click="postConfirmDelete(item.id)"
                >
                  <template v-slot:title>
                    Hapus Data
                  </template>
                  <template v-slot:prepend>
                    <v-icon
                      class="text-red"
                      icon="mdi-delete-circle"
                    ></v-icon>
                  </template>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table-server>
      </frame-table>

      <!-- Sammpel Mobile View -->
      <frame-table
        @btnRefresh="fetchRecords"
        @btnAddNew="addNew"
        @btnHelp="openHelper"
        @btnBulkDelete="postConfirmBulkDelete"
        v-if=" device.mobile || device.tablet"
      >
        <v-infinite-scroll :onLoad="load">
          <template
            v-for="(item, index) in records"
            :key="item"
          >
            <div :class="['pa-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
              <v-row>
                <v-col cols="10">
                  <span class="font-weight-bold text-body-2">{{ item.name }}</span><br>
                  <span class="text-body-2">{{ item.description }}</span>

                </v-col>
                <v-spacer></v-spacer>
                <v-row class="justify-end align-center pr-5">
                  <v-menu location="start">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        icon="mdi-dots-vertical"
                        v-bind="props"
                        size="x-small"
                      ></v-btn>

                    </template>

                    <v-list
                      density="compact"
                      nav
                    >
                      <v-list-item
                        title="Ubah Data"
                        @click="showRecord(item.id)"
                      >
                        <template v-slot:prepend>
                          <v-icon
                            class="text-orange"
                            icon="mdi-pencil-circle"
                          ></v-icon>
                        </template>
                      </v-list-item>
                      <v-list-item
                        density="compact"
                        @click="postConfirmDelete(item.id)"
                      >
                        <template v-slot:title>
                          Hapus Data
                        </template>
                        <template v-slot:prepend>
                          <v-icon
                            class="text-red"
                            icon="mdi-delete-circle"
                          ></v-icon>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-row>

              </v-row>

            </div>
          </template>
          <template v-slot:empty>
            <v-alert
              type="warning"
              class="text-body-2"
            >tidak ada data lagi untuk ditampilkan</v-alert>
          </template>
        </v-infinite-scroll>
      </frame-table>

    </v-col>
    <v-col cols="12">
      <frame-form
        title="Formulir Surat Penagihan"
        width="600"
        @btnAdd="postRecord"
        @btnEdit="postUpdate"
        :fullscreen="device.mobile || device.tablet ? true: false"
      >
        <v-row>
          <v-col cols="12">
            <v-autocomplete
              label="Inisasi Data/Pegawai"
              variant="outlined"
              density="compact"
              v-model="record.initial_data_uuid"
              hide-details="auto"
              :items="initialDatas"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Nomor SKTJM"
              variant="outlined"
              density="compact"
              v-model="record.sktjm_uuid"
              hide-details="auto"
              :items="sktjms ? sktjms :[]"
              :color="theme.color"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12">
            <v-select
              label="Nomor SKP2KS"
              variant="outlined"
              density="compact"
              v-model="record.skp2ks_uuid"
              hide-details="auto"
            ></v-select>
          </v-col>

          <v-col cols="12">
            <v-autocomplete
              label="Nomor SKP2K"
              variant="outlined"
              density="compact"
              v-model="record.skp2k_uuid"
              hide-details="auto"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12">
            <v-select
              label="Nomor Tanda Terima"
              variant="outlined"
              density="compact"
              v-model="record.tanda_terima_uuid"
              hide-details="auto"
            ></v-select>
          </v-col>

          <v-col cols="12">
            <v-text-field
              label="Nomor Surat Penagihan"
              placeholder=""
              variant="outlined"
              density="compact"
              hide-details="auto"
              :color="theme.color"
              v-model="record.nomor"
              :rules="rules.required"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Tanggal Surat"
              placeholder=""
              variant="outlined"
              density="compact"
              hide-details="auto"
              :color="theme.color"
              v-model="record.tanggal"
              :rules="rules.required"
              type="date"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="6"
          >
            <v-text-field
              type="file"
              label="Pilih File Contoh / Format Contoh"
              variant="outlined"
              density="compact"
              ref="flname"
              @change="postUploadFile"
            >
            </v-text-field>
          </v-col>

        </v-row>
      </frame-form>
    </v-col>
    <div>
      <form-confirm-delete
        id="1"
        @btnDelete="postDelete"
      />
    </div>
    <div>
      <form-helper
        width="500"
        title="Bantuan"
      >
        <div>
          <div class="title font-weight-bold">Modul Surat Penagihan</div>
          <br>
          <div>
            <p class="text-body-2">
              Modul ini berfungsi untuk melakukan penambahan, perubahan dan penghapusan Surat Penagihan
            </p>
          </div>
        </div>
      </form-helper>
    </div>
  </v-row>
</template>

<script lang="ts" >
import { computed, onMounted, ref } from "vue";
import { useAppStore } from "@/store/app";
import FrameTable from "@/components/Form/FormTable.vue";
import FrameForm from "@/components/Form/FormDialog.vue";
import FormConfirmDelete from "@/components/Form/FormConfirmDelete.vue";
import FormHelper from "@/components/Form/FormHelper.vue";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    FrameTable,
    FrameForm,
    FormConfirmDelete,
    FormHelper,
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
    const endpoint = "api/v1/sidakuda/surat-penagihan/";

    const winheight = window.innerHeight - 320;
    const headers: {}[] = [
      { title: "Nomor", key: "nomor", align: "start" },
      { title: "Kepada", key: "pegawai", align: "start" },
      { title: "Tanggal", key: "tanggal", align: "start" },
      { title: "Dokumen", key: "docfile", align: "start" },
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
      flname.value = record.data.data.docfile;
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

    const download = (url: string) => {
      window.open(url);
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

    onMounted(() => {
      store.setPage({
        title: "Surat Penagihan",
        subtitle: "Berikut Daftar Surat Penagihan Yang Tersedia ",
        dataUrl: endpoint,
        actions: {
          refresh: true,
          add: true,
          edit: true,
          delete: true,
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
    };
  },
};
</script>
