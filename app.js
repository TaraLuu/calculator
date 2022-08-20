const inputArr = []
const hisArr = []
const memory = {y: 'start', o: 'start'}
const display = document.getElementById('display1')
const history = document.getElementById('display2')
const formula = [
    function addF(x, y) {return x + y;},
    function minusF(x, y) {return x - y;},
    function multipleF(x, y) {return x * y;},
    function divideF(x, y) {return x / y;}
];

document.getElementById('equal').addEventListener('click', (e) => {
    if (inputArr.length == 0) { 
        display.textContent = `${memory.y}`
        hisArr.pop()
        history.textContent = hisArr.join('')
    } else {
        hisArr.push(inputArr.join(''))
        history.textContent = hisArr.join('')
        calNum(memory.y , inputArr.join(''), memory.o) 
}})

document.getElementById('backspace').addEventListener('click', () => {
    inputArr.pop()
    display.textContent = inputArr.join('') 
})

document.getElementById('clear').addEventListener('click', () => {
    memory.y = 'start'
    memory.o = 0
    inputArr.length = 0
    hisArr.length = 0
    history.textContent = 0
    display.textContent = 0
})

document.querySelectorAll('.opr').forEach(cal => cal.addEventListener('click', (e) => {
    let i = inputArr.join('')
    if(memory.y == 'start') {
        memory.o = e.target.value
        memory.y = i
        inputArr.length = 0
        display.textContent = `${memory.y}`
    } else {
        calNum(memory.y , i, memory.o)
        memory.o = e.target.value
    }
    updateHistory(i, memory.o)
}))

document.querySelectorAll('.number').forEach(button => button.addEventListener('click',(event) => {
    if(inputArr.length == 0 && event.target.value == 0) {return} else {
    inputArr.push(event.target.value)
    display.textContent = inputArr.join('')}
}))

function calNum(n1, n2, uOp) {
    memory.y = formula[uOp](Number(n1), Number(n2))
    display.textContent = `${memory.y}`
    inputArr.length = 0
}

function updateHistory(i, o) {
    hisArr.push(i)
    switch (Number(o)) {
        case 0:
            hisArr.push('+');
            break;
        case 1:
            hisArr.push('-');
            break;
        case 2:
            hisArr.push('*');
            break;
        case 3:
            hisArr.push('/');
            break;
    }
    history.textContent = hisArr.join('')
}