const main = async () => {
    const UnchainSnsFactory = await hre.ethers.getContractFactory("WavePortal");
    const UnchainSnsContract = await UnchainSnsFactory.deploy();
    const UnchainSns = await UnchainSnsContract.deployed();

    console.log("Unchain Sns address: ", UnchainSns.address);
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
