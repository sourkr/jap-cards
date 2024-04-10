const url = new URL('https://sourkr.github.io/jap-cards/index.html')

const hiragana = await (await fetch(new URL('words/hiragana.txt', url))
  .then(response => response.text()))
  .split(/\n+/) ///  error
  .reverse()
  .map(line => {
    const [eng, jap] = line.split(' ')
    return {eng, jap}
  })
  
const kanji = await (await fetch(new URL('./words/kanji.txt', url))
  .then(response => response.text()))
  .split(/\n+/) ///  error
  .reverse()
  .map(line => {
    const [eng, jap] = line.split(' ')
    return { eng, jap }
  })
  
export function proToJap(pro){
  let str = pro
  
  hiragana.forEach(data => {
    str = str.replaceAll(data.eng, data.jap)
  })
  
  return str
}

export function proToKanji(pro) {
  let str = pro

  kanji.forEach(data => {
    str = str.replaceAll(data.eng, data.jap)
  })

  return str
}

// function error() {
  
// }