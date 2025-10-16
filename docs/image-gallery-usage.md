# Image Gallery Web Component Usage Guide

The `image-gallery` web component is a versatile gallery component that supports both global variables and framework state management through properties and events.

## Table of Contents
- [Vanilla JavaScript Usage](#vanilla-javascript-usage)
- [React Integration](#react-integration)
- [Vue Integration](#vue-integration)
- [Svelte Integration](#svelte-integration)
- [Angular Integration](#angular-integration)
- [Lit Integration](#lit-integration)
- [Component API Reference](#component-api-reference)

## Vanilla JavaScript Usage

### Using Global Variable
```html
<script>
  window.activeImage = null;
</script>
<image-gallery 
  gallery-name="gallery-potatoes" 
  global-var="activeImage"
></image-gallery>
```

### Using Event Listener
```html
<image-gallery gallery-name="gallery-potatoes"></image-gallery>
<script>
  document.querySelector('image-gallery').addEventListener('image-select', (e) => {
    const selectedImage = e.detail.value;
    // Do something with the selected image
    console.log('Selected:', selectedImage);
  });
</script>
```

## React Integration

### Basic Usage
```jsx
function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <image-gallery
      gallery-name="gallery-potatoes"
      onImage-select={(e) => setSelectedImage(e.detail.value)}
    />
  );
}
```

### With useCallback
```jsx
function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const handleImageSelect = useCallback((e) => {
    setSelectedImage(e.detail.value);
  }, []);

  return (
    <image-gallery
      gallery-name="gallery-potatoes"
      onImage-select={handleImageSelect}
    />
  );
}
```

## Vue Integration

### Composition API
```vue
<template>
  <image-gallery
    gallery-name="gallery-potatoes"
    @image-select="updateImage"
  />
</template>

<script setup>
const selectedImage = ref(null);
const updateImage = (e) => selectedImage.value = e.detail.value;
</script>
```

### Options API
```vue
<template>
  <image-gallery
    gallery-name="gallery-potatoes"
    @image-select="handleImageSelect"
  />
</template>

<script>
export default {
  data() {
    return {
      selectedImage: null
    }
  },
  methods: {
    handleImageSelect(e) {
      this.selectedImage = e.detail.value;
    }
  }
}
</script>
```

## Svelte Integration

```svelte
<script>
  let selectedImage = $state(null);
  
  function handleImageSelect(e) {
    selectedImage = e.detail.value;
  }
</script>

<image-gallery 
  gallery-name="gallery-potatoes"
  on:image-select={handleImageSelect}
/>
```

## Angular Integration

```typescript
@Component({
  selector: 'app-gallery',
  template: `
    <image-gallery
      gallery-name="gallery-potatoes"
      (image-select)="onImageSelect($event)"
    ></image-gallery>
  `
})
export class GalleryComponent {
  selectedImage: string | null = null;

  onImageSelect(event: CustomEvent) {
    this.selectedImage = event.detail.value;
  }
}
```

## Lit Integration

```typescript
class GalleryWrapper extends LitElement {
  @property()
  selectedImage = null;

  render() {
    return html`
      <image-gallery
        gallery-name="gallery-potatoes"
        @image-select=${(e) => this.selectedImage = e.detail.value}
      ></image-gallery>
    `;
  }
}
```

## Component API Reference

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| gallery-name | string | Yes | The name of the gallery to display |
| global-var | string | No | Name of global variable to update |
| state-update | boolean | No | Whether to dispatch state update event |

### Events

#### image-select

Event detail structure:
```typescript
{
  imageId: string;   // The filename/id of the selected image
  value: string;     // Same as imageId, provided for framework consistency
}
```

### Best Practices

The component follows web components best practices by:
1. Supporting both property and event-based state management
2. Using standard custom event patterns
3. Providing consistent event detail structure
4. Working across shadow DOM boundaries
5. Supporting both imperative and declarative usage patterns

### Notes

- The event-based approach makes it framework-agnostic
- Global variable option provides a simple solution for basic use cases
- Each framework can leverage its own state management patterns
- Events bubble up and cross shadow DOM boundaries (`composed: true`)