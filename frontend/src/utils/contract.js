import { etherToWei } from "./"
// import { TOKEN_DECIMAL_UNIT } from "../constants"

export const getContractData = async (_contract) => {
	const name = await _contract.name()
	const symbol = await _contract.symbol()

	return { name, symbol }
}

export const getAllDisasterData = async (_contract) => {
	const allDisasterData = await _contract.getAllDisasterData()
	return allDisasterData
}

export const getDonorName = async (_contract, { donor }) => {
	const userData = await _contract.getDonorName(donor)
	return userData
}

export const getDisaster = async (_contract, { disasterId }) => {
	const disasterData = await _contract.getDisaster(disasterId)
	return disasterData
}

export const getOrganization = async (_contract, { organization }) => {
	const organizationData = await _contract.getOrganization(organization)
	return organizationData
}

export const donate = async (
	_contract,
	{ disasterId, organization, amount, donorName }
) => {
	const weiAmount = etherToWei(amount)
	console.log(weiAmount)
	// set amount as value of transaction
	return await _contract.donate(disasterId, organization, donorName, {
		value: weiAmount,
	})
}

export const createDisaster = async (
	_contract,
	{
		disasterName,
		severity,
		disasterType,
		description,
		affectedAreas,
		affectedPeopleCount,
		targetCollectionAmount,
		reliefOrganizations,
	}
) => {
	return await _contract.createDisaster(
		disasterName,
		severity,
		disasterType,
		description,
		affectedAreas,
		affectedPeopleCount,
		targetCollectionAmount,
		reliefOrganizations
	)
}

export const createOrganization = async (_contract, { name, organization }) => {
	return await _contract.createOrganization(name, organization)
}

export const addOrganizationToDisaster = async (
	_contract,
	{ disasterId, organization }
) => {
	return await _contract.addOrganizationToDisaster(disasterId, organization)
}

export const deleteDisaster = async (_contract, { disasterId }) => {
	return await _contract.deleteDisaster(disasterId)
}
