<template>
  <div class="calculator-container">
    <calculator-display :data="current_data"/>
    <div class="buttons-field">
      <!--Прошу прощения за этот код. I apologize for this code-->
      <calculator-button ref="b7" symbol="7" @clicked="clicked"/>
      <calculator-button ref="b8" symbol="8" @clicked="clicked"/>
      <calculator-button ref="b9" symbol="9" @clicked="clicked"/>
      <calculator-button ref="b+" symbol="+" @clicked="clicked"/>
      <calculator-button ref="b4" symbol="4" @clicked="clicked"/>
      <calculator-button ref="b5" symbol="5" @clicked="clicked"/>
      <calculator-button ref="b6" symbol="6" @clicked="clicked"/>
      <calculator-button ref="b-" symbol="-" @clicked="clicked"/>
      <calculator-button ref="b1" symbol="1" @clicked="clicked"/>
      <calculator-button ref="b2" symbol="2" @clicked="clicked"/>
      <calculator-button ref="b3" symbol="3" @clicked="clicked"/>
      <calculator-button ref="b*" symbol="*" @clicked="clicked"/>
      <calculator-button ref="b0" symbol="0" @clicked="clicked"/>
      <calculator-button ref="b." symbol="." @clicked="clicked"/>
      <calculator-button ref="b/" symbol="/" @clicked="clicked"/>
      <div>
        <calculator-button ref="b=" symbol="=" @clicked="clicked"/>
        <calculator-button ref="bBackspace" symbol="clear" @clicked="clicked"/>
      </div>
    </div>
  </div>
</template>

<script>
import CalculatorDisplay from "@/components/CalculatorDisplay";
import CalculatorButton from "@/components/CalculatorButton";
import legalSymbols from "@/main";
export default {
  name: "Calculator",
  components: {
    CalculatorButton, CalculatorDisplay
  },
  data() {
    return {
      current_data: "",
      example: "",
      example_array: []
    }
  },
  methods: {
    isSign(code) {
      return (code === '+' || code === '-' || code === '/' || code === '*');
    },
    clicked(data) {
      this.example = "";
      this.example_array = [];
      data = data.code;
      if (data === '=') {
        this.current_data = String(this.getAnswer(this.current_data));
      } else if (data === "clear") {
        this.current_data = this.current_data.slice(0, this.current_data.length - 1);
      } else {
        this.current_data += data;
      }
    },
    transformation() {
      while (this.example_array.indexOf('@') !== -1) {
        this.example_array.splice(this.example_array.indexOf('@'), 1);
      }
    },
    clearSpaces() {
      let txt = "";
      for (let i of this.example) {
        if (i !== ' ') {
          txt += i;
        }
      }
      this.example = txt;
    },
    createArray() {
      let tmp = "";
      for (let i of this.example) {
        if (i === '+' || i === '-' || i === '*' || i === '/') {
          if (tmp.length) {
            this.example_array.push(+tmp); tmp = "";
          }
          this.example_array.push(i);
        } else {
          tmp += i;
        }
      }
      if (tmp.length) {
        this.example_array.push(+tmp);
      }
    },
    zeroOrder() {
      if (this.example_array[0] === '-') {
        this.example_array[0] = "@";
        this.example_array[1] *= -1;
      }
      for (let i = 0; i < this.example_array.length - 1; i++) {
        if (this.example_array[i] === '*' && this.example_array[i + 1] === '-') {
          this.example_array[i + 2] *= -1;
          this.example_array[i + 1] = "@";
          this.transformation();
          i = 0;
        }
        if (this.example_array[i] === '/' && this.example_array[i + 1] === '-') {
          this.example_array[i + 2] *= -1;
          this.example_array[i + 1] = "@";
          this.transformation();
          i = 0;
        }
      }
    },
    firstOrder() {
      for (let i = 0; i < this.example_array.length; i++) {
        if (this.example_array[i] === '*') {
          this.example_array[i] = this.example_array[i - 1] * this.example_array[i + 1];
          this.example_array[i - 1] = "@"; this.example_array[i + 1] = "@";
          this.transformation();
          i = 0;
        }
        else if (this.example_array[i] === '/') {
          this.example_array[i] = this.example_array[i - 1] / this.example_array[i + 1];
          this.example_array[i - 1] = "@"; this.example_array[i + 1] = "@";
          this.transformation();
          i = 0;
        }
      }
    },
    secondOrder() {
      for (let i = 0; i < this.example_array.length; i++) {
        if (this.example_array[i] === '+') {
          this.example_array[i] = this.example_array[i - 1] + this.example_array[i + 1];
          this.example_array[i - 1] = "@"; this.example_array[i + 1] = "@";
          this.transformation();
          i = 0;
        }
        else if (this.example_array[i] === '-') {
          this.example_array[i] = this.example_array[i - 1] - this.example_array[i + 1];
          this.example_array[i - 1] = "@"; this.example_array[i + 1] = "@";
          this.transformation();
          i = 0;
        }
      }
    },
    getAnswer(ex) {
      this.example = ex;
      this.clearSpaces();
      if (this.example.length === 0) {
        return "";
      }
      this.createArray();
      this.zeroOrder();
      console.log(this.example_array);
      this.firstOrder();
      this.secondOrder();
      return this.example_array[0];
    }
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      let code = e.key;
      if (legalSymbols.indexOf(code) === -1) {
        return;
      }
      if (code === "Enter") {
        code = "=";
      }
      this.example = ""; this.example_array = [];
      this.$refs['b' + code].clicked();
    })
  }
}
</script>

<style scoped>
.calculator-container {
  background-color: gray;
  width: 340px;
  height: 550px;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
  padding: 20px 20px 0 20px;
  z-index: 1;
  box-shadow: #646464 -7px 0px;
}
.buttons-field {
  position: relative;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 55%;
  border-radius: 7px;
  background-color: #e1e8e7;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-direction: revert;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
}
</style>