export class Content {
  constructor () {
    const elem = document.createElement('div')
    elem.innerText = 'This is Content'
    document.body.appendChild(elem)
  }
}