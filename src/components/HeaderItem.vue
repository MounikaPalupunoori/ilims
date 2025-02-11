<template>
  <v-app-bar color="#007bff">
    <v-app-bar-nav-icon
      variant="text"
      style="width: auto; margin-right: 10px"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <img src="../../src/assets/Images/iCarelogo.png" style="height: 30px; width: 30px" />
    <div class="d-none d-sm-block d-md-block">
      <div class="header-txt">
        <span style="padding: 0px 0px 0px 10px; color: white"></span>{{ pageTitle.pageTitle.title }}
        <span class="header-txt" v-if="pageTitle.batchNumber.number">- {{pageTitle.batchNumber.number}}</span>
      </div>
    </div>
    <v-spacer></v-spacer>
    <div>
      <v-row class="align-items-center">
        <div class="pr-2">Select Lab</div>
        <select
          v-model="temporarySelectedStudy"
          style="
            color: black;
            background-color: white;
            padding: 5px;
            height: 35px;
            font-size: 14px;
            box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
            font-weight: 600;
          "
          @change="handleStudyChange"
        >
          <option value="select study" disabled>Select Lab</option>
          <option
            style="padding: 50px"
            v-for="option in listofStudies"
            :key="option.studyId"
            :value="option.studyId"
          >
            {{ option.studyIdentifier }}
          </option>
        </select>

        <div class="d-none d-sm-nome d-md-block">
          <v-col>
            <SearchItem />
          </v-col>
        </div>
      </v-row>
      <v-dialog v-model="dialog" max-width="400px">
        <v-card>
          <v-card-title class="headline">Confirmation</v-card-title>
          <v-card-text> Are you sure you want to change the lab? </v-card-text>
          <v-card-actions>
            <v-btn @click="confirmChange('no')">No</v-btn>
            <v-btn @click="confirmChange('yes')">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-spacer></v-spacer>
    <v-menu transition="scale-transition">
      <template v-slot:activator="{ props }">
        <div v-bind="props" class="d-flex align-items-center cursor-pointer">
          <v-btn variant="text" icon="mdi mdi-account"></v-btn>
          <div class="d-none d-sm-block d-md-block">{{ loggedInUser }}</div>
          <v-btn
            class="mr-3 d-none d-sm-block d-md-block"
            variant="text"
            icon="mdi mdi-menu-down"
          ></v-btn>
        </div>
      </template>
      <v-list density="compact">
        <v-list-item style="display: flex" @click="showAboutPage = true">
          <template v-slot:prepend> <v-icon icon="mdi mdi-information-outline"></v-icon></template>
          <div>About iLims</div>
        </v-list-item>
        <v-list-item style="color: #007bff" @click="logout()">
          <template v-slot:prepend>
            <v-icon icon="mdi mdi-logout" style="display: inline-block"></v-icon
          ></template>
          <div>Sign Out</div>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left" fixed temporary color="#007bff">
    <v-list v-for="item in menuList" :key="item.id" style="margin: 0px; padding: 0px">
      <v-list-item class="list-title" style="min-height: auto">
        <div class="d-flex align-items-center justify-content-between">
          <div>{{ item.name }}</div>
          <img class="list-complete-img" :src="`../../src/assets/${item.image}`" alt="" />
        </div>
      </v-list-item>
      <v-list-item v-for="label in item.content" :key="label" style="min-height: auto">
        <div
          class="list-content"
          @click="label.action ? label.action() : navigateTo(label)"
          v-if="label.visible ? label.visible.value : true"
        >
          {{ label.label }}
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <AboutModal v-if="showAboutPage" :showModal='showAboutPage' :closeModal="closeModal"/>
</template>
<script setup>
import { watch, ref,onMounted } from 'vue';
import SearchItem from './SearchItem.vue';
import { useRouter } from 'vue-router';
import { useAddButtonStore } from '../stores/addButtonStore';
import { StudyListController } from '../Controllers/studyListController';
import { useStudyStore } from '../stores/studyStore';
import { useViewStore } from '../stores/viewStore';
import { useBatchListStore } from '../stores/batchListStore';
import { usePaginationStore } from '../stores/paginationStore';
import { useFilterStore } from '../stores/filterStore';
import AboutModal from './AboutModal.vue';
const showDay1 = ref(false);
const showDay2 = ref(false);
const dialog = ref(false);
const temporarySelectedStudy = ref(null);
const loggedInUser = ref('');
const pageTitle = useAddButtonStore();
const studyStore = useStudyStore();
const listofStudies = ref();
const drawer = ref(false);
const router = useRouter();
const viewStore = useViewStore();
const batchstore = useBatchListStore();
const paginationStore = usePaginationStore();
const filterStore = useFilterStore();
const showAboutPage = ref(false);

const closeModal=()=>{
  showAboutPage.value = false;
}

const menuList = [
  // {
  //   id: 1,
  //   name: 'Sample',
  //   image: 'Images/dashboard.png',
  //   content: [
  //     {
  //       label: 'Sample Dashboard',
  //       route: '/dashboard'
  //     }
  //   ]
  // },
  {
    id: 2,
    name: 'Patient',
    image: 'Images/patient.png',
    content: [
      {
        label: 'List',
        route: '/patientList'
      },
      {
        label: 'Add Patient',
        route: '/addPatient'
      }
    ]
  },
  {
    id: 3,
    name: 'Order Test',
    image: 'Images/orderTest.png',
    content: [
      {
        label: 'List',
        route: '/orderTestList'
      },
      {
        label: 'Order Test',
        route: '/orderTest'
      },
      {
        label: 'Sample Collection',
        route: '/sampleCollection'
      },
      {
        label: 'Accession',
        route: '/accession'
      }
    ]
  },
  {
    id: 4,
    name: 'DNA Isolation',
    image: 'Images/DNA.png',
    content: [
      {
        label: 'Batch List',
        route: '/batchList'
      },
      {
        label: 'Create Batch',
        route: '/batchCreation',
        from: true,
        sampleStatus: 'Accessioned'
      }
    ]
  },
  {
    id: 5,
    name: 'Library Preparation',
    image: 'Images/library.png',
    content: [
      {
        label: 'Batch List',
        route: '/libbatchlist'
      },
      {
        label: 'Create Batch',
        action: () => {
          showDay1.value = !showDay1.value
          showDay2.value = !showDay2.value
        }
      },
      {
        label: 'Day 1',
        route: '/batchCreation',
        visible: showDay1,
        sampleStatus: 'DNA_ISOLATION_PASSED',
        from: true
      },
      {
        label: 'Day 2',
        route: '/batchCreation',
        visible: showDay2,
        sampleStatus: 'LIB_PREP_DAY1_PASSED',
        from: true
      }
    ]
  },
  {
    id: 6,
    name: 'NGS',
    image: 'Images/NGS.png',
    content: [
      {
        label: 'Run List',
        route: '/NGSRuns'
      },
      {
        label: 'Create Run',
        route: '/batchCreation',
        sampleStatus: 'LIB_PREP_DAY2_PASSED',
        from: true
      }
    ]
  },
  // {
  //   id: 7,
  //   name: 'QC Update',
  //   image: 'Images/QC.png',
  //   content: [
  //     {
  //       label: 'Nucleic Acid Isolation',
  //       route: '/NucleicAcidIsolation'
  //     },
  //     {
  //       label: 'Library Preparation Day 1',
  //       route: '/LibPrepDay1'
  //     },
  //     {
  //       label: 'Library Preparation Day 2',
  //       route: '/LibPrepDay2'
  //     },
  //     {
  //       label: 'NGS QC',
  //       route: '/NGSQC'
  //     }
  //   ]
  // },
  {
    id: 8,
    name: 'Lib Prep Biobanking',
    image: 'Images/bioBanking.png',
    content: [
      {
        label: 'Library Preparation',
        route: '/BioBanking'
      }
    ]
  }
]

const navigateTo = (value) => {
  if (value.label === 'Add Patient') {
    localStorage.setItem('subjectId', '')
    router.push({ name: 'patient', params: { path: 'create' } })
  } else if (value.label === 'Order Test') {
    localStorage.setItem('subjectId', '')
    localStorage.setItem('accessionId', '')
    router.push({ name: 'orderTest', params: { path: 'create' } })
  } else if (value.label === 'Sample Collection') {
    localStorage.setItem('subjectId', '')
    localStorage.setItem('accessionId', '')
    router.push({ name: 'sampleCollection', params: { path: 'create' } })
  } else if (value.label === 'Accession') {
    localStorage.setItem('subjectId', '')
    localStorage.setItem('accessionId', '')
    router.push({ name: 'Accession', params: { path: 'create' } })
  } else {
    router.push(value.route)
  }
  drawer.value = false
  batchstore.reset()
  localStorage.setItem('sampleStatus', value.sampleStatus)
  pageTitle.getsampleStatus(value.sampleStatus)
  viewStore.$reset()
  paginationStore.resetPage(1);
  localStorage.setItem('lipTab','day1');
  filterStore.sucess('All');
  batchstore.setBatchNumber('');
  filterStore.setParams('')
}
const filteredResults = async () => {
  const getStudies = await StudyListController.labSamples()
  if (getStudies) {
    listofStudies.value = getStudies.data
    if (getStudies.data.length === 1) {
      studyStore.getSelectedStudy(getStudies.data[0].studyId)
    }
  }
  temporarySelectedStudy.value = studyStore.selectedStudy
  if (studyStore.selectedStudy != 'select study') {
    let inputModal = {
      entityStudyAttributeModel: {
        studyId: [studyStore.selectedStudy],
        sort: 'asc.displayOrder, asc.displayName'
      }
    }
    const response = await StudyListController.getEntityeMasterList(inputModal)
    if (response && response.data && response.data.data && response.data.data.length > 0) {
      const data = response.data.data
      studyStore.getEntityStudyAttribute(data);
    }
  }
}
const logout = () => {
  window.location.href = '/'
  localStorage.clear()
}

onMounted(() => {
  const user = localStorage.getItem('userName')
  if (user) {
    loggedInUser.value = user
  }
})
watch(
  () => studyStore.selectedStudy,
  (newStudy) => {
    viewStore.getSearchResultsBlock(false)
    filteredResults()
    batchstore.reset()
  },
  { immediate: true }
)
const handleStudyChange = () => {
  if (studyStore.selectedStudy !== 'select study') {
    dialog.value = true
  } else {
    studyStore.selectedStudy = temporarySelectedStudy.value
    localStorage.setItem('studyId', studyStore.selectedStudy)
    localStorage.setItem('accessionId', '')
    localStorage.setItem('subjectId', '')
  }
}
const confirmChange = (value) => {
  if (value === 'yes') {
    localStorage.setItem('accessionId', '')
    localStorage.setItem('subjectId', '')
    studyStore.selectedStudy = temporarySelectedStudy.value
    router.push('/patientList')
    paginationStore.resetPage(1);
    localStorage.setItem('studyId', studyStore.selectedStudy)
  } else {
    temporarySelectedStudy.value = studyStore.selectedStudy
  }
  dialog.value = false
}
</script>
<style scoped>

.header-txt {
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}

.list-content {
  color: white;
  cursor: pointer;
}

.list-title {
  background-color: white;
  color: #007bff;
}

select option {
  line-height: 100px;
}

.username {
  padding: 3px;
  text-align: center;
  width: 30px;
  height: 30px;
  background-color: #007bff;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
  margin-right: 5px;
}

.v-list-item__prepend {
  display: none;
}
</style>
