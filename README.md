# EcoCycle Hub Frontend

EcoCycle Hub Frontend adalah aplikasi web berbasis ReactJS untuk sistem pengelolaan sampah daur ulang. Aplikasi ini mendukung autentikasi JWT, dashboard multi-role, transaksi setoran sampah, manajemen kategori, leaderboard gamification, dan monitoring aktivitas pengguna secara realtime.

Frontend ini terhubung dengan backend REST API berbasis Django REST Framework.

---

# Fitur Utama

- Login dan register menggunakan JWT Authentication
- Dashboard berdasarkan role:
  - Customer
  - Officer
  - Admin
- CRUD kategori sampah
- Pembuatan transaksi setoran sampah
- Verifikasi transaksi menggunakan password
- Reject transaksi
- Leaderboard dan gamification
- Monitoring saldo dan poin
- Pagination
- Search dan sorting
- Protected route berbasis role dan permission
- Auto refresh access token
- Responsive dashboard UI
- Modular scalable architecture

---

# Tech Stack

- ReactJS
- Vite
- React Router DOM
- Axios
- TailwindCSS
- React Icons
- JWT Authentication
- Context API
- Custom Hooks
- Vercel Deployment

---

# Struktur Folder

```text
src/
+-- app/
|   +-- provider/
|   |   +-- routes/
|   |
|   +-- styles/
|
+-- entities/
|   +-- auth/
|   |   +-- api/
|   |   +-- hooks/
|   |   +-- lib/
|   |
|   +-- category/
|   |   +-- api/
|   |   +-- hooks/
|   |
|   +-- dashboard/
|   |   +-- api/
|   |   +-- hooks/
|   |
|   +-- gamification/
|   |   +-- api/
|   |   +-- hooks/
|   |   +-- lib/
|   |
|   +-- leaderboard/
|   |   +-- api/
|   |   +-- hooks/
|   |
|   +-- transaction/
|   |   +-- api/
|   |   +-- hooks/
|   |
|   +-- user/
|       +-- api/
|       +-- hooks/
|
+-- features/
|   +-- auth/
|   |   +-- components/
|   |
|   +-- category/
|   |   +-- components/
|   |
|   +-- dashboard/
|   |   +-- components/
|   |   +-- lib/
|   |
|   +-- transaction/
|   |   +-- components/
|   |   +-- lib/
|   |
|   +-- user/
|       +-- components/
|
+-- pages/
|   +-- dashboard/
|   |   +-- admin/
|   |   +-- customer/
|   |   +-- admin/
|   |
|   +-- login/
|   +-- not-found/
|   +-- register/
|
+-- shared/
|   +-- components/
|   +-- hooks/
|   +-- lib/
|   +-- services/
```

---

# Environment Variables

Buat file `.env` pada root project.

## Local Development

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

## Production

```env
VITE_API_URL=https://your-production-api/api
```

---

# Installation

Clone repository:

```bash
git clone https://github.com/ecocyclehub-capstone-dicoding/react-ecocyclehub.git
```

Masuk ke folder project:

```bash
cd react-ecocyclehub
```

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Frontend akan berjalan di:

```text
http://localhost:5173
```

---

# Build Production

Build project:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Output build berada di folder:

```text
dist/
```

---

# Authentication Flow

Frontend menggunakan JWT Authentication.

## Login

User login menggunakan email dan password:

```text
POST /api/auth/login/
```

Response login menghasilkan:

- access_token
- refresh_token

## Access Token

Access token digunakan untuk seluruh request API.

Authorization header:

```text
Authorization: Bearer <access_token>
```

## Refresh Token

Jika access token expired:

- frontend otomatis memanggil endpoint:

```text
POST /api/auth/refresh/
```

- frontend mendapatkan access token baru
- request sebelumnya otomatis diulang

## Logout

Jika refresh token invalid atau expired:

- token otomatis dihapus
- user redirect ke halaman login

---

# Axios Interceptor

Project menggunakan Axios interceptor untuk:

- Menambahkan Authorization Bearer Token otomatis
- Auto refresh access token
- Queue request ketika refresh token sedang diproses
- Auto logout jika refresh token invalid

Contoh flow:

```text
Request API
    ↓
401 Unauthorized
    ↓
Refresh Token
    ↓
Get New Access Token
    ↓
Retry Previous Request
```

---

# Role System

Frontend mendukung role-based dashboard.

## Customer

- Melihat semua kategori
- Membuat transaksi
- Melihat transaksi sendiri
- Melihat poin dan saldo
- Melihat leaderboard

## Officer

- Melihat dashboard officer
- Melihat semua transaksi
- Melihat semua kategori
- Melihat leaderboard
- Verifikasi transaksi
- Reject transaksi
- Membuat transaksi

## Admin

- Dashboard admin
- CRUD kategori
- CRUD user
- Kelola transaksi
- Kelola leaderboard

---

# Permission Features

| Feature            | Customer | Officer | Admin |
| ------------------ | -------- | ------- | ----- |
| View Categories    | Yes      | Yes     | Yes   |
| Create Transaction | Yes      | Yes     | Yes   |
| Verify Transaction | No       | Yes     | Yes   |
| Reject Transaction | No       | Yes     | Yes   |
| Manage Categories  | No       | No      | Yes   |
| Manage Users       | No       | No      | Yes   |
| View Dashboard     | Yes      | Yes     | Yes   |

---

# Transaction Flow

Status transaksi:

```text
pending
verified
rejected
```

Flow:

```text
pending
  +-- verify --> verified
  +-- reject --> rejected
```

Verifikasi transaksi membutuhkan password user officer/admin.

Endpoint:

```text
POST /api/transactions/:id/verify/
```

Body:

```json
{
  "password": "user-password"
}
```

---

# UI Features

Project memiliki beberapa reusable UI component:

- DashboardLayout
- Sidebar
- Topbar
- Pagination
- SearchBar
- SuccessModal
- VerifyPasswordModal
- TransactionTable
- CategoryTable

---

# Search, Sort, dan Pagination

Frontend mendukung:

## Search

Contoh:

```text
?name=plastik
```

## Sort

Contoh:

```text
?sort_by=price&sort_order=asc
```

## Pagination

Contoh:

```text
?page=1&page_size=10
```

---

# API Integration

Frontend terhubung dengan backend REST API berbasis Django REST Framework.

Endpoint utama:

```text
/api/auth/
/api/categories/
/api/transactions/
/api/dashboard/
/api/users/
/api/gamification/
```

---

# Architecture

Project menggunakan modular scalable architecture.

## Entities

Berisi:

- API service
- hooks
- state management

Contoh:

```text
entities/category/
entities/transaction/
entities/user/
```

## Features

Berisi feature UI berdasarkan domain.

Contoh:

```text
features/dashboard/
features/category/
features/transaction/
```

## Shared

Berisi reusable component dan utility.

Contoh:

```text
shared/api/
shared/components/
shared/hooks/
shared/layouts/
shared/lib/
```

---

# Deployment

Frontend dapat dideploy menggunakan Vercel.

## Build Command

```bash
npm run build
```

## Output Directory

```text
dist
```

## Environment Variables

Tambahkan di Vercel:

```env
VITE_API_URL=https://your-api-url/api
```

---

# Troubleshooting

## Access Token Expired

Jika aplikasi mengalami:

- logout otomatis
- data kosong
- request 401

Pastikan:

- refresh token masih valid
- endpoint `/api/auth/refresh/` berjalan normal
- `VITE_API_URL` benar

---

## Build Error

Pastikan command berikut berhasil:

```bash
npm run build
```

---

## CORS Error

Pastikan backend mengizinkan domain frontend pada konfigurasi CORS.

---

# Preview

## Dashboard Officer

```text
Officer dashboard with transaction verification and management.
```

## Dashboard Customer

```text
Customer dashboard with categories, points, balances, and transactions.
```

---

# Backend Repository

Frontend ini menggunakan backend REST API EcoCycle Hub berbasis Django REST Framework.

---

# License

MIT License
