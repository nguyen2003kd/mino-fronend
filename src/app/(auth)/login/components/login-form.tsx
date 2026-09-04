"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAuthControllerLogin } from "@/api/endpoints/auth";
import useAuthStore from "@/stores/auth";
import { extractErrorMessage } from "@/utils/error";

export function LoginForm() {
  const router = useRouter();
  const setStore = useAuthStore((state) => state.setStore);
  const loginMutation = useAuthControllerLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isSubmitting = loginMutation.isLoading;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    try {
      const normalizedEmail = email.trim();
      const response = await loginMutation.mutateAsync({
        data: { email: normalizedEmail, password },
      });

      setStore({
        isSignedIn: true,
        access_token: response.accessToken,
        storedUsername: normalizedEmail,
      });

      toast.success("Đăng nhập thành công");
      const returnUrl = new URLSearchParams(window.location.search).get("returnUrl");
      router.replace(returnUrl?.startsWith("/admin") ? returnUrl : "/admin");
    } catch (error) {
      toast.error("Đăng nhập thất bại", {
        description: extractErrorMessage(error),
      });
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-950">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl shadow-slate-950/30 sm:p-10">
        <p className="text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase">
          MINO Club
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Đăng nhập quản trị
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Nhập thông tin tài khoản để tiếp tục vào trang quản trị.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700" htmlFor="email">
            Email
            <input
              className="mt-2 block h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-base outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/15"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@mino.club"
              required
              disabled={isSubmitting}
            />
          </label>

          <label className="block text-sm font-medium text-slate-700" htmlFor="password">
            Mật khẩu
            <input
              className="mt-2 block h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-base outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/15"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Nhập mật khẩu"
              minLength={6}
              required
              disabled={isSubmitting}
            />
          </label>

          <Button
            className="h-11 w-full text-base"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>
      </section>
    </main>
  );
}
