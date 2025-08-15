# Panduan Mengelola Proyek dengan GitHub

Berikut adalah langkah-langkah untuk mengunggah kode proyek ini ke repositori baru di GitHub dan cara memperbaruinya secara berkala. Panduan ini mengasumsikan Anda sudah memiliki akun GitHub dan Git sudah terinstal di komputer Anda.

---

## Bagian 1: Unggahan Awal Proyek (Hanya Sekali)

Lakukan langkah-langkah ini **hanya satu kali** saat pertama kali mempublikasikan proyek Anda.

### Langkah 1: Buat Repositori Baru di GitHub

1.  Buka [GitHub.com](https://github.com) dan masuk.
2.  Klik tombol **"+"** di pojok kanan atas, lalu pilih **"New repository"**.
3.  Beri nama repositori Anda (misalnya, `pajakpro-app`).
4.  **Penting:** Jangan centang opsi untuk menambahkan `README`, `.gitignore`, atau `license` (karena sudah ada).
5.  Klik **"Create repository"**.
6.  Salin (copy) URL repositori Anda, contoh: `https://github.com/NAMA_ANDA/pajakpro-app.git`.

### Langkah 2: Unggah Kode dari Komputer Anda

Buka terminal di dalam folder proyek Anda, lalu jalankan perintah-perintah berikut secara berurutan:

1.  **Inisialisasi Git di folder proyek:**
    ```bash
    git init -b main
    ```

2.  **Tambahkan semua file ke Git:**
    ```bash
    git add .
    ```

3.  **Buat commit pertama (simpan "snapshot" kode):**
    ```bash
    git commit -m "Initial commit: Proyek Kalkulator Pajak"
    ```

4.  **Hubungkan folder lokal dengan repositori di GitHub:**
    Ganti `URL_REPOSITORI_ANDA` dengan URL yang Anda salin dari GitHub.
    ```bash
    git remote add origin URL_REPOSITORI_ANDA
    ```

5.  **Unggah (push) kode Anda ke GitHub:**
    ```bash
    git push -u origin main
    ```

Selesai! Sekarang semua file proyek Anda sudah ada di GitHub.

---

## Bagian 2: Cara Mengunggah Perubahan Rutin

Setelah Anda atau saya membuat perubahan pada kode, ikuti 3 langkah berikut **setiap kali** Anda ingin menyimpan dan mengunggah pembaruan.

### Langkah 1: Siapkan Semua Perubahan

Jalankan perintah ini di terminal. Ini akan menyertakan semua file yang baru diubah atau ditambahkan.

```bash
git add .
```
*(Pastikan ada spasi antara `add` dan `.`)*

### Langkah 2: Simpan Perubahan dengan Pesan

Jalankan perintah ini. Ganti `"Tulis deskripsi perubahan di sini"` dengan penjelasan singkat tentang pembaruan yang dibuat.

```bash
git commit -m "Tulis deskripsi perubahan di sini"
```
Contoh yang baik:
- `git commit -m "Perbaiki bug perhitungan pajak"`
- `git commit -m "Tambahkan fitur unduh PDF"`
- `git commit -m "Perbarui tampilan halaman utama"`

### Langkah 3: Kirim Perubahan ke GitHub

Ini adalah langkah terakhir. Perintah ini mengunggah semua perubahan yang sudah Anda simpan (commit) ke GitHub.

```bash
git push
```

Itu saja! Ulangi 3 langkah di **Bagian 2** ini setiap kali ada pembaruan untuk menjaga repositori GitHub Anda tetap sinkron dengan kode di komputer Anda.
