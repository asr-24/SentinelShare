import { createHelia } from 'helia'
import { strings } from '@helia/strings'
import { json } from '@helia/json'


const helia = await createHelia()
const s = strings(helia)

const myImmutableAddress = await s.add('hello world')
console.log(typeof myImmutableAddress)

console.log(await s.get(myImmutableAddress))


const j = json(helia)

const myImmutableAddress2 = await j.add({ hello: 'world' })

console.log(await j.get(myImmutableAddress2))
// { hello: 'world' }