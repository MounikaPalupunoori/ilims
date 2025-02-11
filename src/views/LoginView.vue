<script setup>
import { FormKit } from '@formkit/vue'
import { useRouter } from 'vue-router'
import instance from '../Utils/axiosInterceptors'
import { TokenService } from '../Services/TokenService'
const router = useRouter()
import { getTokenData } from '../Utils/helperFunctions'
import { onMounted } from 'vue'
const createCharacter = async (fields) => {
  let data = {}
  ;(data.username = fields.email), (data.password = fields.password)
  await instance({
    method: 'POST',
    url: '/api/token',
    data
  })
    .then((resp) => {
      instance.defaults.headers.common['Authorization'] = resp.token
      localStorage.setItem('token', resp.token)
      localStorage.setItem('userName', fields.email)
      router.push('/patientList')
    })
    .catch((error) => {
      alert(error.response.data.description)
    })
}


</script>
<template>
  <div class="container container-ht">
    <div class="row justify-content-center login-container">
      <FormKit
        type="form"
        :incomplete-message="false"
        :actions="false"
        @submit="createCharacter"
        class="col-md-6"
      >
        <h2 class="mb-3 text-center">Log In</h2>
        <div class="mb-4">
          <FormKit
            type="email"
            name="email"
            id="email"
            placeholder="john@xyz.com"
            label="Email"
            validation="required|email"
          />
        </div>

        <div class="mb-4">
          <FormKit
            name="password"
            id="password"
            placeholder="***********"
            label="Password"
            validation="required"
          />
        </div>

        <FormKit style="background-color: #007bff !important" type="submit" label="Login" />
      </FormKit>
    </div>
  </div>
</template>
<style scoped>
.login-container {
  max-width: 430px;
  margin: auto;
  height: 100%;
  align-items: center;
}
.container-ht {
  height: 100vh;
}
</style>
