# Tugas Besar 3 IF2211 Strategi Algoritma: chwatGwiPwiTi

## Deskripsi Singkat Program
chwatGwiPwiTi adalah aplikasi chatbot berbasis web. Aplikasi chatbot ini menawarkan beberapa fitur, di antaranya adalah menjawab pertanyaan pengguna, menghitung ekspresi matematika, menentukan hari dari suatu tanggal, menambahkan pertanyaan, mengganti jawaban pertanyaan, dan menghapus pertanyaan.

## Requirements
- Windows 10 or newer
- Node.js 20 or newer

## Menjalankan Program
### Setup
- Clone repository ini dan install dengan perintah berikut:

```sh
git clone https://github.com/JerichoFletcher/Tubes3_13521042.git
```

- `cd` ke directory repository dan masukkan perintah berikut:

```sh
npm install
```

### Install Font
- Buka salah satu file `.ttf` pada folder `src/resources/font`, lalu klik install.
- Lakukan install pada seluruh file font pada folder tersebut.

### Menjalankan Back-End
- Buka terminal pada directory repository ini, lalu masukkan perintah berikut:

```sh
node server/index.js
```

### Menjalankan Front-End
- Untuk menjalankan _development build_, buka terminal pada directory repository ini, lalu masukkan perintah berikut:

```sh
npm start
```

- Untuk menjalankan _production build_, buka terminal pada directory repository ini, lalu masukkan perintah berikut:

```sh
npm run build
npm install -g serve    # Hanya dijalankan satu kali
serve -s build
```

## Fitur
1. Menjawab pertanyaan
   <br/>Masukkan pertanyaan pada kotak pesan, lalu kirim.
2. Menghitung ekspresi matematika
   <br/>Masukkan ekspresi matematika dengan operator tambah (`+`), kurang (`-`), kali (`*`), bagi (`/`), atau pangkat (`^`) pada kotak pesan, lalu kirim. 
3. Menentukan hari dari suatu tanggal
   <br/>Masukkan tanggal dengan format `dd/mm/yyyy` pada kotak pesan, lalu kirim.
4. Menambahkan pertanyaan
   <br/>Masukkan `Tambah pertanyaan <pertanyaan> dengan jawaban <jawaban>` pada kotak pesan, lalu kirim.
   <br/>Masukkan `Add question <question> with answer <answer>` pada kotak pesan, lalu kirim.
5. Mengganti jawaban pertanyaan
   <br/>Masukkan `Tambah pertanyaan <pertanyaan_di_database> dengan jawaban <jawaban_baru>` pada kotak pesan, lalu kirim.
   <br/>Masukkan `Add question <existed_question> with answer <new_answer>` pada kotak pesan, lalu kirim.
6. Menghapus pertanyaan
   <br/>Masukkan `Hapus pertanyaan <pertanyaan>` pada kotak pesan, lalu kirim.
   <br/>Masukkan `Delete question <question>` pada kotak pesan, lalu kirim.

## Tampilan Program
![image](https://user-images.githubusercontent.com/89202471/236498645-3d91b4c0-9335-4f50-80ba-d961f5878e6f.png)
![gif](https://user-images.githubusercontent.com/62737325/236519794-a5d7f826-7782-45a1-b110-1298e58079e2.gif)

## Credits
| NIM      | Nama                       |
| -------- | ---------------------------|
| 13521042 | Kevin John Wesley          |
| 13521059 | Arleen Chrysantha Gunardi  |
| 13521107 | Jericho Russel Sebastian   |


