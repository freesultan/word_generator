import { defineStore } from "pinia";

export const useInputWordsStore = defineStore("inputWord ", {
  state: () => {
    const letters = new Array(10).fill("");
    return {
      letters,
      lettersWithoutSpace: [],
      words: [],
      numberOfLetters: 0,
    };
  },
  actions: {
    addLetter(letter, place) {
      console.log("letter in pinia> " + letter + " place> " + place);
      this.letters.splice(place, 1, letter);
    },
    removeLetter(place) {
      console.log("remove letter");
      this.letters.splice(place, 1, "");

      console.log("letters> " + this.letters);
    },
    incrementNumOfLetters() {
      this.numberOfLetters++;
    },
    decrementNumOfLetters() {
      this.numberOfLetters--;
    },
    generateWords() {
      this.lettersWithoutSpace = this.letters.filter((x) => x.length > 0);
      console.log(this.lettersWithoutSpace);
      if (this.lettersWithoutSpace.length > 2) {
       
        for (let index1 in this.lettersWithoutSpace) {
          for (let index2 in this.lettersWithoutSpace) {
            for (let index3 in this.lettersWithoutSpace) {
              if (index1 != index2 && index2 != index3 && index1 != index3) {
                let word =
                  this.lettersWithoutSpace[index1] +
                  this.lettersWithoutSpace[index2] +
                  this.lettersWithoutSpace[index3];
                console.log(word);
                this.words.push(word);
              }
            }
          }
        }
      } else {
        alert("Please insert more than 2 letters");
      }
    },
  },
});
