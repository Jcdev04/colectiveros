"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const OnBoarding = () => {
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();
  useEffect(() => {
    const fetchCompanyByUserId = async () => {
      console.log(session);
      // session.data.user.id is not valid because is not being saved in the collection
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/companies/${session?.data?.user?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    };
    fetchCompanyByUserId();
  }, []);
  return <div>OnBoarding</div>;
};

export default OnBoarding;
