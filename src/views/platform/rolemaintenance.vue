<template>
    <div>
        <div class="title">条件搜索</div>
        <ul class="flex">
            <li class="flex">
                角色代码 
                <a-input placeholder="请输入角色代码" style="width:150px ;margin-left:10px;"/>
            </li>
            <li class="flex">
                角色名称
                <a-input placeholder="请输入角色名称"  style="width:150px;margin-left:10px;"/>
            </li >
            <li class="flex">
                角色描述
                <a-input placeholder="请输入角色描述"  style="width:150px;margin-left:10px;"/>
            </li>
            <a-button icon="search"  style="margin-right:10px; margin-left:20px;" type="primary">搜索角色</a-button>
            <a-button icon="close">清空</a-button>
        </ul>  


        <div class="title" style="margin-top:20px;">所有角色</div>
        
        <div style="margin-bottom:20px">
            <a-button icon="edit"  style="margin-right:10px;">新增</a-button>
            <a-button icon="edit"  style="margin-right:10px;">修改</a-button>
            <a-button icon="delete"  style="margin-right:10px;">删除</a-button>
            <a-button icon="laptop"  style="margin-right:10px;">权限分配</a-button>
        </div>
        <div >
            <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" >
                <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
            </a-table>
        </div>

    </div>
</template>

<script>
const columns = [{
  title: '角色代码',
  dataIndex: 'name',
  scopedSlots: { customRender: 'name' },
}, {
  title: '角色名称',
  dataIndex: 'age',
}, {
  title: '角色号码',
  dataIndex: 'address',
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
}];
export default {

  data() {

    return {
        data,
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
  methods: {
    goTo(){
          this.$router.push({ path: "/platform" });
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
