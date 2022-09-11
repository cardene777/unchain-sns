const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const UnchainSnsFactory = await hre.ethers.getContractFactory("Sns");
    const UnchainSnsContract = await UnchainSnsFactory.deploy();
    const UnchainSns = await UnchainSnsContract.deployed();

    console.log("Contract deployed to: ", UnchainSns.address);
    console.log("owner address: ", owner.address);
    console.log("owner Balance: ", UnchainSns.balance);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();

