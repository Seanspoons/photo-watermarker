import { CollageFitMode, CollageSettings, ImageAsset } from '../../types';

interface CanvasSize {
  width: number;
  height: number;
}

const COLLAGE_SIZES: Record<CollageSettings['sizePreset'], CanvasSize> = {
  'instagram-square': { width: 1080, height: 1080 },
  'instagram-portrait': { width: 1080, height: 1350 },
  story: { width: 1080, height: 1920 },
  'high-res-square': { width: 2160, height: 2160 }
};

function getOutputSize(settings: CollageSettings): CanvasSize {
  return COLLAGE_SIZES[settings.sizePreset];
}

function getUniformGrid(
  imageCount: number,
  canvasWidth: number,
  canvasHeight: number,
  columns: number,
  gap: number
): Array<{ x: number; y: number; width: number; height: number }> {
  const rows = Math.ceil(imageCount / columns);
  const tileWidth = (canvasWidth - gap * (columns - 1)) / columns;
  const tileHeight = (canvasHeight - gap * (rows - 1)) / rows;

  return Array.from({ length: imageCount }, (_, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);

    return {
      x: column * (tileWidth + gap),
      y: row * (tileHeight + gap),
      width: tileWidth,
      height: tileHeight
    };
  });
}

function withRoundedClip(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
  context.clip();
}

function drawImageToRect(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  fitMode: CollageFitMode
) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const rectRatio = width / height;

  let drawWidth = width;
  let drawHeight = height;
  let offsetX = x;
  let offsetY = y;

  if (fitMode === 'cover') {
    if (imageRatio > rectRatio) {
      drawWidth = height * imageRatio;
      offsetX = x - (drawWidth - width) / 2;
    } else {
      drawHeight = width / imageRatio;
      offsetY = y - (drawHeight - height) / 2;
    }
  } else if (imageRatio > rectRatio) {
    drawHeight = width / imageRatio;
    offsetY = y + (height - drawHeight) / 2;
  } else {
    drawWidth = height * imageRatio;
    offsetX = x + (width - drawWidth) / 2;
  }

  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

export function getCollageOutputSize(settings: CollageSettings): CanvasSize {
  return getOutputSize(settings);
}

export function renderUniformCollage(
  canvas: HTMLCanvasElement,
  images: ImageAsset[],
  settings: CollageSettings,
  sizeOverride?: CanvasSize
) {
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Canvas rendering is not available in this browser.');
  }

  const outputSize = sizeOverride ?? getOutputSize(settings);
  canvas.width = outputSize.width;
  canvas.height = outputSize.height;

  context.clearRect(0, 0, outputSize.width, outputSize.height);
  context.fillStyle = settings.backgroundColor;
  context.fillRect(0, 0, outputSize.width, outputSize.height);

  const columns = Math.min(settings.columns, Math.max(1, images.length));
  const cells = getUniformGrid(
    images.length,
    outputSize.width,
    outputSize.height,
    columns,
    settings.gap
  );

  cells.forEach((cell, index) => {
    const image = images[index];
    if (!image) {
      return;
    }

    context.save();
    if (settings.cornerRadius > 0) {
      withRoundedClip(context, cell.x, cell.y, cell.width, cell.height, settings.cornerRadius);
    }

    drawImageToRect(
      context,
      image.image,
      cell.x,
      cell.y,
      cell.width,
      cell.height,
      settings.fitMode
    );
    context.restore();
  });
}
