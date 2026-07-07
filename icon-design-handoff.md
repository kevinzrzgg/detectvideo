# AI Video Detector Icon / Favicon Handoff

Task: `t_202e98ab` / stage 22 icon favicon refresh
Project: `detectvideo.vip` / `detectvideo`

## Direction

The production mark is a calm evidence-dashboard symbol: a deep ink rounded video frame, a small action-blue verification signal, and a restrained check mark. It should feel trustworthy, practical, and media-literate, not cyberpunk, panic-driven, forensic, or police-like.

This follows the current site palette:

- Deep ink: `#162B3A`
- Warm paper: `#F6F3EE`
- Action blue: `#1C7CFF`
- Optional hover blue: `#0F63D7`

Use roughly the existing 631 color relationship: warm paper / light UI as the main surface, deep ink for the brand mark and structural contrast, action blue only for the verification/signal accent.

## Assets created

- Header/app logo mark: `/root/projects/detectvideo/src/assets/logo-mark.svg`
- Browser favicon source: `/root/projects/detectvideo/public/favicon.svg`
- Generated favicon PNG: `/root/projects/detectvideo/public/favicon-32.png`
- Generated Apple touch icon: `/root/projects/detectvideo/public/apple-touch-icon.png`
- Generated multi-size ICO: `/root/projects/detectvideo/public/favicon.ico`

The build copies `src/assets/` to `dist/assets/` and `public/` files to `dist/`.

## Header brand chip rules

Desktop header:

- Container: `40px × 40px`
- Radius: `14px`
- Background: transparent; the SVG already includes the rounded square.
- Shadow: `0 10px 22px rgba(22,43,58,.16)` plus a subtle inner warm-paper line.
- Label gap: `12px`
- Wordmark/descriptor: `AI Video Detector`, weight `900`, deep ink.

Footer/header on deep ink:

- Use the same SVG, not an inverted text glyph.
- Keep the icon full-color; it has enough warm-paper contrast on dark and light backgrounds.

Mobile:

- Container can remain `40px × 40px` while hiding the text label under `520px`, matching current CSS.
- Do not shrink below `32px`; favicon details become harder to read below that.

## Favicon guidance

Preferred browser declaration order:

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="theme-color" content="#162B3A">
```

Use `favicon.svg` as the design source. Keep `favicon.ico` for legacy browser support and `apple-touch-icon.png` for pinned iOS/home-screen surfaces.

At 16px, the mark should be interpreted as a dark rounded square with a white video frame and blue trust signal; do not add text or thin decorative lines at favicon sizes.

## Upload control design note

The upload control should be English-only and should not expose native browser file-input text such as localized “未选择文件”. Use a custom label/button (`Choose video file`) with helper copy (`MP4, MOV, or WebM preview only`) and keep the native file input visually hidden but keyboard/screen-reader accessible.

## Accessibility

- SVG includes a title/description in the source asset; inline page instances are decorative and should use empty `alt`.
- Blue check signal is not the only meaning; the adjacent text brand and page context provide meaning.
- The mark maintains high contrast: warm paper on deep ink and white check on blue.

## Implementation status

Implemented in source:

- Header and footer now use `/assets/logo-mark.svg` instead of the temporary triangle glyph.
- Common head includes favicon/Apple touch icon/theme-color declarations.
- Build copies new asset folders into `dist/`.
- Upload file picker is styled as an English custom picker to avoid native localized text appearing in the UI.
