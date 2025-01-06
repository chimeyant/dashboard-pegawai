<template>
  <v-row :class="device.mobile || device.tablet ? `` :`mx-1 mt-1`">
    <v-col cols="12">
      <frame-table
        @btnRefresh="fetchRecords"
        @btnAddNew="addNew"
        @btnHelp="openHelper"
        @btnBulkDelete="postConfirmBulkDelete"
        @btnBack="openBackPage"
        v-show=" device.laptop || device.desktop || device.tv"
      >
        <v-data-table-server
          fixed-header
          :height="winheight"
          v-model:items-per-page="table.itemsPerPage"
          :headers="headers"
          density="comfortable"
          :items-length="table.totalItems"
          :items="records ?? []"
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
          <template v-slot:item.wajib={item}>
            <v-chip
              size="small"
              :color="item.wajib? item.wajib.color : 'grey'"
            >{{ item.wajib ? item.wajib.text :'NA'  }}</v-chip>
          </template>
          <template v-slot:item.status={item}>
            <v-chip
              size="small"
              :color="item.status? item.status.color : 'grey'"
            >{{ item.status ? item.status.text :'NA'  }}</v-chip>
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
                  title="Atur Dokumen Persyaratan"
                  @click="openFormasiDocumentPage(item.id)"
                >
                  <template v-slot:prepend>
                    <v-icon
                      :color="theme.color"
                      icon="mdi-clipboard-check"
                    ></v-icon>
                  </template>
                </v-list-item>
                <v-list-item
                  title="Daftar Pelamar"
                  @click=""
                >
                  <template v-slot:prepend>
                    <v-icon
                      :color="theme.color"
                      icon="mdi-account-group-outline"
                    ></v-icon>
                  </template>
                </v-list-item>
                <v-divider></v-divider>
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
        title="Formulir Data Formasi"
        width="800"
        @btnAdd="postRecord"
        @btnEdit="postUpdate"
        :fullscreen="device.mobile || device.tablet ? true: false"
      >
        <v-row>
          <v-col cols="12">
            <v-select
              label="OPD 1"
              variant="outlined"
              density="compact"
              hide-details
              :color="theme.color"
              placeholder="Silahkan Pilih OPD"
              :rules="rules.required"
              v-model="record.opd_1_id"
              :items="opds1"
              v-on:update:model-value="fetchOpds2"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-select
              label="OPD 2"
              variant="outlined"
              density="compact"
              hide-details
              :color="theme.color"
              placeholder="Silahkan Pilih OPD 2"
              :rules="rules.required"
              v-model="record.opd_2_id"
              :items="opds2"
              v-on:update:model-value="fetchOpds3"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-select
              label="OPD 3"
              variant="outlined"
              density="compact"
              hide-details
              :color="theme.color"
              placeholder="Silahkan Pilih OPD"
              :rules="rules.required"
              v-model="record.opd_3_id"
              :items="opds3"
              v-on:update:model-value="fetchOpds4"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-select
              label="OPD 4"
              variant="outlined"
              density="compact"
              hide-details
              :color="theme.color"
              placeholder="Silahkan Pilih OPD"
              :rules="rules.required"
              v-model="record.opd_4_id"
              :items="opds4"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-select
              label="Jenis Jabatan"
              variant="outlined"
              density="compact"
              hide-details
              :color="theme.color"
              placeholder="Silahkan Pilih Jenis Jabatan"
              :rules="rules.required"
              v-model="record.jenis_jabatan"
              :items="jenisjabatans"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Nama Jabatan"
              placeholder=""
              variant="outlined"
              density="compact"
              hide-details="auto"
              :color="theme.color"
              v-model="record.nama_jabatan"
              :rules="rules.required"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="Keterangan (Job Desc)"
              placeholder=""
              variant="outlined"
              density="compact"
              hide-details="auto"
              :color="theme.color"
              v-model="record.keterangan"
              rows="3"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-select
              label="Pendidikan Terakhir"
              variant="outlined"
              density="compact"
              hide-details
              :color="theme.color"
              placeholder="Silahkan Pilih Pendidikan Terakhir"
              :rules="rules.required"
              v-model="record.pendidikan_id"
              :items="pendidikans"
              v-on:update:model-value="fetchJurusans"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Jurusan"
              variant="outlined"
              density="compact"
              hide-details
              :color="theme.color"
              v-model="record.jurusans"
              :items="jurusans"
              multiple
            ></v-autocomplete>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Jumlah Formasi"
              placeholder=""
              variant="outlined"
              density="compact"
              hide-details="auto"
              :color="theme.color"
              type="number"
              v-model="record.jumlah"
              :rules="rules.required"
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
              v-show="false"
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
          <div class="title font-weight-bold">Modul Data Formasi</div>
          <br>
          <div>
            <p class="text-body-2">
              Modul ini berfungsi untuk melakukan penambahan, perubahan dan penghapusan pada data formasi
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
    const endpoint =
      "api/v1/main-menu/data-formasi/" + route.params.event_uuid + "/";
    const winheight = window.innerHeight - 320;

    const headers: {}[] = [
      { title: "OPD", key: "opd", align: "start", sortable: false },
      { title: "NAMA JABATAN", key: "nama_jabatan", align: "start" },
      { title: "JENIS", key: "jenis_jabatan", align: "start" },
      {
        title: "JML. FORMASI",
        key: "jumlah",
        align: "center",
        sortable: false,
      },
      {
        title: "JML. PELAMAR",
        key: "pelamar",
        align: "center",
        sortable: false,
      },
      {
        title: "AKSI",
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
    const opds1 = ref([]);
    const opds2 = ref([]);
    const opds3 = ref([]);
    const opds4 = ref([]);
    const jenisjabatans = ref([
      {
        title: "Struktural",
        value: "struktural",
      },
      {
        title: "Fungsional",
        value: "fungsional",
      },
    ]);
    const pendidikans = ref([]);
    const jurusans = ref([]);

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

      store.setRecords(result?.data.data);
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
      const result: any = await store.showRecord(endpoint + payload);
      store.setRecord(result?.data);
      store.setForm({
        add: true,
        edit: true,
      });
      flname.value = record.flname;
      fetchOpds2();
      fetchOpds3();
      fetchOpds4();
      fetchJurusans();
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

    const postConfirmBulkDelete = () => {};

    const openHelper = () => {
      store.setForm({
        help: true,
      });
    };

    /**
     * Custome page function
     * @param param0
     */
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
      record.value.flname = result.data.name;
      store.setSnackbar("Proses upload berhasil", theme.value.color);
    };

    const fetchOpds1 = async () => {
      const result: any = await store.http.get("api/v1/combo/opd1");
      opds1.value = result.data;
      fetchNamaJabatan();
    };

    const fetchOpds2 = async () => {
      const result: any = await store.http.get(
        "api/v1/combo/opd2/" + record.value.opd_1_id
      );

      opds2.value = [];
      record.value.opd_2_id = null;
      opds3.value = [];
      record.value.opd_3_id = null;
      opds4.value = [];
      record.value.opd_4_id = null;

      opds2.value = result.data;

      fetchNamaJabatan();
    };

    const fetchOpds3 = async () => {
      const result: any = await store.http.get(
        "api/v1/combo/opd3/" + record.value.opd_2_id
      );

      opds3.value = [];
      record.value.opd_3_id = null;
      opds4.value = [];
      record.value.opd_4_id = null;
      opds3.value = result.data;

      fetchNamaJabatan();
    };

    const fetchOpds4 = async () => {
      const result: any = await store.http.get(
        "api/v1/combo/opd4/" + record.value.opd_3_id
      );
      opds4.value = result.data;
      fetchNamaJabatan();
    };

    const fetchNamaJabatan = async () => {
      if (record.value.opd_4_id != null) {
        const result: any = await store.http.get(
          "api/v1/master-data/get-nama-jabatan/" + record.value.opd_4_id
        );

        record.value.nama_jabatan = result.data.jabatan;
      } else if (record.value.opd_3_id != null) {
        const result: any = await store.http.get(
          "api/v1/master-data/get-nama-jabatan/" + record.value.opd_3_id
        );

        record.value.nama_jabatan = result.data.jabatan;
      } else if (record.value.opd_2_id != null) {
        const result: any = await store.http.get(
          "api/v1/master-data/get-nama-jabatan/" + record.value.opd_2_id
        );

        record.value.nama_jabatan = result.data.jabatan;
      } else {
        const result: any = await store.http.get(
          "api/v1/master-data/get-nama-jabatan/" + record.value.opd_1_id
        );

        record.value.nama_jabatan = result.data.jabatan;
      }
    };

    const fetchPendidikans = async () => {
      const result: any = await store.http.get("api/v1/combo/pendidikan");

      pendidikans.value = result.data;
    };

    const fetchJurusans = async () => {
      const result: any = await store.http.get(
        "api/v1/combo/jurusan/" + record.value.pendidikan_id
      );

      jurusans.value = result.data;
    };

    const openFormasiDocumentPage = (payload: any) => {
      router.push({
        name: "mainmenu-formasi-document",
        params: {
          event_uuid: route.params.event_uuid,
          formasi_uuid: payload,
        },
      });
    };

    const openBackPage = () => {
      router.push({
        name: "mainmenu-event",
      });
    };

    onMounted(() => {
      store.setPage({
        title: "Data Formasi",
        subtitle: "Berikut Daftar Seluruh Formasi Yang Tersedia",
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
          back: true,
        },
      });

      fetchOpds1();
      fetchPendidikans();
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
      flname,
      postUploadFile,
      opds1,
      fetchOpds2,
      opds2,
      fetchOpds3,
      opds3,
      fetchOpds4,
      opds4,
      jenisjabatans,
      fetchNamaJabatan,
      pendidikans,
      fetchJurusans,
      jurusans,
      openBackPage,
      openFormasiDocumentPage,
    };
  },
};
</script>
