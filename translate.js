const hiragana = (await fetch('./words/hiragana.txt')
  .catch(document.write)
  .then(response => response.text()))
  .split(/\n+/) ///  error
  .reverse()
  .map(line => {
    const [eng, jap] = line.split(' ')
    return {eng, jap}
  })
  
const kanji = (await fetch('./words/kanji.txt')
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