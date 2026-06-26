# QR Forge — Chrome Extension

> Instantly generate QR codes for URLs and Contacts. Clean, fast, no tracking.

![Version](https://img.shields.io/badge/version-1.0-yellow) ![Manifest](https://img.shields.io/badge/manifest-v3-blue) ![License](https://img.shields.io/badge/license-MIT-green)

---

## Features

- **URL QR Codes** — Paste any URL or auto-fill from your active browser tab with one click
- **Contact QR Codes** — Generate vCard 3.0 QR codes with name, phone, and email
- **Save as PNG** — Download the QR code directly to your device
- **Copy to Clipboard** — Copy the QR image to paste anywhere
- **No tracking, no data stored** — Everything runs locally in your browser
- **Clean dark UI** — Minimal, fast popup with zero clutter

---

## Project Structure

```
qr-extension/
├── manifest.json       # Extension manifest (v3)
├── popup.html          # Extension popup UI
├── popup.js            # Tab switching, QR generation, save/copy logic
├── qrcode.min.js       # QR code library (see setup below)
├── icon16.png          # Toolbar icon (16×16)
├── icon48.png          # Extension page icon (48×48)
└── icon128.png         # Store icon (128×128)
```

---

## Setup

### Step 1 — Download the QR Library

The QR code library is not bundled. Download it and place it in the project folder:

**URL:** https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js

Save the file as `qrcode.min.js` in the same folder as `popup.html`.

---

### Step 2 — Load in Chrome (Local / Developer Mode)

1. Open Chrome and navigate to `chrome://extensions`
2. Toggle **Developer mode** on (top-right corner)
3. Click **Load unpacked**
4. Select the `qr-extension/` folder
5. The QR Forge icon will appear in your browser toolbar ✓

---

### Step 3 — Publish to Chrome Web Store

1. Zip the entire project folder → `qr-extension.zip`
2. Go to the [Chrome Web Store Developer Console](https://chrome.google.com/webstore/devconsole)
3. Sign in with a Google account
4. Pay the one-time **$5 developer registration fee**
5. Click **New Item** → upload `qr-extension.zip`
6. Fill in the store listing:
   - **Name:** QR Forge
   - **Description:** Generate QR codes for URLs and contacts instantly
   - **Category:** Productivity
   - Upload at least one screenshot of the popup
7. Click **Submit for review**

Google typically reviews submissions within **1–3 business days**, after which you receive a public Chrome Web Store link.

---

### Firefox (Optional)

The same ZIP file can be submitted to Firefox Add-ons:

1. Go to [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/)
2. Click **Submit a New Add-on**
3. Upload the same `qr-extension.zip`
4. Complete the store listing and submit

Firefox review is **free** and typically takes a few days.

---

## How It Works

### URL Mode
- Click the extension icon to open the popup
- Hit **⚡ Auto-fill current tab** to pull the active page URL, or type any URL manually
- Click **Generate QR Code**
- Save as PNG or copy to clipboard

### Contact Mode
- Switch to the **Contact** tab
- Enter a name (required), phone, and/or email
- Click **Generate QR Code**
- The QR encodes a vCard 3.0 — scannable by any phone's camera app

---

## Permissions

| Permission | Reason |
|---|---|
| `activeTab` | Read the current tab's URL for the auto-fill feature |

No other permissions are requested. No data leaves your browser.

---

## Tech Stack

| Component | Details |
|---|---|
| Manifest | Chrome Extension Manifest V3 |
| QR Library | [qrcodejs](https://github.com/davidshimjs/qrcodejs) v1.0.0 |
| Fonts | DM Mono, Syne (Google Fonts) |
| Language | Vanilla HTML, CSS, JavaScript |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push and open a Pull Request

---

## License

MIT — free to use, modify, and distribute.
