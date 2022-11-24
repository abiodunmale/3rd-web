import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { PRIVATE_KEY, signatureDropAddress } from '../../utils/config';
import collectionAbi from '../../utils/collectionABI.json';

export default async function generateMintSignature(req,res) {
  // De-construct body from request
  const { address } = JSON.parse(req.body);

  const sdk = new ThirdwebSDK("goerli");


  const earlyAccessNfts = await sdk.getContractFromAbi(
    "0xD66bd445C45C21DC7E4c7732b502C3db015c123d",
    collectionAbi
  );

//   const balanceOf = await earlyAccessNfts.erc721.balanceOf(address);

  // Check to see if the wallet address has an early access NFT
  const numTokensInCollection = await earlyAccessNfts.erc721.totalCount();
  let userHasToken = false;
  // Check each token in the Edition Drop
  for (let i = 0; i < numTokensInCollection.toNumber(); i++) {
    // See if they have the token
    const balance = await earlyAccessNfts.erc721.balanceOf(address, i);
    if (balance.toNumber() > 0) {
      userHasToken = true;
      break;
    }
  }


  //Now use the SDK on Goerli to get the signature drop
  const goerliSDK = ThirdwebSDK.fromPrivateKey(
    PRIVATE_KEY,
    "goerli"
  );

  const signatureDrop = await goerliSDK.getContract(
    signatureDropAddress,
    'signature-drop'
  );


  // If the user has an early access NFT, generate a mint signature
  if (userHasToken) {
    const mintSignature = await signatureDrop.signature.generate({
      to: address, // Can only be minted by the address we checked earlier
      price: "0", // Free!
      mintStartTime: new Date(0), // now
    });

    res.status(200).json(mintSignature);
  } else {
    res.status(400).json({
      message: "User does not have an early access NFT",
    });
  }
}