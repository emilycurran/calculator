class Calculator {
    userInput = "";
    lastAnswer = ""; 

    parseInput(inputString){
        //parses the brackets
        let indexLeftBracket;
        let indexRightBracket;
        for(let i=0; i<inputString.length; i++){
           if(inputString[i] == "("){
                indexLeftBracket = i;
           } 
           if(inputString[i] == ")"){
               if(indexLeftBracket == null){
                    return NaN;
               }
               indexRightBracket = i;
               let leftString = inputString.substring(0, indexLeftBracket);
               let middleString = inputString.substring(indexLeftBracket+1, indexRightBracket);
               let rightString = inputString.substring(indexRightBracket+1);
               let ret =  this.parseInput(leftString + this.parseInput(middleString) + rightString);
               return ret;
           }
        }

        //parses the + and - signs
        for(let i=0; i<inputString.length; i++){
            if (inputString[i] == "+"){
                let leftString = inputString.substring(0,i);
                let rightString = inputString.substring(i+1);
                let ret = this.parseInput(leftString) + this.parseInput(rightString);
                return ret;
            } 
            else if(inputString[i] == "-"){
                let leftString = inputString.substring(0,i);
                let rightString = inputString.substring(i+1);
                let ret = this.parseInput(leftString) - this.parseInput(rightString);
                return ret;
            }
        }

        //parses the * and / signs
        for(let i=0; i<inputString.length; i++){
            if (inputString[i] == "*"){
                let leftString = inputString.substring(0,i);
                let rightString = inputString.substring(i+1);
                let ret = this.parseInput(leftString) * this.parseInput(rightString);
                return ret;
            } 
            else if(inputString[i] == "/"){
                let leftString = inputString.substring(0,i);
                let rightString = inputString.substring(i+1);
                let ret = this.parseInput(leftString) / this.parseInput(rightString);
                return ret;
            }
        }

        if(inputString == ""){
            return inputString;
        }else{
            return parseFloat(inputString);
        }
    }

    updateUserInput(text){
        let temp = this.userInput+text;
        if(temp.length<22){
            this.userInput = temp;
        }
    }

    formatAnswer(ans){
        let ret = "";

        if(ans == ""){
            ret = "";
            this.lastAnswer = "";
        }
        else if(ans == Infinity){
            ret = "zero division error";
            this.lastAnswer = "";
        }else if(Number.isNaN(ans)){
            ret = "syntax error";
            this.lastAnswer = "";
        }else{
            ret = parseFloat(ans.toFixed(5));
            this.lastAnswer = ret;
        }

        return ret;
    }
}

myCalc = new Calculator();

const buttons = Array.from(document.querySelectorAll('.button'));
const textButtons = Array.from(document.querySelectorAll('.string-input'));
const ans = document.getElementById("answer");
const equals = document.getElementById("equals");
const clr = document.getElementById("clr");


textButtons.forEach(textButton => textButton.addEventListener('click', function(){
    text = this.innerHTML;
    myCalc.updateUserInput(text);
    document.getElementById("user-input").innerText = myCalc.userInput;
}));

equals.addEventListener('click', function(){
    var ans = myCalc.parseInput(myCalc.userInput);
    let output = myCalc.formatAnswer(ans);
    document.getElementById("output").innerText = output;
    myCalc.userInput = "";
    document.getElementById("user-input").innerText = "";
});

clr.addEventListener('click', function(){
    myCalc.userInput = "";
    myCalc.lastAnswer = "";
    document.getElementById("user-input").innerText = "";
    document.getElementById("output").innerText = "";
});

ans.addEventListener('click', function(){
        myCalc.updateUserInput(myCalc.lastAnswer);
        document.getElementById("user-input").innerText = myCalc.userInput;
});


// css styling

buttons.forEach(button => button.addEventListener('mouseover', function(){
    color = this.getAttribute("data-color");
    this.style.backgroundColor = color;
    if(this.getAttribute("data-color") != 'white'){
        this.style.color = "white";
    }
}));

buttons.forEach(button => button.addEventListener('mouseout', function(){
    color = this.getAttribute("data-color");
    this.style.backgroundColor = "";
    this.style.color = "rgb(151, 151, 151)";
}));

//adding keyboard functionality 

document.addEventListener('keydown', function (event) {

    //add key bindings for standard keys
    for(let i=0; i<textButtons.length; i++){
        if(event.key == textButtons[i].innerText){
            event.preventDefault();
            event.preventDefault();
            textButtons[i].click();
        }
    }

    if (event.key === 'Backspace') {
        event.preventDefault();
        clr.click();
    }

    if (event.key === 'Enter' || event.key === '='){
        event.preventDefault();
        equals.click();
    }

    if(event.key === 'a' ){
        event.preventDefault();
        ans.click();
    }

});