import { proToJap, proToKanji } from './translate.js'

document.getElementById('btn').addEventListener('click', () => {
  const word = document.getElementById('word').value
  const meaning = document.getElementById('meaning').value

  const data = localStorage.getItem('jap') ? JSON.parse(localStorage.getItem('jap')) : []
  data.push({word, meaning})
  
  localStorage.setItem('jap', JSON.stringify(data))
  location.reload()
})

document.getElementById('word').addEventListener('input', function(){
  document.querySelector('h1').innerText =
  document.getElementById('kanji').innerText = proToJap(proToKanji(this.value))
  
  document.querySelector('h2').innerText = proToJap(this.value)
})

document.querySelectorAll('input')
  .forEach(input => {
    input.addEventListener('input', () => {
      if(input.value) input.classList.add('valid')
      else input.classList.remove(['valid'])
    })
  })