const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
const ghichuPath = path.join(dataDir, 'ghichu.txt');
const ghichuMoiPath = path.join(dataDir, 'ghichu_moi.txt');
const tamPath = path.join(dataDir, 'tam.txt');

async function quanLyTapTin() {
  console.log("=== BÀI 8: QUẢN LÝ TẬP TIN VỚI FILE SYSTEM ===\n");

  try {
    // 1. Sử dụng module fs tạo thư mục 'data'
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
      console.log("[Bước 1] Đã tạo thư mục 'data' thành công.");
    } else {
      console.log("[Bước 1] Thư mục 'data' đã tồn tại.");
    }

    // 2. Tạo tập tin ghichu.txt và ghi vào ít nhất 3 dòng nội dung
    const noiDung = [
      "Dòng 1: Bắt đầu học lập trình Backend với Node.js.",
      "Dòng 2: Module fs (File System) hỗ trợ các thao tác đọc, ghi, sửa, xóa file.",
      "Dòng 3: Hoàn thành bài tập số 08 quản lý tập tin an toàn và hiệu quả."
    ].join('\r\n');

    await fs.promises.writeFile(ghichuPath, noiDung, 'utf8');
    console.log("[Bước 2] Đã tạo tập tin 'data/ghichu.txt' và ghi 3 dòng nội dung thành công.");

    // 3. Đổi tên tập tin thành ghichu_moi.txt bằng fs.rename()
    await new Promise((resolve, reject) => {
      fs.rename(ghichuPath, ghichuMoiPath, (err) => {
        if (err) return reject(err);
        console.log("[Bước 3] Đã đổi tên tập tin 'ghichu.txt' -> 'ghichu_moi.txt' thành công bằng fs.rename().");
        resolve();
      });
    });

    // 4. Đọc và hiển thị nội dung sau khi đổi tên
    const noiDungDoc = await fs.promises.readFile(ghichuMoiPath, 'utf8');
    console.log("\n[Bước 4] Đọc nội dung tập tin 'ghichu_moi.txt' sau khi đổi tên:");
    console.log("-------------------- NỘI DUNG TẬP TIN --------------------");
    console.log(noiDungDoc);
    console.log("----------------------------------------------------------\n");

    // 5. Tạo tập tin tam.txt, sau đó xóa bằng fs.unlink()
    await fs.promises.writeFile(tamPath, "Dữ liệu tạm thời sẽ được xóa ngay sau đây...", 'utf8');
    console.log("[Bước 5a] Đã tạo tập tin tạm 'data/tam.txt'.");

    await new Promise((resolve, reject) => {
      fs.unlink(tamPath, (err) => {
        if (err) return reject(err);
        console.log("[Bước 5b] Đã xóa tập tin 'data/tam.txt' thành công bằng fs.unlink().");
        resolve();
      });
    });

    console.log("\n=== TẤT CẢ CÁC THAO TÁC FILE SYSTEM ĐÃ HOÀN THÀNH XUẤT SẮC! ===");
  } catch (error) {
    console.error("Đã xảy ra lỗi:", error.message);
  }
}

quanLyTapTin();
