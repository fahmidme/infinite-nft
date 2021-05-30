import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

export async function initMarket() {
  const txId = await fcl
    .send([
      // Transactions use fcl.transaction instead of fcl.script
      // Their syntax is a little different too
      fcl.transaction`
        pub contract Debug {
          pub fun log(_ msg: String) {
            emit Log(msg: msg)
          }
        }
      `,
      fcl.payer(fcl.authz), // current user is responsible for paying for the transaction
      fcl.proposer(fcl.authz), // current user acting as the nonce
      fcl.authorizations([fcl.authz]), // current user will be first AuthAccount
      fcl.limit(35), // set the compute limit
    ])
    .then(fcl.decode)

  return fcl.tx(txId).onceSealed()
}
