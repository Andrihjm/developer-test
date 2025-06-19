import { Search, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { UserType } from "../../types/index.type";
import { useSearchUserQuery } from "../../redux/api/user-api-slice";
import { useNavigate } from "react-router-dom";
import { SearchSkeleton } from "../ui/skeleton";

const SearchChat = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const debounced = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debounced(value);
  };

  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data: suggestions = [], isFetching } =
    useSearchUserQuery(debouncedSearch);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setSearch("");
        setDebouncedSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (u: UserType) => {
    navigate(`/message/${u.id}`);
    setSearch("");
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="flex items-center rounded-full bg-[#242626] px-4 py-2.5">
        <Search size={18} className="text-[#A5A5A5]" />
        <input
          type="text"
          placeholder="Cari atau mulai chat baru"
          value={search}
          onChange={handleChange}
          className="w-full border-none bg-transparent px-2 text-sm text-[#FAFAFA] outline-none placeholder:text-[#b8b8b8]"
        />
        {isFetching && (
          <Loader2 className="size-4 animate-spin text-[#A5A5A5]" />
        )}
      </div>

      {search.trim() && (
        <ul className="absolute z-10 mt-1 max-h-64 w-full overflow-y-auto rounded-lg bg-[#242626] p-2 shadow-lg">
          {isFetching && <SearchSkeleton />}

          {suggestions?.data?.map((user: UserType) => (
            <li
              key={user.id}
              onClick={() => handleSelect(user)}
              className="flex cursor-pointer items-center gap-4 rounded-lg px-2 py-1 hover:bg-[#2d2f31]"
            >
              <span className="font-medium text-[#FAFAFA]">
                {user.username}
              </span>
              <span className="text-xs text-[#A5A5A5]">({user.email})</span>
            </li>
          ))}
        </ul>
      )}

      {search.trim().length >= 2 &&
        !isFetching &&
        suggestions.data.length === 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-md bg-[#242626] px-4 py-2 text-center text-sm text-[#A5A5A5] shadow-lg">
            User not found
          </div>
        )}
    </div>
  );
};

export default SearchChat;
