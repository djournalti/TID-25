import React, { useEffect, useState } from 'react'

const STORAGE_KEY = 'linknest_config_v1'

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

function encodeConfig(cfg) {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(cfg))))
  } catch {
    return ''
  }
}

function decodeConfig(s) {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(s))))
  } catch {
    return null
  }
}

const DEFAULT_CONFIG = {
  profile: {
    name: 'Nama Kamu',
    bio: 'Satu kalimat tentang kamu ✨',
    avatar: 'https://placehold.co/200x200?text=Avatar',
  },
  accent: '#7c3aed',
  links: [
    { id: uid(), title: 'Website', url: 'https://example.com', emoji: '🌐' },
    { id: uid(), title: 'Instagram', url: 'https://instagram.com', emoji: '📸' },
    { id: uid(), title: 'Twitter', url: 'https://twitter.com', emoji: '🐦' },
  ],
}

export default function App() {
  const [config, setConfig] = useState(() => {
    const hash = window.location.hash.replace(/^#/, '')
    if (hash) {
      const parsed = decodeConfig(hash)
      if (parsed) return parsed
    }
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  }, [config])

  function addLink() {
    const newLink = { id: uid(), title: 'Link Baru', url: 'https://', emoji: '🔗' }
    setConfig(prev => ({ ...prev, links: [...prev.links, newLink] }))
  }

  function updateLink(id, patch) {
    setConfig(prev => ({
      ...prev,
      links: prev.links.map(l => (l.id === id ? { ...l, ...patch } : l)),
    }))
  }

  function removeLink(id) {
    setConfig(prev => ({ ...prev, links: prev.links.filter(l => l.id !== id) }))
  }

  function generateShareURL() {
    const encoded = encodeConfig(config)
    const url = window.location.origin + window.location.pathname + '#' + encoded
    navigator.clipboard?.writeText(url)
    alert('URL disalin ke clipboard!')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow p-6 flex flex-col items-center">
        <img src={config.profile.avatar} alt="avatar" className="w-28 h-28 rounded-full mb-4" />
        <h1 className="text-2xl font-bold mb-1">{config.profile.name}</h1>
        <p className="text-gray-600 text-center mb-4">{config.profile.bio}</p>

        <div className="w-full space-y-3">
          {config.links.map(link => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="block p-3 rounded-xl text-center border font-semibold"
              style={{ borderColor: config.accent, color: config.accent }}
            >
              {link.emoji} {link.title}
            </a>
          ))}
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          LinkNest — Siap tampil di GitHub Pages 🚀
        </div>
      </div>

      <div className="mt-8 w-full max-w-md bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Edit Profil</h2>
        <input
          className="w-full border p-2 rounded mb-2"
          value={config.profile.name}
          onChange={e => setConfig({ ...config, profile: { ...config.profile, name: e.target.value } })}
        />
        <input
          className="w-full border p-2 rounded mb-2"
          value={config.profile.bio}
          onChange={e => setConfig({ ...config, profile: { ...config.profile, bio: e.target.value } })}
        />
        <input
          className="w-full border p-2 rounded mb-2"
          value={config.profile.avatar}
          onChange={e => setConfig({ ...config, profile: { ...config.profile, avatar: e.target.value } })}
        />
        <input
          type="color"
          value={config.accent}
          onChange={e => setConfig({ ...config, accent: e.target.value })}
          className="w-16 h-10 border rounded mb-2"
        />

        <h3 className="font-semibold mt-4 mb-1">Links</h3>
        {config.links.map(link => (
          <div key={link.id} className="border rounded p-2 mb-2">
            <input
              className="w-full border p-1 rounded mb-1"
              value={link.title}
              onChange={e => updateLink(link.id, { title: e.target.value })}
            />
            <input
              className="w-full border p-1 rounded mb-1"
              value={link.url}
              onChange={e => updateLink(link.id, { url: e.target.value })}
            />
            <input
              className="w-full border p-1 rounded mb-1"
              value={link.emoji}
              onChange={e => updateLink(link.id, { emoji: e.target.value })}
            />
            <button onClick={() => removeLink(link.id)} className="text-sm border px-2 py-1 rounded">
              Hapus
            </button>
          </div>
        ))}
        <button onClick={addLink} className="border px-3 py-1 rounded mt-2">
          Tambah Link
        </button>

        <div className="mt-4">
          <button onClick={generateShareURL} className="border px-3 py-1 rounded">
            Generate Share URL
          </button>
        </div>
      </div>
    </div>
  )
}