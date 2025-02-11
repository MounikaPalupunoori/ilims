<template>
    <div class="height-100">
      <BatchLevelSampleVerify batchType="LIB_PREP_DAY2" sampleAttribute="lib_prep_day2_sample_verification"
        :batchNo="props" navigate="/libbatchlist" />
    </div>
  </template>
  <script setup>
  
  import BatchLevelSampleVerify from '../BatchsView/BatchLevelSampleVerifyView.vue';
  const props = defineProps({
    batchNo: String
  })
  </script>