const fs = require('fs');
const fileName = 'thongtin.txt';

// 1. Tạo tập tin thongtin.txt chứa họ tên và mã sinh viên
const initialContent = "Họ và tên: Bo Mang Quốc Hoàng\nMã sinh viên: CD-CNTT18B13\n";

fs.writeFile(fileName, initialContent, 'utf8', (err) => {
    if (err) throw err;

    // 2. Đọc và hiển thị nội dung tập tin ban đầu
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) throw err;
        console.log("=== Nội dung tập tin ban đầu ===");
        console.log(data.trim());

        // 3. Ghi nối thêm tên lớp vào cuối tập tin bằng appendFile()
        const appendContent = "Lớp: CD-CNTT18B\n";
        
        fs.appendFile(fileName, appendContent, 'utf8', (err) => {
            if (err) throw err;

            // 4. Đọc lại tập tin để hiển thị nội dung sau khi cập nhật
            fs.readFile(fileName, 'utf8', (err, updatedData) => {
                if (err) throw err;
                console.log("\n=== Nội dung tập tin sau khi cập nhật ===");
                console.log(updatedData.trim());
            });
        });
    });
});