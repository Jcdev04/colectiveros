"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
const BreadCrumbs = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();

  const { regionId, provinceId, districtId, localityId } = params;

  const steps = [
    {
      label: "Región",
      href: regionId ? `/region` : undefined,
    },
    {
      label: "Provincia",
      href: provinceId ? `/region/${regionId}/province` : undefined,
    },
    {
      label: "Distrito",
      href: districtId
        ? `/region/${regionId}/province/${provinceId}/district`
        : undefined,
    },
    {
      label: "Localidad",
      href: localityId
        ? `/region/${regionId}/province/${provinceId}/district/${districtId}/locality`
        : undefined,
    },
    {
      label: "Paraderos",
      href: localityId
        ? `/region/${regionId}/province/${provinceId}/district/${districtId}/locality/${localityId}/stops`
        : undefined,
    },
  ];
  return (
    <div>
      <Breadcrumb className="my-5">
        <BreadcrumbList>
          {steps.map((step, idx) => (
            <div
              key={step.label}
              className="flex flex-wrap items-center gap-1.5"
            >
              <BreadcrumbItem>
                {step.href ? (
                  <BreadcrumbLink
                    href={step.href}
                    className="text-indigo-600 font-semibold"
                  >
                    {step.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbLink className="cursor-not-allowed text-gray-500">
                    {step.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {idx < steps.length - 1 && <BreadcrumbSeparator />}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      {children}
    </div>
  );
};

export default BreadCrumbs;
