<template>
    <div>
        <div class="title">导入Excel</div>
        <div style="display:flex;display:-webkit-flex">
            <a-upload name="file" :multiple="true" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :headers="headers" @change="handleChange">
              <a-button>
                <a-icon type="upload" /> 选择文件
              </a-button>
            </a-upload>
            <a-select defaultValue="覆盖" style="width: 120px;margin-left:10px;" @change="handleChange">
              <a-select-option value="1">覆盖</a-select-option>
              <a-select-option value="2">不覆盖</a-select-option>
            </a-select>

            <a-button icon="save"  style="margin-left:10px;" type="primary">文件上传</a-button>
        </div>  


        <div class="title" style="margin-top:20px;">导入日志</div>
        
        <div style="margin-bottom:20px">

            <a-button icon="delete"  style="margin-right:10px;">删除</a-button>
            <a-button icon="delete"  style="margin-right:10px;">清空</a-button>

        </div>
         
        <div >
            <a-table  :columns="columns" :dataSource="data" >
                <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
            </a-table>
        </div>
    </div>
</template>

<script>
const columns = [{
  title: '日志类型',
  dataIndex: 'name',
  scopedSlots: { customRender: 'name' },
}, {
  title: '日志描述',
  dataIndex: 'cname',
}, {
  title: '操作用户',
  dataIndex: 'ename',
},{
  title: '日志日期',
  dataIndex: 'cateword',
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
    },
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
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
