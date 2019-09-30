<template>
    <div>
        <div class="title">条件搜索</div>
        <ul class="flex">
            <li class="flex">
                中文名称
                <a-input placeholder="请输入中文名称" style="width:150px ;margin-left:10px;" v-model="searchCnName"/>
            </li>
            <li class="flex">
                名称
                <a-input placeholder="请输入名称"  style="width:150px;margin-left:10px;" v-model="searchName"/>
            </li>
             <li class="flex">
                说明
                <a-input placeholder="请输入说明"  style="width:150px;margin-left:10px;" v-model="searchdesc"/>
            </li>
              <a-button icon="search"  style="margin-right:10px;" type="primary">查询</a-button>
        </ul>  


        <div class="title" style="margin-top:20px;">字段处理办法</div>
        
        <div style="margin-bottom:20px">
            <a-button icon="plus"  style="margin-right:10px;" @click="open">新增</a-button>
            <a-button icon="edit"  style="margin-right:10px;" @click="edit" :disabled="ischangeone==0? true:false">修改</a-button>
            <a-button icon="delete"  style="margin-right:10px;" @click="del" :disabled="ischoose==0?true:false">删除</a-button>
        </div>
        <div >
            <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" >
               <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)"/>
                <!-- <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a> -->
            </a-table>
        </div>

          <a-modal
          title="新增字段处理"
          v-model="add_visible"
          @ok="save"
          okText="保存"
          cancelText="取消"
        >
         <ul>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end;width:85%;  ">
             中文名称：  <a-input placeholder="请输入中文名称" style="width:250px ;margin-left:10px;0 " v-model="chineseName"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
             名称：  <a-input placeholder="请输入名称" style="width:250px ;margin-left:10px;" v-model="name"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             描述：  <a-input placeholder="请输入描述" style="width:250px ;margin-left:10px;" v-model="desc"/>
           </li>
         </ul>
        </a-modal>
    </div>
</template>

<script>

import {addAttr,findAttr } from "../../api/interface"
// import EditableCell from './EditableCell'
const columns = [{
  title: '中文名称',
  dataIndex: 'name',
  scopedSlots: { customRender: 'name' },
}, {
  title: '名称',
  dataIndex: 'funcName',
}, {
  title: '参数',
  dataIndex: '',
},{
  title: '说明',
  dataIndex: 'des',
},{
  title: '操作',
  dataIndex: '',
}];

export default {
  data() {
    return {
      data:[],//表格数据
      columns,
      add_visible:false,//控制弹窗显示的变量
      chineseName:'',
      name:'',
      desc:'',
      //查询绑定
      searchCnName:'',
      searchName:'',
      searchdesc:'',
      ischangeone:0,
      ischoose:0,
      delArray:''
    }
  },
  //  components: {
  //   EditableCell,
  // },
  created(){
    this.getAllattr()
  },
 computed: {
    rowSelection() {
      var self = this;
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          if(selectedRows.length == 0){
            self.ischoose = 0;
          }else{
            self.ischoose = 1;
          }
           self.delArray= '';
          for(var i in selectedRows){
              self.delArray += selectedRows[i].id + ',';//选中的选项值拼成字符串
          }
          console.log(self.delArray)
          if(selectedRows.length == 1){//如果只选了一个的时候
              this.ischangeone = 1;
              // this.id = selectedRows[0].id;
              // this.name = selectedRows[0].name;
              self.chineseName = selectedRows[0].funcName,
              self.name=selectedRows[0].name,
              self.desc=selectedRows[0].des
          }else{
            this.ischangeone = 0;
          } 

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
  methods: {
    open(){
      this.add_visible = true;
      self.chineseName='',
      self.name='',
      self.desc=''
    },
    getAllattr(){
      var self = this;
      findAttr({
        pageNo:1,
        pageSize:10,
        name:self.searchCnName,
        funcName:self.searchName,
        des:self.searchdesc
      }).then(res=>{
          if(res.returnCode==200){
            self.data = res.data.rows;
          }
      })
    },
    edit(){
      this.add_visible = true;
    },
    save(){
      var attrJson = [
        {
         "name":this.name,
          "funcName":this.chineseName,
          "des":this.desc,
        }
      ];
      var self =this;
      addAttr({
        
        name:self.name,
        funcName:self.chineseName,
        des:self.desc,
        attFunction:attrJson
      }).then(res=>{
        if(res.returnCode==200){//添加成功
          //更新下表格
          self.add_visible = false;
        }
      })
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
