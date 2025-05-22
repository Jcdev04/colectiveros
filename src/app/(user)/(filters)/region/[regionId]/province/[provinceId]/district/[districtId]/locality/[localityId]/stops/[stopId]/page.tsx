"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScheduleTable } from "@/components/user/schedule-table";
import { useStops } from "@/context/StopContext";
import { ScheduleArraySchema, ScheduleList } from "@/db/stop.schema";
import { ArrowLeft, Bus, Clock, CoinsIcon, MapPin, Phone } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const Stop = () => {
  const { stopId } = useParams();
  const { getStopById } = useStops();
  const router = useRouter();

  const stop = getStopById(stopId as string);
  const schedule: ScheduleList = ScheduleArraySchema.parse(stop.schedule);
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Title and CTA */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
        <div>
          <Button
            variant="ghost"
            className="mb-2 flex items-center gap-1 text-indigo-700 p-0 h-auto"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4" /> Volver a paraderos
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">{`Ruta ${stop.location.locality.name} a ${stop.route.destination_locality}`}</h1>
        </div>
      </div>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-[#F7F9FC] border-none shadow-none">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="text-indigo-600">
                <Bus className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Paradero</p>
                <p className="font-bold text-gray-900">{stop.company.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#F7F9FC] border-none shadow-none">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="text-indigo-600">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Duración</p>
                <p className="font-bold text-gray-900">
                  {stop.route.duration_minutes} min.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#F7F9FC] border-none shadow-none">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="text-indigo-600">
                <CoinsIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tarifa</p>
                <p className="font-bold text-gray-900">
                  {stop.route.fare_pen} soles
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detail Section - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700">
              {stop.location.address} -{" "}
              {stop.location.reference ?? "Ninguna referencia"}
            </p>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Phone className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700">{stop.phone}</p>
          </div>

          <div className="bg-[#F7F9FC] p-4 rounded-lg">
            <div className="text-xs text-gray-600 space-y-2">
              <div className="flex flex-wrap gap-x-2">
                <span className="font-medium">Región:</span>
                <span>{stop.location.region.name}</span>
                <span className="text-gray-400 mx-1">·</span>
                <span className="font-medium">Provincia:</span>
                <span>{stop.location.province.name}</span>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <span className="font-medium">Distrito:</span>
                <span>{stop.location.district.name}</span>
                <span className="text-gray-400 mx-1">·</span>
                <span className="font-medium">Ciudad:</span>
                <span>{stop.location.locality.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <Card className="shadow-sm border-none">
            <CardContent>
              <h3 className="font-bold text-base mb-4  border-b-[0.5px]  pb-5">
                Horario de atención
              </h3>
              <ScheduleTable schedules={schedule} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Stop;
