import Image from 'next/image';
import Link from 'next/link';
import { useState, memo } from 'react';
import { COLORS } from '../constants/colors';
import { useManageImg } from '../hooks/useManageImg';

function Pokemon({ name, id, types }) {
  const reversedTypes = [...types].reverse();
  const pokemonTypeBg = `bg-${reversedTypes[0]}`;
  const pokemonTypeShadow = `shadow-${reversedTypes[0]}`;

  const { imageUrl, handleImageError } = useManageImg(id);

  return (
    <Link href={`/${name}`}>
      <article className='h-auto w-full'>
        <div
          className={`${pokemonTypeShadow}  ${pokemonTypeBg} lg-shadow h-full w-full overflow-hidden rounded-lg p-4 shadow-lg transition duration-300 hover:-translate-y-3`}
        >
          <div className='relative flex content-center justify-between'>
            <div className='absolute right-[-60%] top-[-100%] h-40 w-auto '>
              <img
                src='/assets/pokeball2.svg'
                alt='pokemon back'
                className='h-[300px] w-[300px]'
              />
            </div>

            <div className='w-full text-left'>
              <span className='text-sm font-bold'>
                #{`${id}`.padStart(4, '0')}
              </span>
              <h6 className='w-full text-xl font-bold capitalize text-contrastText'>
                {name}
              </h6>
              <div className='mt-2 flex flex-wrap gap-2'>
                {reversedTypes.map((type, i) => (
                  <span
                    key={type.name}
                    style={{
                      backgroundColor: COLORS[type],
                    }}
                    className={`rounded-md border   border-white/50 px-1
                  py-0.5 text-xs
                   capitalize  text-contrastText `}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <img
              src={imageUrl}
              alt='pokemon back'
              className=' relative h-[80px] w-[150px] object-contain'
              objectFit='contain'
              onError={handleImageError}
            />
          </div>
        </div>
      </article>
    </Link>
  );
}

export default memo(Pokemon);
