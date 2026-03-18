import { useRef } from 'react';
import { UploadPanel } from '../UploadPanel';

export function ImageCompressorTool() {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <section className="hero">
        <div className="hero-copy-block">
          <div>
            <p className="eyebrow">Image Compressor</p>
            <h1>Make image files smaller for uploads and sharing.</h1>
            <p className="hero-copy">
              Lower image file size right in your browser with simple quality controls and no uploads.
            </p>
          </div>
        </div>
        <div className="hero-card">
          <p className="hero-stat-label">How it works</p>
          <p className="hero-stat">Upload, choose quality, then save.</p>
          <div className="tip-note" role="note">
            <span className="tip-note-icon" aria-hidden="true">
              i
            </span>
            <p className="helper-text">
              This tool is built for smaller file sizes, not changing dimensions.
            </p>
          </div>
        </div>
      </section>

      <section className="layout-grid converter-layout-grid">
        <div className="left-column">
          <UploadPanel onFileSelect={() => undefined} />
          <div className="preview-sticky-wrap">
            <section className="panel preview-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Preview</p>
                  <h2>Your image</h2>
                </div>
              </div>
              <div className="preview-shell watermark-preview-shell">
                <div className="preview-placeholder">
                  <p>Your compressed preview will appear here after you choose a photo.</p>
                </div>
                <canvas ref={previewCanvasRef} className="preview-canvas sr-only" aria-hidden="true" />
              </div>
            </section>
          </div>
        </div>

        <div className="right-column">
          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Step 2</p>
                <h2>Choose settings</h2>
              </div>
            </div>
            <div className="tip-note panel-description" role="note">
              <span className="tip-note-icon" aria-hidden="true">
                i
              </span>
              <p className="helper-text">
                Quality and format controls will appear here once your image is ready.
              </p>
            </div>
          </section>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Step 3</p>
                <h2>Review result</h2>
              </div>
            </div>
            <div className="tip-note panel-description" role="note">
              <span className="tip-note-icon" aria-hidden="true">
                i
              </span>
              <p className="helper-text">
                Original and compressed file details will appear here.
              </p>
            </div>
          </section>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Step 4</p>
                <h2>Export</h2>
              </div>
            </div>
            <div className="export-actions">
              <button type="button" className="primary-button" disabled>
                Save Compressed Image
              </button>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
