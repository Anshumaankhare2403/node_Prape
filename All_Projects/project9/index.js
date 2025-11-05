const fs = require('fs');
const readline = require('readline');

let tasks = []

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function sub() {
    rl.question("What is your choose only Numbers? \n1:Enter Task \n2:View Task \n3:Exit \nChoose It : ", handleData);

}

function handleData(data) {
    if (data === "1") {
        rl.question("Enter the task: ", (task) => {
            tasks.push(task);
            sub();
        })
    } else if (data === "2") {
        tasks.forEach((e, i) => {
            console.log(`Task ${i + 1}: ${e}`)
        })
        sub();
    }
    else if (data === "3") {
        console.log("Goodby");
        rl.close();
    }
    else {
        console.log("Please enter err")
        sub();
    }
}


sub();