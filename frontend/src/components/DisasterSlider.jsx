import React, { useEffect, useState } from "react"
import { Carousel } from "flowbite-react"
import DroughtImage from "../assets/images/Disasters/Drought.jpg"
import FloodImage from "../assets/images/Disasters/Flood.jpg"
import EarthImage from "../assets/images/Disasters/Earthquake.jpg"

import DisasterArtifact from "../contracts/DisasterDonate.json"
import contractAddress from "../contracts/contract-address.json"

import {
	// etherToWei,
	getAllDisasterData,
} from "../utils"
import { useContract, useContractRead } from "../hooks"
import { useNavigate } from "react-router-dom"

const DisasterSlider = () => {
	const navigator = useNavigate()
	// The info of the token (i.e. It's Name and symbol)
	const [disasters, setDisasters] = useState()

	const { contract, initializeContract } = useContract()
	const { readMethod } = useContractRead()

	useEffect(() => {
		_initialize()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const _initialize = async () => {
		// This method initializes the dapp

		// Fetching the Disasters are specific to this
		// sample project, but you can reuse the same initialization pattern.
		_intializeEthers()
	}

	const _intializeEthers = () => {
		initializeContract({
			address: contractAddress.DisasterDonate,
			abi: DisasterArtifact.abi,
		})
	}

	const _updateDisasters = async () => {
		const disasters = await readMethod(contract, getAllDisasterData)
		setDisasters(disasters)
	}

	useEffect(() => {
		if (contract) {
			_updateDisasters()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contract])

	const handleImageSrc = (disaster) => {
		switch (disaster) {
			case "drought":
				return DroughtImage
			case "hurricane":
				return FloodImage
			case "earthquake":
				return EarthImage
			default:
				return DroughtImage
		}
	}

	return (
		<>
			<div className='h-[21rem] sm:h-[24rem] xl:h-[90vh] my-[0px] md:my-[72px]'>
				<Carousel slideInterval={2500}>
					{disasters &&
						disasters.map((disaster, index) => (
							<div
								key={index}
								className='h-full w-full'
								onClick={() => {
									navigator(`/disaster/${index}`)
								}}>
								<img
									className='w-full h-full'
									src={handleImageSrc(disaster[1])}
									alt={disaster[1]}
								/>
								<div className='absolute bottom-5 left-5 bg-opacity-80 rounded-md bg-white p-4'>
									{/* Type of disaster */}
									<p className='text-black text-7xl uppercase'>
										{disaster[1] === "" ? "Earthquake" : disaster[1]}
									</p>
									{/* Severity */}
									<p className='text-black text-5xl capitalize'>
										{disaster[0]}
									</p>
									{/* Description */}
									{/* <p className=''>{disaster[2]}</p> */}
									{/* Affected areas */}
									<p className='text-black text-2xl'>{disaster[3]}</p>
									{/* <h5>{disaster[4].toString()}</h5>
									<h6>{disaster[5].toString()}</h6>
									<h7>{disaster[6].toString()}</h7>
									<h8>{disaster[7].toString()}</h8> */}
									<p className='text-black text-lg'>
										Click to contribute to relief
									</p>
								</div>
							</div>
						))}
				</Carousel>
			</div>
		</>
	)
}

export default DisasterSlider
