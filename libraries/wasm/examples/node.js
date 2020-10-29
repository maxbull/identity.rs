const identity = require('../wasm-node/iota_identity_wasm')

console.log("identity", identity)

const { initialize, resolve, publish, Key, Doc, DID } = identity

initialize()

async function playground() {
  console.log("key", new Key())

  console.log("did", new DID((new Key()).public))

  console.log("did", new DID({ key: (new Key()).public, network: "com" }))

  const { key, doc } = Doc.generate({ network: "com" })

  console.log("key (generated)", key)
  console.log("doc (generated)", doc)

  console.log("doc (unsigned)", doc.document)

  doc.sign(key)

  console.log("doc (signed)", doc.document)

  console.log("doc valid?", doc.verify())

  const json = JSON.stringify(doc.document)

  console.log("From JSON >", Doc.fromJSON(json))

  // const resolved = await resolve(doc.did, "https://nodes.thetangle.org:443")

  // console.log("resolved", resolved)
}

function alice_bob() {
  // Generate Keypairs
  const alice_keypair = new Key()
  console.log("alice_keypair: ", alice_keypair)

  const bob_keypair = new Key()
  console.log("bob_keypair: ", bob_keypair)

  // Create the DIDs
  let alice_did = new DID(alice_keypair.public)
  console.log("alice_did: ", alice_did.toString(), alice_did.address)

  let bob_did = new DID(bob_keypair.public)
  console.log("bob_did: ", bob_did.toString(), bob_did.address)

  // Create the DID Documents
  let alice_document = new Doc({did: alice_did.did, key: alice_keypair.public})
  console.log("alice_document: ", alice_document.document)

  let bob_document = new Doc({did: bob_did.did, key: bob_keypair.public})
  console.log("bob_document: ", bob_document.document)

  let update = {...bob_document.document}

  update["foo"] = 123
  update["bar"] = 456
  update = Doc.fromJSON(JSON.stringify(update))

  console.log("Update: ", update)

  let diff = bob_document.diff(update, bob_keypair)

  console.log("diff: ", JSON.stringify(diff, null, 2))

  let json = JSON.stringify(diff)

  console.log("Diff has valid signature: ", bob_document.verify_diff(json))
}

async function run() {
  await playground()
  await alice_bob()
}

run().then((output) => {
  console.log("Ok >", output)
}).catch((error) => {
  console.log("Err >", error)
})