<script setup>
import { defineProps } from 'vue'
import OrderForm from '../OrderTest/OrderForm.vue'

const props = defineProps({
  path: String
})
</script>
<template>
  <div class="row justify-content-center form-ht scroll-hidden">
    <OrderForm :type="props.path === 'edit' ? 'editTest' : 'orderTest'" :path="props.path" />
  </div>
</template>
