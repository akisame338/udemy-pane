'use babel';

import UdemyPaneView from './udemy-pane-view';
import { CompositeDisposable } from 'atom';

export default {

  udemyPaneView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.udemyPaneView = new UdemyPaneView(state.udemyPaneViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.udemyPaneView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'udemy-pane:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.udemyPaneView.destroy();
  },

  serialize() {
    return {
      udemyPaneViewState: this.udemyPaneView.serialize()
    };
  },

  toggle() {
    console.log('UdemyPane was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
