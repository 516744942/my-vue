const msg = 'typescript'
function sayHello(msg: String) {
  return 'hello, ' + msg
}


document.body.textContent = sayHello(msg)