<template>
    <a-layout id="components-layout-demo-top-side-2">
       <headshow :items="['6']"></headshow>
    <a-layout>
      <a-layout-sider width="250" style="background: #fff">
        <a-menu
          mode="inline"
          :defaultOpenKeys="['sub1','sub2','sub3','sub4','sub5','sub6']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
              <span slot="title"><a-icon type="user" />权限管理</span>
              <a-menu-item key="1" @click="gomenu">菜单管理</a-menu-item>
              </a-sub-menu>
          <a-sub-menu key="sub2">
              <span slot="title"><a-icon type="laptop" />用户管理</span>
              <a-menu-item key="2"  @click="gouserm">用户维护</a-menu-item>
              <a-menu-item key="3"  @click="gorolem">角色维护</a-menu-item>
              <a-menu-item key="4"  @click="goinsm">机构管理</a-menu-item>
            
          </a-sub-menu>
          <a-sub-menu key="sub3">
              <span slot="title"><a-icon type="notification" />日志管理</span>
              <a-menu-item key="5"  @click="gonote">系统日志</a-menu-item>
          </a-sub-menu>
           <a-menu-item key="sub4" @click="goclassify"><a-icon type="notification"/>生成类管理</a-menu-item>
           <a-menu-item key="sub5" @click="goesb"><a-icon type="notification"/>ESB管理</a-menu-item>
       
           <a-menu-item key="sub6" @click="goword"><a-icon type="laptop"/>字段处理办法</a-menu-item>
        </a-menu>
      </a-layout-sider>
          <!-- 原先普通展示content -->
          <a-tabs :style="{ padding: '24px', margin: 0, minHeight: '280px',width:'100%'}"
            v-model="activeKey"
            type="editable-card"
            @edit="onEdit"
             @change=" onChange"
            hideAdd
          >
          <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable">
            <!-- {{content}} -->
            <conditioSearch v-if="pane.key=='/platform'"></conditioSearch>
          <keep-alive v-else>
            
            <router-view ></router-view>
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
      { title: '服务检测', content: '首页内容', key: '/platform' }
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
  mounted(){
        localStorage.removeItem('userm');
        localStorage.removeItem('rolem');
        localStorage.removeItem('insm');
        localStorage.removeItem('pword');
        localStorage.removeItem('pesb');
        localStorage.removeItem('pnote');
         localStorage.removeItem('pclassify ');
  },
  methods: {
    //  add () {
    //   const panes = this.panes 
    //   const activeKey = `newTab${this.newTabIndex++}`
    //   panes.push({ title: `New Tab ${activeKey}`, content: `Content of new Tab ${activeKey}`, key: activeKey })
    //   this.panes = panes
    //   this.activeKey = activeKey
    // },
    goTopublic(){
        this.$router.push({ path: "/" });
    },
    gouserm(){
      if(localStorage.userm == null || localStorage.userm == 0){
        const panes = this.panes;
        const activeKey = `/platform/usermaintenance`;
        // const pagePath =  `/platform/usermaintenance`;
        panes.push({ title: `用户维护`, content: `Content of new Tab ${activeKey}`, key: activeKey});
        this.panes = panes;
        this.activeKey = activeKey;
        // this.pagePath = pagePath;
        this.$router.push(activeKey);
        localStorage.userm = activeKey;
      }else{
           this.activeKey =  localStorage.userm ;
          this.$router.push( localStorage.userm);
      }
     
    },
    gorolem(){
      if(localStorage.rolem == null || localStorage.rolem == 0){
        const panes = this.panes
        const activeKey = `/platform/rolemaintenance`
        // const pagePath =  `/platform/rolemaintenance`;

        panes.push({ title: `角色维护`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        //  console.log(activeKey,222222222222222,pagePath)

        this.$router.push(activeKey)
        localStorage.rolem = activeKey;
      }else{
          this.activeKey =  localStorage.rolem ;
          this.$router.push( localStorage.rolem);
      }
      
    },
    goinsm(){
      if(localStorage.insm == null || localStorage.insm == 0){
        const panes = this.panes
        const activeKey = `/platform/institutions`
        panes.push({ title: `机构管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey

        this.$router.push( "/platform/institutions")
        localStorage.insm = activeKey;

      }
      else{
          this.activeKey =  localStorage.insm ;
          this.$router.push( localStorage.insm);
      }
    },

    gonote(){
    if(localStorage.pnote == null || localStorage.pnote == 0){
        const panes = this.panes
        const activeKey = `/platform/note`
        panes.push({ title: `系统日志`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey

        this.$router.push( "/platform/note")
        localStorage.pnote = activeKey;

      }
      else{
          this.activeKey =  localStorage.pnote ;
          this.$router.push( localStorage.pnote);
      }
      
    },
    gomenu(){
      if(localStorage.pmenu == null||localStorage.pmenu==0){
        const panes = this.panes
        const activeKey = `/platform/menu`
        panes.push({ title: `菜单管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push( "/platform/menu")
        localStorage.pmenu = activeKey;
      }
       else{
          this.activeKey =  localStorage.pmenu ;
          this.$router.push( localStorage.pmenu);
      }
    },
    goclassify(){
       if(localStorage.pclassify == null || localStorage.pclassify == 0){
        const panes = this.panes
        const activeKey = `/platform/classify`
        panes.push({ title: `生成类管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey

        this.$router.push( "/platform/classify")
        localStorage.pclassify = activeKey;

      }
      else{
          this.activeKey =  localStorage.pclassify ;
          this.$router.push( localStorage.pclassify);
      }

    },
    goesb(){
      if(localStorage.pesb == null || localStorage.pesb == 0){
        const panes = this.panes
        const activeKey = `/platform/esb`
        panes.push({ title: `esb服务管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey

        this.$router.push( "/platform/esb")
        localStorage.pesb = activeKey;

      }
      else{
          this.activeKey =  localStorage.pesb ;
          this.$router.push( localStorage.pesb);
      }
    },
    goword(){
     if(localStorage.pword == null || localStorage.pword == 0){
        const panes = this.panes
        const activeKey = `/platform/word`
        panes.push({ title: `字段处理方法`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey;
        this.$router.push( "/platform/word")
        localStorage.pword = activeKey;

      }
      else{
          this.activeKey =  localStorage.pword ;
          this.$router.push( localStorage.pword);
      }
    },
    
     onEdit (targetKey, action) {
      this[action](targetKey)
    },

    onChange(activeKey){
      // console.log(activeKey,33333333333333,pagePath)
      this.$router.push(activeKey)
    },
   
    remove (targetKey) {
      let activeKey = this.activeKey
      let lastIndex
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      const panes = this.panes.filter(pane => pane.key !== targetKey)
      if (lastIndex >= 0 && activeKey === targetKey) {
        activeKey = panes[lastIndex].key
      }
      this.panes = panes
      this.activeKey = activeKey
    },
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
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
