<template>
  <div class="mobile-nav">
    <div
      :class="{ 'menu-open': open }"
      class="menu"
    >
      <v-list
        dense
        tag="nav"
      >
        <v-list-item
          v-for="(item, index) in navMenu"
          :key="index"
          href="#"
          link
          :style="
          {
          animationDuration:
          index
          *
          0.15
          + 's'
          }"
        >
          <v-list-item-title class="menu-list">
            {{ 'Item' }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          href="#"
          link
          :style="{ animationDuration: navMenu.length * 0.15 + 's' }"
        >
          <v-list-item-title class="menu-list">
            {{ 'header conten' }}
          </v-list-item-title>
        </v-list-item>
        <v-divider class="divider-sidebar" />
        <v-list-item
          v-for="item in ['login', 'register']"
          :key="item"
          href="#"
          :style="{ animationDuration: navMenu.length * 0.15 + 's' }"
          link
        >
          <v-list-item-title class="menu-list">
            {{ "Menu Item List" }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./header-style";
</style>

<script>
import navMenu from "./menu";

export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      navMenu,
    };
  },
};
</script>
