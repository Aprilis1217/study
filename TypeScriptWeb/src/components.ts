namespace Components {
  // 子命名空间
  export namespace SubComponents {
    export class Test {}
  }
  export class Herader {
    constructor () {
      const header = document.createElement('div')
      header.innerText = 'This is Header'
      document.body.appendChild(header)
    }
  }
  export class Content {
    constructor () {
      const elem = document.createElement('div')
      elem.innerText = 'This is Content'
      document.body.appendChild(elem)
    }
  }
  export class Footer {
    constructor () {
      const footer = document.createElement('div')
      footer.innerText = 'This is Footer'
      document.body.appendChild(footer)
    }
  }
}