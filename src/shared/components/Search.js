import { BsSearch as SearchIcon } from 'react-icons/bs';

export default function Search({ store }) {
  const [state, dispatch] = store;
  return (
    <div className='flex h-9 w-full  items-center gap-2 rounded-lg border-2 bg-white px-3 py-1 focus-within:border-blue-500'>
      <SearchIcon />
      <input
        value={state.searchFilter}
        onChange={(e) => dispatch({ searchFilter: e.target.value })}
        placeholder='Search...'
        className='w-full bg-transparent placeholder-black outline-none'
      />
    </div>
  );
}
