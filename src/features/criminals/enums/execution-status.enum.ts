export enum ExecutionStatus {
  COMPLETED = 'completed', // Đã hoàn thành (có doneExecuteDate)
  EXPIRED = 'expired', // Hết hạn
  EXPIRING_SOON = 'expiring_soon', // Sắp hết hạn (còn ≤ 30 ngày)
  ACTIVE = 'active' // Đang thi hành (còn > 30 ngày)
}
