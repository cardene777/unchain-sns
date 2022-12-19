## Unchain-SNS

https://unchain-sns.vercel.app/

## Doc

[app.md](/doc/app.md)

## Rinkeby Test Network Deploy

```sh
cd unchain-sns-solidity
npx hardhat run scripts/deploy.js --network rinkeby
```

`Contract deployed to:...`を保存。

## contractABI

`unchain-sns-solidity/artifacts/contracts/Sns.sol/Sns.json`にあるファイルを`unchain-sns-app/src/utils/Sns.json`にコピー。

## npmキャッシュ削除

```sh
npm cache clean --force
```

```sh
rm -rf ~/.npm
```

```sh
rm -rf node_modules
```

## Create Hardhat App

```sh
npm init -y
npm install --save-dev hardhat
npx hardhat
```

```sh
npx hardhat compile
npx hardhat test
```

### Ether Network 立ち上げ

```sh
npx hardhat node
```
