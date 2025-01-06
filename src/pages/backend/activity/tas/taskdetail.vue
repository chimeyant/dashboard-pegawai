<template>
  <v-row :class="device.mobile || device.tablet ? `` :`mx-1 mt-1`">
    <v-col :cols="showprops ?`8`:`12` ">
      <frame-table
        @btnRefresh="fetchRecords"
        @btnAddNew="addNew"
        @btnHelp="openHelper"
        @btnBulkDelete="postConfirmBulkDelete"
        @btnBack="router.push({name:'activity-tas-task-manager'})"
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
          <template v-slot:item.story_point={item}>
            <v-chip
              size="small"
              :color="item.story_point? item.story_point.color : 'grey'"
            >{{ item.story_point ? item.story_point.text :'NA'  }}</v-chip>
          </template>
          <template v-slot:item.status={item}>
            <v-chip
              size="small"
              :color="item.status? item.status.color : 'grey'"
            >{{ item.status ? item.status.text :'NA'  }}</v-chip>
          </template>

          <template v-slot:item.id="{item}">
            <v-tooltip
              text="Open Property"
              location="top"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  icon="mdi-email-open"
                  size="x-small"
                  :color="theme.color"
                  class="text-white mx-1"
                  @click="showRecord(item.id)"
                >
                </v-btn>
              </template>
            </v-tooltip>
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
    <v-col
      cols="4"
      v-if="showprops"
    >
      <v-card
        class="fill-height animate__animated animate__fadeInRight overflow-scroll"
        rounded="0"
      >
        <v-card-title class="bg-blue">
          <div class="py-2">
            Detail Masalah
          </div>
        </v-card-title>
        <v-card-text>
          <v-row class="">
            <v-col cols=12>
              <v-row>
                <v-col cols="12">
                  <div class="text-subtitle-1 font-weight-bold">{{ taskheader.record.name }} <v-chip
                      :color="taskheader.record.priority.color"
                      size="small"
                    >{{ taskheader.record.priority.text }}</v-chip></div>
                  <div class=" text-grey text-body-2 mt-2">url: {{ taskheader.record.url ?? "-"}} </div>
                  <v-row>
                    <v-col cols=6>
                      <v-select
                        class="mt-3 text-body-2"
                        label="Story Point"
                        variant="outlined"
                        density="compact"
                        :color="theme.color"
                        v-model="record.story_point"
                        :items="storypoint"
                        hide-details
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        class="mt-3 text-body-2"
                        label="Status"
                        variant="outlined"
                        density="compact"
                        :color="theme.color"
                        v-model="record.status"
                        :items="status"
                        hide-details
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-col>
                <v-divider></v-divider>
                <v-col cols=12>
                  <div class="">
                    <div class="text-body-2 font-weight-medium">Masalah :</div>
                    <div>
                      <p>{{ record.issue }}</p>
                    </div>
                    <div class="text-body-2 font-weight-medium mt-2">Harapan :</div>
                    <div>
                      <p>{{ record.excpectation }}</p>
                    </div>
                  </div>
                </v-col>
                <v-col cols=12>
                  <v-textarea
                    label="Catatan Hasil Pekerjaan"
                    variant="outlined"
                    density="compact"
                    hide-details
                    :color="theme.color"
                    v-model="record.note"
                  >
                  </v-textarea>
                </v-col>
                <v-col cols=12>
                  <v-text-field
                    type="file"
                    label="Upload File Hasil (Jika Ada)"
                    :color="theme.color"
                    variant="outlined"
                    density="compact"
                    ref="fileinput"
                    @change="postUploadFile"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-row class="justify-space-around ">
                    <v-btn
                      :color="theme.color"
                      style="text-transform:none"
                      variant="outlined"
                      class="mr-2"
                      @click="openFile(record.file_screenshoot_path)"
                    >
                      Lihat Screenshoot
                    </v-btn>

                    <v-btn
                      :color="theme.color"
                      style="text-transform:none"
                      variant="outlined"
                      @click="openFile(record.file_att_path)"
                    >
                      Lihat Lampiran
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row class="px-5 justify-end mt-1o">
            <v-btn
              :color="colors.DELETE"
              style="text-transform:none"
              variant="outlined"
              @click="postConfirmDelete(record.id)"
            >
              <v-icon class="mr-2">mdi-delete</v-icon>
              Hapus</v-btn>
            <v-btn
              :color="theme.color"
              style="text-transform:none"
              variant="outlined"
              @click="postUpdateProgress"
            >
              <v-icon class="mr-2">mdi-content-save</v-icon>
              Simpan</v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12">
      <frame-form
        title="Formulir Task"
        width="600"
        @btnAdd="postRecord"
        @btnEdit="postUpdate"
        :fullscreen="device.mobile || device.tablet ? true: false"
      >
        <v-row>
          <v-col cols="12">
          <v-select
            label="Platform"
            variant="outlined"
            hide-details="auto"
            :color="theme.color"
            density="compact"
            v-model="record.platform"
            :items="platforms"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-select
            label="Jenis"
            variant="outlined"
            hide-details="auto"
            :color="theme.color"
            density="compact"
            v-model="record.type"
            :items="types"
          ></v-select>
        </v-col>
          <v-col cols="12">
            <v-text-field
              label="Masalah"
              placeholder="Exp: Aplikasi"
              variant="outlined"
              density="compact"
              hide-details="auto"
              :color="theme.color"
              v-model="record.issue"
              :rules="rules.required"
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
          <div class="title font-weight-bold">Modul Task Manager</div>
          <br>
          <div>
            <p class="text-body-2">
              Modul ini merupakan berfungsi untuk melakukan progress pekerjaan
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
import { useRouter, useRoute } from "vue-router";

export default {
  components: {
    FrameTable,
    FrameForm,
    FormConfirmDelete,
    FormHelper,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useAppStore();
    const device = computed(() => store.device);
    const theme: any = computed(() => store.getTheme);
    const page = computed(() => store.page);
    const colors = computed(() => store.colors);
    const table = computed(() => store.table);
    const list = computed(() => store.lists);
    const rules = computed(() => store.rules);
    const record = computed(() => store.record);
    const records = computed(() => store.records);
    const showprops: any = ref(false);
    const users = ref([]);
    const fileinput = ref()
    const status = [
      {
        value: "todo",
        title: "Todo",
      },
      {
        value: "on-progress",
        title: "On Progress",
      },
      {
        value: "done",
        title: "Done",
      },
    ];
    const storypoint = [
      {
        value: 1,
        title: 1,
      },
      {
        value: 2,
        title: 2,
      },
      {
        value: 3,
        title: 3,
      },
      {
        value: 4,
        title: 4,
      },
      {
        value: 5,
        title: 5,
      },
    ];

    const platforms = [
      {
        value: 1,
        title: "Aplikasi Desktop",
      },
      {
        value: 2,
        title: "Aplikasi Web Base",
      },
      {
        value: 3,
        title: "Aplikasi Mobile (Android/IOS)",
      },
    ];

    const types = [
      {
        value: "new",
        title: "New",
      },
      {
        value: "update",
        title: "Update",
      },
      {
        value: "troubleshoot",
        title: "Troubleshoot",
      },
      {
        value: "bug",
        title: "Bug",
      },
      {
        value: "domain",
        title: "Domain",
      },
      {
        value: "other",
        title: "Other",
      },
    ];

    const taskheader = ref({
      record: [],
    });

    const endpoint =
      "api/v2/activity/project-manager/task-manager-detail/" +
      route.params.task_header_uuid +
      "/";

    const winheight = window.innerHeight - 320;
    const headers: {}[] = [
      { title: "Masalah", key: "issue", align: "start" },

      {
        title: "Status",
        key: "status",
        align: "center",
        width: 120,
        sortable: false,
      },
      {
        title: "Story Point",
        key: "story_point",
        align: "center",
        width: 200,
        sortable: false,
      },
      {
        title: "Aksi",
        key: "id",
        align: "center",
        width: 80,
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
        fetchRecords({});
      }
    };

    const showRecord = async (payload: any) => {
      const result = await store.showRecord(endpoint + payload);
      store.setRecord(result?.data);
      openProps();
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
      //
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
      const endpoint = "api/v2/utility/users";
      const result = await store.fetchRecords(endpoint, params);
      result.data.data.forEach((element) => {
        records.value.push(element);
      });

      store.setList({
        page: result.data.meta.current_page + 1,
        lastPage: result.data.meta.last_page,
      });
    };

    const openProps = async () => {
      showprops.value = true;
    };

    const showTaskHeaderInfo = async () => {
      const result = await store.showRecord(
        "/api/v2/activity/project-manager/task-manager/" +
          route.params.task_header_uuid
      );

      taskheader.value.record = result.data;
    };

    const fetchUsers = async () => {
      const result: any = await store.fetchRecords("api/v2/combo/user");

      users.value = result.data;
    };

    const openFile = async (path: string) => {
      window.open(path, "__blank");
    };

    const postUpdateProgress = async () => {
      const result: any = await store.postRecord(
        "/api/v2/activity/tas/update-progress/" + record.value.id,
        record.value
      );

      if (result.data.success) {
        store.setSnackbar(result.data.message, theme.value.color);
        fetchRecords({});
      }
    };

    const postUploadFile = async ()=>{
      const file = fileinput.value.files[0]

      const result :any = await store.uploadFile(file, "documents");
      record.value.file_att_hasil =  result.data.name
    }

    onMounted(() => {
      store.setPage({
        title: "Task Manager",
        subtitle: "Berikut Daftar Seluruh Task Manager Yang Tersedia ",
        dataUrl: "api/v2/master-data/section",
        actions: {
          refresh: true,
          add: true,
          edit: true,
          delete: true,
          bulkdelete: false,
          export: false,
          print: false,
          help: true,
          back:true,
        },
      });

      showTaskHeaderInfo();
      fetchUsers();
    });

    return {
      router,
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
      openProps,
      showprops,
      showTaskHeaderInfo,
      taskheader,
      users,
      status,
      storypoint,
      fetchUsers,
      openFile,
      postUpdateProgress,
      fileinput,
      postUploadFile,
      platforms,
      types,
    };
  },
};
</script>
