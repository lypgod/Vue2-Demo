<template>
  <el-container>
    <el-main>
      <div class="wrapper">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>登录</span>
          </div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">登录</el-button>
              <el-button @click="toRegister">注册</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('login', { form: this.form, $router: this.$router, $route: this.$route });
    },
    toRegister () {
      this.$router.push('register');
    }
  }
};
</script>

<style scoped>
  .wrapper {
    margin: 0 auto;
    width: 500px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }

</style>
