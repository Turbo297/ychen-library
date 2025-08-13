<template>
  <div class="container vh-100 d-flex align-items-center justify-content-center">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center mb-4">User Information Form / Credentials</h1>

        <!-- Disable native HTML5 validation so we control styles/messages -->
        <form novalidate @submit.prevent="onSubmit">
          <!-- Username -->
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              id="username"
              type="text"
              class="form-control"
              :class="inputStateClass('username')"
              v-model.trim="form.username"
              @blur="touch('username')"
              placeholder="e.g. yuqing_chen"
              autocomplete="username"
              required
            />
            <div class="invalid-feedback">{{ errors.username }}</div>
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              :class="inputStateClass('password')"
              v-model="form.password"
              @blur="touch('password')"
              autocomplete="new-password"
              required
            />
            <div class="invalid-feedback">{{ errors.password }}</div>
          </div>

          <!-- Row: Checkbox + Gender -->
          <div class="row mb-3">
            <div class="col-md-6">
              <div class="form-check mt-2">
                <input
                  id="isAustralian"
                  class="form-check-input"
                  type="checkbox"
                  v-model="form.isAustralian"
                />
                <label for="isAustralian" class="form-check-label">
                  Australian Resident?
                </label>
              </div>
            </div>

            <div class="col-md-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                id="gender"
                class="form-select"
                :class="inputStateClass('gender')"
                v-model="form.gender"
                @blur="touch('gender')"
                required
              >
                <option value="" disabled>Select…</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div class="invalid-feedback">{{ errors.gender }}</div>
            </div>
          </div>

          <!-- Reason -->
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              id="reason"
              class="form-control"
              rows="3"
              :class="inputStateClass('reason')"
              v-model.trim="form.reason"
              @blur="touch('reason')"
              placeholder="Tell us a bit about your goal…"
              required
            ></textarea>
            <div class="invalid-feedback">{{ errors.reason }}</div>
          </div>

          <!-- Actions -->
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2" :disabled="submitting">
              {{ submitting ? 'Submitting…' : 'Submit' }}
            </button>
            <button type="button" class="btn btn-secondary" @click="clearForm">
              Clear
            </button>
          </div>

          <!-- Success message -->
          <div v-if="submitted" class="alert alert-success mt-4" role="alert">
            ✅ Form submitted successfully!
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'

/** form state */
const form = reactive({
  username: '',
  password: '',
  isAustralian: false,
  gender: '',
  reason: ''
})

/** which fields have been blurred (touched) */
const touched = reactive({
  username: false,
  password: false,
  gender: false,
  reason: false
})

/** validation rules */
function validate(f) {
  const e = {}
  if (!f.username) e.username = 'Username is required.'
  else if (f.username.length < 3) e.username = 'At least 3 characters.'

  if (!f.password) e.password = 'Password is required.'
  else if (f.password.length < 6) e.password = 'At least 6 characters.'

  if (!f.gender) e.gender = 'Please choose a gender.'

  if (!f.reason) e.reason = 'Please enter a reason.'
  else if (f.reason.length < 10) e.reason = 'Please write at least 10 characters.'
  else if (f.reason.length > 300) e.reason = 'Max 300 characters.'

  return e
}

const errors = computed(() => validate(form))
const isValid = computed(() => Object.keys(errors.value).length === 0)

function touch(field) {
  touched[field] = true
}

/** add Bootstrap classes: 'is-invalid' / 'is-valid' */
function inputStateClass(field) {
  if (!touched[field]) return ''
  return errors.value[field] ? 'is-invalid' : 'is-valid'
}

function clearForm() {
  form.username = ''
  form.password = ''
  form.isAustralian = false
  form.gender = ''
  form.reason = ''
  Object.keys(touched).forEach(k => (touched[k] = false))
  submitted.value = false
}

const submitting = ref(false)
const submitted = ref(false)

async function onSubmit() {
  // mark all as touched so errors show if user clicks submit immediately
  Object.keys(touched).forEach(k => (touched[k] = true))

  if (!isValid.value) return

  submitting.value = true
  // simulate request
  await new Promise(r => setTimeout(r, 600))
  submitting.value = false
  submitted.value = true
  // you can send `form` to your API here
  console.log('Form payload:', { ...form })
}
</script>

<style scoped>
/* Optional: a tiny helper so valid inputs don’t look too bright */
.is-valid {
  box-shadow: none;
}
</style>
