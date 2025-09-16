<template>
  <div>
    <header><h1>Welcome to the Portal</h1></header>
    <nav>
      <button @click="$emit('navigate', 'student')">Student Form</button> |
      <button @click="$emit('navigate', 'admin')">Admin Form</button>
    </nav>
    <main>
      <p>This is the home page. Please choose a form to fill out.</p>
    </main>
  </div>
</template>
