import type { Metadata } from "next";

import { LoginForm } from "./components/login-form";

export const metadata: Metadata = {
  title: "Đăng nhập quản trị | MINO club",
  description: "Đăng nhập để quản trị MINO club.",
};

export default function LoginPage() {
  return <LoginForm />;
}
