// import "https://code.jquery.com/jquery-3.7.1.slim.min.js"
// import { proToJap, proToKanji } from '../translate.js'

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

        cardEle.querySelector('.edit').onclick = () => {

        }

        cardEle.querySelector('.delete').onclick = () => {
            cards.splice(i, 1)
            updateCardList()
            localStorage.setItem('jap', JSON.stringify(cards))
        }

        cardsEle.appendChild(cardEle)
    }
}
