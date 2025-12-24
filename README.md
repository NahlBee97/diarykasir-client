Diary Kasir 🍗

Diary Kasir is a specialized, web-based Point of Sale (POS) application designed for fast-paced fried chicken businesses. It features a high-contrast Black & White aesthetic optimized for clarity and speed, including native support for thermal receipt printing.

🚀 Tech Stack

Frontend: React + TypeScript (Vite)

Styling: Tailwind CSS (Custom "Monochrome" Config)

Database: PostgreSQL

ORM: Prisma

Printing: Native Browser Print API (58mm/80mm Thermal support)

✨ Key Features

🛒 Cashier Station (POS)

Fast Order Entry: Touch-friendly grid layout for Chicken, Sides, and Drinks.

Real-time Inventory: Prevents selling out-of-stock items automatically.

Thermal Printing: Formatted receipts generated directly from the browser (No plugins required).

Payment Handling: Auto-calculation of change and totals.

📊 Admin Dashboard

Inventory Management: Live stock tracking, restocking, and price adjustments.

Sales Reports: Daily revenue breakdown and transaction history.

User Management: Register new cashiers with PIN access.

Secure Access: PIN-protected admin routes.

🛠️ Getting Started

Prerequisites

Node.js (v18+)

PostgreSQL Database URL

Installation

Clone the repository

git clone [https://github.com/yourusername/diary-kasir.git](https://github.com/yourusername/diary-kasir.git)
cd diary-kasir



Install dependencies

npm install



Environment Setup
Create a .env file in the root directory:

DATABASE_URL="postgresql://user:password@localhost:5432/diary_kasir?schema=public"



Database Setup (Prisma)
Run the migrations to create your tables (products, orders, users):

npx prisma migrate dev --name init
npx prisma generate



Run the Development Server

npm run dev



🖨️ Printing Receipts

This app uses a CSS-based print strategy. To test without a physical thermal printer:

Click "Pay & Print" in the app.

In the Chrome Print Dialog:

Printer: Save as PDF (or select your printer).

Paper Size: 58mm (or A4 with "None" margins for testing).

Margins: Set to None or Minimum.

Headers/Footers: Uncheck (to remove URL/Date).

📂 Project Structure

src/
├── components/        # Reusable UI components (Buttons, Inputs)
├── pages/
│   ├── pos/          # The main Cashier Interface
│   ├── admin/        # Dashboard, Inventory, Reports
│   └── auth/         # Login Screens
├── lib/
│   └── prisma.ts     # Database client instance
└── styles/           # Tailwind and global CSS



📜 License

This project is licensed under the MIT License.