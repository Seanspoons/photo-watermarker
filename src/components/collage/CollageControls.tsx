import { CollageSettings } from '../../types';

interface CollageControlsProps {
  settings: CollageSettings;
  disabled?: boolean;
  onChange: <K extends keyof CollageSettings>(key: K, value: CollageSettings[K]) => void;
  onReset: () => void;
}

export function CollageControls({
  settings,
  disabled = false,
  onChange,
  onReset
}: CollageControlsProps) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Step 2</p>
          <h2>Choose the look</h2>
        </div>
        <button type="button" className="secondary-button" onClick={onReset} disabled={disabled}>
          Reset
        </button>
      </div>

      <div className="controls-grid">
        <label className="field">
          <span>Layout mode</span>
          <select
            value={settings.layoutMode}
            onChange={(event) => onChange('layoutMode', event.target.value as CollageSettings['layoutMode'])}
            disabled={disabled}
          >
            <option value="uniform">Uniform Grid</option>
            <option value="featured">Featured Layout</option>
          </select>
        </label>

        <label className="field">
          <span>Size</span>
          <select
            value={settings.sizePreset}
            onChange={(event) => onChange('sizePreset', event.target.value as CollageSettings['sizePreset'])}
            disabled={disabled}
          >
            <option value="instagram-square">Instagram Square</option>
            <option value="instagram-portrait">Instagram Portrait</option>
            <option value="story">Story / Vertical</option>
            <option value="high-res-square">High Res Square</option>
          </select>
        </label>

        <label className="field">
          <span>Columns ({settings.columns})</span>
          <input
            type="range"
            min="2"
            max="4"
            step="1"
            value={settings.columns}
            onChange={(event) => onChange('columns', Number(event.target.value))}
            disabled={disabled}
          />
        </label>

        <label className="field">
          <span>Spacing ({settings.gap}px)</span>
          <input
            type="range"
            min="0"
            max="32"
            step="2"
            value={settings.gap}
            onChange={(event) => onChange('gap', Number(event.target.value))}
            disabled={disabled}
          />
        </label>

        <label className="field">
          <span>Background</span>
          <input
            type="color"
            value={settings.backgroundColor}
            onChange={(event) => onChange('backgroundColor', event.target.value)}
            disabled={disabled}
          />
        </label>

        <label className="field">
          <span>Photo fit</span>
          <select
            value={settings.fitMode}
            onChange={(event) => onChange('fitMode', event.target.value as CollageSettings['fitMode'])}
            disabled={disabled}
          >
            <option value="cover">Fill the tiles</option>
            <option value="contain">Keep full photo</option>
          </select>
        </label>

        <label className="field">
          <span>Corner rounding ({settings.cornerRadius}px)</span>
          <input
            type="range"
            min="0"
            max="36"
            step="2"
            value={settings.cornerRadius}
            onChange={(event) => onChange('cornerRadius', Number(event.target.value))}
            disabled={disabled}
          />
        </label>

        <label className="field">
          <span>Featured style</span>
          <select
            value={settings.featuredStyle}
            onChange={(event) =>
              onChange('featuredStyle', event.target.value as CollageSettings['featuredStyle'])
            }
            disabled={disabled || settings.layoutMode !== 'featured'}
          >
            <option value="feature-top">Large photo on top</option>
            <option value="feature-left">Large photo on left</option>
            <option value="feature-grid">Balanced feature grid</option>
          </select>
        </label>
      </div>
    </section>
  );
}
