# Sử dụng image Node.js chính thức để làm môi trường xây dựng
FROM node:16-alpine

# Đặt thư mục làm việc trong container
WORKDIR /src

# Sao chép file package.json và package-lock.json (nếu có) vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Xây dựng ứng dụng ReactJS
RUN npm run build

# Cài đặt một server đơn giản để phục vụ ứng dụng ReactJS
RUN npm install -g serve

# Chạy server để phục vụ ứng dụng ReactJS
CMD ["serve", "-s", "build"]

# Expose cổng mà server sẽ chạy trên đó
EXPOSE 3000