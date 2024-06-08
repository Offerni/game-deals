import { ISearch } from "types";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const { register, handleSubmit, clearErrors } = useForm<ISearch>();

  const onSearchSubmit: SubmitHandler<ISearch> = (search: ISearch) => {
    router.push(`/games?q=${search.params}`);
  };

  return (
    <form onSubmit={handleSubmit(onSearchSubmit)}>
      <div className="relative text-gray-600 focus-within:text-gray-400 w-auto z-50">
        <input
          type="search"
          className="py-2 text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-md pl-3 focus:outline-none focus:bg-white w-full"
          placeholder="Search Game..."
          autoComplete="off"
          {...register("params", { required: true })}
          onBlur={() => clearErrors()}
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-1">
          <button className="p-1 focus:outline-none">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6 dark:text-gray-100"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </span>
      </div>
    </form>
  );
};

export default SearchBar;
