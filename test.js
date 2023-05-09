import { proToJap, proToKanji } from './translate.js'

if (localStorage.getItem('theme') === 'dark') {
  document.querySelector(':root').style.setProperty('--background', 'black')
  document.querySelector(':root').style.setProperty('--color', 'white')
}

const t = 100

function set(title, sub, options){
  return new Promise((resolve, reject) => {
    document.getElementById('title').innerText = title
    document.getElementById('sub').innerText = sub
    
    document.getElementById('options')
      .querySelectorAll('div')
      .forEach((ele, i) => {
        ele.innerText = options[i]
        
        ele.addEventListener('click', () => {
          resolve({ele, i})
        })
      })
  })
}

const data = localStorage.getItem('jap') ? JSON.parse(localStorage.getItem('jap')) : []

for(let i = 0; i < 5; i++){
  const data = random()
  const index = Math.round(Math.random() * 3)
  const options = []
  
  for(let j = 0; j < 4; j++){
    if(j === index) options.push(data.meaning)
    else options.push(random(options, data.meaning).meaning)
  }
  
  const out = await set(proToJap(data.word), data.word, options)
  if(out.i === index) out.ele.style.background = 'green'
  else out.ele.style.background = 'red'
  await sleep(t)
  out.ele.style.background = 'transparent'
}

for (let i = 0; i < 5; i++) {
  const data = random()
  const index = Math.round(Math.random() * 3)
  const options = []

  for (let j = 0; j < 4; j++) {
    if (j === index) options.push(data.meaning)
    else options.push(random(options, data.meaning).meaning)
  }

  const out = await set(proToJap(proToKanji(data.word)), data.word, options)
  if (out.i === index) out.ele.style.background = 'green'
  else out.ele.style.background = 'red'
  await sleep(t)
  out.ele.style.background = 'transparent'
}

for (let i = 0; i < 5; i++) {
  const data = random()
  const index = Math.round(Math.random() * 3)
  const options = []

  for (let j = 0; j < 4; j++) {
    if (j === index) options.push(data.meaning)
    else options.push(random(options, data.meaning).meaning)
  }

  const out = await set(proToJap(data.word), '', options)
  if (out.i === index) out.ele.style.background = 'green'
  else out.ele.style.background = 'red'
  await sleep(500)
  out.ele.style.background = 'transparent'
}

for (let i = 0; i < 5; i++) {
  const data = random()
  const index = Math.round(Math.random() * 3)
  const options = []

  for (let j = 0; j < 4; j++) {
    if (j === index) options.push(data.meaning)
    else options.push(random(options, data.meaning).meaning)
  }

  const out = await set(proToJap(proToKanji(data.word)), '', options)
  if (out.i === index) out.ele.style.background = 'green'
  else out.ele.style.background = 'red'
  await sleep(500)
  out.ele.style.background = 'transparent'
}

document.write(`press back`)

function random(a, b){
  let c = 0
  while(true){
    if(c >= 10) return {}
    
    const dat = data[Math.round(Math.random() * (data.length - 1))]
    // console.log(a, dat.meaning);;\
    if((a && (a.indexOf(dat.meaning) !== -1)) || b === dat.meaning) {
      c++
      continue
    }else return dat
  }
}

function sleep(time){
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}