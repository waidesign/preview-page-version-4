import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';

interface VinSearchBarProps {
  onSearch: (query: string, searchType: 'vin' | 'plate', state?: string) => void;
  isLoading?: boolean;
}

export const VinSearchBar: React.FC<VinSearchBarProps> = ({ onSearch, isLoading }) => {
  const [searchType, setSearchType] = useState<'vin' | 'plate'>('vin');
  const [query, setQuery] = useState('');
  const [stateCode, setStateCode] = useState('CA');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        {/* Search Mode Dropdown */}
        <div ref={dropdownRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
            className="w-full sm:w-auto h-9 px-3 bg-[#FAFAF7] hover:bg-[#FFFFFF] text-[#17211D] border border-[#E6E9E4] hover:border-[#013479]/40 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between sm:justify-start gap-2 shadow-2xs active:bg-[#EAEFE8]"
          >
            <span className="whitespace-nowrap">
              {searchType === 'vin' ? 'By VIN' : 'By US License Plate'}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#4B5A54] transition-transform duration-200 shrink-0 ${
                isDropdownOpen ? 'rotate-180 text-[#013479]' : ''
              }`}
            />
          </button>

          {/* Dropdown Options Menu */}
          {isDropdownOpen && (
            <div 
              role="listbox" 
              className="absolute left-0 top-full mt-1.5 w-48 bg-[#FFFFFF] rounded-xl border border-[#E6E9E4] shadow-elevated py-1 z-50 animate-fade-in"
            >
              <button
                type="button"
                role="option"
                aria-selected={searchType === 'vin'}
                onClick={() => {
                  setSearchType('vin');
                  setQuery('');
                  setIsDropdownOpen(false);
                }}
                className={`w-full px-3 py-2 text-xs sm:text-sm text-left flex items-center justify-between transition-colors cursor-pointer ${
                  searchType === 'vin'
                    ? 'bg-[#E3ECF9]/60 text-[#013479] font-bold'
                    : 'text-[#4B5A54] hover:bg-[#FAFAF7] hover:text-[#17211D]'
                }`}
              >
                <span>By VIN</span>
                {searchType === 'vin' && <Check className="w-3.5 h-3.5 text-[#013479]" />}
              </button>

              <button
                type="button"
                role="option"
                aria-selected={searchType === 'plate'}
                onClick={() => {
                  setSearchType('plate');
                  setQuery('');
                  setIsDropdownOpen(false);
                }}
                className={`w-full px-3 py-2 text-xs sm:text-sm text-left flex items-center justify-between transition-colors cursor-pointer ${
                  searchType === 'plate'
                    ? 'bg-[#E3ECF9]/60 text-[#013479] font-bold'
                    : 'text-[#4B5A54] hover:bg-[#FAFAF7] hover:text-[#17211D]'
                }`}
              >
                <span>By US License Plate</span>
                {searchType === 'plate' && <Check className="w-3.5 h-3.5 text-[#013479]" />}
              </button>
            </div>
          )}
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
                ? 'Enter VIN'
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
