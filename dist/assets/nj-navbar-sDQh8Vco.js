import{i as n,x as i,a as o}from"./index-C92rMK27.js";class c extends n{set activeId(e){this.shadowRoot.querySelectorAll("a").forEach(a=>{a.classList.toggle("active",a.id===String(e))})}constructor(){super(),this.docsHint="Click on the Vite and Lit logos to learn more",this.count=0}connectedCallback(){super.connectedCallback();const e=()=>{const t=sessionStorage.getItem("gallery");t&&this.updateComplete.then(()=>{this.activeId=t})};e(),window.addEventListener("pageshow",e)}render(){return i`
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
    `}static get styles(){return o`
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
    `}}window.customElements.define("nj-navbar",c);
