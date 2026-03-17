# Photo Watermarker

Photo Watermarker is a small client-side photo tool I built with React, TypeScript, and Vite.

It currently includes two tools:

- Photo Watermarker
- Collage Maker

Live site: `https://photowatermarker.com`

## What it does

### Photo Watermarker

- Add a text watermark or logo watermark to a photo
- Choose between a single mark or a repeated proof pattern
- Adjust position, size, color, opacity, shadow, and background styling
- Preview the result instantly
- Save the final image as JPEG or PNG

### Collage Maker

- Add multiple photos and build a collage entirely in the browser
- Use simple layout options instead of a full design editor
- Reorder photos, choose a main photo when the layout supports it, and preview changes live
- Export the final collage as JPEG or PNG

## Privacy

This app is meant to be simple and privacy-friendly.

Selected images are processed locally in the browser. There is no backend, no image upload to a server, no accounts, and no cloud storage.

## Tech

- React
- TypeScript
- Vite
- Vite PWA plugin
- Canvas 2D API
- `heic2any` for browser-side HEIC / HEIF conversion

## Running locally

### Requirements

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Start the dev server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Notes

- The app works offline after the app shell has been loaded once.
- HEIC and HEIF images are converted locally in the browser before entering the normal editing flow.
- Watermark and collage drafts are saved locally so refreshing the page does not immediately wipe progress.
- Saved looks are also stored locally in the browser.
- The collage maker currently supports 2 to 25 photos.

## GitHub Pages

This repo includes a GitHub Actions workflow for deploying to GitHub Pages.

It is currently set up for the custom domain `photowatermarker.com` and includes a `public/CNAME` file for that domain.

## Limitations

- The collage maker is intentionally guided rather than a full freeform editor.
- Very large photos or very large collage sets can use a lot of memory, especially on mobile.
- Watermark image uploads are part of the current draft, but the actual image file is not bundled into named presets.
- Native share support depends on the browser and device.

## Project structure

```text
src/
  components/
    collage/
    watermark/
    PreviewCanvas.tsx
    UploadPanel.tsx
    WatermarkControls.tsx
  utils/
    collage/
    exportImage.ts
    heicConversion.ts
    imageLoader.ts
    renderWatermark.ts
  App.tsx
  constants.ts
  main.tsx
  styles.css
  types.ts
```

## Why I built it

I wanted a lightweight photo tool that felt easy to use, worked well on mobile, and did not require uploading personal photos to a server.
