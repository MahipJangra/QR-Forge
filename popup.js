// popup.js — QR Forge Extension Logic

// ── Tab Switching ──────────────────────────────────────────────────────────

const tabs = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.panel');
const qrSection = document.getElementById('qr-section');

tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
    qrSection.classList.remove('visible');
    setStatus('', '');
  });
});

// ── Auto-fill current tab URL ──────────────────────────────────────────────

const autofillBtn = document.getElementById('autofill-btn');
const autofillPreview = document.getElementById('autofill-preview');
const urlInput = document.getElementById('url-input');

chrome.tabs.query({ active: true, currentWindow: true }, (chromeTabs) => {
  if (chromeTabs[0] && chromeTabs[0].url) {
    const url = chromeTabs[0].url;
    const display = url.length > 40 ? url.substring(0, 37) + '…' : url;
    autofillPreview.textContent = display;
    autofillBtn.addEventListener('click', () => {
      urlInput.value = url;
      urlInput.focus();
    });
  } else {
    autofillPreview.textContent = 'Not available on this page';
    autofillBtn.style.opacity = '0.5';
  }
});

// ── QR Generation (uses DOM-based QRCode library) ─────────────────────────

const qrContainer = document.getElementById('qr-container');
let currentQRCanvas = null;

function generateQR(data) {
  if (!data || data.trim() === '') {
    setStatus('Nothing to encode.', 'err');
    return;
  }

  // Clear previous QR
  qrContainer.innerHTML = '';
  currentQRCanvas = null;

  try {
    new QRCode(qrContainer, {
      text: data.trim(),
      width: 200,
      height: 200,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M
    });

    // The library creates a canvas inside qrContainer
    setTimeout(() => {
      currentQRCanvas = qrContainer.querySelector('canvas') || qrContainer.querySelector('img');
      qrSection.classList.add('visible');
      setStatus('✓ Ready to save or share', 'ok');
    }, 100);

  } catch (e) {
    setStatus('Error: ' + e.message, 'err');
  }
}

// URL tab
document.getElementById('url-gen-btn').addEventListener('click', () => {
  const val = urlInput.value.trim();
  if (!val) { setStatus('Enter a URL first.', 'err'); return; }
  generateQR(val);
});

urlInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('url-gen-btn').click();
});

// Contact tab
document.getElementById('contact-gen-btn').addEventListener('click', () => {
  const name  = document.getElementById('c-name').value.trim();
  const phone = document.getElementById('c-phone').value.trim();
  const email = document.getElementById('c-email').value.trim();

  if (!name) { setStatus('Name is required.', 'err'); return; }

  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${name}`,
    phone  ? `TEL:${phone}`   : '',
    email  ? `EMAIL:${email}` : '',
    'END:VCARD'
  ].filter(Boolean).join('\n');

  generateQR(vcard);
});

// ── Save PNG ───────────────────────────────────────────────────────────────

document.getElementById('save-btn').addEventListener('click', () => {
  const canvas = qrContainer.querySelector('canvas');
  if (!canvas) { setStatus('Generate a QR first.', 'err'); return; }
  const link = document.createElement('a');
  link.download = 'qrforge.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
  setStatus('✓ Saved!', 'ok');
});

// ── Copy to Clipboard ──────────────────────────────────────────────────────

const copyBtn = document.getElementById('copy-btn');

copyBtn.addEventListener('click', async () => {
  const canvas = qrContainer.querySelector('canvas');
  if (!canvas) { setStatus('Generate a QR first.', 'err'); return; }
  try {
    canvas.toBlob(async (blob) => {
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      copyBtn.textContent = '✓ Copied!';
      copyBtn.classList.add('copied');
      setStatus('✓ Copied to clipboard', 'ok');
      setTimeout(() => {
        copyBtn.textContent = '📋 Copy';
        copyBtn.classList.remove('copied');
      }, 2000);
    });
  } catch (e) {
    setStatus('Copy failed — try Save instead.', 'err');
  }
});

// ── Status Helper ──────────────────────────────────────────────────────────

function setStatus(msg, type) {
  const el = document.getElementById('status');
  el.textContent = msg;
  el.className = 'status-bar' + (type ? ' ' + type : '');
}
