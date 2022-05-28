<template>
  <div class="display" :style="textStyle" ref="text">
    {{ data }}
  </div>
</template>

<script>
export default {
  name: "calculator-display",
  props: {
    data: String
  },
  data() {
    return {
      textStyle: {
        fontSize: "10px"
      }
    }
  },
  methods: {
    getTextWidth(text, font) {
      let canvas = this.getTextWidth.canvas || (this.getTextWidth.canvas = document.createElement("canvas"));
      let context = canvas.getContext("2d");
      context.font = font;
      let metrics = context.measureText(text);
      return Math.floor(metrics.width);
    }
  },
  updated() {
    let w = this.getTextWidth(this.data, "Arial");
    if (w <= 40) {
      this.textStyle.fontSize = 50;
    } else if (w <= 70) {
      this.textStyle.fontSize = 30;
    } else if (w <= 120) {
      this.textStyle.fontSize = 20;
    } else {
      this.textStyle.fontSize = 10;
    }
    this.textStyle.fontSize += "px";
  }
}
</script>

<style scoped>
.display {
  justify-content: center;
  position: relative;
  width: 100%;
  height: 30%;
  background-color: white;
  color: black;
  border-radius: 7px;
  z-index: 2;
  display: flex;
  align-items: center;
  font-weight: 800;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
}
</style>