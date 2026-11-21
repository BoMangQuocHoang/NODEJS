# BÀI 10: LIÊN KẾT HAI COLLECTION TRONG MONGODB

## 1. Mục tiêu bài tập

- Kết nối ứng dụng Node.js với cơ sở dữ liệu MongoDB (`mongodb://127.0.0.1:27017`), sử dụng Database riêng biệt **`qlsinhvien_bt10`**.
- Tạo collection `departments` (khoa) gồm ít nhất 2 khoa, mỗi khoa có các thuộc tính: `makhoa`, `tenkhoa`.
- Tạo collection `students_join` (sinh viên) gồm ít nhất 4 sinh viên, mỗi sinh viên có các trường: `masv`, `hoten`, `makhoa`.
- Sử dụng phương thức `aggregate()` kết hợp toán tử `$lookup` để thực hiện phép nối (JOIN) giữa hai collection thông qua trường liên kết `makhoa`.
- Định dạng và chuẩn hóa dữ liệu bằng `$unwind` và `$project` để kết quả hiển thị không chỉ có mã khoa (`makhoa`) mà còn có đầy đủ tên khoa (`tenkhoa`) tương ứng.

---

## 2. Các lệnh thực hiện

### Bước 1: Di chuyển vào thư mục bài tập

```bash
cd Bt10
```

### Bước 2: Cài đặt thư viện MongoDB Driver (độc lập trong thư mục Bt10)

```bash
npm install mongodb
```

### Bước 3: Chạy chương trình

```bash
node bai10.js
```

### Kết quả hiển thị trên Terminal:

```text
=== BÀI 10: LIÊN KẾT HAI COLLECTION TRONG MONGODB ($lookup) ===
Đang sử dụng Database riêng: 'qlsinhvien_bt10'
Kết nối thành công đến MongoDB server!

[Bước 1] Đã thêm 3 khoa vào collection 'departments'.
[Bước 2] Đã thêm 4 sinh viên vào collection 'students_join'.

[Bước 3] Thực hiện aggregate() với $lookup để liên kết 2 collections...

=== KẾT QUẢ DANH SÁCH SINH VIÊN KÈM TÊN KHOA SAU KHI LIÊN KẾT ===
----------------------------------------------------------------------------------
1. Mã SV: SV101 | Họ tên: Bo Mang Quốc Hoàng   | Mã khoa: CNTT   | Tên khoa: Công nghệ thông tin
2. Mã SV: SV102 | Họ tên: Nguyễn Văn An        | Mã khoa: CNTT   | Tên khoa: Công nghệ thông tin
3. Mã SV: SV103 | Họ tên: Trần Thị Mai         | Mã khoa: QTKD   | Tên khoa: Quản trị kinh doanh
4. Mã SV: SV104 | Họ tên: Lê Minh Tuấn         | Mã khoa: KT     | Tên khoa: Kế toán - Tài chính
----------------------------------------------------------------------------------

Hiển thị dạng bảng (console.table):
┌─────────┬─────────┬──────────────────────┬────────┬───────────────────────┐
│ (index) │ masv    │ hoten                │ makhoa │ tenkhoa               │
├─────────┼─────────┼──────────────────────┼────────┼───────────────────────┤
│ 0       │ 'SV101' │ 'Bo Mang Quốc Hoàng' │ 'CNTT' │ 'Công nghệ thông tin' │
│ 1       │ 'SV102' │ 'Nguyễn Văn An'      │ 'CNTT' │ 'Công nghệ thông tin' │
│ 2       │ 'SV103' │ 'Trần Thị Mai'       │ 'QTKD' │ 'Quản trị kinh doanh' │
│ 3       │ 'SV104' │ 'Lê Minh Tuấn'       │ 'KT'   │ 'Kế toán - Tài chính' │
└─────────┴─────────┴──────────────────────┴────────┴───────────────────────┘

Đã đóng kết nối MongoDB.
```

---

## 3. Mã nguồn chương trình (`bai10.js`)

```javascript
const { MongoClient } = require('mongodb');

// URL kết nối tới MongoDB đang chạy cục bộ
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database riêng biệt cho Bài tập 10
const dbName = 'qlsinhvien_bt10';

async function main() {
  try {
    // 1. Kết nối đến MongoDB server
    await client.connect();
    console.log("=== BÀI 10: LIÊN KẾT HAI COLLECTION TRONG MONGODB ($lookup) ===");
    console.log(`Đang sử dụng Database riêng: '${dbName}'`);
    console.log("Kết nối thành công đến MongoDB server!");

    const db = client.db(dbName);
    const departmentsCol = db.collection('departments');
    const studentsJoinCol = db.collection('students_join');

    // 2. Làm mới và khởi tạo dữ liệu cho collection 'departments' (ít nhất 2 khoa)
    await departmentsCol.deleteMany({});
    const danhSachKhoa = [
      { makhoa: 'CNTT', tenkhoa: 'Công nghệ thông tin' },
      { makhoa: 'QTKD', tenkhoa: 'Quản trị kinh doanh' },
      { makhoa: 'KT',   tenkhoa: 'Kế toán - Tài chính' }
    ];
    await departmentsCol.insertMany(danhSachKhoa);
    console.log(`\n[Bước 1] Đã thêm ${danhSachKhoa.length} khoa vào collection 'departments'.`);

    // 3. Làm mới và khởi tạo dữ liệu cho collection 'students_join' (ít nhất 4 sinh viên)
    await studentsJoinCol.deleteMany({});
    const danhSachSinhVien = [
      { masv: 'SV101', hoten: 'Bo Mang Quốc Hoàng', makhoa: 'CNTT' },
      { masv: 'SV102', hoten: 'Nguyễn Văn An',      makhoa: 'CNTT' },
      { masv: 'SV103', hoten: 'Trần Thị Mai',       makhoa: 'QTKD' },
      { masv: 'SV104', hoten: 'Lê Minh Tuấn',       makhoa: 'KT' }
    ];
    await studentsJoinCol.insertMany(danhSachSinhVien);
    console.log(`[Bước 2] Đã thêm ${danhSachSinhVien.length} sinh viên vào collection 'students_join'.`);

    // 4. Sử dụng aggregate() kết hợp $lookup để liên kết sinh viên với khoa theo makhoa
    console.log("\n[Bước 3] Thực hiện aggregate() với $lookup để liên kết 2 collections...");
    const pipeline = [
      {
        $lookup: {
          from: 'departments',         // Collection cần liên kết đến
          localField: 'makhoa',        // Khóa ngoại trong collection 'students_join'
          foreignField: 'makhoa',       // Khóa chính trong collection 'departments'
          as: 'khoa_info'              // Tên trường chứa mảng kết quả liên kết
        }
      },
      {
        $unwind: {
          path: '$khoa_info',          // Phẳng hóa mảng khoa_info thành object
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 0,
          masv: 1,
          hoten: 1,
          makhoa: 1,
          tenkhoa: { $ifNull: ['$khoa_info.tenkhoa', 'Chưa có thông tin khoa'] }
        }
      }
    ];

    const ketQuaJoin = await studentsJoinCol.aggregate(pipeline).toArray();

    // 5. Hiển thị danh sách sinh viên kèm tên khoa tương ứng
    console.log("\n=== KẾT QUẢ DANH SÁCH SINH VIÊN KÈM TÊN KHOA SAU KHI LIÊN KẾT ===");
    console.log("----------------------------------------------------------------------------------");
    ketQuaJoin.forEach((item, index) => {
      console.log(
        `${index + 1}. Mã SV: ${item.masv} | Họ tên: ${item.hoten.padEnd(20)} | Mã khoa: ${item.makhoa.padEnd(6)} | Tên khoa: ${item.tenkhoa}`
      );
    });
    console.log("----------------------------------------------------------------------------------");

    console.log("\nHiển thị dạng bảng (console.table):");
    console.table(ketQuaJoin);

  } catch (err) {
    console.error("Đã xảy ra lỗi:", err);
  } finally {
    // 6. Đóng kết nối an toàn
    await client.close();
    console.log("\nĐã đóng kết nối MongoDB.");
  }
}

main();
```

---

## 4. Hình ảnh thực hiện

### Hình 1: Mã nguồn chương trình `bai10.js`

![Mã nguồn](images/code.png)

---

### Hình 2: Kết quả chạy chương trình trên Terminal

![Kết quả Terminal](images/ketqua.png)

---

### Hình 3: Kiểm tra Database `qlsinhvien_bt10` trên MongoDB Compass

![Kết quả MongoDB Compass](images/compass.png)

---

## 5. Kết quả đạt được

- **Cơ sở dữ liệu và gói thư viện độc lập:** Khởi tạo Database riêng `qlsinhvien_bt10` cùng bộ quản lý gói `package.json`, `node_modules` riêng biệt trong thư mục `Bt10`.
- **Phép nối dữ liệu đa bảng (`$lookup`):** Thực hiện thành công kỹ thuật tương đương `LEFT OUTER JOIN` trong SQL thông qua toán tử `$lookup` của MongoDB Aggregation Framework.
- **Biến đổi dữ liệu (`$unwind`, `$project`):** Sử dụng `$unwind` để giải nén mảng kết quả và `$project` để chỉ chọn lọc những trường cần thiết (`masv`, `hoten`, `makhoa`, `tenkhoa`).
- **Hiển thị trực quan:** Xuất dữ liệu đồng thời dưới dạng danh sách chi tiết và dạng bảng `console.table()` giúp đối soát thông tin sinh viên và khoa dễ dàng.

---

## 6. Kết luận

Qua bài thực hành, em đã:
1. Nắm vững phương pháp thiết kế quan hệ liên kết dữ liệu giữa các Collection trong cơ sở dữ liệu phi quan hệ MongoDB (NoSQL).
2. Hiểu rõ cú pháp và các giai đoạn (pipeline stages) trong `aggregate()`: `$lookup`, `$unwind`, `$project`.
3. Biết cách tổ chức module và dependency độc lập cho từng bài tập, dễ dàng triển khai và nộp bài riêng rẽ.
