const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = 3001;
const cssPath = path.join(__dirname, 'style.css');

function renderPage({ title, heading, message, status = 'success', hint = '' }) {
  const isError = status === 'error';
  const badgeText = isError ? 'LỖI THAM SỐ' : 'KẾT QUẢ HỢP LỆ';

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
  <div class="card ${isError ? 'error' : ''}">
    <span class="badge">${badgeText}</span>
    <h1>${heading}</h1>
    <div class="result">${message}</div>
    ${hint ? `<div class="hint">${hint}</div>` : ''}
  </div>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = parsedUrl.pathname;
  const searchParams = parsedUrl.searchParams;

  // Phục vụ tệp CSS khi trình duyệt yêu cầu
  if (pathname === '/style.css') {
    fs.readFile(cssPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Không tìm thấy tệp style.css');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

  if (pathname === '/hello') {
    const name = searchParams.get('name');
    if (!name || name.trim() === '') {
      res.end(
        renderPage({
          title: 'Lỗi - /hello',
          heading: 'Yêu cầu /hello',
          message: 'Thiếu tham số name hoặc giá trị không hợp lệ.',
          status: 'error',
          hint: 'Ví dụ đúng: <code>/hello?name=Minh</code>'
        })
      );
      return;
    }

    res.end(
      renderPage({
        title: 'Lời chào',
        heading: 'Thông báo từ Web Server',
        message: `Xin chào ${name}`,
        status: 'success',
        hint: `Đường dẫn đang truy cập: <code>/hello?name=${encodeURIComponent(name)}</code>`
      })
    );
  } else if (pathname === '/sum') {
    const aRaw = searchParams.get('a');
    const bRaw = searchParams.get('b');

    if (aRaw === null || bRaw === null || aRaw.trim() === '' || bRaw.trim() === '') {
      res.end(
        renderPage({
          title: 'Lỗi - /sum',
          heading: 'Yêu cầu /sum',
          message: 'Thiếu tham số a hoặc b.',
          status: 'error',
          hint: 'Ví dụ đúng: <code>/sum?a=10&b=20</code>'
        })
      );
      return;
    }

    const a = Number(aRaw);
    const b = Number(bRaw);

    if (Number.isNaN(a) || Number.isNaN(b)) {
      res.end(
        renderPage({
          title: 'Lỗi - /sum',
          heading: 'Yêu cầu /sum',
          message: 'Giá trị tham số a hoặc b không hợp lệ.',
          status: 'error',
          hint: 'Cả <code>a</code> và <code>b</code> phải là số hợp lệ, ví dụ: <code>/sum?a=10&b=20</code>'
        })
      );
      return;
    }

    const tong = a + b;
    res.end(
      renderPage({
        title: 'Kết quả phép tính',
        heading: `Tính tổng: ${a} + ${b}`,
        message: `Tổng = ${tong}`,
        status: 'success',
        hint: `Tham số nhận được: <code>a = ${a}</code>, <code>b = ${b}</code>`
      })
    );
  } else {
    res.end(
      renderPage({
        title: 'Không tìm thấy đường dẫn',
        heading: 'Đường dẫn không hợp lệ',
        message: 'Vui lòng kiểm tra lại URL',
        status: 'error',
        hint: 'Thử truy cập <code>/hello?name=Minh</code> hoặc <code>/sum?a=10&b=20</code>'
      })
    );
  }
});

server.listen(PORT, () => {
  console.log(`Web Server đang chạy tại http://localhost:${PORT}`);
});