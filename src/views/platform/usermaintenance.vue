<template>
    <div>
        <div class="title">条件搜索</div>
        <ul class="flex">
            <li class="flex">
                用户代码 
                <a-input placeholder="请输入用户代码" style="width:150px ;margin-left:10px;"/>
            </li>
            <li class="flex">
                用户名称
                <a-input placeholder="请输入用户名称"  style="width:150px;margin-left:10px;"/>
            </li >
     
            <li class="flex">
                用户状态
                <a-select defaultValue="lucy" style="width: 120px;margin-left:10px;">
                    <a-select-option value="jack" >Jack</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                    <a-select-option value="disabled" disabled>Disabled</a-select-option>
                    <a-select-option value="Yiminghe">yiminghe</a-select-option>
                </a-select>
                  <a-button icon="search"  type="primary" style="margin-right:10px;margin-left:20px;">查询</a-button>
                  <a-button icon="close" >清空</a-button>
            </li>
        </ul>  
        


        <div class="title" style="margin-top:20px;">所有用户</div>
        
        <div style="margin-bottom:20px">
            <a-button icon="plus"  style="margin-right:10px;"  @click="showModal">新增</a-button>
            <a-button icon="edit"  style="margin-right:10px;">修改</a-button>
            <a-button icon="delete"  style="margin-right:10px;" @click="showConfirm">删除</a-button>
            <a-button icon="laptop"  style="margin-right:10px;"  @click="changePass">修改密码</a-button>
            <a-button icon="laptop"  style="margin-right:10px;">初始化密码</a-button>
        </div>
        <a-modal
            title="新增用户"
            :visible="visible"
            @ok="handleOk"
            @cancel="handleCancel"
            okText="保存"
            cancelText="取消"
            width='1000px'
            >
            <div>
              <div class="graybox">
                  <ul class="flex" style="width:100%; flex-wrap:wrap">
                    <li class="flex" style="width:45%;margin-bottom:10px;justify-content:flex-end ">
                        用户代码
                         <a-input placeholder="请输入用户代码" style="width:250px ;margin-left:10px;"/>
                    </li>
                    <li  class="flex" style="width:45%;margin-bottom:10px;justify-content:flex-end  ">用户名称   <a-input placeholder="请输入用户代码" style="width:250px ;margin-left:10px;"/></li>
                    <li  class="flex" style="width:45%;margin-bottom:10px;justify-content:flex-end  ">手机号码   <a-input placeholder="请输入用户代码" style="width:250px ;margin-left:10px;"/></li>
                    <li  class="flex" style="width:45%;margin-bottom:10px;justify-content:flex-end  ">电话号码   <a-input placeholder="请输入用户代码" style="width:250px ;margin-left:10px;"/></li>
                    <li  class="flex" style="width:45%;margin-bottom:10px;justify-content:flex-end  ">电子邮箱   <a-input placeholder="请输入用户代码" style="width:250px ;margin-left:10px;"/></li>
                    <li  class="flex" style="width:45%;margin-bottom:10px;justify-content:flex-end  ">所属机构   <a-input placeholder="请输入用户代码" style="width:250px ;margin-left:10px;"/></li>
                    <li  class="flex" style="width:45%;margin-bottom:10px;justify-content:flex-end  ">密码       <a-input placeholder="请输入用户代码" style="width:250px ;margin-left:10px;"/></li>
                    <li  class="flex" style="width:45%;margin-bottom:10px;justify-content:flex-end  ">用户状态   <a-input placeholder="请输入用户代码" style="width:250px ;margin-left:10px;"/></li>
                    <li  class="flex" style="width:45%;margin-bottom:10px;justify-content:flex-end  ">备注       <a-input placeholder="请输入用户代码" style="width:250px ;margin-left:10px;"/></li>
                  </ul>
              </div>
              <div class="graybox">
                  <a-table :rowSelection="rowSelection" :columns="columns_modal" :dataSource="data">
                    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
                  </a-table>
              </div>
            </div>
        </a-modal>
        <a-modal
          title="修改密码"
          v-model="changepass_visible"
          @ok="handleOk"
            okText="保存"
            cancelText="取消"
        >
         <ul>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end;width:85%;  ">
             旧密码：  <a-input placeholder="请输入旧密码：" style="width:250px ;margin-left:10px;"/>

           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
             新密码：  <a-input placeholder="请输入新密码：" style="width:250px ;margin-left:10px;"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             确认密码：  <a-input placeholder="请输入确认密码：" style="width:250px ;margin-left:10px;"/>
           </li>
         </ul>
        </a-modal>
        
        <div >
            <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" >
                <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
            </a-table>
        </div>
     

    </div>
</template>

<script>




const columns_modal=[{
   title: '角色名',
  dataIndex: 'name',
  scopedSlots: { customRender: 'name' },
}]

const columns = [{
  title: '用户代码',
  dataIndex: 'name',
  scopedSlots: { customRender: 'name' },
}, {
  title: '用户名称',
  dataIndex: 'age',
}, {
  title: '手机号码',
  dataIndex: 'phone',
}, {
  title: '电话号码',
  dataIndex: 'tel',
}, {
  title: '所在系统',
  dataIndex: 'system',
}, {
  title: '所属机构',
  dataIndex: 'jigou',
}, {
  title: '电子邮箱',
  dataIndex: 'email',
}, {
  title: '用户状态',
  dataIndex: 'state',
}, {
  title: '角色',
  dataIndex: 'role',
}, {
  title: '备注',
  dataIndex: 'other',
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
  address: '测试测试k',
}, {
  key: '4',
  name: 'Disabled User',
  age: 99,
  address: '测试测试k',
}];
export default {
 name: "usertable",
 props: ["item"],

  data() {

    return {
        data,
      columns,columns_modal,  
       ModalText: 'Content of the modal',
       visible: false,
       changepass_visible:false,
      confirmLoading: false,
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
  methods: {
    goTo(){
          this.$router.push({ path: "/platform" });
    },
     showModal() {
      this.visible = true
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
    },
    showConfirm() {
      this.$confirm({
        title: '提示',
        content: '确定要删除该数据？',
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {},
      });
    },
    changePass(){
        this.changepass_visible = true
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
