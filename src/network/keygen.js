const fs = require('fs')

function keygen (){
    var keyList = []

    for(var i = 0; i < 20; i++){
        keyList.push(genstring() + "-" + genstring() + "-" + genstring())
    }
    
    var json = JSON.stringify(keyList)
    fs.writeFile('registration-keys.json', json, (err) => {
        if (err){
            console.log("Error")
        } 
        console.log("10 keys added!")
    });
}

function genstring(){
    const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789"
    var alphabetArray = alphabet.split("")
    var string = ""

    for(var i = 0; i < 7; i++){
        var string = string + alphabetArray[Math.floor((Math.random() * 35) + 1)]
    }

    return(string)
}

keygen()