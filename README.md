# Validator Format Kode Warna Hexadecimal (Implementasi DFA)

Proyek UAS mata kuliah ** Otomata dan Teori Bahasa**  implementasi *Deterministic Finite Automaton* (DFA) untuk memvalidasi format kode warna hexadecimal (`#RRGGBB`) berbasis web.

## Deskripsi Studi Kasus

Kode warna hexadecimal seperti `#3498DB` banyak digunakan dalam pengembangan web, desain antarmuka, dan pengolahan gambar digital. Kesalahan format kode warna  jumlah digit yang kurang/lebih, karakter di luar basis heksadesimal, atau tanda pagar yang hilang  sering kali baru terdeteksi setelah tampilan gagal dirender.

Aplikasi ini menerapkan konsep **Deterministic Finite Automaton (DFA)** untuk memvalidasi apakah sebuah string kode warna sesuai format `#RRGGBB` secara real-time, sekaligus memvisualisasikan proses transisi state-nya agar mudah dipahami oleh pengguna yang belum familiar dengan teori otomata.

Validasi diuji menggunakan dataset nyata berisi 1.298 kode warna dari [Color Names Dataset (Kaggle)](https://www.kaggle.com/datasets/avi1023/color-names), ditambah 194 data yang sengaja dimodifikasi formatnya untuk menguji kasus tidak valid  total 1.492 data uji.

## Jenis Otomata yang Diimplementasikan

**Deterministic Finite Automaton (DFA)**, didefinisikan sebagai 5-tuple (Q, Σ, δ, q0, F):

| Komponen | Keterangan |
|---|---|
| Q (himpunan state) | {q0, q1, q2, q3, q4, q5, q6, q7, qtrap} |
| Σ (alfabet input) | karakter `#`, digit `0-9`, huruf `A-F`/`a-f`, dan karakter lain |
| q0 (state awal) | q0 |
| F (state akhir/diterima) | {q7} |
| δ (fungsi transisi) | lihat tabel di bawah |

### Tabel Transisi

| State | Input `#` | Input hex (0-9, A-F) | Input lainnya |
|---|---|---|---|
| q0 (awal) | q1 | qtrap | qtrap |
| q1 | qtrap | q2 | qtrap |
| q2 | qtrap | q3 | qtrap |
| q3 | qtrap | q4 | qtrap |
| q4 | qtrap | q5 | qtrap |
| q5 | qtrap | q6 | qtrap |
| q6 | qtrap | q7 (diterima) | qtrap |
| q7 (diterima) | qtrap | qtrap | qtrap |
| qtrap | qtrap | qtrap | qtrap |

### Diagram State

(awal) (diterima)
q0 --#--> q1 --hex--> q2 --hex--> q3 --hex--> q4 --hex--> q5 --hex--> q6 --hex--> q7
|
(selain hex / #)
v
qtrap


Begitu string mencapai `qtrap`, tidak ada jalan kembali ke state lain  string otomatis dinyatakan tidak valid meskipun sisa karakter belum selesai dibaca. Sekali masuk `q7` dengan karakter tambahan, otomata juga jatuh ke `qtrap`, karena format ini mensyaratkan tepat enam digit, tidak kurang maupun lebih.

## Fitur Aplikasi

- Validasi kode warna hex secara real-time (langsung saat mengetik atau menempel/paste)
- Visualisasi diagram state DFA yang menyala mengikuti karakter yang diproses, disertai efek glow pada state aktif
- Jejak transisi state lengkap (contoh: `q0 → q1 → q2 → ... → q7`) dan keterangan tekstual state saat ini
- Beberapa contoh kode siap-klik untuk mencoba kasus valid maupun tidak valid tanpa mengetik manual
- Pengujian otomatis DFA terhadap seluruh dataset, dengan statistik dan grafik hasil (valid/tidak valid) menggunakan Chart.js
- Halaman cara penggunaan dan penjelasan konsep DFA untuk pengguna awam

## Struktur Proyek

proyek-dfa-hexcolor/
├── app.py # Flask app & routing
├── dfa.py # Implementasi kelas DFA (Python, untuk pengujian dataset)
├── data_loader.py # Membaca dataset & menyusun data uji
├── requirements.txt
├── Procfile # Konfigurasi deployment (Railway/Vercel)
├── .gitignore
├── data/
│ └── color_names.csv # Dataset (Kaggle: Color Names)
├── templates/
│ ├── index.html
│ ├── dataset.html
│ ├── cara_pakai.html
│ └── tentang.html
└── static/
├── css/style.css
└── js/
├── dfa.js # Implementasi DFA (JavaScript, untuk validasi real-time di browser)
├── diagram.js # Kontrol visual diagram state
└── chart-init.js # Statistik & grafik hasil pengujian dataset


## Cara Instalasi & Menjalankan Secara Lokal

1. Clone repository ini:

git clone https://github.com/SelsaShaf/dfa-hex-color.git
cd dfa-hex-color


2. Buat dan aktifkan virtual environment:

python -m venv venv
venv\Scripts\activate # Windows
source venv/bin/activate # macOS/Linux


3. Install dependency:

pip install -r requirements.txt


4. Pastikan file dataset `color_names.csv` sudah ada di `data/color_names.csv`.

5. Jalankan aplikasi:

python app.py


6. Buka browser dan akses:

http://127.0.0.1:5000


## Teknologi yang Digunakan

| Komponen | Teknologi |
|---|---|
| Backend | Python, Flask, Gunicorn |
| Frontend | HTML, CSS, JavaScript |
| Visualisasi grafik | Chart.js |
| Hosting | Vercel |
| Domain | .my.id (IDwebhost) |
| Dataset | Color Names Dataset (Kaggle) |

## Tautan

- **Aplikasi Live:** https://www.selsa-validator-hex.my.id/
- **Video Presentasi (YouTube):**https://youtu.be/Y_jT792hH_c
- **Dataset:** [Color Names Dataset  Kaggle](https://www.kaggle.com/datasets/avi1023/color-names)

## Informasi Penulis

- **Nama:** Selsa Shafana Alfiyani
- **NIM:** 301240041
- **Program Studi:** Teknik Informatika
- **Semester:** 4
- **Mata Kuliah:**  Otomata dan Teori Bahasa
