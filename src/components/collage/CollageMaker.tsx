export function CollageMaker() {
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
          <p className="hero-stat-label">Coming next</p>
          <p className="hero-stat">Multi-photo collage builder</p>
          <p className="helper-text">
            The next step adds uploads, layout presets, live preview, and export.
          </p>
        </div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Collage Maker</p>
            <h2>Work in progress</h2>
          </div>
        </div>
        <p className="helper-text">
          This tool is being added inside the existing app so it shares the same privacy-friendly,
          client-side workflow as the watermarker.
        </p>
      </section>
    </>
  );
}
