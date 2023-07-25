<script setup>
  const props = defineProps({
    stat: {
      type: Object,
      required: true
    }
  })

  let bar_percent = ((props.stat.base_stat / 255) * 100)

  const customColors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
  ]
</script>

<template>
  <span>{{ props.stat.stat.name }}</span>
  <div class="element_bar">
    <el-progress :percentage="bar_percent" :color="customColors" status="success"><span class="statbar_color">{{ props.stat.base_stat }}</span></el-progress>
  </div>
</template>

<style>
  .element_bar {
    width: 75%;
  }
  .statbar_color {
    color: black;
  }
</style>