import "https://code.jquery.com/jquery-3.7.1.slim.min.js"

// const t = 100
let correct = 0

if (new URLSearchParams(location.search).get('type') === 'hiragana') {
    const list = [
        { kana: 'あ', alphabate: 'a' },
        { kana: 'い', alphabate: 'i' },
        { kana: 'う', alphabate: 'u' },
        { kana: 'え', alphabate: 'e' },
        { kana: 'お', alphabate: 'o' }
    ]

    setProgress(0, 10)
    for (let i = 0; i < 10; i++) {
        const answer = arrayRandom(list)
        const { options, index } = createOptions(answer, list)

        updateCard(answer.kana, '', options.map(element => element.alphabate), index)
        await wait()
        setProgress(i + 1, 10)
    }

    if (correct >= 8) localStorage.setItem('hiragana-lesson', parseInt(localStorage.getItem('hiragana-lesson')) + 1)
    document.write(`score: ${correct}/10, press back`)
} else {
    const data = localStorage.getItem('jap') ? JSON.parse(localStorage.getItem('jap')) : []
    if (data.length < 4) document.write('You need to add at least 4 cards to take test.')

    for (let i = 0; i < 5; i++) {
        const answer = arrayRandom(data)
        const { options, index } = createOptions(answer, data)
        updateCard(answer.word, options.map(element => element.meaning), index)
        await wait()
        setProgress(i + 1, 5)
    }

    document.write(`score: ${correct}/5 press back`)
}

function arrayRandom(array) {
    return array[Math.round(Math.random() * (array.length - 1))]
}

function createOptions(answer, array) {
    const index = Math.round(Math.random() * 3)
    const list = array.filter(element => element !== answer)
    const options = []

    options[index] = answer
    for (let i = 0; i < 4; i++) {
        if (i !== index) {
            options[i] = arrayRandom(list.filter(element => options.indexOf(element) === -1))
        }
    }

    return { options, index }
}

function updateCard(word, options, answer) {
    $('#word').text(word)
    
    document.getElementById('grid').addEventListener('click', (ev) => {
        const list = new Array(...document.querySelectorAll('#grid span'))

        if (list.indexOf(ev.target) === answer) {
            ev.target.style.background = 'hsl(100 100 90)'
            ev.target.style.color = 'var(--md-sys-color-on-surface)'
            correct++
        } else {
            ev.target.style.background = 'var(--md-sys-color-error)'
            ev.target.style.color = 'var(--md-sys-color-on-error)'
            
            list[answer].style.background = 'hsl(100 100 90)'
            list[answer].style.color = 'var(--md-sys-color-on-surface)'

        }
    }, { once: true })

    document.getElementById('grid')
        .querySelectorAll('span')
        .forEach((ele, i, arr) => {
            ele.innerText = options[i]
            ele.style.background = 'var(--md-sys-color-surface-container)'
            ele.style.color = 'var(--md-sys-color-on-surface)'
            
        })
}

function wait() {
    return new Promise((resolve, _reject) => {
        document.getElementById('next').addEventListener('click', () => {
            resolve()
        }, { once: true })
    })
}

function setProgress(done, total) {
    document.getElementById('progress-bar').value = done / total
    document.getElementById('counter').innerText = `${done} / ${total}`
}