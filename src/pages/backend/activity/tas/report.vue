<template>
  <v-row :class="device.mobile || device.tablet ? `` :`mx-1 mt-1`">
    <v-col cols="12">
      <frame-table
        @btnRefresh="fetchRecords"
        @btnAddNew="addNew"
        @btnHelp="openHelper"
        @btnBulkDelete="postConfirmBulkDelete"
        v-show=" device.laptop || device.desktop || device.tv"
      >
        <v-data-table-server
          fixed-header
          :height="winheight"
          v-model:items-per-page="table.itemsPerPage"
          :headers="headers"
          density="comfortable"
          :items-length="table.totalItems"
          :items="records"
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
        title="Formulir Laporan Bulanan"
        width="600"
        @btnAdd="postRecord"
        @btnEdit="postUpdate"
        :fullscreen="device.mobile || device.tablet ? true: false"
      >
        <v-row>
          <v-col cols="12">
            <v-select
              label="Tahun"
              variant="outlined"
              hide-details="auto"
              :color="theme.color"
              density="compact"
              v-model="record.year"
              :items="years"
            ></v-select>
           </v-col>
           <v-col cols="12">
            <v-select
              label="Bulan"
              variant="outlined"
              hide-details="auto"
              :color="theme.color"
              density="compact"
              v-model="record.month"
              :items="months"
            ></v-select>
           </v-col>
          <v-col cols="12">
            <v-text-field
              label="Dokumen Laporan"
              placeholder=""
              variant="outlined"
              density="compact"
              hide-details="auto"
              :color="theme.color"
              v-model="record.file_att"
              :rules="rules.required"
              type="file"
              ref="fileatt"
              @change="postUploadFile"
            ></v-text-field>
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
          <div class="title font-weight-bold">Modul Laporan Balanan</div>
          <br>
          <div>
            <p class="text-body-2">
              Modul ini berfungsi untuk melakukan laporan bulanan tenaga ahli dan support
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

export default {
  components: {
    FrameTable,
    FrameForm,
    FormConfirmDelete,
    FormHelper,
  },
  setup() {
    const store = useAppStore();

    const device = computed(() => store.device);
    const theme = computed(() => store.getTheme);
    const page = computed(() => store.page);
    const colors = computed(() => store.colors);
    const table = computed(() => store.table);
    const list = computed(() => store.lists);
    const rules = computed(() => store.rules);
    const record = computed(() => store.record);
    const records = computed(() => store.records);
    const endpoint = "api/v2/activity/tas/report/";
    const fileatt = ref();

    const years = [
      {
        value:2024,
        title:'2024'
      }
    ]

    const months =[
      {
        value: '01',
        title:"Januari"
      },

      {
        value: '02',
        title:"Pebruari"
      },
      {
        value: '03',
        title:"Maret"
      },
      {
        value: '04',
        title:"April"
      },
      {
        value: '05',
        title:"Mei"
      },
      {
        value: '06',
        title:"Juni"
      },
      {
        value: '07',
        title:"Juli"
      },
      {
        value: '08',
        title:"Agustus"
      },
      {
        value: '09',
        title:"September"
      },
      {
        value: '10',
        title:"Oktober"
      },
      {
        value: '11',
        title:"Nopember"
      },
      {
        value: '12',
        title:"Desember"
      },


    ]

    const winheight = window.innerHeight - 320;
    const headers = [
      { title: "TAHUN", key: "year", align: "start" },
      { title: "BULAN", key: "month", align: "start" },
      { title: "DOKUMEN", key: "dokumen", align: "start" },
      {
        title: "AKSI",
        key: "id",
        align: "center",
        width: 100,
        sortable: false,
      },
    ];
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

      const result = await store.fetchRecords(endpoint, params);

      store.setRecords(result?.data.data);
      table.value.totalItems = result?.data.meta.total;
    };

    const postRecord = async () => {
      const result = await store.postRecord(endpoint, record.value);

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
      store.setRecord(result?.data);
      store.setForm({
        add: true,
        edit: true,
      });
    };

    const postUpdate = async () => {
      const result = await store.postRecord(
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
      const result = await store.postRecord(
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
      const result = await store.fetchRecords(endpoint, params);
      result.data.data.forEach((element) => {
        records.value.push(element);
      });

      store.setList({
        page: result.data.meta.current_page + 1,
        lastPage: result.data.meta.last_page,
      });
    };

    const postUploadFile = async function(){
      const file = fileatt.value.files[0]

      const result:any = await store.uploadFile(file, "documents");
      record.file_att = result.data.name;
      store.setSnackbar("Proses upload berhasil", theme.value.color);
    }

    onMounted(() => {
      store.setPage({
        title: "Laporan Bulanan",
        subtitle: "Berikut Daftar Seluruh Laporan Bulanan Yang Tersedia ",
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
        },
      });
    });

    return {
      device,
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
      years,
      months,
      fileatt,
      postUploadFile,
    };
  },
};
</script>
