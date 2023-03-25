import React from "react";
import { Timeline, Carousel, Card } from "flowbite-react";

const AboutUs = () => {
  return (
    <>
      <div className="p-4 m-4 bg-Mint">
        <h5
          className="px-4 pb-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
          id="about"
        >
          MISSION
        </h5>
        <p className="px-8 font-normal text-gray-700 dark:text-gray-400">
          Our mission is to provide a secure, decentralized donation collection
          app that connects donors directly to trusted relief organizations and
          NGOs working towards helping people affected by disasters. We strive
          to create a transparent platform that facilitates the effective
          distribution of funds to those in need while giving donors the
          opportunity to make an impact in a meaningful way.
        </p>
      </div>
      <div className="p-4 m-4 bg-Mint">
        <h5 className="px-4 pb-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          VISION
        </h5>
        <p className="px-8 font-normal text-gray-700 dark:text-gray-400">
          To create a world where every person affected by a disaster receives
          the aid they need through a transparent and decentralized donation
          platform that empowers individuals to make a difference.
        </p>
      </div>
      <div className="p-4 m-4 bg-Mint">
        <h5 className="px-4 pb-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          VALUES
        </h5>
        <ul className="px-8 list-disc list-outside">
          <li className="text-gray-700">
            <span className="pr-2 font-bold text-Jet">Transparency</span>
            We value transparency in all our operations, from the collection of
            donations to the distribution of funds. We believe that every donor
            should know how their contribution is being used and should have
            access to information about the organizations they are supporting.
          </li>

          <li className="text-gray-700">
            <span className="pr-2 font-bold text-Jet">Decentralization</span>
            We believe in the principles of decentralization, which empower
            individuals to have greater control over their own data and
            resources, and enable more equitable and democratic decision-making.
          </li>

          <li className="text-gray-700">
            <span className="pr-2 font-bold text-Jet">Accountability</span>
            We hold ourselves accountable for the efficient and effective
            distribution of donations to those in need. We work to ensure that
            our platform is free from corruption, fraud, and misuse of funds.
          </li>

          <li className="text-gray-700">
            <span className="pr-2 font-bold text-Jet">Empowerment</span>
            We value the empowerment of individuals and communities through
            decentralization, recognizing that it can enable greater access to
            resources and opportunities, and foster a sense of ownership and
            agency over one's own life and future.
          </li>

          <li className="text-gray-700">
            <span className="pr-2 font-bold text-Jet">Collaboration</span>
            We work in collaboration with relief organizations and NGOs to
            maximize the impact of our donations. We believe that by working
            together, we can create a better world for those affected by
            disasters.
          </li>

          <li className="text-gray-700">
            <span className="pr-2 font-bold text-Jet">Innovation</span>
            We are committed to continuous improvement and innovation in all
            aspects of our platform. We strive to use the latest technologies to
            create a better donation experience for our users while maintaining
            the highest standards of security and privacy.
          </li>

          <li className="text-gray-700">
            <span className="pr-2 font-bold text-Jet">Trust</span>
            We prioritize trust as a core value, recognizing that the
            transparency and security enabled by decentralization are essential
            for building trust within decentralized communities.
          </li>

          <li className="text-gray-700">
            <span className="pr-2 font-bold text-Jet">Resilience</span>
            We believe in the resilience of decentralized networks, which are
            designed to be more resistant to failures and attacks, and we
            prioritize building decentralized systems that can withstand
            challenges and adapt to changing circumstances.
          </li>

          <li className="text-gray-700">
            <span className="pr-2 font-bold text-Jet">Privacy</span>
            We prioritize privacy as a core value within decentralized
            ecosystems, recognizing that individuals should have control over
            their own data and the ability to maintain their own privacy and
            security.
          </li>
        </ul>
      </div>

      <div className="p-4 m-4 bg-Mint">
        <h5 className="px-4 pb-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          HOW WE OPERATE
        </h5>
        <p className="px-8 font-normal text-gray-700 dark:text-gray-400">
          At HopeChain, we're on a mission to create a more transparent and
          decentralized way to give back. Our platform connects donors directly
          to trusted relief organizations and NGOs working towards helping
          people affected by disasters. Here's how it works:
          <Timeline className="my-4">
            <Timeline.Item>
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time>Step 1</Timeline.Time>
                <Timeline.Title>Choose a cause</Timeline.Title>
                <Timeline.Body>
                  Browse through our list of relief organizations and NGOs to
                  find a cause that resonates with you.
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time>Step 2</Timeline.Time>
                <Timeline.Title>Make a donation</Timeline.Title>
                <Timeline.Body>
                  Use our secure donation platform to contribute directly to the
                  organization you choose.
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time>Step 3</Timeline.Time>
                <Timeline.Title>Track your impact</Timeline.Title>
                <Timeline.Body>
                  We provide real-time updates on how your donation is being
                  used and the impact it's making.
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time>Step 4</Timeline.Time>
                <Timeline.Title>Connect with the community</Timeline.Title>
                <Timeline.Body>
                  Join our community of like-minded individuals who are
                  passionate about giving back in a decentralized and
                  transparent way.
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
          We believe that by working together, we can create a better world for
          those affected by disasters. Join us today and make a difference in
          someone's life.
        </p>
      </div>

      <div className="p-4 m-4 bg-Mint" id="impact">
        <h5 className="px-4 pb-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          IMPACT STORIES
        </h5>
        <div className="h-48 sm:h-56 xl:h-72 2xl:h-80">
          <Carousel
            indicators={false}
            leftControl="<"
            rightControl=">"
            slideInterval={5000}
          >
            <Card
              horizontal={true}
              imgSrc="https://flowbite.com/docs/images/blog/image-4.jpg"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Hope in the Face of Adversity
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                A single mother recounts how HopeChain's reserve fund helped her
                provide for her family during a natural disaster.
              </p>
            </Card>
            <Card
              horizontal={true}
              imgSrc="https://flowbite.com/docs/images/blog/image-4.jpg"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                "From Devastation to Recovery"
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {" "}
                - A small business owner shares how HopeChain's financial aid
                saved her livelihood when her shop was destroyed by a storm.
              </p>
            </Card>

            <Card
              horizontal={true}
              imgSrc="https://www.habitat.org/sites/default/files/styles/2_1_xsmall/public/2016-09/disaster-volunteers-rebuild-nepal-earthquake.jpg?itok=RuNSOUfL"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                "Rebuilding Lives with HopeChain"
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {" "}
                - A community leader describes how the app's reserve funds
                helped his neighborhood recover from a devastating wildfire.
              </p>
            </Card>

            <Card
              horizontal={true}
              imgSrc="https://www.shutterstock.com/image-photo/smiling-student-girl-wearing-school-260nw-1959608329.jpg"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                "Empowering Dreams with HopeChain"
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {" "}
                - A student shares how the app's financial aid allowed her to
                continue her education after her family lost everything in a
                flood.
              </p>
            </Card>

            <Card
              horizontal={true}
              imgSrc="https://flowbite.com/docs/images/blog/image-4.jpg"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                "Finding Hope in the Midst of Chaos"
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {" "}
                - A volunteer tells the story of how HopeChain's reserve funds
                helped her provide critical support to those in need after a
                tornado struck her town.
              </p>
            </Card>

            <Card
              horizontal={true}
              imgSrc="https://www.lifesecure.com/wp-content/uploads/2019/03/STOP-5.png"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                "A Beacon of Hope"
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {" "}
                - A disaster relief worker shares how HopeChain's reserve fund
                provided essential resources for those affected by a hurricane.
              </p>
            </Card>

            <Card
              horizontal={true}
              imgSrc="https://www.financialexpress.com/wp-content/uploads/2019/04/farmer-distressed-1.jpg"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                "Rising Above the Storm with HopeChain"
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {" "}
                - A farmer tells the story of how the app's financial aid helped
                her replant her crops after a severe drought.
              </p>
            </Card>

            <Card
              horizontal={true}
              imgSrc="https://www.habitat.org/sites/default/files/styles/2_1_xsmall/public/2016-09/disaster-volunteers-rebuild-nepal-earthquake.jpg?itok=RuNSOUfL"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                "Rebuilding Homes and Communities with HopeChain"
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {" "}
                - A construction worker shares how the app's reserve funds
                helped his team rebuild homes destroyed by a flood.
              </p>
            </Card>

            <Card
              horizontal={true}
              imgSrc="https://images.hindustantimes.com/img/2021/07/25/550x309/AFP_9G68UF_1627237522776_1627237546659.jpg"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                "Restoring Hope after a Crisis"
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {" "}
                - A survivor of a massive earthquake shares how HopeChain's
                financial aid helped her family start anew.
              </p>
            </Card>

            <Card
              horizontal={true}
              imgSrc="https://s.yimg.com/ny/api/res/1.2/MVPsldkAc44kzwUEjkTq6g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2MA--/https://media.zenfs.com/en/euronews_uk_articles_973/dca34ede3eb208dc37db137a1406d9a0"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                "Hope in Action"
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {" "}
                - A first responder recounts how the app's reserve funds helped
                her team provide critical aid to those affected by a natural
                disaster.
              </p>
            </Card>
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
