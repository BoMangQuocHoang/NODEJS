const { tinhDiemTrungBinh, xepLoaiHocTap } = require('./xulyDiem');

// Tạo dữ liệu 3 sinh viên (mỗi sinh viên có họ tên và điểm 3 môn)
const danhSachSinhVien = [
  { hoten: 'Cao Văn Thượng', diem1: 8.5, diem2: 8.0, diem3: 9.0 },
  { hoten: 'Cao Bảo Đại', diem1: 7.0, diem2: 6.5, diem3: 7.5 },
  { hoten: 'Lê Văn Cường', diem1: 4.5, diem2: 5.0, diem3: 4.0 }
];

console.log('--- KẾT QUẢ HỌC TẬP CỦA SINH VIÊN ---');
danhSachSinhVien.forEach((sv, index) => {
  const dtb = tinhDiemTrungBinh(sv.diem1, sv.diem2, sv.diem3);
  const xeploai = xepLoaiHocTap(dtb);
  console.log(
    `${index + 1}. Họ tên: ${sv.hoten} | Điểm TB: ${dtb.toFixed(2)} | Xếp loại: ${xeploai}`
  );
});