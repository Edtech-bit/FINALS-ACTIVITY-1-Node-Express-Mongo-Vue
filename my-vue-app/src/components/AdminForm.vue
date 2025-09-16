<template>
  <div>
    <h1>Admin Form with File Upload</h1>
    <form @submit.prevent="submitAdmin">
      <input v-model="adminID" placeholder="Admin ID" required />
      <input v-model="firstName" placeholder="First Name" required />
      <input v-model="lastName" placeholder="Last Name" required />
      <input v-model="department" placeholder="Department" required />
      <input type="file" @change="handleFile" />
      <button type="submit">Submit</button>
    </form>

  <button class="back-btn" @click="$emit('navigate', 'home')"> Back to Home</button>

    
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminID: "",
      firstName: "",
      lastName: "",
      department: "",
      file: null,
      admins: []
    };
  },
  methods: {
    handleFile(e) {
      this.file = e.target.files[0];
    },
    async submitAdmin() {
      const formData = new FormData();
      formData.append("adminID", this.adminID);
      formData.append("firstName", this.firstName);
      formData.append("lastName", this.lastName);
      formData.append("department", this.department);
      if (this.file) {
        formData.append("file", this.file);
      }

      await fetch("http://localhost:5000/uploadAdmin", {
        method: "POST",
        body: formData
      });

      this.fetchAdmins();
    },
    async fetchAdmins() {
      const res = await fetch("http://localhost:5000/admins");
      this.admins = await res.json();
    }
  },
  mounted() {
    this.fetchAdmins();
  }
};
</script>
