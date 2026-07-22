Proxima Nova self-hosting instructions

This folder is a placeholder for Proxima Nova webfont files.

To enable the on-site Proxima Nova font:

1. Obtain webfont files legally (WOFF or WOFF2) for Proxima Nova.
2. Place them in this directory with the following names (or update `styles.css` paths):
   - ProximaNova-Regular.woff2
   - ProximaNova-Regular.woff
   - ProximaNova-Bold.woff2
   - ProximaNova-Bold.woff

3. The site already includes `@font-face` rules in `styles.css` that reference these filenames and a FontFaceObserver loader in `index.html` to detect when the font loads.

Notes:
- Proxima Nova is a commercial font. Ensure you have the proper license to self-host.
- If you prefer a hosted provider (Adobe Fonts), add the provider's embed code to `index.html` and remove the need to self-host files.
