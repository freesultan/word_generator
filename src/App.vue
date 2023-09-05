<template>
  <div
    id="main-containter"
    class="flex flex-col bg-gray-200 justify-center px-20 py-5 rounded-md"
  >
    <div
      id="game-container"
      class="bg-green-400 border-2 border-green-800 shadow-green-800 shadow-lg w-full justify-center items-center mt-5 rounded-md p-5"
    >
      <h1 class="text-center font-bold mb-10 text-green-900">
        Enter letters below and get all combinations of three letter words
      </h1>

      <div
        id="words"
        class="flex flex-wrap py-5 justify-between items-cente w-3/4 lg:w-1/5 mx-auto my-1"
      >
        <userfield
          class="userfield"
          v-for="i in 10"
          :key="i"
          @enter-pressed="generateWord"
          :inputIndex="i - 1"
        />
      </div>

      <div class="flex justify-center p-20">
        <button
          type="button"
          @click="generateWord"
          class="inline-block m-3 px-6 py-2.5 bg-blue-600 text-white font-medium leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Generate Words
        </button>
        <button
          type="button"
          @click="reset"
          class="inline-block m-3 px-6 py-2.5 bg-blue-600 text-white font-medium leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Empty letters
        </button>
      </div>
    </div>
    <div
      id="result-container"
      class="flex flex-wrap bg-green-400 border border-green-800 shadow-lg shadow-green-800 w-full mt-5 rounded-md p-5"
    >
      <div
        class="border border-green-800 rounded-md p-2 m-3 bg-yellow-200 shadow-md font-bold text-green-900"
        v-for="(word, index) in words"
        :key="index"
      >
        {{ word.word }}:{{ word.meanings[0].definitions[0].definition }}
      </div>
    </div>
  </div>
</template>

<script>
import userfield from "./components/AppWordField.vue";
import { useInputWordsStore } from "./stores/inputWord";
import axios from "axios";

export default {
  name: "App",
  setup() {
    const InputWordsStore = useInputWordsStore();

    return {
      InputWordsStore,
    };
  },
  components: {
    userfield,
  },
  data() {
    return {
      words: [],
      allPossibleWords: [],
    };
  },
  beforeMount() {},
  methods: {
    reset() {
      this.words = [];
      this.allPossibleWords = [];
      this.InputWordsStore.letters = new Array(10).fill("");
      this.InputWordsStore.lettersWithoutSpace = [];
      this.InputWordsStore.words = [];
      this.InputWordsStore.numberOfLetters = 0;
      const nodeList = document.querySelectorAll(".userfield");
      console.log(nodeList);
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].value = "";
      }
    },
    generateWord() {
      this.letters = this.InputWordsStore.letters;
      //create words with letter
      this.InputWordsStore.generateWords();
      this.allPossibleWords = this.InputWordsStore.words;
      //call English dictionary
      this.allPossibleWords.forEach(this.getRealWords);
    },
    async getRealWords(item) {
      ////omit meaningless words using axios

      try {
        const response = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${item}`
        );
        if (response.status == 200) {
          console.log(response.data);
          this.words.push(response.data[0]);
        }
      } catch (error) {
        // console.error(error);
      }
    },
  },
};
</script>
