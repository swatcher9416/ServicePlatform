<template>
    <div>
        <div class="title">查询条件</div>
        <ul class="flex">
            <li class="flex">
                项目名称 
                <a-input placeholder="请输入" style="width:350px ;margin-left:10px;"/>
            </li>
            <li class="flex">
                <a-button icon="search"  style="margin-right:10px;">查询</a-button>
                <a-button icon="delete"  style="margin-right:10px;">重置</a-button>
            </li>
        </ul>  


        <div class="title" style="margin-top:20px;">项目管理列表</div>
        
        <div style="margin-bottom:20px;display:flex;justify-content:space-between;">
            <div class="flex">
                <a-button icon="plus"  style="margin-right:10px;">新增项目</a-button>
                <a-button icon="edit"  style="margin-right:10px;">维护项目</a-button>
                <a-button icon="delete"  style="margin-right:10px;">查看系统</a-button>
                <a-button icon="edit"  style="margin-right:10px;">批量维护</a-button>
                <a-button icon="delete"  style="margin-right:10px;">查看日志</a-button>
            </div>
             <a-input-search
              placeholder="搜索"
              style="width: 200px"
              @search="onSearch"
            />
            
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
  title: '项目名称',
  dataIndex: 'name',
  scopedSlots: { customRender: 'name' },
}, {
  title: '内部序号',
  dataIndex: 'age',
}, {
  title: '项目发起人',
  dataIndex: 'address',
},{
  title: '项目联系人',
  dataIndex: 'address2',
},{
  title: '项目状态',
  dataIndex: 'address3',
},{
  title: '项目属性',
  dataIndex: 'address4',
},{
  title: '计划上线时间',
  dataIndex: 'address5',
},{
  title: '操作',
  dataIndex: 'address5',
}
];
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
