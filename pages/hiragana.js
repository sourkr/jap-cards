import { proToJap } from '../translate.js'

const lesson = parseInt(localStorage.getItem('hiragana-lesson') || '0')
const data = await fetch('/words/hiragana.json').then(response => response.json())

for(let element of data[lesson]){
  const kana = proToJap(element.kana)
  console.log(kana);
  updateCard(kana, element.kana, `${kana} is pronounced as ${element.details}`)
  await wait()
}

localStorage.setItem('hiragana-lesson', lesson)
location.assign('/test.html?type=hiragana')

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