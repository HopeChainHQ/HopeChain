import { useEffect, useState, Fragment } from "react"

import DisasterArtifact from "../../contracts/DisasterDonate.json"
import contractAddress from "../../contracts/contract-address.json"

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
			<main className='text-center text-3xl'>Admin - {selectedAddress}</main>
			<form className='w-3/4 mx-auto mt-5'>
				<div className='space-y-12 sm:space-y-16'>
					<div>
						<h2 className='text-xl font-semibold leading-7 text-gray-900'>
							Add Disaster
						</h2>

						<div className='mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0'>
							<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
								<label
									htmlFor='first-name'
									className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
									Name
								</label>
								<div className='mt-2 sm:col-span-2 sm:mt-0'>
									<input
										type='text'
										name='first-name'
										id='first-name'
										value={name}
										onChange={(e) => setName(e.target.value)}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
									/>
								</div>
							</div>

							<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
								<label
									htmlFor='first-name'
									className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
									Severity
								</label>
								<div className='mt-2 sm:col-span-2 sm:mt-0'>
									<input
										type='text'
										name='first-name'
										id='first-name'
										value={severity}
										onChange={(e) => setSeverity(e.target.value)}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
									/>
								</div>
							</div>

							<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
								<label
									htmlFor='first-name'
									className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
									Description
								</label>
								<div className='mt-2 sm:col-span-2 sm:mt-0'>
									<input
										type='text'
										name='first-name'
										id='first-name'
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
									/>
								</div>
							</div>

							<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
								<label
									htmlFor='first-name'
									className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
									Affected Areas
								</label>
								<div className='mt-2 sm:col-span-2 sm:mt-0'>
									<input
										type='text'
										name='first-name'
										id='first-name'
										value={affectedAreas}
										onChange={(e) => setAffectedAreas(e.target.value)}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
									/>
								</div>
							</div>

							<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
								<label
									htmlFor='country'
									className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
									Disaster Type
								</label>
								<div className='mt-2 sm:col-span-2 sm:mt-0'>
									<select
										id='country'
										name='country'
										value={disasterType}
										onChange={(e) => setDisasterType(e.target.value)}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'>
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
								</div>
							</div>

							<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
								<label
									htmlFor='first-name'
									className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
									Affected People Count
								</label>
								<div className='mt-2 sm:col-span-2 sm:mt-0'>
									<input
										type='number'
										name='first-name'
										id='first-name'
										value={affectedPeopleCount}
										onChange={(e) => setAffectedPeopleCount(e.target.value)}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
									/>
								</div>
							</div>

							<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
								<label
									htmlFor='first-name'
									className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
									Target Collection Amount
								</label>
								<div className='mt-2 sm:col-span-2 sm:mt-0'>
									<input
										type='number'
										name='first-name'
										id='first-name'
										value={targetCollectionAmount}
										onChange={(e) => setTargetCollectionAmount(e.target.value)}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
									/>
								</div>
							</div>

							<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
								<label
									htmlFor='first-name'
									className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
									Relief Organizations
								</label>
								<div className='mt-2 sm:col-span-2 sm:mt-0'>
									<input
										type='text'
										name='first-name'
										id='first-name'
										value={reliefOrganizations}
										onChange={(e) => setReliefOrganizations(e.target.value)}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='mt-6 flex items-center justify-end gap-x-6'>
					<button
						type='submit'
						onClick={handleAddDisaster}
						className='inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Add Disaster
					</button>
				</div>
			</form>
			<form className='w-3/4 mx-auto mt-5'>
				<div className='space-y-12 sm:space-y-16'>
					<div>
						<h2 className='text-xl font-semibold leading-7 text-gray-900'>
							Add Organization
						</h2>

						<div className='mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0'>
							<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
								<label
									htmlFor='first-name'
									className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
									Organization Name
								</label>
								<div className='mt-2 sm:col-span-2 sm:mt-0'>
									<input
										type='text'
										name='first-name'
										id='first-name'
										value={organizationName}
										onChange={(e) => setOrganizationName(e.target.value)}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
									/>
								</div>
							</div>

							<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
								<label
									htmlFor='first-name'
									className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
									Organization Address
								</label>
								<div className='mt-2 sm:col-span-2 sm:mt-0'>
									<input
										type='text'
										name='first-name'
										id='first-name'
										value={organizationAddress}
										onChange={(e) => setOrganizationAddress(e.target.value)}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='mt-6 flex items-center justify-end gap-x-6'>
					<button
						type='submit'
						onClick={handleAddOrganization}
						className='inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Add Organization
					</button>
				</div>
			</form>
			<form className='w-3/4 mx-auto mt-5'>
				<div className='space-y-12 sm:space-y-16'>
					<div>
						<h2 className='text-xl font-semibold leading-7 text-gray-900'>
							Add Organization to Disaster
						</h2>

						<div className='mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0'>
							<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
								<label
									htmlFor='first-name'
									className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
									Disaster Id
								</label>
								<div className='mt-2 sm:col-span-2 sm:mt-0'>
									<input
										type='text'
										name='first-name'
										id='first-name'
										value={disasterId}
										onChange={(e) => setDisasterId(e.target.value)}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
									/>
								</div>
							</div>

							<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
								<label
									htmlFor='first-name'
									className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
									Organization Address
								</label>
								<div className='mt-2 sm:col-span-2 sm:mt-0'>
									<input
										type='text'
										name='first-name'
										id='first-name'
										value={organizationAddress}
										onChange={(e) => setOrganizationAddress(e.target.value)}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='mt-6 flex items-center justify-end gap-x-6'>
					<button
						type='submit'
						onClick={handleAddOrganizationToDisaster}
						className='inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Add Organization to Disaster
					</button>
				</div>
			</form>
			<form className='w-3/4 mx-auto mt-5'>
				<div className='space-y-12 sm:space-y-16'>
					<div>
						<h2 className='text-xl font-semibold leading-7 text-gray-900'>
							Delete Disaster
						</h2>

						<div className='mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0'>
							<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
								<label
									htmlFor='first-name'
									className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
									Disaster Id
								</label>
								<div className='mt-2 sm:col-span-2 sm:mt-0'>
									<input
										type='text'
										name='first-name'
										id='first-name'
										value={disasterId}
										onChange={(e) => setDisasterId(e.target.value)}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='mt-6 flex items-center justify-end gap-x-6'>
					<button
						type='submit'
						onClick={deleteDisaster}
						className='inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Delete Disaster
					</button>
				</div>
			</form>
		</Fragment>
	)
}

export default Admin
