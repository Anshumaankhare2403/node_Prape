const fs = require('fs');
const os = require('os');
const cpu = os.cpus()
fs.writeFileSync('test.json', JSON.stringify(cpu, null, 2));
const data = fs.readFileSync('test.json', 'utf8');
// console.log(data)
// fs.appendFile("sex.txt", "\nsex with cardithya", (err) => {
//     if (err) throw err;
//     console.log("sex with lupa")
// })

// async in fs
// const data1 = fs.readFile('test.json', (err, data) => {
//     if (err) return err

//     console.log("sex")

// })
// console.log(data1)

// const data2 = fs.promises.readdir(__dirname).then(data => console.log(data)).catch(err => console.log(err))
// console.log(data2)

const a = fs.promises.readFile("test.json", "utf8").then(data => console.log(data)).catch(err => console.log(err))
console.log(a)