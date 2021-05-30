import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

export async function fetchNFTs(address) {
  if (address == null) return null

  return fcl
    .send([
      fcl.script`
        import NonFungibleToken, ExampleNFT from 0xInfinite

        pub fun main(account: Address): [UInt64] {
          let collectionRef = getAccount(account)
            .getCapability(/public/NFTCollection)
            .borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not borrow capability from public collection")

          return collectionRef.getIDs()
        }
      `,
      fcl.args([fcl.arg(address, t.Address)]),
    ])
    .then(fcl.decode)
}
