import React from "react"
import Nav from "../components/Nav"
import DisasterSlider from "../components/DisasterSlider"
import Stats from "../components/Stats"
import Quotes from "../components/Quotes"
import Divider from "../components/Divider"
import AboutUs from "../components/AboutUs"
import Footer from "../components/_Footer"

const Home = () => {
	return (
		<>
			<Nav location={"Home"} />
			<DisasterSlider />
			{/* A button rounded in center to donate to relief fund */}
			<div className='flex justify-center items-center'>
				<button
					type='button'
					onClick={() =>
						alert(
							"Donate to relief fund will be integrated soon. Please go ahead and click on a disaster to donate to the relief fund."
						)
					}
					className='w-full mt-3 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-Erin text-base font-medium text-black hover:bg-Erin focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-Erin sm:w-auto sm:text-sm'>
					Donate to Emergency Relief Funds
				</button>
			</div>
			<Stats />
			<Quotes />
			<Divider text='About Us' />
			<AboutUs />
			<Footer />
		</>
	)
}

export default Home
