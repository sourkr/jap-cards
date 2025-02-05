import "https://code.jquery.com/jquery-3.7.1.slim.min.js"
import { proToJap, proToKanji } from './translate.js'

// if (localStorage.getItem('theme') === 'dark') {
//   document.querySelector(':root').style.setProperty('--background', 'black')
//   document.querySelector(':root').style.setProperty('--color', 'white')
// }


$('#btn').on('click', () => {
    const word = $('#word').val().trim()
    const meaning = $('#meaning').val().trim()

    const data = localStorage.getItem('jap') ? JSON.parse(localStorage.getItem('jap')) : []
    data.push({ word, meaning })
    
    console.log(data)
    localStorage.setItem('jap', JSON.stringify(data))
    location.reload()
})

document.getElementById('btn').addEventListener('click', () => {

})

// document.getElementById('word').addEventListener('input', function() {
//     document.querySelector('h1').innerText =
//         document.getElementById('kanji').innerText = proToJap(proToKanji(this.value))

//     document.querySelector('h2').innerText = proToJap(this.value)
// })

document.querySelectorAll('input')
    .forEach(input => {
        input.addEventListener('input', () => {
            if (input.value) input.classList.add('valid')
            else input.classList.remove(['valid'])
        })
    })