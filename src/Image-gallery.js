import { LitElement, html, css } from 'lit';

// --- Configuration Constants ---
// This must match the parent folder in your 'public' directory (e.g., public/gallery-assets)
const ASSET_BASE_PATH = 'gallery-assets'; 
// This must match the prefix you use in the HTML tag (e.g., gallery-potatoes)
const GALLERY_PREFIX = 'gallery-'; 
const MANIFEST_FILE_NAME = 'manifest.json';
// -------------------------------

class ImageGallery extends LitElement {
  static styles = css`
    /* 1. Essential Host Styling (Prevents Collapse) */
    :host {
      display: block; /* Custom elements are 'inline' by default; this makes it block-level */
      width: 100%;    /* Take up the available width */
      min-height: 250px; /* Ensures visibility while loading/on error */
      padding: 16px;
      box-sizing: border-box;
      background-color: #f8f8f8;
      border-radius: 8px;
    }

    /* 2. Gallery Layout */
    .gallery {
      display: grid;
      /* Responsive grid: auto-fit as many 200px wide columns as possible */
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
      gap: 16px;
    }
    
    /* 3. Image Styling */
    img {
      width: 100%;       /* Fill the grid cell */
      height: 100%;      
      aspect-ratio: 1 / 1; /* Maintain a 1:1 aspect ratio */
      object-fit: cover; /* Crop the image to fill the 1:1 space */
      border-radius: 4px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;
    }

    img:hover {
      transform: scale(1.02);
    }
    
    /* 4. Placeholder/Loading Text */
    p {
      text-align: center;
      color: #777;
      font-style: italic;
    }
  `;

  static properties = {
    galleryName: { type: String, attribute: 'gallery-name' },
    imageFiles: { state: true }
  };

  constructor() {
    super();
    this.galleryName = '';  // e.g., 'gallery-potatoes'
    this.imageFiles = [];
  }

  // Helper function to extract the actual folder name (e.g., 'potatoes')
  _getSubfolderName(propValue) {
    if (propValue && propValue.startsWith(GALLERY_PREFIX)) {
      return propValue.substring(GALLERY_PREFIX.length);
    }
    return propValue;
  }

  // Lifecycle method: Called when a reactive property changes (like galleryName)
  willUpdate(changedProperties) {
    if (changedProperties.has('galleryName') && this.galleryName) {
      this._fetchImageManifest();
    }
  }

  async _fetchImageManifest() {
    this.imageFiles = []; // Clear previous results
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
            loading="lazy"
          />
        `)}
      </div>
    `;
  }
}

customElements.define('image-gallery', ImageGallery);