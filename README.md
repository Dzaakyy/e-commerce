# API E-Commerce

Ini adalah API e-commerce yang dibangun menggunakan **Node.js**, **MySQL**, dan **Redis**. API ini menyimpan data produk dan pengguna di database MySQL, sementara data keranjang belanja disimpan di Redis untuk akses yang cepat dan efisien yang dimana node.js dan mysql berjalan di system windows dan redis berjalan di system ubuntu.

## Fitur
- **Manajemen Produk**: Menyimpan dan mengelola detail produk di MySQL.
- **Manajemen Pengguna**: Menyimpan dan mengelola informasi pengguna di MySQL.
- **Keranjang Belanja**: Mengelola keranjang belanja pengguna menggunakan Redis untuk operasi baca/tulis yang cepat.
- **API RESTful**: Menyediakan endpoint untuk menambah/menghapus produk dari keranjang, mengambil data keranjang, dan mengosongkan keranjang.

## Teknologi yang Digunakan
- **Backend**: Node.js dengan Express.js
- **Database**:
  - **MySQL**: Menyimpan data produk dan pengguna.
  - **Redis**: Menyimpan data keranjang belanja.
- **Dependensi Lain**:
  - `mysql2`: Driver MySQL untuk Node.js.
  - `redis`: Klien Redis untuk Node.js.
  - Pustaka Node.js standar lainnya (`express`, `dotenv`, `cors`, `body-parser`).

## Instalasi
1. **Kloning repositori**:
   ```bash
   git clone https://github.com/Dzaakyy/e-commerce
   cd e-commerce
   ```

2. **Instal dependensi**:
   ```bash
   npm install
   ```
3. **Jalankan server Redis**:
   ### Pastikan Redis berjalan di sistem:
   ```bash
   redis-server
   ```

4. **Jalankan aplikasi**:
   ```bash
   npm run dev
   ```

## Konfigurasi Redi
  ### Masuk ke file redis config
   ```bash
   sudo nano /etc/redis/redis.conf
   ```

1. **Ganti IP REDIS**
   ### Ganti ip menjadi
   ```
   bind 0.0.0.0
   ```

2. **Ganti Protected Mode**
   ```bash
   protected-mode no
   ```
