"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

const drops = [
  ["/amino/TB500Desktop.webp", "2%", "-1.1s", "7.4s", "-14deg", "54px"],
  ["/BPC157Desktop.webp", "9%", "-5.6s", "8.3s", "10deg", "68px"],
  ["/AminoH2ODesktop.png", "17%", "-3.4s", "9.1s", "-6deg", "60px"],
  ["/amino/NAD-Spray.png", "26%", "-7.2s", "7.8s", "15deg", "52px"],
  ["/amino/TB500Desktop.webp", "35%", "-2.5s", "8.9s", "-10deg", "72px"],
  ["/BPC157Desktop.webp", "44%", "-6.5s", "7.1s", "8deg", "53px"],
  ["/AminoH2ODesktop.png", "54%", "-4.7s", "9.4s", "-18deg", "65px"],
  ["/amino/NAD-Spray.png", "63%", "-8.2s", "8.1s", "7deg", "56px"],
  ["/amino/TB500Desktop.webp", "72%", "-3.8s", "7.7s", "-11deg", "58px"],
  ["/BPC157Desktop.webp", "81%", "-6.1s", "9.2s", "13deg", "70px"],
  ["/AminoH2ODesktop.png", "90%", "-1.7s", "8.5s", "-5deg", "55px"],
  ["/amino/NAD-Spray.png", "96%", "-7.7s", "7.2s", "16deg", "48px"],
  ["/BPC157Desktop.webp", "5%", "-3.1s", "10.3s", "-18deg", "46px"],
  ["/amino/TB500Desktop.webp", "30%", "-8.8s", "10.7s", "9deg", "46px"],
  ["/AminoH2ODesktop.png", "69%", "-5.2s", "10.1s", "-8deg", "47px"],
  ["/BPC157Desktop.webp", "86%", "-9.1s", "10.5s", "14deg", "48px"],
] as const;

export function BulkRain() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {drops.map(([src, left, delay, duration, rotation, width], index) => (
        <Image
          key={`${src}-${index}`}
          src={src}
          alt=""
          width={128}
          height={180}
          className="rain-vial"
          style={
            {
              "--rain-left": left,
              "--rain-delay": delay,
              "--rain-duration": duration,
              "--rain-rotation": rotation,
              "--rain-width": width,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
