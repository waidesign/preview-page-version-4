import React from 'react';

export const SkeletonGarageCard: React.FC = () => {
  return (
    <div className="w-full bg-[#FFFFFF] rounded-xl border border-[#E6E9E4] p-6 shadow-elevated animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-[#E6E9E4]">
        <div>
          <div className="h-5 w-28 bg-[#E6E9E4] rounded-full mb-3"></div>
          <div className="h-8 w-64 bg-[#E6E9E4] rounded-lg mb-2"></div>
          <div className="h-7 w-48 bg-[#E6E9E4] rounded-md"></div>
        </div>
        <div className="h-12 w-full md:w-52 bg-[#E6E9E4] rounded-lg"></div>
      </div>

      {/* Content grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-5 h-48 bg-[#FAFAF7] rounded-lg border border-[#E6E9E4] flex items-center justify-center">
          <div className="w-16 h-16 bg-[#E6E9E4] rounded-full"></div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-[#FAFAF7] p-3 rounded-lg border border-[#E6E9E4]">
              <div className="h-3 w-16 bg-[#E6E9E4] rounded mb-2"></div>
              <div className="h-4 w-24 bg-[#E6E9E4] rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
