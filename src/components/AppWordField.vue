<template>
  <input
    type="text"
    size="1"
    maxlength="1"
    class="w-10 rounded-md text-center uppercase p-1 my-2 border border-green-800 hover:bg-red-300 hover:border-red-700 focus:bg-red-300"
    v-model="LetterInput"
    @keyup="keyPressed($event)"
  />
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";

import { useInputWordsStore } from "../stores/inputWord";

export default {
  name: "AppWordField",
  props: ["inputIndex"],
  emits: ["enterPressed"],
  setup() {
    const inputWord = useInputWordsStore();
    return {
      v$: useVuelidate(),
      inputWord,
    };
  },
  data() {
    return {
      LetterInput: "",
    };
  },
  validations() {
    return {
      // LetterInput: { maxLength: 1 },
    };
  },
  computed: {},
  methods: {
    keyPressed(event) {
      var input = String.fromCharCode(event.keyCode);
      console.log("key pressed" + event.keyCode + " " + input);

      if (event.keyCode === 8) {
        event.target.previousElementSibling?.focus();
        if (this.inputWord.letters[this.inputIndex] != "") {
          console.log("delete value> " + event.target.value);

          this.inputWord.removeLetter(this.inputIndex);
          this.inputWord.decrementNumOfLetters();
        }
        console.log("number of letters > " + this.inputWord.numberOfLetters);
      }
      if (/[a-zA-Z]+/.test(input)) {
        event.target.value = input;
        if (
          this.inputWord.letters[this.inputIndex] === "" &&
          this.inputIndex < 10
        ) {
          this.inputWord.incrementNumOfLetters();
        }

        event.target.nextElementSibling?.focus();

        this.inputWord.addLetter(input, this.inputIndex);

        console.log("letter> " + input + " index> " + this.inputIndex);
        console.log("letters> " + this.inputWord.letters);
        console.log("number of letters > " + this.inputWord.numberOfLetters);
      }
      if (event.keyCode === 13) {
        // 13 is enter
        this.$emit("enterPressed");
      }
    },
  },
};
</script>
