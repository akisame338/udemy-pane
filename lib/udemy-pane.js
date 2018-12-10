'use babel';

import UdemyPaneView from './udemy-pane-view';
import { CompositeDisposable } from 'atom';

export default {
  udemyPaneView: null,
  leftPanel: null,
  subscriptions: null,

  activate(state) {
    this.udemyPaneView = new UdemyPaneView(state.udemyPaneViewState);
    this.leftPanel = atom.workspace.addLeftPanel({
      item: this.udemyPaneView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'udemy-pane:toggle': () => this.toggle(),
      'udemy-pane:search': () => this.search()
    }));
  },

  deactivate() {
    this.leftPanel.destroy();
    this.subscriptions.dispose();
    this.udemyPaneView.destroy();
  },

  serialize() {
    return {
      udemyPaneViewState: this.udemyPaneView.serialize()
    };
  },

  toggle() {
    if (this.leftPanel.isVisible()) {
      this.leftPanel.hide();
    } else {
      this.leftPanel.show();
      this.udemyPaneView.fitHeight();
    }
  },

  search() {
    const editor = atom.workspace.getActiveTextEditor();
    if (!editor) {
      return;
    }

    const selectedText = editor.getSelectedText();
    if (selectedText.length === 0) {
      return;
    }

    if (!this.leftPanel.isVisible()) {
      this.leftPanel.show();
      this.udemyPaneView.fitHeight();
    }
    const q = encodeURIComponent(selectedText);
    const url = `https://www.udemy.com/courses/search/?q=${q}`;
    this.udemyPaneView.webview.setAttribute('src', url);
  }
};
