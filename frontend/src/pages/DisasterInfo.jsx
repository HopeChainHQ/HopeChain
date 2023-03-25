import React from "react";
import Nav from "../components/Nav";
import { Progress, Accordion } from "flowbite-react";
import Divider from "../components/Divider";
import FloodImage from "../assets/images/Disasters/Flood.jpg";
import {
  LifebuoyIcon,
  NewspaperIcon,
  EnvelopeIcon,
  WalletIcon,
  PhoneIcon,
} from "@heroicons/react/20/solid";

const DisasterInfo = ({ id }) => {
  let totalDonation = 45;
  let targetDonation = 100;
  const organizationList = [
    {
      name: "Jane Cooper",
      title: "Regional Paradigm Technician",
      role: "NGO",
      email: "janecooper@example.com",
      wallet: "+1-202-555-0170",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
  ];
  const contactCards = [
    {
      name: "Emergency Support",
      description:
        "Consectetur vel non. Rerum ut consequatur nobis unde. Enim est quo corrupti consequatur.",
      icon: PhoneIcon,
    },
    {
      name: "Technical Support",
      description:
        "Quod possimus sit modi rerum exercitationem quaerat atque tenetur ullam.",
      icon: LifebuoyIcon,
    },
    {
      name: "Media Inquiries",
      description:
        "Ratione et porro eligendi est sed ratione rerum itaque. Placeat accusantium impedit eum odit.",
      icon: NewspaperIcon,
    },
  ];
  return (
    <>
      <Nav isHome={"disasterInfo"} />
      <img src={FloodImage} className="mt-[70px] h-[600px] w-full" />
      <div className="shadow-lg flex flex-col items-center justify-center p-6 rounded-full w-1/2 mx-auto bg-Celadon -translate-y-12 h-24">
        <p>
          Achieved{" "}
          <span className="text-xl font-bold text-Jet"> {totalDonation} </span>{" "}
          out of Target
          <span className="text-xl font-bold text-Jet"> {targetDonation} </span>
        </p>
      </div>
      {/* <Progress
        progress={(totalDonation / targetDonation) * 100}
        color="green"
        className="w-1/2 mx-auto -transalte-y-24 z-20"
      /> */}

      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 my-8 mx-12 md:mx-16 lg:mx-24 xl:mx-28"
      >
        {organizationList.map((org) => (
          <li
            key={org.email}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">
                    {org.name}
                  </h3>
                  <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    {org.role}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">
                  {org.title}
                </p>
              </div>
              <img
                className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                src={org.imageUrl}
                alt=""
              />
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <a
                    href={`mailto:${org.email}`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <EnvelopeIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Email
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    href={`tel:${org.wallet}`}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30px"
                      height="30px"
                      viewBox="0,0,256,256"
                      className="h-5 w-5"
                    >
                      <g
                        fill="#9ca3af"
                        fillRule="nonzero"
                        stroke="none"
                        strokeWidth="1"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        strokeMiterlimit="10"
                        strokeDasharray=""
                        strokeDashoffset="0"
                        fontFamily="none"
                        fontWeight="none"
                        fontSize="none"
                        textAnchor="none"
                        style={{ "mix-blend-mode": "normal" }}
                      >
                        <g transform="scale(8.53333,8.53333)">
                          <path d="M19,2l-9.75781,4.15039l-0.00195,0.00195c-0.38719,0.15983 -0.71443,0.4372 -0.93555,0.79297l-0.00391,0.00195l-0.04492,0.07422c-0.00461,0.00778 -0.00917,0.01559 -0.01367,0.02344l-2.91406,4.85938v0.00195c-0.21334,0.32495 -0.32737,0.70503 -0.32812,1.09375c0.0001,0.32317 0.07851,0.64149 0.22852,0.92773l1.92773,3.41016l0.01953,-0.01172c0.386,-1.423 1.44236,-2.55683 2.81836,-3.04883l-0.45117,-0.84766l2.57617,-2.30469h4.125l-1.9043,2.85742l-4.11523,2.36719l0.00195,0.00195c-0.75937,0.44949 -1.22553,1.26601 -1.22656,2.14844c0,1.38071 1.11929,2.5 2.5,2.5c0.36166,-0.00084 0.71884,-0.08014 1.04688,-0.23242v0.00195l0.03516,-0.01758c0.0309,-0.01435 0.06151,-0.02932 0.0918,-0.04492l7.89063,-3.94727c0.0476,-0.02196 0.0945,-0.04541 0.14063,-0.07031l0.00391,-0.00391c0.38984,-0.21597 0.71486,-0.53222 0.94141,-0.91602l0.00781,-0.00781l0.01367,-0.02734c0.05037,-0.08769 0.09538,-0.17835 0.13477,-0.27148l4.19336,-8.46289zM7.01367,19.32422c-0.636,0.898 -1.01367,1.99178 -1.01367,3.17578c0,3.038 2.462,5.5 5.5,5.5c3.038,0 5.5,-2.462 5.5,-5.5c0,-0.561 -0.08423,-1.10328 -0.24023,-1.61328c-1.862,0.932 -3.52259,1.76144 -3.55859,1.77344c-0.547,0.226 -1.11817,0.33984 -1.70117,0.33984c-2.196,0 -4.02987,-1.58006 -4.42187,-3.66406c-0.022,-0.001 -0.04245,-0.00972 -0.06445,-0.01172z"></path>
                        </g>
                      </g>
                    </svg>
                    {/* <WalletIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    /> */}
                    Donate
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        <svg
          viewBox="0 0 1097 845"
          aria-hidden="true"
          className="hidden transform-gpu blur-3xl sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:w-[68.5625rem]"
        >
          <path
            fill="url(#7c63f5ae-130c-4c0f-963f-50ac7fe8d2e1)"
            fillOpacity=".2"
            d="M301.174 646.641 193.541 844.786 0 546.172l301.174 100.469 193.845-356.855c1.241 164.891 42.802 431.935 199.124 180.978 195.402-313.696 143.295-588.18 284.729-419.266 113.148 135.13 124.068 367.989 115.378 467.527L811.753 372.553l20.102 451.119-530.681-177.031Z"
          />
          <defs>
            <linearGradient
              id="7c63f5ae-130c-4c0f-963f-50ac7fe8d2e1"
              x1="1097.04"
              x2="-141.165"
              y1=".22"
              y2="363.075"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#776FFF" />
              <stop offset={1} stopColor="#FF4694" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          viewBox="0 0 1097 845"
          aria-hidden="true"
          className="absolute left-1/2 -top-52 -z-10 w-[68.5625rem] -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        >
          <path
            fill="url(#49c00522-612e-41d3-bb32-ce7d1fa28850)"
            fillOpacity=".2"
            d="M301.174 646.641 193.541 844.786 0 546.172l301.174 100.469 193.845-356.855c1.241 164.891 42.802 431.935 199.124 180.978 195.402-313.696 143.295-588.18 284.729-419.266 113.148 135.13 124.068 367.989 115.378 467.527L811.753 372.553l20.102 451.119-530.681-177.031Z"
          />
          <defs>
            <linearGradient
              id="49c00522-612e-41d3-bb32-ce7d1fa28850"
              x1="1097.04"
              x2="-141.165"
              y1=".22"
              y2="363.075"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#776FFF" />
              <stop offset={1} stopColor="#FF4694" />
            </linearGradient>
          </defs>
        </svg>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Support center
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
            {contactCards.map((card) => (
              <div
                key={card.name}
                className="flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10"
              >
                <card.icon
                  className="h-7 w-5 flex-none text-indigo-400"
                  aria-hidden="true"
                />
                <div className="text-base leading-7">
                  <h3 className="font-semibold text-white">{card.name}</h3>
                  <p className="mt-2 text-gray-300">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Divider text={"FAQs"} />
      <Accordion
        alwaysOpen={true}
        className="my-8 mx-12 md:mx-16 lg:mx-24 xl:mx-28"
      >
        <Accordion.Panel>
          <Accordion.Title>What is HopeCoin?</Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              HopeCoin is an open-source library of interactive components built
              on top of Tailwind CSS including buttons, dropdowns, modals,
              navbars, and more.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Check out this guide to learn how to
              <a
                href="https://HopeCoin.com/docs/getting-started/introduction/"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                get started
              </a>
              and start developing websites even faster with components on top
              of Tailwind CSS.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Is there a Figma file available?</Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              HopeCoin is first conceptualized and designed using the Figma
              software so everything you see in the library has a design
              equivalent in our Figma file.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Check out the
              <a
                href="https://HopeCoin.com/figma/"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                Figma design system
              </a>
              based on the utility classes from Tailwind CSS and components from
              HopeCoin.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            What are the differences between HopeCoin and Tailwind UI?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              The main difference is that the core components from HopeCoin are
              open source under the MIT license, whereas Tailwind UI is a paid
              product. Another difference is that HopeCoin relies on smaller and
              standalone components, whereas Tailwind UI offers sections of
              pages.
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              However, we actually recommend using both HopeCoin, HopeCoin Pro,
              and even Tailwind UI as there is no technical reason stopping you
              from using the best of two worlds.
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Learn more about these technologies:
            </p>
            <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
              <li>
                <a
                  href="https://HopeCoin.com/pro/"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  HopeCoin Pro
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindui.com/"
                  rel="nofollow"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  Tailwind UI
                </a>
              </li>
            </ul>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </>
  );
};

export default DisasterInfo;
