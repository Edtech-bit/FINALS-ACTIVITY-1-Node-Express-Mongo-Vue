<template>
  <div id="app">
    <!-- Dynamically load whichever page is active -->
    <component :is="currentView" @navigate="navigate"></component>
  </div>
</template>

<script>
import HomePage from "./components/HomePage.vue";
import StudentForm from "./components/StudentForm.vue";
import AdminForm from "./components/AdminForm.vue";

export default {
  name: "App",
  components: {
    HomePage,
    StudentForm,
    AdminForm
  },
  data() {
    return {
      currentView: "HomePage" // default view
    };
  },
  methods: {
    navigate(page) {
      if (page === "student") this.currentView = "StudentForm";
      else if (page === "admin") this.currentView = "AdminForm";
      else this.currentView = "HomePage";
    }
  }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  padding: 20px;
}
</style>
