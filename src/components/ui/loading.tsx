type LoaderProps = {
  message?: string;
};

export default function Loader({
  message = "Đang chuẩn bị trải nghiệm của bạn",
}: LoaderProps) {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="relative grid min-h-[100dvh] overflow-hidden bg-[var(--shop-background,#f5f8f7)] px-5 py-6 text-[var(--shop-ink,#071d35)] sm:px-8 lg:px-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 size-80 rounded-full bg-[var(--shop-product-mist,#d8e8ef)] opacity-70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 -left-24 size-96 rounded-full bg-[var(--shop-product-accent,#ecd7df)] opacity-60 blur-3xl"
      />

      <section className="relative mx-auto grid w-full max-w-5xl self-center overflow-hidden rounded-[2rem] border border-[var(--shop-line,#d7e2e1)] bg-[color:color-mix(in_srgb,var(--shop-surface,#ffffff)_86%,transparent)] shadow-[0_28px_70px_-45px_rgba(7,29,53,0.42)] backdrop-blur-sm md:grid-cols-[1.15fr_0.85fr]">
        <div className="order-2 flex min-h-72 flex-col justify-between p-7 sm:p-10 md:order-1 md:min-h-[28rem]">
          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.22em] text-[var(--shop-muted,#687887)] uppercase">
              MINO / Đang đồng bộ
            </p>
            <h1 className="mt-5 max-w-sm text-3xl font-semibold tracking-tight sm:text-4xl">
              {message}
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-[var(--shop-muted,#687887)]">
              Chúng tôi đang sắp xếp các chi tiết cần thiết để mọi thứ sẵn sàng.
            </p>
          </div>

          <div className="max-w-sm space-y-3" aria-hidden="true">
            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--shop-soft,#eaf0ef)]">
              <span className="block h-full w-2/3 animate-pulse rounded-full bg-[var(--shop-ink,#071d35)] motion-reduce:animate-none" />
            </div>
            <div className="flex items-center justify-between text-[0.68rem] font-semibold tracking-[0.12em] text-[var(--shop-muted,#687887)] uppercase">
              <span>Đang chuẩn bị</span>
              <span>01 / 03</span>
            </div>
          </div>
        </div>

        <div className="relative order-1 min-h-72 overflow-hidden border-b border-[var(--shop-line,#d7e2e1)] bg-[var(--shop-soft,#eaf0ef)] md:order-2 md:border-b-0 md:border-l">
          <div
            aria-hidden="true"
            className="absolute top-8 right-8 size-20 rounded-full border border-white/70 bg-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-8 h-px w-28 bg-[var(--shop-ink,#071d35)]/20"
          />

          <div className="absolute top-1/2 left-1/2 h-44 w-28 -translate-x-1/2 -translate-y-1/2 rotate-[8deg] animate-[bounce_3s_ease-in-out_infinite] motion-reduce:animate-none">
            <div className="absolute top-0 left-1/2 h-8 w-16 -translate-x-1/2 rounded-t-lg border border-[var(--shop-ink,#071d35)]/20 bg-[linear-gradient(90deg,#c9d0d0,#f8fbfb_48%,#bec7c8)] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]" />
            <div className="absolute top-6 right-1 bottom-0 left-1 rounded-[1rem_1rem_1.8rem_1.8rem] border border-[var(--shop-ink,#071d35)]/15 bg-[linear-gradient(105deg,rgba(255,255,255,0.84),rgba(255,255,255,0.28)_32%,rgba(255,255,255,0.58)),var(--shop-product-mist,#d8e8ef)] shadow-[inset_9px_0_10px_rgba(255,255,255,0.55),inset_-10px_0_18px_rgba(7,29,53,0.08)]" />
            <div className="absolute top-[4.8rem] right-3 left-3 grid min-h-16 place-items-center rounded-md border border-[var(--shop-ink,#071d35)]/10 bg-white/75 px-2 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
              <span className="text-sm font-black tracking-[-0.12em]">MINO</span>
              <span className="text-[0.5rem] font-bold tracking-[0.14em] text-[var(--shop-muted,#687887)] uppercase">
                daily routine
              </span>
            </div>
          </div>

          <div aria-hidden="true" className="absolute right-7 bottom-7 grid gap-2">
            <span className="h-2 w-20 animate-pulse rounded-full bg-white/75 motion-reduce:animate-none" />
            <span className="h-2 w-12 animate-pulse rounded-full bg-white/55 [animation-delay:180ms] motion-reduce:animate-none" />
          </div>
        </div>
      </section>

      <span className="sr-only">{message}</span>
    </main>
  );
}
