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
