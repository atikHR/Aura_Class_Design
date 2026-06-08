"use client";

import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { LessonTopBar } from "./LessonTopBar";
import { GenerativeWhiteboard } from "./GenerativeWhiteboard";
import { CollapsibleDoubtPanel } from "./CollapsibleDoubtPanel";
import { AskDoubtBox } from "./AskDoubtBox";
import { LessonProgress } from "./LessonProgress";
import { PracticePreviewCard } from "./PracticePreviewCard";

export function FocusedClassroomLayout() {
  const [isFocusMode, setIsFocusMode] = useState(false);

  return (
    <PageTransition>
      <div className={`flex h-[calc(100vh-2rem)] flex-col gap-4 overflow-hidden md:h-[calc(100vh-6rem)] ${isFocusMode ? 'fixed inset-0 z-50 bg-[#0a0f1d] p-4 md:p-6 h-screen' : ''}`}>
        
        {/* Top Control Bar */}
        <LessonTopBar 
          isFocusMode={isFocusMode} 
          onToggleFocus={() => setIsFocusMode(!isFocusMode)} 
        />

        {/* Main Classroom Area */}
        <div className="flex flex-1 flex-col gap-4 overflow-hidden xl:flex-row">
          
          {/* Center: Whiteboard & Main Content */}
          <div className="flex flex-1 flex-col overflow-hidden min-w-0">
            <div className="flex-1 w-full overflow-hidden">
               <GenerativeWhiteboard />
            </div>

            {/* Bottom Controls */}
            <div className="shrink-0 pt-2 pb-6">
                <LessonProgress />
                <AskDoubtBox />
            </div>
          </div>

          {/* Right: Q&A and Sidebar tools */}
          {!isFocusMode && (
            <div className="hidden xl:flex h-full flex-col gap-4 overflow-y-auto overflow-x-hidden pb-4 custom-scrollbar">
              <CollapsibleDoubtPanel />
              <PracticePreviewCard />
            </div>
          )}
          
        </div>
      </div>
    </PageTransition>
  );
}