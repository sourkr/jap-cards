// import "https://code.jquery.com/jquery-3.7.1.slim.min.js"
import { proToJap, proToKanji } from '../translate.js'

// navigator.serviceWorker.register('sw.js')

const data = localStorage.getItem('jap') ? JSON.parse(localStorage.getItem('jap')) : []
const dataEle = document.getElementById('data')
const list = [...data].reverse()

list.forEach((data, i) => {
    const card = document.getElementById('card').content.cloneNode(true)
    // console.log(card)
    card.querySelector('.word').innerText = data.word
    
    card.querySelector('.edit').onclick = () => {
        
    }
    
    document.getElementById('data').appendChild(card)
})

document.getElementById("add").addEventListener('click', () => {
  window.location.assign('add.html')
})