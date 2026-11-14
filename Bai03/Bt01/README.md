# Bài 1: Quản lý thông tin sinh viên bằng JavaScript ES6 (`Bt01`)

## 📋 1. Mô tả yêu cầu bài thực hành
- Khai báo danh sách gồm **5 sinh viên**, mỗi sinh viên bao gồm các thuộc tính: mã sinh viên, họ tên, tuổi và điểm[cite: 10].
- Sử dụng **`class`** và **`constructor`** trong JavaScript ES6 để biểu diễn đối tượng sinh viên[cite: 10].
- Sử dụng hàm mũi tên (**arrow function**) kết hợp phương thức `.filter()` để lọc danh sách sinh viên đạt mức điểm từ `5.0` trở lên[cite: 10].
- Hiển thị danh sách sinh viên đạt yêu cầu ra màn hình Terminal bằng câu lệnh **`console.log()`**[cite: 10].

---

## ⚙️ 2. Các lệnh thực hiện

Mở Terminal tại thư mục gốc của dự án, sau đó thực hiện lần lượt các lệnh sau để di chuyển đến thư mục bài tập và chạy chương trình Node.js[cite: 12]:

\`\`\`bash
cd Bai03/Bt01
node bai01.js
\`\`\`

---

## 💻 3. Mã nguồn `bai01.js`

\`\`\`javascript
// Khai báo lớp (class) Student để biểu diễn sinh viên
class Student {
    constructor(id, name, age, score) {
        this.id = id;       // Mã sinh viên
        this.name = name;   // Họ tên
        this.age = age;     // Tuổi
        this.score = score; // Điểm
    }
}

// Khai báo danh sách 5 sinh viên
const students = [
    new Student("SV001", "Nguyễn Thanh Tùng", 20, 4.5),
    new Student("SV002", "Trần Bích Thủy", 21, 5.0),
    new Student("SV003", "Lê Văn Tài", 22, 6.5),
    new Student("SV004", "Phạm Thị Bích", 20, 7.5),
    new Student("SV005", "Hoàng Văn Cung", 23, 9.0)
];

// Sử dụng hàm mũi tên (arrow function) để lọc sinh viên có điểm từ 5 trở lên
const filterPassedStudents = (list) => list.filter(student => student.score >= 5);

// Lấy danh sách sinh viên đạt yêu cầu
const passedStudents = filterPassedStudents(students);

// Hiển thị tiêu đề và danh sách sinh viên theo đúng định dạng bằng console.log()
console.log("Danh sách sinh viên có điểm từ 5.0 trở lên:");
console.log("Mã SV | Họ tên             | Tuổi | Điểm");
console.log("-----------------------------------------");

passedStudents.forEach(student => {
    console.log(\`\${student.id}   | \${student.name.padEnd(16, ' ')} | \${student.age}   | \${student.score}\`);
});
\`\`\`

---

<img width="381" height="219" alt="ket qua bai03-p1" src="https://github.com/user-attachments/assets/d340702c-eb61-4f80-b85a-f5a86bfc89bb" />

