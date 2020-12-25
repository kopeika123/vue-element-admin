<template>
  <div class="tab-container">
    <el-card class="box-card">
      <div slot="header">Настройки внешнего вида</div>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Цвет темы
          <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange" />
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider/>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Теги
            <el-switch v-model="tagsView" class="drawer-switch" style="float: right;height: 26px;margin: -3px 8px 0 0;"/>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider/>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Хедар
            <el-switch v-model="fixedHeader" class="drawer-switch" style="float: right;height: 26px;margin: -3px 8px 0 0;"/>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider/>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Логотип
            <el-switch v-model="sidebarLogo"  class="drawer-switch" style="float: right;height: 26px;margin: -3px 8px 0 0;"/>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider/>
    </el-card>
  </div>
</template>

<script>

import ThemePicker from '@/components/ThemePicker'
export default {
  name: 'Settings',
  components: { ThemePicker },
  data() {
    return {
      selectedItem: 1,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
    }
  },
  computed: {
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val
        })
      }
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: val
        })
      }
    },
    sidebarLogo: {
      get() {
        return this.$store.state.settings.sidebarLogo
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val
        })
      }
    }
  },
  methods: {
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
    }
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
  .box-card {
    width: 400px;
    max-width: 100%;
  }

</style>
