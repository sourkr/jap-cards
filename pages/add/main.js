import "https://code.jquery.com/jquery-3.7.1.slim.min.js"

const cards = localStorage.getItem('jap') ? JSON.parse(localStorage.getItem('jap')) : []
const params = new URLSearchParams(location.search)

// console.log(location)

if(params.has('card')) {
    const index = parseInt(params.get('card'))
    const card = cards[index]
    
    $('#word').val(card.word)
    $('#word').attr('disabled', 'disabled')
    
    $('#meaning').val(card.meaning)
}


$('md-filled-button').on('click', ev => {
    ev.preventDefault()
    
    if(!checkWordField()) return
    
    if(!$('form')[0].checkValidity()) return
    
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

function checkWordField() {
    if (params.has('card')) return true
    
    const word = $("#word").val().trim()
    
    if (cards.find(card => card.word == word)) {
        $("#word").prop('error', true)
        $('#word').attr('error-text', `'${word}' is already in use`)
        return false
    } else {
        $("#word").prop('error', false)
        return true
    }
}