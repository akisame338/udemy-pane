'use babel';

export default class UdemyPaneView {
  PANE_MIN_WIDTH = 520;
  RESIZE_HANDLE_WIDTH = 4;

  constructor(serializedState) {
    this.resizing = false;

    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('udemy-pane');

    this.main = document.createElement('div');
    this.main.classList.add('udemy-pane-main');
    this.element.appendChild(this.main);

    this.webview = document.createElement('webview');
    this.webview.classList.add('udemy-webview');
    this.webview.setAttribute('src', 'https://www.udemy.com');
    this.main.appendChild(this.webview);

    const resizeHandler = document.createElement('div');
    resizeHandler.classList.add('udemy-resize-handle');
    resizeHandler.addEventListener('mousedown', () => this.resizeStarted());
    this.element.appendChild(resizeHandler);

    document.addEventListener('mousemove', (e) => this.resize(e));
    document.addEventListener('mouseup', () => this.resizeStopped());
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

  resizeStarted() {
    this.resizing = true;
  }

  resize(e) {
    if (!(this.resizing && e.which == 1)) {
      return;
    }

    let pane_width = e.pageX;
    if (pane_width < this.PANE_MIN_WIDTH) {
      pane_width = this.PANE_MIN_WIDTH;
    }
    this.element.style.width = `${pane_width}px`;
    this.main.style.width = `${pane_width - this.RESIZE_HANDLE_WIDTH}px`;
  }

  resizeStopped() {
    this.resizing = false;
  }

  fitHeight() {
      this.webview.style.height = `${this.element.clientHeight}px`;
  }
}
