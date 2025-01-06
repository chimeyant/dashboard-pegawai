import * as CryptoJS from "crypto-js";

interface TokenInfo {
  type: string | null;
  token: string | null;
  expire_in: number | null;
}

interface AuthData {
  info: Record<string, any>;
  user: Record<string, any>;
  modules: any;
  domain_url: string | null;
  module_url: string | null;
  menus: Record<string, any>;
  registed: any;
  theme: any;
  token: TokenInfo | null;
  token_create_at: number | null;
}

class AuthProviders {
  private readonly siteKey: string;
  private readonly secretKey: string;
  private readonly storage: Storage;

  constructor() {
    this.siteKey = import.meta.env.VITE_SITE_KEY;
    this.secretKey = import.meta.env.VITE_SITE_SECRET;
    this.storage = localStorage;
  }

  private encrypt(data: string): string {
    const encryptedData = CryptoJS.AES.encrypt(data, this.secretKey);
    return encryptedData.toString();
  }

  private decrypt(data: string): string {
    const decryptedData = CryptoJS.AES.decrypt(data, this.secretKey);
    return decryptedData.toString(CryptoJS.enc.Utf8);
  }

  private hash(key: string): string {
    const hashedKey = CryptoJS.SHA256(key, this.secretKey);
    return hashedKey.toString();
  }

  private getKey(key: string): string {
    return this.hash(`${this.siteKey}_${key}`);
  }

  get authData(): AuthData {
    const encryptedData = this.storage.getItem(this.getKey("authData"));

    if (!encryptedData) {
      return {
        info: {},
        user: {},
        modules: null,
        domain_url: null,
        module_url: null,
        menus: {},
        registed: null,
        theme: null,
        token: null,
        token_create_at: null,
      };
    }

    const decryptedData = this.decrypt(encryptedData);
    return JSON.parse(decryptedData);
  }

  set authData(data: any) {
    const encryptedData = this.encrypt(JSON.stringify(data));
    this.storage.setItem(this.getKey("authData"), encryptedData);
  }

  clearAuthData(): void {
    this.storage.removeItem(this.getKey("authData"));
  }

  get token(): string | null {
    const storedToken = this.authData.token;

    if (!storedToken || storedToken.type === null) {
      return null;
    }

    return `${storedToken.type} ${storedToken.token}`;
  }

  set token(response: TokenInfo | null) {
    if (!response) return;

    this.authData = {
      ...this.authData,
      token: response,
      token_create_at: Date.now(),
    };
  }

  get user(): {} {
    const storeUser = this.authData.user;

    if (!storeUser || storeUser.name === null) {
      return {};
    }

    return storeUser;
  }

  get expired(): boolean {
    const minute =
      parseInt(
        (Date.now() -
          parseInt(this.authData.token_create_at?.toString() || "0")) /
          1000
      ) || 0;
    const expire = parseInt(this.authData.token?.expires_in?.toString() || "0");

    return minute >= expire;
  }

  get check(): boolean {
    try {
      if (!this.authData.token) {
        return false;
      }

      return !!this.authData.token.token && !this.expired;
    } catch (error) {
      this.clearAuthData();
      return false;
    }
  }

  get logged(): boolean {
    return this.authData.token !== null;
  }
}

export default AuthProviders;
