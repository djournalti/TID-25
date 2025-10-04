# 🚀 Panduan Lengkap Deploy LinkNest ke GitHub Pages

## 1️⃣ Ekstrak dan Siapkan Proyek
1. Unduh file **linknest_github_ready.zip**
2. Ekstrak ke folder, misalnya `C:\Projects\linknest`
3. Buka terminal di folder tersebut

---

## 2️⃣ Instal Dependensi
Pastikan Node.js sudah terpasang (versi 18 atau lebih baru).

```bash
node -v
npm -v
npm install
```

---

## 3️⃣ Jalankan di Lokal
```bash
npm run dev
```
Akses di browser:
```
http://localhost:5173/
```

---

## 4️⃣ Siapkan Repository GitHub
1. Buat repo baru di [https://github.com/new](https://github.com/new)
2. Jalankan perintah ini di terminal:

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/USERNAME/linknest.git
git push -u origin main
```

> Ganti `USERNAME` dengan nama GitHub kamu.

---

## 5️⃣ Deploy Otomatis via GitHub Actions
File `.github/workflows/deploy.yml` sudah disiapkan.
GitHub akan otomatis membangun dan mem-publish ke branch `gh-pages`.

Lihat progres di:
➡️ **GitHub → tab “Actions”**

---

## 6️⃣ Akses Hasil Deploy
Setelah selesai, buka:
```
https://USERNAME.github.io/linknest/
```
Atau sesuaikan nama repo jika berbeda.

---

## 7️⃣ Ubah Nama Repository (Opsional)
Jika repo kamu bukan `linknest`, ubah di `vite.config.js`:
```js
base: '/nama-repo/',
```

---

## 8️⃣ Gunakan Custom Domain (Opsional)
1. Buka **Settings → Pages**
2. Tambahkan domain kamu, misalnya `bio.namaku.com`
3. Tambahkan record DNS di domain kamu:
   ```
   bio.namaku.com  →  username.github.io
   ```

Setelah 5–10 menit, domain kamu aktif.

---

## 9️⃣ Update & Sinkronisasi
Jika mengubah file:
```bash
git add .
git commit -m "update UI"
git push
```

GitHub Pages akan otomatis membangun ulang.

---

## ✅ Selesai!
Sekarang kamu punya halaman bio seperti Linktree yang:
- gratis dihosting di GitHub Pages,
- sepenuhnya milik kamu,
- dan bisa dikustomisasi sepenuhnya.

Selamat! 🎉
