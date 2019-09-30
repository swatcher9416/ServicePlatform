<template>
    <div>
        <div class="title">条件搜索</div>
        <ul class="flex">
            <li class="flex">
                操作人 
                <a-input placeholder="请输入操作人" style="width:150px ;margin-left:10px;"/>
            </li>
            <li class="flex">
              
               <a-range-picker @change="onChange" />

            </li>
              <a-button icon="search"  style="margin-right:10px;" type="primary">查询</a-button>
              <a-button icon="search"  style="margin-right:10px;" type="primary">清空</a-button>
        </ul>  


        <div class="title" style="margin-top:20px;">日志列表</div>
        
        <!-- <div style="margin-bottom:20px">
            <a-button icon="edit"  style="margin-right:10px;">新增</a-button>
            <a-button icon="edit"  style="margin-right:10px;">修改</a-button>
            <a-button icon="delete"  style="margin-right:10px;">删除</a-button>
        </div> -->
        <div >
            <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" >
                <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
            </a-table>
        </div>
      
    </div>
</template>

<script>

import { getsystemLog } from "../../api/interface"

const columns = [{
  title: '用户账号',
  dataIndex: 'optUser',
  scopedSlots: { customRender: 'optUser' },
}, {
  title: '用户名称',
  dataIndex: 'optUser',
}, {
  title: '操作对象',
  dataIndex: 'chineseName',
},
 {
  title: '操作类型',
  dataIndex: 'optType',
},{
  title: '操作内容',
  dataIndex: 'params',
},{
  title: '结果',
  dataIndex: 'optResult',
},{
  title: '操作时间',
  dataIndex: 'optDate',
}];

export default {

  data() {
    return {
      data:[],
      columns,
    }
  },
 computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          }
        }),
      }
    }
 },
 created(){
   this.get_systemLog()
 },
  methods: {
    get_systemLog(){
        var self = this;
        getsystemLog({
          pageNo:1,
          pageSize:10,
          optUser:'',
          startDate:'',
          endDate:''
        }).then(res=>{
          if(res.returnCode==200){
            self.data = res.data.rows
          }
        })
      },
    onChange(date, dateString) {
      console.log(date, dateString);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
    font-size: 20px;
    font-weight: bold;
    margin-bottom:20px;
}
.flex{
    display: flex;
    display:-webkit-flex;
    align-items: center;
}
ul{
    list-style: none;
    padding:0;
}
li{
    margin-right: 10px;
}
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255,255,255,.2);
  margin: 16px 28px 16px 0;
  float: left;
}
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
