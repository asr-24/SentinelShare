import { createHelia } from 'helia'
import { strings } from '@helia/strings'
import { json } from '@helia/json'
import path from 'path';
import { fileURLToPath } from 'url';
import finalFunction from './atlas/app_trial_two.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// console.log(__dirname);


async function importData() {
    let jsonData = await finalFunction();
    console.log("hereeeee!!!");
    console.log(jsonData);
}

importData();

//console.log(jsonData);

// const helia = await createHelia()
// const s = strings(helia)

// const myImmutableAddress = await s.add('hello world')
// console.log(typeof myImmutableAddress)

// console.log(await s.get(myImmutableAddress))


// const j = json(helia)

// const myImmutableAddress2 = await j.add({ hello: 'world' })

// console.log(await j.get(myImmutableAddress2))
// // { hello: 'world' }