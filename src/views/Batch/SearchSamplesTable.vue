<template>
  <td>{{ props.item.accessionNumber ? props.item.accessionNumber : props.item.accession_number ?
    props.item.accession_number : '-' }}</td>
  <td v-if="getSampleStatus != 'Accessioned'">{{ props.item.batch_number ? props.item.batch_number : '-' }}</td>
  <td v-if="(getSampleStatus === 'LIB_PREP_DAY1_PASSED' || getSampleStatus === 'LIB_PREP_DAY2_PASSED')">{{ props.item.library_id ? props.item.library_id : '-' }}</td>
  <td v-if="getSampleStatus === 'LIB_PREP_DAY2_PASSED'">{{ props.item.pool_id ? props.item.pool_id : '-' }}</td>
  <td>{{ props.item.suid ? props.item.suid : "-" }}</td>
  <td v-if="getSampleStatus === 'Accessioned'">{{ props.item.full_name
    ? props.item.full_name
    : "-" }}</td>
  <td v-if="getSampleStatus === 'Accessioned'">{{ props.item.age ? props.item.age : "-" }}</td>
  <td v-if="getSampleStatus === 'Accessioned'">{{ props.item.gender ? props.item.gender : "-" }}</td>
  <td>{{ props.item.sample_type ? props.item.sample_type : "-" }}</td>
  <td>{{ props.item.specimen ? props.item.specimen : "-" }}</td>
  <td style="text-wrap: wrap;">{{ props.item.testNames ? props.item.testNames : props.item.panel ? props.item.panel : '-' }}</td>
  <td v-if="getSampleStatus === 'Accessioned'">{{ props.item.sample_category ? props.item.sample_category : "-" }}</td>
  <td v-if="getSampleStatus === 'Accessioned'">
    {{ props.item.collection_date ? moment(props.item.collection_date).format('MM-DD-YYYY hh:mm A') : '-' }}
  </td>
  <td v-if="getSampleStatus === 'Accessioned'">{{ props.item.received_date ?
    moment(props.item.received_date).format('MM-DD-YYYY hh:mm A') : '-' }}</td>
  <td v-if="getSampleStatus != 'Accessioned'">
    {{ props.item.batch_entity_status ? props.item.batch_entity_status : '-' }}
  </td>
  <td v-if="getSampleStatus === 'Accessioned'">
    {{ props.item.status ? props.item.status : '-' }}
  </td>
</template>
<script setup>
import moment from 'moment';
const getSampleStatus = localStorage.getItem('sampleStatus')
const props = defineProps({
  item: Object
})
</script>
