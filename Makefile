deploy-local:
	npx hardhat run scripts/deploy_disaster_donate.js --network localhost

deploy:
	npx hardhat run scripts/deploy_disaster_donate.js --network mumbai

test-network:
	npx hardhat node