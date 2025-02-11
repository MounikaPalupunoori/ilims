<template>
  <div class="d-flex justify-content-between flex-column page-view-ht">
    <v-alert v-show="showAlert"
  color="#dc3545"
  :text="alertMessage"
></v-alert>
    <div class="table-ht br-bt br-b">
      <FormKit type="form" :incomplete-message="false" :actions="false" @submit="SaveOrderTest" id="my-form-order"
        style="background-color: #f4f3f3">
        <div class="container-fluid form-card" style="margin-top: 0px">
          <div class="form-card-title">Patient Information</div>
          <div class="row row-cols-2 row-cols-sm-2 row-cols-md-3 pt-2">
            <div class="col mb-4">
              <label for="search" style="font-size: 15px; color: black">Patient Name*</label>
              <v-autocomplete :disabled="batchEntities.length > 0" v-model="patientName" :items="patientOptions" variant="solo-filled"
                density="compact" @update:modelValue="handlePatientName" :item-props="itemPatientProps"
                placeholder="Select Patient Name">
                <template v-slot:item="{ props, item }">
                  <v-list-item style="min-height: 40px;padding:0px 4px;" v-bind="props"
                    :title="item.raw.name"></v-list-item>
                </template>
              </v-autocomplete>
            </div>
            <div class="col mb-4">

              <FormKit type="date" name="date_of_birth" id="date_of_birth" disabled="true"  
              placeholder="Enter DOB" label="DOB" readOnly
                v-model="PatientValues.date_of_birth" />
            </div>
            <div class="col mb-4">
              <FormKit type="text" name="gender" id="gender" disabled="true" placeholder="Select Gender" label="Gender"
                 readOnly v-model="PatientValues.gender.value" />
            </div>
            <div class="col mb-4">
              <FormKit type="email" name="email_id" id="email_id" disabled="true" placeholder="Enter Email" label="Email"
                validation="email" readOnly v-model="PatientValues.email_id" />
            </div>
            <div class="col mb-4">
              <FormKit type="text" name="patient_phone" id="patient_phone" disabled="true" placeholder="Enter Mobile No" label="Mobile No"
                v-model="PatientValues.phone" readOnly />
            </div>
            <div class="col mb-4">
              <FormKit type="text" name="patient_address" id="patient_address" disabled="true" placeholder="Enter Address" label="Address"
                readOnly v-model="PatientValues.address" />
            </div>
            <div class="col mb-4">
              <FormKit type="text" name="patient_zipcode" id="patient_zipcode" disabled="true" placeholder="Enter Postal Code"
                label="Postal Code" readOnly v-model="PatientValues.zipcode" />
            </div>
            <div class="col mb-4">
              <FormKit type="text" name="patient_city" id="patient_city" disabled="true" placeholder="Enter city" label="City" readOnly
                v-model="PatientValues.city" />
            </div>
            <div class="col mb-4">
              <FormKit type="text" name="patient_state" id="patient_state" disabled="true" placeholder="Enter State" label="State"
                readOnly v-model="PatientValues.state" />
            </div>
            <div class="col mb-4">
              <FormKit type="text" name="patient_country" id="patient_country" disabled="true" placeholder="Enter Country" label="Country"
                readOnly v-model="PatientValues.country" />
            </div>
            <div class="col mb-4" v-if="((props.type !== 'orderTest' && formValues.status != 'Ordered') || props.type === 'sampleCollection')">
              <FormKit type="text" :disabled="batchEntities.length > 0" @input=" handleKitBarcode"  @change="handleChangedValue" name="kit_barcode" id="kit_barcode" placeholder="Kit Barcode" label="Kit Barcode*"
                v-model="formValues.kit_barcode" :validation="props.type !== 'orderTest' ? 'required': ''"/>
            </div>
          </div>
        </div>
        <div class="container-fluid form-card">
          <div class="form-card-title">Patient History</div>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 pt-2">
            <div class="col mb-4">
              <div style="font-size:14px">Diagnosis</div>
              <v-autocomplete :disabled="batchEntities.length > 0" class="patient-select" :items="diseaseNameOptions" v-model="formValues.diagnosis" @change="handleChangedValue"
                variant="solo-filled" density="compact" :item-props="itemDiseaseNameProps"
                placeholder="Select Diagnosis Name">
                <template v-slot:item="{ props, item }">
                  <v-list-item style="min-height: 40px;padding:0px 4px;width:300px" v-bind="props"
                    :title="item.raw.label"></v-list-item>
                </template>
              </v-autocomplete>
            </div>
            <div class="col mb-4" v-if="sub_diagnosisOptions.length > 0">
              <!-- <FormKit type="select" name="sub_diagnosis" id="sub_diagnosis" placeholder="Enter Sub Diagnosis"
                label="Sub Diagnosis" :options="sub_diagnosisOptions" v-model="formValues.sub_diagnosis" /> -->
              <div style="font-size:14px">Sub Diagnosis</div>
              <v-autocomplete :disabled="batchEntities.length > 0" class="patient-select" :items="sub_diagnosisOptions" v-model="formValues.sub_diagnosis" @change="handleChangedValue"
                variant="solo-filled" density="compact" :item-props="itemSubDiagnosisProps"
                placeholder="Select Sub Diagnosis">
                <template v-slot:item="{ props, item }">
                  <v-list-item style="min-height: 40px;padding:0px 4px;width:300px" v-bind="props"
                    :title="item.raw.label"></v-list-item>
                </template>
              </v-autocomplete>
            </div>
            <div class="col mb-4">
              <FormKit type="text" :disabled="batchEntities.length > 0" name="stage_at_time_of_testing" id="stage_at_time_of_testing"
                placeholder="Enter Stage at Time of Testing" label="Stage at Time of Testing"
                v-model="formValues.stage_at_time_of_testing" @change="handleChangedValue" />
            </div>
            <div class="col mb-4" v-if="diseasestatusOptions.length > 0">
              <FormKit type="select"  :disabled="batchEntities.length > 0" name="disease_status" id="disease_status" placeholder="Enter Disease Status"
                :options="diseasestatusOptions" label="Disease Status" v-model="formValues.disease_status" @change="handleChangedValue" />
            </div>
            <div class="col mb-4">
              <FormKit type="text" :disabled="batchEntities.length > 0" name="prior_current_theraphy" id="prior_current_theraphy"
                placeholder="Enter Prior/Current Therapies" label="Prior/Current Therapies"
                v-model="formValues.prior_current_theraphy" @change="handleChangedValue" />
            </div>
            <div class="col mb-4">
              <FormKit type="select" :disabled="batchEntities.length > 0" name="disease_progression" id="disease_progression"
                placeholder="Enter Disease Progression" :options="['Yes', 'NO']"
                label="Disease Progression (If Tested Previously)" v-model="formValues.disease_progression" @change="handleChangedValue" />
            </div>
            <div class="col-12 mb-4">
              <FormKit type="text" :disabled="batchEntities.length > 0" name="attachments" id="attachments" placeholder="Enter Attachments" label="Attachments"
                v-model="formValues.attachments" @change="handleChangedValue" />
            </div>
          </div>
        </div>
        <div class="container-fluid form-card">
          <div class="form-card-title">Patient's Medical History</div>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 pt-2">
            <div class="col mb-4">
              <FormKit type="select" :disabled="batchEntities.length > 0" name="personal_history_of_cancer" id="personal_history_of_cancer"
                placeholder="Select Personal History of Cancer" :options="['Yes', 'No']"
                label="Personal History of Cancer" v-model="formValues.personal_history_of_cancer" @change="handleChangedValue" />
            </div>
            <div class="col mb-4">
              <FormKit type="select" :disabled="batchEntities.length > 0" name="family_history_of_cancer" id="family_history_of_cancer"
                placeholder="Select Family History of Cancer" :options="['Yes', 'No']" label="Family History of Cancer"
                v-model="formValues.family_history_of_cancer" @change="handleChangedValue" />
            </div>
            <div class="col mb-4">
              <FormKit type="select" :disabled="batchEntities.length > 0" name="prior_genetic_testing" id="prior_genetic_testing"
                placeholder="Select Prior Genetic Testing" :options="['Yes', 'No']" label="Prior Genetic Testing"
                v-model="formValues.prior_genetic_testing" @change="handleChangedValue" />
            </div>
            <div class="col-12 col-md-12 mb-4">
              <FormKit type="text" :disabled="batchEntities.length > 0" name="cancer_description" id="cancerDescription" placeholder="Enter Additional Information (if any)"
                label="Additional Information" v-model="formValues.cancer_description" @change="handleChangedValue" />
            </div>
          </div>
        </div>
        <div class="container-fluid form-card">
          <div class="form-card-title">Clinician Information</div>
          <div class="row row-cols-2 row-cols-sm-2 row-cols-md-3 pt-2">
            <div class="col mb-4">
              <div>Physician Full Name</div>
              <v-autocomplete :disabled="batchEntities.length > 0" class="patient-select" :items="physicianOptions" v-model="formValues.physician_name"
                variant="solo-filled" density="compact" @update:modelValue="handlePhysician"
                :item-props="itemPhysicanProps" placeholder="Select Physician Name">
                <template v-slot:item="{ props, item }">
                  <v-list-item style="min-height: 40px;padding:0px 4px;" v-bind="props"
                    :title="item.raw.name"></v-list-item>
                </template>
              </v-autocomplete>
            </div>
            <div class="col mb-4">
              <div>Facility/Hospital Name</div>
              <v-autocomplete :disabled="batchEntities.length > 0" class="patient-select" :items="PhysicianOrgList" v-model="formValues.facility"
                variant="solo-filled" density="compact" :item-props="itemPhysicanOrgProps"
                placeholder="Select Facility/Hospital Name">
                <template v-slot:item="{ props, item }">
                  <v-list-item style="min-height: 40px;padding:0px 4px;" v-bind="props"
                    :title="item.raw.name"></v-list-item>
                </template>
              </v-autocomplete>
            </div>
            <div class="col mb-4">
              <FormKit type="email"  name="physician_email" id="physician_email" disabled="true" readOnly placeholder="Enter Email" label="Email"
                validation="email" v-model="formValues.physician_email" />
            </div>
            <div class="col mb-4">
              <FormKit type="text" name="Cphone" id="cphone" disabled="true" readOnly placeholder="Enter Mobile No" label="Mobile No"
                v-model="formValues.phone" />
            </div>
            <div class="col mb-4">
              <FormKit type="text" name="address" id="address" disabled="true"  readOnly placeholder="Enter Address" label="Address"
                v-model="formValues.address" />
            </div>
            <div class="col mb-4">
              <FormKit type="text" name="zipcode" id="zipcode" disabled="true" readOnly placeholder="Enter Postal Code" label="Postal Code"
                v-model="formValues.zipcode" />
            </div>
            <div class="col mb-4">
              <FormKit type="text" name="city" id="city" disabled="true" readOnly placeholder="Enter city" label="City"
                v-model="formValues.city" />
            </div>
            <div class="col mb-4">
              <FormKit type="text" name="state" id="state" disabled="true" readOnly placeholder="Enter State" label="State"
                v-model="formValues.state" />
            </div>
            <div class="col mb-4">
              <FormKit type="text" name="country" id="country" disabled="true" readOnly placeholder="Enter Country" label="Country"
                v-model="formValues.country" />
            </div>
          </div>
        </div>
        <div class="container-fluid form-card">
          <div class="form-card-title">Specimen</div>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 pt-2">
            <div class="col mb-4">
              <FormKit type="select" :disabled="batchEntities.length > 0" name="sample_type" id="sample_type" placeholder="Enter Sample*" label="Sample*"
                v-model="specimenValues.sample_type.value" @change="handleSample" validation="required"
                :options="sampleTypeOptions" />
            </div>
            <div class="col mb-4">
              <FormKit type="select" :disabled="batchEntities.length > 0" name="specimen" v-model="specimenValues.specimen.value" id="specimen"
                placeholder="Enter Specimen*" label="Specimen*" validation="required" @change="handleSpecimen"
                :options="specimenOptions" />
            </div>
            <div class="col mb-4">
              <FormKit type="select" :disabled="batchEntities.length > 0" name="sample_category" id="sample_category" placeholder="Select Sample Category"
                label="Sample Category" v-model="specimenValues.sample_category.value" @change="handleChangedValue" :options="sampleCategoryOptions" />
            </div>
            <div class="col mb-4">
              <FormKit type="text" :disabled="batchEntities.length > 0" name="clinical_procedure" id="clinical_procedure"
                placeholder="Enter Clinical Procedure" label="Clinical Procedure"
                v-model="specimenValues.clinical_procedure" @change="handleChangedValue" />
            </div>
            <div class="col mb-4">
              <FormKit type="text" :disabled="batchEntities.length > 0" name="location" id="location" placeholder="Enter Location" label="Location"
                v-model="specimenValues.location" @change="handleChangedValue" />
            </div>
            <div class="col mb-4"   v-if="((props.type === 'editTest' && formValues.status === 'Accessioned')|| (props.type === 'accession'))">
              <FormKit type="select" :disabled="batchEntities.length > 0" name="pathologist" id="pathologist" v-model="formValues.pathologist" @change="handleChangedValue"
                placeholder="Enter Submitting Pathologist" label="Submitting Pathologist" :options="pathologistOptions" />
            </div>
            <div class="col mb-4" v-if="((props.type !== 'orderTest' && formValues.status != 'Ordered') || props.type === 'sampleCollection')">
              <FormKit type="text" :disabled="batchEntities.length > 0" name="collected_by" id="collected_by" v-model="specimenValues.collected_by" @change="handleChangedValue" placeholder="Enter Sample Collected By"
                label="Sample Collected By*" :validation="props.type === 'sampleCollection' ? 'required': ''" />
            </div>
            <div class="col mb-4" v-if="((props.type !== 'orderTest' && formValues.status != 'Ordered') || props.type === 'sampleCollection')">
              <FormKit type="datetime-local" :disabled="batchEntities.length > 0" name="collection_date" id="collection_date"
                placeholder="Enter Collection TimeStamp" label="Sample Collection TimeStamp*"
                v-model="formValues.collection_date" @change="handleChangedValue" :validation="(props.type === 'sampleCollection' || props.type === 'accession') ? 'required': ''" />
            </div>
            <div class="col mb-4"
            v-if="((props.type === 'editTest' && (formValues.status === 'Accessioned' || formValues.status === 'Problem Case'))|| (props.type === 'accession'))">
              <div style="display: flex; justify-content: space-between">
                <FormKit type="select" :disabled="batchEntities.length > 0" name="sample_status" id="sample_status" placeholder="Select Sample Status"
                  label="Sample Status*" :options="['Accessioned', 'Destroyed', 'Discarded']" v-model="specimenValues.sample_status" @change="handleChangedValue" :validation="props.type !== 'orderTest' ? 'required': ''" />
                <FormKit type="number" :disabled="batchEntities.length > 0"  style="margin-left: 6px" v-model="specimenValues.case_number" @change="handleChangedValue" name="case_number" id="case_number" placeholder="Enter Case"
                  label="Enter Case" />
              </div>
            </div>
            <div class="col mb-4" v-if="((props.type !== 'orderTest' && formValues.status != 'Ordered') || props.type === 'sampleCollection')">
              <FormKit type="text" :disabled="batchEntities.length > 0" name="sampleBarcode" id="sampleBarcode" @input="handleSampleBarcode"  @change="handleChangedValue" placeholder="Enter Sample Barcode" :validation="props.type !== 'orderTest' ? 'required': ''"
                label="Sample Barcode*" v-model="samplebarcode" />
            </div>
            <div class="col mb-4"  v-if="((props.type === 'editTest' && (formValues.status === 'Accessioned' || formValues.status === 'Problem Case'))|| (props.type === 'accession'))">
              <FormKit type="text" :disabled="batchEntities.length > 0" name="received_by" id="received_by" v-model="specimenValues.received_by"   @change="handleChangedValue"
                placeholder="Enter Sample Received By" label="Sample Received By*" :validation="props.type === 'accession' ? 'required': ''" />
            </div>
            <div class="col mb-4" v-if="((props.type === 'editTest' && (formValues.status === 'Accessioned' || formValues.status === 'Problem Case'))|| (props.type === 'accession'))">
              <FormKit type="datetime-local" :disabled="batchEntities.length > 0" :min="formValues.collection_date" name="received_date" id="received_date" @input="validateDatetime" placeholder="Enter Received TimeStamp"
                label="Sample Received TimeStamp*" v-model="formValues.received_date" @change="handleChangedValue" :validation="props.type === 'accession' ? 'required': ''" />
            </div>
            <div class="col mb-4" v-show="specimenValues.sample_status !== 'Accessioned' && ((props.type === 'editTest' && (formValues.status === 'Accessioned' || formValues.status === 'Problem Case')) || (props.type === 'accession'))">
              <FormKit type="text" :disabled="batchEntities.length > 0" minlength="8" name="discard_reason" id="discard_reason" v-model="specimenValues.discard_reason" @change="handleChangedValue" placeholder="Enter Discard/Destroy Reason" label="Discard/Destroy Reason*" :validation="(specimenValues.sample_status !== 'Accessioned' && specimenValues.sample_status !== '') ? 'required': ''" />
            </div>
          </div>
        </div>

        <div class="container-fluid form-card">
          <div class="form-card-title">Test Menu</div>
          <div class="row row-cols-3 pt-2">
            <div class="col mb-4" v-for="(item, index) in tests" :key="index">
              <div class="d-flex align-items-center">
                <input :disabled="batchEntities.length > 0" type="checkbox" class="test-checkbox" :id="item.displayLabel" :value="item.value"
                  v-model="item.value" @change="handleCheckboxChange(index, item.value)" />
                <span>{{ item.displayLabel }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid form-card">
          <div class="form-card-title">Patient Consent</div>
          <div class="row row-cols-2 pt-2">
            <div class="col mb-4">
              <FormKit type="text" :disabled="batchEntities.length > 0" name="patient_consent_collect_sample" id="patient_consent_collect_sample"
                placeholder="Enter Collect Sample" label="Collect Sample"
                v-model="formValues.patient_consent_collect_sample" @change="handleChangedValue" />
            </div>
            <div class="col mb-4">
              <FormKit type="text" :disabled="batchEntities.length > 0" name="patient_consent_store_sample" id="patient_consent_store_sample"
                placeholder="Enter Store Sample" label="Store Sample" v-model="formValues.patient_consent_store_sample" @change="handleChangedValue"/>
            </div>
            <div class="col-12 mb-4">
              <FormKit type="text" :disabled="batchEntities.length > 0" name="patient_consent_required_person_information"
                id="patient_consent_required_person_information"
                placeholder="Enter Share Information with Required Persons involved in the Testing Process"
                label="Share Information with Required Persons involved in the Testing Process"
                v-model="formValues.patient_consent_required_person_information" @change="handleChangedValue" />
            </div>
          </div>
        </div>
        <div class="container-fluid form-card">
          <div class="form-card-title">Physician Consent</div>
          <div class="row row-cols-2 pt-2">
            <div class="col mb-4">
              <FormKit type="text" :disabled="batchEntities.length > 0" name="physician_consent_collect_sample" id="physician_consent_collect_sample"
                placeholder="Enter Collect Sample" label="Collect Sample"
                v-model="formValues.physician_consent_collect_sample" @change="handleChangedValue" />
            </div>
            <div class="col mb-4">
              <FormKit type="text" :disabled="batchEntities.length > 0" name="physician_consent_perform_test" id="physician_consent_perform_test"
                placeholder="Enter Perform Test" label="Perform Test"
                v-model="formValues.physician_consent_perform_test" @change="handleChangedValue" />
            </div>
          </div>
        </div>
      </FormKit>
    </div>
    <div class="d-flex align-items-center justify-content-end my-3">
      <div class="d-flex align-items-center">
        <FormKit type="button" @click="handleCancel" style="background-color: #007bff !important" label="Cancel" />
        <FormKit type="submit" v-if="batchEntities.length === 0 && formValues.status != 'Closed'" form="my-form-order" style="background-color: #007bff !important" label="Save" />
      </div>
    </div>
  </div>
  <EsignatureModal v-if="viewStore.eSignatureModal" :handleSubmit="handleSubmit" :text=EsignatureText() />
  <ConfirmDialog :showDialog="confirmDialog" :closeDialog="closeDialog" router="/orderTestList" />
</template>
<script setup>
import { FormKit } from '@formkit/vue';
import { useRouter } from 'vue-router';
import { ref, watchEffect, watch, onMounted } from 'vue';
import { patientController } from '../../Controllers/patientController';
import { useStudyStore } from '../../stores/studyStore';
import { useAlertStore } from '../../stores/alertStore';
import { useFilterStore } from '../../stores/filterStore';
import EsignatureModal from '../../components/EsignatureModal.vue';
import { useViewStore } from '../../stores/viewStore';
import ConfirmDialog from '../../components/ConfirmDialog.vue';
import { OrderTestController } from '../../Controllers/OrderTestController';
import { SampleController } from '../../Controllers/sampleController';
const props = defineProps({
  type: String,
  path: String
})
const router = useRouter();
const alertStore = useAlertStore();
const filterStore = useFilterStore();
const specimenTestsMapping = ref([]);
const orderTestModal = ref([]);
const orderTestDetails = ref([]);
const patientName = ref(null);
const patientValue = ref(null);
const sampleTypeOptions = ref([]);
const sampleCategoryOptions = ref([]);
const physicianOptions = ref([]);
const pathologistOptions = ref([]);
const diseasestatusOptions = ref([]);
const specimenOptions = ref([]);
const patientOptions = ref([]);
const diseaseNameOptions = ref([]);
const sub_diagnosisOptions = ref([]);
const PatientDetails = ref([]);
const tests = ref([]);
const samplebarcode = ref('');
const patientData = ref([]);
const studyStore = useStudyStore();
const viewStore = useViewStore();
const accessionId = ref(null);
const subjectId = ref(null);
const PhysicianOrgList = ref([]);
const confirmDialog = ref(false);
const data = ref([]);
const alertMessage = ref('');
const showAlert =ref(false);
let caseSampleId = ref(null);
const batchEntities = ref([])
const formValues = ref({
  diagnosis: '',
  sub_diagnosis: '',
  stage_at_time_of_testing: '',
  disease_status: '',
  prior_genetic_testing: '',
  prior_current_theraphy: '',
  disease_progression: '',
  attachments: '',
  status:'',
  personal_history_of_cancer: '',
  family_history_of_cancer: '',
  cancer_description: '',
  physician_name: null,
  physician_email: '',
  facility:null,
  phone: '',
  address: '',
  zipcode: '',
  city: '',
  state: '',
  country: '',
  collection_date: '',
  received_date: '',
  kit_barcode: '',
  pathologist: "",
  patient_consent_store_sample: '',
  patient_consent_collect_sample: '',
  physician_consent_collect_sample: '',
  patient_consent_required_person_information: '',
  physician_consent_perform_test: '',
})
const specimenValues = ref({
  sample_type: {
    label: '',
    value: '',
  },
  specimen: {
    label: '',
    value: '',
  },
  sample_category: {
    label: '',
    value: '',
  },
  clinical_procedure: '',
  sample_status: '',
  location: '',
  case_number:'',
  received_by:'',
  discard_reason:'',
  collected_by:'',
})
const PatientValues = ref({
  date_of_birth: '',
  gender: {
    label: '',
    value: ''
  },
  email_id: '',
  phone: '',
  alternate_number: '',
  address: '',
  city: '',
  state: '',
  zipcode: '',
  country: '',
  disease_name: {
    label: '',
    value: '',
  }
})
let hasChanges = false;

const handleSampleBarcode=(value)=>{
 if((value !== formValues.value.kit_barcode) && formValues.value.kit_barcode){
  showAlert.value = true
  alertMessage.value = 'Sample barcode and kit barcode must be the same'
 }
 else {
  showAlert.value = false
  alertMessage.value = ''
 }
}
const handleKitBarcode=(value)=>{
  if((value !== samplebarcode.value) && samplebarcode.value){
    showAlert.value = true
   alertMessage.value = 'Sample barcode and kit barcode must be the same'
 }
 else {
  showAlert.value = false
  alertMessage.value = ''
 }
}
const validateDatetime = (e) => {
      const selectedDate = (formValues.value.collection_date);
      if (e  <= selectedDate) {
        alertStore.error("Received TimeStamp should be greater than the collection TimeStamp");
      }
};
const SaveOrderTest = (fields) => {
  const validateTests = tests.value.some((test) => test.value === true);
  if (patientName.value === '' || patientName.value == null) {
    alertStore.error('Please Select Valid Patient Name');
  } else if (!validateTests) {
    alertStore.error('At least Select one Test');
  } else if (((props.type !== 'orderTest' && formValues.value.status !== 'Ordered') || props.type === 'sampleCollection') && (formValues.value.kit_barcode !== samplebarcode.value)) {
    showAlert.value = true;
    alertMessage.value = 'Sample barcode and kit barcode must be the same';
  } else  if ((((props.type === 'editTest' && (formValues.value.status === 'Accessioned' || formValues.value.status === 'Problem Case'))|| (props.type === 'accession'))) && (formValues.value.received_date <= formValues.value.collection_date)) {
    alertStore.error('Received TimeStamp should be greater than the collection TimeStamp');
  }
  else {
    data.value = fields; // stored all the entered values from formkit
    viewStore.getEsignatureModal(true);
  }
};

const getBatchEntityDetails=async(ids)=>{
  const inputModal={
  batchModel: {
    studyId: [
    studyStore.selectedStudy
    ],
    pagination: {
      sort: "asc.batch_entity_id",
     search: `entityId=${ids}`
    }
  }
  }
  const response = await SampleController.getBatchEntityDetails(inputModal);
  if(response){
     batchEntities.value = response?.data
  }
}
const getPhysicianOrg = async (id) => {
  hasChanges = true;
  const inputModel = {
    UserOrgModel: {
      userMasterId: id
    }
  }
  const response = await OrderTestController.getPhysicianOrg(inputModel);
  if (response?.data?.userMasterModel?.orgMapping) {
    PhysicianOrgList.value = response?.data?.userMasterModel?.orgMapping.map(item => ({
      name: item.organizationName.trim(),
      id: item.organizationId,
    }));
    if (response?.data?.userMasterModel?.orgMapping?.length === 1) {
      formValues.value.facility = PhysicianOrgList.value[0];
    }
    response?.data?.userMasterModel?.fields?.forEach(item => {
        const { name, value } = item;
        if (name && value) {
          const trimmedName = name.trim();
          switch (trimmedName) {
            case 'city':
              if (!formValues.value.city) formValues.value.city = value;
              break;
            case 'email':
              if (!formValues.value.physician_email) formValues.value.physician_email = value.trim();
              break;
            case 'country':
              if (!formValues.value.country) formValues.value.country = value.trim();
              break;
            case 'zipCode':
              if (!formValues.value.zipcode) formValues.value.zipcode = value.trim();
              break;
            case 'state':
              if (!formValues.value.state) formValues.value.state = value.trim();
              break;
            case 'address1':
              if (!formValues.value.address) formValues.value.address = value.trim();
              break;
            case 'phone':
              if (!formValues.value.phone) formValues.value.phone = value.trim();
              break;
            default:
              break;
          }
        }
      });
  }
  else {
    PhysicianOrgList.value = []
  }
}
const handlePhysician = (item) => {
  formValues.value.facility = null
  formValues.value.physician_email = ''
  formValues.value.phone = '';
  formValues.value.state = '';
  formValues.value.country = '';
  formValues.value.city = '';
  formValues.value.zipcode = '';
  formValues.value.address = ''
  if (item && item.id) {
    getPhysicianOrg(item.id)
  }
}

const getSelectedOrg = () => {
  if (physicianOptions?.value) {
    physicianOptions?.value?.map((item) => {
      if (item.name === formValues?.value?.physician_name) {
        getPhysicianOrg(item.id);
      }
    })
  }
}

const handlePatientName = (item) => {
  if (item && item.id) {
    hasChanges = true;
    getPatientData(item.id)
  }
}
const itemPatientProps = (item) => {
  return {
    title: item.name
  }
}
const itemDiseaseNameProps = (item) => {
  return {
    title: item.label
  }
}
const itemPhysicanProps = (item) => {
  return {
    title: item.name,
    id: item.id
  }
}
const itemPhysicanOrgProps = (item) => {
  return {
    title: item.name,
    id: item.id
  }
}
const itemSubDiagnosisProps = (item) => {
  return {
    title: item.label
  }
}
const resetValue = () => {
  patientName.value = null
  patientValue.value = ''
  tests.value = []
  samplebarcode.value = ''
  formValues.value = {
    diagnosis: null,
    sub_diagnosis: null,
    stage_at_time_of_testing: '',
    disease_status: '',
    prior_genetic_testing: '',
    disease_progression: '',
    attachments: '',
    personal_history_of_cancer: '',
    family_history_of_cancer: '',
    cancer_description: '',
    physician_name: null,
    physician_email: '',
    facility: null,
    collection_date: '',
    received_date: '',
    kit_barcode: ''
  }
  PatientValues.value = {
    date_of_birth: '',
    gender: {
      label: '',
      value: ''
    },
    email_id: '',
    phone: '',
    alternate_number: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    disease_name: {
      label: '',
      value: ''
    }
  }
  specimenValues.value = {
    sample_type: {
      label: '',
      value: '',
    },
    specimen: {
      label: '',
      value: '',
    },
    sample_category: {
      label: '',
      value: '',
    },
    clinical_procedure: '',
    sample_status: '',
    location: '',
  }
}
onMounted(() => {
  filterStore.setParams('')
});
const handleSample = (e) => {
  hasChanges = true;
  tests.value = []
  specimenValues.value.specimen.value = ''
  if (e.target.value) {
    const selectedSampleTypeData = specimenTestsMapping.value.filter(
      (item) => item.sampleType === e.target.value
    )
    specimenOptions.value = [
      ...new Set(
        selectedSampleTypeData.map((item) =>
          item.specimen !== undefined && item.specimen !== null ? item.specimen : ''
        )
      )
    ]
  } else {
    specimenOptions.value = []
  }
}
const handleSpecimen = (e) => {
  hasChanges = true;
  const specimenType = specimenValues.value ? specimenValues.value.sample_type.value : null;
  if (e.target.value) {
    specimenTestsMapping.value.forEach((item) => {
      if (item.sampleType === specimenType && item.specimen === e.target.value) {
        tests.value = item.tests;
      }
    });
  }
};

const getSpecimen = () => {
  if (specimenValues.value.sample_type.value) {
    const selectedSampleTypeData = specimenTestsMapping.value.filter(
      (item) => item.sampleType === specimenValues.value.sample_type.value
    )
    specimenOptions.value = [
      ...new Set(
        selectedSampleTypeData.map((item) =>
          item.specimen !== undefined && item.specimen !== null ? item.specimen : ''
        )
      )
    ]
  } else {
    specimenOptions.value = []
  }
}
// to get patientDetails by subjectid
const getPatientData = async (subjectid) => {
  if (subjectid) {
    const inputModel = {
      subjectModel: {
        subject: {
          subjectId: Number(subjectid),
          studyId: [studyStore.selectedStudy]
        }
      }
    }
    const response = await patientController.getPatient(inputModel);
    if (response && response?.attributes) {
      PatientDetails.value = response.attributes
      patientValue.value = response?.subject?.subjectId;
      for (const key in PatientValues.value) {
        PatientValues.value[key] = getPatientAttributeValue(key)
      }
    }
  }
}
const handleSubmit = async () => {
  const inputModel = {
    eSignatureModel: {
      username: viewStore.eSignatureForm.username,
      password: viewStore.eSignatureForm.password,
      changeReasonDetail: viewStore.eSignatureForm.changeReasonDetail
    }
  }
  if (accessionId.value && props.type !== 'orderTest') {
    orderTestModal.value.accessionId = orderTestDetails.value.accessionId
    orderTestModal.value.accessionNumber = orderTestDetails.value.accessionNumber
    orderTestDetails.value.subject.samples[0].caseSampleId = caseSampleId.value;
  }
  orderTestModal.value.subject.studyId = Number(studyStore.selectedStudy)
  orderTestModal.value.subject.subjectId = patientValue.value;
  const ProblemCase = (specimenValues.value.sample_status === 'Destroyed' || specimenValues.value.sample_status === 'Discarded') ? 'Problem Case' : undefined;
  if (accessionId.value && props.type !== 'orderTest') {
    const status = orderTestDetails.value.attributes.filter((item) => item.name === 'status')[0].value;
    switch (props.type) {
      case 'editTest':
        orderTestModal.value.attributes.filter((item) => item.name === 'status')[0].value = ProblemCase !== undefined ? ProblemCase : specimenValues.value.sample_status === 'Accessioned' ? 'Accessioned' : status;
        break;
      default:
        orderTestModal.value.attributes.filter((item) => item.name === 'status')[0].value =
        status === 'Ordered' ? 'Collected' : (ProblemCase !== undefined ? ProblemCase : 'Accessioned');
    }
  } else {
    switch (props.type) {
      case 'orderTest':
        orderTestModal.value.attributes.filter((item) => item.name === 'status')[0].value = 'Ordered';
        break;
      case 'sampleCollection':
        orderTestModal.value.attributes.filter((item) => item.name === 'status')[0].value = 'Collected';
        break;
      default:
        orderTestModal.value.attributes.filter((item) => item.name === 'status')[0].value = ProblemCase !== undefined ? ProblemCase : 'Accessioned';
    }
  }
  if (formValues.value.physician_name) {
    orderTestModal.value.attributes
      .find((item) => item.name === 'physician_name').value = {
      label: formValues?.value?.physician_name?.name?.trim(),
      value: formValues?.value?.physician_name?.name?.trim(),
    }
  }
  if (formValues.value.facility) {
    orderTestModal.value.attributes.find(item => item.name === 'facility').value = formValues.value.facility.name;
  }
  for (const key in formValues.value) {
    const attribute = orderTestModal.value.attributes.find((item) => item.name === key)
      ? orderTestModal.value.attributes.find((item) => item.name === key)
      : {}
    if (((attribute && attribute.dataType === 'text') || attribute.dataType === 'date') && key !== 'facility' && key !== 'status') {
      attribute.value = formValues.value[key] ? formValues.value[key] : ''
    }
    else if (attribute && attribute.dataType === 'select' && key !== 'physician_name') {
      attribute.value = {
        label: formValues.value[key] ? formValues.value[key] : '',
        value: formValues.value[key] ? formValues.value[key] : ''
      }
    }
  }
  for (const key in specimenValues.value) {
    const attribute = orderTestModal?.value?.subject?.samples[0]?.attributes?.find((item) => item.name === key)
      ? orderTestModal?.value?.subject?.samples[0]?.attributes?.find((item) => item.name === key)
      : {}
    if ((attribute && attribute.dataType === 'text')) {
      attribute.value = specimenValues.value[key] ? specimenValues.value[key] : ''
    }
    else if (attribute && attribute.dataType === 'select') {
      attribute.value = {
        label: specimenValues.value[key] ? specimenValues.value[key].value : '',
        value: specimenValues.value[key] ? specimenValues.value[key].value : ''
      }
    }
  }
  orderTestModal.value.subject.samples[0].tests = tests.value;
  orderTestModal.value.subject.samples[0].caseSampleId = caseSampleId.value;
  orderTestModal.value.subject.samples[0].sampleBarcode.value = samplebarcode.value
  inputModel.orderTestModel = orderTestModal.value;
  await patientController.saveOrderTest(inputModel, router, '/orderTestList')
}
watchEffect(
  async () => {
    const selectedStudy = studyStore.selectedStudy
    accessionId.value = localStorage.getItem('accessionId')
    subjectId.value = localStorage.getItem('subjectId')
    if (props.path === 'create' || props.path === 'Create') {
      resetValue()
    }
    if (selectedStudy) {
      if (accessionId.value) { // when accesion id is exist
        const inputModel = {
          orderTestModel: {
            accessionId: Number(accessionId.value),
            studyId: studyStore.selectedStudy
          }
        }
        const response = await patientController.getOrderTestDetail(inputModel);
        orderTestDetails.value = response && response?.data && response?.data?.orderTestModel ? response.data.orderTestModel : []
        for (const key in formValues.value) {
          formValues.value[key] = getAttributeValue(key)
        }
        for (const key in specimenValues.value) {
          specimenValues.value[key] = getSampleAttributeValue(key)
        }
        tests.value = orderTestDetails?.value?.subject?.samples[0]?.tests;
        caseSampleId.value = orderTestDetails?.value?.subject?.samples[0].caseSampleId;
        samplebarcode.value = orderTestDetails?.value?.subject?.samples[0]?.sampleBarcode.value;
        getBatchEntityDetails(orderTestDetails?.value?.subject?.samples[0]?.caseSampleId)
      }
      const inputModel = {
        studyId: Number(studyStore.selectedStudy),
        orderFrom:
          props.type === 'orderTest'
            ? 'orderTest'
            : props.type === 'sampleCollection'
              ? 'sample'
              : 'accession'
      }
      const response = await patientController.getOrderTestModel(inputModel);
      orderTestModal.value = response.data.orderTestModel;

      //sample category options
      sampleCategoryOptions.value = response?.data && response?.data?.sampleAttributesGroupMapping.find(item => item.name === 'sample_category').enumlist.map(enumItem => enumItem.value);
    
      //specimenList
      specimenTestsMapping.value = response?.data?.specimenTestsMapping;
      sampleTypeOptions.value = [...new Set(response?.data?.specimenTestsMapping
        .filter((item) => item.sampleType != null)
        .map((item) => item.sampleType))];
      physicianOptions.value =
        (
          response?.data?.orderTestModel &&
          response?.data?.orderTestModel?.attributes &&
          response?.data?.orderTestModel?.attributes.filter(
            (item) => item && item.name === 'physician_name'
          )[0]?.enumlist
        )
          ? response?.data?.orderTestModel?.attributes
            .filter((item) => item && item.name === 'physician_name')[0]?.enumlist
            .map((item) => ({
              name: item.label.trim() || '',
              id: item.id || '',
            }))
          : [];
      pathologistOptions.value = (
        response?.data?.orderTestModel?.attributes
          ?.find(item => item.name === 'pathologist')
          ?.enumlist
          ?.map(item => ({
            label: item.label ?? '',
            value: item.value ?? ''
          }))
      ) || [];
      diseasestatusOptions.value = (
        response?.data?.orderTestModel?.attributes
          ?.filter(item => item.name === 'disease_status')[0]
          ?.enumlist
      ) || [];
      diseaseNameOptions.value = (
        response?.data?.orderTestModel?.attributes
          ?.filter(item => item.name === 'diagnosis')[0]
          ?.enumlist
      ) || [];
      sub_diagnosisOptions.value = (
        response?.data?.orderTestModel?.attributes
          ?.filter(item => item.name === 'sub_diagnosis')[0]
          ?.enumlist
      ) || [];
      
      //patient getdata
      const patientModel = {
        subjectModel: {
          pagination: {
            sort: 'desc.subjectId',
            search: ''
          },
          includeMeta: true,
          studyFilter: [studyStore.selectedStudy]
        }
      }
      patientData.value = await patientController.getPatients(patientModel)
      if (patientData.value.data && patientData.value.data.length > 0) { //patient list 
        const patientsArray = patientData.value.data.map((patient) => ({
          name: patient.full_name || '',
          id: patient.subjectId || ''
        })).filter(patient => patient.name !== '' && patient.id !== '');
        patientOptions.value = patientsArray.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (accessionId.value) {
        patientValue.value = orderTestDetails?.value?.subject?.subjectId || ''
        const foundItem = patientOptions?.value?.find((item) => item.id === orderTestDetails?.value?.subject?.subjectId);
        patientName.value = foundItem ? { name: foundItem.name, id: foundItem.id } : null;
        if (patientValue.value) {
          getPatientData(orderTestDetails.value.subject.subjectId)
        }
      } else if (subjectId.value) {
        patientValue.value = Number(subjectId.value)
        const foundItem = patientOptions?.value?.find((item) => item.id === Number(subjectId.value));
        patientName.value = foundItem ? { name: foundItem.name, id: foundItem.id } : null;
        if (patientValue.value) {
          getPatientData(subjectId.value)
        }
      }
    }
  },
  { immediate: true }
)
const handleChangedValue = () => {
  hasChanges = true;
}
const handleCheckboxChange = (index, value) => {
  tests.value[index][value] = !tests.value[index][value]
  hasChanges = true;
}
const getAttributeValue = (value) => {
  const attribute = orderTestDetails?.value?.attributes?.find((attr) => attr.name === value);
  if (value === 'physician_name' || value === 'facility') {
  if(attribute.value){
    return {
      name: attribute?.value,
      id: attribute?.value,
    };
  }
  else {
     return null
  }
  } else {
    return attribute ? (attribute.type === 'select' ? attribute.value.value : attribute.value) : null
  }
};

const getSampleAttributeValue = (value) => {
  const attribute = orderTestDetails?.value?.subject?.samples[0]?.attributes?.find((attr) => attr.name === value);
  return attribute ? (attribute.type === 'select' ? attribute.value.value : attribute.value) : null
};

const getPatientAttributeValue = (value) => {
  const attribute = PatientDetails.value.find((attr) => attr.name === value)
  if (value === 'disease_name' && !formValues.value.diagnosis) {
    if(attribute.value.value){
      return formValues.value.diagnosis = attribute.value.value
    }
    else {
      return formValues.value.diagnosis = null
    }
  }
  return attribute.value ? attribute.value : null
}

const handleCancel = () => {
  if (hasChanges) {
    confirmDialog.value = true;
  } else {
    router.push('/orderTestList')
  }
}

const closeDialog = () => {
  confirmDialog.value = false
}
watch(
  () => studyStore.selectedStudy,
  (newSelectedStudy, oldSelectedStudy) => {
    if (newSelectedStudy !== oldSelectedStudy) {
      resetValue()
    }
  }
)

watch(
  () => formValues.value.physician_name,
  (newSelectedStudy, oldSelectedStudy) => {
    if (newSelectedStudy !== oldSelectedStudy) {
      getSelectedOrg()
    }
  }
)
watch(
  () => specimenTestsMapping.value,
  (newSelectedStudy, oldSelectedStudy) => {
    if (newSelectedStudy !== oldSelectedStudy) {
      getSpecimen();
    }
  }
)

const EsignatureText = () => {
  switch (props.type) {
    case 'orderTest':
      return 'I am creating Order Test';
    case 'sampleCollection':
      return 'I am creating sample collection';
      case 'accession':
      return 'I am creating Accession';
      case 'editTest':
      return 'I am  editing order test';
    default:
      return '';
  }
}
</script>
<style scoped>
.test-checkbox {
  height: 18px;
  width: 18px;
  margin-right: 5px;
}
.input-name{
  background: #F4F3F3 !important;
    padding: 10.5px;
    height: 34.97px;
    border-radius: 3.5px;
    width: 100%;
    opacity: 0.5;
}
</style>
