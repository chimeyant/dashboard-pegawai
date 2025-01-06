// Utilities

import { defineStore } from "pinia";
import apiService from "@/provider/apiService";
import authProvider from "@/provider/authProviders";
import colors from "@/config/variable";
import { MSG_ERROR } from "@/config/lang";
import { useRouter } from "vue-router";

interface SigninUser {
  email: string;
  password: string;
}

export const useAppStore = defineStore("app", {
  state: () => ({
    //
    router: useRouter(),
    device: {
      mobile: null,
      tablet: null,
      laptop: null,
      desktop: null,
      tv: null,
    },
    appinfo: {},
    menus: [],
    theme: {
      mode: "light",
      color: "brown-lighten-1",
    },
    http: apiService,
    colors: {
      SUCCESS: colors.COLOR_SUCCESS,
      ERROR: colors.COLOR_ERROR,
      WARNING: colors.COLOR_WARNING,
      REFRESH: colors.COLOR_REFRESH,
      ADD: colors.COLOR_ADD,
      EDIT: colors.COLOR_EDIT,
      DWONLOAD: colors.COLOR_DOWNLOAD,
      DELETE: colors.COLOR_DELETE,
      BACK: colors.COLOR_BACK,
      HELP: colors.COLOR_HELP,
      DOT: colors.COLOR_DOT,
      TITLE: colors.COLOR_TITLE,
      SUBTITLE: colors.COLOR_SUBTITLE,
    },
    page: {
      dataUrl: null,
      crud: null,
      title: null,
      subtitle: null,
      icon: null,
      pagination: false,
      key: "id",
      breadcrumbs: [],
      toolbar: true,
      add: false,
      edit: false,
      actions: {
        refresh: true,
        add: true,
        edit: true,
        delete: true,
        bulkdelete: true,
        export: false,
        print: false,
        help: false,
        back: false,
      },
      showtable: true,
    },

    user: {
      name: null,
      email: null,
      avatar: null,
      authent: null,
    },

    records: [],
    record: {},

    table: {
      itemsPerPage: 10,
      totalItems: 0,
      loading: false,
      search: null,
      selects: [],
    },

    lists: {
      itemsPerPage: 10,
      totalItems: 0,
      page: 1,
      lastPage: 1,
      loading: false,
      search: null,
      selects: [],
    },

    form: {
      add: false,
      edit: false,
      delete: false,
      help: false,
      loading: false,
      info: false,
    },

    uploader: {
      state: false,
      progress: 0,
    },

    rules: {
      email: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      required: [(v) => !!v || "This field is required"],
      phone: [
        (v) => !!v || "Phone Number is required",
        (v) =>
          /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(v) ||
          "Nomor telpon tidak benar",
      ],
      ktp: [
        (v) => !!v || "NIK tidak boleh kosong",
        (v) => (v && v.length == 16) || "NIK tidak benar",
      ],
    },

    snackbar: {
      text: "",
      color: "green",
      type: "success",
      state: false,
    },
  }),
  getters: {
    getAppInfo: (state) => state.appinfo,
    getTheme: (state) => state.theme,
  },
  actions: {
    deviceResize() {
      let width = window.innerWidth;

      if (width < 480) {
        const payload = {
          mobile: true,
          tablet: false,
          laptop: false,
          desktop: false,
          tv: false,
        };

        this.setDevice(payload);
      }

      if (width >= 481 && width <= 768) {
        const payload = {
          mobile: false,
          tablet: true,
          laptop: false,
          desktop: false,
          tv: false,
        };

        this.setDevice(payload);
      }

      if (width >= 769 && width <= 1024) {
        const payload = {
          mobile: false,
          tablet: false,
          laptop: true,
          desktop: false,
          tv: false,
        };

        this.setDevice(payload);
      }

      if (width >= 1025 && width <= 1200) {
        const payload = {
          mobile: false,
          tablet: false,
          laptop: false,
          desktop: true,
          tv: false,
        };

        this.setDevice(payload);
      }

      if (width >= 1200) {
        const payload = {
          mobile: false,
          tablet: false,
          laptop: false,
          desktop: false,
          tv: true,
        };
        this.setDevice(payload);
      }
    },
    /**
     * Ser Device Display
     * @param payload
     */
    setDevice(payload: any) {
      Object.keys(payload).forEach((key) => {
        this.$state.device[key] = payload[key];
      });
    },

    /**
     *
     * @param payload
     */
    setList(payload: any) {
      Object.keys(payload).forEach((key) => {
        this.$state.lists[key] = payload[key];
      });
    },
    /**
     * Fungsi Pengambilan Informasi Aplikasi
     */
    async fetchAppInfo() {
      const endpont = "/api/v1/app-info";
      const result = await apiService.get(endpont);
      this.setAppInfo(result.data);
    },

    /**
     * Set Informasi Aplikasi
     * @param data
     */
    setAppInfo(data: any) {
      this.$state.appinfo = data;
    },

    /**
     *get User Info
     */
    async getUserInfo() {
      try {
        const endpoint = "api/v1/auth/user-info";
        const result = await apiService.get(endpoint);
        this.setUserInfo(result.data.data);
      } catch (error) {
        this.catchError(error);
      }
    },

    /**
     *
     * @param data
     */
    setUserInfo(data: any) {
      this.$state.user = data;
    },

    /**
     *
     * @param payload
     */
    setRecords(payload: []) {
      this.$state.records = payload;
    },

    /**
     *
     * @param payload
     */
    setRecord(payload: {}) {
      this.$state.record = payload;
    },

    /**
     *
     * @param payload
     */

    changeRecord(payload: { id: any }): void {
      const index = this.$state.records.findIndex(
        (item: { id: any }) => item.id === payload.id
      );
      Object.keys(payload).forEach((key) => {
        this.$state.records[index][key] = payload[key];
      });
    },

    /**
     *
     * @param payload
     */

    removeRecord(payload: any) {
      this.$state.records.splice(
        this.$state.records.findIndex((item) => item.id == payload),
        1
      );
    },

    /**
     * Fungsi pengambilan data menus berdasarkan pengguna
     */

    async fetchMenus() {
      try {
        const endpoint = "/api/v1/auth/menus";
        const result = await apiService.get(endpoint);
        this.setMenus(result.data);
        return true;
      } catch (error) {
        this.catchError(error.response);
      }
    },

    /**
     *
     * @param data Fungsi mengambil meni
     */
    setMenus(data: any) {
      this.$state.menus = data;
    },

    /**
     * set Page
     */
    setPage(payload: any) {
      Object.keys(payload).forEach((key) => {
        this.$state.page[key] = payload[key];
      });
    },

    /**
     * Set Formulir
     */
    setForm(payload: any) {
      Object.keys(payload).forEach((key) => {
        this.$state.form[key] = payload[key];
      });
    },

    /**
     * Open Snackbar Function
     * @param text
     * @param color
     * @param state
     */
    setSnackbar(text: string, color: string, type: string = "success") {
      (this.$state.snackbar.text = text),
        (this.$state.snackbar.color = color),
        (this.$state.snackbar.type = type),
        (this.$state.snackbar.state = true);
    },

    /**
     * Upload Initial
     */

    setUploaderState(status: boolean) {
      this.uploader.state = status;
    },

    setUploaderProgress(progress: any) {
      this.uploader.progress = progress;
    },

    starUpload() {
      this.$state.uploader.state = true;
    },

    finishUpload() {
      this.$state.uploader.state = false;
      this.$state.uploader.progress = 0;
    },

    /**
     * Fungsi registrasi pengguna
     */
    async postRegister(payload: any) {
      try {
        const endpoint = "/api/v1/auth/register";
        const result: any = await apiService.post(endpoint, payload);

        if (result.status == 200) {
          this.setSnackbar(result.data.message, colors.COLOR_SUCCESS);
          return true;
        } else {
          this.setSnackbar(result.data.message, colors.COLOR_WARNING);
          return false;
        }
      } catch (error) {
        this.catchError(error);
        return false;
      }
    },

    async postSignin(payload: SigninUser) {
      try {
        if (!payload.email || !payload.password) {
          return false;
        }

        const endpoint = "api/v1/auth/login";
        const result: any = await apiService.post(endpoint, payload);

        /**
         * Show Data Response Login
         */

        this.setMenus([]);

        if (result.data.status == 200) {
          const token = result.data.response.token;

          const auth = new authProvider();

          const payload = {
            info: {},
            modules: null,
            domain_url: null,
            module_url: null,
            menus: {},
            registed: null,
            theme: null,
            token: token,
            token_create_at: null,
          };

          /**
           * Store To Local Storage
           */

          auth.authData = payload;
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    },

    /**
     * FUngsi Signout
     */

    async postSignOut() {
      const auth = new authProvider();
      auth.clearAuthData();
      this.setMenus([]);
    },

    /**
     * Fetch Records
     */
    async fetchRecords(endpoint: string, payload: any) {
      try {
        this.$state.table.loading = true;
        const result = await apiService.get(endpoint, { params: payload });

        return {
          data: result.data,
          status: result.status,
        };
      } catch (error) {
        this.catchError(error);
      } finally {
        this.$state.table.loading = false;
      }
    },

    /**
     *
     * @param endpoint
     * @param payload
     * @returns
     */
    async postRecord(endpoint: string, payload: any, method = "store") {
      try {
        this.$state.form.loading = true;

        if (method == "store") {
          const result: any = await apiService.post(endpoint, payload);
          return result;
        }
        if (method == "update") {
          const result: any = await apiService.put(endpoint, payload);
          return result;
        }
        if (method == "delete") {
          const result: any = await apiService.delete(endpoint);
          return result;
        }
      } catch (error) {
        this.catchError(error);
      } finally {
        this.$state.form.loading = false;
      }
    },

    /**
     *
     * @param endpoint
     * @returns
     */
    async showRecord(endpoint: string) {
      try {
        this.$state.form.loading = true;
        const result = await apiService.get(endpoint);

        return result;
      } catch (error) {
        this.catchError(error);
      } finally {
        this.$state.form.loading = false;
      }
    },

    /**
     *
     * @param file
     * @param doctype
     */
    async uploadFile(file: File, doctype: string) {
      try {
        this.setUploaderState(true);
        const result = await apiService.uploadFile(
          file,
          doctype,
          (progressEvent) => {
            //track progress

            const presentCompleted = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            this.setUploaderProgress(presentCompleted);
          }
        );
        return result;
      } catch (error) {
        this.catchError(error);
      } finally {
        this.setUploaderState(false);
        this.setUploaderProgress(0);
      }
    },

    /**
     * Fungsi Pengambilan Data Error
     * @param payload
     */
    async catchError(payload: any) {
      if (payload.name == "AxiosError") {
        payload = payload.response;
        if (payload.status == 422) {
          const message = MSG_ERROR + ", " + payload.data.errors[0].message;
          this.setSnackbar(message, colors.COLOR_ERROR, "error");
        }
        if (payload.status == 401) {
          const message = MSG_ERROR + ", " + payload.statusText;
          this.postSignOut();
          this.$state.router.push({ name: "login" });
          this.setSnackbar(message, colors.COLOR_ERROR);
        }
        if (payload.status == 404) {
          const message = MSG_ERROR + ",  Route " + payload.statusText;

          this.setSnackbar(message, colors.COLOR_ERROR);
        }
        if (payload.status == 413) {
          const message = payload.data.message + ", " + payload.statusText;

          this.setSnackbar(message, colors.COLOR_ERROR);
        }
        if (payload.status == 500) {
          const message = payload.data.message + ", " + payload.statusText;

          this.setSnackbar(message, colors.COLOR_ERROR);
        } else {
          const message = payload.data.message;
          this.setSnackbar(message, colors.COLOR_ERROR);
        }
      } else {
        payload = payload.response;
        if (payload.status == 422) {
          const message = MSG_ERROR + ", " + payload.data.errors[0].message;
          this.setSnackbar(message, colors.COLOR_ERROR, "error");
        }
        if (payload.status == 401) {
          const message = MSG_ERROR + ", " + payload.statusText;
          this.postSignOut();
          this.$state.router.push({ name: "login" });
          this.setSnackbar(message, colors.COLOR_ERROR);
        }
        if (payload.status == 404) {
          const message = MSG_ERROR + ",  Route " + payload.statusText;

          this.setSnackbar(message, colors.COLOR_ERROR);
        }
        if (payload.status == 413) {
          const message = payload.data.message + ", " + payload.statusText;

          this.setSnackbar(message, colors.COLOR_ERROR);
        }
        if (payload.status == 500) {
          const message = payload.data.message + ", " + payload.statusText;

          this.setSnackbar(message, colors.COLOR_ERROR);
        }
      }
    },
  },
});
