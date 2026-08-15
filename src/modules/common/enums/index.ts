// TODO: Đối chiếu lại các giá trị enum này với DB thật (chạy `DESCRIBE <table>;`)
// rồi sửa lại cho khớp nếu cần. Đây là giá trị mình đề xuất theo đúng nghiệp vụ
// đã mô tả trong kịch bản vận hành.

// Khớp DB thật: enum('admin','seller','buyer') — không có farmer/hub_coordinator/shipper
export enum UserRole {
  ADMIN = 'admin',
  SELLER = 'seller', // nông dân/người bán, KHÔNG phải 'farmer'
  BUYER = 'buyer',
}

// Khớp DB thật: batches.approval_status = enum('Pending','Approved','Rejected')
// Lưu ý viết hoa chữ cái đầu, không có draft/selling/out_of_stock
export enum BatchApprovalStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

// Khớp DB thật: batches.trust_level = enum('Low','Medium','High')
export enum TrustLevel {
  LOW = 'Low', // tương đương "Cấp 1 – Cơ bản"
  MEDIUM = 'Medium', // tương đương "Cấp 2 – Tin cậy"
  HIGH = 'High', // tương đương "Cấp 3 – Tin cậy cao"
}

// Khớp DB thật: approvals.status = enum('Approved','Rejected')
// KHÔNG có 'Pending' — vì dòng log chỉ được tạo khi admin đã ra quyết định
export enum ApprovalDecisionStatus {
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}