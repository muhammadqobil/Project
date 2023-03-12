<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <login/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import Login from "components/Login";
export default {
    name: "LoginPage",
    components: {Login},
}

</script>

<style scoped>

</style>
