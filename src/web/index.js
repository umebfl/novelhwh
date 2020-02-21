import './index.less'

// 块级作用域
for (let i = 0; i < 10; i++) {
    console.log(i)
}
for (let num = 0; num < 5; num++) {
    console.log(num)
}

function testFunc(result) {
    console.log('out:i=', result)
}

// testFunc(i)
// testFunc(num)
console.log('hhh')

if (module.hot) {
    alert('hellp')
}
