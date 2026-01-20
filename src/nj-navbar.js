import { LitElement, css, html } from 'lit'
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class Navbar extends LitElement {
  set activeId(id) {
    // 1. Find all links inside the Shadow DOM
    const links = this.shadowRoot.querySelectorAll('a');
    
    links.forEach(link => {
      // 2. Toggle the 'active' class based on the numeric ID
      // We use String(id) to ensure it matches the link's id attribute
      link.classList.toggle('active', link.id === String(id));
    });
  }

  constructor() {
    super()
    this.docsHint = 'Click on the Vite and Lit logos to learn more'
    this.count = 0
  }
  connectedCallback() {
  super.connectedCallback();

  const sync = () => {
    const g = sessionStorage.getItem('gallery');
    if (g) {
      this.updateComplete.then(() => {
        this.activeId = g;
      });
    }
  };

  sync();
  window.addEventListener('pageshow', sync);
}

  render() {
    return html`
      <div class="container">
        <a href="index.html">
          Home
        </a>
        <a id="1" onclick="navigate('gallery','1')">
          Actress
        </a>
        <a id="2" onclick="navigate('gallery','2')">
          Artist
        </a>
        <a id="3" onclick="navigate('gallery','3')">
          Celebrity
        </a>
      </div>
    `
  }

  static get styles() {
    return css`
      .container {
        background-color: #534055;
        height: 106px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 0 70px;
        gap: 183px
      }
      a {
        font-size: 28px;
        text-align: center;
        text-decoration: none;
        color: #EFECCD;
        padding: 30px 50px;
        margin: auto
      }
      .active { font-weight: bold;}
    `
  }
}

window.customElements.define('nj-navbar', Navbar)
