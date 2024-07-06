const words = [
  "rainbow",
  "apricot",
  "telescope",
  "kangaroo",
  "symphony",
  "nostalgia",
  "volcano",
  "silhouette",
  "acrobat",
  "rhinoceros",
  "microscope",
  "firefly",
  "masquerade",
  "catastrophe",
  "banana",
  "apple",
  "orange",
  "grapefruit",
  "mango",
  "pineapple",
  "strawberry",
  "blueberry",
  "raspberry",
  "kiwi",
  "watermelon",
  "melon",
  "coconut",
  "tomato",
  "potato",
  "carrot",
  "onion",
  "cucumber",
  "lettuce",
  "spinach",
  "broccoli",
  "cauliflower",
  "celery",
  "cheese",
  "milk",
  "eggs",
  "butter",
  "bread",
  "chicken",
  "beef",
  "pork",
  "fish",
  "shrimp",
  "table",
  "chair",
  "sofa",
  "bed",
  "lamp",
  "computer",
  "phone",
  "television",
  "radio",
  "speaker",
  "book",
  "pencil",
  "paper",
  "scissors",
  "glue",
  "house",
  "car",
  "bicycle",
  "airplane",
  "ship",
  "dog",
  "cat",
  "bird",
  "fish",
  "horse",
  "happy",
  "sad",
  "angry",
  "surprised",
  "scared",
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "one",
  "two",
  "three",
  "four",
  "five",
  "morning",
  "afternoon",
  "evening",
  "night",
  "day",
  "hot",
  "cold",
  "wet",
  "dry",
  "windy",
  "big",
  "small",
  "tall",
  "short",
  "round",
  "clean",
  "dirty",
  "full",
  "empty",
  "open",
  "baby",
  "family",
  "friend",
  "school",
  "teacher",
  "student",
  "bookstore",
  "library",
  "city",
  "village",
  "country",
  "market",
  "shop",
  "restaurant",
  "cafe",
  "park",
  "garden",
  "beach",
  "mountain",
  "river",
  "forest",
  "flower",
  "tree",
  "sun",
  "moon",
  "star",
  "cloud",
  "snow",
  "rain",
  "wind",
  "storm",
  "lightning",
  "thunder",
  "friendship",
  "love",
  "peace",
  "war",
  "music",
  "song",
  "dance",
  "game",
  "sport",
  "exercise",
  "food",
  "drink",
  "water",
  "juice",
  "coffee",
  "tea",
  "cookie",
  "cake",
];

// Targeting Elements
const wordDiv = document.querySelector(".word-div");
const attemptsDiv = document.querySelector(".attempts");
const keyboardDiv = document.querySelector(".keyboard");
const retryButton = document.querySelector("#retry-button");

// Creating Game Variables
let secretWord;
let attempts;
let guessedLetters;

// Create Random Word
function randomWord() {
  return words[Math.floor(Math.random() * words.length - 1)];
}

// Initialize Game Board
function initialize() {
  // initializing/resetting game variables
  let letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  let display = "";
  attempts = 7;
  guessedLetters = [];
  secretWord = randomWord().toUpperCase();

  // creating display for word
  for (let i = 0; i < secretWord.length; i++) {
    display += "_";
  }

  // initializing/resetting game elements
  retryButton.style.display = "none";
  wordDiv.innerHTML = display;
  attemptsDiv.innerHTML = `You have ${attempts} attempts left.`;
  keyboardDiv.innerHTML = "";

  // adding keyboard to game
  letters.forEach((letter) => {
    const letterElement = document.createElement("button");
    letterElement.innerText = letter;
    letterElement.classList.add("letter");
    letterElement.addEventListener("click", (e) => {
      e.target.disabled = true;
      guess(secretWord, e.target.innerText);
    });
    keyboardDiv.append(letterElement);
  });
}

// Update Word Status
function guess(word, letter) {
  let display = "";

  guessedLetters.push(letter);
  for (let i = 0; i < word.length; i++) {
    if (guessedLetters.includes(word.charAt(i))) {
      display += word.charAt(i);
    } else {
      display += "_";
    }
  }

  wordDiv.innerHTML = display;

  if (!display.includes("_")) {
    gameOver(true);
  } else if (secretWord.includes(letter)) {
    attemptsDiv.innerHTML = `The letter, ${letter}, is in the word! <br> You have ${attempts} attempts left.`;
  } else if (attempts > 1) {
    attempts--;
    attemptsDiv.innerHTML = `You have ${attempts} attempts left.`;
  } else {
    gameOver(false);
  }
}

// Disable Buttons on Game Over
function gameOver(win) {
  const letterButtons = document.querySelectorAll(".letter");
  let disabledButtons = 0;
  letterButtons.forEach((button) => {
    if (button.disabled) {
      disabledButtons++;
    } else {
      button.disabled = true;
    }
  });

  if (win) {
    attemptsDiv.innerHTML = `You guessed the word! <br> It took you ${disabledButtons} letters to guess it.`;
  } else {
    attemptsDiv.innerHTML = `You failed to guess the word! It was ${secretWord}.`;
  }
  retryButton.style.display = "block";
}

// Reset/Retry event
retryButton.addEventListener("click", initialize);

// Initialize Game Board
initialize();
