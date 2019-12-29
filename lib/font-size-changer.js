'use babel'

import FontSizeView from './font-size-view.js'
import FontSizeStatus from './font-size-status.js'

import { CompositeDisposable } from 'atom'
// import React from 'react'

export default {
  fontPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    // console.log(state)
    this.fontPackageView = new FontSizeView(state.fontPackageViewState)
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.fontPackageView.getElement(),
      visible: false,
    })

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'font-size-changer:toggle': () => this.toggle(),
        'font-size-changer:show': () => this.toggle(),
      })
    )
  },

  deactivate() {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.fontPackageView.destroy()

    this.statusBarTile.destroy()
    this.statusBarTile = null
  },

  serialize() {
    return {
      fontPackageView: this.fontPackageView.serialize(),
    }
  },

  toggle() {
    console.log('TestPackage was toggled!')
    return this.modalPanel.isVisible()
      ? this.modalPanel.hide()
      : this.modalPanel.show()
  },
  consumeStatusBar(statusBar) {
    this.statusBarTile = new FontSizeStatus(statusBar)
    this.statusBarTile.create()
  },
}
