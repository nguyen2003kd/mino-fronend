import { WORK_SCHEDULE, ATTENDANCE_STATUS } from "@/constants/attendance";
import type { AttendanceStatus } from "@/constants/attendance";

/**
 * Determine attendance status based on check-in time
 * @param checkInTime Check-in time (ISO string or Date)
 * @returns PRESENT or LATE
 */
export const determineAttendanceStatus = (
  checkInTime: Date | string
): AttendanceStatus => {
  const checkIn = typeof checkInTime === "string" ? new Date(checkInTime) : checkInTime;
  
  // Get the time limit for today
  const today = new Date();
  const [hours, minutes] = WORK_SCHEDULE.CHECK_IN_TIME_LIMIT.split(":").map(Number);
  const timeLimit = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    hours,
    minutes,
    0
  );

  // Compare check-in time with limit
  if (checkIn <= timeLimit) {
    return ATTENDANCE_STATUS.PRESENT;
  }
  
  return ATTENDANCE_STATUS.LATE;
};

/**
 * Format time to HH:mm format
 * @param date Date object
 * @returns Formatted time string
 */
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Get current date in ISO format for tracking_date
 * @returns ISO date string
 */
export const getCurrentISODate = (): string => {
  return new Date().toISOString();
};

/**
 * Get start of day in ISO format
 * @returns ISO date string for start of day
 */
export const getStartOfDayISO = (): string => {
  const now = new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0
  );
  return startOfDay.toISOString();
};
