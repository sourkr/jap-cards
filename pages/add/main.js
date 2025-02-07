import "https://code.jquery.com/jquery-3.7.1.slim.min.js"

$('md-filled-button').on('click', () => {
    const word = $('#word').val().trim()
    const meaning = $('#meaning').val().trim()

    const data = localStorage.getItem('jap') ? JSON.parse(localStorage.getItem('jap')) : []
    data.push({ word, meaning })
    
    // console.log(data)
    localStorage.setItem('jap', JSON.stringify(data))
    location.reload()
})