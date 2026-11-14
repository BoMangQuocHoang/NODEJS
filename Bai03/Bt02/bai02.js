const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    const style = `
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
                min-height: 100vh;
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
            }
            .card {
                background: #ffffff;
                padding: 35px 40px;
                border-radius: 20px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                max-width: 550px;
                width: 100%;
            }
            .header-box {
                text-align: center;
                border-bottom: 2px solid #f0f2f5;
                padding-bottom: 20px;
                margin-bottom: 20px;
            }
            .icon { font-size: 35px; margin-bottom: 5px; }
            h1 {
                color: #1a56db;
                font-size: 24px;
                font-weight: 800;
                margin: 5px 0;
            }
            .subtitle {
                color: #6b7280;
                font-size: 13px;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: 600;
            }
            /* Phần chia bố cục khoa học */
            .section-title {
                font-size: 14px;
                color: #374151;
                font-weight: 700;
                text-transform: uppercase;
                margin-bottom: 10px;
                letter-spacing: 0.5px;
            }
            .info-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
                margin-bottom: 20px;
            }
            .info-item {
                background: #f9fafb;
                padding: 10px 15px;
                border-radius: 8px;
                border-left: 4px solid #2563eb;
            }
            .info-item label {
                display: block;
                font-size: 11px;
                color: #6b7280;
                text-transform: uppercase;
                font-weight: 600;
            }
            .info-item span {
                font-size: 14px;
                color: #1f2937;
                font-weight: 600;
            }
            .skills-box {
                background: #f0fdf4;
                border: 1px solid #bbf7d0;
                padding: 12px 15px;
                border-radius: 8px;
                margin-bottom: 20px;
            }
            .skills-box span {
                display: inline-block;
                background: #dcfce7;
                color: #166534;
                padding: 4px 10px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                margin: 3px;
            }
            .status-badge {
                background: #d1fae5;
                color: #065f46;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: 700;
                font-size: 13px;
                display: inline-block;
            }
            .footer-action {
                text-align: center;
                margin-top: 25px;
            }
            a {
                text-decoration: none;
                background: #2563eb;
                color: white;
                padding: 10px 24px;
                border-radius: 8px;
                font-weight: 600;
                font-size: 14px;
                transition: background 0.3s;
                display: inline-block;
            }
            a:hover { background: #1d4ed8; }
        </style>
    `;

    if (req.url === '/') {
        res.writeHead(200);
        res.end(`
            <!DOCTYPE html>
            <html lang="vi">
            <head><title>Trang Chủ - NodeJS</title>${style}</head>
            <body>
                <div class="card" style="text-align: center;">
                    <div class="icon">🚀</div>
                    <h1>WELCOME TO<br>NODE.JS</h1>
                    <div class="subtitle" style="margin-bottom: 15px;">Bài thực hành số 02</div>
                    <div style="font-size: 18px; font-weight: 700; color: #1e3a8a; margin-bottom: 10px;">BO MANG QUỐC HOÀNG</div>
                    <p style="color: #4b5563; font-size: 14px; margin-bottom: 20px;">Chào mừng đến với HTTP Server Node.js.</p>
                    <div><span class="status-badge">● SERVER ĐANG HOẠT ĐỘNG</span></div>
                    <div style="color: #6b7280; font-size: 12px; margin-top: 10px;">Địa chỉ: localhost:3000</div>
                    <div class="footer-action">
                        <a href="/about">Xem giới thiệu bản thân</a>
                    </div>
                </div>
            </body>
            </html>
        `);
    } 
    else if (req.url === '/about') {
        res.writeHead(200);
        res.end(`
            <!DOCTYPE html>
            <html lang="vi">
            <head><title>Giới thiệu - NodeJS</title>${style}</head>
            <body>
                <div class="card">
                    <div class="header-box">
                        <div class="icon">👤</div>
                        <h1>HỒ SƠ SINH VIÊN</h1>
                        <div class="subtitle">Thông tin chi tiết bản thân</div>
                    </div>

                    <!-- Khối thông tin cá nhân dạng lưới khoa học -->
                    <div class="section-title">📋 Thông tin cá nhân</div>
                    <div class="info-grid">
                        <div class="info-item">
                            <label>Họ và tên</label>
                            <span>Bo Mang Quốc Hoàng</span>
                        </div>
                        <div class="info-item">
                            <label>Mã sinh viên</label>
                            <span>CD-CNTT18B13</span>
                        </div>
                        <div class="info-item">
                            <label>Lớp học</label>
                            <span>CD-CNTT18B</span>
                        </div>
                        <div class="info-item">
                            <label>Học phần</label>
                            <span>NodeJS</span>
                        </div>
                    </div>

                    <!-- Khối kỹ năng -->
                    <div class="section-title">⚡ Kỹ năng & Công nghệ</div>
                    <div class="skills-box">
                        <span>JavaScript</span>
                        <span>Node.js</span>
                        <span>HTML5 / CSS3</span>
                        <span>GitHub</span>
                    </div>

                    <!-- Trạng thái tuyến đường -->
                    <div style="text-align: center;">
                        <span class="status-badge" style="background: #e0f2fe; color: #0369a1;">📍 Đang xem: /about</span>
                    </div>

                    <div class="footer-action">
                        <a href="/">← Quay lại trang chủ</a>
                    </div>
                </div>
            </body>
            </html>
        `);
    } 
    else {
        res.writeHead(404);
        res.end(`
            <!DOCTYPE html>
            <html lang="vi">
            <head><title>404 Not Found</title>${style}</head>
            <body>
                <div class="card" style="text-align: center;">
                    <div class="icon">⚠️</div>
                    <h1 style="color: #dc2626;">404 NOT FOUND</h1>
                    <div class="subtitle" style="margin-bottom: 15px;">Lỗi đường dẫn</div>
                    <p style="color: #4b5563; font-size: 14px; margin-bottom: 20px;">Đường dẫn bạn truy cập không tồn tại trên hệ thống!</p>
                    <div><span class="status-badge" style="background: #fee2e2; color: #991b1b;">● LỖI TRUY CẬP</span></div>
                    <div class="footer-action">
                        <a href="/" style="background: #dc2626;">Về trang chủ</a>
                    </div>
                </div>
            </body>
            </html>
        `);
    }
});

server.listen(3000, () => {
    console.log('Server đang chạy tại http://localhost:3000');
});