import { useQuery, QueryFunction, QueryClient } from "@tanstack/react-query";

interface UseReactQueryProps<T> {
  func: QueryFunction<T>;
  cacheName: string;
  enabled?: boolean;
}

const UseReactQuery = <T>({ func, cacheName, enabled }: UseReactQueryProps<T>) => {
  return useQuery({
    queryKey: [cacheName], // cache name harus array
    queryFn: func, // function get API
    staleTime: 120000, // Menentukan data masih valid dalam cache selama 2 menit (120000 milidetik)
    retry: 2, // Mencoba request ulang maksimal 1 kali
    retryDelay: 1500, // Jeda waktu antara percobaan ulang, dalam 1 detik (1000 milidetik)
    enabled // enable or disable react query
  });
};

const GeneralReactQuery = new QueryClient();

export { UseReactQuery, GeneralReactQuery };
