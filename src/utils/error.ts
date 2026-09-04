// Core
import { isAxiosError } from 'axios'
// import type { ApiResponse } from '@/api/models/apiResponse'

// Extract a human readable message from an API error or exception.
export const extractErrorMessage = (error: unknown): string => {

  // Handle Axios errors
  if (isAxiosError(error)) {
    const responseData = (error as { response?: { data?: unknown } })?.response?.data as Record<string, unknown> | undefined
    if (responseData) {
      // Handle the specific error format with nested data
      const dataField = responseData['data'] as Record<string, unknown> | undefined
      if (dataField && Array.isArray(dataField['violations'])) {
        const violations = dataField['violations'] as Array<Record<string, unknown>>
        if (violations.length > 0) {
          const violation = violations[0]
          const action = violation['action'] as Record<string, unknown> | undefined
          if (action && Array.isArray(action['errors'])) {
            const errors = action['errors'] as Array<Record<string, unknown>>
            if (errors.length > 0) {
              const firstError = errors[0]
              const message = firstError['message'] as Record<string, unknown> | undefined
              if (message) {
                if (typeof message['vi'] === 'string') return message['vi'] as string
                if (typeof message['en'] === 'string') return message['en'] as string
              }
            }
          }

          if (typeof violation['message'] === 'string') return violation['message'] as string
        }
      }

      if (dataField) {
        if (typeof dataField['message'] === 'string') return dataField['message'] as string
        if (typeof dataField['message_en'] === 'string') return dataField['message_en'] as string
      }

      if (typeof responseData['message'] === 'string') return responseData['message'] as string
      if (typeof responseData['message_en'] === 'string') return responseData['message_en'] as string
    }

    // Fallback to axios error message
    const msg = (error as Error).message
    return msg || 'Có lỗi xảy ra, vui lòng thử lại sau'
  }

  // Handle regular Error objects
  if (error instanceof Error) return error.message

  // Handle raw object error shapes
  if (error && typeof error === 'object') {
    const errObj = error as Record<string, unknown>
    const dataField = errObj['data'] as Record<string, unknown> | undefined
    if (dataField && Array.isArray(dataField['violations'])) {
      const violations = dataField['violations'] as Array<Record<string, unknown>>
      if (violations.length > 0) {
        const violation = violations[0]
        const action = violation['action'] as Record<string, unknown> | undefined
        if (action && Array.isArray(action['errors'])) {
          const errors = action['errors'] as Array<Record<string, unknown>>
          if (errors.length > 0) {
            const firstError = errors[0]
            const message = firstError['message'] as Record<string, unknown> | undefined
            if (message) {
              if (typeof message['vi'] === 'string') return message['vi'] as string
              if (typeof message['en'] === 'string') return message['en'] as string
            }
          }
        }

        if (typeof violation['message'] === 'string') return violation['message'] as string
      }
    }

    if (dataField) {
      if (typeof dataField['message'] === 'string') return dataField['message'] as string
      if (typeof dataField['message_en'] === 'string') return dataField['message_en'] as string
    }

    if (typeof errObj['message'] === 'string') return errObj['message'] as string
    if (typeof errObj['message_en'] === 'string') return errObj['message_en'] as string
  }

  return 'Có lỗi xảy ra, vui lòng thử lại sau'
}
