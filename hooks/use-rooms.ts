"use client";

import getRooms from "@/actions/rooms";
import { Room } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useRooms() {
    const { data: rooms, status, fetchStatus, error } = useQuery({
        queryKey: ["rooms"],
        queryFn: async () => {
            const data = await getRooms();

            return data
        },
        staleTime: 6 * 1000,
        refetchInterval: 10 * 1000
    })

    return {
        rooms,
        status,
        fetchStatus,
        error
    };
}

export default useRooms;