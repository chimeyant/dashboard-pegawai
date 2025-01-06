<template>

  <v-container>
    <v-row>
      <v-col
        cols="12"
        class="text-body-1 font-weight-light"
      >
        <span>
          Jika Anda tidak dapat menemukan solusi untuk masalah Anda di knowledgebase kami, Anda dapat mengirimkan tiket dengan memilih departemen yang sesuai dibawah ini.
        </span>
      </v-col>

    </v-row>
    <v-row :class="device.mobile || device.tablet ? `px-1 `:`px-16 mt-5`">
      <v-col
        cols="12"
        sm="12"
        md="6"
        v-for="item in records"
      >
        <div
          class="text-body-1 text-blue font-weight-bold"
          @click="openTiket(item.id)"
        >

          <v-icon
            class="text-blue"
            @click="openTiket(item.id)"
          >mdi-email</v-icon>
          <a
            href="#"
            class="text-decoration-none ml-2"
            @click="openTiket(item.id)"
          >
            <span class="text-blue">
              {{ item.name }}
            </span>

          </a>

        </div>
        <div class="text-body-2 text-black font-weight-light pt-3">
          {{ item.description }}
        </div>
      </v-col>
    </v-row>
  </v-container>

</template>

<style>
</style>


<script lang="ts">
import { computed, onMounted, ref } from "vue";
import { useAppStore } from "../../../../store/app";
import { useRouter } from "vue-router";

export default {
  name: "user-modul-permohonan",

  setup() {
    const store = useAppStore();
    const router = useRouter();
    const device = computed(() => store.device);
    const records = ref([]);
    const endpoint = "api/v2/master-data/section";

    const fetchSection = async () => {
      const result: any = await store.fetchRecords(endpoint, {});
      records.value = result.data.data;
    };

    const openTiket = (id: any) => {
      router.push({ name: "activity-user-openticket" });
    };

    onMounted(() => {
      store.setPage({
        title: "Tiket Permohonan",
        subtitle: "Modul permohonan",
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

      fetchSection();
    });

    return {
      device,
      records,
      openTiket,
    };
  },
};
</script>
