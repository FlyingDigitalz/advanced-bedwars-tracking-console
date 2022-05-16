// Variables
const fs = require('fs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const client_config = require(`./config/client.json`)
const player_list = require(`./config/player.json`)
const FunctionInstance = require('./client_modules/functions')
const ClientFunctions = new FunctionInstance();
ClientFunctions.notify();

// Default Interval = 60s
setInterval(function(){
    // Attempt to read file: config-playar.json
    try{
        fs.readFile('./config/player.json', (err, data) => {
            const plr_list = JSON.parse(data);
            // loop in every players
            Object.entries(player_list).forEach((entry) => {
                const [number, uuid] = entry;
                const db_path = `./database/${uuid}.json`
                const extra_path = `./database/${uuid}_extra.json`
                // Fetch statistics from hypixel database
                fetch(`https://api.hypixel.net/player?key=${client_config.api_key}&uuid=${uuid}`).then(async response => response.json()).then(result => {
                    // Case 1: success to fetch statistics
                    if (result.success == true){
                        // Case 1.1: Player already exists in database
                        if (fs.existsSync(db_path)) {
                            ClientFunctions.fetch(result)
                        }
                         // Case 1.2: Player not in database
                        else
                        {
                            ClientFunctions.registerplayer(result) 
                        }
                    }
                    // Case 2: Failure to fetch statistics, return cause
                    else
                    {
                        console.log(`[!] Failed due ${result.cause}`)
                    }
                });
                //console.log(entry)
            });
        });
    }
    // failure to read file: config-playar.json
    catch(e){
        console.log(`[!] Error occured while reading file: ${e.message}`)
    }
}, client_config.debug_interval*1000)