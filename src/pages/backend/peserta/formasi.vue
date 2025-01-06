<template>
  <v-row :class="device.mobile || device.tablet ? `` :`mx-1 mt-1`">
    <v-col cols="12">
      <v-row class="my-5 mx-5">
        <v-col
          cols="12"
          md="6"
          sm=12
          v-for="(item, i) in records"
        >
          <v-card variant="outlined">
            <template
              v-slot:title
              class="bg-grey"
            >
              <span class="font-weight-bold">{{ item.opd }}</span>

            </template>
            <v-card-text class="bg-grey py-5">
              <tbody>
                <tr>
                  <td
                    class="mx-2"
                    style="vertical-align: top;"
                  >Kegiatan</td>
                  <td class="px-5">:</td>
                  <td><span class="font-weight-bold">{{ item.nama_event }}</span></td>
                </tr>
                <tr>
                  <td
                    class="mx-2"
                    style="vertical-align: top;"
                  >Jabatan</td>
                  <td class="px-5">:</td>
                  <td><span class="font-weight-bold">{{ item.nama_jabatan }}</span></td>
                </tr>
                <tr>
                  <td
                    class="mx-2"
                    style="vertical-align: top;"
                  >Jenis Jabatan</td>
                  <td class="px-5">:</td>
                  <td><span class="font-weight-light">{{ item.jenis_jabatan }}</span></td>
                </tr>
                <tr>
                  <td
                    class="mx-2"
                    style="vertical-align: top;"
                  >Keterangan </td>
                  <td class="px-5">:</td>
                  <td><span class="font-weight-light">{{ item.keterangan }}</span></td>
                </tr>
                <tr>
                  <td
                    class="mx-2"
                    style="vertical-align: top;"
                  >Pendidikan Terakhir </td>
                  <td class="px-5">:</td>
                  <td><span class="font-weight-light">{{ item.pendidikan_terakhir }}</span></td>
                </tr>
                <tr>
                  <td
                    class="mx-2"
                    style="vertical-align: top;"
                  >Jumlah Formasi</td>
                  <td class="px-5">:</td>
                  <td><span class="font-weight-light">{{ item.jenis_jabatan }}</span></td>
                </tr>
              </tbody>

              <v-row class="mt-10 mx-1">
                <v-btn
                  variant="flat"
                  style="text-transform: none;"
                  @click="showFormasiDetail(item.id)"
                >Lihat Persayaratan</v-btn>
                <v-btn
                  class="mx-2"
                  variant="flat"
                  style="text-transform: none;"
                  @click="addNew(item)"
                >Kirim Lamaran</v-btn>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <div>
      <frame-form
        title="Konfirmasi Permohonan"
        addCaption="Kirim"
        addIcon="mdi-cube-send"
        width="1024"
        @btnAdd="sendApply"
      >
        <div class="title mb-5">Apakah Anda yakin akan melakukan permohonan untuk mengisi formasi sebagai berikut :</div>

        <div>
          <tbody>
            <tr>
              <td class="pr-2">OPD</td>
              <td class="px-2">:</td>
              <td class="px-2 font-weight-bold"><span>{{ informasirecord.opd_1_id }}</span></td>
            </tr>
            <tr>
              <td class="pr-2">OPD 2</td>
              <td class="px-2">:</td>
              <td class="px-2 font-weight-bold"><span>{{ informasirecord.opd_2_id }}</span></td>
            </tr>
            <tr>
              <td class="pr-2">OPD 3</td>
              <td class="px-2">:</td>
              <td class="px-2 font-weight-bold"><span>{{ informasirecord.opd_3_id }}</span></td>
            </tr>
            <tr>
              <td class="pr-2">OPD 3</td>
              <td class="px-2">:</td>
              <td class="px-2 font-weight-bold"><span>{{ informasirecord.opd_4_id }}</span></td>
            </tr>
            <tr>
              <td class="pr-2">Jabatan</td>
              <td class="px-2">:</td>
              <td class="px-2"><span class="font-weight-bold">{{ informasirecord.nama_jabatan }}</span></td>
            </tr>
            <tr>
              <td class="pr-2">Keterangan</td>
              <td class="px-2">:</td>
              <td class="px-2"><span>{{ informasirecord.keterangan }}</span></td>
            </tr>
            <tr>
              <td class="pr-2">Jenis Jabatan</td>
              <td class="px-2">:</td>
              <td class="px-2"><span>{{ informasirecord.jenis_jabatan }}</span></td>
            </tr>
            <tr>
              <td class="pr-2">Pendidikan Terakhir</td>
              <td class="px-2">:</td>
              <td class="px-2"><span>{{ informasirecord.pendidikan_name }}</span></td>
            </tr>
            <tr>
              <td
                class="pr-2"
                style="vertical-align: top;"
              >Jurusan</td>
              <td
                class="px-2"
                style="vertical-align: top;"
              >:</td>
              <td class="px-2">
                <ul class="pl-2">
                  <li v-for="(item,id) in informasirecord.jurusans">
                    {{ item.name }}
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class="pr-2">Jumlah Kebutuhan</td>
              <td class="px-2">:</td>
              <td class="px-2"><span>{{ informasirecord.jumlah + " Orang" }}</span></td>
            </tr>
            <tr>
              <td class="pr-2">Status Permohonan</td>
              <td class="px-2">:</td>
              <td class="px-2"><v-chip :color="konfirmasi.record.status ? 'red':'green'">{{ Number(konfirmasi.record.status) > 0  ? 'Sudah Melamar': 'Belum Melamar' }}</v-chip></td>
            </tr>

          </tbody>
        </div>
        <div v-show="konfirmasi.showdocuments">
          <div class="text-body-1 mt-5">
            Sebelum mengirim permohonan lamaran anda silahkan lengkapi terlebih dahulu dokumen berikut ini :
          </div>
          <div>
            <v-list>
              <v-list-item
                class="text-wrap"
                v-for="(item, i) in konfirmasi.documents"
                :key="i"
                :value="item"
                color="primary"
              >
                <template v-slot:prepend>
                  <v-icon
                    :color="theme.color"
                    icon="mdi-file"
                  ></v-icon>
                </template>

                <template v-slot:title="{ title }">
                  <div class="text-wrap">
                    {{ item.Name  }}<v-chip
                      class="mx-3"
                      color="red"
                      size="small"
                      v-show="item.Wajib"
                    >Wajib</v-chip>
                    <v-chip
                      class="mx-3"
                      color="green"
                      size="small"
                      v-show="item.Flname ? true:false"
                    >Lengkap</v-chip>
                  </div>

                </template>
                <template v-slot:subtitle="{ subtitle }">
                  <div v-html="item.Description"></div>
                </template>
                <template v-slot:append>
                  <v-btn
                    size="small"
                    variant="tonal"
                    style="text-transform: none"
                    @click="openFileUpload(item)"
                  ><v-icon
                      small
                      class="mr-2"
                      :color="theme.color"
                    >mdi-cloud-upload</v-icon>Unggah</v-btn>
                </template>
              </v-list-item>
            </v-list>
          </div>
          <div>
            <input
              type="file"
              accept="image/*, .pdf"
              style="display: none;"
              ref="fileUpload"
              @change="postFileUpload"
            >
          </div>
        </div>
        <div class="mt-10">
          <v-row>
            <v-col cols-12>
              <v-row class="justify-center">
                <v-btn
                  variant="outlined"
                  style="text-transform: none;"
                  color="green"
                  @click="sendDraft(informasirecord)"
                  :loading="konfirmasi.sendloading"
                  v-show="konfirmasi.confirmbtn"
                >Ya, saya yakin</v-btn>
                <v-btn
                  variant="outlined"
                  style="text-transform: none;"
                  color="red"
                  @click=""
                  :loading="konfirmasi.sendloading"
                  v-show="konfirmasi.unsendedbtn"
                >Batalkan Permohonan</v-btn>
              </v-row>
            </v-col>
          </v-row>
        </div>

      </frame-form>
    </div>

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
    <div>
      <from-informasi
        title="Informasi Persyaratan"
        width="800"
      >
        <div class="title font-weight-bold">{{ informasirecord.opd_1_id }}</div>
        <div class="title font-weight-regular">{{ informasirecord.opd_2_id }}</div>
        <div class="title font-weight-light">{{ informasirecord.opd_3_id }}</div>
        <div class="title font-weight-thin">{{ informasirecord.opd_4_id }}</div>
        <br>
        <div>
          <tbody>
            <tr>
              <td class="pr-2">Jabatan</td>
              <td class="px-2">:</td>
              <td class="px-2"><span class="font-weight-bold">{{ informasirecord.nama_jabatan }}</span></td>
            </tr>
            <tr>
              <td class="pr-2">Keterangan</td>
              <td class="px-2">:</td>
              <td class="px-2"><span>{{ informasirecord.keterangan }}</span></td>
            </tr>
            <tr>
              <td class="pr-2">Jenis Jabatan</td>
              <td class="px-2">:</td>
              <td class="px-2"><span>{{ informasirecord.jenis_jabatan }}</span></td>
            </tr>
            <tr>
              <td class="pr-2">Pendidikan Terakhir</td>
              <td class="px-2">:</td>
              <td class="px-2"><span>{{ informasirecord.pendidikan_name }}</span></td>
            </tr>
            <tr>
              <td
                class="pr-2"
                style="vertical-align: top;"
              >Jurusan</td>
              <td
                class="px-2"
                style="vertical-align: top;"
              >:</td>
              <td class="px-2">
                <ul class="pl-2">
                  <li v-for="(item,id) in informasirecord.jurusans">
                    {{ item.name }}
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class="pr-2">Jumlah Kebutuhan</td>
              <td class="px-2">:</td>
              <td class="px-2"><span>{{ informasirecord.jumlah + " Orang" }}</span></td>
            </tr>
          </tbody>
        </div>

        <div class="mt-5 font-weight-bold text-grey">Dokumen Persyaratan</div>
        <div class="mx-2 mt-3">
          <ul>
            <li v-for="(item, i) in informasirecord.documents">
              {{ item.Name }}
              <v-chip
                size="small"
                v-show="item.Wajib"
                color="red"
                class="mr-2"
              >Wajib</v-chip>

              <v-chip
                size="small"
                v-show="item.Flname "
                color="green"
                @click="download(item.Flname)"
              >Unduh Contoh Dokumen</v-chip>
            </li>
          </ul>
        </div>
      </from-informasi>
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
import FromInformasi from "@/components/Form/FormGeneral.vue";
import { useRoute, useRouter } from "vue-router";
import { waitForDebugger } from "inspector";

export default {
  components: {
    FrameTable,
    FrameForm,
    FormConfirmDelete,
    FormHelper,
    FromInformasi,
  },
  setup() {
    const store = useAppStore();
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
    const endpoint = "api/v1/event";
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

    const informasishow = ref(false);
    const informasirecord: any = ref({});
    const fileUpload = ref(null);
    const konfirmasi = ref({
      confirmbtn: true,
      showdocuments: false,
      unsendedbtn: false,
      sendloading: false,
      documents: [],
      document: {
        uuid: null,
      },
      record: {
        uuid: null,
        status: null,
      },
    });
    const documents: any = ref([]);

    /**
     * Function Page
     */
    const addNew = async (payload: any) => {
      try {
        const result: any = await store.http.get(
          "api/v1/show-formasi-detail/" + payload.id
        );
        informasirecord.value = result.data;

        checkPresent(informasirecord.value.id);

        checkDraft(informasirecord.value.id);

        store.setForm({
          add: true,
          edit: false,
        });
      } catch (error) {
        store.catchError(error);
      }
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

      const result: any = await store.fetchRecords(endpoint);

      store.setRecords(result.data ?? []);
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
    const checkPresent = async (payload: any) => {
      try {
        const result = await store.http.get(
          "api/v1/peserta/check-formasi-peserta-present/" + payload
        );

        konfirmasi.value.showdocuments = result.data.status;
        konfirmasi.value.documents = result.data.data.documents;
        konfirmasi.value.record = result.data.data;
      } catch (error) {
        store.catchError(error);
      }
    };
    const checkDraft = async (payload: any) => {
      try {
        const result = await store.http.get(
          "api/v1/peserta/check-formasi-peserta-draft/" + payload
        );

        konfirmasi.value.confirmbtn = !result.data.status;
      } catch (error) {
        store.catchError(error);
      }
    };

    const sendDraft = async (payload: any) => {
      try {
        konfirmasi.value.sendloading = true;
        const result: any = await store.http.post("api/v1/peserta/send-draft", {
          event_uuid: payload.event_uuid,
          formasi_uuid: payload.id,
        });
        if (!result.data.success) {
          store.setSnackbar(result.data.message, colors.value.ERROR);
        }
        store.setSnackbar(result.data.message, colors.value.SUCCESS);
        konfirmasi.value.confirmbtn = false;
        checkPresent(payload.id);
      } catch (error) {
        store.catchError(error);
      } finally {
        konfirmasi.value.sendloading = false;
      }
    };

    const sendApply = async () => {
      try {
        const result: any = await store.http.post("api/v1/peserta/send-apply", {
          id: konfirmasi.value.record.uuid,
        });
        if (!result.data.success) {
          store.setSnackbar(result.data.message, colors.value.ERROR);
          return;
        }
        store.setSnackbar(result.data.message, colors.value.SUCCESS);
        store.setForm({
          add: false,
          edit: false,
        });
        router.push({
          name: "peserta-dashboard",
        });
      } catch (error) {
        store.catchError(error);
      }
    };

    const showInformation = () => {
      store.setForm({
        info: true,
      });
    };

    const showFormasiDetail = async (payload: any) => {
      try {
        const result: any = await store.http.get(
          "api/v1/show-formasi-detail/" + payload
        );

        informasirecord.value = result.data;

        store.setForm({
          info: true,
        });
      } catch (error) {
        store.catchError(error);
      }
    };

    const openFileUpload = (payload: any) => {
      konfirmasi.value.document.uuid = payload.Uuid;
      fileUpload.value.click();
    };

    const postFileUpload = async () => {
      const file = fileUpload.value.files[0];

      const result: any = await store
        .uploadFile(file, "documents")
        .then(async (res) => {
          const resultupdate: any = await store.http.post(
            "api/v1/peserta/formasi-apply-documents-upload",
            { id: konfirmasi.value.document.uuid, flname: res.data.name }
          );
        });

      //record.value.foto = result.data.name;

      //update dokumen applay
      //
      checkPresent(informasirecord.value.id);

      store.setSnackbar("Proses upload berhasil", colors.value.SUCCESS);
    };

    const download = (payload: any) => {
      window.open(payload, "__blank", "Unduh");
    };

    onMounted(() => {
      store.setPage({
        title: "Formasi Yang Tersedia",
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

      fetchRecords({});
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
      fileUpload,
      sendDraft,
      sendApply,
      informasishow,
      showInformation,
      showFormasiDetail,
      informasirecord,
      documents,
      konfirmasi,
      checkDraft,
      openFileUpload,
      postFileUpload,
      download,
    };
  },
};
</script>
