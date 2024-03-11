"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";



async function joinRoom(roomId: string) {
    const session = await auth();

    const data = await db.room.update({
        where: {
            id: roomId
        },
        data: {
            members: {
                connect: [{
                    id: session?.user?.id
                }]
            }
        }
    });

    console.log(data.memberIDs.length);
    
    redirect(`/chat/${data.id}`);

//     return {
//         message: `${session?.user?.name} has join the channel.`
//     }
}

export default joinRoom;