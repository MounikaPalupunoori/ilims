const Headers = [
  { label: '', pageTitle: 'Sample Dashboard', search: false },
  {
    label: 'Add Patient',
    navTo: '/patient',
    pageTitle: 'Patient List',
    name: 'patientList'
  },
  {
    label: 'Patient List',
    navTo: '/patientList',
    pageTitle: 'Patient Information',
    name: 'patient'
  },
  {
    label: 'Order Test List',
    navTo: '/orderTestList',
    pageTitle: 'Requisition',
    name: 'orderTest'
  },
  {
    label: 'Order New Test',
    navTo: '/orderTest',
    pageTitle: 'Order Test List',
    name: 'orderTestList'
  },
  {
    label: 'Order Test List',
    navTo: '/orderTestList',
    pageTitle: 'Sample Collection',
    name: 'sampleCollection'
  },
  {
    label: 'Order Test List',
    navTo: '/orderTestList',
    pageTitle: 'Sample Accession',
    name: 'Accession'
  },
  {
    label: 'Create Batch',
    navTo: '/batchCreation',
    pageTitle: 'DNA Isolation Batch List',
    name: 'batchList',
    sampleStatus: 'Accessioned'
  },
  {
    label: '',
    navTo: '/batchCreation',
    pageTitle: [
      {
        status: 'Accessioned',
        title: 'DNA Isolation Batch creation'
      },
      {
        status: 'DNA_ISOLATION_PASSED',
        title: 'Library Preparation Day 1 Batch Creation'
      },
      {
        status: 'LIB_PREP_DAY1_PASSED',
        title: 'Library Preparation Day 2 Batch Creation'
      },
      {
        status: 'LIB_PREP_DAY2_PASSED',
        title: 'NGS Batch Creation'
      }
    ],
    name: 'batchCreation'
  },
  {
    label: '',
    name: 'searchSamples',
    pageTitle: [
      {
        status: 'Accessioned',
        title: 'DNA Isolation - Search Samples'
      },
      {
        status: 'DNA_ISOLATION_PASSED',
        title: 'Library Preparation Day 1 - Search Samples'
      },
      {
        status: 'LIB_PREP_DAY1_PASSED',
        title: 'Library Preparation Day 2 - Search Samples'
      },
      {
        status: 'LIB_PREP_DAY2_PASSED',
        title: 'NGS - Search Samples'
      }
    ]
  },
  {
    label: '',
    pageTitle: 'DNA Isolation Sample Verification',
    name: 'batchListById'
  },
  { label: '', pageTitle: 'DNA Isolation', name: 'dnaIsolation',batchNumber:true },
  { label: '', pageTitle: 'Lib Prep Day 1', name: 'libpreday1' ,batchNumber:true},
  { label: '', pageTitle: 'Lib Prep Day 2', name: 'libprepday2',batchNumber:true },
  {
    label: '',
    pageTitle: 'Lib Prep Day 1 Sample Verification',
    name: 'libsampleVerify'
  },
  {
    label: '',
    pageTitle: 'Lib Prep Day 2 Sample Verification',
    name: 'libPrepDay2Verify'
  },
  {
    label: 'Create Batch',
    navTo: '/batchCreation',
    pageTitle: 'Lib Prep Batch List',
    name: 'libBatchList'
  },
  {
    label: 'New Run',
    navTo: '/batchCreation',
    pageTitle: 'NGS Active Runs',
    name: 'NGSRuns',
    sampleStatus: 'LIB_PREP_DAY2_PASSED'
  },
  {
    label: '',
    navTo: '',
    pageTitle: 'NGS Generate Run',
    name: 'NGSverify',
    batchNumber:true
  },
  { label: '', pageTitle: 'Create Run', name: 'createRun' },
  { label: '', pageTitle: 'Library Preparation Biobanking', name: 'BioBanking' }
]
export default { Headers }
