import "https://code.jquery.com/jquery-3.7.1.slim.min.js"

navigator.serviceWorker.register('sw.js')

/**
 * @type { {}[] }
 */
const cards = localStorage.getItem('jap') ? JSON.parse(localStorage.getItem('jap')) : []

updateCardList()

function updateCardList() {
    const cardsEle = document.getElementById('cards')
    
    cardsEle.innerHTML = ''
    
    for (let i = cards.length - 1; i >= 0; i--) {
        const cardData = cards[i]
        const cardEle = document.getElementById('card').content.cloneNode(true)

        cardEle.querySelector('.word').innerText = cardData.word
        cardEle.querySelector('.meaning').innerText = cardData.meaning
        cardEle.querySelector('.review').innerText = formatDate(new Date(cardData.nextRecallDate))

        cardEle.querySelector('.edit').onclick = () => {
            location.assign(`./pages/add/?card=${i}`)
        }

        cardEle.querySelector('.delete').onclick = () => {
            $('#dialog-delete').prop('returnValue', '')
            
            $('#dialog-delete')[0].show()
            
            $('#dialog-delete')[0].addEventListener('close', () => {
                if($('#dialog-delete').prop('returnValue') != 'delete') return
                
                cards.splice(i, 1)
                updateCardList()
                localStorage.setItem('jap', JSON.stringify(cards))
            }, { once: true })
        }

        cardsEle.appendChild(cardEle)
    }
}

$('#option-more').on('click', () => {
    // alert(!$('#menu-more').prop('open'))
    $('#menu-more').prop('open', !$('#menu-more').prop('open'))
})

function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1; // Months are zero-based
    let year = date.getFullYear() % 100; // Get last two digits of year

    return `${day}-${month}-${year}`;
}
