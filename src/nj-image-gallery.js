import { LitElement, html, css } from 'lit';

// --- Configuration Constants ---
// This must match the parent folder in your 'public' directory (e.g., public/gallery-assets)
const ASSET_BASE_PATH = 'gallery-assets'; 
// This must match the prefix you use in the HTML tag (e.g., gallery-potatoes)
const GALLERY_PREFIX = 'gallery-'; 
const MANIFEST_FILE_NAME = 'manifest.json';

class ImageGallery extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 250px; 
      padding: 16px;
      box-sizing: border-box;
      border-radius: 8px;
      transition: .2s all ease-in-out;
    }
    
    .gallery {
      display: grid;
      /* Responsive grid: auto-fit as many 200px wide columns as possible */
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
      gap: 16px;
    }
    
    img {
      width: 100%;
      height: 100%;      
      object-fit: cover;
      border-radius: 4px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;
    }

    img:hover {
      transform: scale(1.02);
    }
    
    p {
      text-align: center;
      color: #777;
      font-style: italic;
    }
  `;

  static properties = {
    galleryName: { type: String, attribute: 'gallery-name' },
    imageFiles: { state: true },
    stateUpdate: { type: Boolean, attribute: 'state-update' },
    value: { type: String }
  };

  constructor() {
    super();
    this.galleryName = '';
    this.imageFiles = [];
    this.stateUpdate = false;
  }

  _getSubfolderName(propValue) {
    if (propValue && propValue.startsWith(GALLERY_PREFIX)) {
      return propValue.substring(GALLERY_PREFIX.length);
    }
    return propValue;
  }

  willUpdate(changedProperties) {
    if (changedProperties.has('galleryName') && this.galleryName) {
      this._fetchImageManifest();
    }
  }

  async _fetchImageManifest() {
    this.imageFiles = [];
    const subfolder = this._getSubfolderName(this.galleryName);
    
    // Example URL: /gallery-assets/potatoes/manifest.json
    const manifestUrl = `/${ASSET_BASE_PATH}/${subfolder}/${MANIFEST_FILE_NAME}`; 
    
    try {
      const response = await fetch(manifestUrl);

      if (!response.ok) {
        throw new Error(`Failed to load manifest. Status: ${response.status}`);
      }

      this.imageFiles = await response.json();

    } catch (error) {
      console.error(`[ImageGallery] Error loading assets for '${this.galleryName}':`, error);
      this.imageFiles = null; // Set to null to trigger an error message in render
    }
  }

  render() {
    if (!this.galleryName) {
      return html`<p>Error: Please provide a 'gallery-name' property.</p>`;
    }
    
    if (this.imageFiles === null) {
        return html`<p>Failed to load gallery assets for ${this.galleryName}. Check console.</p>`;
    }

    if (this.imageFiles.length === 0) {
      return html`<p>Loading images or gallery is empty...</p>`;
    }

    const subfolder = this._getSubfolderName(this.galleryName);
    
    return html`
      <div class="gallery">
        ${this.imageFiles.map(filename => html`
          <img 
            src="/${ASSET_BASE_PATH}/${subfolder}/${filename}" 
            alt="${this.galleryName} image: ${filename}"
            data-image-id="${filename}"
            @click=${() => {
              this.value = filename;
              this.dispatchEvent(new CustomEvent('change', {
                detail: { value: filename },
                bubbles: true,
                composed: true
              }));
            }}
            style="cursor: pointer"
          />
        `)}
      </div>
    `;
  }
}

customElements.define('nj-image-gallery', ImageGallery);