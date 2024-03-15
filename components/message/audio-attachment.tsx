"use client";

function AudioAttachment({ source, type }: { source: string; type: string }) {
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
