"use client";
import { MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ParaderoCard({ paradero }: any) {
  const pathName = usePathname();

  return (
    <Link href={`${pathName}/${paradero._id}`}>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer border-gray-100 relative">
        <CardContent>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg text-indigo-800 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-600" />
              <span>{paradero.name}</span>
            </h3>

            <div className="text-gray-600 text-sm">
              <span>{paradero.location?.address}</span>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1 text-sm font-medium">
                <div className="flex items-center">
                  <span className="text-gray-500">Destino</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-600 mr-1" />
                  <span className="text-indigo-700">
                    {paradero.route?.destination_locality}
                  </span>
                </div>
              </div>

              <div className="bg-indigo-50 text-indigo-800 px-2 py-1 rounded-md text-sm font-semibold">
                {"S/ " + paradero.route?.fare_pen}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
