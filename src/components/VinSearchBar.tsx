import React, { useState } from 'react';
import { Search, Car, Hash, ShieldCheck, ChevronDown } from 'lucide-react';

interface VinSearchBarProps {
  onSearch: (query: string, searchType: 'vin' | 'plate', state?: string) => void;
  isLoading?: boolean;
}

export const VinSearchBar: React.FC<VinSearchBarProps> = ({ onSearch, isLoading }) => {
  const [searchType, setSearchType] = useState<'vin' | 'plate'>('vin');
  const [query, setQuery] = useState('');
  const [stateCode, setStateCode] = useState('CA');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim(), searchType, stateCode);
  };

  const US_STATES = [
    'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
    'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
    'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
    'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
    'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="bg-[#FFFFFF] p-1.5 rounded-xl border border-[#E6E9E4] shadow-resting flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5">
        {/* Type Toggle */}
        <div className="flex bg-[#FAFAF7] p-1 rounded-lg border border-[#E6E9E4] shrink-0">
          <button
            type="button"
            onClick={() => setSearchType('vin')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
              searchType === 'vin'
                ? 'bg-[#FFFFFF] text-[#013479] shadow-sm font-semibold border border-[#E6E9E4]'
                : 'text-[#4B5A54] hover:text-[#17211D]'
            }`}
          >
            <Hash className="w-3.5 h-3.5" />
            VIN
          </button>
          <button
            type="button"
            onClick={() => setSearchType('plate')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
              searchType === 'plate'
                ? 'bg-[#FFFFFF] text-[#013479] shadow-sm font-semibold border border-[#E6E9E4]'
                : 'text-[#4B5A54] hover:text-[#17211D]'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            License Plate
          </button>
        </div>

        {/* Input area */}
        <div className="flex-1 flex items-center gap-1 min-w-0 px-2">
          {searchType === 'plate' && (
            <div className="relative shrink-0">
              <select
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                className="appearance-none bg-[#FAFAF7] border border-[#E6E9E4] text-[#17211D] text-sm font-mono font-semibold rounded-md pl-2 pr-7 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#013479]"
              >
                {US_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#4B5A54]" />
            </div>
          )}

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value.toUpperCase())}
            placeholder={
              searchType === 'vin'
                ? 'Enter 17-digit VIN...'
                : 'Enter Plate Number...'
            }
            maxLength={searchType === 'vin' ? 17 : 10}
            className="w-full bg-transparent text-sm font-mono tracking-wider text-[#17211D] placeholder-[#8A968F] focus:outline-none py-1.5"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="bg-[#013479] hover:bg-[#024EB6] disabled:opacity-50 text-[#FFFFFF] text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Search className="w-3.5 h-3.5" />
              <span>Decode</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
