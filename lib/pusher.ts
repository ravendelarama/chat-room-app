import Pusher from "pusher";
import Pusherjs from "pusher-js";



export const pusher = new Pusher({
    appId: process.env.PUSHER_ID!,
    key: process.env.PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: "ap1",
    useTLS: true,
});

export const pusherClient = new Pusherjs("cd14ccdd3e4d87506c1c", {
    cluster: "ap1", // Change with your cluster region.
    authEndpoint: "/api/pusher/auth", // OPTIONAL: For secure web sockets.
    authTransport: "ajax",
    auth: {
        headers: {
            "Content-Type": "application/json",
        },
    },
});