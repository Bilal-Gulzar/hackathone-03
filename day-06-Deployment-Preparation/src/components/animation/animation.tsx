import React from "react";

export default function Animation() {
  return (
    <div>
      <div className="p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="bg-slate-700 h-16 w-16"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded-none"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-2">
                <div className="h-2 bg-slate-700 rounded-none col-span-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
