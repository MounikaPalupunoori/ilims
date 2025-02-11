<template>
  <v-layout :style="{ 'pointer-events': loaderStore.loader ? 'none' : 'auto' }">
    <LoaderItem />
    <HeaderItem />
    <AlertItem />
    <v-main style="background: #f4f3f3; height: calc(100vh - 10px)">
      <div class="d-sm-none d-md-none mx-4 mt-4" style="height: 5%; margin-bottom: -15px">
        <div class="header-txt">{{ pageTitle.pageTitle.title }}</div>
      </div>
      <div class="container-fluid main-block p-3">
        <div style="height: 100%; background-color: white" v-if="studyStore.selectedStudy != 'select study'">
          <router-view> </router-view>
        </div>
        <div style="height: 100% !important; background-color: white" v-else>
          <div class="d-flex align-items-center justify-content-center" style="height: 100% !important">
            <h5>Please select any lab to continue to see the data</h5>
          </div>
        </div>
      </div>
    </v-main>
  </v-layout>
</template>
<script setup>
import HeaderItem from '../components/HeaderItem.vue'
import LoaderItem from './LoaderItem.vue';
import AlertItem from './AlertItem.vue';
import { useAddButtonStore } from '../stores/addButtonStore';
import { useStudyStore } from '../stores/studyStore';
import { useLoaderStore } from '../stores/loaderStore';
const loaderStore = useLoaderStore();
const pageTitle = useAddButtonStore();
const studyStore = useStudyStore();
</script>
<style scoped>
.header-txt {
  font-weight: 500;
  color: #007bff;
  font-size: 18px;
}

.main-block {
  background-color: #f4f3f3;
  height: 100%;
}

@media (min-width: 300px) and (max-width: 577px) {
  .main-block {
    height: 95%;
  }
}

@media (min-width: 992px) and (max-width: 1200px) {
  .main-block {
    height: 100%;
  }
}
</style>
