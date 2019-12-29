'use babel'

export default class FontSizeView {
  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div')
    this.element.classList.add('font-size-changer')

    // Create message element
    const message = document.createElement('div')
    message.textContent = 'yeet'
    message.classList.add('message')
    this.element.appendChild(message)
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
