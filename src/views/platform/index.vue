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
              <a-menu-item key="1">菜单管理</a-menu-item>
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
          <a-sub-menu key="sub4">
              <span slot="title"><a-icon type="notification"   @click="goclassify"/>生成类管理</span>
          </a-sub-menu>
          <a-sub-menu key="sub5">
              <span slot="title"><a-icon type="notification"   @click="goesb"/>ESB管理</span>
          </a-sub-menu>
          <a-sub-menu key="sub6">
              <span slot="title"><a-icon type="notification"   @click="goword"/>字段处理办法</span>
          </a-sub-menu>
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
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
          </a-tab-pane>
      </a-tabs>
      
      

<!--       
            <a-layout :style="{ padding: '24px'}">
        <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">  
      

          <router-view></router-view>
        </a-layout-content>
      </a-layout> -->
    </a-layout>
  </a-layout>


</template>

<script>
import headshow from '../../components/menu.vue'
export default {

  data() {
    const panes = [
      { title: '首页服务检测', content: '首页内容', key: '1' }
    ]
    return {
      activeKey: panes[0].key,
      panes,
      newTabIndex: 0,
    }
  },
  components:{
    headshow
  },
  computed: {
  
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
        const activeKey = `newTab${this.newTabIndex++}`
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
      const panes = this.panes
      const activeKey = `newTab${this.newTabIndex++}`
      panes.push({ title: `系统日志`, content: `Content of new Tab ${activeKey}`, key: activeKey })
      this.panes = panes
      this.activeKey = activeKey
      
      this.$router.push( "/platform/note")
        localStorage.note = activeKey;
      
    },
    goclassify(){
      const panes = this.panes
      const activeKey = `newTab${this.newTabIndex++}`
      panes.push({ title: `生成类管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
      this.panes = panes
      this.activeKey = activeKey
      
      this.$router.push( "/platform/classify")
    },
    goesb(){
      const panes = this.panes
      const activeKey = `newTab${this.newTabIndex++}`
      panes.push({ title: `esb服务管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
      this.panes = panes
      this.activeKey = activeKey
      
      this.$router.push( "/platform/esb")
    },
    goword(){
      const panes = this.panes
      const activeKey = `newTab${this.newTabIndex++}`
      panes.push({ title: `字段处理方法`, content: `Content of new Tab ${activeKey}`, key: activeKey })
      this.panes = panes
      this.activeKey = activeKey
      
      this.$router.push( "/platform/word")
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
