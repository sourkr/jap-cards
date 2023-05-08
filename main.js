// import { proToJap, proToKanji } from './translate.js'

navigator.serviceWorker.register('sw.js')

// document.getElementById("add").addEventListener('click', () => {
//   window.location.assign('add.html')
// })

// const data = localStorage.getItem('jap') ? JSON.parse(localStorage.getItem('jap')) : []
// const dataEle = document.getElementById('data')

// data.reverse().forEach((dat, i) => {
//   const container = dataEle.appendChild(document.createElement('div'))
//   const kanji = container.appendChild(document.createElement('h1'))
//   const hiragana = container.appendChild(document.createElement('h2'))
//   const subtitle = container.appendChild(document.createElement('span'))
//   const meaning = container.appendChild(document.createElement('div'))
//   const remove = container.appendChild(document.createElement('span'))
  
//   kanji.innerText = proToJap(proToKanji(dat.word))
//   hiragana.innerText = proToJap(dat.word)
//   subtitle.innerText = `\\${dat.word}\\`
//   meaning.innerText = dat.meaning
  
//   remove.classList.add('material-icons')
//   remove.innerText = 'delete_forever'
  
//   remove.onclick = () => {
//     data.splice(i, 1)
//     localStorage.setItem('jap', JSON.stringify(data))
//     window.location.assign('index.html')
//   }
// })