export function CropTool() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy-block">
          <div>
            <p className="eyebrow">Crop Tool</p>
            <h1>Crop images to the area you want to keep.</h1>
            <p className="hero-copy">
              Choose a photo, set a crop area, and save the cropped result right in your browser.
            </p>
            <div className="hero-tags" aria-label="Crop tool highlights">
              <span className="hero-tag">Free crop</span>
              <span className="hero-tag">Aspect ratio presets</span>
              <span className="hero-tag">Private in browser</span>
            </div>
          </div>
        </div>
        <div className="hero-card">
          <p className="hero-stat-label">Coming next</p>
          <p className="hero-stat">The crop workspace is being wired into the same step flow as the other tools.</p>
        </div>
      </section>
    </>
  );
}
