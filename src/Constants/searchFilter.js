const filterList = () => {
    return {
        allfilterKeys: {
            Accessioned: [
                { key: 'Accession Number', param: 'accessionNumber', isAdded: false },
                { key: 'PUID', param: 'suid', isAdded: false },
                { key: 'Name', param: 'full_name', isAdded: false },
                { key: 'Age', param: 'age', isAdded: false },
                { key: 'Gender', param: 'gender', isAdded: false },
                {key:'Sample Category',param:'sample_category',isAdded:false}
            ],
            LIB_PREP_DAY1_PASSED: [
                { key: 'Accession Number', param: 'accession_number', isAdded: false },
                { key: 'Batch Number', param: 'batch_number', isAdded: false },
                { key: 'Library Id', param: 'library_id', isAdded: false  },
                { key: 'PUID', param: 'suid', isAdded: false },
                { key: 'Panel/Test Name', param: 'panel', isAdded: false }
            ],
            LIB_PREP_DAY2_PASSED: [
                { key: 'Accession Number', param: 'accession_number', isAdded: false },
                { key: 'Batch Number', param: 'batch_number', isAdded: false },
                { key: 'Library Id', param: 'library_id', isAdded: false  },
                { key: 'Pool Id', param: 'pool_id', isAdded: false  },
                { key: 'PUID', param: 'suid', isAdded: false },
                { key: 'Panel/Test Name', param: 'panel', isAdded: false }
            ],
            DNA_ISOLATION_PASSED: [
                { key: 'Accession Number', param: 'accession_number', isAdded: false },
                { key: 'Batch Number', param: 'batch_number', isAdded: false },
                { key: 'PUID', param: 'suid', isAdded: false },
                { key: 'Panel/Test Name', param: 'panel', isAdded: false }
            ]
        }
    };
};

export {filterList}