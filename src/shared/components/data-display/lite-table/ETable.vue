<template>
  <div class="table">
    <table class="table__сontent">
      <slot name="header"></slot>
      <slot name="body"></slot>
    </table>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.table {
  border: 1px solid #d2d2e2;
  border-radius: 4px;
}
.table__сontent {
  width: 100%;
  border-collapse: collapse;
}
</style>
