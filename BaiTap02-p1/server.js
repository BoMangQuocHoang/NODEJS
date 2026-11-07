
const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
    });

    res.end(`
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bài tập 02 - Node.js</title>
            <style>
                body {
                    font-family: Arial;
                    background: linear-gradient(135deg, #0f172a, #2563eb);
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0;
                }

                .card {
                    background: white;
                    padding: 40px;
                    border-radius: 20px;
                    text-align: center;
                    width: 400px;
                    box-shadow: 0 10px 30px #0005;
                }

                h1 { color: #2563eb; }
                h2 { color: #1e40af; }
                p { color: #475569; line-height: 1.8; }

                .status {
                    background: #dcfce7;
                    color: #15803d;
                    padding: 10px;
                    border-radius: 20px;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>🚀 WELCOME TO NODE.JS</h1>
                <p>BÀI THỰC HÀNH SỐ 02</p>
                <h2>BO MANG QUỐC HOÀNG</h2>
                <p>Chào mừng đến với HTTP Server Node.js.</p>
                <p class="status">● SERVER ĐANG HOẠT ĐỘNG</p>
                <p>Địa chỉ: localhost:3000</p>
            </div>
        </body>
        </html>
    `);
});

server.listen(3000, () => {
    console.log("Server dang chay tai http://localhost:3000");
});
