<template>
  <div class="flex min-h-screen items-center justify-center bg-background">
    <div class="w-full max-w-md">
      <Card class="shadow-lg rounded-lg p-6">
        <CardHeader class="flex flex-col items-center justify-center space-y-2 text-center">
          <CardTitle class="text-2xl font-bold">Login to Pits Chat</CardTitle>
          <CardDescription class="text-muted-foreground">
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div class="grid gap-2">
            <Label for="username">Username</Label>
            <Input type="email" id="username" placeholder="Username" v-model="username" />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input type="password" id="password" v-model="password" />
          </div>
          <Button @click="handleLogin" class="w-full">Login</Button>
          <p class="text-center text-sm text-muted-foreground">
            Not registered?
            <router-link to="/register" class="text-primary font-medium hover:underline">
              Register here
            </router-link>
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { post } from '@/Api/middleware/apiCaller';
import { LOGIN_ENDPOINT } from '@/Api/paths/auth';
import type { LoginRequest, LoginResponse } from '@/Api/types/Auth';
import { useToast } from "@/components/ui/toast"

const username = ref('');
const password = ref('');
const router = useRouter();
const { toast } = useToast()

const handleLogin = async () => {
  const loginRequest: LoginRequest = {
    username: username.value,
    password: password.value,
  };

  try {
    const response = await post<LoginResponse, LoginRequest>(LOGIN_ENDPOINT, loginRequest);

    if (response.success) {
      localStorage.setItem('accessToken', response.data?.access_token || '');
      router.push('/');
    } else {
      toast({
        variant: "destructive",
        description: `Login failed: ${response.message}`,
      })
    }
  } catch (error) {
    toast({
      variant: "destructive",
      description: `unable to log in check your username and password or try again later`,
    })
    console.error('Login error:', error);
  }
};
</script>