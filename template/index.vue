<template>
    <div>
      <!-- search start -->
      <idss-widget style="padding: 15px;">
        <idss-collapse
          title="筛选条件"
          :is-button-show="false"
          :collapse="false"
          is-arrow-show>
          <el-form
            label-width="80px"
            :model="form"
            size="small"
            ref="form"
            plain>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item
                  prop="name"
                  label="">
                  <el-input
                    v-model="form.name"
                    placeholder="请输入">
                  </el-input>
                </el-form-item>
                <el-col :span="6">
                  <el-form-item label="时间">
                    <idss-time-select
                      :time.sync="globalTime"
                      style="width: 100%;"></idss-time-select>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  prop=""
                  label="">
                  <!-- <el-select v-model="form.type">
                    <el-option v-for="" :key="">
  
                    </el-option>
                  </el-select> -->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  prop=""
                  label="">
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item
                  prop=""
                  label="">
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  prop=""
                  label="">
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  prop=""
                  label="">
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  prop=""
                  label="">
                </el-form-item>
              </el-col>
            </el-row>
            <el-row
              type="flex"
              justify="center">
              <el-col
                :span="6"
                :offset="6">
                <el-button
                  type="primary"
                  @click="searchSubmit">查询</el-button>
                <el-button @click="formReset('form')">重置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </idss-collapse>
      </idss-widget>
  
      <!-- search end -->
      <!-- list start -->
      <idss-widget :footer-style="{padding: '10px'}">
        <template slot="title-left">列表</template>
        <!-- list header start -->
        <template slot="title-left">
          <el-button
            size="small"
            type="danger"
            plain>
            <idss-icon-svg
              name="delete-hover"
              style="marginRight: 5px"></idss-icon-svg>批量删除
          </el-button>
        </template>
        <template slot="title-right">
          <el-button
            @click="edit"
            size="small">
            <idss-icon-svg
              style="marginRight: 5px"
              name="add"></idss-icon-svg>新建
          </el-button>
        </template>
        <el-table
          border
          stripe
          :height="TABLE_HEIGHT.HIGH"
          :max-height="TABLE_HEIGHT.HIGH"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          :default-sort="{prop: '', order: ''}"
          @sort-change="handleTableChange"
          class="table"
          :data="table.data"
          v-loading="loading['table']">
          <template slot="empty">
            <idss-no-data></idss-no-data>
          </template>
          <el-table-column
            type="selection"
            width="40"
            align="center"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
            align="center">
          </el-table-column>
          <el-table-column
            label=""
            prop=""
            sortable="custom"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template v-slot="{row}">
              <el-button
                size="mini"
                type="primary"
                plain>{{row}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <template slot="footer">
          <idss-pagination
            :tableData="table"
            @page-change="handleTableChange"
            @size-change="handleTableChange">
          </idss-pagination>
        </template>
      </idss-widget>
      <!-- list end -->
    </div>
  </template>
  <script>
  import globalMixins from '@/mixins/globalMixins.js'
  // import Service from './template-service.js' @FIXME:路径暂不支持动态化
  // import { debounce } from '@/util/base'
  export default {
    name: 'template-name',
    mixins: [globalMixins],
    data () {
      return {
        collapse: false,
        form: {
          name: ''
        },
        table: {
          data: []
        },
        formError: {} // 表单错误提示
      }
    },
    methods: {
      /**
       * 表格多选
       */
      handleSelectionChange () {
  
      },
      /**
       * 表格分页 / 排序
       */
      handleTableChange (param) {
        this.tableChange(param, this.table, this.getTableData)
      },
      /**
       * 初始化表格数据获取
       */
      initTable (param = { type: 'init' }) {
        this.tableChange(param, this.table, this.getTableData)
      },
      /**
       * 查询
       */
      searchSubmit () {
        this.initTable({ type: 'submit' })
      },
      /**
       * 重置
       */
      formReset (formName) {
        this.$refs[formName].resetFields()
      },
      /**
       * 表单新增/编辑
       */
      edit (type, id) {
        this.editForm(type, id)
      },
      /**
       * 删除
       */
      async delContent () {
        await this.confirmBox({
          message: `是否要删除数据吗?`,
          title: '提示',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        try {
          await this.del()  // 删除方法
          this.showMessage('删除成功')
          this.initTable()
        } catch (err) {
          this.showMessage(err.message, 'error')
        }
      },
      /**
        * 组件初始化
        */
      init () {
        this.initTable({ type: 'init', defaultSort: true }) // 如果不存在默认排序，把传入的参数去掉即可
      }
    },
    mounted () {
      this.init()
    }
  }
  </script>
  
  <style scoped lang="postcss">
  </style>
  