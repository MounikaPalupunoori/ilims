<template>
  <div class="height-100">
    <BatchLevelSampleVerifyView batchType="LIB_PREP_DAY1" sampleAttribute="lib_prep_day1_sample_verification"
      :batchNo="props" navigate="/libbatchlist" />
  </div>
</template>
<script setup>

import BatchLevelSampleVerifyView from '../BatchsView/BatchLevelSampleVerifyView.vue';
const props = defineProps({
  batchNo: String
})
</script>