<template>
  <div>
    <el-button @click="openUserDialog(true)">添加用户</el-button>
    <h1>用户列表</h1>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="80">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="memo"
        label="备注"
        width="200">
      </el-table-column>
      <el-table-column
        label="上次重设密码时间"
        width="150">
        <template slot-scope="scope">
          {{ scope.row.lastPasswordResetDate | date('%F') }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="openUserDialog(false, scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteUser(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.memo" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="userAddUpdateMethod()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import userService from '../../services/UserService';

export default {
  data () {
    return {
      tableData: [],
      dialogTitle: '添加用户',
      dialogFormVisible: false,
      userAddUpdateMethod: this.addUser,
      formLabelWidth: '120px',
      form: {
        id: null,
        username: '',
        memo: ''
      }
    };
  },
  methods: {
    refreshUsersTable: function () {
      userService.getAllUsers().then(response => {
        this.tableData = response.data;
      });
    },
    openUserDialog: function (addNew, data) {
      this.dialogTitle = addNew ? '添加用户' : '修改用户';
      this.userAddUpdateMethod = addNew ? this.addUser : this.updateUser;
      this.form = addNew
        ? {
          id: null,
          username: '',
          memo: ''
        }
        : {
          id: data.id,
          username: data.username,
          memo: data.memo
        };
      this.dialogFormVisible = true;
    },
    addUser: function (param) {
      userService.addUser(this.form).then(response => {
        this.$message({
          type: 'success',
          message: '用户添加成功!'
        });
        this.form = {
          id: null,
          username: '',
          memo: ''
        };
        this.dialogFormVisible = false;
        this.refreshUsersTable();
      });
    },
    deleteUser: function (param) {
      this.$confirm('确认删除用户"' + param.username + '"?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userService.deleteUser(param.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.refreshUsersTable();
        });
      });
    },
    updateUser: function (param) {
      userService.updateUser(this.form).then(response => {
        this.$message({
          type: 'success',
          message: '用户修改成功!'
        });
        this.form = {
          id: null,
          username: '',
          memo: ''
        };
        this.dialogFormVisible = false;
        this.refreshUsersTable();
      });
    }
  },
  created () {
    this.refreshUsersTable();
  }
};
</script>

<style>
</style>
