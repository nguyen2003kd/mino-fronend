export type StorefrontThemeConfig = {
  colors: {
    background: string;
    surface: string;
    soft: string;
    ink: string;
    muted: string;
    line: string;
    accent: string;
    productMist: string;
    productAccent: string;
    productStone: string;
  };
};

// Admin can replace this object with values from a database/CMS later.
// Every storefront color is exposed to the UI as a CSS variable by StorefrontTheme.
export const storefrontTheme: StorefrontThemeConfig = {
  colors: {
    background: "#f5f8f7",
    surface: "#ffffff",
    soft: "#eaf0ef",
    ink: "#071d35",
    muted: "#687887",
    line: "#d7e2e1",
    accent: "#c8e8d7",
    productMist: "#d8e8ef",
    productAccent: "#ecd7df",
    productStone: "#e9e5df",
  },
};

export type HomepageImagePresentation = "contained" | "directional-crop";

// Image choices and their display behavior live here for now.
// Later, this object can be populated from the admin API/CMS instead.
export const homepageMedia = {
  guarantee: {
    src: "/amino/NADDesktop.webp",
    alt: "NAD+ vial",
    presentation: "contained" as HomepageImagePresentation,
  },
} as const;

export const products = [
  {
    name: "Daily Set",
    note: "morning essentials",
    price: "490.000đ",
    badge: "New arrival",
    tone: "mist" as const,
  },
  {
    name: "Soft Reset",
    note: "slow evenings",
    price: "520.000đ",
    badge: "Editor pick",
    tone: "accent" as const,
  },
  {
    name: "Clear Start",
    note: "daily rhythm",
    price: "450.000đ",
    badge: "Everyday",
    tone: "stone" as const,
  },
];

export const trustPoints = [
  [
    "01",
    "Thông tin vừa đủ",
    "Mỗi trang sản phẩm đặt những điều cần biết ở đúng chỗ: thành phần, hướng dẫn, giao hàng và chính sách.",
  ],
  [
    "02",
    "Đóng gói cẩn thận",
    "Mỗi đơn được kiểm tra trước khi rời kho và có trạng thái giao hàng rõ ràng cho khách.",
  ],
  [
    "03",
    "Routine không bị ràng buộc",
    "Chọn mua một lần hoặc nhận set định kỳ. Bạn luôn có thể đổi lựa chọn trước lần giao tiếp theo.",
  ],
] as const;
