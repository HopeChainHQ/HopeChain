import { weiToEtherAtFixedDecimal } from "./"
import { TOKEN_DECIMAL_UNIT } from "../constants"

export const getContractData = async (_contract) => {
	const name = await _contract.name()
	const symbol = await _contract.symbol()

	return { name, symbol }
}

export const getAllDisasterData = async (_contract) => {
	const disasterData = await _contract.getAllDisasterData()
	return disasterData
}

export const donate = async (_contract, { options }) => {
	return await _contract.donate(options)
}

export const createDisaster = async (
	_contract,
	{
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
		severity,
		disasterType,
		description,
		affectedAreas,
		affectedPeopleCount,
		targetCollectionAmount,
		reliefOrganizations
	)
}
