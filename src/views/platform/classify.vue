<template>
    <div>
        <div class="title" style="margin-top:20px;">所有生成类</div>
        
        <div style="margin-bottom:20px">
            <a-button icon="edit"  style="margin-right:10px;" @click="open_add">新增</a-button>
            <a-button icon="edit"  style="margin-right:10px;">修改</a-button>
            <a-button icon="delete"  style="margin-right:10px;">删除</a-button>
        </div>
        <div >
            <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" >
                <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
            </a-table>
        </div>
         <a-modal
            :title="title"
             v-model="add_visible"
            @ok="add_Generator"
            okText="保存"
              keyboard:false
            cancelText="取消"
            width='450px'
            >
            <div>
              <div class="graybox">
                  <ul >
                    <li  class="flex"  style="margin-bottom:10px;justify-content:flex-end;width:85%;">拆租包模式<a-input placeholder="请输入拆租包模式" style="width:250px ;margin-left:10px;"  v-model="type"/></li>
                    <li  class="flex"  style="margin-bottom:10px;justify-content:flex-end;width:85%;">描述<a-input placeholder="请输入描述" style="width:250px ;margin-left:10px;"  v-model="desc"/></li>
                    <li  class="flex"  style="margin-bottom:10px;justify-content:flex-end;width:85%;">生成器类型<a-input placeholder="请输入角色描述" style="width:250px ;margin-left:10px;"  v-model="classf"/></li>
                    <li  class="flex"  style="margin-bottom:10px;justify-content:flex-end;width:85%;">
                      类路径
                      <a-input placeholder="请输入角色描述" style="width:250px ;margin-left:10px;"  v-model="path"/>
                    </li>
                  </ul>
              </div>
            </div>
        </a-modal>
    </div>
</template>

<script>

import { addGenerator , getGeneratorList} from "../../api/interface"

const columns = [{
  title: '拆租包模式',
  dataIndex: 'name',
  scopedSlots: { customRender: 'name' },
}, {
  title: '描述',
  dataIndex: 'desc',
}, {
  title: '生成器类型',
  dataIndex: 'generatorType',
},{
  title: '类路径',
  dataIndex: 'implementsClazz',
}];

export default {

  data() {
    return {
      data:[],
      columns,
      // name:'',
      // desc:'',
      // generatorType:'',
      // implementsClazz:'',
      title:'新增生成类',
      add_visible:false,
      type:'',
      desc:'',
      classf:'',
      path:''

    }
  },
  mounted(){
    this.get_Generator ();
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
    open_add(){
        this.add_visible = true;
        this.title = '新增生成类';
    },
    get_Generator(){
      var self = this;
      getGeneratorList(undefined).then(res=>{
        if(res.returnCode==200){
          self.data = res.data;
        }
      });
    },
    add_Generator(){
      var self = this;
      addGenerator({
        name:self.name,
        desc:self.desc,
        generatorType:self.classf,
        implementsClazz:self.path,
      }).then(res=>{
        if(res.returnCode==200){//添加成功
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
