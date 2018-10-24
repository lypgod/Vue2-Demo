<template>
  <div>
    <div class="logo">
      DXN
    </div>
    <div class="top-right-corner">
      <el-button type="danger" plain size="small" @click="logout">Logout</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('logout', { $router: this.$router });
    }
  }
};
</script>

<style scoped>
  .logo {
    font: bold 50px arial,sans-serif;
    float: left;
  }
  .top-right-corner {
    float: right;
  }
</style>
