'use client'
// Core

import { startTransition, useEffect } from 'react'
import 'aos/dist/aos.css'
export type LayoutProps = Readonly<{
  children: React.ReactNode
}>

// Component
export function AOSProvider({ children }: LayoutProps) {
  useEffect(() => {
    setTimeout(
      () =>
        startTransition(() =>
          import('aos').then(({ default: AOS }) => {
            AOS
              .init
              //   {
              //   duration: 400,
              //   delay: 200,
              //   easing: 'ease-in-sine'
              // }
              ()
          })
        ),
      0
    )
  }, [])

  return children
}
export default AOSProvider
