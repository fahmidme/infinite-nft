import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

export async function initAccount() {
  const txId = await fcl
    .send([
      // Transactions use fcl.transaction instead of fcl.script
      // Their syntax is a little different too
      fcl.transaction`
        import NonFungibleToken, ExampleNFT from 0xInfinite

        transaction {
          prepare(acct: AuthAccount) {
            // Return early if the account already has a collection
            if acct.borrow<&NonFungibleToken.Collection>(from: /storage/NFTCollection) != nil {
                return
            }

            // Create a new empty collection
            let collection <- ExampleNFT.createEmptyCollection()

            // save it to the account
            acct.save(<-collection, to: /storage/NFTCollection)

            // create a public capability for the collection
            acct.link<&{NonFungibleToken.CollectionPublic}>(
                /public/NFTCollection,
                target: /storage/NFTCollection
            )
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
