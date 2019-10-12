<template>
    <div>
        <div class="title">条件搜索</div>
        <ul class="flex" style="flex-wrap:wrap">
            <li class="flex">
                元数据名称
                <a-input placeholder="请输入元数据名称" style="width:150px ;margin-left:10px;" v-model="smetadataName"/>
            </li>
            <li class="flex">
                中文名称	
                <a-input placeholder="请输入中文名称"  style="width:150px;margin-left:10px;" v-model="schineseName"/>
            </li>
             <li class="flex">
                类别词	
                <a-input placeholder="请输入类别词"  style="width:150px;margin-left:10px;" v-model="schineseName"/>
            </li>
            <li class="flex">
                数据项分类	
                <a-input placeholder="请输入数据项分类"  style="width:150px;margin-left:10px;" v-model="smetadataAlias"/>
            </li>
            <li class="flex">
                创建人	
                <a-input placeholder="请输入创建人"  style="width:150px;margin-left:10px;" v-model="optUser"/>
            </li>
            <li class="flex">
                创建起始日期	
                <a-date-picker @change="onChange"  placeholder="选择日期" style="width:150px;margin-left:10px;"/>
            </li>
            <li class="flex">
                创建结束日期
                <a-date-picker @change="onChange"   placeholder="选择日期" style="width:150px;margin-left:10px;"/>
            </li>
              <a-button icon="search"  style="margin-right:10px;" type="primary">查询</a-button>
              <a-button icon="close"  style="margin-right:10px;">清空</a-button>

        </ul>  
        <div class="title" style="margin-top:20px;">元数据管理</div>
        <div style="margin-bottom:20px">
            <a-button icon="plus"  style="margin-right:10px;" @click="addnew">新增</a-button>
            <a-button icon="edit"  style="margin-right:10px;"  @click="editnew" :disabled="ischangeone==0? true:false">修改</a-button>
            <a-button icon="delete"  style="margin-right:10px;" >删除</a-button>
            <a-button icon="swap"  style="margin-right:10px;">关联服务场景</a-button>
            <a-button icon="save"  style="margin-right:10px;">过时数据</a-button>
            <a-button icon="save"  style="margin-right:10px;">评审元数据</a-button>
            <a-button icon="save"  style="margin-right:10px;">导出XML</a-button>
            <a-button icon="save"  style="margin-right:10px;">导出EXCEL</a-button>
        </div>
          <a-modal
          :title="title"
          v-model="add_newenglish"
          @ok="click_meta"
            okText="保存"
            cancelText="取消"
        >
         <ul>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end;width:85%;  ">
             元数据名称  <a-input placeholder="请输入元数据名称" style="width:250px ;margin-left:10px;" v-model="metadataId"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
            中文名称  <a-input placeholder="请输入中文名称" style="width:250px ;margin-left:10px;"  v-model="chineseName"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             英文全称  <a-input placeholder="请输入英文全称" style="width:250px ;margin-left:10px;" v-model="metadataName"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             类别词  <a-input placeholder="请输入类别词" style="width:250px ;margin-left:10px;" v-model="categoryWordId"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  " >
             类型  <a-input placeholder="请输入类型" style="width:250px ;margin-left:10px;" v-model="type"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             长度  <a-input placeholder="请输入长度" style="width:250px ;margin-left:10px; " v-model="length"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             精度  <a-input placeholder="请输入精度" style="width:250px ;margin-left:10px;" v-model="scale"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             数据项分类  <a-input placeholder="请输入数据项分类" style="width:250px ;margin-left:10px;" v-model="dataCategory"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             状态  <a-input placeholder="请输入状态" style="width:250px ;margin-left:10px;" v-model="status"/>
           </li>
            <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             备注  <a-input placeholder="请输入备注" style="width:250px ;margin-left:10px;" v-model="remark"/>
           </li>
            <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             默认值  <a-input placeholder="请输入默认值" style="width:250px ;margin-left:10px;" v-model="defaultValue"/>
           </li>
         </ul>
        </a-modal>
        <div >
            <a-table  :columns="columns" :dataSource="data" :rowSelection = "rowSelection" >
                <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
            </a-table>
        </div>
    </div>
</template>

<script>
import {metadataList,metadataAdd,metadataEdit} from  "../../api/interface"

const columns = [{
  title: '元数据名称',
  dataIndex: 'metadataId',
  scopedSlots: { customRender: 'metadataId' },
}, {
  title: '中文名称',
  dataIndex: 'chineseName',
}, {
  title: '英文全称',
  dataIndex: 'metadataName',
},{
  title: '类别词',
  dataIndex: 'cateword',
},{
  title: '类型',
  dataIndex: 'metaType',
},{
  title: '长度',
  dataIndex: 'length',
},{
  title: '精度',
  dataIndex: 'scale',
},{
  title: '数据项分类',
  dataIndex: 'dataCategory',
},{
  title: '状态',
  dataIndex: 'status',
},{
  title: '操作用户',
  dataIndex: 'optUser',
},{
  title: '操作时间',
  dataIndex: 'optDate',
},{
  title: '备注',
  dataIndex: 'remark',
},{
  title: '默认值',
  dataIndex: 'defaultValue',
}];

export default {
  data() {
    return {
      data:[],
      columns,
      title:"新增元数据",
      add_newenglish:false,
      add_click:0,
      edit_click:0,
      //添加或者修改弹窗input绑定
      metadataId:'',
      chineseName:'',
      metadataName:'',
      categoryWordId:'',
      type:'',
      length:'',
      scale:'',
      dataCategory:'',
      status:'',
      remark:'',
      defaultValue:'',
      //搜索条件input绑定
      smetadataId:'',
      smetadataName:'',
      schineseName:'',
      smetadataAlias:'',
      sstatus:'',
      sversion:'',
      soptUser:'',
      sstartDate:'',
      sendDate:'',
      scategoryWordId:'',
      sdataCategory:'',
      delArray:'',
      ischangeone:0//控制
    }
  },
  created(){
    this.smetadataName='';
    this.schineseName='';
    this.smetadataAlias='';
    this.sstatus='';
    this.sversion='';
    this.soptUser='';
    this.sstartDate='';
    this.sendDate='';
    this.scategoryWordId='';
    this.sdataCategory='';
    this.metaList();//展示
  },
 computed: {
    rowSelection() {
      let self = this;
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          self.delArray= '';
          for(var i in selectedRows){
              self.delArray += selectedRows[i].id + ',';//选中的选项值拼成字符串
          }
          console.log(self.delArray)
          if(selectedRows.length == 1){//如果只选了一个的时候
            this.ischangeone = 1;
            this.metadataId = selectedRows[0].metadataId;
            this.chineseName = selectedRows[0].chineseName;
            this.metadataName = selectedRows[0].metadataName;
            this.categoryWordId = selectedRows[0].cateword;
            this.type = selectedRows[0].metaType;
            this.length = selectedRows[0].length;
            this.scale = selectedRows[0].scale;
            this.dataCategory = selectedRows[0].dataCategory;
            this.status = selectedRows[0].status;
            this.remark = selectedRows[0].remark;
            this.defaultValue = selectedRows[0].defaultValue;
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
    addnew(){
        this.add_newenglish =  true;
        this.title = "新增元数据";
        this.add_click = 1;
        this.edit_click = 0;
    },
    editnew(){
        this.add_newenglish =  true;
        this.title = "修改元数据";
        this.add_click = 0;
        this.edit_click = 1;
    },
    click_meta(){
      if(this.add_click==1&&this.edit_click==0){
          this.add_meta();
      }else if(this.add_click==0&&this.edit_click==1){
          this.edit_meta();
      }
    },
    metaList(){
        var self = this;
        metadataList({
          'pageNo':1,
          'rowNo':10,
          'metadataId':self.smetadataId,
          'metadataName':self.smetadataName,
          'chineseName': self.schineseName,
          'metadataAlias': self.smetadataAlias,
          'status': self.sstatus,
          'version': self.sversion,
          'optUser': self.soptUser,
          'startDate': self.sstartDate,
          'endDate': self.sendDate,
          'categoryWordId': self.scategoryWordId,
          'dataCategory': self.sdataCategory
        }).then(res=>{
          if(res.returnCode == 200){
            this.data = res.data.row;
          } 
        })
    },
    add_meta(){
      var self = this;
      metadataAdd({
        'metadataId':self.metadataId,
        'chineseName':self.chineseName,
        'metadataName':self.metadataName,
        'categoryWordId':self.categoryWordId,
        'type':self.type,
        'length':self.length,
        'scale':self.scale,
        'dataCategory':self.dataCategory,
        'status':self.status,
        'remark':self.remark,
        'defaultValue':self.defaultValue
      }).then(res=>{
        if(res.returnCode == 200){
          self.add_newenglish =  false;
        }
      })
    },
    edit_meta(){//修改
       metadataEdit({
        'metadataId':self.metadataId,
        'chineseName':self.chineseName,
        'metadataName':self.metadataName,
        'categoryWordId':self.categoryWordId,
        'type':self.type,
        'length':self.length,
        'scale':self.scale,
        'dataCategory':self.dataCategory,
        'status':self.status,
        'remark':self.remark,
        'defaultValue':self.defaultValue
      }).then(res=>{
        if(res.returnCode == 200){
          self.add_newenglish =  false;
        }
      })
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false
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
    margin-bottom: 10px;
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
