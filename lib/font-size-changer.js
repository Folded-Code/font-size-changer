'use babel'

import FontSizeView from './font-size-view.js'
import FontSizeStatus from './font-size-status.js'

import { CompositeDisposable } from 'atom'

export default {
  fontView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.fontView = new FontSizeView(state.fontPackageViewState)
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.fontView.getElement(),
      visible: false,
      autoFocus: true,
    })

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'font-size-changer:toggle': () => {
          this.toggle()
          this.fontView.miniEditor.element.focus()
        },
        'core:cancel': () => this.modalPanel.hide(),
        'core:confirm': () => this.setSize(),
      })
    )

    this.fontSizeObserveSubscription = atom.config.observe(
      'editor.fontSize',
      newValue =>
        this.statusElem !== undefined ? this.statusElem.update() : null
    )

    // this.fontView.miniEditor.onDidChange(() => {
    //   this.setSize()
    // })
  },

  deactivate() {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.fontView.destroy()

    this.statusElem.destroy()
    this.statusElem = null

    this.fontSizeObserveSubscription.dispose()
  },

  serialize() {
    return {
      fontView: this.fontView.serialize(),
    }
  },

  toggle() {
    return this.modalPanel.isVisible()
      ? this.modalPanel.hide()
      : this.modalPanel.show()
  },

  setSize() {
    atom.config.set('editor.fontSize', this.fontView.miniEditor.getText())
  },

  consumeStatusBar(statusBar) {
    this.statusElem = new FontSizeStatus(statusBar)
    this.statusElem.create()
  },
}
