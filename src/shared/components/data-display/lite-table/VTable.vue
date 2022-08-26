<template>
  <div class="table">
    <table class="table__сontent">
      <slot name="colgroup"></slot>
      <thead>
        <slot name="header"></slot>
      </thead>
      <tbody>
        <slot name="body"></slot>
      </tbody>
    </table>
  </div>
</template>

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
