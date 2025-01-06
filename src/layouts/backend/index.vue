<template>
  <v-theme-provider
    theme="light"
    with-background
  >
    <div class="progress">
    </div>
    <v-app>
      <v-progress-circular
        indeterminate
        size="50"
        :color="theme.color"
        class="progress"
        v-show="loading <100"
      >

      </v-progress-circular>
      <v-navigation-drawer
        color="brown-darken-2"
        app
        v-model="drawer"
      >
        <v-list-item
          class="mt-2"
          title="Dashboard Pegawai"
          :subtitle="`Ver. 1.00 `"
        >

        </v-list-item>
        <v-list>
          <v-list-item
            prepend-avatar="/images/user.png"
            title="Administartor"
            subtitle="Administrator"
          >
          </v-list-item>
        </v-list>

        <v-list
          nav
          dense
          bg-color="lime-lighten-3"
          class="rounded-ts-xl pt-10 mt-10 animate__animated animate__fadeInUp"
          style="min-height: 100vH;"
          :items="menus"
          shaped
        >
          <template v-slot:item="items">
            <!-- Normal Item -->
            <v-list-item
              :title="items.props.title"
              :to="items.props.route"
              v-if="items.props.type == 'item'"
            >
              <template v-slot:prepend="props">
                <v-icon class="text-orange-darken-4">{{ items.props.icon }}</v-icon>
              </template>

            </v-list-item>

            <!-- Sub Header -->
            <v-list-subheader
              v-if="items.props.type == 'subheader'"
              class="overline mt-3 font-weight-bold black--text mb-3 bg-white"
              style=" height: 40px; border:rgb(0, 149, 255) 1px solid; border-radius:5px "
            >
              <v-icon class="text-orange-darken-4 mr-2">{{ items.props.icon }}</v-icon> {{ items.props.title }}
            </v-list-subheader>

            <!-- Group -->
            <v-list-group
              :value="items.props.submenus"
              v-if="items.props.type == 'group'"
            >
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  :title="items.props.title"
                >
                  <template v-slot:prepend="">
                    <v-icon class="text-orange-darken-4 mr-2">{{ items.props.icon }}</v-icon>
                  </template>

                </v-list-item>
              </template>
              <v-list-item
                class="animate__animated animate__flipInY"
                v-for="(item, i) in items.props.submenus"
                :key="i"
                :title="item.title"
                :to="item.props.route"
                :prepend-icon="item.props.icon"
              >

              </v-list-item>
            </v-list-group>
          </template>

        </v-list>
      </v-navigation-drawer>

      <v-app-bar
        :title="device.mobile || device.tablet ? '': appinfo.app_company"
        color="white"
        dark
        class="elevation-0  "
      >
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click="onDrawer"></v-app-bar-nav-icon>
        </template>

        <template v-slot:append>
          <v-icon
            color="grey darken-1"
            class="mr-2"
          >mdi-widgets</v-icon>
          <v-icon
            color="grey darken-1"
            class="mr-2"
          >mdi-bell-outline</v-icon>
          <v-menu>
            <template v-slot:activator="{ props: menu }">
              <v-tooltip location="top">
                <template v-slot:activator="{ props: tooltip }">
                  <v-avatar v-bind="mergeProps(menu, tooltip)">
                    <v-img
                      :src="user.avatar_path"
                      :alt="user.name"
                      cover
                    ></v-img>
                  </v-avatar>
                </template>
                <span>Profile & Logout</span>
              </v-tooltip>
            </template>

            <v-list>
              <v-list-item
                :prepend-avatar="user.avatar_path"
                :title="user.name"
                :subtitle="user.authent"
              >
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item
                prepend-icon="mdi-account-details"
                slim
                base-color="blue"
                @click="router.push({name:'utility-user-profile'})"
              >
                <v-list-item-title class="text-black">Profil Pengguna</v-list-item-title>
              </v-list-item>
              <v-list-item
                prepend-icon="mdi-key"
                slim
                base-color="blue"
                @click="router.push({name:'utility-user-change-pwd'})"
              >
                <v-list-item-title class="text-black">Ganti Kata Sandi</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item
                @click="signOut"
                prepend-icon="mdi-exit-to-app"
                slim
                base-color="red"
                class="font-weight-bold"
              >
                <v-list-item-title class="text-red font-weight-bold">Keluar</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>

        <template v-slot:extension>
          <v-toolbar
            class="elevation-2 bg-white"
            height="48px"
          >
            <div class="flex flex-column">
              <div class="toolbar-title">
                {{ page.title }}
              </div>
              <div class="toolbar-sub-title mb-1">
                {{ page.subtitle }}
              </div>
            </div>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
      </v-app-bar>

      <v-main class="main-content grey lighten-4">
        <div>
          <router-view />
        </div>
      </v-main>
      <v-footer
        class="bg-lime-lighten-4"
        app
      >
        <v-row class="pa-3">
          <v-col cols="12">
            <v-row class=" font-weight-thin ">
              <span class="text-body-2  mt-1 text-blue-grey">Status :</span>
              <span class="text-body-2  font-weight-thin px-3 mt-1 ">
                {{ form.delete ? 'Hapus Data' : form.add ? form.edit ? 'Ubah Data' : "Tambah Data" : 'Ready'  }}
              </span>
              <v-spacer></v-spacer>
              <span class="text-body-2 mt-1 text-blue-grey">
                {{ appinfo.app_company }} &copy;2024
              </span>
            </v-row>
          </v-col>
        </v-row>
      </v-footer>
    </v-app>
    <div class="text-center ma-2">
      <v-snackbar
        v-model="snackbar.state"
        :color="snackbar.color"
      >
        <v-row class="flex">
          <v-col cols="12">
            <div class="font-weight-bold subtitle-1 mb-1">Konfirmasi </div>
            <div>{{ snackbar.text }}</div>
          </v-col>
        </v-row>
      </v-snackbar>
    </div>
  </v-theme-provider>
</template>

<script lang="ts">
import { onBeforeMount, ref, mergeProps, onMounted, computed } from "vue";
import { useAppStore } from "../../store/app";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useAppStore();
    const router = useRouter();
    const device = computed(() => store.device);
    const theme = computed(() => store.theme);
    const appinfo: any = ref({});
    const menus = ref([]);
    const drawer = ref(true);
    const loading = ref(0);
    const interval = ref();
    const overlay = ref(false);
    const bufferValue = ref(10);
    const snackbar = computed(() => store.snackbar);
    const user: any = computed(() => store.user);
    const page = computed(() => store.page);
    const form = computed(() => store.form);

    const fetchData = async () => {
      await store.fetchAppInfo();
      appinfo.value = store.appinfo;
      store.setAppInfo(appinfo);
    };

    const fetchUserInfo = () => {
      store.getUserInfo();
    };

    const fetchMenus = async () => {
      await store.fetchMenus();
      menus.value = store.menus;
    };

    const onDrawer = () => {
      if (drawer.value) {
        drawer.value = false;
      } else {
        drawer.value = true;
      }
    };

    const startBuffer = () => {
      interval.value = setInterval(() => {
        overlay.value = true;
        loading.value += Math.random() * (15 - 5) + 5;
        bufferValue.value += Math.random() * (15 - 5) + 6;
      }, 1000);
    };

    const signOut = () => {
      store.postSignOut().then(() => {
        router.push({ name: "login" });
      });
    };

    onBeforeMount(async () => {
      fetchUserInfo();
      await fetchMenus();
      await fetchData();
    });

    onMounted(() => {
      store.deviceResize();
      if (typeof window !== "undefined") {
        window.addEventListener("resize", store.deviceResize, {
          passive: true,
        });
      }
      startBuffer();
      setTimeout(() => {
        loading.value = 100;
        overlay.value = false;
        clearInterval(interval.value);
      }, 1000);
    });

    return {
      router,
      device,
      theme,
      user,
      page,
      form,
      appinfo,
      menus,
      onDrawer,
      drawer,
      mergeProps,
      loading,
      interval,
      bufferValue,
      overlay,
      signOut,
      snackbar,
    };
  },
};
</script>

<style>
.main-content {
  height: 80vh;
  overflow-y: scroll;
}
.toolbar-title {
  font-size: 15px;
  font-weight: 600;
  color: darkslategrey;
  font-stretch: condensed;
  padding-left: 10px;
}
.people-title {
  font-family: people;
  font-size: 18px;
}
.toolbar-sub-title {
  font-size: 8pt;
  color: grey;
  font-weight: 500;
  padding-left: 10px;
}
::before {
  border-radius: 0px;
}
.footer-status {
  margin-top: 10px;
  margin-left: 250px;
  font-size: 9pt;
  color: grey;
}
.footer-status-mobile {
  margin-left: 0px;
  font-size: 9pt;
  color: grey;
}
.footer-copyright {
  margin-top: 10px;
  font-size: 9pt;
}
.top-loading {
  z-index: 9999;
}

.progress {
  top: 300px;
  left: 50%;
  z-index: 9999;
  position: absolute;
}
</style>

