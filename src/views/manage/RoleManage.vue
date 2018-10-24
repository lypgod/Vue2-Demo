<template>
  <div>
    <h1>Roles List</h1>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import roleService from '../../services/RoleService';

export default {
  data () {
    return {
      tableData: []
    };
  },
  created () {
    roleService.getAllRoles()
      .then((response) => {
        this.tableData = response.data;
      });
  }
};
</script>

<style>
</style>
