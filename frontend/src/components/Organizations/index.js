import { useEffect, useState, Fragment } from "react"
import { useParams } from "react-router-dom"

import DisasterArtifact from "../../contracts/DisasterDonate.json"
import contractAddress from "../../contracts/contract-address.json"

import "./Organizations.css"

import {
	donate,
	// etherToWei,
	getDisaster,
	getOrganization,
} from "../../utils"
import {
	useContract,
	useContractRead,
	useContractWrite,
	useNetwork,
	useWallet,
} from "../../hooks"
import { NoWalletDetected, ConnectWallet } from "../Wallet"

const Organizations = (props) => {
	const { id: disasterId } = useParams()
	// The info of the token (i.e. It's Name and symbol)
	const [loading, setLoading] = useState(true)
	const [organizations, setOrganizations] = useState()
	const [organizationDatas, setOrganizationDatas] = useState()
	const [donationAmount, setDonationAmount] = useState(0)

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
	const { readMethod } = useContractRead()
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

	const _updateDisasters = async () => {
		const disaster = await readMethod(contract, getDisaster, {
			disasterId: disasterId,
		})
		if (!disaster || disaster?.length === 0) {
			setLoading(false)
			return
		}
		setOrganizations(disaster[7])
	}

	useEffect(() => {
		if (!organizations) return
		if (organizations && organizations?.length === 0) {
			setLoading(false)
			return
		}
		_updateOrganizationsData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [organizations])

	const _updateOrganizationsData = async () => {
		var temporganizationDatas = await Promise.all(
			organizations.map(async (org) => {
				const organizationData = await readMethod(contract, getOrganization, {
					organization: org,
				})
				return organizationData
			})
		)
		setOrganizationDatas(temporganizationDatas)
		setLoading(false)
	}

	const handleDonation = async (organization) => {
		const donation = await updateMethod(contract, donate, {
			disasterId: disasterId,
			organization: organization,
			amount: donationAmount,
		})
		console.log(donation)
	}

	useEffect(() => {
		if (contract) {
			_updateDisasters()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contract])

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
			<main>
				{loading && <h1>Loading...</h1>}
				{!loading && !organizationDatas && (
					<h1>No Organizations for the relief fund</h1>
				)}
				{organizationDatas &&
					organizationDatas.map((organizationData, index) => (
						<div className='organization' key={index}>
							<h1>{organizationData[0]}</h1>
							<h2>{organizationData[1].toString()}</h2>
							<label>Donation Amount (In MATIC)</label>
							<input
								type='number'
								value={donationAmount}
								onChange={(e) => setDonationAmount(e.target.value)}
							/>
							<button onClick={() => handleDonation(organizations[index])}>
								Donate
							</button>
						</div>
					))}
			</main>
		</Fragment>
	)
}

export default Organizations
