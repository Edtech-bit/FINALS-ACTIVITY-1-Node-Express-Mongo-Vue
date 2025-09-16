<template>
  <div>
    <h1>Student Form with File Upload</h1>
    <form @submit.prevent="submitStudent">
      <input v-model="studentID" placeholder="Student ID" required />
      <input v-model="firstName" placeholder="First Name" required />
      <input v-model="lastName" placeholder="Last Name" required />
      <input v-model="section" placeholder="Section" required />
      <input type="file" @change="handleFile" />
      <button type="submit">Submit</button>
    </form>

  <button class="back-btn" @click="$emit('navigate', 'home')">Back to Home</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studentID: "",
      firstName: "",
      lastName: "",
      section: "",
      file: null,
      students: []
    };
  },
  methods: {
    handleFile(e) {
      this.file = e.target.files[0];
    },
    async submitStudent() {
      const formData = new FormData();
      formData.append("studentID", this.studentID);
      formData.append("firstName", this.firstName);
      formData.append("lastName", this.lastName);
      formData.append("section", this.section);
      if (this.file) {
        formData.append("file", this.file);
      }

      await fetch("http://localhost:5000/uploadStudent", {
        method: "POST",
        body: formData
      });

      this.fetchStudents();
    },
    async fetchStudents() {
      const res = await fetch("http://localhost:5000/students");
      this.students = await res.json();
    }
  },
  mounted() {
    this.fetchStudents();
  }
};
</script>
