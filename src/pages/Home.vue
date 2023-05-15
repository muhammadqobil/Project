<template>
  <div>Home</div>
</template>

<script>
import {urls} from "src/utils/constants";

export default {
  name: "Home",
  methods:{
    getTest(){
      this.$axios.get(urls.TEST).then(res=>{
        console.log(res)
      })
    }
  },
  mounted() {
    this.getTest()
  }
}
</script>

<style scoped>

</style>
