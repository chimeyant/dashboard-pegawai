<template>
  <v-container>
    <v-row class="mt-5">
      <v-card width="100%">
        <v-card-title class="bg-blue">
          <v-icon>mdi-file-edit</v-icon> Formulir Permohonan
        </v-card-title>
        <v-card-text>
          <v-row class="mt-5">
            <v-col
              cols=12
              sm="12"
              md="6"
            >
              <span class="text-body-1 font-weight-medium">Nama</span>
              <v-text-field
                density="compact"
                hide-details="auto"
                variant="outlined"
                disabled
                v-model:model-value="user.name"
              ></v-text-field>
            </v-col>
            <v-col
              cols=12
              sm="12"
              md="6"
            >
              <span class="text-body-1 font-weight-medium">Alamat Email</span>
              <v-text-field
                density="compact"
                hide-details="auto"
                variant="outlined"
                disabled
                v-model:model-value="user.email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <span class="text-body-1 font-weight-medium">Judul</span>
              <v-text-field
                density="compact"
                hide-details="auto"
                variant="outlined"
                v-model="record.name"
              ></v-text-field>
            </v-col>
            <v-col cols="5">
              <span class="text-body-1 font-weight-medium">Bidang Pelayanan</span>
              <v-select
                density="compact"
                variant="outlined"
                hide-details="auto"
                v-model="record.section_uuid"
                :items="sections"
                @update:model-value="fetchServices"
              ></v-select>
            </v-col>
            <v-col cols="5">
              <span class="text-body-1 font-weight-medium">Pelayanan</span>
              <v-select
                density="compact"
                variant="outlined"
                hide-details="auto"
                v-model="record.service_uuid"
                :items="services"
              ></v-select>
            </v-col>
            <v-col cols="2">
              <span class="text-body-1 font-weight-medium">Prioritas</span>
              <v-select
                density="compact"
                variant="outlined"
                hide-details="auto"
                v-model="record.priority"
                :items="prioritas"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-row class="px-4 mt-5">
                <span class="text-body-1 font-weight-medium">Data Issue</span>
                <v-spacer></v-spacer>
                <v-btn
                  :variant="icon"
                  icon="mdi-plus"
                  :color="theme.color"
                  size="x-small"
                  @click="openFormIssue"
                ></v-btn>
              </v-row>

            </v-col>
            <v-col cols="12">
              <v-data-table-virtual
                :headers="taskdetails.headers"
                height="400"
                item-value="id"
                :items="taskdetails.records"
              >
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
                        density="compact"
                        @click="removeDetail(item.id)"
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
              </v-data-table-virtual>
            </v-col>

          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="outlined"
            :color="theme.color"
            @click="postRecord"
          >Kirim</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <form-frame
      title="Formulir Detail Permohonan"
      :width="700"
      @btnAdd="addDetail"
    >
      <v-row>
        <v-col cols="12">
          <v-select
            label="Platform"
            variant="outlined"
            hide-details="auto"
            :color="theme.color"
            density="compact"
            v-model="taskdetails.record.platform"
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
            v-model="taskdetails.record.type"
            :items="types"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-textarea
            label="Masalah"
            variant="outlined"
            density="compact"
            hide-details="auto"
            :color="theme.color"
            rows="3"
            placeholder="Silahkan anda jelaskan permohonan/permasalahan yang anda ingin sampaikan"
            v-model="taskdetails.record.issue"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-textarea
            label="Solusi/Harapan"
            variant="outlined"
            density="compact"
            hide-details="auto"
            :color="theme.color"
            rows="3"
            placeholder="Silahkan anda berikan informasi solusi atau harapan yang anda bisa berikan sebagai panduan dasar kami"
            v-model="taskdetails.record.expectation"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Surel /Url jika ada"
            variant="outlined"
            hide-details
            density="compact"
            v-model="taskdetails.record.url"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="6"
        >
          <v-text-field
            type="file"
            label="Pilih File Screenshot"
            variant="outlined"
            density="compact"
            @change="postUploadScreenshoot"
            ref="filescreenshoot"
          >

          </v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="6"
        >
          <v-text-field
            type="file"
            label="Pilih File Lampiran"
            variant="outlined"
            density="compact"
            ref="fileatt"
            @change="postUploadFileAtt"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </form-frame>

  </v-container>
</template>


<script lang="ts">
import { computed, onMounted, ref } from "vue";
import { useAppStore } from "../../../../store/app";
import { useRouter } from "vue-router";
import FormFrame from "../../../../components/Form/FormDialog.vue";
export default {
  components: {
    FormFrame,
  },
  setup() {
    const store = useAppStore();
    const router = useRouter();

    const device = computed(() => store.device);
    const theme = computed(() => store.theme);
    const page = computed(() => store.page);
    const user = computed(() => store.user);
    const record = ref({});
    const endpoint = "/api/v2/activity/task";
    const filescreenshoot = ref();
    const fileatt = ref();

    //custome page
    const sections = ref();
    const services = ref([]);
    const prioritas = [
      {
        value: 1,
        title: "Low",
      },
      {
        value: 2,
        title: "Medium",
      },
      {
        value: 3,
        title: "High",
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

    const taskdetails = ref({
      records: [],
      record: {},
      headers: [
        { title: "Masalah", align: "start", key: "issue" },
        { title: "Aksi", align: "end", key: "id" },
      ],
      form: {
        show: false,
      },
    });

    const fetchSections = async () => {
      const result = await store.http.get("/api/v2/combo/section");

      sections.value = result.data;
    };

    const fetchServices = async () => {
      services.value = [];
      record.value.service_uuid = null;

      const result = await store.http.get(
        "/api/v2/combo/service/" + record.value.section_uuid
      );

      services.value = result.data;
    };

    const postRecord = async () => {
      try {
        record.value.taskdetails = taskdetails.value.records;

        let result = await store.postRecord(endpoint, record.value);

        if (result.data.success) {
          store.setSnackbar(result.data.message, theme.value.color);
          router.push({ name: "activity-user-history" });
        }
      } catch (error) {}
    };

    const openFormIssue = () => {
      store.setForm({
        add: true,
        edit: false,
      });
      taskdetails.value.record = {};
    };

    const postUploadScreenshoot = async () => {
      const file = filescreenshoot.value.files[0];

      const result = await store.uploadFile(file, "documents");
      taskdetails.value.record.file_screenshoot = result.data.name;

      store.setSnackbar("Proses upload berhasil", theme.value.color);
    };

    const postUploadFileAtt = async () => {
      const file = fileatt.value.files[0];

      const result = await store.uploadFile(file, "documents");
      taskdetails.value.record.file_att = result.data.name;
      store.setSnackbar("Proses upload berhasil", theme.value.color);
    };

    const addDetail = () => {
      var id = taskdetails.value.records.length + 1;

      Object.assign(taskdetails.value.record, { id: id });
      taskdetails.value.records.push(taskdetails.value.record);

      store.setForm({
        add: false,
        edit: false,
      });
    };

    const removeDetail = (payload: any) => {
      taskdetails.value.records.splice(
        taskdetails.value.records.findIndex((item) => item.id == payload),
        1
      );
    };

    onMounted(() => {
      store.setPage({
        title: "Buka Tiket Permohonan",
        subtitle:
          "Silahkan anda membuka tiket permohonan untuk dapat di tindak lanjuti oleh yang berkaitan",
        actions: {
          refresh: false,
          add: true,
          edit: false,
          delete: false,
          bulkdelete: false,
          export: false,
          print: false,
          help: false,
        },
      });

      fetchSections();
    });

    return {
      device,
      theme,
      page,
      record,
      user,
      sections,
      services,
      prioritas,
      platforms,
      types,
      taskdetails,
      fetchServices,
      postRecord,
      openFormIssue,
      filescreenshoot,
      fileatt,
      postUploadScreenshoot,
      postUploadFileAtt,
      addDetail,
      removeDetail,
    };
  },
};
</script>
