import React from "react";
import { Card, Carousel } from "flowbite-react";

const Quotes = () => {
  return (
    <>
      <Carousel
        indicators={false}
        slideInterval={15000}
        className="px-24 my-8 border-none h-32"
        leftControl=""
        rightControl=""
      >
        <Card className="border-none">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span className="text-5xl">“</span>
            The power of one, if fearless and focused, is formidable, but the
            power of many working together is better.
            <span className="text-5xl">”</span>
          </h5>
          <p className="font-normal text-right text-gray-700 dark:text-gray-400">
            - Gloria Macapagal Arroyo
          </p>
        </Card>
        <Card className="border-none">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span className="text-5xl">“</span>
            You have not lived today until you have done something for someone
            who can never repay you.
            <span className="text-5xl">”</span>
          </h5>
          <p className="font-normal text-right text-gray-700 dark:text-gray-400">
            - John Bunyan
          </p>
        </Card>
        <Card className="border-none">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span className="text-5xl">“</span>
            We make a living by what we get, but we make a life by what we give.
            <span className="text-5xl">”</span>
          </h5>
          <p className="font-normal text-right text-gray-700 dark:text-gray-400">
            - Winston Churchill
          </p>
        </Card>
        <Card className="border-none">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span className="text-5xl">“</span>A single act of kindness throws
            out roots in all directions, and the roots spring up and make new
            trees.<span className="text-5xl">”</span>
          </h5>
          <p className="font-normal text-right text-gray-700 dark:text-gray-400">
            - Amelia Earhart
          </p>
        </Card>
      </Carousel>
    </>
  );
};

export default Quotes;
