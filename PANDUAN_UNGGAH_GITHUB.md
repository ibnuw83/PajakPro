# Panduan Unggah Proyek ke GitHub

Berikut adalah langkah-langkah untuk mengunggah kode proyek ini ke repositori baru di GitHub. Panduan ini mengasumsikan Anda sudah memiliki akun GitHub dan Git sudah terinstal di komputer Anda.

## Langkah 1: Buat Repositori Baru di GitHub

1.  Buka situs [GitHub.com](https://github.com) dan masuk ke akun Anda.
2.  Klik tombol **"+"** di pojok kanan atas, lalu pilih **"New repository"**.
3.  Beri nama repositori Anda (misalnya, `pajakpro-app`).
4.  Anda bisa menambahkan deskripsi (opsional).
5.  Pilih antara "Public" (bisa dilihat semua orang) atau "Private" (hanya Anda dan kolaborator yang bisa melihat).
6.  **Penting:** Jangan centang opsi untuk menambahkan `README`, `.gitignore`, atau `license` karena proyek ini sudah memilikinya.
7.  Klik tombol **"Create repository"**.

Setelah repositori dibuat, Anda akan melihat halaman dengan beberapa perintah. URL repositori Anda akan terlihat di sana, contohnya: `https://github.com/NAMA_ANDA/pajakpro-app.git`.

## Langkah 2: Unggah Kode dari Komputer Anda

Buka terminal atau command prompt di dalam folder proyek Anda, lalu jalankan perintah-perintah berikut secara berurutan.

1.  **Inisialisasi Git di folder proyek:**
    Perintah ini akan membuat repositori Git lokal di dalam folder proyek Anda.
    ```bash
    git init -b main
    ```

2.  **Tambahkan semua file ke Git:**
    Perintah ini akan menyiapkan semua file di folder proyek untuk di-commit (disimpan dalam riwayat Git).
    ```bash
    git add .
    ```

3.  **Buat commit pertama:**
    "Commit" adalah seperti sebuah "snapshot" atau titik simpan dari kode Anda. Beri pesan yang jelas untuk commit pertama ini.
    ```bash
    git commit -m "Initial commit: PajakPro project setup"
    ```

4.  **Hubungkan repositori lokal dengan repositori di GitHub:**
    Ganti `URL_REPOSITORI_ANDA` dengan URL yang Anda dapatkan dari GitHub pada Langkah 1.
    ```bash
    git remote add origin URL_REPOSITORI_ANDA
    ```
    Contoh:
    `git remote add origin https://github.com/NAMA_ANDA/pajakpro-app.git`

5.  **Unggah (push) kode Anda ke GitHub:**
    Perintah ini akan mengirim semua commit dari repositori lokal Anda ke repositori di GitHub.
    ```bash
    git push -u origin main
    ```

Selesai! Sekarang jika Anda me-refresh halaman repositori Anda di GitHub, semua file proyek akan muncul di sana.