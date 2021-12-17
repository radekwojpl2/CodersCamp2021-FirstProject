class foodAppHeader extends HTMLElement {
  constructor() {
    super();

    this.links = [
      {
        name: 'HOME',
        href: 'index.html',
        active: this.checkPathname('index.html'),
      },
      {
        name: 'SHOPPING LIST',
        href: 'shoppingList.html',
        active: this.checkPathname('shoppingList.html'),
      },
      {
        name: 'WINE',
        href: 'page.html',
        active: this.checkPathname('p.html'),
      },
      {
        name: 'NUTRITION',
        href: 'page.html',
        active: this.checkPathname('p.html'),
      },
      {
        name: 'FAST FOOD',
        href: 'page.html',
        active: this.checkPathname('p.html'),
      },
    ];
  }

  checkPathname(path) {
    const pathname = window.location.pathname.split('/');
    return pathname[1] === path;
  }

  connectedCallback() {
    this.innerHTML = `
    <header class="nav-header">
      <nav class="nav-bar">
        <ul class="nav-list">
          ${this.links
            .map(
              (link) =>
                `
            <li class="nav-item ${link.active ? 'active' : ''}">
              <a class="nav-link" href="${link.href}">${link.name}</a>
            </li>
            `
            )
            .join('')}
        </ul>
      </nav>
    </header>
    `;
  }
}

customElements.define('component-header', foodAppHeader); // first param is html tag
