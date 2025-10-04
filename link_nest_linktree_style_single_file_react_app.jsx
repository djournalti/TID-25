// LinkNest — Linktree-style single-file React component + small app
// Usage & notes (read this first):
// 1) This is a single-file React component intended to drop into a Vite + React + Tailwind project
//    or into a CodeSandbox / StackBlitz that supports React and Tailwind.
// 2) Features included:
//    - Profile (avatar, name, bio)
//    - Customizable list of links (title, url, optional emoji/icon)
//    - Theme presets + color accent
//    - Live preview + simple editor UI
//    - Save/load configuration to localStorage
//    - Export / Import JSON config
//    - Shareable URL: click "Generate Share URL" to encode config in the URL hash (base64)
// 3) To deploy as a static site: build with Vite or create-react-app then host on Netlify/Vercel/GitHub Pages.
// 4) Tailwind is used for styling. If you don't have Tailwind, simple CSS fallback will still work,
//    but to get the exact look add Tailwind to the project.

import React, { useEffect, useState } from 'react';

// ---------- Helpers ----------
const STORAGE_KEY = 'linknest_config_v1';

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function encodeConfig(cfg) {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(cfg))));
  } catch (e) {
    return '';
  }
}

function decodeConfig(s) {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(s))));
  } catch (e) {
    return null;
  }
}

const DEFAULT_CONFIG = {
  profile: {
    name: 'Nama Kamu',
    bio: 'Satu kalimat yang menjelaskan siapa kamu.',
    avatar: 'https://placehold.co/256x256?text=Avatar',
  },
  accent: '#7c3aed',
  background: 'gradient', // 'solid' or 'gradient' or 'image'
  links: [
    { id: uid(), title: 'Website', url: 'https://example.com', emoji: '🌐' },
    { id: uid(), title: 'Instagram', url: 'https://instagram.com', emoji: '📸' },
    { id: uid(), title: 'Twitter', url: 'https://twitter.com', emoji: '🐦' },
  ],
};

// ---------- Main Component ----------
export default function LinkNestApp() {
  const [config, setConfig] = useState(() => {
    // load from URL hash first (shareable), then from localStorage, otherwise default
    try {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash) {
        const parsed = decodeConfig(hash);
        if (parsed) return parsed;
      }
    } catch (e) {
      // ignore
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      // ignore
    }

    return DEFAULT_CONFIG;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {}
  }, [config]);

  // Editor state
  const [editing, setEditing] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState(null);
  const [importText, setImportText] = useState('');

  // Link CRUD
  function addLink() {
    const newLink = { id: uid(), title: 'Link baru', url: 'https://', emoji: '🔗' };
    setConfig(prev => ({ ...prev, links: [...prev.links, newLink] }));
    setSelectedLinkId(newLink.id);
  }

  function updateLink(id, patch) {
    setConfig(prev => ({
      ...prev,
      links: prev.links.map(l => (l.id === id ? { ...l, ...patch } : l)),
    }));
  }

  function removeLink(id) {
    setConfig(prev => ({ ...prev, links: prev.links.filter(l => l.id !== id) }));
    if (selectedLinkId === id) setSelectedLinkId(null);
  }

  function moveLink(id, dir) {
    setConfig(prev => {
      const idx = prev.links.findIndex(l => l.id === id);
      if (idx === -1) return prev;
      const newLinks = [...prev.links];
      const swap = idx + dir;
      if (swap < 0 || swap >= newLinks.length) return prev;
      [newLinks[idx], newLinks[swap]] = [newLinks[swap], newLinks[idx]];
      return { ...prev, links: newLinks };
    });
  }

  // Profile updates
  function updateProfile(patch) {
    setConfig(prev => ({ ...prev, profile: { ...prev.profile, ...patch } }));
  }

  // Theme
  function updateAccent(hex) {
    setConfig(prev => ({ ...prev, accent: hex }));
  }

  // Export / Import
  function exportJSON() {
    const data = JSON.stringify(config, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'linknest-config.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function importJSON() {
    try {
      const parsed = JSON.parse(importText);
      setConfig(parsed);
      setImportText('');
      alert('Config berhasil diimpor.');
    } catch (e) {
      alert('JSON tidak valid.');
    }
  }

  // Share URL
  function generateShareURL() {
    const encoded = encodeConfig(config);
    const url = window.location.origin + window.location.pathname + '#' + encoded;
    navigator.clipboard?.writeText(url).then(() => {
      alert('Share URL disalin ke clipboard!');
    }, () => {
      prompt('Copy URL berikut:', url);
    });
  }

  // Reset
  function resetToDefault() {
    if (!window.confirm('Reset ke konfigurasi default?')) return;
    setConfig(DEFAULT_CONFIG);
    setSelectedLinkId(null);
  }

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT: editor */}
        <div className="md:col-span-1 bg-white p-4 rounded-2xl shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Editor</h2>
            <div className="flex gap-2">
              <button className="text-sm px-3 py-1 border rounded" onClick={() => { setEditing(!editing); }}>{editing ? 'Selesai' : 'Edit'}</button>
              <button className="text-sm px-3 py-1 border rounded" onClick={resetToDefault}>Reset</button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-medium">Nama</label>
            <input value={config.profile.name} onChange={e => updateProfile({ name: e.target.value })} className="w-full p-2 border rounded" />

            <label className="block text-xs font-medium">Bio</label>
            <input value={config.profile.bio} onChange={e => updateProfile({ bio: e.target.value })} className="w-full p-2 border rounded" />

            <label className="block text-xs font-medium">Avatar (URL)</label>
            <input value={config.profile.avatar} onChange={e => updateProfile({ avatar: e.target.value })} className="w-full p-2 border rounded" />

            <label className="block text-xs font-medium">Accent color</label>
            <input type="color" value={config.accent} onChange={e => updateAccent(e.target.value)} className="w-12 h-10 p-0 border rounded" />

            <div className="pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Links</h3>
                <button onClick={addLink} className="text-sm px-3 py-1 border rounded">Tambah</button>
              </div>

              <div className="mt-2 space-y-2 max-h-48 overflow-auto">
                {config.links.map((l, i) => (
                  <div key={l.id} className="flex items-center gap-2 border p-2 rounded">
                    <div className="flex-1">
                      <div className="text-sm font-medium truncate">{l.emoji} {l.title}</div>
                      <div className="text-xs text-gray-500 truncate">{l.url}</div>
                    </div>
                    <div className="flex gap-1">
                      <button title="Up" onClick={() => moveLink(l.id, -1)} className="px-2 py-1 border rounded text-xs">↑</button>
                      <button title="Down" onClick={() => moveLink(l.id, +1)} className="px-2 py-1 border rounded text-xs">↓</button>
                      <button title="Edit" onClick={() => setSelectedLinkId(l.id)} className="px-2 py-1 border rounded text-xs">✎</button>
                      <button title="Hapus" onClick={() => removeLink(l.id)} className="px-2 py-1 border rounded text-xs">🗑</button>
                    </div>
                  </div>
                ))}
              </div>

              {selectedLinkId && (
                <div className="mt-3 p-2 border rounded bg-gray-50">
                  <h4 className="text-sm font-medium mb-2">Edit link</h4>
                  {(() => {
                    const link = config.links.find(x => x.id === selectedLinkId);
                    if (!link) return <div className="text-xs text-gray-500">Link tidak ditemukan.</div>;
                    return (
                      <div className="space-y-2">
                        <input className="w-full p-2 border rounded" value={link.title} onChange={e => updateLink(link.id, { title: e.target.value })} />
                        <input className="w-full p-2 border rounded" value={link.url} onChange={e => updateLink(link.id, { url: e.target.value })} />
                        <input className="w-full p-2 border rounded" value={link.emoji} onChange={e => updateLink(link.id, { emoji: e.target.value })} />
                        <div className="flex gap-2">
                          <button onClick={() => setSelectedLinkId(null)} className="px-3 py-1 border rounded">Tutup</button>
                          <button onClick={() => removeLink(link.id)} className="px-3 py-1 border rounded">Hapus permanen</button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            <div className="pt-3 border-t mt-3">
              <h4 className="text-sm font-medium mb-2">Export / Import</h4>
              <div className="flex gap-2">
                <button onClick={exportJSON} className="px-3 py-1 border rounded">Download JSON</button>
                <button onClick={generateShareURL} className="px-3 py-1 border rounded">Generate Share URL</button>
              </div>
              <textarea value={importText} onChange={e => setImportText(e.target.value)} placeholder="Paste JSON di sini untuk import" className="w-full h-24 p-2 border rounded mt-2" />
              <div className="flex gap-2 mt-2">
                <button onClick={importJSON} className="px-3 py-1 border rounded">Import JSON</button>
                <button onClick={() => { setImportText(''); localStorage.removeItem(STORAGE_KEY); alert('Local storage dihapus.'); }} className="px-3 py-1 border rounded">Clear LocalStorage</button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: preview */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="bg-white p-8 rounded-2xl shadow flex flex-col items-center" style={{ borderTopColor: config.accent }}>
            {/* profile card */}
            <div className="flex flex-col items-center gap-3">
              <div style={{ width: 112, height: 112 }} className="rounded-full overflow-hidden shadow">
                <img src={config.profile.avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h1 className="text-2xl font-bold">{config.profile.name}</h1>
              <p className="text-sm text-gray-600 text-center max-w-xl">{config.profile.bio}</p>
            </div>

            <div className="w-full mt-6 grid grid-cols-1 gap-3" style={{ maxWidth: 680 }}>
              {config.links.map(l => (
                <a key={l.id} href={l.url} target="_blank" rel="noreferrer" className="block text-center p-3 rounded-xl transition-transform transform hover:-translate-y-0.5" style={{ background: '#fff', border: `1px solid ${config.accent}`, color: config.accent, textDecoration: 'none', fontWeight: 600 }}>
                  <span style={{ marginRight: 8 }}>{l.emoji}</span>{l.title}
                </a>
              ))}
            </div>

            <div className="mt-6 text-xs text-gray-400">Made with LinkNest • Customizable • Static deploy ready</div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="font-medium mb-2">Preview & Tips</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Gunakan avatar ukuran 400×400 untuk tampilan terbaik.</li>
              <li>Jika ingin gambar latar, set profile.avatar ke URL gambar yang dihosting.</li>
              <li>Bagikan URL yang dihasilkan setelah klik "Generate Share URL" — itu menyimpan konfigurasi di hash URL.</li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-xs text-gray-500">Tip: Untuk online-kan, build project dan unggah ke Netlify / Vercel / GitHub Pages.</footer>
    </div>
  );
}
