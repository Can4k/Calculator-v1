<template>
  <div class="calculator-container">
    <calculator-display :data="current_data"/>
    <div class="buttons-field">
      <!--Прошу прощения за этот код <=> I apologize for this code-->
      <calculator-button symbol="7" @clicked="clicked"/>
      <calculator-button symbol="8" @clicked="clicked"/>
      <calculator-button symbol="9" @clicked="clicked"/>
      <calculator-button symbol="+" @clicked="clicked"/>
      <calculator-button symbol="4" @clicked="clicked"/>
      <calculator-button symbol="5" @clicked="clicked"/>
      <calculator-button symbol="6" @clicked="clicked"/>
      <calculator-button symbol="-" @clicked="clicked"/>
      <calculator-button symbol="1" @clicked="clicked"/>
      <calculator-button symbol="2" @clicked="clicked"/>
      <calculator-button symbol="3" @clicked="clicked"/>
      <calculator-button symbol="*" @clicked="clicked"/>
      <calculator-button symbol="0" @clicked="clicked"/>
      <calculator-button symbol="." @clicked="clicked"/>
      <calculator-button symbol="/" @clicked="clicked"/>
      <div>
        <calculator-button symbol="=" @clicked="clicked"/>
        <calculator-button symbol="clear" @clicked="clicked"/>
      </div>
    </div>
  </div>
</template>

<script>
import CalculatorDisplay from "@/components/CalculatorDisplay";
import CalculatorButton from "@/components/CalculatorButton";
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
      this.firstOrder();
      this.secondOrder();
      return this.example_array[0];
    }
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      this.example = "";
      this.example_array = [];
     const k = e.key;
      if (k === '7') {
        document.getElementsByClassName('button')[0].click();
      }
      if (k === '8') {
        document.getElementsByClassName('button')[1].click();
      }
      if (k === '9') {
        document.getElementsByClassName('button')[2].click();
      }
      if (k === '+') {
        document.getElementsByClassName('button')[3].click();
      }
      if (k === '4') {
        document.getElementsByClassName('button')[4].click();
      }
      if (k === '5') {
        document.getElementsByClassName('button')[5].click();
      }
      if (k === '6') {
        document.getElementsByClassName('button')[6].click();
      }
      if (k === '-') {
        document.getElementsByClassName('button')[7].click();
      }
      if (k === '1') {
        document.getElementsByClassName('button')[8].click();
      }
      if (k === '2') {
        document.getElementsByClassName('button')[9].click();
      }
      if (k === '3') {
        document.getElementsByClassName('button')[10].click();
      }
      if (k === '*') {
        document.getElementsByClassName('button')[11].click();
      }
      if (k === '0') {
        document.getElementsByClassName('button')[12].click();
      }
      if (k === '.') {
        document.getElementsByClassName('button')[13].click();
      }
      if (k === '/') {
        document.getElementsByClassName('button')[14].click();
      }
      if (k === '=' || k === 'Enter') {
        document.getElementsByClassName('eqls')[0].click();
      }
      if (k === 'Backspace') {
        document.getElementsByClassName('cl')[0].click();
      }
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