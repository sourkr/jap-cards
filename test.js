import { proToJap, proToKanji } from './translate.js'

if (localStorage.getItem('theme') === 'dark') {
  document.querySelector(':root').style.setProperty('--background', 'black')
  document.querySelector(':root').style.setProperty('--background-faint', 'hsl(0, 0%, 10%)')
  document.querySelector(':root').style.setProperty('--color', 'white')
}

const t = 100
let correct = 0

if (new URLSearchParams(location.search).get('type') === 'hiragana') {
  const list = [
    { kana: 'あ', alphabate: 'a' },
    { kana: 'い', alphabate: 'i' },
    { kana: 'う', alphabate: 'u' },
    { kana: 'え', alphabate: 'e' },
    { kana: 'お', alphabate: 'o' }
  ]
  
  setProgress(0, 10)
  for(let i = 0; i < 10; i++){
    const answer = arrayRandom(list)
    const { options, index } = createOptions(answer, list)
    
    updateCard(answer.kana, '', options.map(element => element.alphabate), index)
    await wait()
    setProgress(i+1, 10)
  }
  
  if(correct >= 8) localStorage.setItem('hiragana-lesson', parseInt(localStorage.getItem('hiragana-lesson')) + 1)
  document.write(`score: ${correct}/10, press back`)
} else {
  const data = localStorage.getItem('jap') ? JSON.parse(localStorage.getItem('jap')) : []
  if(data.length < 4) document.write('You need to add at least 4 cards to take test.')
  
  for (let i = 0; i < 5; i++) {
    const answer = arrayRandom(data)
    const { options, index } = createOptions(answer, data)
    updateCard(proToJap(answer.word), answer.word, options.map(element => element.meaning), index)
    await wait()
    setProgress(i+1, 20)
  }
  
  for (let i = 0; i < 5; i++) {
    const answer = arrayRandom(data)
    const { options, index } = createOptions(answer, data)
    updateCard(proToJap(proToKanji(answer.word)), answer.word, options.map(element => element.meaning), index)
    await wait()
    setProgress(i+6, 20)
  }
  
  for (let i = 0; i < 5; i++) {
    const answer = arrayRandom(data)
    const { options, index } = createOptions(answer, data)
    updateCard(proToJap(answer.word), '', options.map(element => element.meaning), index)
    await wait()
    setProgress(i+11, 20)
  }
  
  for (let i = 0; i < 5; i++) {
    const answer = arrayRandom(data)
    const { options, index } = createOptions(answer, data)
    updateCard(proToJap(proToKanji(answer.word)), '', options.map(element => element.meaning), index)
    await wait()
    setProgress(i+16, 20)
  }
  
  document.write(`score: ${correct}/20 press back`)
}

function arrayRandom(array){
  return array[Math.round(Math.random() * (array.length-1))]
}

function createOptions(answer, array){
  const index = Math.round(Math.random() * 3)
  const list = array.filter(element => element !== answer)
  const options = []
  
  options[index] = answer
  for(let i = 0; i < 4; i++){
    if(i !== index){
      options[i] = arrayRandom(list.filter(element => options.indexOf(element) === -1))
    }
  }
  
  return { options, index }
}

function updateCard(title, subtitle, options, answer) {
  document.getElementById('title').innerText = title
  document.getElementById('sub').innerText = subtitle
  
  document.getElementById('options').addEventListener('click', (ev) => {
    const list = new Array(...document.querySelectorAll('#options div'))
    
    if (list.indexOf(ev.target) === answer) {
      ev.target.style.background = 'green'
      correct++
    } else {
      ev.target.style.background = 'red'
      list[answer].style.background = 'green'
    }
  }, {once: true})
  
  document.getElementById('options')
    .querySelectorAll('div')
    .forEach((ele, i, arr) => {
      ele.innerText = options[i]
      ele.style.background = 'transparent'
    })
}

function wait() {
  return new Promise((resolve, _reject) => {
    document.getElementById('next').addEventListener('click', () => {
      resolve()
    }, { once: true })
  })
}

function setProgress(done, total){
  document.getElementById('progress').style.setProperty('--progress', ((done/total) * 100) + '%')
  document.getElementById('counter').innerText = `${done}/${total}`
}