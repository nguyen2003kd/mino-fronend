
import { ReactQueryProvider } from './react-query'
import { AOSProvider } from './aos'
import ProgressBarProvider from './progress-bar'
export type LayoutProps = Readonly<{
  children: React.ReactNode
}>

export function Providers({ children }: LayoutProps) {
  return (
    <ReactQueryProvider>
      <AOSProvider>
        <ProgressBarProvider>{children}</ProgressBarProvider>
      </AOSProvider>
    </ReactQueryProvider>
  )
}
