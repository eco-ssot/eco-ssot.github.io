import { useState, useRef, useEffect } from 'react';

import clsx from 'clsx';

import BlobClient from '../../services/blob';

const Carousel = (version) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);
  const [blobs, setBlobs] = useState([]);
  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };
  const moveNext = () => {
    if (carousel.current !== null && currentIndex < version?.version?.length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };
  const isDisabled = (direction) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return currentIndex >= version?.version?.length - 1;
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  const GetPage = (page) => {
    useEffect(() => {
      if (page !== undefined) {
        BlobClient.listBlobs({ prefix: page })?.then((res) => {
          setBlobs(res[0].name);
        });
      }
    }, []);
    return blobs;
  };

  return (
    <div className="carousel h-full w-full">
      <div className="whitespace-nowrap text-2xl font-medium">
        {version?.version?.length === 0 ? '無' : version?.version[currentIndex].description}
      </div>
      <div className="relative flex h-full w-full content-between self-stretch overflow-hidden ">
        <div className="top left absolute flex h-5/6 w-full content-between items-center justify-between self-stretch">
          <button
            className="z-10 m-0  h-8 w-8 p-0 text-center text-white opacity-75 transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:text-gray-500 disabled:opacity-80"
            onClick={movePrev}
            disabled={isDisabled('prev')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="-ml-0 h-8 w-8 rounded-full  bg-gray-600 hover:bg-gray-600/75 hover:opacity-100 "
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
            className="z-10 m-0  h-8 w-8 p-0 text-center text-white opacity-75 transition-all duration-300 ease-in-out disabled:cursor-not-allowed  disabled:text-gray-500 disabled:opacity-80"
            onClick={moveNext}
            disabled={isDisabled('next')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="-ml-0 h-8 w-8 rounded-full bg-gray-600 hover:bg-gray-600/75 hover:opacity-100 "
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
          className="carousel-container relative z-0 mx-24 flex h-full w-full touch-pan-x snap-x snap-mandatory overflow-hidden scroll-smooth "
        >
          {version?.version?.map((data, index) => {
            const page = data.version + '/' + data.playbook_page + '.png';
            GetPage(page);
            return (
              <div key={index} className="carousel-item relative m-4 h-full snap-start gap-1 text-center">
                <div
                  className="z-0 mx-3 block aspect-square h-5/6 w-[calc(100vw-30rem)] border-2 border-white bg-cover bg-left-top bg-no-repeat bg-origin-padding"
                  style={{
                    backgroundImage: `url(${BlobClient.getImageLink(GetPage(page))})`,
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="z-31 absolute bottom-16 left-1/2 flex -translate-x-1/2 space-x-3">
        {version?.version?.map((version, index) => {
          if (currentIndex === index) {
            return <button key={index} type="button" className="h-3 w-3 rounded-full bg-white"></button>;
          } else {
            return (
              <button
                key={index}
                type="button"
                className="h-3 w-3 rounded-full bg-gray-500"
                onClick={() => setCurrentIndex(index)}
              ></button>
            );
          }
        })}
      </div>
      <div className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 space-x-3 whitespace-nowrap text-xl">
        {version?.version.length === 0 ? '無' : version?.version[currentIndex].detail}
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
