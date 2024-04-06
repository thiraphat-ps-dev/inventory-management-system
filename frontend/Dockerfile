# ใช้งาน Node.js เป็น base image
FROM node:latest

# กำหนด directory ทำงานใน container
WORKDIR /app

# Copy package.json และ package-lock.json ไปยัง container
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# Copy ไฟล์ทั้งหมดจาก directory ปัจจุบันไปยัง container
COPY . .

# Expose port ให้ frontend สามารถเข้าถึงได้
EXPOSE 3000

# เริ่มต้น server ของ frontend
CMD ["npm", "start"]
