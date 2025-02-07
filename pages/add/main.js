import "https://code.jquery.com/jquery-3.7.1.slim.min.js"

const cards = localStorage.getItem('jap') ? JSON.parse(localStorage.getItem('jap')) : []
const params = new URLSearchParams(location.search)

console.log(location)

if(params.has('card')) {
    const index = parseInt(params.get('card'))
    const card = cards[index]
    
    $('#word').val(card.word)
    $('#meaning').val(card.meaning)
}

$('md-filled-button').on('click', () => {
    const word = $('#word').val().trim()
    const meaning = $('#meaning').val().trim()

    const data = localStorage.getItem('jap') ? JSON.parse(localStorage.getItem('jap')) : []
    
    if (params.has('card')) {
        data[parseInt(params.get('card'))] = { word, meaning }
    } else {
        data.push({ word, meaning })
    }
    
    localStorage.setItem('jap', JSON.stringify(data))
    location.reload()
})