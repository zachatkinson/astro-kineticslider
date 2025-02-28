# Astro Kinetic Slider

A modern, high-performance image slider with kinetic effects built for Astro. Leveraging the power of PixiJS v8, GSAP v3, and React v19, this component provides a highly customizable interactive experience with displacement effects, RGB splitting, interactive cursor effects, and more.

This component is a modernized and upgraded version of the RGBKineticSlider by @hmongouachon, rewritten as a TypeScript React component for Astro integration.

![Astro Kinetic Slider Demo](https://example.com/demo.gif) <!-- Consider adding a demo GIF here -->

## ✨ Features

- Smooth transitions with displacement effects
- RGB splitting and other visual filters
- Interactive cursor effects
- Text overlay with title and subtitle
- Responsive design for desktop and mobile
- Touch swipe support
- Mouse drag navigation
- Keyboard navigation
- External navigation option
- Customizable text styling
- Comprehensive filter system

## 🚀 Installation

```bash
# Install the slider and its dependencies
npm install astro-kineticslider
```

Make sure you have the required peer dependencies:

```bash
npm install gsap@^3.12.7 pixi.js@^8.8.0 pixi-filters@^6.1.0 react@^19.0.0
```

## 📁 Project Structure

```text
/
├── public/
│   ├── fonts/
│   │   ├── VAMOS.woff2
│   ├── images/
│   │   ├── slides/
│   │   │   ├── 1.jpg
│   │   │   ├── 2.jpg
│   │   │   ├── ...
│   │   ├── background-displace.jpg
│   │   └── cursor-displace.png
├── src/
│   ├── components/
│   │   ├── KineticSlider/
│   │   │   ├── filters/
│   │   │   │   ├── FilterFactory.ts
│   │   │   │   └── types.ts
│   │   │   ├── helpers/
│   │   │   │   ├── LoadingIndicator.tsx
│   │   │   │   ├── scalingCalculations.ts
│   │   │   │   └── slideTransition.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useDisplacementEffects.ts
│   │   │   │   ├── useFilters.ts
│   │   │   │   ├── useSlides.ts
│   │   │   │   └── ... (other hooks)
│   │   │   ├── utils/
│   │   │   │   ├── assetPreload.ts
│   │   │   │   ├── calculateSpriteScale.ts
│   │   │   │   └── fontUtils.ts
│   │   │   ├── ImportHelpers.ts
│   │   │   ├── KineticSlider.module.css
│   │   │   ├── KineticSlider.tsx
│   │   │   └── types.ts
```

## 📖 Usage

### Basic Usage

```jsx
import KineticSlider from 'astro-kineticslider';

// Define your images and text
const images = [
  '/images/slides/1.jpg',
  '/images/slides/2.jpg',
  '/images/slides/3.jpg'
];

const texts = [
  ['Slide 1', 'Description for slide 1'],
  ['Slide 2', 'Description for slide 2'],
  ['Slide 3', 'Description for slide 3']
];

// Use the component
const MySlider = () => (
  <KineticSlider
    images={images}
    texts={texts}
    imagesRgbEffect={true}
    textsRgbEffect={true}
    cursorImgEffect={true}
  />
);

export default MySlider;
```

### Advanced Usage with Custom Filters

```jsx
import KineticSlider from 'astro-kineticslider';

const images = ['/images/slides/1.jpg', '/images/slides/2.jpg'];
const texts = [
  ['Creative', 'Interactive Experience'],
  ['Modern', 'Web Technology']
];

// Custom filter configurations
const imageFilters = [
  {
    type: 'rgb-split',
    enabled: true,
    intensity: 15
  },
  {
    type: 'old-film',
    enabled: true,
    intensity: 5,
    sepia: 0.3,
    noise: 0.3
  }
];

const textFilters = [
  {
    type: 'glow',
    enabled: true,
    intensity: 5,
    color: '#ffffff',
    outerStrength: 2
  }
];

const AdvancedSlider = () => (
  <KineticSlider
    images={images}
    texts={texts}
    imageFilters={imageFilters}
    textFilters={textFilters}
    cursorImgEffect={true}
    cursorTextEffect={true}
    textTitleFontFamily="VAMOS, sans-serif"
    backgroundDisplacementSpriteLocation="/images/background-displace.jpg"
    cursorDisplacementSpriteLocation="/images/cursor-displace.png"
  />
);

export default AdvancedSlider;
```

## 🎛️ Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `string[]` | `[]` | Array of image URLs. |
| `texts` | `[string, string][]` | `[]` | Array of [title, subtitle] pairs for each slide. |
| `backgroundDisplacementSpriteLocation` | `string` | `'/images/background-displace.jpg'` | URL for the background displacement map. |
| `cursorDisplacementSpriteLocation` | `string` | `'/images/cursor-displace.png'` | URL for the cursor displacement map. |
| `cursorImgEffect` | `boolean` | `true` | Enable cursor displacement effect on images. |
| `cursorTextEffect` | `boolean` | `true` | Enable cursor effects on text. |
| `cursorScaleIntensity` | `number` | `0.65` | Scale intensity for cursor displacement. |
| `cursorMomentum` | `number` | `0.14` | Momentum effect for cursor movement. |
| `imagesRgbEffect` | `boolean` | `true` | Enable RGB split effect on images. |
| `imagesRgbIntensity` | `number` | `15` | Intensity of RGB split effect on images. |
| `textsRgbEffect` | `boolean` | `true` | Enable RGB split effect on texts. |
| `textsRgbIntensity` | `number` | `5` | Intensity of RGB split effect on texts. |
| `textTitleColor` | `string` | `'white'` | Color of the title text. |
| `textTitleSize` | `number` | `64` | Font size for the title. |
| `mobileTextTitleSize` | `number` | `40` | Font size for the title on mobile. |
| `textTitleLetterspacing` | `number` | `2` | Letter spacing for the title. |
| `textTitleFontFamily` | `string` | *system fonts* | Font family for the title. |
| `textSubTitleColor` | `string` | `'white'` | Color of the subtitle text. |
| `textSubTitleSize` | `number` | `24` | Font size for the subtitle. |
| `mobileTextSubTitleSize` | `number` | `18` | Font size for the subtitle on mobile. |
| `textSubTitleLetterspacing` | `number` | `1` | Letter spacing for the subtitle. |
| `textSubTitleOffsetTop` | `number` | `10` | Top offset for the subtitle. |
| `mobileTextSubTitleOffsetTop` | `number` | `5` | Top offset for the subtitle on mobile. |
| `textSubTitleFontFamily` | `string` | *system fonts* | Font family for the subtitle. |
| `maxContainerShiftFraction` | `number` | `0.05` | Maximum container shift as a fraction of container size. |
| `swipeScaleIntensity` | `number` | `2` | Scale intensity for swipe gestures. |
| `transitionScaleIntensity` | `number` | `30` | Scale intensity for transitions. |
| `externalNav` | `boolean` | `false` | Use external navigation elements. |
| `navElement` | `{ prev: string, next: string }` | `{ prev: '.main-nav.prev', next: '.main-nav.next' }` | Selectors for external navigation elements. |
| `navTextsRgbIntensity` | `number` | `3` | Intensity of RGB split effect on navigation. |
| `buttonMode` | `boolean` | `false` | Enable button mode for slides. |
| `imageFilters` | `FilterConfig \| FilterConfig[]` | *none* | Custom filters for images. |
| `textFilters` | `FilterConfig \| FilterConfig[]` | *none* | Custom filters for text. |

## 🎨 Available Filters

The Kinetic Slider supports a wide range of filters from PixiJS and pixi-filters. Each filter can be configured with specific options.

### Filter Configuration

Each filter requires the following base properties:

| Property | Type | Description |
|----------|------|-------------|
| `type` | `string` | Filter type identifier. |
| `enabled` | `boolean` | Whether the filter is active. |
| `intensity` | `number` | Base intensity of the filter effect. |

### Core Filter Types

Here are some of the most commonly used filters:

#### RGB Split Filter
```js
{
  type: 'rgb-split',
  enabled: true,
  intensity: 15,
  // Optional specific settings:
  redOffset: { x: 10, y: 0 },
  greenOffset: { x: 0, y: 0 },
  blueOffset: { x: -10, y: 0 }
}
```

#### Adjustment Filter
```js
{
  type: 'adjustment',
  enabled: true,
  intensity: 8,
  // Optional specific settings:
  gamma: 1.2,
  saturation: 1.5,
  contrast: 1.2,
  brightness: 1.1,
  red: 1,
  green: 1.1,
  blue: 0.9
}
```

#### Bloom Filter
```js
{
  type: 'bloom',
  enabled: true,
  intensity: 5,
  // Optional specific settings:
  quality: 4,
  strength: 2
}
```

#### Glow Filter
```js
{
  type: 'glow',
  enabled: true,
  intensity: 4,
  // Optional specific settings:
  outerStrength: 2,
  innerStrength: 0,
  color: 0xffffff,
  quality: 0.1
}
```

#### Old Film Filter
```js
{
  type: 'old-film',
  enabled: true,
  intensity: 5,
  // Optional specific settings:
  sepia: 0.3,
  noise: 0.3,
  scratch: 0.5,
  vignetting: 0.3
}
```

### Complete Filter List

| Filter Type | Description | Key Options |
|-------------|-------------|------------|
| `rgb-split` | Splits RGB channels | `redOffset`, `greenOffset`, `blueOffset` |
| `adjustment` | Adjusts various image parameters | `gamma`, `saturation`, `contrast`, `brightness`, `red`, `green`, `blue`, `alpha` |
| `advanced-bloom` | Enhanced bloom effect | `threshold`, `bloomScale`, `brightness`, `quality` |
| `ascii` | ASCII art effect | `size`, `color` |
| `backdrop-blur` | Blurs the background | `quality` |
| `bevel` | Creates bevel effect | `rotation`, `thickness`, `lightColor`, `shadowColor` |
| `bloom` | Simple bloom effect | `quality`, `strength` |
| `bulge-pinch` | Creates bulge or pinch distortion | `radius`, `strength`, `center` |
| `color-gradient` | Applies color gradient | `gradient`, `alpha` |
| `color-map` | Maps colors using a reference image | `colorMap`, `nearest` |
| `color-overlay` | Overlays a color | `color`, `alpha` |
| `color-replace` | Replaces one color with another | `originalColor`, `newColor`, `epsilon` |
| `convolution` | Applies convolution matrix | `matrix`, `width`, `height` |
| `cross-hatch` | Creates crosshatch pattern | *none* |
| `crt` | CRT monitor effect | `curvature`, `lineWidth`, `lineContrast`, `noise` |
| `dot` | Creates dot pattern | `scale`, `angle` |
| `drop-shadow` | Adds drop shadow | `alpha`, `distance`, `blur`, `color` |
| `emboss` | Emboss effect | `strength` |
| `glitch` | Glitch effect | `slices`, `offset`, `direction`, `seed` |
| `glow` | Adds glow effect | `distance`, `outerStrength`, `innerStrength`, `color` |
| `godray` | God rays effect | `angle`, `gain`, `lacunarity`, `time` |
| `grayscale` | Converts to grayscale | `amount` |
| `hsl-adjustment` | HSL color adjustments | `hue`, `saturation`, `lightness` |
| `kawase-blur` | Kawase blur algorithm | `blur`, `quality`, `clamp` |
| `motion-blur` | Directional motion blur | `velocity`, `kernelSize` |
| `old-film` | Old film effect | `sepia`, `noise`, `scratch`, `vignetting` |
| `outline` | Adds outline | `thickness`, `color`, `quality` |
| `pixelate` | Pixelation effect | `size` |
| `radial-blur` | Radial blur effect | `angle`, `center`, `radius` |
| `reflection` | Reflection effect | `mirror`, `boundary`, `amplitude`, `waveLength` |
| `shockwave` | Shockwave distortion | `center`, `amplitude`, `wavelength`, `speed` |
| `simplex-noise` | Simplex noise pattern | `seed`, `scale`, `time` |
| `tilt-shift` | Tilt-shift effect | `blur`, `gradientBlur`, `start`, `end` |
| `twist` | Twists the image | `angle`, `radius`, `padding` |
| `zoom-blur` | Zoom blur effect | `strength`, `center`, `innerRadius` |

## 🔍 Custom Displacement Maps

For the best results, you should use appropriate displacement maps:

1. **Background Displacement Map**: Should be a grayscale image with smooth transitions. The default is `background-displace.jpg`.
2. **Cursor Displacement Map**: Should be a small grayscale image with radial gradient. The default is `cursor-displace.png`.

You can create your own displacement maps in Photoshop or other image editing software.

## 📱 Mobile Optimization

The slider is built with mobile in mind. It includes:

- Responsive scaling for different screen sizes
- Touch swipe navigation
- Optimized text sizes for mobile devices
- Mobile-specific images support (by providing appropriate image URLs)

## 🔤 Custom Fonts

To use custom fonts, place your font files in the `public/fonts/` directory and reference them in the `textTitleFontFamily` and `textSubTitleFontFamily` props:

```jsx
<KineticSlider
  textTitleFontFamily="VAMOS, Helvetica, sans-serif"
  textSubTitleFontFamily="Georgia, serif"
  // other props...
/>
```

The component will attempt to load the fonts automatically.

## 🖥️ External Navigation

You can use external navigation elements by setting `externalNav` to `true` and specifying the selectors in `navElement`:

```jsx
<KineticSlider
  externalNav={true}
  navElement={{ prev: '#prev-button', next: '#next-button' }}
  // other props...
/>
```

Then add these elements elsewhere in your HTML:

```html
<button id="prev-button">Previous</button>
<button id="next-button">Next</button>
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC License

## 🙏 Acknowledgements

This component is a modernization and upgrade of the original [RGBKineticSlider](https://github.com/hmongouachon/rgbKineticSlider) by @hmongouachon.

## 📚 Further Documentation

For more details on the underlying technologies:

- [PixiJS Documentation](https://pixijs.com/guides)
- [GSAP Documentation](https://greensock.com/docs/)
- [Astro Documentation](https://docs.astro.build)
- [pixi-filters Documentation](https://github.com/pixijs/pixi-filters)