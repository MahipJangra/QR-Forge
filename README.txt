# QR Forge — Chrome Extension
## Setup in 3 steps

### STEP 1 — Download qrcode.js (required)
  Go to: https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js
  Save the file as:  qrcode.min.js
  Place it in this folder (same folder as popup.html)

  Your folder should look like:
    qr-extension/
      manifest.json
      popup.html
      popup.js
      qrcode.min.js   ← download this
      icon16.png
      icon48.png
      icon128.png

──────────────────────────────────────────────────────────────

### STEP 2 — Load in Chrome (test it locally)
  1. Open Chrome → go to:  chrome://extensions
  2. Toggle ON "Developer mode" (top-right corner)
  3. Click "Load unpacked"
  4. Select this entire  qr-extension/  folder
  5. The extension icon appears in your toolbar ✓

──────────────────────────────────────────────────────────────

### STEP 3 — Publish to Chrome Web Store
  1. Zip this entire folder → qr-extension.zip
  2. Go to: https://chrome.google.com/webstore/devconsole
  3. Sign in with a Google account
  4. Pay the one-time $5 developer registration fee
  5. Click "New Item" → upload qr-extension.zip
  6. Fill in:
       • Name: QR Forge
       • Description: Generate QR codes for URLs and contacts instantly
       • Category: Productivity
       • Upload screenshots (take one of the popup)
  7. Click "Submit for review"
  → Google reviews in 1–3 business days
  → You get a public Chrome Web Store link to share ✓

──────────────────────────────────────────────────────────────

### For Firefox:
  1. Go to: https://addons.mozilla.org/developers/
  2. Click "Submit a New Add-on"
  3. Upload the same ZIP file
  4. Fill in store listing → Submit
  → Firefox review is free and takes a few days
