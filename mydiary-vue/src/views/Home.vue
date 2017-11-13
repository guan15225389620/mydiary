<template>
    <div class="home">
    <header>
        <img :src="avatar" class ="img-circle" @click="toSetting">
        <div>
         <div class="username">{{username}}</div>
         <div class="nickname">{{nickname}}</div>
        </div>
         <i class="iconfont icon-tianjia" @click="showNewFolderModal"></i>
    </header>

    <div id="main">
        <div class="scroll-content">
            <div v-for="item in items" class="item">
            </div>
        </div>
    </div>

    <div id="search-result" class="container">
    </div>

    <footer>
        <div class="inputdiv">
            <i class="iconfont icon-sear ch search"></i>
            <input type="text" name="search" id="search">
        </div>
        <i class="iconfont icon-setting cog" @click="toSetting"></i> 
    </footer>
    </div>
</template>
<script> 
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
// import NewFolderModal from ''
// import NewFolderModal from '~/home/NewFolderModal'
// import DeleteModal from '~/DeleteModal'
import Scrollbar from 'smooth-scrollbar'
import vmodal from 'vue-js-modal'
Vue.use(vmodal)

    export default{
        components: {
        //  NewFolderModal,
        //  DeleteModal
        },
        data () {
            return {
                username:'',
                nickname:'',
                avatar: '',
                items: [],
                selectedItem: ''
            }
        },
        mounted () {
            Scrollbar.init(document.querySelector('#main'))
        },
        activated () {
            // this.getFloder()
            this.getInfo()
        },
        computed: mapState(['currentFolder', 'currentFolderName']),    
        methods: {
            toSetting() {
                this.$router.push('./setting')
            },
             showNewFolderModal () {
                this.$modal.show('new-folder')
             },
             getInfo () {
               this.$axios
               .get('/users/getinfo')
               .then(res => {
                 if(res.data.code === 0) {
                    this.username = res.data.data.username
                    this.nickname = res.data.data.nickname || '点击设置昵称'
                    this.avatar = res.data.data.avatar || '/static/avatar.jpg'
                 }
               })
              .catch(function(err){
                console.log(err)
              })
             }
        }

    }
</script>
<style lang="less" scoped>
  @import '../assets/less/common.less';
  @black: #3c3c3c;
.box() {
  float: left;
  box-sizing: border-box;
  padding: 40/75rem;
}

header {
  box-sizing: border-box;
  margin-top: @padding-for-bar;
  height: @home-header-height;
  background-color: @main-color;
  color: #fff;
  img {
    .box();
    height: @home-header-height;
    width: @home-header-height;
    border-radius: 50%;
  }
  .name {
    .box();
    width: ~'calc(100vw - 110px)';
    overflow-x: auto;
    .username {
      font-size: 1.3rem;
    }
  }
  i {
    float: right;
    line-height: @home-header-height;
    font-size: 1.5rem;
    padding-right: 40/75rem;
  }
}

#main {
  height: @home-container-height;
  overflow: auto;
  width: 100%;
  .item {
    &:active{
      background-color: #fbfbfb;
    }
    padding: 10px;
    line-height: 2.5rem;
    color: rgb(92, 115, 136);
    height: 2.5rem;
    overflow: hidden;
    &:after {
      content: ' ';
      display: block;
      position: relative;
      top: 8px;
      height: 1px;
      width: 120%;
      background-color: #ccc;
    }
    .iconfont {
      font-size: 1.5rem;
    }
    .total {
      float: right;
    }
  }
}

footer {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 0.4rem;
  width: 100vw;
  height: @common-footer-height;
  background-color: #fff;
  border-top: 1px #cacaca solid;
  .inputdiv {
    position: relative;
    width: 100%;
    input {
      padding-top: 0.4rem;
      width: 95%;
      box-sizing: border-box;
      border: none;
      border-radius: 10px;
      background-color: @main-color;
      padding-left: 30px;
      font-size: 20px;
      line-height: 28px;
    }
    .search {
      position: absolute;
      top: 50%;
      margin-top: -12px;
      left: 5px;
      line-height: 24px;
    }
  }
  .search,
  input {
    color: #fff;
  }
  .cog {
    color: @main-color;
    font-size: 24px;
  }
}
</style>