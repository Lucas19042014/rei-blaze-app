<template>
  <main>
    <div class="input-numbers">
        <input class="input-number" type="text" v-model="numberOne" :class="colorNumberOne" autofocus  />
        <input class="input-number" type="text" v-model="numberTwo" :class="colorNumberTwo"/>
        <input class="input-number" type="text" v-model="numberThree" :class="colorNumberThree" />
    </div>
    <p class="title-result">Maior probabilidade de sair:</p>
    <div class="color-result" :class="resultColor"></div>
    <br>
    <div class="white-possible" v-show="possibleWhite">
        <span>Possível Branco</span>
    </div>
  </main>
</template>
<script>
export default {
    name: 'HomeView',
    data() {
		return {
			numberOne: '',
            numberTwo: '',
            numberThree: ''
		};
	},
    computed: {
        colorNumberOne() {
            return this.chooseColor(this.numberOne);
        },
        colorNumberTwo() {
            return this.chooseColor(this.numberTwo);
        },
        colorNumberThree() {
            return this.chooseColor(this.numberThree);
        },
        possibleWhite() {
            const rest = this.moduleNumbers();
            const isWhiteForRest = rest === 1;
            const isWhiteForNumberThree = ['4', '8', '10', '12', '14'].includes(this.numberThree);
            const isWhiteForDopleteIsEight = (this.numberOne == '8' && this.numberTwo == '8') || (this.numberThree == '8' && this.numberTwo == '8');
            const isWhiteForDopleteIsSix = (this.numberOne == '6' && this.numberTwo == '6') || (this.numberThree == '6' && this.numberTwo == '6');
            const isWhiteForDopleteIsThreety = (this.numberOne == '13' && this.numberTwo == '13') || (this.numberThree == '13' && this.numberTwo == '13');
            const isWhiteForDepleteIsThreeAndNine = (this.numberOne == '3' && this.numberTwo == '9') || (this.numberThree == '9' && this.numberTwo == '3');
            const isWhiteForDepleteIsOneAndSix = (this.numberOne == '1' && this.numberTwo == '6') || (this.numberThree == '6' && this.numberTwo == '1');
            const isWhiteForOther = (this.numberThree == '13' && this.numberTwo == '9') || (this.numberThree == '2' && this.numberTwo == '2');

            return rest === 1 
                || isWhiteForRest 
                || isWhiteForNumberThree 
                || isWhiteForDopleteIsEight 
                || isWhiteForDopleteIsSix 
                || isWhiteForDopleteIsThreety 
                || isWhiteForDepleteIsThreeAndNine 
                || isWhiteForDepleteIsOneAndSix 
                || isWhiteForOther
        },
        resultColor() {
            const rest = this.moduleNumbers();
            if (!isNaN(rest)) {
                if (rest === 0)
                    return 'bg-red';
                
                return 'bg-black';
            }
        }
    },
    methods: {
        chooseColor(number) {
            if(isNaN(parseInt(number))) {
                return;
            }
            switch(number) {
                case '0':
                    return 'bg-white';
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                    return 'bg-red';
                default:
                    return 'bg-black'
            }
        },
        moduleNumbers() {
            return (parseInt(this.numberOne) + parseInt(this.numberTwo) + parseInt(this.numberThree)) % 2;
        }
    }
}
</script>
<style lang="css" src="./HomeView.css" scoped />