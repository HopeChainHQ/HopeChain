// SPDX-License-Identifier: MIT

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.0;

// We import this library to be able to use console.log
import "hardhat/console.sol";

// This is the main building block for smart contracts.
// DisasterDonate
contract DisasterDonate {
    // Disaster struct
    struct Disaster {
        string disasterName;
        string severity;
        string disasterType;
        string description;
        string affectedAreas;
        uint256 affectedPeopleCount;
        uint256 targetCollectionAmount;
        uint256 totalCollectedAmount;
        address[] reliefOrganizations;
        mapping(address => uint256) donations;
        // address[] topDonations;
    }

    struct DisasterView {
        string disasterName;
        string severity;
        string disasterType;
        string description;
        string affectedAreas;
        uint256 affectedPeopleCount;
        uint256 targetCollectionAmount;
        uint256 totalCollectedAmount;
        address[] reliefOrganizations;
        // address[] topDonations;
    }

    // struct EmergencyFund{
    //     uint256 fundAmount;
    // }

    // Organization struct
    struct Organization {
        string name;
        uint256 totalDonations;
    }

    struct User {
        string username;
    }

    // Global variables
    mapping(uint256 => Disaster) public disasters;
    mapping(address => Organization) public organizations;
    mapping(address => User) public users;
    address payable public owner;

    uint256 private disasterCount = 0;
    uint256 private emergencyReliefFund = 0;

    constructor() {
        owner = payable(msg.sender);
    }

    function createDisaster(
        string memory disasterName,
        string memory severity,
        string memory disasterType,
        string memory description,
        string memory affectedAreas,
        uint256 affectedPeopleCount,
        uint256 targetCollectionAmount,
        address[] memory reliefOrganizations
    ) public returns (uint256 id) {
        require(msg.sender == owner, "Only owner can create disaster");
        for (uint256 i = 0; i < reliefOrganizations.length; i++) {
            require(
                bytes(organizations[reliefOrganizations[i]].name).length != 0,
                "Relief organization does not exist"
            );
        }
        Disaster storage disaster = disasters[disasterCount++];
        disaster.disasterName = disasterName;
        disaster.severity = severity;
        disaster.disasterType = disasterType;
        disaster.description = description;
        disaster.affectedAreas = affectedAreas;
        disaster.affectedPeopleCount = affectedPeopleCount;
        disaster.targetCollectionAmount = targetCollectionAmount;
        disaster.totalCollectedAmount = 0;
        disaster.reliefOrganizations = reliefOrganizations;

        id = disasterCount - 1;
    }

    function addOrganizationToDisaster(
        uint256 disasterId,
        address organization
    ) public {
        require(disasterId < disasterCount, "Invalid disaster id");
        require(
            bytes(organizations[organization].name).length != 0,
            "Relief organization does not exist"
        );

        Disaster storage disaster = disasters[disasterId];
        bool found = false;
        for (uint256 i = 0; i < disaster.reliefOrganizations.length; i++) {
            if (disaster.reliefOrganizations[i] == organization) {
                found = true;
                break;
            }
        }

        require(!found, "Organization already added to disaster");

        disaster.reliefOrganizations.push(organization);
    }

    function getAllDisasterData() public view returns (DisasterView[] memory) {
        DisasterView[] memory result = new DisasterView[](disasterCount);

        for (uint256 i = 0; i < disasterCount; i++) {
            Disaster storage disaster = disasters[i];
            result[i] = DisasterView({
                disasterName: disaster.disasterName,
                severity: disaster.severity,
                disasterType: disaster.disasterType,
                description: disaster.description,
                affectedAreas: disaster.affectedAreas,
                affectedPeopleCount: disaster.affectedPeopleCount,
                targetCollectionAmount: disaster.targetCollectionAmount,
                totalCollectedAmount: disaster.totalCollectedAmount,
                reliefOrganizations: disaster.reliefOrganizations
            });
        }
        return result;
    }

    function createOrganization(
        string memory name,
        address organization
    ) public {
        require(msg.sender == owner, "Only owner can create organization");
        organizations[organization].name = name;
    }

    function donate(
        uint256 disasterId,
        address organization,
        string memory donorName
    ) public payable {
        require(msg.value > 0, "Donation amount must be greater than 0");
        disasters[disasterId].donations[organization] += msg.value;
        organizations[organization].totalDonations += msg.value;
        disasters[disasterId].totalCollectedAmount += msg.value;

        users[msg.sender] = User({username: donorName});

        // Update top donations
        // if (disasters[disasterId].topDonations.length < 10) {
        //     disasters[disasterId].topDonations.push(msg.sender);
        // } else {
        //     uint256 minDonation = 0;
        //     uint256 minIndex = 0;
        //     for (
        //         uint256 i = 0;
        //         i < disasters[disasterId].topDonations.length;
        //         i++
        //     ) {
        //         address donor = disasters[disasterId].topDonations[i];
        //         uint256 donation = disasters[disasterId].donations[
        //             organizations[donor].disasterId
        //         ];
        //         if (donation < minDonation || minDonation == 0) {
        //             minDonation = donation;
        //             minIndex = i;
        //         }
        //     }
        //     if (msg.value > minDonation) {
        //         disasters[disasterId].topDonations[minIndex] = msg.sender;
        //     }
        // }
    }

    function getDisaster(
        uint256 disasterId
    ) public view returns (DisasterView memory disasterData) {
        Disaster storage disaster = disasters[disasterId];
        disasterData.disasterName = disaster.disasterName;
        disasterData.severity = disaster.severity;
        disasterData.disasterType = disaster.disasterType;
        disasterData.description = disaster.description;
        disasterData.affectedAreas = disaster.affectedAreas;
        disasterData.affectedPeopleCount = disaster.affectedPeopleCount;
        disasterData.targetCollectionAmount = disaster.targetCollectionAmount;
        disasterData.totalCollectedAmount = disaster.totalCollectedAmount;
        disasterData.reliefOrganizations = disaster.reliefOrganizations;
        // topDonations = disaster.topDonations;
    }

    function getOrganization(
        address organization
    ) public view returns (string memory name, uint256 totalDonations) {
        Organization storage org = organizations[organization];
        name = org.name;
        totalDonations = org.totalDonations;
    }

    function getOrganizationTotalDonations(
        address organization
    ) public view returns (uint256) {
        return organizations[organization].totalDonations;
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw funds");
        owner.transfer(address(this).balance);
    }

    function addToEmergencyReliefFund() public payable {
        require(msg.value > 0, "Donation amount must be greater than 0");
        emergencyReliefFund += msg.value;
    }

    function getEmergencyReliefFund() public view returns (uint256) {
        return emergencyReliefFund;
    }

    // function registerUser(bytes32 _username, bytes32 _password) public {
    //     require(!users[msg.sender].isRegistered, "User already registered");
    //     users[msg.sender].username = _username;
    //     users[msg.sender].password = _password;
    //     users[msg.sender].isRegistered = true;
    // }

    // function authenticateUser(
    //     bytes32 _username,
    //     bytes32 _password
    // ) public view returns (bool) {
    //     require(users[msg.sender].isRegistered, "User not registered");
    //     return (users[msg.sender].username == _username &&
    //         users[msg.sender].password == _password);
    // }
}
