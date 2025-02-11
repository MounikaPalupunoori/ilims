<script setup>
import OrderForm from '../OrderTest/OrderForm.vue'
import { defineProps } from 'vue'
const props = defineProps({
  path: String
})
</script>
<template>
  <div class="row justify-content-center form-ht scroll-hidden">
    <OrderForm type="accession" :path="props.path" />
  </div>
</template>
