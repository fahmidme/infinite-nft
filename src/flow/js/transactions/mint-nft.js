import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

export async function mintNFT() {
  const txId = await fcl
    .send([
      // Transactions use fcl.transaction instead of fcl.script
      // Their syntax is a little different too
      fcl.transaction`
        import NonFungibleToken, ExampleNFT from 0xInfinite

        transaction {
            // The reference to the collection that will be receiving the NFT
            // let receiverRef: &{ExampleNFT.NFTReceiver}
            //
            // // The reference to the Minter resource stored in account storage
            // let minterRef: &ExampleNFT.NFTMinter

            prepare(acct: AuthAccount) {
                // Get the owner's collection capability and borrow a reference
                // self.receiverRef = acct.getCapability<&{ExampleNFT.NFTReceiver}>(/public/NFTReceiver)
                //     .borrow()
                //     ?? panic("Could not borrow receiver reference")
                //
                // // Borrow a capability for the NFTMinter in storage
                // self.minterRef = acct.borrow<&ExampleNFT.NFTMinter>(from: /storage/NFTMinter)
                //     ?? panic("Could not borrow minter reference")
            }

            execute {
                // Use the minter reference to mint an NFT, which deposits
                // the NFT into the collection that is sent as a parameter.
                // let newNFT <- self.minterRef.mintNFT()
                //
                // self.receiverRef.deposit(token: <-newNFT)

                log("NFT Minted and deposited to Account 2's Collection")
            }
        }
      `,
      fcl.payer(fcl.authz), // current user is responsible for paying for the transaction
      fcl.proposer(fcl.authz), // current user acting as the nonce
      fcl.authorizations([fcl.authz]), // current user will be first AuthAccount
      fcl.limit(50), // set the compute limit
    ])
    .then(fcl.decode)

  return fcl.tx(txId).onceSealed()
}
