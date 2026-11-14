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

// Hiển thị tiêu đề và danh sách sinh viên theo đúng định dạng yêu cầu bằng console.log()
console.log("Danh sách sinh viên có điểm từ 5.0 trở lên:");
console.log("Mã SV   | Họ tên           | Tuổi | Điểm");
console.log("-----------------------------------------");

passedStudents.forEach(student => {
    console.log(`${student.id}   | ${student.name.padEnd(16, ' ')} | ${student.age}   | ${student.score}`);
});