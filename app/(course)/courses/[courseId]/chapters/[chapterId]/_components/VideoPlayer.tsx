"use client";

import { Loader2, Lock } from "lucide-react";
import { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  chapterId: string;
  title: string;
  courseId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  playbackId: string;
}

export const VideoPlayer = ({
  chapterId,
  title,
  courseId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  playbackId,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  console.log(playbackId)
  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-center">
          <Lock className="h-8 w-8 text-secondary" />
          <p className="text-sm text-secondary">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={() => {}}
          playbackId={playbackId}
          autoPlay
        />
      )}
    </div>
  );
};
