      //Declaring every word details as an object

      var wordList = [
        {
            word: "cat",
            hint: "a furry animal that likes to chase mice"
        },
        {
            word: "dog",
            hint: "a loyal animal often kept as a pet"
        },
        {
            word: "sun",
            hint: "the star that provides light and heat for the Earth"
        },
        {
            word: "book",
            hint: "a written or printed work consisting of pages glued or sewn together along one side and bound in covers"
        },
        {
            word: "cake",
            hint: "a sweet baked food made from a mixture of flour, sugar, and other ingredients"
        },
        {
            word: "tree",
            hint: "a perennial plant with a single stem or trunk, supporting branches and leaves"
        }
    ];

    var inputs = document.querySelector(".inputs");

    var resetBtn = document.querySelector(".reset-btn");  //getting random word on button click

    var wrongLetter = document.querySelector(".wrong-letters");

    //showing the hint of the random word

    var hint = document.querySelector(".hint span");

    //working on guesses

    var guessLeft = document.querySelector(".guess-left span");

    var typingInput = document.querySelector(".typing-input")
    
    
    
            //making word a global variable, so that i can access to it from  anywhere
            //showing correct and  wrong letters here

            let word,maxGuesses, corrects = [], incorrects = []; //resetting all values to default
 
            function randomWord(){//Lets get random object from the wordList

                var randomObj = wordList[Math.floor(Math.random() * wordList.length)];
    
                word = randomObj.word; //getting word of random object
    
                //maxGuesses is 8 by default
    
                maxGuesses = 8; 
                corrects = []; 
                incorrects = [];
    
                console.log(word);
    
                hint.innerText = randomObj.hint;
    
                guessLeft.innerText = maxGuesses;
    
                wrongLetter.innerText = incorrects;
    
                var html = "";
    
                for (var i=0; i< word.length; i++){
    
                    html += "<input type=Text disabled>";
    
                }
    
                inputs.innerHTML = html;
    
            }
    
            //getting random object from the wordList
    
            randomWord();
    
            //Getting user pressed key
    
            function initGame(e) {
    
                var key = e.target.value;
    
                //lets validate ser pressed key if its is alphabet character or number
    
                //lets restrict the user from typing the same key twice
    
                if(key.match(/^[A-Za-z]+$/) && (!incorrects.includes(key))
    
                && (!corrects.includes(key))){
    
                    console.log(key);
    
                    //lets check if entered letter is in the word or not
    
                    if(word.includes(key)){//if user letter found in the word
    
                        //lets sow the found letter in the input
    
                        for(var i = 0; i < word.length; i++){
    
                            //showing matched letter in the input value
    
                            if(word[i] === key) {
    
                                corrects.push(key);
    
                                inputs.querySelectorAll("input")[i].value = key; 
    
                            }
    
                        }
                        }
                    else{
    
                        maxGuesses--; 
                        //lets add space between the wrong letters
                        incorrects.push(key);
    
                    }
    
                guessLeft.innerText = maxGuesses;
    
                wrongLetter.innerText = incorrects;
    
                }
    
                //lets empty the input tag once user entered any key
    
                typingInput.value = "";
    
    
    
                //lets show alert if user found all letters
    
    
    
                //lets show alert after some delay, so the user entered key appear there
                setTimeout(function() {
                    if (corrects.length === word.length) {
                      alert("Congrats! You found the word. " + word.toUpperCase());
                      randomWord(); //invoking randomWord function, so the game reset
                    } else if (maxGuesses < 1) {
                      //if user id not find all the letters
                      alert("Game over! you don't have remaining guesses");
                      for (var i = 0; i < word.length; i++) {
                        //show all letters in the input
                        inputs.querySelectorAll("input")[i].value = word[i];
                      }
                    }
                  }, 1000); // Added a delay time of 1000milliseceonds before executing the code inside the function
                  
    
            }
    
            resetBtn.addEventListener("click", randomWord);
    
            typingInput.addEventListener("input", initGame);
    
         //There is no key event on phone, so user can activate the keyboard by click on the given input boxes
          inputs.addEventListener("click", function() {
            typingInput.focus();
             });
  
          //automatically focusing input when user press any key
            document.addEventListener("keydown", function() {
            typingInput.focus();
           });
  