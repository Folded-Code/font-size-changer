'use babel'

import { TextEditor } from 'atom'

export default class FontSizeView {
  constructor(serializedState) {
    this.miniEditor = new TextEditor({ mini: true })
    // this.miniEditor.element.addEventListener('blur', this.close.bind(this))

    this.message = document.createElement('div')
    this.message.classList.add('message')

    this.element = document.createElement('div')
    this.element.classList.add('font-size-view')
    this.element.appendChild(this.miniEditor.element)
    this.element.appendChild(this.message)
    console.log(this.element)
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove()
  }

  getElement() {
    return this.element
  }
}
