import { proToJap } from '../translate.js'

const lesson = parseInt(localStorage.getItem('hiragana-lesson') || '0')
const url = new URL("../words/hiragana.json", window.location.href)
const data = await fetch(url).then(response => response.json())

for(let element of data[lesson]){
  const kana = proToJap(element.kana)
  console.log(kana);
  updateCard(kana, element.kana, `${kana} is pronounced as ${element.details}`)
  await wait()
}

localStorage.setItem('hiragana-lesson', lesson)
location.assign('./test/?type=hiragana')

function updateCard(title, subtitle, details) {
  document.getElementById('card').innerHTML = `
      <h1>${title}</h1>
      <span class="sub">${subtitle}</span>
      <div>${details}</div>`
}

function wait() {
  return new Promise((resolve, _reject) => {
    document.getElementById('next').addEventListener('click', resolve, { once: true })
  })
}