var inputLength = document.querySelector('#inputLength')
var checkboxes = document.querySelectorAll('.checkbox')
var textarea = document.querySelector('#generatedPassword')

function _getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const generator = {
  createNumber: function(count) {
    let str = ''
    for (let i = 0; i < count; i++) {
      str += _getRandomNumber(0, 9)
    }
    return str
  },
  createLower: function(count) {
    let letters = 'abcdefghijklmnoppqrstuvwxyz',
      str = ''
    for (let i = 0; i < count; i++) {
      str += letters.charAt(_getRandomNumber(0, letters.length - 1))
    }
    return str
  },
  createUpper: function(count) {
    let capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      str = ''
    for (let i = 0; i < count; i++) {
      str += capitalLetters.charAt(
        _getRandomNumber(0, capitalLetters.length - 1)
      )
    }
    return str
  },
  createSymbol: function(count) {
    let specialLetters = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
      str = ''
    for (let i = 0; i < count; i++) {
      str += specialLetters.charAt(
        _getRandomNumber(0, specialLetters.length - 1)
      )
    }
    return str
  },
}

function _generatePassword(rules, length) {
  const count = Math.ceil(length / rules.length)
  let str = ''
  rules.forEach(function(rule) {
    const method = `create${rule.charAt(0).toUpperCase()}${rule.slice(1)}`
    str += generator[method](count)
  })
  _mixup(str)
}

function onClickGenerateButton() {
  const rules = []
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      rules.push(checkbox.value)
    }
  })
  _generatePassword(rules, inputLength.value)
}

function _mixup(str, mixedStr = '') {
  let arr = str.split('')
  let index = _getRandomNumber(0, arr.length - 1)
  if (arr.length) {
    mixedStr += arr[index]
    arr.splice(index, 1)
    str = arr.join('')
    _mixup(str, mixedStr)
  } else {
    renderPassword(mixedStr.slice(0, inputLength.value))
  }
}

function renderPassword(str) {
  textarea.value = str
}

function copyPassword() {
  textarea.select()
  document.execCommand('copy')
}
