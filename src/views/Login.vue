<template>
	<v-app>
		<v-sheet class="pa-12 text-center" rounded>
            <div class="text-h1 pa-3">登录</div>

			<v-card class="mx-auto px-6 py-8" max-width="344">
				<v-form
					v-model="form"
					@submit.prevent="onSubmit"
				>
					<v-text-field
						v-model="email"
						:readonly="loading"
						:rules="[required]"
						class="mb-2"
						clearable
						label="邮箱"
					></v-text-field>

					<v-text-field
						v-model="password"
						type="password"
						:readonly="loading"
						:rules="[required]"
						clearable
						label="密码"
						placeholder="Enter your password"
					></v-text-field>

					<br>

					<v-btn
						:disabled="!form"
						:loading="loading"
						block
						color="success"
						size="large"
						type="submit"
						variant="elevated"
						@click="login"
					>
						Login
					</v-btn>
				</v-form>
			</v-card>
		</v-sheet>

		<v-snackbar
      v-model="loginSnackbar"
    >
      {{ loginSnackbarText }}
    </v-snackbar>
	</v-app>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { supabase } from '@/services/supabase'
import { useAppStore } from '@/store/app'
import router from '@/router'

const form = ref(false)
const loading = ref(false)

const email = ref('')
const password = ref('')

const loginSnackbarText = ref('')
const loginSnackbar = ref(false)

async function login() {
	await supabase.auth.signInWithPassword({
		email: email.value,
		password: password.value,
	})
	.then(({data, error}) => {
		if (data.user) {
			router.go(0)
		}

		if (error) {
			loginSnackbarText.value = error.message
			loginSnackbar.value = true
		}
	})
	.catch((error) => {
		console.log(error)
	})
}

function onSubmit () {
	if (!form.value) return

	loading.value = true

	setTimeout(() => (loading.value = false), 2000)
}

function required (v: any) {
	return !!v || 'Field is required'
}
</script>
