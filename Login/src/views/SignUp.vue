<template>
  <div class="container">
    <div class="card">
      <div class="side-panel">
        <div class="logo">
          <img src="@/assets/gocloud.svg" alt="Go Cloud Logo" class="logo-image" />
        </div>
        <h2>Join Go Cloud Today</h2>
        <p>Sign up to start securely storing and managing your files.</p>
      </div>
      <div class="signup-panel">
        <h2>Create Account</h2>
        <form @submit.prevent="handleSignUp">
          <!-- 头像选择区域，点击预览框触发文件选择 -->
          <div class="avatar-selection">
            <div class="avatar-preview" :style="{ backgroundImage: avatar ? 'url(' + avatar + ')' : '' }" @click="triggerFileInput"></div>
            <!-- 隐藏文件输入框 -->
            <input type="file" accept="image/*" @change="handleAvatarUpload" ref="fileInput" class="hidden-file-input" />
          </div>

          <label>
            Username
            <input type="text" v-model="username" required />
          </label>
          <label>
            Email
            <input type="email" v-model="email" required />
          </label>
          <div class="verification-section">
            <label>
              Verification Code
              <input type="text" v-model="verificationCode" placeholder="Enter code" required />
            </label>
            <button type="button" @click="sendVerificationCode" class="send-code-button">Send Code</button>
          </div>
          <label>
            Password
            <input type="password" v-model="password" required />
          </label>
          <label>
            Confirm Password
            <input type="password" v-model="confirmPassword" required />
            <p v-if="passwordMismatch" class="error-text">Passwords do not match</p>
          </label>
          <button type="submit" class="signup-button">Sign Up</button>
        </form>

        <div class="footer">
          <p>Already have an account? <router-link to="/">Login</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const avatar = ref(''); // 用于存储头像的URL
const verificationCode = ref(''); // 验证码

const fileInput = ref<HTMLInputElement | null>(null); // 引用文件输入框

// 计算属性，用于检查密码是否匹配
const passwordMismatch = computed(() => confirmPassword.value !== '' && password.value !== confirmPassword.value);

// 发送验证码
const sendVerificationCode = () => {
  if (email.value) {
    console.log(`Verification code sent to: ${email.value}`);
    alert('Verification code sent to your email.');
  } else {
    alert('Please enter a valid email to receive the verification code.');
  }
};

// 头像上传处理函数
const handleAvatarUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    avatar.value = URL.createObjectURL(file); // 创建本地头像URL并存储
  }
};

// 触发文件选择框
const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleSignUp = () => {
  if (!passwordMismatch.value) {
    console.log('Account created for:', { username: username.value, email: email.value, avatar: avatar.value, verificationCode: verificationCode.value });
  } else {
    alert("Please ensure the passwords match.");
  }
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
}

.card {
  display: flex;
  background-color: #f7f9fc;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 100%;
  height: 100%;
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

.signup-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 40px;
  overflow-y: auto;
}

.signup-panel h2 {
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

/* 验证码输入框和按钮的样式 */
.verification-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.send-code-button {
  background-color: #A3C2C7;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s;
}

.send-code-button:hover {
  background-color: #7c9599;
}

input[type="text"],
input[type="email"],
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
input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #6a6afc;
  outline: none;
}

/* 隐藏文件选择输入框 */
.hidden-file-input {
  display: none;
}

/* 错误提示样式 */
.error-text {
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
}

.signup-button {
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

.signup-button:hover {
  background-color: #7c9599;
}

/* 头像选择区域样式 */
.avatar-selection {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
}

.avatar-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #e0eafc;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  margin-bottom: 10px;
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
</style>
