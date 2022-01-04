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
        href: 'shoppingListView.html',
        active: this.checkPathname('shoppingListView.html'),
      },
      {
        name: 'WINE',
        href: 'wineView.html',
        active: this.checkPathname('wineView.html'),
      },
      // {
      //   name: 'NUTRITION',
      //   href: 'page.html',
      //   active: this.checkPathname('p.html'),
      // },
       {
         name: 'FAST FOOD',
         href: 'fastFood.html',
         active: this.checkPathname('fastFood.html'),
       },
    ];
  }

  checkPathname(path) {
    const slashLocation = 1;
    const pathname = window.location.pathname.split('/');
    return pathname[slashLocation] === path;
  }

  connectedCallback() {
    this.innerHTML = `
    <header class="nav-header">
    <img src="https://i.postimg.cc/CLjT73wQ/cook-logo.png" alt="fork and spoon logo" class="header__logo">
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
