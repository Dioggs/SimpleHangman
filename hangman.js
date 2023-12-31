import pro from 'prompt-sync';

const inp = pro();

const words = [
    "agua",
    "camiseta",
    "mel",
    "garrafa",
    "bolo",
    "torta",
    "linux",
    "maça",
    "macarrao",
    "hamburger",
];

let wins = 0;
let losses = 0;
let usedLetters = [];

startGame();

function startGame(){
    while(true){
        let randomWord = words[Math.floor(Math.random() * words.length)];
        
        let letterFields = randomWord
            .split("")
            .map(_ => { return "_" });
    
        letterFields.map(x => process.stdout.write(`${x} `));
        console.log();
        
        while(wins !== randomWord.length){
            let userChoice = inp("Diga uma letra: ");
    
            let isValidInput = validatePlayerInput(userChoice);
    
            if(!isValidInput){
                continue;
            }
    
            if(randomWord.includes(userChoice)){
                let indexes = [];
                for(let i = 0; i < randomWord.length; i++){
                    if(randomWord[i] === userChoice){
                        indexes.push(i);
                    }
                }

                indexes.map(i => {
                    letterFields[i] = userChoice;
                    wins++; 
                });
            }
            else {
                console.log("Letra errada, tente novamente\n");
                losses++;
            }
    
            letterFields.map(x => process.stdout.write(`${x} `));
            console.log();
        } 
    
        let replayChoice = endGame()
    
        if(replayChoice === "n"){
            console.log("Bye Bye");
            break;
        }
    }     
}

function validatePlayerInput(input){
    if(usedLetters.includes(input)){
        console.log("\nEsta letra ja foi utilizada\n");
        return false;
    }

    if(input.length > 1 || input.length < 1){
        console.log("\nUma letra inválida foi inserida\n");
        return false;
    }

    usedLetters.push(input);
    return true;
}

function endGame(){
    console.clear();

    console.log("\nParabéns! você ganhou!!!!!\n");

    wins = 0;
    losses = 0;
    usedLetters = [];

    return inp("Gostaria de jogar de novo[s/n]: ");
}




