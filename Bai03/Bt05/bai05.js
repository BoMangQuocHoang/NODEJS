const { MongoClient } = require('mongodb');

// URL kết nối tới MongoDB đang chạy trên máy
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

const dbName = 'qlsinhvien';
const collectionName = 'students';

async function main() {
  try {
    // 1. Kết nối MongoDB
    await client.connect();
    console.log("Kết nối thành công đến MongoDB server!");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // 2. Tìm các sinh viên có điểm >= 7 bằng find() và $gte, sắp xếp giảm dần theo điểm bằng sort()
    console.log("\n--- Danh sách sinh viên có điểm >= 7 (sắp xếp điểm giảm dần) ---");
    const svDiemCao = await collection.find({ diem: { $gte: 7 } }).sort({ diem: -1 }).toArray();
    svDiemCao.forEach((sv, index) => {
      console.log(`${index + 1}. Mã SV: ${sv.masv} | Họ tên: ${sv.hoten} | Tuổi: ${sv.tuoi} | Điểm: ${sv.diem}`);
    });

    // 3. Cập nhật điểm của một sinh viên theo masv bằng updateOne() và $set (Cập nhật SV003 thành 9.5)
    const masvCanSua = 'SV003';
    const diemMoi = 10;
    const updateResult = await collection.updateOne(
      { masv: masvCanSua },
      { $set: { diem: diemMoi } }
    );
    console.log(`\nĐã cập nhật điểm cho sinh viên có mã ${masvCanSua} thành ${diemMoi} (Số lượng sửa: ${updateResult.modifiedCount}).`);

    // 4. Hiển thị lại toàn bộ thông tin sau cập nhật để kiểm tra kết quả
    console.log("\n--- Danh sách sinh viên sau khi cập nhật ---");
    const tatCaSv = await collection.find({}).toArray();
    tatCaSv.forEach((sv, index) => {
      console.log(`${index + 1}. Mã SV: ${sv.masv} | Họ tên: ${sv.hoten} | Tuổi: ${sv.tuoi} | Điểm: ${sv.diem}`);
    });

  } catch (err) {
    console.error("Đã xảy ra lỗi:", err);
  } finally {
    // Đóng kết nối
    await client.close();
    console.log("\nĐóng kết nối MongoDB thành công.");
  }
}

main();