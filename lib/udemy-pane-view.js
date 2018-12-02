'use babel';

export default class UdemyPaneView {
  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('udemy-pane');

    this.webview = document.createElement('webview');
    this.webview.classList.add('udemy-webview');
    this.webview.setAttribute('src', 'https://www.udemy.com');
    this.element.appendChild(this.webview);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  fitHeight() {
      this.webview.style.height = `${this.element.clientHeight}px`;
  }
}
