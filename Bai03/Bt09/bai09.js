const { MongoClient } = require('mongodb');

// URL kết nối tới MongoDB đang chạy cục bộ
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database riêng biệt cho Bài tập 09
const dbName = 'qlsinhvien_bt09';
const collectionName = 'students_test';

async function main() {
  try {
    // 1. Kết nối đến MongoDB server
    await client.connect();
    console.log("=== BÀI 9: XÓA DỮ LIỆU CÓ ĐIỀU KIỆN TRONG MONGODB ===");
    console.log(`Đang sử dụng Database riêng: '${dbName}'`);
    console.log("Kết nối thành công đến MongoDB server!");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Làm mới collection trước khi thực hiện để đảm bảo bài tập chạy lặp lại chính xác
    await collection.deleteMany({});

    // 2. Thêm ít nhất 5 sinh viên mẫu gồm masv, hoten, tuoi, diem
    const danhSachSinhVien = [
      { masv: 'SV001', hoten: 'Nguyễn Văn An', tuoi: 20, diem: 8.5 },
      { masv: 'SV002', hoten: 'Trần Thị Bình', tuoi: 21, diem: 4.0 },  // Điểm < 5
      { masv: 'SV003', hoten: 'Lê Hoàng Cường', tuoi: 19, diem: 9.0 }, // Mục tiêu xóa deleteOne
      { masv: 'SV004', hoten: 'Phạm Thị Dung', tuoi: 22, diem: 3.5 },  // Điểm < 5
      { masv: 'SV005', hoten: 'Võ Minh Em', tuoi: 20, diem: 7.2 },
      { masv: 'SV006', hoten: 'Đặng Quốc Huy', tuoi: 21, diem: 4.8 }   // Điểm < 5
    ];

    const insertResult = await collection.insertMany(danhSachSinhVien);
    console.log(`\n[Bước 1] Đã thêm thành công ${insertResult.insertedCount} sinh viên mẫu vào collection '${collectionName}'.`);

    console.log("\n--- Danh sách sinh viên ban đầu ---");
    const svBanDau = await collection.find({}).toArray();
    svBanDau.forEach((sv, idx) => {
      console.log(`${idx + 1}. Mã SV: ${sv.masv} | Họ tên: ${sv.hoten.padEnd(16)} | Tuổi: ${sv.tuoi} | Điểm: ${sv.diem}`);
    });

    // 3. Dùng deleteOne() xóa một sinh viên theo mã sinh viên (Ví dụ: SV003)
    const masvXoa = 'SV003';
    const deleteOneResult = await collection.deleteOne({ masv: masvXoa });
    console.log(`\n[Bước 2] Thực hiện deleteOne() xóa sinh viên có mã '${masvXoa}':`);
    console.log(`-> Số bản ghi đã xóa thành công: ${deleteOneResult.deletedCount}`);

    // 4. Dùng deleteMany() xóa các sinh viên có điểm dưới 5 (diem < 5)
    const deleteManyResult = await collection.deleteMany({ diem: { $lt: 5 } });
    console.log(`\n[Bước 3] Thực hiện deleteMany() xóa các sinh viên có điểm < 5:`);
    console.log(`-> Số bản ghi đã xóa thành công: ${deleteManyResult.deletedCount}`);

    // 5. Hiển thị danh sách sinh viên còn lại bằng find()
    console.log("\n[Bước 4] Danh sách sinh viên còn lại trong collection sau khi xóa:");
    console.log("---------------------------------------------------------------------");
    const svConLai = await collection.find({}).toArray();

    if (svConLai.length === 0) {
      console.log("Không còn sinh viên nào trong danh sách.");
    } else {
      svConLai.forEach((sv, idx) => {
        console.log(`${idx + 1}. Mã SV: ${sv.masv} | Họ tên: ${sv.hoten.padEnd(16)} | Tuổi: ${sv.tuoi} | Điểm: ${sv.diem}`);
      });
    }
    console.log("---------------------------------------------------------------------");
    console.log(`Tổng số sinh viên còn lại: ${svConLai.length}`);

  } catch (err) {
    console.error("Đã xảy ra lỗi:", err);
  } finally {
    // 6. Đóng kết nối an toàn
    await client.close();
    console.log("\nĐã đóng kết nối MongoDB.");
  }
}

main();
