import { proToJap, proToKanji } from '../translate.js'

if (localStorage.getItem('theme') === 'dark') {
  document.querySelector(':root').style.setProperty('--background', 'black')
  document.querySelector(':root').style.setProperty('--color', 'white')
  document.querySelector(':root').style.setProperty('--nav', 'hsl(0, 0%, 10%)')
}

navigator.serviceWorker.register('../sw.js')

const data = localStorage.getItem('jap') ? JSON.parse(localStorage.getItem('jap')) : []
const dataEle = document.getElementById('data')
const list = [...data].reverse()

list.forEach((dat, i) => {
  const container = dataEle.appendChild(document.createElement('div'))
  const kanji = container.appendChild(document.createElement('h1'))
  const hiragana = container.appendChild(document.createElement('h2'))
  const subtitle = container.appendChild(document.createElement('span'))
  const meaning = container.appendChild(document.createElement('div'))
  const remove = container.appendChild(document.createElement('span'))
  
  kanji.innerText = proToJap(proToKanji(dat.word))
  hiragana.innerText = proToJap(dat.word)
  subtitle.innerText = `\\${dat.word}\\`
  meaning.innerText = dat.meaning
  
  remove.classList.add('material-icons')
  remove.innerText = 'delete_forever'
  
  remove.onclick = () => {
    const index = data.indexOf(dat)
    data.splice(index, 1)
    
    localStorage.setItem('jap', JSON.stringify(data))
    location.reload()
  }
})

document.getElementById("add").addEventListener('click', () => {
  window.location.assign('add.html')
})