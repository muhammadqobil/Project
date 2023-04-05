<template>
  <q-layout>
    <error-dialog/>
    <q-page-container>
<!--      <q-linear-progress indeterminate stripe rounded style="height: 5px" v-if="$store.state.ajaxRequestsCnt>0"/>-->
<!--      &lt;!&ndash; This is where pages get injected &ndash;&gt;-->
<!--      <transition-->
<!--        appear-->
<!--        enter-active-class="animated bounceInLeft"-->
<!--        leave-active-class="animated bounceOutRight"-->
<!--        :duration="300"-->
<!--      >-->
<!--        <router-view/>-->
<!--      </transition>-->
      <q-page class="flex flex-center">
        <login/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import Login from "components/Login";
import ErrorDialog from "components/base/ErrorDialog";
export default {
    name: "LoginPage",
    components: {ErrorDialog, Login},
}

</script>

<style scoped>

</style>
