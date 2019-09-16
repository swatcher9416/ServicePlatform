<template>
    <div>
    

        <div class="title" style="margin-top:20px;">已办任务列表</div>
        
        <div style="margin-bottom:20px">
            <a-button icon="delete"  style="margin-right:10px;">删除</a-button>
            <a-button icon="delete"  style="margin-right:10px;">查看流程</a-button>
            <a-button icon="search"  style="margin-right:10px;">新查看流程</a-button>
            <a-button icon="search"  style="margin-right:10px;">查看详情</a-button>
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
  title: '任务ID',
  dataIndex: 'name',
  scopedSlots: { customRender: 'name' },
}, {
  title: '任务名称',
  dataIndex: 'age',
}, {
  title: '交易码',
  dataIndex: 'address',
},{
  title: '交易名称',
  dataIndex: 'address2',
},{
  title: '接口ID',
  dataIndex: 'address3',
},{
  title: '所属系统',
  dataIndex: 'address4',
},{
  title: '服务场景码',
  dataIndex: 'address5',
}
,{
  title: '处理人',
  dataIndex: 'address5',
}
,{
  title: '优先级',
  dataIndex: 'address5',
},{
  title: '创建时间',
  dataIndex: 'address5',
}
,{
  title: '描述',
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
