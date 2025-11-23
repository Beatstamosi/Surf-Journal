import { Dayjs } from "dayjs";

export function calculateSessionDuration(
  startTime: Dayjs | Date | string | null,
  endTime: Dayjs | Date | string | null
): string {
  if (!startTime || !endTime) {
    return "N/A";
  }

  try {
    // Convert everything to Date objects
    const startDate =
      startTime instanceof Date
        ? startTime
        : typeof startTime === "string"
        ? new Date(startTime)
        : startTime.toDate();

    const endDate =
      endTime instanceof Date
        ? endTime
        : typeof endTime === "string"
        ? new Date(endTime)
        : endTime.toDate();

    // Validate dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return "Invalid date";
    }

    // Ensure end time is after start time
    if (endDate <= startDate) {
      return "Invalid duration";
    }

    const durationMs = endDate.getTime() - startDate.getTime();
    const durationMinutes = Math.floor(durationMs / (1000 * 60));

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  } catch (error) {
    console.warn("Error calculating Session Duration: ", error);
    return "Invalid date format";
  }
}
