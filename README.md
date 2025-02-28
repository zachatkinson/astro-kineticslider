# KineticSlider

A responsive, high-performance, interactive image slider component powered by PixiJS and GSAP. KineticSlider offers smooth transitions, distortion effects, and interactive cursor-based animations.

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

#### Supported Filter Types

The KineticSlider supports the following filter types:

##### PIXI Filters (from pixi-filters library)
- `rgb-split`: Creates RGB color splitting effect
- `adjustment`: Adjust gamma, saturation, contrast, brightness and color channels
- `advanced-bloom`: Enhanced bloom/glow effect with more control
- `ascii`: Renders the image as ASCII characters
- `backdrop-blur`: Blur effect applied to the background
- `bevel`: Creates a beveled edge effect
- `bloom`: Creates a bloom/glow effect
- `bulge-pinch`: Creates a bulge or pinch distortion
- `color-gradient`: Applies a color gradient overlay
- `color-map`: Maps colors using a reference texture
- `color-overlay`: Applies a solid color overlay
- `color-replace`: Replaces one color with another
- `convolution`: Applies a convolution matrix filter
- `cross-hatch`: Creates a cross-hatching effect
- `crt`: Simulates a CRT (old TV) display
- `dot`: Creates a dot-screen effect
- `drop-shadow`: Adds a drop shadow
- `emboss`: Creates an embossed effect
- `glitch`: Simulates digital glitch artifacts
- `glow`: Adds a glow effect
- `godray`: Creates light ray effects
- `grayscale`: Converts to grayscale
- `hsl-adjustment`: Adjust hue, saturation, and lightness
- `kawase-blur`: Alternative blur algorithm
- `motion-blur`: Creates motion blur effect
- `multi-color-replace`: Replaces multiple colors at once
- `old-film`: Simulates old film grain and artifacts
- `outline`: Creates an outline effect
- `pixelate`: Creates a pixel art effect
- `radial-blur`: Applies a radial blur
- `reflection`: Creates a reflection effect
- `shockwave`: Simulates a shockwave distortion
- `simple-lightmap`: Applies a simple light map
- `simplex-noise`: Generates simplex noise pattern
- `tilt-shift`: Creates a tilt-shift photography effect
- `twist`: Applies a twist distortion
- `zoom-blur`: Creates a zoom blur effect

##### Built-in PIXI Filters
- `alpha`: Controls transparency
- `blur`: Applies a Gaussian blur
- `color-matrix`: Allows matrix-based color transformations
- `displacement`: Creates displacement mapping effects
- `noise`: Adds random noise

##### Custom Filters
- `custom`: Allows implementing your own custom filter logic

## Performance Considerations

- Optimize your displacement map textures - smaller textures (512x512 or 1024x1024) with high contrast work best
- Be mindful of the number of filters used, especially on mobile devices
- Use appropriately sized images to avoid loading unnecessarily large files

## Browser Support

KineticSlider works in all modern browsers that support WebGL:

- Chrome
- Firefox
- Safari
- Edge

## License

MIT