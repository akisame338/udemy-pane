'use babel';

export default class UdemyPaneView {
  PANE_MIN_WIDTH = 520;
  RESIZE_HANDLE_WIDTH = 4;

  constructor(serializedState) {
    this.resizing = false;

    let pane_width = this.PANE_MIN_WIDTH;
    if (serializedState && serializedState.width) {
      pane_width = parseInt(serializedState.width.replace('px', ''));
    }
    this.element = document.createElement('div');
    this.element.classList.add('udemy-pane');
    this.element.style.width = `${pane_width}px`;

    this.main = document.createElement('div');
    this.main.classList.add('udemy-pane-main');
    this.main.style.width = `${pane_width - this.RESIZE_HANDLE_WIDTH}px`;
    this.element.appendChild(this.main);

    let url = 'https://www.udemy.com';
    if (serializedState && serializedState.src) {
      url = serializedState.src;
    }
    this.webview = document.createElement('webview');
    this.webview.classList.add('udemy-webview');
    this.webview.setAttribute('src', url);
    this.main.appendChild(this.webview);

    const resizeHandler = document.createElement('div');
    resizeHandler.classList.add('udemy-resize-handle');
    resizeHandler.addEventListener('mousedown', () => this.resizeStarted());
    this.element.appendChild(resizeHandler);

    document.addEventListener('mousemove', (e) => this.resize(e));
    document.addEventListener('mouseup', () => this.resizeStopped());
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {
    return {
      src: this.webview.getAttribute('src'),
      width: this.element.style.width
    };
  }

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
