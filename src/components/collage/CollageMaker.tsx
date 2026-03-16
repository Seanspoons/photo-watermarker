import { useMemo, useRef, useState } from 'react';
import { CollageSettings, ImageAsset } from '../../types';
import { loadImageAsset } from '../../utils/imageLoader';
import { CollageControls } from './CollageControls';
import { CollagePreview } from './CollagePreview';
import { CollageUploadPanel } from './CollageUploadPanel';

const MAX_IMAGES = 20;

const DEFAULT_COLLAGE_SETTINGS: CollageSettings = {
  layoutMode: 'uniform',
  sizePreset: 'instagram-square',
  columns: 2,
  gap: 12,
  backgroundColor: '#ffffff',
  fitMode: 'cover',
  cornerRadius: 0,
  exportFormat: 'jpeg',
  featuredStyle: 'feature-top'
};

export function CollageMaker() {
  const [images, setImages] = useState<ImageAsset[]>([]);
  const [settings, setSettings] = useState<CollageSettings>(DEFAULT_COLLAGE_SETTINGS);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const imageSummary = useMemo(() => {
    if (images.length === 0) {
      return 'Add at least 2 photos to start building a collage.';
    }

    return `${images.length} photos ready for your collage.`;
  }, [images.length]);

  const handleFilesSelect = async (selectedFiles: FileList | File[]) => {
    const nextFiles = Array.from(selectedFiles);
    const roomRemaining = MAX_IMAGES - images.length;

    if (roomRemaining <= 0) {
      setErrorMessage('You can add up to 20 photos in one collage.');
      return;
    }

    setIsBusy(true);
    setErrorMessage(null);
    setStatusMessage('Adding photos...');

    try {
      const filesToLoad = nextFiles.slice(0, roomRemaining);
      const loadedImages = await Promise.all(filesToLoad.map((file) => loadImageAsset(file)));

      setImages((current) => [...current, ...loadedImages]);
      setStatusMessage(`${images.length + loadedImages.length} photos ready.`);

      if (nextFiles.length > roomRemaining) {
        setErrorMessage(`Only the first ${roomRemaining} additional photos were added.`);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Some photos could not be loaded.');
      setStatusMessage(null);
    } finally {
      setIsBusy(false);
    }
  };

  const handleSettingsChange = <K extends keyof CollageSettings>(
    key: K,
    value: CollageSettings[K]
  ) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const handleReset = () => {
    setSettings(DEFAULT_COLLAGE_SETTINGS);
    setStatusMessage('Collage settings reset.');
  };

  return (
    <>
      <section className="hero">
        <div className="hero-copy-block">
          <div>
            <p className="eyebrow">Collage Maker</p>
            <h1>Build a simple collage from your photos.</h1>
            <p className="hero-copy">
              Add multiple photos, choose a layout, preview the collage, and save it at high
              quality right in your browser.
            </p>
          </div>
        </div>
        <div className="hero-card">
          <p className="hero-stat-label">Your collage</p>
          <p className="hero-stat">{imageSummary}</p>
          <p className="helper-text">
            Start with 2 to 20 photos. Uniform grid and featured layouts are both on the way.
          </p>
        </div>
      </section>

      {errorMessage ? <div className="message error-message">{errorMessage}</div> : null}
      {statusMessage ? <div className="message status-message">{statusMessage}</div> : null}

      <section className="layout-grid">
        <div className="left-column">
          <CollageUploadPanel
            onFilesSelect={handleFilesSelect}
            disabled={isBusy}
            imageCount={images.length}
          />
          <CollagePreview
            canvasRef={previewCanvasRef}
            hasImages={images.length > 0}
            imageCount={images.length}
            canBuild={images.length >= 2}
          />
        </div>

        <div className="right-column">
          <CollageControls
            settings={settings}
            disabled={isBusy}
            onChange={handleSettingsChange}
            onReset={handleReset}
          />

          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Step 4</p>
                <h2>Photos</h2>
              </div>
            </div>
            {images.length > 0 ? (
              <div className="thumb-list">
                {images.map((image) => (
                  <div key={image.objectUrl} className="thumb-card">
                    <img src={image.objectUrl} alt={image.name} className="thumb-image" />
                    <p className="thumb-label">{image.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="helper-text">Add a few photos and they will appear here.</p>
            )}
          </section>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Step 5</p>
                <h2>Export</h2>
              </div>
            </div>
            <div className="export-actions">
              <button type="button" className="primary-button" disabled>
                Save JPEG
              </button>
              <button type="button" className="secondary-button" disabled>
                Save PNG
              </button>
            </div>
            <p className="helper-text">
              Export will be enabled once the collage renderer is in place.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
