"use client";

function AudioAttachment({
  roomId,
  messageId,
  source,
  type,
}: {
  roomId: string;
  messageId: string;
  source: string;
  type: string;
}) {
  return (
    <>
      <audio controls>
        <source src={`https://utfs.io/f/${source}`} type={type} />
        Audio
      </audio>
    </>
  );
}

export default AudioAttachment;
