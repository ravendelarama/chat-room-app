import { auth } from "@/auth";
import { pusher } from "@/lib/pusher";

async function POST(req: Request) {
    const data = await req.text();
    
    const [socketId, channelName] = data.split("&").map((str) => str.split("=")[1]);
    
    const session = await auth();

    const presenceData = {
        user_id: session?.user.id!,
        name: session?.user.name
    }

    const pusherAuth = pusher.authorizeChannel(
        socketId,
        channelName,
        presenceData
    );

    return new Response(JSON.stringify(pusherAuth));
}

export {
    POST
}