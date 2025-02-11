const searchGridHeaders = () => {
  const commonHeaders = ['Sample Type','Specimen', 'Panel/Test Name']
  return {
    allHeaders: {
      Accessioned: [
        'Accession Number',
        'PUID',
        'Name',
        'Age',
        'Gender',
        ...commonHeaders,
        'Sample Category',
        'Collection Date',
        'Received Date',
        'Sample Status'
      ],
      LIB_PREP_DAY1_PASSED: [
        'Accession Number',
        'Batch Number',
        'Library Id',
        'PUID',
        ...commonHeaders,
        'Batch Sample Status'
      ],
      LIB_PREP_DAY2_PASSED: [
        'Accession Number',
        'Batch Number',
        'Library Id',
        'Pool Id',
        'PUID',
        ...commonHeaders,
        'Batch Sample Status'
      ],
      DNA_ISOLATION_PASSED: [
        'Accession Number',
        'Batch Number',
        'PUID',
        ...commonHeaders,
        'Batch Sample Status'
      ]
    }
  }
}
const sortHeaders = () => {
    return {
        allSortHeaders: {
            Accessioned: [
                { value: 'sampleBarcode', label: 'Sample Barcode',},
                { value: 'accessionNumber', label: 'Accession Number' },
                { value: 'suid', label: 'PUID' },
            ],
            LIB_PREP_DAY1_PASSED: [
                { label: 'Sample Barcode', value: 'sample_barcode',},
                { value: 'accession_number', label: 'Accession Number' },
                { value: 'batch_number', label: 'Batch Number' },
                // { value: 'library_id', label: 'Library Id' },
                { value: 'suid', label: 'PUID' },
                {value :'sample_type',label:'Sample type'},
                {value:'panel',label:'Panel/Test Name'},
            ],
            LIB_PREP_DAY2_PASSED: [
                { label: 'Sample Barcode', value: 'sample_barcode',},
                { value: 'accession_number', label: 'Accession Number' },
                { value: 'batch_number', label: 'Batch Number' },
                // { value: 'library_id', label: 'Library Id' },
                // { value: 'pool_id', label: 'Pool Id' },
                { value: 'suid', label: 'PUID' },
                {value :'sample_type',label:'Sample type'},
                {value:'panel',label:'Panel/Test Name'},
            ],
            DNA_ISOLATION_PASSED: [
                { label: 'Sample Barcode', value: 'sample_barcode',},
                { value: 'accession_number', label: 'Accession Number' },
                { value: 'batch_number', label: 'Batch Number' },
                { value: 'suid', label: 'PUID' },
                {value :'sample_type',label:'Sample type'},
                {value:'panel',label:'Panel/Test Name'},
            ]
        }
    };
};

export { searchGridHeaders ,sortHeaders}
