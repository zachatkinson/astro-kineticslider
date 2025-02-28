# KineticSlider

A responsive, high-performance, interactive image slider component powered by <a href="https://pixijs.com">PixiJS</a> and <a href="https://gsap.com">GSAP</a>. KineticSlider offers smooth transitions, distortion effects, and interactive cursor-based animations.
KineticSlider is based on the awesome work done by <a href="https://github.com/hmongouachon">@hmongouachon</a> on <a href="https://github.com/hmongouachon/rgbKineticSlider">rgbKineticSlider</a>. This is a port of the original project to React and Astro, while updating the codebases to run on the latest versions and remove legacy and deprecated code.

![KineticSlider Demo](https://via.placeholder.com/800x400?text=KineticSlider+Demo)

## Features

- Interactive displacement effects that follow cursor movement
- Touch and swipe support for mobile devices
- Smooth GPU-accelerated animations powered by PixiJS
- Custom text overlays with configurable styling
- Responsive design that adapts to all screen sizes
- Filter effects with configurable intensities
- External navigation support
- SSR-friendly with loading placeholders

## Integration with Astro

Since KineticSlider is part of your Astro project, you likely already have it in your src/components directory. If you're setting up a new Astro project, you'll need to ensure you have the required dependencies.

### Required Dependencies

Make sure you have these dependencies in your Astro project:

```bash
npm install pixi.js gsap pixi-filters
# or
yarn add pixi.js gsap pixi-filters
```

### Astro Configuration

Ensure your `astro.config.mjs` includes React integration:

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
    integrations: [react()],
});
```

### Component Hydration

When using KineticSlider in Astro pages, you must add a client directive to hydrate the component:

```astro
<KineticSlider
  images={images}
  texts={texts}
  client:load
/>
```

The `client:load` directive ensures the component is interactive as soon as possible.

## Basic Usage

### In an Astro Page

```astro
---
// src/pages/index.astro
import KineticSlider from '../components/KineticSlider/KineticSlider';

// Array of image URLs
const images = [
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
];

// Array of text pairs [title, subtitle]
const texts = [
  ['Mountain Retreat', 'Experience nature at its finest'],
  ['Urban Adventure', 'Explore the concrete jungle'],
  ['Ocean Serenity', 'Relax with the sound of waves'],
];
---

<main>
  <div style="height: 500px; width: 100%;">
    <KineticSlider
      images={images}
      texts={texts}
      client:load
      <!-- Use client:load to ensure the component is hydrated immediately -->
    />
  </div>
</main>
```

### In a React Component within Astro

```jsx
// src/components/SimpleSlider.jsx
import React from 'react';
import KineticSlider from './KineticSlider/KineticSlider';

const SimpleSlider = () => {
  // Array of image URLs
  const images = [
    '/images/slide1.jpg',
    '/images/slide2.jpg',
    '/images/slide3.jpg',
  ];

  // Array of text pairs [title, subtitle]
  const texts = [
    ['Mountain Retreat', 'Experience nature at its finest'],
    ['Urban Adventure', 'Explore the concrete jungle'],
    ['Ocean Serenity', 'Relax with the sound of waves'],
  ];

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <KineticSlider
        images={images}
        texts={texts}
        // Additional options can be specified here
      />
    </div>
  );
};

export default SimpleSlider;
```

## Advanced Usage

### In an Astro Page

```astro
---
// src/pages/advanced-slider.astro
import KineticSlider from '../components/KineticSlider/KineticSlider';
import '../styles/slider-page.css';

const images = [
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
];

const texts = [
  ['Mountain Retreat', 'Experience nature at its finest'],
  ['Urban Adventure', 'Explore the concrete jungle'],
  ['Ocean Serenity', 'Relax with the sound of waves'],
];

// Custom filter configurations
const imageFilters = [
  { type: 'rgb-split', enabled: true, intensity: 15 },
  { type: 'bloom', enabled: true, intensity: 8 }
];

const textFilters = [
  { type: 'rgb-split', enabled: true, intensity: 5 }
];
---

<main>
  <div class="slider-container">
    <KineticSlider
      images={images}
      texts={texts}
      backgroundDisplacementSpriteLocation="/images/displacement/clouds.jpg"
      cursorDisplacementSpriteLocation="/images/displacement/ripple.png"
      cursorImgEffect={true}
      cursorTextEffect={true}
      cursorScaleIntensity={0.65}
      cursorMomentum={0.14}
      textTitleColor="white"
      textTitleSize={60}
      mobileTextTitleSize={40}
      textTitleLetterspacing={2}
      textTitleFontFamily="'Georgia', serif"
      textSubTitleColor="#ccc"
      textSubTitleSize={22}
      mobileTextSubTitleSize={16}
      textSubTitleLetterspacing={1}
      textSubTitleOffsetTop={15}
      mobileTextSubTitleOffsetTop={10}
      textSubTitleFontFamily="'Helvetica', sans-serif"
      imageFilters={imageFilters}
      textFilters={textFilters}
      transitionScaleIntensity={30}
      swipeScaleIntensity={2}
      client:load
    />
  </div>
</main>

<style>
  .slider-container {
    height: 500px;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
  }
</style>
```

### As a Reusable Component

```jsx
// src/components/AdvancedSlider.jsx
import React from 'react';
import KineticSlider from './KineticSlider/KineticSlider';

const AdvancedSlider = () => {
  const images = [
    '/images/slide1.jpg',
    '/images/slide2.jpg',
    '/images/slide3.jpg',
  ];

  const texts = [
    ['Mountain Retreat', 'Experience nature at its finest'],
    ['Urban Adventure', 'Explore the concrete jungle'],
    ['Ocean Serenity', 'Relax with the sound of waves'],
  ];

  // Custom filter configurations
  const imageFilters = [
    { type: 'rgb-split', enabled: true, intensity: 15 },
    { type: 'bloom', enabled: true, intensity: 8 }
  ];

  const textFilters = [
    { type: 'rgb-split', enabled: true, intensity: 5 }
  ];

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <KineticSlider
        images={images}
        texts={texts}
        backgroundDisplacementSpriteLocation="/images/displacement/clouds.jpg"
        cursorDisplacementSpriteLocation="/images/displacement/ripple.png"
        cursorImgEffect={true}
        cursorTextEffect={true}
        cursorScaleIntensity={0.65}
        cursorMomentum={0.14}
        textTitleColor="white"
        textTitleSize={60}
        mobileTextTitleSize={40}
        textTitleLetterspacing={2}
        textTitleFontFamily="'Georgia', serif"
        textSubTitleColor="#ccc"
        textSubTitleSize={22}
        mobileTextSubTitleSize={16}
        textSubTitleLetterspacing={1}
        textSubTitleOffsetTop={15}
        mobileTextSubTitleOffsetTop={10}
        textSubTitleFontFamily="'Helvetica', sans-serif"
        imageFilters={imageFilters}
        textFilters={textFilters}
        transitionScaleIntensity={30}
        swipeScaleIntensity={2}
      />
    </div>
  );
};

export default AdvancedSlider;
```

## Using External Navigation

### In an Astro Page

```astro
---
// src/pages/slider-with-nav.astro
import KineticSlider from '../components/KineticSlider/KineticSlider';

const images = [
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
];

const texts = [
  ['Mountain Retreat', 'Experience nature at its finest'],
  ['Urban Adventure', 'Explore the concrete jungle'],
  ['Ocean Serenity', 'Relax with the sound of waves'],
];
---

<div class="slider-section">
  <!-- External navigation buttons -->
  <div class="nav-buttons">
    <button class="main-nav prev">Previous</button>
    <button class="main-nav next">Next</button>
  </div>
  
  <!-- Slider with external navigation enabled -->
  <div class="slider-container">
    <KineticSlider
      images={images}
      texts={texts}
      externalNav={true}
      navElement={{ prev: '.main-nav.prev', next: '.main-nav.next' }}
      client:load
    />
  </div>
</div>

<style>
  .slider-section {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 0;
  }
  
  .nav-buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  
  .slider-container {
    height: 500px;
    width: 100%;
  }
  
  .main-nav {
    padding: 0.5rem 1rem;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    cursor: pointer;
    z-index: 100;
  }
  
  .main-nav:hover {
    background: rgba(0, 0, 0, 0.7);
  }
</style>
```

### As a Reusable Component

```jsx
// src/components/SliderWithNav.jsx
import React from 'react';
import KineticSlider from './KineticSlider/KineticSlider';

const SliderWithExternalNav = () => {
  const images = [
    '/images/slide1.jpg',
    '/images/slide2.jpg',
    '/images/slide3.jpg',
  ];

  const texts = [
    ['Mountain Retreat', 'Experience nature at its finest'],
    ['Urban Adventure', 'Explore the concrete jungle'],
    ['Ocean Serenity', 'Relax with the sound of waves'],
  ];

  return (
    <div className="slider-with-nav">
      {/* External navigation buttons */}
      <div className="nav-container">
        <button className="main-nav prev">Previous</button>
        <button className="main-nav next">Next</button>
      </div>
      
      {/* Slider with external navigation enabled */}
      <div style={{ height: '500px', width: '100%' }}>
        <KineticSlider
          images={images}
          texts={texts}
          externalNav={true}
          navElement={{ prev: '.main-nav.prev', next: '.main-nav.next' }}
        />
      </div>
    </div>
  );
};

export default SliderWithExternalNav;
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `string[]` | `[]` | Array of image URLs for the slides |
| `texts` | `[string, string][]` | `[]` | Array of text pairs [title, subtitle] for each slide |
| `backgroundDisplacementSpriteLocation` | `string` | `'/images/background-displace.jpg'` | URL for the background displacement map texture |
| `cursorDisplacementSpriteLocation` | `string` | `'/images/cursor-displace.png'` | URL for the cursor displacement map texture |
| `cursorImgEffect` | `boolean` | `true` | Enable/disable cursor-based image distortion effects |
| `cursorTextEffect` | `boolean` | `true` | Enable/disable cursor-based text movement effects |
| `cursorScaleIntensity` | `number` | `0.65` | Scaling factor for cursor displacement effect (0-1) |
| `cursorMomentum` | `number` | `0.14` | Duration of cursor follow animation in seconds |
| `textTitleColor` | `string` | `'white'` | Color for slide titles |
| `textTitleSize` | `number` | `64` | Font size for slide titles on desktop |
| `mobileTextTitleSize` | `number` | `40` | Font size for slide titles on mobile |
| `textTitleLetterspacing` | `number` | `2` | Letter spacing for slide titles |
| `textTitleFontFamily` | `string` | `undefined` | Font family for slide titles (uses system default serif if not specified) |
| `textSubTitleColor` | `string` | `'white'` | Color for slide subtitles |
| `textSubTitleSize` | `number` | `24` | Font size for slide subtitles on desktop |
| `mobileTextSubTitleSize` | `number` | `18` | Font size for slide subtitles on mobile |
| `textSubTitleLetterspacing` | `number` | `1` | Letter spacing for slide subtitles |
| `textSubTitleOffsetTop` | `number` | `10` | Vertical offset from title to subtitle on desktop |
| `mobileTextSubTitleOffsetTop` | `number` | `5` | Vertical offset from title to subtitle on mobile |
| `textSubTitleFontFamily` | `string` | `undefined` | Font family for slide subtitles (uses system default sans-serif if not specified) |
| `maxContainerShiftFraction` | `number` | `0.05` | Maximum fraction of container width/height that text can shift on cursor movement |
| `swipeScaleIntensity` | `number` | `2` | Scaling intensity for swipe gestures |
| `transitionScaleIntensity` | `number` | `30` | Scaling intensity for slide transitions |
| `externalNav` | `boolean` | `false` | Enable external navigation elements |
| `navElement` | `{ prev: string, next: string }` | `{ prev: '.main-nav.prev', next: '.main-nav.next' }` | CSS selectors for external navigation elements |
| `buttonMode` | `boolean` | `false` | Make text containers clickable (clicking advances to next slide) |
| `imageFilters` | `FilterConfig \| FilterConfig[]` | `[{ type: 'rgb-split', enabled: true, intensity: 15 }]` | Filter configurations for slide images |
| `textFilters` | `FilterConfig \| FilterConfig[]` | `[{ type: 'rgb-split', enabled: true, intensity: 5 }]` | Filter configurations for text overlays |

### Filter Configurations

KineticSlider supports a wide range of PixiJS filters that can be applied to both images and text overlays. Each filter is configured with an object containing:

- `type`: The filter type
- `enabled`: Boolean indicating if the filter is active
- `intensity`: Base intensity value (0-100) that controls the filter's strength
- Additional filter-specific parameters

Here's an example configuration with multiple filters:

```jsx
const imageFilters = [
  // RGB split effect
  { type: 'rgb-split', enabled: true, intensity: 15 },
  
  // Bloom effect for glow
  { type: 'bloom', enabled: true, intensity: 8, quality: 4 },
  
  // Color adjustment
  { 
    type: 'adjustment', 
    enabled: true, 
    intensity: 10,
    saturation: 1.2,
    contrast: 1.1,
    brightness: 1.05
  }
];
```

### Supported Filter Types

The KineticSlider supports the following filter types:

#### PIXI Filters (from pixi-filters library)
- [`adjustment`](#adjustment-filter-adjustment): Adjust gamma, saturation, contrast, brightness and color channels
- [`advanced-bloom`](#advanced-bloom-filter-advanced-bloom): Enhanced bloom/glow effect with more control
- [`ascii`](#ascii-filter-ascii): Renders the image as ASCII characters
- [`backdrop-blur`](#backdrop-blur-filter-backdrop-blur): Blur effect applied to the background
- [`bevel`](#bevel-filter-bevel): Creates a beveled edge effect
- [`bloom`](#bloom-filter-bloom): Creates a bloom/glow effect
- [`bulge-pinch`](#bulge-pinch-filter-bulge-pinch): Creates a bulge or pinch distortion
- [`color-gradient`](#color-gradient-filter-color-gradient): Applies a color gradient overlay
- [`color-map`](#color-map-filter-color-map): Maps colors using a reference texture
- [`color-overlay`](#color-overlay-filter-color-overlay): Applies a solid color overlay
- [`color-replace`](#color-replace-filter-color-replace): Replaces one color with another
- [`convolution`](#convolution-filter-convolution): Applies a convolution matrix filter
- [`cross-hatch`](#cross-hatch-filter-cross-hatch): Creates a cross-hatching effect
- [`crt`](#crt-filter-crt): Simulates a CRT (old TV) display
- [`dot`](#dot-filter-dot): Creates a dot-screen effect
- [`drop-shadow`](#drop-shadow-filter-drop-shadow): Adds a drop shadow
- [`emboss`](#emboss-filter-emboss): Creates an embossed effect
- [`glitch`](#glitch-filter-glitch): Simulates digital glitch artifacts
- [`glow`](#glow-filter-glow): Adds a glow effect
- [`godray`](#godray-filter-godray): Creates light ray effects
- [`grayscale`](#grayscale-filter-grayscale): Converts to grayscale
- [`hsl-adjustment`](#hsl-adjustment-filter-hsl-adjustment): Adjust hue, saturation, and lightness
- [`kawase-blur`](#kawase-blur-filter-kawase-blur): Alternative blur algorithm
- [`motion-blur`](#motion-blur-filter-motion-blur): Creates motion blur effect
- [`multi-color-replace`](#multi-color-replace-filter-multi-color-replace): Replaces multiple colors at once
- [`old-film`](#old-film-filter-old-film): Simulates old film grain and artifacts
- [`outline`](#outline-filter-outline): Creates an outline effect
- [`pixelate`](#pixelate-filter-pixelate): Creates a pixel art effect
- [`radial-blur`](#radial-blur-filter-radial-blur): Applies a radial blur
- [`reflection`](#reflection-filter-reflection): Creates a reflection effect
- [`rgb-split`](#rgb-split-filter-rgb-split): Creates RGB color splitting effect
- [`shockwave`](#shockwave-filter-shockwave): Simulates a shockwave distortion
- [`simple-lightmap`](#simple-lightmap-filter-simple-lightmap): Applies a simple light map
- [`simplex-noise`](#simplex-noise-filter-simplex-noise): Generates simplex noise pattern
- [`tilt-shift`](#tilt-shift-filter-tilt-shift): Creates a tilt-shift photography effect
- [`twist`](#twist-filter-twist): Applies a twist distortion
- [`zoom-blur`](#zoom-blur-filter-zoom-blur): Creates a zoom blur effect

#### Built-in PIXI Filters
- [`alpha`](#alpha-filter-alpha): Controls transparency
- [`blur`](#blur-filter-blur): Applies a Gaussian blur
- [`color-matrix`](#color-matrix-filter-color-matrix): Allows matrix-based color transformations
- [`displacement`](#displacement-filter-displacement): Creates displacement mapping effects
- [`noise`](#noise-filter-noise): Adds random noise

#### Custom Filters
- [`custom`](#custom-filter-custom): Allows implementing your own custom filter logic

#### Filter Options API

Each filter has specific configuration options you can use to customize its behavior. All filters share the base properties `type`, `enabled`, and `intensity`, plus filter-specific options:


##### Adjustment Filter (`adjustment`)
```js
{
  type: 'adjustment',
  enabled: true,
  intensity: 10,     // Maps to saturation and contrast
  gamma: 1.2,        // Optional: Gamma correction (default: 1)
  saturation: 1.5,   // Optional: Color saturation (default: 1)
  contrast: 1.2,     // Optional: Contrast adjustment (default: 1)
  brightness: 1.1,   // Optional: Brightness adjustment (default: 1)
  red: 1.0,          // Optional: Red channel adjustment (default: 1)
  green: 1.0,        // Optional: Green channel adjustment (default: 1)
  blue: 1.0,         // Optional: Blue channel adjustment (default: 1)
  alpha: 1.0         // Optional: Alpha/transparency adjustment (default: 1)
}
```

##### Advanced Bloom Filter (`advanced-bloom`)
```js
{
  type: 'advanced-bloom',
  enabled: true,
  intensity: 8,      // Controls bloomScale and brightness
  threshold: 0.5,    // Optional: Brightness threshold (default: 0.5)
  bloomScale: 1.0,   // Optional: Bloom scaling factor (default: 1.0)
  brightness: 1.0,   // Optional: Brightness adjustment (default: 1.0)
  quality: 4         // Optional: Quality of the effect (default: 4)
}
```

##### ASCII Filter (`ascii`)
```js
{
  type: 'ascii',
  enabled: true,
  intensity: 10,     // Maps inversely to size property
  size: 8,           // Optional: Size of ASCII blocks (default: 8)
  color: 0xFFFFFF    // Optional: Color of the ASCII characters (default: white)
}
```

##### Backdrop Blur Filter (`backdrop-blur`)
```js
{
  type: 'backdrop-blur',
  enabled: true,
  intensity: 5,      // Maps to strength
  quality: 4         // Optional: Quality of the blur (default: 4)
}
```

##### Bevel Filter (`bevel`)
```js
{
  type: 'bevel',
  enabled: true,
  intensity: 5,                  // Maps to thickness
  rotation: 45,                  // Optional: Light rotation (default: 45)
  thickness: 2,                  // Optional: Bevel thickness (default: 2)
  lightColor: 0xffffff,          // Optional: Light color (default: white)
  shadowColor: 0x000000,         // Optional: Shadow color (default: black)
  lightAlpha: 0.7,               // Optional: Light transparency (default: 0.7)
  shadowAlpha: 0.7               // Optional: Shadow transparency (default: 0.7)
}
```

##### Bloom Filter (`bloom`)
```js
{
  type: 'bloom',
  enabled: true,
  intensity: 5,      // Maps to strength
  quality: 4,        // Optional: Quality of the effect (default: 4)
  strength: 2,       // Optional: Strength of the bloom (default: 2)
  strengthX: 2,      // Optional: Horizontal strength (default: same as strength)
  strengthY: 2       // Optional: Vertical strength (default: same as strength)
}
```

##### Bulge Pinch Filter (`bulge-pinch`)
```js
{
  type: 'bulge-pinch',
  enabled: true,
  intensity: 5,           // Maps to strength (-0.5 to 0.5 range)
  radius: 100,            // Optional: Effect radius (default: 100)
  center: [0.5, 0.5]      // Optional: Center point [x, y] (default: [0.5, 0.5])
}
```

##### Color Gradient Filter (`color-gradient`)
```js
{
  type: 'color-gradient',
  enabled: true,
  intensity: 5,                        // Maps to alpha (0-1 range)
  alpha: 1,                            // Optional: Gradient opacity (default: 1)
  gradient: ['#000000', '#ffffff']     // Optional: Array of colors for gradient
}
```

##### Color Map Filter (`color-map`)
```js
{
  type: 'color-map',
  enabled: true,
  intensity: 5,
  colorMap: 'path/to/colormap.png',    // Optional: Path to color map texture
  nearest: false                       // Optional: Use nearest neighbor sampling (default: false)
}
```

##### Color Overlay Filter (`color-overlay`)
```js
{
  type: 'color-overlay',
  enabled: true,
  intensity: 5,          // Maps to alpha (0-1 range)
  color: 0xff0000,       // Optional: Overlay color (default: red)
  alpha: 0.5             // Optional: Overlay opacity (default: 0.5)
}
```

##### Color Replace Filter (`color-replace`)
```js
{
  type: 'color-replace',
  enabled: true,
  intensity: 5,               // Maps to epsilon/tolerance
  originalColor: 0xff0000,    // Optional: Color to replace (default: red)
  newColor: 0x0000ff,         // Optional: Replacement color (default: blue)
  epsilon: 0.4                // Optional: Color matching tolerance (default: 0.4)
}
```

##### Convolution Filter (`convolution`)
```js
{
  type: 'convolution',
  enabled: true,
  intensity: 5,
  matrix: [0, -1, 0, -1, 4, -1, 0, -1, 0],  // Optional: Convolution matrix (default: edge detection)
  width: 200,                               // Optional: Width parameter (default: 200)
  height: 200                               // Optional: Height parameter (default: 200)
}
```

##### Cross Hatch Filter (`cross-hatch`)
```js
{
  type: 'cross-hatch',
  enabled: true,
  intensity: 5        // This filter doesn't have adjustable properties
}
```

##### CRT Filter (`crt`)
```js
{
  type: 'crt',
  enabled: true,
  intensity: 5,           // Maps to lineWidth, noise, and vignetting
  curvature: 1,           // Optional: Screen curvature (default: 1)
  lineWidth: 1,           // Optional: Scanline width (default: 1)
  lineContrast: 0.25,     // Optional: Scanline contrast (default: 0.25)
  noise: 0.3,             // Optional: Noise amount (default: 0.3)
  noiseSize: 1,           // Optional: Noise particle size (default: 1)
  seed: 0,                // Optional: Random seed (default: random)
  vignetting: 0.3,        // Optional: Vignette amount (default: 0.3)
  vignettingAlpha: 1,     // Optional: Vignette transparency (default: 1)
  vignettingBlur: 0.3,    // Optional: Vignette blur (default: 0.3)
  time: 0                 // Optional: Animation time (default: 0)
}
```

##### Dot Filter (`dot`)
```js
{
  type: 'dot',
  enabled: true,
  intensity: 5,       // Maps to scale
  scale: 1,           // Optional: Dot scale (default: 1)
  angle: 5            // Optional: Dot pattern angle (default: 5)
}
```

##### Drop Shadow Filter (`drop-shadow`)
```js
{
  type: 'drop-shadow',
  enabled: true,
  intensity: 5,        // Maps to offset and blur
  alpha: 0.5,          // Optional: Shadow opacity (default: 0.5)
  distance: 5,         // Optional: Shadow distance (default: 5)
  blur: 2,             // Optional: Shadow blur (default: 2)
  color: 0x000000,     // Optional: Shadow color (default: black)
  quality: 3,          // Optional: Effect quality (default: 3)
  pixelSize: 1         // Optional: Shadow pixelation (default: 1)
}
```

##### Emboss Filter (`emboss`)
```js
{
  type: 'emboss',
  enabled: true,
  intensity: 5,       // Maps to strength
  strength: 5         // Optional: Emboss strength (default: 5)
}
```

##### Glitch Filter (`glitch`)
```js
{
  type: 'glitch',
  enabled: true,
  intensity: 5,       // Maps to slices and offset
  slices: 5,          // Optional: Number of slices (default: 5)
  offset: 100,        // Optional: Offset amount (default: 100)
  direction: 0,       // Optional: Glitch direction (default: 0)
  fillMode: 0,        // Optional: Fill mode (default: 0)
  seed: 0,            // Optional: Random seed (default: 0)
  average: false,     // Optional: Use average (default: false)
  minSize: 8,         // Optional: Minimum slice size (default: 8)
  sampleSize: 512     // Optional: Sample size (default: 512)
}
```

##### Glow Filter (`glow`)
```js
{
  type: 'glow',
  enabled: true,
  intensity: 5,          // Maps to outerStrength
  distance: 10,          // Optional: Glow distance (default: 10)
  outerStrength: 4,      // Optional: Outer glow strength (default: 4)
  innerStrength: 0,      // Optional: Inner glow strength (default: 0)
  color: 0xffffff,       // Optional: Glow color (default: white)
  quality: 0.1           // Optional: Effect quality (default: 0.1)
}
```

##### Godray Filter (`godray`)
```js
{
  type: 'godray',
  enabled: true,
  intensity: 5,          // Maps to gain
  angle: 30,             // Optional: Light ray angle (default: 30)
  gain: 0.5,             // Optional: Effect gain (default: 0.5)
  lacunarity: 2.5,       // Optional: Band density (default: 2.5)
  time: 0,               // Optional: Animation time (default: 0)
  parallel: true,        // Optional: Use parallel rays (default: true)
  center: [0.5, 0.5]     // Optional: Center point [x, y] (default: [0.5, 0.5])
}
```

##### Grayscale Filter (`grayscale`)
```js
{
  type: 'grayscale',
  enabled: true,
  intensity: 5,      // Maps to amount (0-1 range)
  amount: 1          // Optional: Grayscale amount (default: 1)
}
```

##### HSL Adjustment Filter (`hsl-adjustment`)
```js
{
  type: 'hsl-adjustment',
  enabled: true,
  intensity: 5,      // Maps to hue (0-360 range)
  hue: 0,            // Optional: Hue rotation (default: 0)
  saturation: 0,     // Optional: Saturation adjustment (default: 0)
  lightness: 0       // Optional: Lightness adjustment (default: 0)
}
```

##### Kawase Blur Filter (`kawase-blur`)
```js
{
  type: 'kawase-blur',
  enabled: true,
  intensity: 5,      // Maps to strength
  strength: 4,       // Optional: Blur strength (default: 4)
  quality: 3,        // Optional: Effect quality (default: 3)
  clamp: false       // Optional: Clamp edges (default: false)
}
```

##### Motion Blur Filter (`motion-blur`)
```js
{
  type: 'motion-blur',
  enabled: true,
  intensity: 5,                // Maps to velocity
  velocity: [40, 40],          // Optional: Velocity vector [x, y] (default: [40, 40])
  kernelSize: 5,               // Optional: Kernel size (default: 5)
  offset: 0                    // Optional: Effect offset (default: 0)
}
```

##### Multi Color Replace Filter (`multi-color-replace`)
```js
{
  type: 'multi-color-replace',
  enabled: true,
  intensity: 5,      // Maps to tolerance/epsilon
  replacements: [    // Optional: Color replacements
    {
      originalColor: 0xff0000,  // Color to replace
      newColor: 0x0000ff,       // Replacement color
      epsilon: 0.05             // Color matching tolerance
    },
    // Add more replacements as needed
  ]
}
```

##### Old Film Filter (`old-film`)
```js
{
  type: 'old-film',
  enabled: true,
  intensity: 5,             // Maps to sepia, noise, scratch, vignetting
  sepia: 0.3,               // Optional: Sepia amount (default: 0.3)
  noise: 0.3,               // Optional: Noise amount (default: 0.3)
  noiseSize: 1,             // Optional: Noise size (default: 1)
  scratch: 0.5,             // Optional: Scratch amount (default: 0.5)
  scratchDensity: 0.3,      // Optional: Scratch density (default: 0.3)
  scratchWidth: 1,          // Optional: Scratch width (default: 1)
  vignetting: 0.3,          // Optional: Vignette amount (default: 0.3)
  vignettingAlpha: 1,       // Optional: Vignette opacity (default: 1)
  vignettingBlur: 0.3       // Optional: Vignette blur (default: 0.3)
}
```

##### Outline Filter (`outline`)
```js
{
  type: 'outline',
  enabled: true,
  intensity: 5,        // Maps to thickness
  thickness: 1,        // Optional: Outline thickness (default: 1)
  color: 0x000000,     // Optional: Outline color (default: black)
  quality: 0.1         // Optional: Effect quality (default: 0.1)
}
```

##### Pixelate Filter (`pixelate`)
```js
{
  type: 'pixelate',
  enabled: true,
  intensity: 5,       // Maps inversely to size
  size: 10            // Optional: Pixel size (default: 10)
}
```

##### Radial Blur Filter (`radial-blur`)
```js
{
  type: 'radial-blur',
  enabled: true,
  intensity: 5,           // Maps to angle
  angle: 10,              // Optional: Blur angle (default: 10)
  center: [0.5, 0.5],     // Optional: Center point [x, y] (default: [0.5, 0.5])
  radius: -1              // Optional: Radius (-1 for auto) (default: -1)
}
```

##### Reflection Filter (`reflection`)
```js
{
  type: 'reflection',
  enabled: true,
  intensity: 5,          // Maps to amplitude
  mirror: true,          // Optional: Mirror mode (default: true)
  boundary: 0.5,         // Optional: Reflection boundary (default: 0.5)
  amplitude: [0, 20],    // Optional: Wave amplitude range (default: [0, 20])
  waveLength: [30, 100], // Optional: Wave length range (default: [30, 100])
  alpha: [1, 1],         // Optional: Opacity range (default: [1, 1])
  time: 0                // Optional: Animation time (default: 0)
}
```

##### RGB Split Filter (`rgb-split`)
```js
{
  type: 'rgb-split',
  enabled: true,
  intensity: 15, // Controls overall intensity
  redOffset: { x: 10, y: 0 },    // Optional: Red channel offset
  greenOffset: { x: 0, y: 0 },   // Optional: Green channel offset
  blueOffset: { x: -10, y: 0 }   // Optional: Blue channel offset
}
```

##### Shockwave Filter (`shockwave`)
```js
{
  type: 'shockwave',
  enabled: true,
  intensity: 5,           // Maps to amplitude
  center: [0.5, 0.5],     // Optional: Center point [x, y] (default: [0.5, 0.5])
  amplitude: 30,          // Optional: Wave amplitude (default: 30)
  wavelength: 160,        // Optional: Wave length (default: 160)
  speed: 500,             // Optional: Wave speed (default: 500)
  radius: -1,             // Optional: Effect radius (-1 for auto) (default: -1)
  brightness: 1,          // Optional: Brightness adjustment (default: 1)
  time: 0                 // Optional: Animation time (default: 0)
}
```

##### Simple Lightmap Filter (`simple-lightmap`)
```js
{
  type: 'simple-lightmap',
  enabled: true,
  intensity: 5,                 // Maps to alpha
  lightMap: '/path/to/map.jpg', // Optional: Path to lightmap texture
  scale: 1,                     // Optional: Scale factor (default: 1)
  alpha: 1,                     // Optional: Effect opacity (default: 1)
  color: 0xffffff               // Optional: Light color (default: white)
}
```

##### Simplex Noise Filter (`simplex-noise`)
```js
{
  type: 'simplex-noise',
  enabled: true,
  intensity: 5,      // Maps to scale
  scale: 1,          // Optional: Noise scale (default: 1)
  seed: 0,           // Optional: Random seed (default: 0)
  time: 0            // Optional: Animation time (default: 0)
}
```

##### Tilt Shift Filter (`tilt-shift`)
```js
{
  type: 'tilt-shift',
  enabled: true,
  intensity: 5,           // Maps to blur
  blur: 100,              // Optional: Blur amount (default: 100)
  gradientBlur: 600,      // Optional: Gradient blur size (default: 600)
  start: [0, 0],          // Optional: Effect start point [x, y] (default: [0, 0])
  end: [600, 600]         // Optional: Effect end point [x, y] (default: [600, 600])
}
```

##### Twist Filter (`twist`)
```js
{
  type: 'twist',
  enabled: true,
  intensity: 5,           // Maps to angle
  radius: 200,            // Optional: Effect radius (default: 200)
  angle: 4,               // Optional: Twist angle (default: 4)
  padding: 20,            // Optional: Edge padding (default: 20)
  offset: {x: 0, y: 0}    // Optional: Center offset (default: {x: 0, y: 0})
}
```

##### Zoom Blur Filter (`zoom-blur`)
```js
{
  type: 'zoom-blur',
  enabled: true,
  intensity: 5,           // Maps to strength
  strength: 0.1,          // Optional: Blur strength (default: 0.1)
  center: [0.5, 0.5],     // Optional: Center point [x, y] (default: [0.5, 0.5])
  innerRadius: 0,         // Optional: Inner radius (default: 0)
  radius: -1              // Optional: Effect radius (-1 for auto) (default: -1)
}
```

##### Alpha Filter (`alpha`)
```js
{
  type: 'alpha',
  enabled: true,
  intensity: 5,     // Maps to alpha (0-1 range)
  alpha: 1          // Optional: Transparency value (default: 1)
}
```

##### Blur Filter (`blur`)
```js
{
  type: 'blur',
  enabled: true,
  intensity: 5,        // Maps to blur strength
  strength: 8,         // Optional: Blur strength (default: 8)
  quality: 4,          // Optional: Blur quality (default: 4)
  resolution: 1,       // Optional: Resolution scale (default: 1)
  kernelSize: 5        // Optional: Kernel size (default: 5)
}
```

##### Color Matrix Filter (`color-matrix`)
```js
{
  type: 'color-matrix',
  enabled: true,
  intensity: 5,
  preset: 'contrast',      // Optional: Preset effect (see options below)
  matrix: [],              // Optional: Custom color matrix
  amount: 1,               // Optional: Effect amount for presets (default: 1)
  multiply: false          // Optional: Multiply mode (default: false)
}
```

Color matrix presets:
- `contrast`: Adjusts image contrast
- `desaturate`: Removes color saturation
- `kodachrome`: Applies a vintage Kodachrome film effect
- `lsd`: Creates a psychedelic effect
- `negative`: Inverts all colors
- `polaroid`: Simulates Polaroid camera effect
- `predator`: Creates thermal vision effect
- `saturate`: Enhances color saturation
- `sepia`: Applies sepia tone

##### Displacement Filter (`displacement`)
```js
{
  type: 'displacement',
  enabled: true,
  intensity: 5,                         // Maps to scale
  scale: { x: 20, y: 20 },              // Optional: Displacement scale vector
  displacementSprite: '/map.jpg'        // Optional: Path to displacement map texture
}
```

##### Noise Filter (`noise`)
```js
{
  type: 'noise',
  enabled: true,
  intensity: 5,      // Maps to noise (0-1 range)
  noise: 0.5,        // Optional: Noise amount (default: 0.5)
  seed: 0            // Optional: Random seed (default: 0)
}
```

##### Custom Filter (`custom`)
```js
{
  type: 'custom',
  enabled: true,
  intensity: 5,
  filter: myCustomFilter,                              // Required: Your custom filter instance
  updateIntensity: (filter, intensity) => {            // Required: Function to update intensity
    // Custom logic to update your filter based on intensity
    filter.customProperty = intensity * 0.1;
  }
}
```

## Performance Considerations

- Optimize your displacement map textures - smaller textures (512x512 or 1024x1024) with high contrast work best
- Be mindful of the number of filters used, especially on mobile devices
- Use appropriately sized images to avoid loading unnecessarily large files

## Browser Support

KineticSlider works in all modern browsers that support WebGL:

- <a href="https://www.google.com/intl/en_ca/chrome/">Chrome</a>
- <a href="https://www.mozilla.org/en-CA/firefox/new/">Firefox</a>
- <a href="https://www.apple.com/ca/safari/">Safari</a>
- <a href="https://www.microsoft.com/en-us/edge/download?form=MA13FJ">Edge</a>

## License

MIT