<template>
    <a-layout id="components-layout-demo-top-side-2" > 
    <headshow :items="['1']"></headshow>
    <a-layout > 
      <a-layout-sider width="250" style="background: #fff">
        <a-menu
          theme="light"
          mode="inline"
          :defaultOpenKeys="['sub1','sub2','sub3','sub4','sub5']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
              <span slot="title"><a-icon type="user" />数据字典管理</span>
              <a-menu-item key="1" @click="goenglish">英文单词及缩写管理</a-menu-item>
              <a-menu-item key="2" @click="gocategory">类别词管理</a-menu-item>
              <a-menu-item key="3" @click="gometadata">元数据管理</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="15" @click="gopublic"><a-icon type="laptop"/>公共代码管理</a-menu-item>
          <a-sub-menu key="sub3">
              <span slot="title"><a-icon type="notification" />资源导入</span>
              <a-menu-item key="4" @click="godd">数据字典导入</a-menu-item>
              <a-menu-item key="5" @click="gomap">字段映射导入</a-menu-item>
              <a-menu-item key="6" @click="goorgin">原始接口导入</a-menu-item>
              <a-menu-item key="7" @click="gomeheader">报文头导入</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub4">
              <span slot="title"><a-icon type="fork" />流程申请</span>
              <a-menu-item key="8" @click="registered">注册申请</a-menu-item>
              <a-menu-item key="9" @click="use">调用申请</a-menu-item>
              <a-menu-item key="10" @click="change">变更申请</a-menu-item>
              <a-menu-item key="11" @click="retired">退役申请</a-menu-item>
              <a-menu-item key="12" @click="systemConnect">系统接入申请</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="16" @click="servicemess"><a-icon type="laptop"/>服务报文头管理</a-menu-item>
        </a-menu>
      </a-layout-sider>
        <a-tabs :style="{ padding: '24px', margin: 0, minHeight: '280px',width:'100%'}"
            v-model="activeKey"
            type="editable-card"
            @edit="onEdit"
             @change=" onChange"
            hideAdd
          >
          <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable" style="overflow-y:scroll; maxHeight:'100px" >
            <!-- {{content}} -->
          <conditioSearch v-if="pane.key=='/'"></conditioSearch>
          <keep-alive v-else>
            <router-view></router-view>
          </keep-alive>
          </a-tab-pane>
      </a-tabs>
      
      </a-layout>
    </a-layout>
</template>

<script>
import headshow from '../../components/menu.vue'
import conditioSearch from '../../components/conditioSearch.vue'
export default {

  data() {
   const panes = [
      { title: '首页服务检测', content: '首页内容', key: '/' }
    ]
    
    return {
      activeKey: panes[0].key,
      panes,
      newTabIndex: 0,
    }
  },
  
  components:{
      headshow,
      conditioSearch
  },
  computed: {
  
  },
  methods: {
     onChange(activeKey){
      // console.log(activeKey,33333333333333,pagePath)
      this.$router.push(activeKey)
    },
   
    goenglish(){
       if(localStorage.eng == null || localStorage.eng == 0){
        const panes = this.panes
        const activeKey = `/public/english`
        // const pagePath =  `/platform/rolemaintenance`;
        panes.push({ title: `英文单词及缩写管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
        localStorage.eng = activeKey;
      }else{
          this.activeKey =  localStorage.eng ;
          this.$router.push( localStorage.eng);
      }
    },
    gocategory(){
      if(localStorage.cate == null || localStorage.cate == 0){
        const panes = this.panes
        const activeKey = `/public/category`
        // const pagePath =  `/platform/rolemaintenance`;
        panes.push({ title: `类别词管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
        localStorage.cate = activeKey;

      }else{
          this.activeKey =  localStorage.cate ;
          this.$router.push( localStorage.cate);
      }
    },
    gometadata(){
      if(localStorage.meta == null || localStorage.meta == 0){
        const panes = this.panes
        const activeKey = `/public/metadata`
        // const pagePath =  `/platform/rolemaintenance`;
        panes.push({ title: `元数据管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
        localStorage.meta = activeKey;

      }else{
          this.activeKey =  localStorage.meta ;
          this.$router.push( localStorage.meta);
      }
    },
    gopublic(){
      if(localStorage.pubm == null || localStorage.pubm == 0){
        const panes = this.panes
        const activeKey = `/public/publicm`
        // const pagePath =  `/platform/rolemaintenance`;
        panes.push({ title: `公共代码管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
        localStorage.pubm = activeKey;

      }else{
          this.activeKey =  localStorage.pubm ;
          this.$router.push( localStorage.meta);
      }
    },
    godd(){
      if(localStorage.godd == null || localStorage.godd == 0){
        const panes = this.panes
        const activeKey = `/public/datadictionary`
        // const pagePath =  `/platform/rolemaintenance`;
        panes.push({ title: `数据字典导入`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
        localStorage.godd = activeKey;

      }else{
          this.activeKey =  localStorage.godd ;
          this.$router.push( localStorage.godd);
      }
    },
    gomap(){
      if(localStorage.map == null || localStorage.map == 0){
        const panes = this.panes
        const activeKey = `/public/fieldmapping`
        // const pagePath =  `/platform/rolemaintenance`;
        panes.push({ title: `字段映射导入`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
        localStorage.map = activeKey;

      }else{
          this.activeKey =  localStorage.map ;
          this.$router.push( localStorage.map);
      }
    },
    goorgin(){
      if(localStorage.orgin == null || localStorage.orgin == 0){
        const panes = this.panes
        const activeKey = `/public/orgininterface`
        // const pagePath =  `/platform/rolemaintenance`;
        panes.push({ title: `原始接口导入`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
        localStorage.orgin = activeKey;

      }else{
          this.activeKey =  localStorage.orgin ;
          this.$router.push( localStorage.orgin);
      }
    },
    gomeheader(){
      if(localStorage.header == null || localStorage.header == 0){
        const panes = this.panes
        const activeKey = `/public/messageheader`
        // const pagePath =  `/platform/rolemaintenance`;
        panes.push({ title: `报文头导入`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
        localStorage.header = activeKey;

      }else{
          this.activeKey =  localStorage.header ;
          this.$router.push( localStorage.header);
      }
    },
    registered(){
       if(localStorage.regis == null || localStorage.regis == 0){
          const panes = this.panes
          const activeKey = `/public/registered`
          // const pagePath =  `/platform/rolemaintenance`;
          panes.push({ title: `注册申请`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
          this.$router.push(activeKey)
          localStorage.regis = activeKey;
      }else{
          this.activeKey =  localStorage.regis ;
          this.$router.push( localStorage.regis);
      }
    },
    systemConnect(){
       if(localStorage.sconnect == null || localStorage.sconnect == 0){
          const panes = this.panes
          const activeKey = `/public/systemconnect`
          // const pagePath =  `/platform/rolemaintenance`;
          panes.push({ title: `系统接入申请`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
          this.$router.push(activeKey)
          localStorage.sconnect = activeKey;
      }else{
          this.activeKey =  localStorage.sconnect ;
          this.$router.push( localStorage.sconnect);
      }
    },
    retired(){
       if(localStorage.retired == null || localStorage.retired == 0){
          const panes = this.panes
          const activeKey = `/public/retired`
          // const pagePath =  `/platform/rolemaintenance`;
          panes.push({ title: `退役申请`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
          this.$router.push(activeKey)
          localStorage.retired = activeKey;
      }else{
          this.activeKey =  localStorage.retired;
          this.$router.push( localStorage.retired);
      }
    },
    change(){
      if(localStorage.change == null || localStorage.change == 0){
          const panes = this.panes
          const activeKey = `/public/change`
          // const pagePath =  `/platform/rolemaintenance`;
          panes.push({ title: `变更申请`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
          this.$router.push(activeKey)
          localStorage.change = activeKey;
      }else{
          this.activeKey =  localStorage.change;
          this.$router.push( localStorage.change);
      }
    },
    use(){
      if(localStorage.using == null || localStorage.using == 0){
          const panes = this.panes
          const activeKey = `/public/use`
          // const pagePath =  `/platform/rolemaintenance`;
          panes.push({ title: `调用申请`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
          this.$router.push(activeKey)
          localStorage.using = activeKey;
      }else{
          this.activeKey =  localStorage.using;
          this.$router.push( localStorage.using);
      }
    },
    servicemess(){
      if(localStorage.servicemess == null || localStorage.servicemess == 0){
          const panes = this.panes
          const activeKey = `/public/servicemess`
          // const pagePath =  `/platform/rolemaintenance`;
          panes.push({ title: `服务报文头管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
          this.$router.push(activeKey)
          localStorage.servicemess = activeKey;
      }else{
          this.activeKey =  localStorage.servicemess;
          this.$router.push( localStorage.servicemess);
      }
    },
    onEdit (targetKey, action) {
      this[action](targetKey)
    },
  },
  mounted(){
      localStorage.removeItem('pubm');
      localStorage.removeItem('godd');
      localStorage.removeItem('orgin');
      localStorage.removeItem('map');
      localStorage.removeItem('servicemess');
      localStorage.removeItem('header');
      localStorage.removeItem('regis');
      localStorage.removeItem('using');
      localStorage.removeItem('change');
      localStorage.removeItem('retired');
      localStorage.removeItem('cate');
      localStorage.removeItem('meta');
      localStorage.removeItem('sconnect');
      localStorage.removeItem('eng');      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ant-tabs-tabpane{
  height: 800px;
  overflow-y: scroll;
}
#components-layout-demo-top-side-2 .logo {
  width: 172px;
  font-size: 24px;
  height: 31px;
  line-height: 31px;
  /* background: rgba(255,255,255,.2); */
  margin: 16px 28px 16px 0;
  color: #fff;
  font-weight: bold;
  float: left;

}
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
