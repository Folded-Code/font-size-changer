'use babel'

import { Disposable } from 'atom'

export default class FontSizeStatus {
  constructor(statusBar) {
    this.statusBar = statusBar

    this.element = document.createElement('div')
    this.element.classList.add('font-size-status', 'inline-block')

    this.fontLink = document.createElement('a')
    this.fontLink.textContent = 'Font Size'
    this.fontLink.classList.add('inline-block')

    this.element.appendChild(this.fontLink)

    // this.activeItemSubscription = atom.workspace.observeActiveTextEditor(
    //   this.subscribeToActiveTextEditor.bind(this)
    // )
    const clickHandler = event => {
      event.preventDefault()
      atom.commands.dispatch(
        atom.workspace.getActiveTextEditor().element,
        'font-size-changer:show'
      )
    }
    this.element.addEventListener('click', clickHandler)
    this.clickSubscription = new Disposable(() =>
      this.element.removeEventListener('click', clickHandler)
    )
  }
  create() {
    this.tile = this.statusBar.addRightTile({
      priority: 100,
      item: this.element,
    })
    console.log(this.tile)
  }
}
