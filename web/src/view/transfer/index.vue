<template>
<div>
  <keep-alive>
    <router-view @wx-load2="wxconfig"></router-view>
  </keep-alive>
</div>
</template>

<script>
export default {
  methods:{
    wxconfig(){
      this.$emit('wx-load')
    }
  },
  mounted(){
		
	  }
}
</script>