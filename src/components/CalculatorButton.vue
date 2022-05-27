<template>
  <div :class="[symbol === '='? 'eqls' : symbol === 'clear'? 'cl' : 'button']" @click="clicked">
    <b>{{symbol}}</b>
  </div>
</template>

<script>
export default {
  name: "calculator-button",
  props: {
    symbol: String
  },
  methods: {
    clicked() {
      this.$emit('clicked', {code: this.symbol});
    }
  }
}
</script>

<style scoped>
.button {
  width: 60px;
  height: 60px;
  background-color: grey;
  margin: 6px;
  border-radius: 7px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition-duration: .1s;
  box-shadow: -3px 0 0px #646464;
  font-size: 50px;
}
.button:hover {
  background-color: #a4a4a4;
}
.button:active {
  box-shadow: none;
  transform: translate(-4px, 0px);
}
b {
  font-weight: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.eqls {
  width: 60px;
  height: 30px;
  background-color: orange;
  margin: 3px 5px 3px 0px;
  border-radius: 7px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition-duration: .1s;
  box-shadow: -3px 0 0 #da9241;
  font-size: 30px;
}
.eqls:hover {
  background-color: #ffc67d;
}
.eqls:active {
  box-shadow: none;
  transform: translate(-4px, 0px);
}
.cl {
  width: 60px;
  height: 30px;
  background-color: orange;
  margin: 0;
  border-radius: 7px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition-duration: .1s;
  box-shadow: -4px 0 0 #da9241;
  font-size: 20px;
}
.cl:hover {
  background-color: #ffc67d;
}
.cl:active {
  box-shadow: none;
  transform: translate(-4px, 0px);
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
}
</style>