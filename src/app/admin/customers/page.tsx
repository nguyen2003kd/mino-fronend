import { AdminEmptyPage } from "@/app/admin/components/admin-empty-page";

export default function AdminCustomersPage() {
  return <AdminEmptyPage title="Khách hàng" description="Trang khách hàng đã được tách thành route riêng. Danh sách, phân nhóm và lịch sử mua sẽ được gắn API tại đây." action={{ label: "Xem đơn hàng", href: "/admin/orders" }} />;
}
