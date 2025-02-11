<template>
  <div class="d-flex justify-content-between flex-column page-view-ht">
    <div class="table-ht br-bt br-b">
      <FormKit
        type="form"
        id="my-form-patient"
        v-model="formData"
        :incomplete-message="false"
        :actions="false"
        @submit="addPatient"
        style="background-color: #f4f3f3"
      >
        <div class="container-fluid form-card mt-0">
          <div class="form-card-title">Primary Details</div>
          <div class="row row-cols-2 row-cols-sm-2 row-cols-md-3 pt-2">
            <div class="col mb-4">
              <FormKit
                type="text"
                name="first_name"
                id="firstName"
                placeholder="Enter First Name Here*"
                label="First Name*"
                validation="required"
                v-model="formValues.first_name"
                @change="handleChangedValue"
              />
            </div>
            <div class="col mb-4">
              <FormKit
                type="text"
                name="middle_name"
                id="middleName"
                placeholder="Enter Middle Name Here"
                label="Middle Name"
                v-model="formValues.middle_name"
                @change="handleChangedValue"
              />
            </div>
            <div class="col mb-4">
              <FormKit
                type="text"
                name="last_name"
                id="lastName"
                placeholder="Enter Last Name Here*"
                label="Last Name*"
                validation="required"
                v-model="formValues.last_name"
                @change="handleChangedValue"
              />
            </div>
            <div class="col mb-4">
              <FormKit
                type="date"
                name="date_of_birth"
                id="dob"
                placeholder="Enter DOB"
                label="DOB"
                v-model="formValues.date_of_birth"
                @change="handleChangedValue"
                :max="getCurrentDate()"
              />
            </div>
            <div class="col mb-4">
              <FormKit
                type="select"
                name="gender"
                id="gender"
                placeholder="Select Gender"
                label="Gender*"
                validation="required"
                :options="['Male', 'Female', 'Other']"
                v-model="formValues.gender.value"
                @change="handleChangedValue"
              />
            </div>
            <div class="col mb-4">
              <FormKit
                type="select"
                name="marital_status"
                id="maritalStatus"
                placeholder="Enter Marital Status"
                label="Marital Status"
                :options="['Married', 'Single']"
                v-model="formValues.marital_status.value"
                @change="handleChangedValue"
              />
            </div>
          </div>
        </div>
        <div class="container-fluid form-card">
          <div class="form-card-title">Contact Details</div>
          <div class="row row-cols-2 row-cols-sm-2 row-cols-md-3 pt-2">
            <div class="col mb-4">
              <FormKit
                type="email"
                name="email_id"
                id="email"
                placeholder="Enter Email"
                label="Email"
                validation="email"
                v-model="formValues.email_id"
                @change="handleChangedValue"
              />
            </div>
            <div class="col mb-4">
              <FormKit
                type="text"
                name="phone"
                id="MobileNo"
                placeholder="Enter Mobile No"
                label="Mobile No"
                validation="number"
                maxlength="25"
                v-model="formValues.phone"
                @change="handleChangedValue"
              />
            </div>
            <div class="col mb-4">
              <FormKit
                type="text"
                name="alternate_number"
                id="alternateNo"
                placeholder="Enter Alternate No."
                label="Alternate No."
                validation="number"
                maxlength="25"
                v-model="formValues.alternate_number"
                @change="handleChangedValue"
              />
            </div>
            <div class="col mb-4">
              <FormKit
                type="text"
                name="address"
                id="address"
                placeholder="Enter Address"
                label="Address"
                v-model="formValues.address"
                @change="handleChangedValue"
              />
            </div>
            <div class="col mb-4">
              <FormKit
                type="text"
                name="city"
                id="city"
                placeholder="Enter city"
                label="City"
                v-model="formValues.city"
                @change="handleChangedValue"
              />
            </div>
            <div class="col mb-4">
              <FormKit
                type="text"
                name="state"
                id="state"
                placeholder="Enter State"
                label="State"
                v-model="formValues.state"
                @change="handleChangedValue"
              />
            </div>
            <div class="col mb-4">
              <FormKit
                type="text"
                name="zipcode"
                id="postalCode"
                placeholder="Enter Postal Code"
                label="Postal Code"
                v-model="formValues.zipcode"
                @change="handleChangedValue"
              />
            </div>
            <div class="col mb-4">
              <FormKit
                type="text"
                name="country"
                id="country"
                placeholder="Enter Country"
                label="Country"
                v-model="formValues.country"
                @change="handleChangedValue"
              />
            </div>
          </div>
        </div>
        <div class="container-fluid form-card">
          <div class="form-card-title">Diagnosis</div>
          <div class="row row-cols-2 row-cols-sm-2 row-cols-md-2 pt-2">
            <div class="col mb-4">
              <FormKit
                type="select"
                name="disease_name"
                id="diseaseName"
                placeholder="Enter Disease Name"
                label="Disease Name"
                :options="diseaseNameOptions"
                v-model="formValues.disease_name.value"
                @change="handleChangedValue"
              />
            </div>
          </div>
        </div>
        <div class="container-fluid form-card">
          <div class="form-card-title">Other Information</div>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 pt-2">
            <div class="col mb-4">
              <FormKit
                type="text"
                name="emergency_contact_person"
                id="contactPerson"
                placeholder="Enter Emergency Contact Person"
                label="Emergency Contact Person"
                v-model="formValues.emergency_contact_person"
                @change="handleChangedValue"
              />
            </div>
            <div class="col mb-4">
              <FormKit
                type="text"
                name="emergency_contact_number"
                id="contactNumber"
                placeholder="Enter Emergency Contact Number"
                label="Emergency Contact Number"
                v-model="formValues.emergency_contact_number"
                @change="handleChangedValue"
              />
            </div>
            <div class="col mb-4">
              <FormKit
                type="text"
                name="emergency_contact_relation"
                id="contactRelation"
                placeholder="Enter Emergency Contact Relation"
                label="Emergency Contact Relation"
                v-model="formValues.emergency_contact_relation"
                @change="handleChangedValue"
              />
              <FormKit
                type="text"
                name="submitValue"
                id="submitValue"
                hidden
                v-model="formValues.submitValue"
              />
            </div>
          </div>
        </div>
      </FormKit>
    </div>
    <div class="d-flex align-items-center justify-content-end my-3">
      <div class="d-flex align-items-center">
        <FormKit
          v-if="!props.id"
          type="button"
          @click="handleCancel"
          style="background-color: #007bff !important"
          label="Cancel"
        />

        <FormKit
          type="submit"
          form="my-form-patient"
          @click="formValues.submitValue = 'OrderTest'"
          style="background-color: #007bff !important"
          label="Save & Order Test"
        />
        <FormKit
          type="submit"
          form="my-form-patient"
          @click="formValues.submitValue = 'Save'"
          style="background-color: #007bff !important"
          label="Save"
        />
      </div>
    </div>
  </div>
  <EsignatureModal
    v-if="viewStore.eSignatureModal"
    :handleSubmit="handleSubmit"
    :text="EsignatureText()"
  />
  <ConfirmDialog :showDialog="confirmDialog" :closeDialog="closeDialog" router="/patientList" />
</template>
<script setup>
import { FormKit } from '@formkit/vue'
import { useRouter } from 'vue-router'
import { ref, watchEffect, defineProps, onMounted } from 'vue'
import EsignatureModal from '../../components/EsignatureModal.vue'
import { useViewStore } from '../../stores/viewStore'
import { useAlertStore } from '../../stores/alertStore'
import { useFilterStore } from '../../stores/filterStore'
import { useStudyStore } from '../../stores/studyStore'
import { patientController } from '../../Controllers/patientController'
import { getValue } from '../../Utils/helperFunctions'
import ConfirmDialog from '../../components/ConfirmDialog.vue'
import { StudyListController } from '../../Controllers/studyListController'
const eSignatuteText = ref('')

const formValues = ref({
  first_name: '',
  middle_name: '',
  last_name: '',
  date_of_birth: '',
  gender: {
    label: '',
    value: ''
  },
  marital_status: {
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
  },
  emergency_contact_number: '',
  emergency_contact_person: '',
  emergency_contact_relation: '',
  submitValue: ''
})

const formData = ref({})
const alertStore = useAlertStore()
const viewStore = useViewStore()
const studyStore = useStudyStore()
const filterStore = useFilterStore();
const data = ref([])
const responseData = ref([])
const diseaseNameOptions = ref([])
const subjectId = ref(null)
let hasChanges = false;
const props = defineProps({
  path: String
})
const EsignatureText = () => {
  switch (props.path) {
    case 'create':
      return 'I am Adding a patient details';
    case 'edit':
      return 'I am editing patient details';
    default:
      return '';
  }
}
const handleChangedValue = () => {
  hasChanges = true;
}
const confirmDialog = ref(false)
const handleCancel = () => {
  if (hasChanges) {
    confirmDialog.value = true;
  } else {
    router.push('/patientList');
  }
};
watchEffect(async () => {
  subjectId.value = localStorage.getItem('subjectId')
  let inputModal = {
    entityStudyAttributeModel: {
      studyId: [studyStore.selectedStudy],
      sort: 'asc.displayOrder, asc.displayName'
    }
  }
  const response = await StudyListController.getEntityeMasterList(inputModal)
  if (response && response.data && response.data.data && response.data.data.length > 0) {
    const data = response.data.data
    studyStore.getEntityStudyAttribute(data)
  }
  if (subjectId.value && props.path === 'edit') {
    const inputModel = {
      subjectModel: {
        subject: {
          subjectId: Number(subjectId.value),
          studyId: [studyStore.selectedStudy]
        }
      }
    }
    const response = await patientController.getPatient(inputModel)
    responseData.value = response.attributes
    for (const key in formValues.value) {
      formValues.value[key] = getAttributeValue(key)
    }
  } else {
    formValues.value = {
      first_name: '',
      middle_name: '',
      last_name: '',
      date_of_birth: '',
      gender: {
        label: '',
        value: ''
      },
      marital_status: {
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
      },
      emergency_contact_number: '',
      emergency_contact_person: '',
      emergency_contact_relation: '',
      submitValue: ''
    }
  }
  const diseaseValues = getValue(studyStore.entityStudyAttributeModel, 'disease_name')
  const diseaseOptions = diseaseValues.split(',')
  //Sorted the disease name alphabetically
  diseaseNameOptions.value = diseaseOptions.sort();
})

const router = useRouter()
const addPatient = (fields) => {
  if (fields.first_name.trim() === '') {
    alertStore.error('First Name is required')
  } else if (fields.last_name.trim() === '') {
    alertStore.error('Last Name is required')
  } else {
    data.value = fields
    viewStore.getEsignatureModal(true)
  }
}
const getAttributeValue = (value) => {
  const attribute = responseData.value.find((attr) => attr.name === value)
  return attribute ? attribute.value : ''
}
const closeDialog = () => {
  confirmDialog.value = false
}
const handleSubmit = async () => {
  const inputModel = {
    subjectModel: {
      subject: {
        subjectId: subjectId.value ? subjectId.value : '',
        suid: '',
        studyId: [studyStore.selectedStudy]
      },
      attributes: [
        {
          subjectAttributeValueId: null,
          name: 'first_name',
          dataType: 'text',
          displayLabel: 'First Name',
          description: '',
          visible: true,
          required: true,
          readOnly: false,
          value: (data.value.first_name).trim(),
          widgetType: 'text',
          displayOrder: 1,
          displayGroup: 'Primary Details',
          displayGroupOrder: 1
        },
        {
          subjectAttributeValueId: null,
          name: 'middle_name',
          dataType: 'text',
          displayLabel: 'Middle Name',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: (data.value.middle_name !== undefined ? data.value.middle_name : '').trim(),
          widgetType: 'text',
          displayOrder: 2,
          displayGroup: 'Primary Details',
          displayGroupOrder: 1
        },
        {
          subjectAttributeValueId: null,
          name: 'last_name',
          dataType: 'text',
          displayLabel: 'Last Name',
          description: '',
          visible: true,
          required: true,
          readOnly: false,
          value: (data.value.last_name).trim(),
          widgetType: 'text',
          displayOrder: 3,
          displayGroup: 'Primary Details',
          displayGroupOrder: 1
        },
        {
          subjectAttributeValueId: null,
          name: 'date_of_birth',
          dataType: 'text',
          displayLabel: 'Date Of Birth',
          description: '',
          visible: true,
          required: true,
          readOnly: false,
          value: data.value.date_of_birth,
          widgetType: 'text',
          displayOrder: 4,
          displayGroup: 'Primary Details',
          displayGroupOrder: 1
        },
        {
          subjectAttributeValueId: null,
          name: 'gender',
          dataType: 'select',
          displayLabel: 'Gender',
          description: '',
          visible: true,
          required: true,
          readOnly: false,
          value: {
            label: data.value.gender,
            value: data.value.gender
          },
          widgetType: 'dropdown',
          displayOrder: 5,
          displayGroup: 'Primary Details',
          enumlist: [
            {
              label: 'Male',
              value: 'Male'
            },
            {
              label: 'Female',
              value: 'Female'
            },
            {
              label: 'Other',
              value: 'Other'
            }
          ],
          displayGroupOrder: 1
        },
        {
          subjectAttributeValueId: null,
          name: 'marital_status',
          dataType: 'select',
          displayLabel: 'Marital Status',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: {
            label: data.value.marital_status !== undefined ? data.value.marital_status : '',
            value: data.value.marital_status !== undefined ? data.value.marital_status : ''
          },
          widgetType: 'dropdown',
          displayOrder: 6,
          displayGroup: 'Primary Details',
          enumlist: [
            {
              label: 'Married',
              value: 'Married'
            },
            {
              label: 'Single',
              value: 'Single'
            }
          ],
          displayGroupOrder: 1
        },
        {
          subjectAttributeValueId: null,
          name: 'email_id',
          dataType: 'text',
          displayLabel: 'Email Id',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: data.value.email_id ? data.value.email_id : '',
          widgetType: 'text',
          displayOrder: 1,
          displayGroup: 'Contact Details',
          displayGroupOrder: 2
        },
        {
          subjectAttributeValueId: null,
          name: 'phone',
          dataType: 'text',
          displayLabel: 'Phone',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: data.value.phone,
          widgetType: 'text',
          displayOrder: 2,
          displayGroup: 'Contact Details',
          displayGroupOrder: 2
        },
        {
          subjectAttributeValueId: null,
          name: 'mobile',
          dataType: 'text',
          displayLabel: 'Mobile',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: data.value.phone,
          widgetType: 'text',
          displayOrder: 3,
          displayGroup: 'Contact Details',
          displayGroupOrder: 2
        },
        {
          subjectAttributeValueId: null,
          name: 'alternate_number',
          dataType: 'text',
          displayLabel: 'Alternate Number',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: data.value.alternate_number !== undefined ? data.value.alternate_number : '',
          widgetType: 'text',
          displayOrder: 4,
          displayGroup: 'Contact Details',
          displayGroupOrder: 2
        },
        {
          subjectAttributeValueId: null,
          name: 'address',
          dataType: 'text',
          displayLabel: 'House No, Building, Street',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: data.value.address ? data.value.address : '',
          widgetType: 'text',
          displayOrder: 1,
          displayGroup: 'Address',
          displayGroupOrder: 3
        },
        {
          subjectAttributeValueId: null,
          name: 'city',
          dataType: 'text',
          displayLabel: 'City',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: data.value.city !== undefined ? data.value.city : '',
          widgetType: 'text',
          displayOrder: 2,
          displayGroup: 'Address',
          displayGroupOrder: 3
        },
        {
          subjectAttributeValueId: null,
          name: 'state',
          dataType: 'text',
          displayLabel: 'State',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: data.value.state !== undefined ? data.value.state : '',
          widgetType: 'text',
          displayOrder: 3,
          displayGroup: 'Address',
          displayGroupOrder: 3
        },
        {
          subjectAttributeValueId: null,
          name: 'zipcode',
          dataType: 'text',
          displayLabel: 'Zipcode',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: data.value.zipcode !== undefined ? data.value.zipcode : '',
          widgetType: 'text',
          displayOrder: 4,
          displayGroup: 'Address',
          displayGroupOrder: 3
        },
        {
          subjectAttributeValueId: null,
          name: 'country',
          dataType: 'text',
          displayLabel: 'Country',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: data.value.country !== undefined ? data.value.country : '',
          widgetType: 'text',
          displayOrder: 5,
          displayGroup: 'Address',
          displayGroupOrder: 3
        },
        {
          subjectAttributeValueId: null,
          name: 'ALK Fusion',
          dataType: 'text',
          displayLabel: 'ALK Fusion',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 1,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'age',
          dataType: 'text',
          displayLabel: 'Age',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 1,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'disease_name',
          dataType: 'select',
          displayLabel: 'Disease Name',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: {
            label: data.value.disease_name !== undefined ? data.value.disease_name : '',
            value: data.value.disease_name !== undefined ? data.value.disease_name : ''
          },
          widgetType: 'dropdown',
          displayOrder: 1,
          displayGroup: 'Additional Attributes',
          enumlist: [
            {
              label: 'Ovarian Cancer',
              value: 'Ovarian Cancer'
            },
            {
              label: '\nGerm Cell Tumor',
              value: '\nGerm Cell Tumor'
            },
            {
              label: '\nSex Cord Stromal Tumor',
              value: '\nSex Cord Stromal Tumor'
            },
            {
              label: '\nLymphatic Cancer',
              value: '\nLymphatic Cancer'
            },
            {
              label: ' NOS',
              value: ' NOS'
            },
            {
              label: '\nSoft Tissue Cancer',
              value: '\nSoft Tissue Cancer'
            },
            {
              label: '\nSoft Tissue Sarcoma',
              value: '\nSoft Tissue Sarcoma'
            },
            {
              label: '\nAngiomatoid Fibrous Histiocytoma',
              value: '\nAngiomatoid Fibrous Histiocytoma'
            },
            {
              label: '\nMiscellaneous Neuroepithelial Tumor',
              value: '\nMiscellaneous Neuroepithelial Tumor'
            },
            {
              label: '\nInfantile Fibrosarcoma',
              value: '\nInfantile Fibrosarcoma'
            },
            {
              label: '\nMalignant Glomus Tumor',
              value: '\nMalignant Glomus Tumor'
            },
            {
              label: '\nGastrointestinal Stromal Tumor',
              value: '\nGastrointestinal Stromal Tumor'
            },
            {
              label: '\nMyofibromatosis',
              value: '\nMyofibromatosis'
            },
            {
              label: '\nThyroid Cancer',
              value: '\nThyroid Cancer'
            },
            {
              label: '\nMesothelioma',
              value: '\nMesothelioma'
            },
            {
              label: '\nPancreatic Cancer',
              value: '\nPancreatic Cancer'
            },
            {
              label: '\nHepatobiliary Cancer',
              value: '\nHepatobiliary Cancer'
            },
            {
              label: '\nBreast Cancer',
              value: '\nBreast Cancer'
            },
            {
              label: '\nBreast Sarcoma',
              value: '\nBreast Sarcoma'
            },
            {
              label: '\nHead and Neck Cancer',
              value: '\nHead and Neck Cancer'
            },
            {
              label: '\nMelanoma',
              value: '\nMelanoma'
            },
            {
              label: '\nParathyroid Cancer',
              value: '\nParathyroid Cancer'
            },
            {
              label: '\nSalivary Gland Cancer',
              value: '\nSalivary Gland Cancer'
            },
            {
              label: '\nSialoblastoma',
              value: '\nSialoblastoma'
            },
            {
              label: '\nLacrimal Gland Tumor',
              value: '\nLacrimal Gland Tumor'
            },
            {
              label: '\nRetinoblastoma',
              value: '\nRetinoblastoma'
            },
            {
              label: '\nAmpullary Cancer',
              value: '\nAmpullary Cancer'
            },
            {
              label: '\nThymic Tumor',
              value: '\nThymic Tumor'
            },
            {
              label: '\nCervical Cancer',
              value: '\nCervical Cancer'
            },
            {
              label: '\nPeripheral Nervous System',
              value: '\nPeripheral Nervous System'
            },
            {
              label: '\nNerve Sheath Tumor',
              value: '\nNerve Sheath Tumor'
            },
            {
              label: '\nGastrointestinal Neuroendocrine Tumor',
              value: '\nGastrointestinal Neuroendocrine Tumor'
            },
            {
              label: '\nAnal Cancer',
              value: '\nAnal Cancer'
            },
            {
              label: '\nAppendiceal Cancer',
              value: '\nAppendiceal Cancer'
            },
            {
              label: '\nSmall Bowel Cancer',
              value: '\nSmall Bowel Cancer'
            },
            {
              label: '\nTubular Adenoma of the Colon',
              value: '\nTubular Adenoma of the Colon'
            },
            {
              label: '\nColorectal Cancer',
              value: '\nColorectal Cancer'
            },
            {
              label: '\nBone Cancer',
              value: '\nBone Cancer'
            },
            {
              label: '\nSkin Cancer',
              value: '\nSkin Cancer'
            },
            {
              label: ' Non-Melanoma',
              value: ' Non-Melanoma'
            },
            {
              label: '\nBladder Cancer',
              value: '\nBladder Cancer'
            },
            {
              label: '\nCNS Cancer',
              value: '\nCNS Cancer'
            },
            {
              label: '\nGlioma',
              value: '\nGlioma'
            },
            {
              label: '\nChoroid Plexus Tumor',
              value: '\nChoroid Plexus Tumor'
            },
            {
              label: '\nPrimary CNS Melanocytic Tumors',
              value: '\nPrimary CNS Melanocytic Tumors'
            },
            {
              label: '\nPineal Tumor',
              value: '\nPineal Tumor'
            },
            {
              label: '\nEmbryonal Tumor',
              value: '\nEmbryonal Tumor'
            },
            {
              label: '\nSellar Tumor',
              value: '\nSellar Tumor'
            },
            {
              label: '\nMiscellaneous Brain Tumor',
              value: '\nMiscellaneous Brain Tumor'
            },
            {
              label: '\nAdrenocortical Carcinoma',
              value: '\nAdrenocortical Carcinoma'
            },
            {
              label: '\nPheochromocytoma',
              value: '\nPheochromocytoma'
            },
            {
              label: '\nAdrenocortical Adenoma',
              value: '\nAdrenocortical Adenoma'
            },
            {
              label: '\nProstate Cancer',
              value: '\nProstate Cancer'
            },
            {
              label: '\nNon-Small Cell Lung Cancer',
              value: '\nNon-Small Cell Lung Cancer'
            },
            {
              label: '\nSmall Cell Lung Cancer',
              value: '\nSmall Cell Lung Cancer'
            },
            {
              label: '\nPenile Cancer',
              value: '\nPenile Cancer'
            },
            {
              label: '\nUterine Sarcoma',
              value: '\nUterine Sarcoma'
            },
            {
              label: '\nEndometrial Cancer',
              value: '\nEndometrial Cancer'
            },
            {
              label: '\nGestational Trophoblastic Disease',
              value: '\nGestational Trophoblastic Disease'
            },
            {
              label: '\nAdenocarcinoma In Situ',
              value: '\nAdenocarcinoma In Situ'
            },
            {
              label: '\nCancer of Unknown Primary',
              value: '\nCancer of Unknown Primary'
            },
            {
              label: '\nNon-Hodgkin Lymphoma',
              value: '\nNon-Hodgkin Lymphoma'
            },
            {
              label: '\nMalignant Rhabdoid Tumor of the Liver',
              value: '\nMalignant Rhabdoid Tumor of the Liver'
            },
            {
              label: '\nUndifferentiated Embryonal Sarcoma of the Liver',
              value: '\nUndifferentiated Embryonal Sarcoma of the Liver'
            },
            {
              label: '\nPeritoneal Cancer',
              value: '\nPeritoneal Cancer'
            },
            {
              label: ' NOS',
              value: ' NOS'
            },
            {
              label: '\nBlood Cancer',
              value: '\nBlood Cancer'
            },
            {
              label: ' NOS',
              value: ' NOS'
            },
            {
              label: '\nVaginal Cancer',
              value: '\nVaginal Cancer'
            },
            {
              label: '\nVulvar Carcinoma',
              value: '\nVulvar Carcinoma'
            },
            {
              label: '\nRenal Cell Carcinoma',
              value: '\nRenal Cell Carcinoma'
            },
            {
              label: '\nWilms Tumor',
              value: '\nWilms Tumor'
            },
            {
              label: '\nRenal Neuroendocrine Tumor',
              value: '\nRenal Neuroendocrine Tumor'
            },
            {
              label: '\nRhabdoid Cancer',
              value: '\nRhabdoid Cancer'
            },
            {
              label: '\nClear Cell Sarcoma of Kidney',
              value: '\nClear Cell Sarcoma of Kidney'
            },
            {
              label: '\nEsophagogastric Cancer',
              value: '\nEsophagogastric Cancer'
            },
            {
              label: '\nNot Provided',
              value: '\nNot Provided'
            }
          ],
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'emergency_contact_person',
          dataType: 'text',
          displayLabel: 'Emergency Contact Person',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value:
            data.value.emergency_contact_person !== undefined
              ? data.value.emergency_contact_person
              : '',
          widgetType: 'text',
          displayOrder: 1,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'full_name',
          dataType: 'text',
          displayLabel: 'Full Name',
          description: '',
          visible: false,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 1,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'specimen',
          dataType: 'text',
          displayLabel: 'SPECIMEN',
          description: '',
          visible: false,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 1,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'emergency_contact_relation',
          dataType: 'text',
          displayLabel: 'Emergency Contact Relation',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value:
            data.value.emergency_contact_relation !== undefined
              ? data.value.emergency_contact_person
              : '',
          widgetType: 'text',
          displayOrder: 2,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },

        {
          subjectAttributeValueId: null,
          name: 'emergency_contact_number',
          dataType: 'text',
          displayLabel: 'Emergency Contact Number',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value:
            data.value.emergency_contact_number !== undefined
              ? data.value.emergency_contact_number
              : '',
          widgetType: 'text',
          displayOrder: 3,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'vital_status',
          dataType: 'text',
          displayLabel: 'Vital Status',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 4,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'survival_days',
          dataType: 'text',
          displayLabel: 'Survival Days',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 5,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },

        {
          subjectAttributeValueId: null,
          name: 'survival_months',
          dataType: 'text',
          displayLabel: 'Survival Months',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 6,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },

        {
          subjectAttributeValueId: null,
          name: 'screening_status',
          dataType: 'text',
          displayLabel: 'Screening Status',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 8,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },

        {
          subjectAttributeValueId: null,
          name: 'treatment_status',
          dataType: 'text',
          displayLabel: 'Treatment Status',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 9,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'followup_status',
          dataType: 'text',
          displayLabel: 'Followup Status',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 10,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'screening_date',
          dataType: 'text',
          displayLabel: 'Screening Date',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 11,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'screening_study_day',
          dataType: 'text',
          displayLabel: 'Screening Study Day',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 12,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'treatment_date',
          dataType: 'text',
          displayLabel: 'Treatment Date',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 13,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'treatment_study_day',
          dataType: 'text',
          displayLabel: 'Treatment Study Day',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 14,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'followup_date',
          dataType: 'text',
          displayLabel: 'Followup Date',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 15,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'followup_study_day',
          dataType: 'text',
          displayLabel: 'Followup Study Day',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 16,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'ethnicity',
          dataType: 'text',
          displayLabel: 'Ethnicity',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 17,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'race',
          dataType: 'text',
          displayLabel: 'Race',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 18,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'Drug Treatment Required',
          dataType: 'text',
          displayLabel: 'Drug Treatment Required',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 19,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'sex',
          dataType: 'text',
          displayLabel: 'Sex',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 19,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'appointment_date',
          dataType: 'text',
          displayLabel: 'Appointment Date',
          description: '',
          visible: false,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 20,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'appointment_time',
          dataType: 'text',
          displayLabel: 'Appointment Time',
          description: '',
          visible: false,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 21,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'site_id',
          dataType: 'text',
          displayLabel: 'Site Id',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 21,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'timepoint',
          dataType: 'text',
          displayLabel: 'Timepoint',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 23,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'disease_detail',
          dataType: 'text',
          displayLabel: 'Disease Detail',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 25,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'screen_detail',
          dataType: 'text',
          displayLabel: 'Screen Detail',
          description: '',
          visible: true,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 26,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'subject_id',
          dataType: 'text',
          displayLabel: 'Subject Id',
          description: '',
          visible: false,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'text',
          displayOrder: 21526,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        },
        {
          subjectAttributeValueId: null,
          name: 'patient_id',
          dataType: 'int',
          displayLabel: 'Patient Id',
          description: '',
          visible: false,
          required: false,
          readOnly: false,
          value: '',
          widgetType: 'int',
          displayOrder: 21557,
          displayGroup: 'Additional Attributes',
          displayGroupOrder: 4
        }
      ],
      groups: [
        {
          displayGroupOrder: 1,
          displayGroup: 'Primary Details'
        },
        {
          displayGroupOrder: 2,
          displayGroup: 'Contact Details'
        },
        {
          displayGroupOrder: 3,
          displayGroup: 'Address'
        },
        {
          displayGroupOrder: 4,
          displayGroup: 'Additional Attributes'
        }
      ],
      attributesGroupMapping: [
        {
          name: 'first_name',
          visible: true,
          required: true,
          readOnly: false,
          displayOrder: 1,
          displayGroup: 'Primary Details'
        },
        {
          name: 'middle_name',
          visible: true,
          required: false,
          readOnly: false,
          displayOrder: 2,
          displayGroup: 'Primary Details'
        },
        {
          name: 'last_name',
          visible: true,
          required: true,
          readOnly: false,
          displayOrder: 3,
          displayGroup: 'Primary Details'
        },
        {
          name: 'date_of_birth',
          visible: true,
          required: true,
          readOnly: false,
          displayOrder: 4,
          displayGroup: 'Primary Details'
        },
        {
          name: 'gender',
          visible: true,
          required: true,
          readOnly: false,
          displayOrder: 5,
          displayGroup: 'Primary Details'
        },
        {
          name: 'marital_status',
          visible: true,
          required: false,
          readOnly: false,
          displayOrder: 6,
          displayGroup: 'Primary Details'
        },
        {
          name: 'email_id',
          visible: true,
          required: false,
          readOnly: false,
          displayOrder: 1,
          displayGroup: 'Contact Details'
        },
        {
          name: 'phone',
          visible: true,
          required: false,
          readOnly: false,
          displayOrder: 2,
          displayGroup: 'Contact Details'
        },
        {
          name: 'mobile',
          visible: true,
          required: false,
          readOnly: false,
          displayOrder: 3,
          displayGroup: 'Contact Details'
        },
        {
          name: 'alternate_number',
          visible: true,
          required: false,
          readOnly: false,
          displayOrder: 4,
          displayGroup: 'Contact Details'
        },
        {
          name: 'address',
          visible: true,
          required: false,
          readOnly: false,
          displayLabel: 'House No, Building, Street',
          displayOrder: 1,
          displayGroup: 'Address'
        },
        {
          name: 'city',
          visible: true,
          required: false,
          readOnly: false,
          displayOrder: 2,
          displayGroup: 'Address'
        },
        {
          name: 'state',
          visible: true,
          required: false,
          readOnly: false,
          displayOrder: 3,
          displayGroup: 'Address'
        },
        {
          name: 'zipcode',
          visible: true,
          required: false,
          readOnly: false,
          displayOrder: 4,
          displayGroup: 'Address'
        },
        {
          name: 'country',
          visible: true,
          required: false,
          readOnly: false,
          displayOrder: 5,
          displayGroup: 'Address'
        },
        {
          name: 'emergency_contact_person',
          visible: true,
          required: false,
          readOnly: false,
          displayOrder: 1,
          displayGroup: 'Additional Attributes'
        },
        {
          name: 'emergency_contact_relation',
          visible: true,
          required: false,
          readOnly: false,
          displayOrder: 2,
          displayGroup: 'Additional Attributes'
        },
        {
          name: 'emergency_contact_number',
          visible: true,
          required: false,
          readOnly: false,
          displayOrder: 3,
          displayGroup: 'Additional Attributes'
        }
      ]
    },
    eSignatureModel: {
      username: viewStore.eSignatureForm.username,
      password: viewStore.eSignatureForm.password,
      changeReasonDetail: viewStore.eSignatureForm.changeReasonDetail
    }
  }
  const msg = props.path === 'create' ? 'Added patient successfully' : (props.path === 'edit' && data.value.submitValue === 'Save') && 'Updated patient details successfully';
  const text = data.value.submitValue === 'Save' ? 'patientList' : 'orderTest'
  await patientController.addPatient(inputModel, router, text,msg)
}
onMounted(() => {
  filterStore.setParams('')
  const location = window.location.pathname.split('/')
  if (location && location[2] === 'addPatient') {
    eSignatuteText.value = 'I am creating a patient'
  } else {
    eSignatuteText.value = 'I am editing patient details'
  }
})
const getCurrentDate = () => {
  const currentDate = new Date().toISOString().split('T')[0]
  return currentDate
}
</script>
<style scoped>
.br-b {
  border-bottom: 1px solid #ddc8c8;
}
</style>
