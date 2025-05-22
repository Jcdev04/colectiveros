import { ScheduleList } from "@/db/stop.schema";

export function ScheduleTable({
  schedules,
}: Readonly<{ schedules: ScheduleList }>) {
  return (
    <div className="w-full">
      {schedules.map((schedule, index) => (
        <div key={schedule.day}>
          <div className="flex justify-between py-2">
            <span className="text-gray-700">{schedule.day}</span>
            <span className="font-medium text-gray-900">{`${
              schedule.is_available
                ? `${schedule.hours?.from} - ${schedule.hours?.to}`
                : "No disponible"
            }`}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
