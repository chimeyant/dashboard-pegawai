<template>
  <v-row :class="device.mobile || device.tablet ? ``:`mx-1 mt-1 justify-center`">
    <v-col
      cols="12"
      sm="12"
      md="12"
    >
      <form-full-page
        title="Data Identitas Pemohon | Pelamar"
        @btnAddNew="postUpdate"
      >
        <v-row class="py-5">
          <v-col cols="12">
            <v-row class="justify-end mb-5 ">
              <div
                style="border: red solid;"
                class="mr-10 font-weight-bold pa-3"
              >Nomor Registrasi : <span class="text-red">{{ record.nomor_registrasi }}</span> </div>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="10"
          >
            <tbody class="text-body-1 text-grey-darken-1">
              <tr>
                <td>Nama Lengkap</td>
                <td class="px-3">:</td>
                <td><span class="font-weight-bold">{{ peserta.nama }}</span></td>
              </tr>
              <tr>
                <td>NIP</td>
                <td class="px-3">:</td>
                <td><span class="font-weight-regular">{{ peserta.nip }}</span></td>
              </tr>
              <tr>
                <td>NIK</td>
                <td class="px-3">:</td>
                <td><span class="font-weight-regular">{{ peserta.nik }}</span></td>
              </tr>
              <tr>
                <td>Jenis Kelamin</td>
                <td class="px-3">:</td>
                <td><span class="font-weight-regular">{{ peserta.jenis_kelamin == 'P' ? "Perempuan" :"Laki-laki" }}</span></td>
              </tr>
              <tr>
                <td>Tempat, Tgl Lahir</td>
                <td class="px-3">:</td>
                <td><span class="font-weight-regular">{{ peserta.tempat_lahir }}, {{ peserta.tanggal_lahir }}</span></td>
              </tr>
              <tr>
                <td>Alamat Email</td>
                <td class="px-3">:</td>
                <td><span class="font-weight-regular">{{ peserta.email }}</span></td>
              </tr>
              <tr>
                <td>No. telp (Whatsapp)</td>
                <td class="px-3">:</td>
                <td><span class="font-weight-regular">{{ peserta.telp }}</span></td>
              </tr>
              <tr>
                <td>Golongan</td>
                <td class="px-3">:</td>
                <td><span class="font-weight-regular">{{ peserta.golongan }}</span></td>
              </tr>
              <tr>
                <td>Prestasi</td>
                <td class="px-3">:</td>
                <td><span class="font-weight-regular">{{ peserta.prestasi }}</span></td>
              </tr>
              <tr>
                <td>Pendidikan</td>
                <td class="px-3">:</td>
                <td><span class="font-weight-regular">{{ peserta.pendidikan }}</span></td>
              </tr>
              <tr>
                <td>Jurusan</td>
                <td class="px-3">:</td>
                <td><span class="font-weight-regular">{{ peserta.jurusan }}</span></td>
              </tr>
              <tr>
                <td>Sekolah/Universitas</td>
                <td class="px-3">:</td>
                <td><span class="font-weight-regular">{{ peserta.sekolah }}</span></td>
              </tr>
              <tr>
                <td>Jenis PNS</td>
                <td class="px-3">:</td>
                <td><span class="font-weight-regular">{{ peserta.jenis_pns }}</span></td>
              </tr>
              <tr>
                <td>Jabatan Asal</td>
                <td class="px-3">:</td>
                <td><span class="font-weight-regular">{{ peserta.jabatan_asal }}</span></td>
              </tr>
              <tr>
                <td>OPD Asal</td>
                <td class="px-3">:</td>
                <td><span class="font-weight-regular">{{ peserta.opd_asal }}</span></td>
              </tr>
              <tr>
                <td>Alamat</td>
                <td class="px-3">:</td>
                <td><span class="font-weight-regular">{{ peserta.alamat }}</span></td>
              </tr>
            </tbody>
          </v-col>

          <v-col
            cols="12"
            sm="12"
            md="2"
          >
            <div class="mt-2 mx-10">
              <v-avatar
                size="150"
                color="grey"
                rounded=""
                style="height: 180px;"
              >
                <v-img
                  :src="foto"
                  alt=""
                  srcset=""
                  cover
                >

                </v-img>
                <v-icon
                  style="z-index: 99; position: absolute;"
                  @click="openFileUpload"
                >
                  mdi-camera
                </v-icon>
              </v-avatar>
            </div>
            <input
              type="file"
              accept="image/*"
              style="display: none;"
              ref="fileInput"
              @change="postFileUpload"
            >
          </v-col>
          <v-col cols="12">
            <div class="font-weight-bold text-grey">Dokumen Persyaratan</div>
            <div>
              <div class="mx-2 mt-3">
                <ul class="text-grey-darken-1">
                  <li v-for="(item, i) in record.documents">
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
                    >Lihat Dokumen</v-chip>
                  </li>
                </ul>
              </div>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="font-weight-bold text-grey">Hasil Verifikasi / Penilaian</div>
            <v-col cols="12">
              <v-textarea
                label="Nilai Integritas"
                variant="outlined"
                density="compact"
                hide-details
                :color="theme.color"
                rows="3"
                v-model="verifikasirecord.n_integritas"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Nilai Wawancara"
                variant="outlined"
                density="compact"
                hide-details
                :color="theme.color"
                rows="3"
                v-model="verifikasirecord.n_wawancara"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Pesan atau catatan"
                variant="outlined"
                density="compact"
                hide-details
                :color="theme.color"
                rows="3"
                placeholder="Silahkan masukan pesan atau catatan yang perlu disampaikan untuk peserta/pemohon jika di perlukan"
                v-model="verifikasirecord.pesan"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-select
                label="Status Hasil"
                variant="outlined"
                density="compact"
                hide-details
                :items="statuskelulusan"
                :color="theme.color"
                v-model="verifikasirecord.status"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-btn
                variant="outlined"
                :color="theme.color"
                @click="postSendVerifikasi"
              >
                <v-icon class="mr-2">mdi-send</v-icon>
                Kirim</v-btn>
              <v-btn
                variant="outlined"
                color="grey"
                @click="openBackPage"
                class="ml-2"
              >
                <v-icon class="mr-2">mdi-close</v-icon>
                Batal</v-btn>
            </v-col>
          </v-col>

        </v-row>
      </form-full-page>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { useAppStore } from "@/store/app";
import FormFullPage from "@/components/Form/FormFullPage";
import { computed, onMounted, ref } from "vue";
import { error } from "console";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    FormFullPage,
  },
  setup() {
    const store = useAppStore();
    const route = useRoute();
    const router = useRouter();
    const device = computed(() => store.device);
    const theme = computed(() => store.theme);
    const record: any = computed(() => store.record);
    const rules = computed(() => store.rules);
    const colors = computed(() => store.colors);
    const endpoint = "api/v1/auth/user-info";
    const user = computed(() => store.user);
    const foto = ref(null);

    const fileInput = ref(null);
    const peserta: any = ref({});
    const jeniskelamins = ref([
      {
        title: "Laki-laki",
        value: "L",
      },
      {
        title: "Perempuan",
        value: "P",
      },
    ]);
    const golongans = ref([]);
    const pendidikans = ref([]);
    const jurusans = ref([]);
    const jenispns = ref([
      {
        title: "PUSAT",
        value: "PUSAT",
      },
      {
        title: "DAERAH",
        value: "DAERAH",
      },
    ]);
    const provinces = ref([]);
    const regencies = ref([]);
    const districts = ref([]);
    const villages = ref([]);

    const verifikasirecord: any = ref({
      id: null,
      n_wawancara: null,
      n_integritas: null,
      status: null,
      pesan: null,
    });

    const statuskelulusan = ref([
      {
        title: "Ditolak / Perlu Perbaikan",
        value: "2",
      },
      {
        title: "Lulus Administrasi (Terverifikasi)",
        value: "4",
      },
      {
        title: "Lulus",
        value: "6",
      },
      {
        title: "Tidak Lulus",
        value: "7",
      },
    ]);

    const fetchUserInfo = async () => {
      const result: any = await store.showRecord(
        "api/v1/main-menu/show-verifikasi/" + route.params.formasi_apply_uuid
      );

      peserta.value = result.data.peserta;
      store.setRecord(result.data);
      verifikasirecord.value.id = result.data.uuid;

      foto.value = record.value.peserta.path_foto;

      if (user.value.authent == "superadmin") {
        const status = [
          {
            title: "Ditolak / Perlu Perbaikan",
            value: "2",
          },
          {
            title: "Lulus Administrasi (Terverifikasi)",
            value: "4",
          },
        ];

        statuskelulusan.value = status;
      }
      if (user.value.authent == "kabid") {
        const status = [
          {
            title: "Lulus",
            value: "6",
          },
          {
            title: "Tidak Lulus",
            value: "7",
          },
        ];

        statuskelulusan.value = status;
      }
    };

    const postUpdate = async () => {
      try {
        const endpoint = "api/v1/peserta/update-profile";

        const result: any = await store.postRecord(
          endpoint,
          record.value,
          "store"
        );

        if (result.data.success == false) {
          store.catchError(result.data);
          return;
        }

        //fetchUserInfo();

        store.setSnackbar(result?.data.message, colors.value.SUCCESS);
      } catch (error) {
        store.catchError(error);
      }
    };

    const openFileUpload = () => {
      fileInput.value.click();
    };

    const postFileUpload = async () => {
      const file = fileInput.value.files[0];

      const result: any = await store.uploadFile(file, "profiles");

      foto.value = result.data.path;
      record.value.foto = result.data.name;

      store.setSnackbar("Proses upload berhasil", colors.value.SUCCESS);
    };

    const fetchGolongans = async () => {
      const response: any = await store.http.get("api/v1/combo/golongan");

      golongans.value = response.data;
    };

    const fetchPendidikan = async () => {
      const response: any = await store.http.get("api/v1/combo/pendidikan");

      pendidikans.value = response.data;
    };

    const fetchJurusans = async (status: boolean = false) => {
      status ? (peserta.value.jurusan_id = null) : "";
      jurusans.value = [];

      const response: any = await store.http.get(
        "api/v1/combo/jurusan/" + peserta.value.pendidikan_id
      );

      jurusans.value = response.data;
    };

    const fetchProvinces = async () => {
      const response: any = await store.http.get("api/v1/combo/province");
      provinces.value = response.data;
    };

    const fetchRegencies = async (status: boolean = false) => {
      regencies.value = [];

      if (status) {
        record.value.regency_id = null;
        record.value.district_id = null;
        record.value.village_id = null;
      }

      const result: any = await store.http.get(
        "api/v1/combo/regency/" + record.value.province_id
      );

      regencies.value = result.data;
    };

    const fetchDistricts = async (status: boolean = false) => {
      districts.value = [];
      if (status) {
        record.value.district_id = null;
        record.value.village_id = null;
      }

      const result: any = await store.http.get(
        "api/v1/combo/district/" + record.value.regency_id
      );

      districts.value = result.data;
    };

    const fetchVillages = async (status: boolean = false) => {
      villages.value = [];
      if (status) {
        record.value.village_id = null;
      }

      const result: any = await store.http.get(
        "api/v1/combo/village/" + record.value.district_id
      );

      villages.value = result.data;
    };

    const download = (payload: any) => {
      window.open(payload, "__blank");
    };

    const postSendVerifikasi = async () => {
      try {
        const result: any = await store.http.post(
          "api/v1/main-menu/send-verifikasi",
          verifikasirecord.value
        );

        store.setSnackbar(result?.data.message, colors.value.SUCCESS);
        openBackPage();
      } catch (error) {
        store.catchError(error);
      }
    };

    const openBackPage = () => {
      router.push({
        name: "mainmenu-daftar-pelamar",
        params: {
          event_uuid: route.params.event_uuid,
        },
      });
    };

    onMounted(() => {
      store.setPage({
        title: "Formulir Verifikasi",
        subtitle: "Berikut adalah formulir verifikasi",
        actions: {
          refresh: false,
          add: false,
          edit: false,
          delete: false,
          bulkdelete: false,
          export: false,
          print: false,
          help: false,
        },
      });

      fetchUserInfo();
    });
    return {
      device,
      theme,
      record,
      rules,
      foto,
      fileInput,
      postUpdate,
      openFileUpload,
      postFileUpload,
      jeniskelamins,
      golongans,
      pendidikans,
      jurusans,
      fetchJurusans,
      jenispns,
      provinces,
      fetchRegencies,
      regencies,
      fetchDistricts,
      districts,
      fetchVillages,
      villages,
      peserta,
      download,
      statuskelulusan,
      postSendVerifikasi,
      verifikasirecord,
      openBackPage,
    };
  },
};
</script>
