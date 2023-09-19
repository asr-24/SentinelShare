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
    return jsonData;
}



async function run() {
    let jsonData = await importData();
    // console.log(jsonData);


    // For Helia --

    const helia = await createHelia();
    const j = json(helia);

    const CID = await j.add(jsonData); //pushing to IPFS 

    console.log(`\n\n\n\nhelia!!!!\n\n CID is ${CID}`);
    // console.log(await j.get(myImmutableAddress2));


}

run();