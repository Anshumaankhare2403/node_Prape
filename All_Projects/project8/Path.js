const path = require('path')


const fullPath = path.join(__filename, 'New', 'file.txt');
console.log(fullPath)

const paresdata = path.parse(fullPath)
const resolvedpath = path.resolve(fullPath)
const extname = path.extname(fullPath)
const basesname = path.basename(fullPath)
const dire = path.dirname(fullPath)
const spretor = path.sep
console.log({ paresdata, resolvedpath, extname, basesname, dire, spretor })
