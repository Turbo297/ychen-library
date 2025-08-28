<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-10 offset-md-1">
        <h1 class="text-center">User Information Form/Credentials</h1>
        <form @submit.prevent="submitForm">
          <!-- Username -->
          <div class="row mb-3">
            <div class="col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"/>
              <div v-if="errors.username" class="text-danger">
                {{ errors.username }}</div>
            </div>
          <!-- gender -->
            <div class="col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                id="gender"
                class="form-select"
                v-model="formData.gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <!-- Password -->
          <div class="row mb-3">
            <div class="col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password" />
              <div v-if="errors.password" class="text-danger">
                {{ errors.password }}</div>
            </div>
          <!-- Comfirm Password -->
            <div class="col-md-6 col-sm-6">
              <label for="confirm-password" class="form-label">Confirm password</label>
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                v-model="formData.confirmPassword"
                @blur="() => validateConfirmPassword(true)"
              />
              <div v-if="errors.confirmPassword" class="text-danger">
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>
          

          <!-- Row: Checkbox -->
          <div class="row mb-3">
            <div class="col-sm-6">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="isAustralian"
                  v-model="formData.isAustralian">
                <label class="form-check-label" for="isAustralian">
                  Australian Resident?
                </label>
              </div>
            </div>

            
          </div>

          <!-- Reason -->
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              id="reason"
              class="form-control"
              rows="3"
              v-model.trim="formData.reason"></textarea>
          </div>
          <!-- Suburb -->
          <div class="mb-3">
            <label for="reason" class="form-label">Suburb</label>
            <input type="text" class="form-control" id="suburb" v-bind:value="formData.suburb" />
          </div>
          <!-- Actions -->
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">
              Clear
            </button>
          </div>
        </form>
        <DataTable :value="submittedCards" stripedRows tableStyle="min-width: 50rem">
            <Column field="username" header="Name"></Column>
            <Column field="password" header="Password"></Column>
            <Column field="isAustralian" header="Australian Resident"></Column>
            <Column field="gender" header="Gender"></Column>
            <Column field="reason" header="Reason"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional

  
const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: '',
  suburb: 'Clayton'
})

const submittedCards = ref([]);

const submitForm = () => {
  validateName(true); // Validate username on submit
  validatePassword(true) // Validate password on submit
  if (!errors.value.username && !errors.value.password) {
    submittedCards.value.push({
        ...formData.value
    })
    clearForm();
  }
};

const clearForm = () => {
  formData.value = { ...formData }  // reset all inputs
}

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  resident: null,
  gender: null,
  reason: null
})

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Username must be at least 3 characters long';
  } else {
    errors.value.username = null;
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password;
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long`;
  } else if (!hasUpperCase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter';
  } else if (!hasLowerCase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter';
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number'; 
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character';
  } else {
    errors.value.password = null;
  }
};

/**
 * Confirm password validation function that checks if the password and confirm password fields match.
 * @param blur: boolean - If true, the function will display an error message if the passwords do not match.
 */
const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}
</script>




<style scoped>
   .card {
   border: 1px solid #ccc;
   border-radius: 10px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   display: flex;
   }
   .card-header {
   background-color: #275FDA;
   color: white;
   padding: 10px;
   border-radius: 10px 10px 0 0;
   }
   .list-group-item {
   padding: 10px;
   }
</style>