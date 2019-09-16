<template>
    <div>
        <div class="title">报文头信息</div>
        <ul class="flex" style="flex-wrap:wrap">
            <li class="flex">
                报文头名称
                <a-input placeholder="请输入服务代码" style="width:150px ;margin-left:10px;"/>
            </li>
            <li class="flex">
                 备注	
                <a-input placeholder="请输入中文名称"  style="width:150px;margin-left:10px;"/>
            </li>
             <li class="flex">
                描述    
                <a-input placeholder="请输入类别词"  style="width:150px;margin-left:10px;"/>
            </li>
            

        </ul>  



        
        <div style="margin-bottom:20px">
            <a-button icon="edit"  style="margin-right:10px;">上移</a-button>
           
            <a-button icon="edit"  style="margin-right:10px;">下移</a-button>

            <a-button icon="delete"  style="margin-right:10px;">保存</a-button>

        </div>
          <a-modal
          title="新增英文单词"
          v-model="add_newenglish"
          @ok="handleOk"
            okText="保存"
            cancelText="取消"
        >
         <ul>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end;width:85%;  ">
             英文单词：  <a-input placeholder="请输入英文单词：" style="width:250px ;margin-left:10px;"/>

           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
            单词缩写：  <a-input placeholder="请输入单词缩写：" style="width:250px ;margin-left:10px;"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             单词中文：  <a-input placeholder="请输入    单词中文：" style="width:250px ;margin-left:10px;"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             单词备注：  <a-input placeholder="请输入单词备注：" style="width:250px ;margin-left:10px;"/>
           </li>
         </ul>
        </a-modal>
        <div >
            <a-table  :columns="columns" :dataSource="data" >
                <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
            </a-table>
        </div>
    </div>
</template>

<script>
const columns = [{
  title: '字段名',
  dataIndex: 'name',
  scopedSlots: { customRender: 'name' },
}, {
  title: '字段别名',
  dataIndex: 'cname',
}, {
  title: '类型/长度',
  dataIndex: 'ename',
},{
  title: '元数据',
  dataIndex: 'cateword',
},{
  title: '是否必输',
  dataIndex: 'cate',
},{
  title: '备注',
  dataIndex: '',
}];
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: '测试测试k',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: '测试测试k',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: '测试测试kd',
}, {
  key: '4',
  name: 'Joe Black',
  age: 32,
  address: '测试测试kg',
}];
export default {

  data() {

    return {
        data,
      columns,
      add_newenglish:false
    }
  },
 computed: {
    // rowSelection() {
    //   const { selectedRowKeys } = this;
    //   return {
    //     onChange: (selectedRowKeys, selectedRows) => {
    //       console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //     },
    //     getCheckboxProps: record => ({
    //       props: {
    //         disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //         name: record.name,
    //       }
    //     }),
    //   }
    // }
 },
  destroyed: function () {
           console.log("我已经离开了！");
 },
  methods: {
    goTo(){
          this.$router.push({ path: "/platform" });
    },
    addnew(){
        this.add_newenglish =  true;
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
