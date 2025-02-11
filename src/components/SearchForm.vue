<template>
    <div>
        <FormKit type="form" :incomplete-message="false" :actions="false" style="padding: 0px;" v-model="formData"
            @submit="handleForm">
            <div>
                <div class="form-card-title py-2 px-5  br-bt d-flex justify-content-between align-items-center">
                    <span v-if="!viewStore.searchResultsBlock" class="br-bt-0">Search Samples</span>
                    <span v-if="viewStore.searchResultsBlock" class="br-bt-0">Search Results</span>
                    <div>
                        <button type="submit" v-if="viewStore.searchResultsBlock" class="btn filled-btn btn-wd"> Search
                            Sample</button>
                    </div>
                </div>
                <v-container>
                    <v-row>
                        <v-col sm="12" md="6" cols="12">
                            <v-row class="align-items-center">
                                <v-col cols="3">Disease</v-col>
                                <v-col>
                                    <FormKit style="margin: 0px !important;" type="select" name="disease_status"
                                        id="disease_status" placeholder="Select Disease"
                                        :options="['Blood Cancer', 'Bladder Cancer', 'Breast Canecr', 'Kidney Cancer', 'Liver Cancer',]" />
                                </v-col>
                            </v-row>
                            <v-row class="align-items-center">
                                <v-col cols="3">From</v-col>
                                <v-col class="d-flex align-items-center justify-content-between">
                                    <FormKit type="date" name="collectionDate" id="collectionDate" style="margin: 0px;"
                                        placeholder="Enter From Date" />
                                    <div>To</div>
                                    <FormKit type="date" name="receivedDate" id="receivedDate"
                                        placeholder="Enter To Date" />
                                </v-col>
                            </v-row>
                            <v-row class="align-items-center">
                                <v-col cols="3">Sample ID</v-col>
                                <v-col>
                                    <FormKit type="text" name="caseSampleIds" id="caseSampleIds" />
                                </v-col>
                            </v-row>
                            <!-- <v-row class="align-items-center">
                                    <v-col cols="3">Batch Status</v-col>
                                    <v-col>
                                        <FormKit type="text" name="batchStatus"  disabled="true"  v-model="$props.batchType" id="batchStatus" />
                                    </v-col>
                                </v-row> -->
                        </v-col>
                        <v-col offset-sm-0 offset-0></v-col>
                        <v-col sm="12" md="5" cols="12">
                            <v-row class="align-items-start">
                                <v-col cols="3">Sample Type</v-col>
                                <v-col>
                                    <FormKit style="margin: 0px !important;" v-model="selectSampleType"
                                        @input="handleSampleType" placeholder="Select Sample type" type="select"
                                        name="sample_type" id="sample_type" :options="sampleTypes" />

                                </v-col>
                            </v-row>
                            <v-row class="align-items-start">
                                <v-col cols="3">Specimen</v-col>
                                <v-col>
                                    <FormKit style="margin: 0px !important;" v-model="selectSpecimen"
                                        placeholder="Select Specimen" type="select" name="specimen" id="specimen"
                                        :options="specimenList" />

                                </v-col>
                            </v-row>

                            <v-row class="align-items-center">
                                <v-col cols="3">Sort By</v-col>
                                <v-col>
                                    <FormKit style="margin: 0px !important;" type="select" name="sort_by" id="sort_by"
                                        :options="['Ascending Order', 'Descending Order']" />
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <div v-if="!viewStore.searchResultsBlock"
                        class="d-flex align-items-center justify-content-center pt-3 mt-3 br-bt">
                        <div class="d-flex align-items-center">
                            <button type="button" class="btn border-btn m-2" @click="router.push('/batchCreation')">
                                Close</button>
                            <button type="submit" @click="searchTerm = ''" class="btn filled-btn btn-wd m-2"> Search
                                Sample</button>
                        </div>
                    </div>
                </v-container>
            </div>
        </FormKit>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePaginationStore } from '../stores/paginationStore';
import { useBatchListStore } from '../stores/batchListStore';
import { useStudyStore } from '../stores/studyStore';
import { useViewStore } from '../stores/viewStore';
import { useAlertStore } from '../stores/alertStore';
const router = useRouter();
import moment from 'moment';
import GridSearch from './GridSearch.vue'
import { LibPrepartionController } from '../Controllers/libPrepartionController';
import { SampleController } from '../Controllers/sampleController';
const viewStore = useViewStore();
const formData = {}
const studyStore = useStudyStore();
const getSearchSamples = ref({});
const totalCount = ref(0)
const searchTerm = ref('');
const alertStore = useAlertStore();
const paginationStore = usePaginationStore();
const sampleTypes = ref({});
const specimenList = ref({});
const selectSampleType = ref("");
const selectSpecimen = ref("");
const EntityIds = ref([]);
const 
const props = defineProps({
    batchType: String
})
const ids = ref([])
const batchStore = useBatchListStore();
const entis = async () => {
    if (props.batchType !== 'DNA_ISOLATION') {
        const inputModel = {
            batchModel: {
                studyId: studyStore.selectedStudy,
                pagination: {
                    sort: 'desc.batchId',
                    search: 'batchType=DNA_ISOLATION&batchStatus=SUBMITTED'
                }
            }
        }
        const response = await LibPrepartionController.getLibEntityIds(inputModel)
        if (response) {
            ids.value = response.data
            const uniqueEntityIds = [];
            response.data.forEach(item => {
                item.entityIds.split(',').forEach(entityId => {
                    const trimmedEntityId = entityId.trim();
                    if (trimmedEntityId !== '' && !uniqueEntityIds.includes(trimmedEntityId)) {
                        uniqueEntityIds.push(trimmedEntityId);
                        EntityIds.value = uniqueEntityIds
                    }
                });
            });
        }
    }
}
entis();
const handleSampleType = async (e) => {
    selectSpecimen.value = ""
    if (e) {
        const inputModal = {
            sampleTypeId: e[0]
        }
        const response = await SampleController.getSpecimenList(inputModal);
        if (response && response.data && response.data.length > 0) {
            specimenList.value = response.data.map(item => ({
                value: [item.discreteAttributeId, item.attributeValue],
                label: item.attributeValue
            }));
        }
    }
}
const getSamplesType = async () => {
    const response = await SampleController.getSampleTypes();
    if (response && response.data && response.data.length > 0) {
        sampleTypes.value = response.data.map(item => ({
            value: [item.discreteAttributeId, item.attributeValue],
            label: item.attributeValue
        }));
    }
}
onMounted(() => {
    getSamplesType();
})
const removeDuplicates = (arr) => Array.from(new Set(arr));
const handleForm = async () => {
    const formattedData = {
        ...formData,
        sample_type: formData.sample_type[1],
        specimen: formData.specimen[1],
        receivedDate: formData.receivedDate ? moment(formData.receivedDate).format('DD/MM/YYYY') : undefined,
        collectionDate: formData.collectionDate ? moment(formData.collectionDate).format('DD/MM/YYYY') : undefined,
    };
    let urlParams = "";
    for (const key of Object.keys(formattedData)) {
        if (formattedData[key] === undefined || formattedData[key] === 'Any' || formattedData[key] === '') {
            continue;
        }
        const value = formattedData[key];
        const queryString = [];
        if (key !== 'sort_by') {
            queryString.push(`${key}=${value}`);
        }
        urlParams += queryString.length > 0 ? "&" + queryString.join("&") : "";
    }
    const entityIdValue = props.batchType !== 'DNA_ISOLATION'
        ? `caseSampleIds=${EntityIds.value.join(',')}${urlParams ? '&' + urlParams.substring(1) : ""}`
        : "";
    const inputModel = {
        caseSampleModel: {
            studyFilter: [studyStore.selectedStudy],
            pagination: {
                count: 10,
                page: paginationStore.currentPage,
                sort: formattedData.sort_by === "Ascending Order" ? "asc.case_sample_id" : "desc.case_sample_id",
                search: entityIdValue ? entityIdValue : urlParams ? (urlParams.substring(1)) : ""
            },
            includeMeta: true,
            includeSubjectMeta: true,
            includeAccessionMeta: true,
        },
    };
    const response = await SampleController.getSamples(inputModel);
    if (response) {
        if (props.batchType !== 'DNA_ISOLATION') {
            const fetchedData = [];
            console.log(ids.value)
            ids.value.forEach((obj) => {
                const entityIds = removeDuplicates(obj.entityIds.split(',').map(Number));
                entityIds.forEach((casesample) => {
                    const matchedItem = response.data.find((item) => item.caseSampleId === casesample);
                    if (matchedItem) {
                        fetchedData.push({
                            ...matchedItem,
                            batchId: obj.batchId,
                        });
                    }
                });
            });
            viewStore.getSearchResultsBlock(true);
            batchStore.getSearchSampleData(fetchedData,response.totalCount);
        }
        else {
            viewStore.getSearchResultsBlock(true);
            batchStore.getSearchSampleData(response.data,response.totalCount);
        }

    }
}
</script>