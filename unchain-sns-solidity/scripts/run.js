const main = async () => {
    const [owner, randomPerson, randomPerson2] = await hre.ethers.getSigners();
    const UnchainSnsFactory = await hre.ethers.getContractFactory("Sns");
    const UnchainSnsContract = await UnchainSnsFactory.deploy();
    const UnchainSns = await UnchainSnsContract.deployed();

    console.log("Contract deployed to: ", UnchainSns.address);
    console.log("owner address: ", owner.address);
    console.log("randomPerson address: ", randomPerson.address);

    await UnchainSnsContract.post("test1")

    let postData
    postData = await UnchainSnsContract.getPost(1)
    console.log("Get Post");
    console.log("*".repeat(50));
    console.log("postData: ", postData);
    console.log("*".repeat(50));

    await UnchainSnsContract.post("test2")

    postData = await UnchainSnsContract.getPost(2)
    console.log("Get Post");
    console.log("*".repeat(50));
    console.log("postData: ", postData);
    console.log("*".repeat(50));

    await UnchainSnsContract.connect(randomPerson).goodPost(1)

    postData = await UnchainSnsContract.getPost(1)
    console.log("Good Post");
    console.log("*".repeat(50));
    console.log("postData: ", postData);
    console.log("*".repeat(50));

    await UnchainSnsContract.connect(randomPerson2).goodPost(1)

    postData = await UnchainSnsContract.getPost(1)
    console.log("Good Post");
    console.log("*".repeat(50));
    console.log("postData: ", postData);
    console.log("*".repeat(50));

    await UnchainSnsContract.connect(randomPerson).goodRemove(1)

    postData = await UnchainSnsContract.getPost(1)
    console.log("Remove Post");
    console.log("*".repeat(50));
    console.log("postData: ", postData);
    console.log("*".repeat(50));

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
