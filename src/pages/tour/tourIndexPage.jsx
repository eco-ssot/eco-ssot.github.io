import { useState, useRef, useEffect } from 'react';

import clsx from 'clsx';

import BlobClient from '../../services/blob'

import data from './data.json';


const Carousel = (version) => {
  console.log(BlobClient)
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (carousel.current !== null) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return;
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  return (
    <div className="carousel h-full w-full">
      <div className="whitespace-nowrap text-2xl font-medium">{version.version.length === 0 ? '無' : version.version[0].description}</div>
      <div className="relative h-full w-full content-between self-stretch overflow-hidden flex ">
        <div className="top left absolute flex h-5/6 w-full content-between justify-between self-stretch">
          <button
            onClick={movePrev}
            className="z-10 m-0  h-full w-8 p-0 text-center text-white opacity-75 transition-all duration-300 ease-in-out"
            disabled={isDisabled('prev')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="-ml-0 h-8 w-8 rounded-full bg-gray-500 hover:bg-gray-500/75 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="z-10 m-0 h-full w-8 p-0 text-center  text-white opacity-75 transition-all duration-300 ease-in-out"
            disabled={isDisabled('next')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="-ml-0 h-8 w-8 rounded-full bg-gray-500  hover:bg-gray-500/75 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="carousel-container relative z-0 mx-24 flex h-full touch-pan-x snap-x snap-mandatory overflow-hidden scroll-smooth w-full "
        >
          {data.resources.map((resource, index) => {
            return (
              <div key={index} className="carousel-item relative  h-full snap-start gap-1 text-center m-4">
                <a
                  href={resource.link}
                  className="z-0 block aspect-square h-5/6 w-[76vw] bg-cover bg-left-top bg-no-repeat bg-origin-padding border-white border-2"
                  style={{ backgroundImage: `url(${resource.imageUrl || ''})` }}
                >
                  <img
                    src={resource.imageUrl || ''}
                    alt={resource.title}
                    className="hidden aspect-square h-full w-full"
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-16 left-1/2 z-31 flex -translate-x-1/2 space-x-3">
        {data.resources.map((resource, index) => {
          return (
            <button
              key={index}
              type="button"
              className="h-3 w-3 rounded-full bg-gray-500"
              aria-current="false"
              aria-label="Slide 1"
            ></button>
          );
        })}
      </div>
      <div className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 space-x-3 whitespace-nowrap text-xl">
        {version.version.length === 0 ? '無' : version.version[0].detail}
      </div>
    </div>
  );
};

export default function TourIndexPage({ className, data }) {
  return (
    <div className={clsx(className, !className && '-mt-16 h-screen w-screen overflow-hidden pt-16')}>
      <div className="h-full w-full p-4">
        <div className="flex h-full w-full flex-col px-14">
          <Carousel version={data} />
        </div>
      </div>
    </div>
  );
}
