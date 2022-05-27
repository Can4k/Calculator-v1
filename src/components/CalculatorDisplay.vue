<template>
  <div class="display">
    {{data}}
  </div>
</template>

<script>
export default {
  name: "calculator-display",
  props: {
    data: String
  }
}
</script>

<style scoped>
.display {
  justify-content: center;
  position: relative;
  width: 100%; height: 30%;
  background-color: white;
  color: black;
  border-radius: 7px;
  z-index: 2;
  display: flex;
  align-items: center;
  font-weight: 1000;
  font-size: 15px;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
}
</style>