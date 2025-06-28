import { useQuery } from "@tanstack/react-query";
import { baseHeaders } from "@/services/header.config";
import { BASE_API } from "@/services//api.config";

const useSales = () => {
  return useQuery({
    queryKey: ["sales"],
    queryFn: async () => {
      const response = await fetch(`${BASE_API}/sales_det`, {
        method: "GET",
        headers: baseHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sales data");
      }

      return response.json();
    }
  })
};

export { useSales };