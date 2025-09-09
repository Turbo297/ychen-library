<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-10 offset-md-1">
        <h1 class="text-center">Firebase Log in</h1>
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
            <!-- Password -->
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
          </div>
          <!-- Actions -->
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">
              Clear
            </button>
          </div>
          <div v-if="errors.authentication" class="text-danger">{{ errors.authentication }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import isAuthenticated from '@/authenticate';
import router from '@/router';
import authenticateRole from '@/role';

  
const formData = ref({
  username: '',
  password: ''
})

const submittedCards = ref([]);

const submitForm = () => {
  validateName(true); // Validate username on submit
  validatePassword(true) // Validate password on submit
  if (!errors.value.username && !errors.value.password) {
    //submittedCards.value.push({...formData.value})
    if (formData.value.username === 'admin' && formData.value.password === 'Password123!') {
        isAuthenticated.value = true;
        authenticateRole.value = 'admin';
        router.push({name:'AdminPage'})
    }
    else if (formData.value.username != 'admin')
    {
        signInWithEmailAndPassword(getAuth(), formData.value.username, formData.value.password)
        .then((data) => {
            console.log("Login success data", data);
            console.log("Login successful", getAuth().currentUser);
            isAuthenticated.value = true;
            authenticateRole.value = 'customer';
            router.push({name:'CustomerPage'})
        }
        ).catch((error) => {
            console.log(error.code)
            errors.value.authentication = error.code
        })
    }else {
      router.push('Access-Denied');
    }
    clearForm();
    }
};

const clearForm = () => {
  formData.value = { ...formData }  // reset all inputs
}

const errors = ref({
  username: null,
  password: null,
  authentication: null
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