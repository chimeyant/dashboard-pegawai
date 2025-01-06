<template>
  <v-row :class="device.mobile || device.tablet ? ``:`mx-1 mt-1 justify-center`">
    <v-col
      cols="12"
      sm="12"
      md="12"
    >
      <form-full-page
        title="Data Identitas Pemohon"
        @btnAddNew="postUpdate"
      >
        <v-row class="py-5">

          <v-col
            cols="12"
            sm="12"
            md="10"
          >
            <v-row class="mt-2">
              <v-col cols="12">
                <v-text-field
                  label="NIP"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  v-model="record.nip"
                  :color="theme.color"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nama Lengkap"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  v-model="record.nama"
                  :color="theme.color"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="NIK"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  v-model="record.nik"
                  :color="theme.color"
                  :rules="rules.ktp"
                  min-length="18"
                  max-length="18"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="6"
              >
                <v-text-field
                  label="Tempat Lahir"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  v-model="record.tempat_lahir"
                  :color="theme.color"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="3"
              >
                <v-text-field
                  label="Tanggal Lahir"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  v-model="record.tanggal_lahir"
                  :color="theme.color"
                  :rules="rules.required"
                  type="date"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="3"
              >
                <v-select
                  label="Jenis Kelamin"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :color="theme.color"
                  v-model="record.jenis_kelamin"
                  :items="jeniskelamins"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  v-model="record.email"
                  :color="theme.color"
                  :rules="rules.email"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Telpone (Whatsapp)"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  v-model="record.telp"
                  :color="theme.color"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <v-select
                  label="Golongan"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :color="theme.color"
                  v-model="record.golongan_id"
                  :items="golongans"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <v-textarea
                  label="Prestasi"
                  variant="outlined"
                  hide-details
                  density="compact"
                  :color="theme.color"
                  rows="3"
                  v-model="record.prestasi"
                ></v-textarea>

              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="6"
              >
                <v-select
                  label="Pendidikan Terakhir"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :color="theme.color"
                  v-model="record.pendidikan_id"
                  :items="pendidikans"
                  v-on:update:model-value="fetchJurusans"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="6"
              >
                <v-select
                  label="Jurusan"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :color="theme.color"
                  v-model="record.jurusan_id"
                  :items="jurusans"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nama Sekolah/Unisversitas"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  v-model="record.sekolah"
                  :color="theme.color"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <v-select
                  label="Jenis PNS"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :color="theme.color"
                  v-model="record.jenis_pns"
                  :items="jenispns"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Jabatan Asal"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  v-model="record.jabatan_asal"
                  :color="theme.color"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="OPD Asal"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  v-model="record.perangkat_daerah_pemohon"
                  :color="theme.color"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <v-select
                  label="Provinsi"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :color="theme.color"
                  v-model="record.province_id"
                  :items="provinces"
                  v-on:update:model-value="fetchRegencies"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <v-select
                  label="Kabupaten"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :color="theme.color"
                  :items="regencies"
                  v-model="record.regency_id"
                  v-on:update:model-value="fetchDistricts"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <v-select
                  label="Kecamatan"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :color="theme.color"
                  v-model="record.district_id"
                  :items="districts"
                  v-on:update:model-value="fetchVillages"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <v-select
                  label="Desa/Kelurahan"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :color="theme.color"
                  v-model="record.village_id"
                  :items="villages"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <v-textarea
                  label="Alamat"
                  variant="outlined"
                  hide-details
                  density="compact"
                  :color="theme.color"
                  rows="3"
                  v-model="record.alamat"
                >{{ record.alamat }}</v-textarea>

              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <v-textarea
                  label="Domisili di Kab. Tangerang (Jika Ada)"
                  variant="outlined"
                  hide-details
                  density="compact"
                  :color="theme.color"
                  rows="3"
                  v-model="record.alamat_domisili"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="2"
          >
            <div class="mt-8 mx-10">
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

export default {
  components: {
    FormFullPage,
  },
  setup() {
    const store = useAppStore();
    const device = computed(() => store.device);
    const theme = computed(() => store.theme);
    const record: any = computed(() => store.record);
    const rules = computed(() => store.rules);
    const colors = computed(() => store.colors);
    const endpoint = "api/v1/auth/user-info";
    const foto = ref(null);

    const fileInput = ref(null);
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

    const fetchUserInfo = async () => {
      const result: any = await store.showRecord("api/v1/peserta/show-profile");

      store.setRecord(result.data);
      foto.value = record.value.foto_path;

      fetchPendidikan();
      fetchJurusans(false);
      fetchRegencies(false);
      fetchDistricts(false);
      fetchVillages(false);
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
      status ? (record.value.jurusan_id = null) : "";
      jurusans.value = [];

      const response: any = await store.http.get(
        "api/v1/combo/jurusan/" + record.value.pendidikan_id
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

    onMounted(() => {
      store.setPage({
        title: "Data Identitas Pemohon",
        subtitle: "Berikut adalah data identitas anda",
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

      fetchUserInfo();
      fetchGolongans();
      fetchPendidikan();
      fetchJurusans();
      fetchProvinces();
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
    };
  },
};
</script>
