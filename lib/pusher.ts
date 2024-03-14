import Pusher from "pusher";
import Pusherjs from "pusher-js";



export const pusher = new Pusher({
    appId: process.env.PUSHER_ID!,
    key: process.env.PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: "ap1",
    useTLS: true,
});

function envPusherKey() {
    if (process.env.NODE_ENV === "development") {
        return "56007b83ee44bcbc8ae6";
    } 

    return "16a65786789d773ad790";
}

export const pusherClient = new Pusherjs(envPusherKey(), {
    cluster: "ap1", // Change with your cluster region.
    authEndpoint: "/api/pusher/auth", // OPTIONAL: For secure web sockets.
    authTransport: "ajax",
    auth: {
        headers: {
            "Content-Type": "application/json",
        },
    },
});