"use client";

import getJoinedRooms from "@/actions/joined-rooms";
import { Room } from "@prisma/client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import z from "zod"

const schema = z.array(z.object({
    id: z.string(),
    name: z.string(),
    memberIDs: z.string().array(),
    description: z.string().nullable(),
    image: z.string().nullable(),
    private: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date()
}))

function useJoinedChannels() {
    const { data: joinedRooms, status, fetchStatus, error } = useQuery({
            queryKey: ["room"],
        queryFn: async () => await getJoinedRooms(),
        staleTime: 5 * 1000,
        refetchInterval: 5 * 1000
    })

    return {
        joinedRooms,
        status,
        fetchStatus,
        error
    };
}

export default useJoinedChannels;