<template>
  <div class="paper"><slot></slot></div>
</template>

<style scoped>
.paper {
  max-width: 1260px;
  margin: 0 auto;
  padding: 40px 80px;
  background-color: var(--white-color);
  box-shadow: var(--card-shadow);
  border-radius: 6px;
}
</style>
