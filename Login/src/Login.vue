<template>
  <div class="container">
    <div class="card">
      <div class="side-panel">
        <div class="logo">
          <img src="@/assets/gocloud.svg" alt="Go Cloud Logo" class="logo-image" />
        </div>
        <h2>Manage Your Files Effortlessly</h2>
        <p>Welcome! Store and manage all your documents in one secure place.</p>
        <div class="image-placeholder"></div>
      </div>
      <div class="login-panel">
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
          <label>
            Username
            <input type="text" v-model="username" required />
          </label>
          <label>
            Password
            <input type="password" v-model="password" required />
          </label>
          <button type="submit" class="login-button">Login</button>
        </form>
        <div class="footer">
          <a href="#">Forgot password?</a>
          <div class="social-login">
            <span>or login with</span>
            <button class="social-button">QQ</button>
            <button class="social-button">WeChat</button>
          </div>
          <!-- 使用 router-link 以支持跳转到注册页面 -->
          <p>Don’t have an account? <router-link to="/signup">Create Account</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const handleSubmit = () => {
  console.log('Login submitted', { username: username.value });
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

html, body {
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  height: 100vh;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  height: 90vh;
  padding: 20px;
}

.card {
  display: flex;
  background-color: #f7f9fc;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.02);
}

.side-panel {
  background-color: #A3C2C7;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  width: 35%;
  text-align: center;
}

.logo img.logo-image {
  width: 200px;
  height: auto;
  margin-bottom: 20px;
}

.side-panel h2 {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
}

.side-panel p {
  font-size: 0.9em;
  line-height: 1.5;
  max-width: 80%;
  margin-bottom: 30px;
}

.image-placeholder {
  background: center/contain no-repeat;
  width: 120px;
  height: 120px;
  margin-top: 20px;
}

.login-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 40px;
}

.login-panel h2 {
  font-size: 2em;
  font-weight: bold;
  color: #333;
  margin-bottom: 25px;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px;
}

label {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  font-size: 1em;
  color: #444;
}

input[type="text"],
input[type="password"] {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-top: 5px;
  font-size: 1em;
  transition: border-color 0.3s ease-in-out;
  background-color: #f4f6f9;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #6a6afc;
  outline: none;
}

.login-button {
  background-color: #A3C2C7;
  color: #fff;
  border: none;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1em;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #7c9599;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  font-size: 0.9em;
  color: #555;
}

.footer a {
  color: #A3C2C7;
  text-decoration: none;
  margin-bottom: 10px;
}

.social-login {
  display: flex;
  align-items: center;
  margin: 15px 0;
}

.social-login span {
  margin-right: 10px;
  color: #777;
}

.social-button {
  background-color: #ffffff;
  border: 1px solid #ddd;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 0 8px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s;
}

.social-button:hover {
  background-color: #f1f1f1;
}
</style>
