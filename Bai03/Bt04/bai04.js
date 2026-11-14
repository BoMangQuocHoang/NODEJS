const { MongoClient } = require('mongodb');

// URL kết nối tới MongoDB đang chạy trên máy (mặc định là cổng 27017)
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Tên Database và Collection theo yêu cầu
const dbName = 'qlsinhvien';
const collectionName = 'students';

async function main() {
  try {
    // 1. Kết nối MongoDB đang chạy trên máy
    await client.connect();
    console.log("Kết nối thành công đến MongoDB server!");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // 2. Thêm ít nhất 3 sinh viên bằng insertMany()
    // Mỗi sinh viên gồm: masv, hoten, tuoi, diem
    const danhSachSinhVien = [
      { masv: 'SV001', hoten: 'Cao Văn Thượng', tuoi: 20, diem: 8.5 },
      { masv: 'SV002', hoten: 'Cao Bảo Đại', tuoi: 21, diem: 9.0 },
      { masv: 'SV003', hoten: 'Lê Văn Cường', tuoi: 22, diem: 7.5 }
    ];

    const insertResult = await collection.insertMany(danhSachSinhVien);
    console.log(`Đã thêm thành công ${insertResult.insertedCount} sinh viên.`);

    // 3. Sử dụng find() hiển thị danh sách sinh viên ra Terminal
    console.log("\n--- Danh sách sinh viên trong collection 'students' ---");
    const sinhViens = await collection.find({}).toArray();
    sinhViens.forEach((sv, index) => {
      console.log(`${index + 1}. Mã SV: ${sv.masv} | Họ tên: ${sv.hoten} | Tuổi: ${sv.tuoi} | Điểm: ${sv.diem}`);
    });

  } catch (err) {
    console.error("Đã xảy ra lỗi:", err);
  } finally {
    // 4. Đóng kết nối sau khi hoàn thành
    await client.close();
    console.log("\nĐã đóng kết nối MongoDB.");
  }
}

main();