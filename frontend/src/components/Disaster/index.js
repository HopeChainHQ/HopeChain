import { useEffect, useState, Fragment } from "react"

import DisasterArtifact from "../../contracts/DisasterDonate.json"
import contractAddress from "../../contracts/contract-address.json"

import "./Disaster.css"

import {
	// etherToWei,
	getAllDisasterData,
} from "../../utils"
import { useContract, useContractRead } from "../../hooks"

const Disaster = () => {
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
			<main>{JSON.stringify(disasters)}</main>
		</Fragment>
	)
}

export default Disaster
