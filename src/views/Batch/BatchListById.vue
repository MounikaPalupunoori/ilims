<template>
  <div class="height-100">
    <BatchLevelSampleVerifyView batchType="DNA_ISOLATION" sampleAttribute="dna_isolation_sample_verification"
      :batchNo="props" navigate="/batchlist" />
  </div>
</template>

<script setup>
import BatchLevelSampleVerifyView from '../BatchsView/BatchLevelSampleVerifyView.vue';

const props = defineProps({
  batchNo: String
})
</script>

