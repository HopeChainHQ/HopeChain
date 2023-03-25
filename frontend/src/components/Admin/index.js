import { useEffect, useState, Fragment } from "react"

import DisasterArtifact from "../../contracts/DisasterDonate.json"
import contractAddress from "../../contracts/contract-address.json"

import "./Admin.css"

import {
	createDisaster,
	createOrganization,
	addOrganizationToDisaster,
	deleteDisaster,
} from "../../utils"
import {
	useContract,
	useContractWrite,
	useNetwork,
	useWallet,
} from "../../hooks"
import { NoWalletDetected, ConnectWallet } from "../Wallet"

const Admin = () => {
	// The info of the token (i.e. It's Name and symbol)
	const [disasterType, setDisasterType] = useState("")
	const [name, setName] = useState("")
	const [severity, setSeverity] = useState("")
	const [description, setDescription] = useState("")
	const [affectedAreas, setAffectedAreas] = useState("")
	const [affectedPeopleCount, setAffectedPeopleCount] = useState(0)
	const [targetCollectionAmount, setTargetCollectionAmount] = useState(0)
	const [reliefOrganizations, setReliefOrganizations] = useState([])

	const [organizationName, setOrganizationName] = useState("")
	const [organizationAddress, setOrganizationAddress] = useState("")

	const [disasterId, setDisasterId] = useState(0)

	// The user's address ffand balance
	const {
		setCurrentNetworkId,
		networkError,
		setNetworkError,
		_checkNetwork,
		_dismissNetworkError,
	} = useNetwork()
	const { selectedAddress, setSelectedAddress } = useWallet(setCurrentNetworkId)
	const { contract, initializeContract } = useContract()
	const { updateMethod, setTransactionError, setTxBeingSent } =
		useContractWrite()

	useEffect(() => {
		const init = async () => {
			await _connectWallet()
		}
		init()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (selectedAddress === undefined) {
			_resetState()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedAddress])

	const _initialize = async (userAddress) => {
		// This method initializes the dapp

		// We first store the user's address in the component's state
		setSelectedAddress(userAddress)

		// Fetching the token data and the user's balance are specific to this
		// sample project, but you can reuse the same initialization pattern.
		_intializeEthers()
	}

	const _intializeEthers = () => {
		initializeContract({
			address: contractAddress.DisasterDonate,
			abi: DisasterArtifact.abi,
		})
	}

	const _connectWallet = async () => {
		// This method is run when the user clicks the Connect. It connects the
		// dapp to the user's wallet, and initializes it.

		// To connect to the user's wallet, we have to run this method.
		// It returns a promise that will resolve to the user's address.
		try {
			// This opens a Metamask wallet popup, requesting the user to connect to their wallets
			const [selectedAddress] = await window.ethereum.request({
				method: "eth_requestAccounts",
			})

			// Once we have the address, we can initialize the application.

			// First we check the network
			if (!_checkNetwork()) {
				return
			}

			_initialize(selectedAddress)
		} catch (err) {
			// https://github.com/MetaMask/metamask-extension/issues/10085
			// There is an issue where the metamask wallet doesn't reopen
			// if it was accidentally closed the first time
			// the metamask team is working on a [fix](https://github.com/MetaMask/metamask-extension/issues/10085#issuecomment-768661193),
			// but in the meantime, alert the user to manually open the metamask wallet and
			// unlock their wallet
			console.log(err)
			alert("Please open the Metamask wallet and unlock your wallet")
		}
	}

	const handleAddDisaster = async () => {
		try {
			await updateMethod(contract, createDisaster, {
				disasterName: name,
				severity: severity,
				disasterType: disasterType,
				description: description,
				affectedAreas: affectedAreas,
				affectedPeopleCount: affectedPeopleCount,
				targetCollectionAmount: targetCollectionAmount,
				reliefOrganizations: reliefOrganizations,
			})
		} catch (error) {
			setTransactionError(error)
		}
	}

	const handleAddOrganization = async () => {
		try {
			await updateMethod(contract, createOrganization, {
				name: organizationName,
				organization: organizationAddress,
			})
		} catch (error) {
			setTransactionError(error)
		}
	}

	const handleAddOrganizationToDisaster = async () => {
		try {
			await updateMethod(contract, addOrganizationToDisaster, {
				disasterId: disasterId,
				organization: organizationAddress,
			})
		} catch (error) {
			setTransactionError(error)
		}
	}

	const handleDeleteDisaster = async () => {
		try {
			await updateMethod(contract, deleteDisaster, {
				disasterId: disasterId,
			})
		} catch (error) {
			setTransactionError(error)
		}
	}

	const _resetState = () => {
		// The user's address and balance
		setSelectedAddress()
		// The ID about transactions being sent, and any possible error with them
		setTxBeingSent()
		setTransactionError()
		setNetworkError()
	}

	// Ethereum wallets inject the window.ethereum object. If it hasn't been
	// injected, we instruct the user to install MetaMask.
	if (window.ethereum === undefined) {
		return <NoWalletDetected />
	}

	// The next thing we need to do, is to ask the user to connect their wallet.
	// When the wallet gets connected, we are going to save the users's address
	// in the component's state. So, if it hasn't been saved yet, we have
	// to show the ConnectWallet component.
	//
	// Note that we pass it a callback that is going to be called when the user
	// clicks a button. This callback just calls the _connectWallet method.
	if (!selectedAddress) {
		return (
			<ConnectWallet
				connectWallet={_connectWallet}
				networkError={networkError}
				dismiss={_dismissNetworkError}
			/>
		)
	}

	return (
		<Fragment>
			<main>Admin - {selectedAddress}</main>
			<h1>Add Disaster</h1>
			<form>
				<label>
					Disaster Type:
					{/* 1. Earthquake
                    2. Tsunami
                    3. Hurricane/Cyclone
                    4. Wildfire
                    5. Flood
                    6. Drought
                    7. Oil Spillage
                    8. Human Caused 
                    9. Infectious Disease Outbreak */}
					<select
						value={disasterType}
						onChange={(e) => setDisasterType(e.target.value)}>
						<option value='earthquake'>Earthquake</option>
						<option value='tsunami'>Tsunami</option>
						<option value='hurricane'>Hurricane/Cyclone</option>
						<option value='wildfire'>Wildfire</option>
						<option value='flood'>Flood</option>
						<option value='drought'>Drought</option>
						<option value='oilSpillage'>Oil Spillage</option>
						<option value='humanCaused'>Human Caused</option>
						<option value='infectiousDiseaseOutbreak'>
							Infectious Disease Outbreak
						</option>
					</select>
				</label>
				<label>
					Name:
					<input
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
				<label>
					Severity:
					<input
						type='text'
						value={severity}
						onChange={(e) => setSeverity(e.target.value)}
					/>
				</label>
				<label>
					Description:
					<input
						type='text'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</label>
				<label>
					Affected Areas:
					<input
						type='text'
						value={affectedAreas}
						onChange={(e) => setAffectedAreas(e.target.value)}
					/>
				</label>
				<label>
					Affected People Count:
					<input
						type='number'
						value={affectedPeopleCount}
						onChange={(e) => setAffectedPeopleCount(e.target.value)}
					/>
				</label>
				<label>
					Target Collection Amount:
					<input
						type='number'
						value={targetCollectionAmount}
						onChange={(e) => setTargetCollectionAmount(e.target.value)}
					/>
				</label>
				<label>
					Relief Organizations:
					<input
						type='text'
						value={reliefOrganizations}
						onChange={(e) => setReliefOrganizations(e.target.value)}
					/>
				</label>
				<input type='button' value='Add Disaster' onClick={handleAddDisaster} />
			</form>
			<h1>Add Organization</h1>
			<form>
				<label>
					Organization Name:
					<input
						type='text'
						value={organizationName}
						onChange={(e) => setOrganizationName(e.target.value)}
					/>
				</label>
				<label>
					Organization Address:
					<input
						type='text'
						value={organizationAddress}
						onChange={(e) => setOrganizationAddress(e.target.value)}
					/>
				</label>
				<input
					type='button'
					value='Add Organization'
					onClick={handleAddOrganization}
				/>
			</form>
			<h1>Add Organization to Disaster</h1>
			<form>
				<label>
					Disaster ID:
					<input
						type='number'
						value={disasterId}
						onChange={(e) => setDisasterId(e.target.value)}
					/>
				</label>
				<label>
					Organization Address:
					<input
						type='text'
						value={organizationAddress}
						onChange={(e) => setOrganizationAddress(e.target.value)}
					/>
				</label>
				<input
					type='button'
					value='Add Organization to Disaster'
					onClick={handleAddOrganizationToDisaster}
				/>
			</form>
			<h1>Delete Disaster</h1>
			<form>
				<label>
					Disaster ID:
					<input
						type='number'
						value={disasterId}
						onChange={(e) => setDisasterId(e.target.value)}
					/>
				</label>
				<input
					type='button'
					value='Delete Disaster'
					onClick={handleDeleteDisaster}
				/>
			</form>
		</Fragment>
	)
}

export default Admin
