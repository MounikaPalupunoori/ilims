import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import AppLayout from '../components/LayoutView.vue';
import { usePaginationStore } from '../stores/paginationStore';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      component: AppLayout,
      children: [
        {
          path: '',
          component: () => import('../views/DashboardView.vue'),
          meta: { requiresAuth: true },
        }
      ]
    },
    {
      path: '/patientList',
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/patientList',
          name: "patientList",
          component: () => import('../views/List/PatientListView.vue'),
        },
        {
          path: '/patient/:path',
          name: "patient",
          props: route => ({ path: route.params.path }),
          component: () => import('../views/List/AddPatient.vue')
        },
        {
          path: '/orderTest/:path',
          name: "orderTest",
          props: route => ({ path: route.params.path }),
          component: () => import('../views/OrderTest/OrderTest.vue')
        },
        {
          path: '/sampleCollection/:path',
          name: "sampleCollection",
          props: route => ({ path:route.params.path}),
          component: () => import('../views/OrderTest/SampleCollection.vue')
        },
        {
          path: '/accession/:path',
          name: "Accession",
          props: route => ({ path: route.params.path}),
          component: () => import('../views/OrderTest/Accession.vue')
        },
        {
          path: '/orderTestList',
          name: "orderTestList",
          component: () => import('../views/OrderTest/OrderListView.vue')
        },
        {
          path: '/batchList',
          name: "batchList",
          component: () => import('../views/Batch/BatchListView.vue')
        },
        {
          path: '/batchCreation',
          name: "batchCreation",
          component: () => import('../views/Batch/CreateBatchView.vue')
        },
        {
          path: '/batchListById',
          name: "batchListById",
          component: () => import('../views/Batch/BatchListById.vue')
        },
        {
          path: '/searchSample',
          name: "searchSamples",
          component: () => import('../views/Batch/SearchSamplesView.vue')
        },
        {
          path: '/dnaIsolation',
          name: "dnaIsolation",
          component: () => import('../views/Batch/DNAIsolationView.vue')
        },
        {
          path: '/libbatchlist',
          name: "libBatchList",
          component: () => import('../views/LibraryPreparation/LibBatchListView.vue')
        },
        {
          path: '/libsampleVerication',
          name: "libsampleVerify",
          component: () => import('../views/LibraryPreparation/LibPreSampleVerifyView.vue')
        },
        {
          path: '/DayTwoVerication',
          name: "libPrepDay2Verify",
          component: () => import('../views/LibraryPreparation/DayTwoVerifyView.vue')
        },
        {
          path: '/libpreday1',
          name: "libpreday1",
          component: () => import('../views/LibraryPreparation/LibPrepDayOneView.vue')
        },
        {
          path: '/libprepday2',
          name: "libprepday2",
          component: () => import('../views/LibraryPreparation/LibPrepDayTwoView.vue')
        },
        {
          path: '/worklist/:batchNo',
          name: 'WorklistforWholeGenome',
          props: route => ({ batchNo: parseInt(route.params.batchNo) }),
          component: () => import('../views/LibraryPreparation/WorklistView.vue')
        },
        {
          path: '/WorklistforEnrichment/:batchNo',
          name: 'WorklistforEnrichment',
          props: route => ({ batchNo: parseInt(route.params.batchNo) }),
          component: () => import('../views/LibraryPreparation/WorkListTwo.vue')
        },
        {
          path: '/NucleicAcidIsolation',
          name: "NucleicAcidIsolation",
          component: () => import('../views/QCUpdate/NucleicAcidIsolationView.vue')
        },
        {
          path: '/LibPrepDay1',
          name: "LibPrepDay1",
          component: () => import('../views/QCUpdate/LibPrepDay1View.vue')
        },
        {
          path: '/LibPrepDay2',
          name: "LibPrepDay2",
          component: () => import('../views/QCUpdate/LibPrepDay2View.vue')
        },
        {
          path: '/NGSQC',
          name: "NGSQC",
          component: () => import('../views/QCUpdate/NGSQCView.vue')
        },
        {
          path: '/QCReport',
          name: "QCReport",
          component: () => import('../views/QCUpdate/QCReportView.vue')
        },
        {
          path: '/BioBanking',
          name: "BioBanking",
          component: () => import('../views/BioBanking/BioBankingView.vue')
        },
        {
          path: '/createRun',
          name: "createRun",
          component: () => import('../views/NGS/CreateRunView.vue')
        },
        {
          path: '/NGSRuns',
          name: "NGSRuns",
          component: () => import('../views/NGS/RunsView.vue')
        },
        {
          path: '/NGSVerification',
          name: "NGSverify",
          component: () => import('../views/NGS/NGSverificationsView.vue')
        }
      ]
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],

})
router.beforeEach(async (to) => {
  const paginationStore = usePaginationStore();
  paginationStore.resetPage(1);
});

export default router
