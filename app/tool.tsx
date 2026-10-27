'use client';

import {
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

/* ─── Types ────────────────────────────────────────────────── */

type OutputFormat = 'image/jpeg' | 'image/png' | 'image/webp';
type Mode = 'compress' | 'resize' | 'convert';
type SizeUnit = 'KB' | 'MB';

interface ProcessResult {
  blob: Blob;
  outW: number;
  outH: number;
  achieved: boolean;
  format: OutputFormat;
}

interface PresetConfig {
  mode: 'compress';
  targetSize: string;
  sizeUnit: SizeUnit;
  resizeW: number;
  resizeH: number;
}

interface Preset {
  id: string;
  label: string;
  sub: string;
  config: PresetConfig | null;
}

interface Props {
  presets?: Preset[];
}

/* ─── Helpers ──────────────────────────────────────────────── */

const FORMAT_LABEL: Record<OutputFormat, string> = {
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
  'image/webp': 'WebP',
};

const FORMAT_EXT: Record<OutputFormat, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

function fmtBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024)
    return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function fmtPct(a: number, b: number): string {
  if (!b) return '—';
  const pct = Math.round((1 - a / b) * 100);
  if (pct > 0) return `${pct}% smaller`;
  if (pct < 0) return `${Math.abs(pct)}% larger`;
  return 'Same size';
}

function basename(name: string): string {
  return name.replace(/\.[^.]+$/, '');
}

/* ─── Component ────────────────────────────────────────────── */

export default function ImageTool({ presets }: Props) {
  const fileInput = useRef<HTMLInputElement>(null);

  /* File state */
  const [file, setFile] = useState<File | null>(null);
  const [srcUrl, setSrcUrl] = useState('');
  const [srcW, setSrcW] = useState(0);
  const [srcH, setSrcH] = useState(0);

  /* Mode + settings */
  const [mode, setMode] = useState<Mode>('compress');
  const [targetSize, setTargetSize] = useState('50');
  const [sizeUnit, setSizeUnit] = useState<SizeUnit>('KB');
  const [quality, setQuality] = useState(80);
  const [resizeW, setResizeW] = useState(0);
  const [resizeH, setResizeH] = useState(0);
  const [keepRatio, setKeepRatio] = useState(true);
  const [outFormat, setOutFormat] = useState<OutputFormat>('image/jpeg');
  const [keepTransparency, setKeepTransparency] = useState(true);

  /* UI state */
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [outUrl, setOutUrl] = useState('');

  /* Revoke object URLs on cleanup */
  useEffect(() => () => { if (srcUrl) URL.revokeObjectURL(srcUrl); }, [srcUrl]);
  useEffect(() => () => { if (outUrl) URL.revokeObjectURL(outUrl); }, [outUrl]);

  /* ── Load file ─────────────────────────────────────────── */

  const loadFile = useCallback((next: File | undefined) => {
    if (!next) return;
    setError('');
    setResult(null);
    setOutUrl('');

    if (!next.type.startsWith('image/')) {
      setError('Please choose an image file — JPG, PNG, or WebP.');
      return;
    }
    if (next.size > 10 * 1024 * 1024) {
      setError('This image is too large. Please use a file under 10 MB.');
      return;
    }

    const url = URL.createObjectURL(next);
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth === 0 || img.naturalHeight === 0) {
        URL.revokeObjectURL(url);
        setError("We couldn't read this image. Try another file.");
        return;
      }
      setFile(next);
      setSrcUrl(url);
      setSrcW(img.naturalWidth);
      setSrcH(img.naturalHeight);
      setResizeW(img.naturalWidth);
      setResizeH(img.naturalHeight);
      /* Auto-detect format for output */
      if (next.type === 'image/png') setOutFormat('image/png');
      else if (next.type === 'image/webp') setOutFormat('image/webp');
      else setOutFormat('image/jpeg');
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setError("We couldn't read this image. Try another file.");
    };
    img.src = url;
  }, []);

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    loadFile(e.target.files?.[0]);
    e.target.value = '';
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    loadFile(e.dataTransfer.files?.[0]);
  }

  /* ── Clear / reset ─────────────────────────────────────── */

  function clearFile() {
    setFile(null);
    setSrcUrl('');
    setSrcW(0);
    setSrcH(0);
    setResult(null);
    setOutUrl('');
    setError('');
  }

  function startOver() {
    clearFile();
  }

  /* ── Mode switch ───────────────────────────────────────── */

  function switchMode(m: Mode) {
    setMode(m);
    setResult(null);
    setOutUrl('');
    setError('');
  }

  /* ── Resize ratio helpers ──────────────────────────────── */

  function onWidthChange(val: string) {
    const n = Number(val);
    setResizeW(n);
    if (keepRatio && srcW && srcH && n > 0) {
      setResizeH(Math.max(1, Math.round((n * srcH) / srcW)));
    }
  }

  function onHeightChange(val: string) {
    const n = Number(val);
    setResizeH(n);
    if (keepRatio && srcW && srcH && n > 0) {
      setResizeW(Math.max(1, Math.round((n * srcW) / srcH)));
    }
  }

  /* ── Process image ─────────────────────────────────────── */

  async function processImage() {
    if (!file || !srcUrl) {
      setError('Please choose an image first.');
      return;
    }
    setBusy(true);
    setError('');
    setResult(null);
    setOutUrl('');

    try {
      /* Load source */
      const img = new Image();
      img.src = srcUrl;
      await new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = () => rej(new Error("We couldn't read this image. Try another file."));
      });

      /* Determine output dimensions */
      let outW: number;
      let outH: number;

      if (mode === 'resize') {
        outW = Math.max(1, Math.min(12000, Math.round(resizeW)));
        outH = Math.max(1, Math.min(12000, Math.round(resizeH)));
        if (!outW || !outH) throw new Error('Please enter valid width and height values.');
      } else {
        outW = Math.max(1, Math.min(12000, srcW));
        outH = Math.max(1, Math.min(12000, srcH));
      }

      /* Determine format */
      const fmt: OutputFormat =
        mode === 'convert'
          ? outFormat
          : outFormat;

      /* Render to canvas */
      const canvas = document.createElement('canvas');
      canvas.width = outW;
      canvas.height = outH;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Your browser could not start image processing.');

      /* White background for JPEG (no transparency) */
      if (fmt === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, outW, outH);
      }
      ctx.drawImage(img, 0, 0, outW, outH);

      /* Encode helper */
      const toBlob = (q: number): Promise<Blob> =>
        new Promise((res, rej) =>
          canvas.toBlob(
            (b) =>
              b
                ? res(b)
                : rej(new Error('Could not export this image. Try a different format.')),
            fmt,
            q,
          ),
        );

      let blob: Blob;
      let achieved = true;

      if (mode === 'compress') {
        const parsed = Number(targetSize);
        if (!Number.isFinite(parsed) || parsed <= 0) {
          throw new Error('Please enter a target size greater than zero.');
        }
        const targetBytes = parsed * (sizeUnit === 'KB' ? 1024 : 1024 * 1024);

        if (fmt === 'image/png') {
          /* PNG is lossless — quality arg has no effect */
          blob = await toBlob(1);
          achieved = blob.size <= targetBytes;
        } else {
          /* Binary search for best quality */
          let lo = 0.04;
          let hi = 0.97;
          let best: Blob | null = null;

          for (let i = 0; i < 12; i++) {
            const mid = (lo + hi) / 2;
            const candidate = await toBlob(mid);
            if (candidate.size <= targetBytes) {
              best = candidate;
              lo = mid;
            } else {
              hi = mid;
            }
          }

          if (best) {
            blob = best;
          } else {
            blob = await toBlob(0.04);
          }
          achieved = blob.size <= targetBytes;
        }
      } else {
        /* Resize or Convert — use quality setting */
        blob = await toBlob(quality / 100);
        achieved = true;
      }

      /* Verify MIME type matches requested format */
      const actualMime = blob.type || fmt;
      const resolvedFmt: OutputFormat =
        actualMime === 'image/png'
          ? 'image/png'
          : actualMime === 'image/webp'
          ? 'image/webp'
          : 'image/jpeg';

      const url = URL.createObjectURL(blob);
      setResult({ blob, outW, outH, achieved, format: resolvedFmt });
      setOutUrl(url);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : 'Something went wrong while processing the image.',
      );
    } finally {
      setBusy(false);
    }
  }

  /* ── Download filename ─────────────────────────────────── */
  const dlName = file
    ? `${basename(file.name)}-pixelmint.${result ? FORMAT_EXT[result.format] : FORMAT_EXT[outFormat]}`
    : 'pixelmint-image';

  /* ── Derived display values ────────────────────────────── */
  const origSize = file?.size ?? 0;
  const validTarget =
    mode !== 'compress' ||
    (Number(targetSize) > 0 && Number.isFinite(Number(targetSize)));
  const canProcess =
    !!file &&
    !busy &&
    validTarget &&
    (mode !== 'resize' || (resizeW >= 1 && resizeH >= 1));

  /* ── Render ────────────────────────────────────────────── */

  return (
    <div className="tool-wrapper">
      <div className="tool-card">
        {/* ── Tabs ─────────────────────────────────────── */}
        <div className="tool-tabs" role="tablist" aria-label="Image tool mode">
          <button
            role="tab"
            aria-selected={mode === 'compress'}
            className={`tool-tab${mode === 'compress' ? ' active' : ''}`}
            onClick={() => switchMode('compress')}
          >
            Compress
          </button>
          <button
            role="tab"
            aria-selected={mode === 'resize'}
            className={`tool-tab${mode === 'resize' ? ' active' : ''}`}
            onClick={() => switchMode('resize')}
          >
            Resize
          </button>
          <button
            role="tab"
            aria-selected={mode === 'convert'}
            className={`tool-tab${mode === 'convert' ? ' active' : ''}`}
            onClick={() => switchMode('convert')}
          >
            Convert
          </button>
        </div>

        {/* ── Card heading ─────────────────────────────── */}
        <div className="tool-heading" aria-live="polite">
          <h2 className="tool-title">
            {mode === 'compress' && 'Image Compression'}
            {mode === 'resize' && 'Resize Image'}
            {mode === 'convert' && 'Convert Image Format'}
          </h2>
          <p className="tool-subtitle">
            {mode === 'compress' &&
              'Reduce image file size while keeping great quality.'}
            {mode === 'resize' && 'Set exact dimensions for your image.'}
            {mode === 'convert' && 'Change your image to JPG, PNG or WebP.'}
          </p>
        </div>

        {/* ── Body ─────────────────────────────────────── */}
        <div className="tool-body">
          {/* Upload column */}
          <div className="upload-col">
            <div
              className={`dropzone${dragging ? ' drag-over' : ''}${file ? ' has-file' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => !file && fileInput.current?.click()}
              role="button"
              tabIndex={0}
              aria-label="Upload image — click or drag and drop"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (!file) fileInput.current?.click();
                }
              }}
            >
              {file && srcUrl ? (
                /* Preview state */
                <>
                  <div className="preview-box">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={srcUrl}
                      alt={`Preview of ${file.name}`}
                      className="preview-img"
                    />
                  </div>
                  <div className="file-meta">
                    <span className="file-badge">
                      {FORMAT_LABEL[
                        (file.type in FORMAT_LABEL
                          ? file.type
                          : 'image/jpeg') as OutputFormat
                      ]}
                    </span>
                    <div className="file-info">
                      <strong className="file-name">{file.name}</strong>
                      <span className="file-dims">
                        {srcW} × {srcH}
                        {' '}· {fmtBytes(file.size)}
                      </span>
                    </div>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFile();
                    }}
                    aria-label="Remove selected image"
                  >
                    Remove image
                  </button>
                </>
              ) : (
                /* Empty state */
                <>
                  <span className="upload-cloud-icon" aria-hidden="true">
                    <UploadCloudIcon />
                  </span>
                  <p className="upload-primary">
                    Drag &amp; drop your image here
                    <br />
                    or click to browse
                  </p>
                  <p className="upload-secondary">JPG, PNG, WebP · Max 10MB</p>
                </>
              )}
              <input
                ref={fileInput}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                hidden
                onChange={onFileChange}
                aria-label="Choose image file"
              />
            </div>
          </div>

          {/* Settings column */}
          <div className="settings-col">
            {mode === 'compress' && (
              <>
                <div className="field">
                  <label htmlFor="target-size" className="field-label">
                    Target size
                  </label>
                  <div className="input-unit-row">
                    <input
                      id="target-size"
                      type="number"
                      min="1"
                      step="1"
                      value={targetSize}
                      onChange={(e) => setTargetSize(e.target.value)}
                      aria-describedby="target-help"
                      className="unit-input"
                    />
                    <select
                      value={sizeUnit}
                      onChange={(e) =>
                        setSizeUnit(e.target.value as SizeUnit)
                      }
                      aria-label="Target size unit"
                      className="unit-select"
                    >
                      <option value="KB">KB</option>
                      <option value="MB">MB</option>
                    </select>
                  </div>
                  <small id="target-help" className="field-hint">
                    We&apos;ll find the best quality that fits.
                  </small>
                </div>

                <div className="field">
                  <div className="quality-row">
                    <label htmlFor="quality" className="field-label">
                      Quality
                    </label>
                    <span className="quality-pct">{quality}%</span>
                  </div>
                  <input
                    id="quality"
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="quality-slider"
                    aria-label={`Image quality: ${quality}%`}
                  />
                </div>
              </>
            )}

            {mode === 'resize' && (
              <>
                <div className="dim-row">
                  <div className="field">
                    <label htmlFor="rw" className="field-label">
                      Width
                    </label>
                    <div className="dim-input-wrap">
                      <input
                        id="rw"
                        type="number"
                        min="1"
                        max="12000"
                        value={resizeW || ''}
                        onChange={(e) => onWidthChange(e.target.value)}
                        className="dim-input"
                      />
                      <span className="dim-unit">px</span>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="rh" className="field-label">
                      Height
                    </label>
                    <div className="dim-input-wrap">
                      <input
                        id="rh"
                        type="number"
                        min="1"
                        max="12000"
                        value={resizeH || ''}
                        onChange={(e) => onHeightChange(e.target.value)}
                        className="dim-input"
                      />
                      <span className="dim-unit">px</span>
                    </div>
                  </div>
                </div>

                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={keepRatio}
                    onChange={(e) => setKeepRatio(e.target.checked)}
                  />
                  <span>Keep aspect ratio</span>
                </label>
              </>
            )}

            {mode === 'convert' && (
              <>
                <div className="field">
                  <label htmlFor="out-format" className="field-label">
                    Output format
                  </label>
                  <select
                    id="out-format"
                    value={outFormat}
                    onChange={(e) =>
                      setOutFormat(e.target.value as OutputFormat)
                    }
                    className="format-select"
                  >
                    <option value="image/jpeg">JPG</option>
                    <option value="image/png">PNG</option>
                    <option value="image/webp">WebP</option>
                  </select>
                </div>

                {outFormat === 'image/png' && (
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={keepTransparency}
                      onChange={(e) =>
                        setKeepTransparency(e.target.checked)
                      }
                    />
                    <span>Keep transparency</span>
                  </label>
                )}

                {outFormat === 'image/jpeg' && (
                  <p className="convert-note">
                    JPEG does not support transparency. Transparent areas will
                    be filled with white.
                  </p>
                )}
              </>
            )}

            {/* Action button */}
            <button
              className="action-btn"
              onClick={processImage}
              disabled={!canProcess}
              aria-busy={busy}
            >
              {busy ? (
                <>
                  <span className="spinner" aria-hidden="true" />
                  Processing…
                </>
              ) : (
                <>
                  {mode === 'compress' && 'Compress Image'}
                  {mode === 'resize' && 'Resize Image'}
                  {mode === 'convert' && 'Convert Image'}
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Error ───────────────────────────────────────── */}
        {error && (
          <div className="tool-error" role="alert" aria-live="assertive">
            <ErrorIcon />
            {error}
          </div>
        )}

        {/* ── Result ──────────────────────────────────────── */}
        {result && outUrl && !error && (
          <div className="result-panel" aria-live="polite">
            {result.achieved ? (
              <div className="result-badge success">
                <CheckIcon />
                <div>
                  <strong>Perfect!</strong>
                  {mode === 'compress' && (
                    <span>
                      {' '}
                      Your image is under {targetSize} {sizeUnit} and looks
                      great.
                    </span>
                  )}
                  {mode === 'resize' && (
                    <span>
                      {' '}
                      Resized to {result.outW} × {result.outH} px.
                    </span>
                  )}
                  {mode === 'convert' && (
                    <span>
                      {' '}
                      Converted to {FORMAT_LABEL[result.format]}.
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="result-badge warning">
                <InfoIcon />
                <div>
                  <strong>Best effort.</strong>
                  <span>
                    {' '}
                    Target not reached — try smaller dimensions or
                    JPG/WebP format.
                  </span>
                </div>
              </div>
            )}

            <div className="result-compare">
              <div className="compare-col">
                <p className="compare-label">Original</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={srcUrl}
                  alt="Original image"
                  className="compare-img"
                />
                <div className="compare-stats">
                  <span>{fmtBytes(origSize)}</span>
                  <span>
                    {srcW} × {srcH}
                  </span>
                </div>
              </div>

              <div className="compare-col">
                <p className="compare-label">
                  {mode === 'compress'
                    ? 'Compressed'
                    : mode === 'resize'
                    ? 'Resized'
                    : 'Converted'}
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={outUrl}
                  alt="Processed image"
                  className="compare-img"
                />
                <div className="compare-stats">
                  <span>{fmtBytes(result.blob.size)}</span>
                  <span>
                    {result.outW} × {result.outH}
                  </span>
                  <span className={origSize > result.blob.size ? 'stat-green' : 'stat-orange'}>
                    {fmtPct(result.blob.size, origSize)}
                  </span>
                </div>
              </div>
            </div>

            <div className="result-actions">
              <a
                href={outUrl}
                download={dlName}
                className="download-btn"
                aria-label={`Download processed image as ${dlName}`}
              >
                Download Image
              </a>
              <button className="start-over-btn" onClick={startOver}>
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Icon components ──────────────────────────────────────── */

function UploadCloudIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
