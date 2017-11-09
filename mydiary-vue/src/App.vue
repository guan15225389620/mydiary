<template>
  <div id="app">
  <transition>
    <keep-alive>
       <router-view class=""child-view>  </router-view>
    </keep-alive>  
  </transition> 
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
  .item {
    &:active {
      background-color:#fbfbfb;
    }
  }
  .child-view {
    position: absolute;
    width:100%;
    height:100%;
    transition: all 0.8s cubic-bezier(0.55,0,0.1,1)
  }
.slide-left-enter,.slide-right-leave-active {
   opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}
</style>
