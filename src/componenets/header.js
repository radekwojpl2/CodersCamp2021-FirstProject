// TEST

class foodAppHeader extends HTMLElement {
  constructor() {
    super();

  }

  connectedCallback() {
    this.innerHTML = `
    <header class="nav-header">
      <nav class="nav-bar">
        <ul class="nav-list">
          <li class="nav-item"><a href="#">Home</a></li>
          <li class="nav-item"><a href="#">Home</a></li>
          <li class="nav-item"><a href="#">Home</a></li>
          <li class="nav-item"><a href="#">Home</a></li>
          <li class="nav-item"><a href="#">Home</a></li>
          <li class="nav-item"><a href="#">Home</a></li>
        </ul>
      </nav>
    </header>
    `;
  }
};

customElements.define('component-header', foodAppHeader); // first param is html tag
