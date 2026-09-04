import { AdminEmptyPage } from "@/app/admin/components/admin-empty-page";

export default function AdminOrdersPage() {
  return <AdminEmptyPage title="Đơn hàng" description="Trang đơn hàng đã được tách thành route riêng. Bảng dữ liệu và API đơn hàng sẽ được thêm tại đây." action={{ label: "Xem sản phẩm", href: "/admin/products" }} />;
}
