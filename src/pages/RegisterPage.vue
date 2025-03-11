<template>
  <div class="flex min-h-screen items-center justify-center bg-background">
    <div class="w-full max-w-md">
      <Card class="shadow-lg rounded-lg p-6">
        <CardHeader class="flex flex-col items-center justify-center space-y-2 text-center">
          <CardTitle class="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription class="text-muted-foreground">
            Enter your details below to register.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div class="grid gap-2">
            <Label for="username">Username</Label>
            <Input type="text" id="username" placeholder="Username" v-model="username" />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" v-model="password" />
          </div>
          <div class="grid gap-2">
            <Label for="user_type">User Type</Label>
            <Select v-model="user_type">
              <SelectTrigger id="user_type" class="w-full"> 
                <SelectValue placeholder="Select a user type" />
              </SelectTrigger>
              <SelectContent class="w-full">
                <SelectItem class="w-full" value="individual">Individual</SelectItem>
                <SelectItem value="organization">Organization</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button @click="handleRegister" class="w-full">Register</Button>
          <p class="text-center text-sm text-muted-foreground">
              Already registered?
            <router-link to="/login" class="text-primary font-medium hover:underline">
              Login here
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
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { post } from '@/Api/middleware/apiCaller';
import { REGISTER_ENDPOINT } from '@/Api/paths/auth';
import type { RegisterRequest, RegisterResponse } from '@/Api/types/Auth';
import { useToast } from "@/components/ui/toast"

const username = ref('');
const password = ref('');
const user_type = ref('individual');
const router = useRouter();
const { toast } = useToast()

const handleRegister = async () => {
  const registerRequest: RegisterRequest = {
    username: username.value,
    password: password.value,
    user_type: user_type.value as 'individual' | 'organization',
  };

  try {
    const response = await post<RegisterResponse, RegisterRequest>(REGISTER_ENDPOINT, registerRequest);

    if (response.success) {
      router.push('/login');
      toast({
        description: "Registration successful. Please login.",
      })
    } else {
      toast({
        variant: "destructive",
        description: `Registration failed: ${response.message}`,
      })
    }
  } catch (error) {
    toast({
      variant: "destructive",
      description: 'Registration failed. Please check your connection.',
    })
    console.error('Registration error:', error);
  }
};
</script>
