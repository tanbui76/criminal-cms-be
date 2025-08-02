# Hướng dẫn chạy Seed

## Tổng quan
Dự án này có các script để tạo dữ liệu mẫu cho hệ thống quản lý hồ sơ phạm nhân.

## Các bước chạy seed

### 1. Build project
```bash
npm run build
```

### 2. Chạy TypeORM seeds (Users, Roles, Permissions)
```bash
# Chạy tất cả seeds của TypeORM
npm run seed

# Hoặc chạy từng seed riêng lẻ
npm run seed:user
npm run seed:role  
npm run seed:permission
npm run seed:email-template
```

### 3. Chạy custom seeds (Profile Types & Criminals)
**Lưu ý**: Phải chạy cả 2 seed files cùng lúc để đảm bảo dữ liệu được tạo đúng cách.

```bash
# Chạy seed cho profile types trước
node run-profile-type-seed.js

# Sau đó chạy seed cho criminals
node run-criminal-seed.js
```

Hoặc chạy script tổng hợp:
```bash
node run-all-seeds.js
```

### 4. Kiểm tra dữ liệu đã tạo
```bash
npm run check:criminal
```

## Dữ liệu được tạo

### TypeORM Seeds
- **Users**: Tài khoản admin và user mẫu
- **Roles**: Superuser và Normal user roles
- **Permissions**: Tất cả permissions cho các module
- **Email Templates**: Templates cho email activation và password reset

### Custom Seeds
#### Criminals (8 records)
- Nguyễn Văn A - Phạm tội trộm cắp tài sản
- Trần Thị B - Phạm tội buôn bán ma túy
- Lê Văn C - Phạm tội cố ý gây thương tích
- Phạm Thị D - Phạm tội lừa đảo chiếm đoạt tài sản
- Hoàng Văn E - Phạm tội giết người
- Võ Thị F - Phạm tội tham nhũng
- Đặng Văn G - Phạm tội tham nhũng
- Lý Thị H - Phạm nhân được tha tù trước thời hạn

#### Profile Types (9 types)
- Hồ sơ thi hành án treo
- Hồ sơ thi hành án phạt cải tạo không giam giữ
- Hồ sơ thi hành án phạt cấm cư trú
- Hồ sơ thi hành án phạt quản chế
- Hồ sơ thi hành quyết định hoãn chấp hành án phạt tù
- Hồ sơ thi hành án phạt tước một số quyền công dân
- Hồ sơ thi hành án phạt cấm đảm nhiệm chức vụ, cấm hành nghề hoặc làm công việc nhất định
- Hồ sơ thi hành quyết định tạm đình chỉ chấp hành án phạt tù
- Hồ sơ phạm nhân của người được tha tù trước thời hạn có điều kiện

## Lưu ý quan trọng
- **PHẢI chạy TypeORM seeds TRƯỚC** (users, roles, permissions)
- **PHẢI chạy seed profile types TRƯỚC** khi chạy seed criminals
- Criminals cần có profile types để tạo mối quan hệ
- Mỗi criminal sẽ được gán các profile types phù hợp với loại tội phạm
- Dữ liệu được tạo với thông tin thực tế về địa chỉ, ngày tháng
- Có thể chạy lại seed nhiều lần mà không bị trùng lặp (sử dụng orIgnore)

## Troubleshooting

### Lỗi kết nối database
- Kiểm tra cấu hình database trong `config/development.yml`
- Đảm bảo PostgreSQL đang chạy
- Kiểm tra thông tin đăng nhập database

### Lỗi build
- Chạy `npm install` để cài đặt dependencies
- Kiểm tra TypeScript errors trước khi build

### Lỗi seed
- Đảm bảo đã chạy migration trước
- **Kiểm tra đã chạy TypeORM seeds trước (users, roles, permissions)**
- **Kiểm tra đã chạy seed profile types trước khi chạy seed criminals**
- Kiểm tra file cấu hình `src/config/ormconfig-seeding.ts`
- Nếu gặp lỗi "No profile types found", hãy chạy lại seed profile types trước
- Nếu gặp lỗi permission/role, hãy chạy lại TypeORM seeds 