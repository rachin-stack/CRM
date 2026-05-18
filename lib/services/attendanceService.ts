export function attendanceStatus(checkIn: Date) {
  const lateBoundary = new Date(checkIn); lateBoundary.setHours(10, 0, 0, 0);
  return checkIn > lateBoundary ? "late" : "present";
}
