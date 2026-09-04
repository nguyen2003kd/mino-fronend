'use client'

import type { ReactNode, ComponentProps } from 'react'
import { Toaster as Sonner, toast as sonner } from 'sonner'
import { extractErrorMessage } from '@/utils/error'

type ToasterProps = ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme='light'
      className='toaster group'
      toastOptions={{
        classNames: {
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg'
        }
      }}
      {...props}
    />
  )
}

const ToastLayout = (props: { title: string; content: ReactNode; descColor: string }) => {
  const { title, content, descColor } = props
  return (
    <div className="flex flex-col gap-0.5">
      <h2 className='font-semibold text-sm'>{title}</h2>
      {content && (
        <div className={`text-xs font-normal ${descColor}`}>
          {content}
        </div>
      )}
    </div>
  )
}

const mergeClassNames = (defaultCls: any, opts?: any) => {
  if (!opts || !opts.classNames) return defaultCls

  // Merge thông minh để tránh đè mất các class tùy biến khác nếu có truyền vào cục bộ
  const merged = { ...defaultCls }
  for (const key in opts.classNames) {
    merged[key] = `${defaultCls[key] || ''} ${opts.classNames[key]}`.trim()
  }
  return merged
}

const toast = Object.assign((title: (() => ReactNode) | ReactNode, data?: any) => sonner(title, data), {
  success: (props: any, options?: any) => {
    const isString = typeof props === 'string'
    const title = isString ? props : props?.title || 'Thành công'
    const content = isString ? options?.description ?? options?.content ?? undefined : props?.content
    const opts = isString ? options : options
    return sonner.success(
      <ToastLayout title={title} content={content} descColor="text-[#16a34a]" />,
      {
        ...opts,
        classNames: mergeClassNames(
          {
            toast: '!bg-[#ecfdf3] !border-[#dbfce7] !text-[#15803d]',
            closeButton: '!bg-[#ecfdf3] !text-[#15803d] !border-[#dbfce7] hover:!opacity-80'
          },
          opts
        ),
      }
    )
  },

  warning: (props: any, options?: any) => {
    const isString = typeof props === 'string'
    const title = isString ? props : props?.title || 'Cảnh báo'
    const content = isString ? options?.description ?? options?.content ?? undefined : props?.content
    const opts = isString ? options : options
    return sonner.warning(
      <ToastLayout title={title} content={content} descColor="text-[#d97706]" />,
      {
        ...opts,
        classNames: mergeClassNames(
          {
            toast: '!bg-[#fffbeb] !border-[#fef3c7] !text-[#b45309]',
            closeButton: '!bg-[#fffbeb] !text-[#b45309] !border-[#fef3c7] hover:!opacity-80'
          },
          opts
        ),
      }
    )
  },

  error: (props: any, options?: any) => {
    const isString = typeof props === 'string'
    const title = isString ? props : props?.title || 'Lỗi'
    const content = isString ? options?.description ?? options?.content ?? undefined : props?.content
    const opts = isString ? options : options
    return sonner.error(
      <ToastLayout title={title} content={content} descColor="text-[#dc2626]" />,
      {
        ...opts,
        classNames: mergeClassNames(
          {
            toast: '!bg-[#fef2f2] !text-[#ff0000] !border-[#fecaca]',
            closeButton: '!bg-[#fef2f2] !text-[#ff0000] !border-[#fecaca] hover:!opacity-80'
          },
          opts
        ),
      }
    )
  },

  info: (props: any, options?: any) => {
    const isString = typeof props === 'string'
    const title = isString ? props : props?.title || 'Thông tin'
    const content = isString ? options?.description ?? options?.content ?? undefined : props?.content
    const opts = isString ? options : options
    return sonner.info(
      <ToastLayout title={title} content={content} descColor="text-[#2563eb]" />,
      {
        ...opts,
        classNames: mergeClassNames(
          {
            toast: '!bg-[#eff6ff] !border-[#dbeafe] !text-[#1d4ed8]',
            closeButton: '!bg-[#eff6ff] !text-[#1d4ed8] !border-[#dbeafe] hover:!opacity-80'
          },
          opts
        ),
      }
    )
  }
})

const toastErrorMessage = (error: unknown) => {
  toast.error({
    title: 'Thất bại',
    content: extractErrorMessage(error)
  })
}

export { Toaster, toastErrorMessage, toast, sonner }