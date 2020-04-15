import { getErrorMsgByEnd } from '@/util/base.js'
const BASE_URL = ''
const API = {
  // 表格数据获取
  GET_TABLE_DATA: {
    url: BASE_URL + '',
    tag: '',
    method: 'POST'
  },
  // 删除
  DELETE: {
    url: BASE_URL + '/delete',
    method: 'POST'
  },

  // 新增 & 编辑
  EDIT (status) {
    const dict = {
      'add': 'POST',
      'edit': 'PUT'
    }
    return {
      url: BASE_URL,
      method: dict[status]
    }
  },

  // 详情
  DETAIL (id) {
    return {
      url: BASE_URL + '/' + id,
      method: 'GET'
    }
  }
}

export default {
  methods: {
    /**
     * 列表数据获取
     */
    async getTableData () {
      this.table = await this.requestTable({
        ...API.GET_TABLE_DATA,
        currentObj: this.table,
        params: {}
      }, { noTime: true })  // 需要时间的时候把noTime参数去掉
    },
    /**
     * 删除
     */
    async del (params) {
      await this.$request({
        ...API.DELETE,
        data: { params }
      })
    },

    /**
     * 新增 & 编辑
     */
    async editForm (status, id) {
      let params = Object.assign(id ? { id: id } : {}, this.form)
      try {
        await this.$request({
          ...API.EDIT(status),
          data: params
        })
        this.showMessage(`${status === 'edit' ? '修改' : '新增'}成功！`)
        this.$emit('cancel')
        this.$emit('submit')
      } catch (error) {
        if (Array.isArray(error.message)) {
          this.formError = Object.assign({}, getErrorMsgByEnd(error))
        } else {
          this.showMessage((error && error.message) || `${status === 'edit' ? '修改' : '新增'}失败！请稍后再试！`, 'error')
        }
      }
    },

    /**
     * 详情展示
     */
    async getDetail (id) {
      let content = await this.$request({
        ...API.DETAIL(id)
      })
      this.form = Object.assign({}, this.form, content)
    }
  }
}
