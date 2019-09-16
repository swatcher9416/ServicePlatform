<template>
    <a-layout id="components-layout-demo-top-side-2" > 
      <headshow :items="['2']"></headshow>
    <a-layout > 
      <a-layout-sider width="250" style="background: #fff;padding:10px;">
        <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="ontChange" />
        <a-tree
          @expand="onExpand"
          :expandedKeys="expandedKeys"
          :autoExpandParent="autoExpandParent"
          :treeData="gData"
        >
          <template slot="title" slot-scope="{title}">
            <span v-if="title.indexOf(searchValue) > -1"  @click="gosystem(title)">
              {{title.substr(0, title.indexOf(searchValue))}}
              <span style="color: #f50">{{searchValue}}</span>
              {{title.substr(title.indexOf(searchValue) + searchValue.length)}}
            </span>
            <span v-else>{{title}}</span>
          </template>
        </a-tree>
      </a-layout-sider>
  
        <a-tabs :style="{ padding: '24px', margin: 0, minHeight: '280px',width:'100%'}"
            v-model="activeKey"
            type="editable-card"
            @edit="onEdit"
             @change=" onChange"
            hideAdd
          >
          <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable" style="overflow-y:scroll; maxHeight:'100px" >
          
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
          </a-tab-pane>
      </a-tabs>
      
      </a-layout>
    </a-layout>
</template>

<script>
import headshow from '../../components/menu.vue'
const x = 3
const y = 2
const z = 1
const gData = []

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0'
  const tns = _tns || gData

  const children = []
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`
    tns.push({ title: key, key, scopedSlots: { title: 'title' }})
    if (i < y) {
      children.push(key)
    }
  }
  if (_level < 0) {
    return tns
  }
  const level = _level - 1
  children.forEach((key, index) => {
    tns[index].children = []
    return generateData(level, key, tns[index].children)
  })
}
generateData(z)

const dataList = []
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i]
    const key = node.key
    dataList.push({ key, title: key })
    if (node.children) {
      generateList(node.children, node.key)
    }
  }
}
generateList(gData)

const getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}
// import { getOrgTree, getServiceList } from '@/api/manage'
export default {

  data() {
   const panes = [
      { title: '接口检索', content: '首页内容', key: '1' }
    ]
    return {
      openKeys: ['key-01'],
      activeKey: panes[0].key,
      panes,
      newTabIndex: 0,
       expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      gData,
    
    }
  },
  components:{
    headshow
  },
  methods: {
    gosystem(title){
      console.log(title)
      if(title=="0-1"){
         if(localStorage.sys == null || localStorage.sys == 0){
            const panes = this.panes
            const activeKey = `/system/system`
            // const pagePath =  `/platform/rolemaintenance`;
            panes.push({ title: `系统管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
            this.panes = panes
            this.activeKey = activeKey
            this.$router.push(activeKey)
            localStorage.sys = activeKey;
          }else{
              this.activeKey =  localStorage.sys ;
              this.$router.push( localStorage.sys);
          }
      }else if(title=="0-1-0"){
          if(localStorage.interface == null || localStorage.interface == 0){
            const panes = this.panes
            const activeKey = `/system/interface`
            // const pagePath =  `/platform/rolemaintenance`;
            panes.push({ title: `接口`, content: `Content of new Tab ${activeKey}`, key: activeKey })
            this.panes = panes
            this.activeKey = activeKey
            this.$router.push(activeKey)
            localStorage.interface = activeKey;
          }else{
              this.activeKey =  localStorage.interface ;
              this.$router.push( localStorage.interface);
          }
      }else if(title=="0-1-1"){
          if(localStorage.newspaper == null || localStorage.newspaper == 0){
            const panes = this.panes
            const activeKey = `/system/newspaper`
            // const pagePath =  `/platform/rolemaintenance`;
            panes.push({ title: `报文头`, content: `Content of new Tab ${activeKey}`, key: activeKey })
            this.panes = panes
            this.activeKey = activeKey
            this.$router.push(activeKey)
            localStorage.newspaper = activeKey;
          }else{
              this.activeKey =  localStorage.newspaper ;
              this.$router.push( localStorage.newspaper);
          }
      }

    },
 
     onExpand  (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    ontChange (e) {
      const value = e.target.value
      const expandedKeys = dataList.map((item) => {
        if (item.key.indexOf(value) > -1) {
          return getParentKey(item.key, gData)
        }
        return null
      }).filter((item, i, self) => item && self.indexOf(item) === i)
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true,
      })
    },
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
    onEdit (targetKey, action) {
      this[action](targetKey)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
