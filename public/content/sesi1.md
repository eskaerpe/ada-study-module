# Sesi 01: Peran Algoritma dalam Pemrograman (The Role of Algorithms in Programming)

**Dosen Pengampu:** Henry Lucky, S.Kom. M.Kom.  
**Mata Kuliah:** COMP6049 – Algorithm Design and Analysis (Desain dan Analisis Algoritma)  
**Institusi:** BINUS University  

---

## 1. Deskripsi Mata Kuliah & Capaian Pembelajaran (Learning Outcomes)

### Deskripsi Mata Kuliah
Mata kuliah **COMP6049 – Algorithm Design and Analysis** membahas konsep-konsep fundamental dalam perancangan dan analisis algoritma. Tujuan utamanya adalah memberikan pemahaman mendalam untuk mengukur dan mengkalkulasi efisiensi waktu komputasi (*time complexity*) serta penggunaan ruang memori (*space complexity*), membandingkan berbagai metode desain algoritma, serta membekali mahasiswa dengan pengetahuan struktur algoritma standar agar mampu merancang algoritma yang optimal dan efisien untuk menyelesaikan masalah komputasi kompleks.

### Capaian Pembelajaran / Learning Outcomes (LO)
- **LO 1:** Menjelaskan konsep fundamental dalam analisis algoritma (*Explain fundamental concept of analysis algorithms*).
- **LO 2:** Menerapkan teknik-teknik dan metode desain algoritma (*Apply algorithm techniques and methods*).
- **LO 3:** Menyelesaikan masalah spesifik dengan menggunakan algoritma yang tepat (*Solve a problem using specific algorithm*).
- **LO 4:** Membandingkan berbagai macam metode perancangan algoritma (*Compare several algorithm design methods*).

---

## 2. Komponen Evaluasi & Kontes Pemrograman

### Bobot Penilaian
- **Tugas Individu (Assignment):** 20%
- **Assurance of Learning (AoL):** 20%
- **Ujian Tengah Semester (Mid Exam / UTS):** 30%
- **Ujian Akhir Semester (Final Exam / UAS):** 30%

> **Persyaratan Wajib Komponen AoL:**  
> Seluruh mahasiswa jurusan Computer Science BINUS University semester 3 **DIWAJIBKAN** untuk berpartisipasi dalam kontes pemrograman **Indonesia National Contest (INC)**. Keikutsertaan dalam kontes ini dihitung langsung ke dalam nilai partisipasi dan bobot tugas mata kuliah COMP6049.

### Mengenai INC & ICPC
- **Indonesia National Contest (INC):** Kontes pemrograman kompetitif tingkat nasional antar perguruan tinggi di seluruh Indonesia. INC berfungsi sebagai ajang seleksi dan persiapan utama bagi tim mahasiswa Indonesia untuk melangkah ke jenjang internasional **ICPC**.
- **ACM International Collegiate Programming Contest (ICPC):** Kontes pemrograman beregu (tim) berjenjang paling bergengsi di dunia yang diselenggarakan di bawah naungan ACM dan berpusat di Baylor University.
  - Melibatkan jaringan universitas global yang menyelenggarakan kompetisi regional hingga lolos ke **ACM-ICPC World Finals**.
  - Diikuti oleh puluhan ribu mahasiswa terbaik dari hampir 2.000 universitas di lebih dari 80 negara.
  - Melatih kreativitas, kerja sama tim (*teamwork*), inovasi pemecahan masalah, dan kemampuan beroperasi di bawah tekanan waktu yang ketat.
  - Format Kontes: Setiap tim diberikan serangkaian soal algoritma kompleks yang harus diselesaikan dalam batas waktu tertentu menggunakan bahasa pemrograman **C, C++, atau Java**.

### Informasi, Pendaftaran & Sumber Belajar
- **Portal Resmi INC / ICPC BINUS:** [http://competition.binus.ac.id/portal/](http://competition.binus.ac.id/portal/)

#### Sumber Belajar (Learning Resources):
- [TLX TOKI Kursus Dasar](https://tlx.toki.id/courses/basic) (Sangat cocok untuk pemula yang belum memiliki pengalaman coding)
- [TLX TOKI Kursus Pemrograman Kompetitif](https://tlx.toki.id/courses/competitive)
- [USACO Guide](https://usaco.guide/) (Panduan kurikulum pemrograman kompetitif internasional)
- [E-Book Pemrograman Kompetitif Dasar PDF (TOKI)](https://ksn.toki.id/data/pemrograman-kompetitif-dasar.pdf)

#### Platform Latihan & Kontes Online:
- [PandaOJ](http://pandaoj.com)
- [Kattis Online Judge](https://open.kattis.com/)
- [Codeforces](https://codeforces.com/)
- [AtCoder](https://atcoder.jp/)
- [TLX Contests](https://tlx.toki.id/contests)
- [Soal INC 2022 di TLX](https://tlx.toki.id/problems/inc-2022)

---

## 3. Konsep Dasar & Pengenalan Algoritma

### Definisi Algoritma
- **Definisi Formal:** Algoritma adalah setiap prosedur komputasi yang terdefinisi dengan presisi (*well-defined computational procedure*), yang menerima suatu nilai atau sekumpulan nilai sebagai **input**, dan memprosesnya untuk menghasilkan suatu nilai atau sekumpulan nilai sebagai **output**.
- **Transformasi Data:** Algoritma merupakan urutan langkah-langkah komputasi logis yang mentransformasikan data masukan (input) menjadi hasil keluaran (output).
- **Alat Pemecah Masalah:** Algoritma adalah alat spesifik untuk menyelesaikan masalah komputasi yang spesifikasinya telah ditentukan dengan jelas.
- **Hubungan Masalah dan Algoritma:** Pernyataan masalah (*problem statement*) mendefinisikan hubungan input/output yang diinginkan secara umum, sedangkan algoritma mendeskripsikan prosedur komputasi konkret untuk mencapai hubungan input/output tersebut.

### Intuisi: Mengapa Algoritma Diperlukan?
> **Analogi Resep Masakan & Peta Layanan:**  
> Bayangkan algoritma seperti resep masakan di restoran bintang lima atau sistem navigasi GPS. Jika resep masakan ditulis ambigu ("tambahkan garam secukupnya tanpa takaran"), rasa masakan akan tidak konsisten. Begitu pula komputer: komputer tidak memiliki intuisi manusia. Komputer memerlukan instruksi eksplisit tanpa ambiguitas step-by-step. Jika masukan berupa titik asal dan titik tujuan, algoritma navigasi harus memproses miliaran ruas jalan untuk memberikan rute tercepat dalam hitungan milidetik.

### Pengurutan Data (Sorting) sebagai Operasi Fundamental
Pengurutan data adalah salah satu operasi yang paling mendasar dalam ilmu komputer karena banyak aplikasi dan algoritma lain yang menggunakannya sebagai langkah perantara (*intermediate step*).

#### Kriteria Pemilihan Algoritma Pengurutan:
Pemilihan algoritma pengurutan terbaik sangat bergantung pada konteks masalah:
1. **Jumlah Elemen Data:** Data berukuran kecil ($N < 50$) dapat menggunakan Insertion Sort, sedangkan data besar ($N > 10^5$) membutuhkan Merge Sort atau Quick Sort ($O(N \log N)$).
2. **Tingkat Keterurutan Awal:** Jika data sudah hampir terurut (*nearly sorted*), Insertion Sort berjalan dalam waktu linear $O(N)$. Jika data acak, Merge Sort lebih stabil.
3. **Batasan Nilai Elemen:** Jika nilai elemen terbatas pada rentang kecil (misal nilai ujian $0-100$), algoritma non-pembandingan seperti Counting Sort berjalan dalam $O(N + K)$.
4. **Arsitektur Perangkat Keras:** Jumlah core prosesor, memori cache, dan kemudahan eksekusi paralel.
5. **Jenis Media Penyimpanan:** Apakah data dimuat di memori utama (RAM / Internal Sorting) atau di media penyimpanan eksternal (Disk/SSD / External Merge Sort).

### Algoritma yang Benar (Correct Algorithm)
- **Algoritma Benar (Correct):** Algoritma dikatakan benar jika untuk *setiap* instance input yang valid, algoritma tersebut pasti berhenti (*halt*) dalam waktu terhingga dan menghasilkan jawaban/solusi yang tepat sesuai spesifikasi.
- **Algoritma Salah (Incorrect):** Algoritma dikatakan salah jika ada instance input tertentu yang menyebabkannya tidak pernah berhenti (*infinite loop*) atau berhenti namun menghasilkan keluaran yang keliru.

---

## 4. Analisis Komparatif Contoh Kasus Eksekusi (Worked Example)

### Contoh Kasus: Insertion Sort vs Merge Sort pada Skala Data Besar

Mari kita bandingkan dua algoritma pengurutan pada komputer yang sama untuk mengurutkan $N = 10.000.000$ ($10^7$) angka:
1. **Insertion Sort:** Kompleksitas waktu $T_1(N) = 2N^2$ instruksi.
2. **Merge Sort:** Kompleksitas waktu $T_2(N) = 50N \log_2 N$ instruksi.

Dijalankan di atas komputer super cepat yang mampu mengeksekusi $10^9$ instruksi/detik:

#### Langkah 1: Hitung Instruksi Insertion Sort
$$T_1(10^7) = 2 \times (10^7)^2 = 2 \times 10^{14} \text{ instruksi}$$
$$\text{Waktu} = \frac{2 \times 10^{14}}{10^9} = 200.000 \text{ detik} \approx \mathbf{55,5 \text{ jam!}}$$

#### Langkah 2: Hitung Instruksi Merge Sort
$$T_2(10^7) = 50 \times 10^7 \times \log_2(10^7) \approx 50 \times 10^7 \times 23,25 = 1,1625 \times 10^{10} \text{ instruksi}$$
$$\text{Waktu} = \frac{1,1625 \times 10^{10}}{10^9} = 11,625 \text{ detik} \approx \mathbf{11,6 \text{ detik!}}$$

> **Kesimpulan:** Pemilihan algoritma yang tepat (Merge Sort vs Insertion Sort) memangkas waktu eksekusi dari **2 hari lebih** menjadi hanya **11 detik** pada perangkat keras yang sama!

---

## 5. Penerapan Algoritma pada Masalah Dunia Nyata

Algoritma digunakan secara luas untuk menyelesaikan masalah-masalah berskala besar di industri dan sains:

1. **Human Genome Project (Proyek Genom Manusia):**
   - **Tujuan:** Mengidentifikasi sekitar 30.000 gen dalam DNA manusia dan menentukan urutan dari 3 miliar pasangan basa kimia penyusun DNA.
   - **Peran Algoritma:** Menyimpan, mengelola, dan mengidentifikasi kecocokan rantai DNA secara efisien. Metode **Dynamic Programming** (seperti algoritma Needleman-Wunsch & Smith-Waterman) digunakan secara intensif untuk perbandingan sekuens biologis.

2. **Routing Jaringan Internet:**
   - **Tujuan:** Pengguna di seluruh dunia dapat mengakses dan mentransfer data dalam jumlah raksasa secara instan.
   - **Peran Algoritma:** Pengelolaan jalur lalu lintas data pada router internet menggunakan algoritma **Shortest Path** (seperti Dijkstra dan Bellman-Ford) untuk menemukan rute tercepat dan terbebas dari kongesti data.

3. **Alokasi Sumber Daya & Linear Programming:**
   - Perusahaan komersial dan manufaktur memodelkan penghematan biaya menggunakan **Linear Programming**:
     - **Industri Minyak:** Menentukan titik pengeboran sumur minyak untuk memaksimalkan estimasi profit.
     - **Kampanye Politik:** Mengalokasikan anggaran iklan di berbagai media untuk memaksimalkan perolehan suara.
     - **Maskapai Penerbangan:** Menjadwalkan awak pesawat (*crew scheduling*) dengan biaya terendah sambil mematuhi regulasi jam kerja penerbangan.
     - **Penyedia Layanan Internet (ISP):** Menentukan lokasi penambahan infrastruktur jaringan baru agar jangkauan maksimal.

4. **Karakteristik Masalah Algoritma yang Menarik:**
   - **Solusi Kandidat Melimpah:** Masalah memiliki jutaan kemungkinan solusi kandidat, namun hanya sangat sedikit yang benar atau optimal. Algoritma bertugas menemukan solusi terbaik tanpa harus mengecek satu per satu secara brute-force.
   - **Dampak Praktis Ekonomis:** Memiliki aplikasi langsung yang menghemat biaya nyata (misalnya algoritma rute terpendek menghemat bahan bakar dan waktu armada logistik).

---

## 6. Spesifikasi Algoritma Tingkat Tinggi (Pseudocode)

Algoritma dapat dituliskan dalam bahasa manusia, kode program asli, atau rancangan hardware. **Pseudocode** adalah metode spesifikasi algoritma tingkat tinggi yang menggabungkan kemudahan bahasa natural (seperti Bahasa Inggris) dengan notasi matematis yang presisi.

### Komponen Utama Pseudocode:
1. **Variabel (Variables):** Tempat penyimpanan data sementara.
2. **Struktur Iterasi / Perulangan (Looping):** Mengulang eksekusi instruksi (`for-do`, `repeat-until`, `while-do`).
3. **Struktur Seleksi / Percabangan (Branching):** Mengambil keputusan berdasarkan kondisi (`if-then-else`, `select-case`).
4. **Modul / Sub-program:** Pemecahan kode menjadi bagian terkecil (`Procedure`/`Sub`, `Function`, dan teknik `Recursive`).

---

## 7. Algoritma sebagai Sebuah Teknologi (Algorithms as a Technology)

### Efisiensi dan Batasan Sumber Daya
- Komputer memang cepat, tetapi **kecepatannya tidak terbatas**.
- Memori komputer murah, tetapi **kapasitasnya tidak tak terbatas**.
- Waktu komputasi adalah sumber daya yang terbatas (*bounded resource*). Uang yang habis dapat dicari kembali, tetapi **waktu yang terbuang tidak akan pernah bisa dikembalikan**.
- Algoritma harus dirancang untuk memanfaatkan sumber daya waktu (*time complexity*) dan ruang memori (*space complexity*) secara seefisien mungkin.

### Kedudukan Algoritma Dibandingkan Perangkat Keras
Performa total suatu sistem sangat bergantung pada pemilihan algoritma yang efisien, sama vitalnya dengan pemilihan perangkat keras (*hardware*) yang cepat. Algoritma tertanam di seluruh lapisan teknologi modern:
- Arsitektur Prosesor & Hardware
- Desain Antarmuka Pengguna (GUI)
- Router Jaringan Nirkabel & Internet
- Compiler, Interpreter, dan Assembler
- Sistem Pemrosesan Data & Machine Learning

> **Tolok Ukur Programmer Profesional:**  
> Memiliki dasar pemahaman algoritma dan teknik analisis yang solid adalah karakteristik utama yang membedakan seorang *programmer* ahli dari *coder* biasa.

---

## 8. Panduan Strategi Pemecahan Masalah (Problem Solving Strategy)

Saat menghadapi soal algoritma atau kompetisi seperti INC:
1. **Pahami Batasan Masalah (Constraints):**
   - Jika $N \le 10^8 \rightarrow$ Solusi $O(N)$ atau $O(N \log N)$.
   - Jika $N \le 10^5 \rightarrow$ Solusi $O(N \log N)$ wajib digunakan (misal Merge Sort / Binary Search).
   - Jika $N \le 20 \rightarrow$ Solusi eksponensial $O(2^N)$ atau Bitmask DP diperbolehkan.
2. **Identifikasi Struktur Data yang Tepat:** Jangan gunakan Array jika membutuhkan pencarian cepat $O(1)$ (gunakan Hash Map/Set).
3. **Uji Kasus Ekstrem (Edge Cases):**
   - Elemen kosong ($N=0$ atau $N=1$).
   - Nilai masukan maksimum / minimum (potensi integer overflow, gunakan 64-bit `long long` di C++).

---

## 9. Soal Latihan & Evaluasi Mandiri (Practice & Self-Assessment)

### Latihan Soal dengan Pembahasan

#### Soal 1: Analisis Efisiensi Waktu
Sebuah algoritma $A$ memiliki kompleksitas $O(N^2)$ dan algoritma $B$ memiliki kompleksitas $O(N \log_2 N)$. Berapa perbandingan jumlah operasi untuk input $N = 1048576$ ($2^{20}$)?

**Jawaban & Pembahasan:**
- Operasi Algoritma $A$: $(2^{20})^2 = 2^{40} \approx 1,099 \times 10^{12}$ operasi.
- Operasi Algoritma $B$: $2^{20} \times \log_2(2^{20}) = 2^{20} \times 20 = 20.971.520 \approx 2,097 \times 10^7$ operasi.
- Rasio Efisiensi: Algoritma $B$ berjalan $\approx 52.428$ kali lebih cepat daripada Algoritma $A$.

---

### Kuis Interaktif & Kartu Kilat (Quiz & Flashcards)

#### Kartu Kilat (Flashcards)
1. **Q:** Apa syarat utama sebuah algoritma dikatakan *correct* (benar)?  
   **A:** Berhenti (*halt*) dalam waktu terhingga untuk semua masukan yang valid dan menghasilkan keluaran yang tepat.
2. **Q:** Apa kriteria utama yang menentukan pilihan algoritma pengurutan?  
   **A:** Ukuran data, tingkat keterurutan awal, batasan nilai elemen, arsitektur hardware, dan lokasi media penyimpanan.
3. **Q:** Mengapa partisipasi INC wajib bagi mahasiswa CS BINUS semester 3?  
   **A:** Karena INC merupakan bagian langsung dari penilaian komprehensif AoL (20%) dan Assignment COMP6049.

#### Kuis Pilihan Ganda
1. Manakah dari berikut ini yang BUKAN merupakan komponen utama pseudocode?
   - A) Variables
   - B) Iteration (`for-do`, `while-do`)
   - C) Graphical User Interface (GUI) Layout *(Jawaban Benar)*
   - D) Modules (Procedure/Function)
   *Penjelasan: GUI Layout adalah komponen tampilan antarmuka visual, bukan bagian dari notasi logika pseudocode.*

2. Algoritma pencarian rute terpendek pada router internet umumnya menggunakan metode:
   - A) Insertion Sort
   - B) Shortest Path (Dijkstra / Bellman-Ford) *(Jawaban Benar)*
   - C) Linear Programming untuk Genom
   - D) Bubble Sort
   *Penjelasan: Router jaringan mengukur jarak dan latensi antar node menggunakan algoritma shortest path.*

---

## 10. Ringkasan & Buku Referensi

### Ringkasan Poin Kunci
1. Algoritma adalah urutan langkah komputasi terdefinisi yang mengubah input menjadi output yang benar.
2. Pengurutan data dan alokasi sumber daya adalah masalah algoritma fundamental dengan dampak praktis luas.
3. Algoritma adalah sebuah teknologi; efisiensi algoritma menentukan batas kemampuan sistem perangkat keras.

### Buku Referensi
1. Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). The MIT Press. (Bab 1: *The Role of Algorithms in Computing*).
2. Sridhar, S. (2015). *Design and Analysis of Algorithms* (1st ed.). Oxford University Press. (Bab 1: *Introduction*).
