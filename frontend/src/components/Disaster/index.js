import { useEffect, useState, Fragment } from "react"

import DisasterArtifact from "../../contracts/DisasterDonate.json"
import contractAddress from "../../contracts/contract-address.json"

import "./Disaster.css"

import {
	// etherToWei,
	getAllDisasterData,
} from "../../utils"
import { useContract, useContractRead } from "../../hooks"
import { useNavigate } from "react-router-dom"

const Disaster = () => {
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

	return (
		<Fragment>
			<main>
				{disasters &&
					disasters.map((disaster, index) => (
						<div
							key={index}
							onClick={() => {
								navigator(`/disaster/${index}`)
							}}>
							<h1>{disaster[0]}</h1>
							<h2>{disaster[1]}</h2>
							<h3>{disaster[2]}</h3>
							<h4>{disaster[3]}</h4>
							<h5>{disaster[4].toString()}</h5>
							<h6>{disaster[5].toString()}</h6>
							<h7>{disaster[6].toString()}</h7>
							<h8>{disaster[7].toString()}</h8>
						</div>
					))}
			</main>
		</Fragment>
	)
}

export default Disaster
