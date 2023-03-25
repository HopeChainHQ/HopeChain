/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, useState } from "react"
import Nav from "../components/Nav"
import { Accordion, Timeline, Button } from "flowbite-react"
import Divider from "../components/Divider"
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi"
import { CheckCircleIcon } from "@heroicons/react/24/outline"
import {
	LifebuoyIcon,
	NewspaperIcon,
	EnvelopeIcon,
	PhoneIcon,
} from "@heroicons/react/20/solid"
import { useParams } from "react-router-dom"
import DroughtImage from "../assets/images/Disasters/Drought.jpg"
import FloodImage from "../assets/images/Disasters/Flood.jpg"
import EarthImage from "../assets/images/Disasters/Earthquake.jpg"

import DisasterArtifact from "../contracts/DisasterDonate.json"
import contractAddress from "../contracts/contract-address.json"

import {
	donate,
	getDonorName,
	getDisaster,
	getOrganization,
	weiToEtherAtFixedDecimal,
	copyTextToClipboard,
} from "../utils"
import {
	useContract,
	useContractRead,
	useContractWrite,
	useNetwork,
	useWallet,
} from "../hooks"
import { NoWalletDetected, ConnectWallet } from "../components/Wallet"

const DisasterInfo = () => {
	const { id: disasterId } = useParams()
	// The info of the token (i.e. It's Name and symbol)
	const [loading, setLoading] = useState(true)
	const [donorName, setDonorName] = useState()
	const [disasterData, setDisasterData] = useState()
	const [organizations, setOrganizations] = useState()
	const [organizationDatas, setOrganizationDatas] = useState()
	const [donationAmount, setDonationAmount] = useState(0)
	const [donationCurrency, setDonationCurrency] = useState("MATIC")
	const [donationSuccess, setDonationSuccess] = useState(false)

	const [showModal, setShowModal] = useState(false)
	const [modalIndex, setModalIndex] = useState(0)

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

	const _updateDonorName = async () => {
		const tempdonorName = await readMethod(contract, getDonorName, {
			donor: selectedAddress,
		})
		if (!tempdonorName) {
			setLoading(false)
			return
		}
		setDonorName(tempdonorName)
	}

	const _updateDisasters = async () => {
		const disaster = await readMethod(contract, getDisaster, {
			disasterId: disasterId,
		})
		if (!disaster || disaster?.length === 0) {
			setLoading(false)
			return
		}
		setDisasterData(disaster)
		setOrganizations(disaster[8])
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
		// eslint-disable-next-line no-unused-vars
		await updateMethod(contract, donate, {
			disasterId: disasterId,
			organization: organization,
			amount: donationAmount,
			donorName: donorName,
		})
		setDonationSuccess(true)
		setTimeout(() => {
			setModalIndex(0)
			setShowModal(false)
			setDonationSuccess(false)
			_updateDisasters()
			_updateOrganizationsData()
		}, 2000)
	}

	useEffect(() => {
		if (contract) {
			_updateDonorName()
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

	const contactCards = [
		{
			name: "Emergency Support",
			description:
				"Contact us if you need help with your account or have any questions.",
			icon: PhoneIcon,
		},
		{
			name: "Technical Support",
			description:
				"For technical support, please email us at support@hopechain.xyz",
			icon: LifebuoyIcon,
		},
		{
			name: "Register Relief Organization",
			description:
				"For getting in touch with us for registering your organization, please email us at neworg@hopechain.xyz",
			icon: NewspaperIcon,
		},
	]

	const handleImageSrc = (disaster) => {
		switch (disaster) {
			case "drought":
				return DroughtImage
			case "flood":
				return FloodImage
			case "earthquake":
				return EarthImage
			default:
				return EarthImage
		}
	}

	return (
		<>
			<Nav isHome={"disasterInfo"} />
			{loading && <h1>Loading...</h1>}
			{!loading && disasterData && disasterData.length !== 0 && (
				<>
					<div>
						<img
							src={handleImageSrc(disasterData[2])}
							className='mt-[70px] h-[600px] w-full'
							alt=''
						/>
						<div className='absolute top-20 right-5 bg-opacity-80 rounded-md bg-white p-4'>
							{/* Type of disaster */}
							<p className='text-black text-7xl uppercase'>
								{disasterData[0] === "" ? "Disaster" : disasterData[0]}
							</p>
							{/* Severity */}
							<p className='text-black text-5xl capitalize'>
								Severity - {disasterData[1]}
							</p>
							<p className='text-black text-2xl'>{disasterData[4]}</p>
						</div>
					</div>
					<div className='shadow-lg flex flex-col items-center justify-center p-6 rounded-full w-1/2 mx-auto bg-Celadon -translate-y-12 h-24'>
						<p>
							Achieved{" "}
							<span className='text-xl font-bold text-Jet'>
								{" "}
								{Number(
									weiToEtherAtFixedDecimal(disasterData[7].toString(), 3)
								) * 143996.41}{" "}
								INR
							</span>{" "}
							out of Target
							<span className='text-xl font-bold text-Jet'>
								{" "}
								{Number(
									weiToEtherAtFixedDecimal(disasterData[6].toString(), 3)
								) * 143996.41}{" "}
								INR
							</span>
						</p>
					</div>
					{/* <Progress
        progress={(totalDonation / targetDonation) * 100}
        color="green"
        className="w-1/2 mx-auto -transalte-y-24 z-20"
      /> */}

					<ul
						role='list'
						className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 my-8 mx-12 md:mx-16 lg:mx-24 xl:mx-28'>
						{!loading && !organizationDatas && (
							<h1>No Organizations for the relief fund</h1>
						)}
						{!loading && showModal && (
							<>
								<div className='fixed z-10 inset-0 overflow-y-auto w-screen h-screen bg-black bg-opacity-50'>
									<div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
										<div
											className='fixed z-10 inset-0 transition-opacity'
											onClick={() => setShowModal(false)}
											aria-hidden='true'>
											<div className='absolute inset-0 bg-gray-500 opacity-75'></div>
										</div>
										<span
											className='hidden sm:inline-block sm:align-middle sm:h-screen'
											aria-hidden='true'>
											&#8203;
										</span>
										<div
											className='inline-block relative z-20 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
											role='dialog'
											aria-modal='true'
											aria-labelledby='modal-headline'>
											<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
												{donationSuccess && (
													<div className='flex flex-col items-center justify-center'>
														<CheckCircleIcon className='h-12 w-12 text-green-400' />
														<h1 className='text-2xl font-bold text-gray-900 mt-4'>
															Donation Successful
														</h1>
														<p className='text-lg text-gray-900 mt-4'>
															Thank you for your donation!
														</p>
													</div>
												)}
												{!donationSuccess && (
													<div className='sm:flex sm:items-start flex-col'>
														<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
															<h3
																className='text-lg leading-6 font-medium text-gray-900'
																id='modal-headline'>
																Donate to {organizationDatas[modalIndex].name}
															</h3>
														</div>
														<div className='mt-3 text-center inline-flex ml-4 sm:text-left'>
															<span
																className='text-lg w-full leading-6 mt-3 text-gray-900'
																id='modal-headline'>
																Donate by Name
															</span>
															<input
																type='text'
																className='mt-1 focus:ring-Celadon focus:border-Celadon w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
																placeholder='Enter name'
																value={donorName}
																onChange={(e) => setDonorName(e.target.value)}
															/>
														</div>
														{/* Input for amount to donate */}
														<div className='mt-3 text-center inline-flex ml-4 sm:text-left'>
															<span
																className='text-lg w-full leading-6 mt-3 text-gray-900'
																id='modal-headline'>
																Amount to donate
															</span>
															<input
																type='number'
																className='mt-1 focus:ring-Celadon focus:border-Celadon w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
																placeholder='Enter amount in INR'
																value={donationAmount}
																onChange={(e) =>
																	setDonationAmount(e.target.value)
																}
															/>
															<select
																className='mt-1 ml-2 focus:ring-Celadon focus:border-Celadon w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
																value={donationCurrency}
																onChange={(e) =>
																	setDonationCurrency(e.target.value)
																}>
																<option value='ETH'>Etherium (ETH)</option>
																<option value='MATIC'>Polygon (MATIC)</option>
															</select>
														</div>
													</div>
												)}
											</div>
											<div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
												<button
													type='button'
													className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-Erin text-base font-medium text-black hover:bg-Erin focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-Erin sm:ml-3 sm:w-auto sm:text-sm'
													onClick={async () => {
														await handleDonation(organizations[modalIndex])
													}}>
													Donate
												</button>
												<button
													type='button'
													className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
													onClick={() => {
														setModalIndex(0)
														setShowModal(false)
													}}>
													Cancel
												</button>
											</div>
										</div>
									</div>
								</div>
							</>
						)}
						{organizationDatas &&
							organizationDatas.map((organizationData, index) => (
								<>
									<li
										key={index}
										className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow'>
										<div className='flex w-full items-center justify-between space-x-6 p-6'>
											<div className='flex-1 truncate'>
												<div className='flex items-center space-x-3'>
													<h3 className='truncate text-sm font-medium text-gray-900'>
														{organizationData.name}
													</h3>
													<span className='inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800'>
														NGO
													</span>
												</div>
												<p
													className='mt-1 truncate text-sm text-gray-500'
													onClick={() =>
														copyTextToClipboard(organizations[index])
													}>
													{organizations[index]}
												</p>
												<p
													className='mt-1 truncate text-sm text-gray-500'
													onClick={() =>
														copyTextToClipboard(organizations[index])
													}>
													Current Donations -{" "}
													{Number(
														weiToEtherAtFixedDecimal(
															organizationData.totalDonations,
															3
														)
													) * 143996.41}{" "}
													INR
												</p>
											</div>
											<img
												className='h-10 w-10 flex-shrink-0 rounded-full bg-gray-300'
												src={organizationData.imageUrl}
												alt=''
											/>
										</div>
										<div>
											<div className='-mt-px flex divide-x divide-gray-200'>
												<div className='flex w-0 flex-1 cursor-pointer'>
													<a
														href={`mailto:support@ngo.com`}
														className='relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900'>
														<EnvelopeIcon
															className='h-5 w-5 text-gray-400'
															aria-hidden='true'
														/>
														Email
													</a>
												</div>
												<div
													className='-ml-px flex w-0 flex-1 cursor-pointer'
													onClick={() => {
														setShowModal(!showModal)
													}}>
													<div className='relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900'>
														<svg
															version='1.1'
															xmlns='http://www.w3.org/2000/svg'
															width='30px'
															height='30px'
															viewBox='0,0,256,256'
															className='h-5 w-5'>
															<g
																fill='#9ca3af'
																fillRule='nonzero'
																stroke='none'
																strokeWidth='1'
																strokeLinecap='butt'
																strokeLinejoin='miter'
																strokeMiterlimit='10'
																strokeDasharray=''
																strokeDashoffset='0'
																fontFamily='none'
																fontWeight='none'
																fontSize='none'
																textAnchor='none'
																style={{ "mix-blend-mode": "normal" }}>
																<g transform='scale(8.53333,8.53333)'>
																	<path d='M19,2l-9.75781,4.15039l-0.00195,0.00195c-0.38719,0.15983 -0.71443,0.4372 -0.93555,0.79297l-0.00391,0.00195l-0.04492,0.07422c-0.00461,0.00778 -0.00917,0.01559 -0.01367,0.02344l-2.91406,4.85938v0.00195c-0.21334,0.32495 -0.32737,0.70503 -0.32812,1.09375c0.0001,0.32317 0.07851,0.64149 0.22852,0.92773l1.92773,3.41016l0.01953,-0.01172c0.386,-1.423 1.44236,-2.55683 2.81836,-3.04883l-0.45117,-0.84766l2.57617,-2.30469h4.125l-1.9043,2.85742l-4.11523,2.36719l0.00195,0.00195c-0.75937,0.44949 -1.22553,1.26601 -1.22656,2.14844c0,1.38071 1.11929,2.5 2.5,2.5c0.36166,-0.00084 0.71884,-0.08014 1.04688,-0.23242v0.00195l0.03516,-0.01758c0.0309,-0.01435 0.06151,-0.02932 0.0918,-0.04492l7.89063,-3.94727c0.0476,-0.02196 0.0945,-0.04541 0.14063,-0.07031l0.00391,-0.00391c0.38984,-0.21597 0.71486,-0.53222 0.94141,-0.91602l0.00781,-0.00781l0.01367,-0.02734c0.05037,-0.08769 0.09538,-0.17835 0.13477,-0.27148l4.19336,-8.46289zM7.01367,19.32422c-0.636,0.898 -1.01367,1.99178 -1.01367,3.17578c0,3.038 2.462,5.5 5.5,5.5c3.038,0 5.5,-2.462 5.5,-5.5c0,-0.561 -0.08423,-1.10328 -0.24023,-1.61328c-1.862,0.932 -3.52259,1.76144 -3.55859,1.77344c-0.547,0.226 -1.11817,0.33984 -1.70117,0.33984c-2.196,0 -4.02987,-1.58006 -4.42187,-3.66406c-0.022,-0.001 -0.04245,-0.00972 -0.06445,-0.01172z'></path>
																</g>
															</g>
														</svg>
														Donate
													</div>
												</div>
											</div>
										</div>
									</li>
									{/* <div className='organization' key={index}>
										<h1>{organizationData[0]}</h1>
										<h2>{organizationData[1].toString()}</h2>
										<label>Donation Amount (In MATIC)</label>
										<input
											type='number'
											value={donationAmount}
											onChange={(e) => setDonationAmount(e.target.value)}
										/>
										<button
											onClick={() => handleDonation(organizations[index])}>
											Donate
										</button>
									</div> */}
								</>
							))}
					</ul>

					<Divider text='Timeline' />

					<Timeline className='my-4 md:my-8 mx-24'>
						<Timeline.Item>
							<Timeline.Point icon={HiCalendar} />
							<Timeline.Content>
								<Timeline.Time>28 February 2022</Timeline.Time>
								<Timeline.Title>The Unfortunate Disaster</Timeline.Title>
								<Timeline.Body>
									The unfortunate disaster that happened in the year 2022, at
									delhi. Atleast 500 people died in the disaster. The disaster
									was caused by the earthquake.
								</Timeline.Body>
								<Button color='gray'>
									Learn More
									<HiArrowNarrowRight className='ml-2 h-3 w-3' />
								</Button>
							</Timeline.Content>
						</Timeline.Item>
						<Timeline.Item>
							<Timeline.Point icon={HiCalendar} />
							<Timeline.Content>
								<Timeline.Time>1 March 2022</Timeline.Time>
								<Timeline.Title>50% target fund was collected</Timeline.Title>
								<Timeline.Body>
									Through contributions from the people of world, we were able
									to collect 60% of the target fund. We are still in need of
									more funds to help the people of delhi.
								</Timeline.Body>
							</Timeline.Content>
						</Timeline.Item>
						<Timeline.Item>
							<Timeline.Point icon={HiCalendar} />
							<Timeline.Content>
								<Timeline.Time>5 March 2022</Timeline.Time>
								<Timeline.Title>
									Rebuilding started in the affected areas
								</Timeline.Title>
								<Timeline.Body>
									First phase of rebuilding started in the affected areas. The
									people of delhi are very happy with the work done by the
									government.
								</Timeline.Body>
							</Timeline.Content>
						</Timeline.Item>
						<Timeline.Item>
							<Timeline.Point icon={HiCalendar} />
							<Timeline.Content>
								<Timeline.Time>6 March 2022</Timeline.Time>
								<Timeline.Title>80% target fund was collected</Timeline.Title>
								<Timeline.Body>
									Through contributions from the people of world, we were able
									to collect 80% of the target fund. We are still in need of
									more funds to help the people of delhi.
								</Timeline.Body>
							</Timeline.Content>
						</Timeline.Item>
					</Timeline>
					<div className='relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32'>
						<img
							src='https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply'
							alt=''
							className='absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center'
						/>
						<svg
							viewBox='0 0 1097 845'
							aria-hidden='true'
							className='hidden transform-gpu blur-3xl sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:w-[68.5625rem]'>
							<path
								fill='url(#7c63f5ae-130c-4c0f-963f-50ac7fe8d2e1)'
								fillOpacity='.2'
								d='M301.174 646.641 193.541 844.786 0 546.172l301.174 100.469 193.845-356.855c1.241 164.891 42.802 431.935 199.124 180.978 195.402-313.696 143.295-588.18 284.729-419.266 113.148 135.13 124.068 367.989 115.378 467.527L811.753 372.553l20.102 451.119-530.681-177.031Z'
							/>
							<defs>
								<linearGradient
									id='7c63f5ae-130c-4c0f-963f-50ac7fe8d2e1'
									x1='1097.04'
									x2='-141.165'
									y1='.22'
									y2='363.075'
									gradientUnits='userSpaceOnUse'>
									<stop stopColor='#776FFF' />
									<stop offset={1} stopColor='#FF4694' />
								</linearGradient>
							</defs>
						</svg>
						<svg
							viewBox='0 0 1097 845'
							aria-hidden='true'
							className='absolute left-1/2 -top-52 -z-10 w-[68.5625rem] -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu'>
							<path
								fill='url(#49c00522-612e-41d3-bb32-ce7d1fa28850)'
								fillOpacity='.2'
								d='M301.174 646.641 193.541 844.786 0 546.172l301.174 100.469 193.845-356.855c1.241 164.891 42.802 431.935 199.124 180.978 195.402-313.696 143.295-588.18 284.729-419.266 113.148 135.13 124.068 367.989 115.378 467.527L811.753 372.553l20.102 451.119-530.681-177.031Z'
							/>
							<defs>
								<linearGradient
									id='49c00522-612e-41d3-bb32-ce7d1fa28850'
									x1='1097.04'
									x2='-141.165'
									y1='.22'
									y2='363.075'
									gradientUnits='userSpaceOnUse'>
									<stop stopColor='#776FFF' />
									<stop offset={1} stopColor='#FF4694' />
								</linearGradient>
							</defs>
						</svg>
						<div className='mx-auto max-w-7xl px-6 lg:px-8'>
							<div className='mx-auto max-w-2xl lg:mx-0'>
								<h2 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
									Support center
								</h2>
								<p className='mt-6 text-lg leading-8 text-gray-300'>
									Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
									qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
									occaecat fugiat aliqua.
								</p>
							</div>
							<div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8'>
								{contactCards.map((card) => (
									<div
										key={card.name}
										className='flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10'>
										<card.icon
											className='h-7 w-5 flex-none text-indigo-400'
											aria-hidden='true'
										/>
										<div className='text-base leading-7'>
											<h3 className='font-semibold text-white'>{card.name}</h3>
											<p className='mt-2 text-gray-300'>{card.description}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					<Divider text={"FAQs"} />
					<Accordion
						alwaysOpen={true}
						className='my-8 mx-12 md:mx-16 lg:mx-24 xl:mx-28'>
						<Accordion.Panel>
							<Accordion.Title>What is HopeCoin?</Accordion.Title>
							<Accordion.Content>
								<p className='mb-2 text-gray-500 dark:text-gray-400'>
									HopeCoin is an open-source library of interactive components
									built on top of Tailwind CSS including buttons, dropdowns,
									modals, navbars, and more.
								</p>
								<p className='text-gray-500 dark:text-gray-400'>
									Check out this guide to learn how to
									<a
										href='https://HopeCoin.com/docs/getting-started/introduction/'
										className='text-blue-600 hover:underline dark:text-blue-500'>
										get started
									</a>
									and start developing websites even faster with components on
									top of Tailwind CSS.
								</p>
							</Accordion.Content>
						</Accordion.Panel>
						<Accordion.Panel>
							<Accordion.Title>
								Is there a Figma file available?
							</Accordion.Title>
							<Accordion.Content>
								<p className='mb-2 text-gray-500 dark:text-gray-400'>
									HopeCoin is first conceptualized and designed using the Figma
									software so everything you see in the library has a design
									equivalent in our Figma file.
								</p>
								<p className='text-gray-500 dark:text-gray-400'>
									Check out the
									<a
										href='https://HopeCoin.com/figma/'
										className='text-blue-600 hover:underline dark:text-blue-500'>
										Figma design system
									</a>
									based on the utility classes from Tailwind CSS and components
									from HopeCoin.
								</p>
							</Accordion.Content>
						</Accordion.Panel>
						<Accordion.Panel>
							<Accordion.Title>
								What are the differences between HopeCoin and Tailwind UI?
							</Accordion.Title>
							<Accordion.Content>
								<p className='mb-2 text-gray-500 dark:text-gray-400'>
									The main difference is that the core components from HopeCoin
									are open source under the MIT license, whereas Tailwind UI is
									a paid product. Another difference is that HopeCoin relies on
									smaller and standalone components, whereas Tailwind UI offers
									sections of pages.
								</p>
								<p className='mb-2 text-gray-500 dark:text-gray-400'>
									However, we actually recommend using both HopeCoin, HopeCoin
									Pro, and even Tailwind UI as there is no technical reason
									stopping you from using the best of two worlds.
								</p>
								<p className='mb-2 text-gray-500 dark:text-gray-400'>
									Learn more about these technologies:
								</p>
								<ul className='list-disc pl-5 text-gray-500 dark:text-gray-400'>
									<li>
										<a
											href='https://HopeCoin.com/pro/'
											className='text-blue-600 hover:underline dark:text-blue-500'>
											HopeCoin Pro
										</a>
									</li>
									<li>
										<a
											href='https://tailwindui.com/'
											rel='nofollow'
											className='text-blue-600 hover:underline dark:text-blue-500'>
											Tailwind UI
										</a>
									</li>
								</ul>
							</Accordion.Content>
						</Accordion.Panel>
					</Accordion>
				</>
			)}
		</>
	)
}

export default DisasterInfo
