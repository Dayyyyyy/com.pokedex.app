import Head from 'next/head';
import Image from 'next/image';
import PokemonCard from '../shared/components/PokemonCard';
import Search from '../shared/components/Search';
import TypeSelect from '../shared/components/TypeSelect';
import Error from '../shared/components/errors/Error';
import useInfiniteScroll from '../shared/hooks/useInfiniteScroll';
import { AiOutlineClose as CloseIcon } from 'react-icons/ai';
import { initialState } from './_app';
export const BASE_URL = 'https://pokeapi.co/api/v2';
const POKEMON_URL = `${BASE_URL}/pokemon/?limit=-1`;
const TYPES_URL = `${BASE_URL}/type`;

export default function Home({ allPokemon, allTypes, error, store }) {
  const [state, dispatch] = store;
  const infiniteScrollRef = useInfiniteScroll(displayMorePokemon);

  if (error) return <Error error={error} />;

  const filteredPokemon = allPokemon
    .filter(({ name, id }) => {
      const searchTerms = state.searchFilter.toLowerCase().trim().split(' ');
      return searchTerms.every(
        (search) => name.includes(search) || id.includes(search)
      );
    })
    .filter((pokemon) =>
      state.typeFilter.every((type) => pokemon.types.includes(type))
    );

  function displayMorePokemon() {
    if (state.numberOfPokemonVisible > filteredPokemon.length) return;
    dispatch({ numberOfPokemonVisible: state.numberOfPokemonVisible + 20 });
  }

  function clearFilters() {
    dispatch(initialState);
  }

  console.log(state);

  return (
    <div className='min-h-screen bg-neutral-50'>
      <Head>
        <title>Pokedex</title>
        <meta
          name='description'
          content='A Pokedex app created with React, Next.js, and Tailwind'
        />
        <link rel='icon' href='/pokeball.svg' />
      </Head>
      <header className='mx-auto w-48 py-5 sm:w-80 sm:py-10'>
        <Image
          src='/poke_logo.png'
          width='317'
          height='114'
          quality='100'
          alt='Pokemon logo'
        />
      </header>
      <main className='container flex flex-col items-center gap-4 p-0'>
        <div className='flex w-full max-w-2xl flex-col justify-center gap-2 sm:my-5 sm:flex-row'>
          <Search store={store} />
          <div className='flex h-full items-center gap-2'>
            <TypeSelect allTypes={allTypes} store={store} />
            {state.typeFilter.length > 0 ? (
              <button
                className='flex h-full items-center gap-2 rounded-lg bg-red-500 px-4 py-1.5 text-white hover:bg-red-600'
                onClick={clearFilters}
              >
                <CloseIcon size='16' />
                <div>Clear</div>
              </button>
            ) : null}
          </div>
        </div>

        <section
          className='mb-5 grid  grid-cols-1 gap-7
         pt-4  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-4'
        >
          {filteredPokemon
            .slice(0, state.numberOfPokemonVisible)
            .map((pokemon) => (
              <PokemonCard key={pokemon.name} {...pokemon} />
            ))}
        </section>

        {filteredPokemon.length === 0 && (
          <h1 className='text-2xl font-bold'>No Pokemon found</h1>
        )}

        <div ref={infiniteScrollRef}></div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const { results: typesData } = await fetch(TYPES_URL).then((res) =>
      res.json()
    );
    const { results: pokemonData } = await fetch(POKEMON_URL).then((res) =>
      res.json()
    );

    const allTypes = await Promise.all(
      typesData.map(async (type) => {
        const { pokemon } = await fetch(type.url).then((res) => res.json());
        return {
          type: type.name,
          pokemonList: pokemon.map(({ pokemon }) => pokemon.name),
        };
      })
    );

    const allPokemon = pokemonData.map((pokemon) => {
      return {
        name: pokemon.name,
        id: pokemon.url.split('/')[6],
        types: allTypes.reduce((types, { type, pokemonList }) => {
          return pokemonList.includes(pokemon.name) ? [...types, type] : types;
        }, []),
      };
    });

    return {
      props: {
        allPokemon,
        allTypes: allTypes
          .map(({ type }) => type)
          .filter((type) => type !== 'unknown' && type !== 'shadow'), // remove unused pokemon types "shadow" and "unknown"
      },
    };
  } catch (error) {
    return {
      props: {
        error: `Error fetching data: ${error} `,
      },
    };
  }
}