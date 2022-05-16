const client_config = require('../config/client.json')
const fs = require('fs')
const thousand = num => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')

function ClientFunctions() {
  this.notify = function() {
    console.log('\n[!] Please leave this application active for accurate tracking')
    console.log(`[!] Update interval has set to ${client_config.interval} seconds\n`)
  }

  this.registerplayer = function(server){
    // check if player has winstreak ON
    try{
        let overall_winstreak = `?`
        if (server.player.stats.Bedwars.winstreak !== undefined){
            overall_winstreak = `${server.player.stats.Bedwars.winstreak}`
        }
        else
        {
            overall_winstreak = `0`
        }


        const PlayerDataExtra = {
            "overall_winstreak": `${overall_winstreak}`
        }

        fs.writeFileSync(`./database/${server.player.uuid}.json`, JSON.stringify(server.player));
        fs.writeFileSync(`./database/${server.player.uuid}_extra.json`, JSON.stringify(PlayerDataExtra));
        console.log(`[+] ${server.player.displayname} has registered into database`)
    }
    catch(e){console.log(`[!] Error: ${e.message}`)}
  }

  this.fetch = function(server){
    try{
        fs.readFile(`./database/${server.player.uuid}.json`, (err, data) => {
            fs.readFile(`./database/${server.player.uuid}_extra.json`, (err, data_extra) => {
                // console.log(`Successfully fetch ${server.player.displayname} statistics`)
                const database = JSON.parse(data);
                const database_extra = JSON.parse(data_extra);
                const displayname = server.player.displayname
                // WINSTREA
                const winstreak_overall = parseInt(database_extra.overall_winstreak)
                // LOSS
                const database_losses = database.stats.Bedwars.losses_bedwars
                const server_losses = server.player.stats.Bedwars.losses_bedwars
                // GAME PLAYED
                const server_game_played = server.player.stats.Bedwars.games_played_bedwars || server.player.stats.Bedwars.games_played_bedwars_1
                const database_game_played = database.stats.Bedwars.games_played_bedwars || database.stats.Bedwars.games_played_bedwars_1
                // RESOURCES COLLECTED
                const server_resource = server.player.stats.Bedwars.resources_collected_bedwars
                const database_resource = database.stats.Bedwars.resources_collected_bedwars
                // FINAL DEATH
                const server_final_death = server.player.stats.Bedwars.final_deaths_bedwars	
                const database_final_death = database.stats.Bedwars.final_deaths_bedwars
                // DEATH
                const server_deaths_bedwars = server.player.stats.Bedwars.deaths_bedwars
                const database_deaths_bedwars = database.stats.Bedwars.deaths_bedwars
                // BED LOST
                const server_beds_lost_bedwars = server.player.stats.Bedwars.beds_lost_bedwars
                const database_beds_lost_bedwars = database.stats.Bedwars.beds_lost_bedwars
                // BED BREAK
                const server_beds_broken_bedwars = server.player.stats.Bedwars.beds_broken_bedwars
                const database_beds_broken_bedwars = database.stats.Bedwars.beds_broken_bedwars
                // KILLS
                const server_kills_bedwars = server.player.stats.Bedwars.kills_bedwars
                const database_kills_bedwars = database.stats.Bedwars.kills_bedwars
                // ITEM PURCHASED
                const server_items_purchased_bedwars = server.player.stats.Bedwars.items_purchased_bedwars
                const database_items_purchased_bedwars = database.stats.Bedwars.items_purchased_bedwars
                // COINS
                const server_coins = server.player.stats.Bedwars.coins
                const database_coins = database.stats.Bedwars.coins
                // FINAL KILL
                const server_final_kills_bedwars = server.player.stats.Bedwars.final_kills_bedwars
                const database_final_kills_bedwars = database.stats.Bedwars.final_kills_bedwars
                // WIN
                const server_wins_bedwars = server.player.stats.Bedwars.wins_bedwars
                const database_wins_bedwars = database.stats.Bedwars.wins_bedwars

                // Settings
                const NotifyOutage = `\n[!] ${server.player.displayname}'s database is inaccurate due tracker outage, Estimated winstreak is reset for higher accuracy`
                const LostFormat = `[!] ${displayname} has lost a game of bedwars\n⇄ Game #${thousand(database_game_played+1)} Result\nWins: ${thousand(database_wins_bedwars)} ➜ ${thousand(server_wins_bedwars)}\nLosses: ${thousand(database_losses)} ➜ ${thousand(server_losses)}\nW/L Ratio: ${(database_wins_bedwars/database_losses).toFixed(2)} ➜ ${(server_wins_bedwars/server_losses).toFixed(2)}\nKills: ${thousand(database_kills_bedwars)} ➜ ${thousand(server_kills_bedwars)}\nDeaths: ${thousand(database_deaths_bedwars)} ➜ ${thousand(server_deaths_bedwars)}\nK/D Ratio: ${(database_kills_bedwars/database_deaths_bedwars).toFixed(2)} ➜ ${(server_kills_bedwars/server_deaths_bedwars).toFixed(2)}\nBed Break: ${thousand(database_beds_broken_bedwars)} ➜ ${thousand(server_beds_broken_bedwars)}\nBed Lost: ${thousand(database_beds_lost_bedwars)} ➜ ${thousand(server_beds_lost_bedwars)}\nBB/L Ratio: ${(database_beds_broken_bedwars/database_beds_lost_bedwars).toFixed(2)} ➜ ${(server_beds_broken_bedwars/server_beds_lost_bedwars).toFixed(2)}\nFinal Kills: ${thousand(database_final_kills_bedwars)} ➜ ${thousand(server_final_kills_bedwars)}\nFinal Deaths: ${thousand(database_final_death)} ➜ ${thousand(server_final_death)}\nFK/D Ratio: ${(database_final_kills_bedwars/database_final_death).toFixed(2)} ➜ ${(server_final_kills_bedwars/server_final_death).toFixed(2)}\nCoins: ${thousand(database_coins)} ➜ ${thousand(server_coins)}\nWinstreak: ${winstreak_overall} ➜ 0`
                const WinFormat = `[!] ${displayname} has won a game of bedwars\n⇄ Game #${thousand(database_game_played+1)} Result\nWins: ${thousand(database_wins_bedwars)} ➜ ${thousand(server_wins_bedwars)}\nLosses: ${thousand(database_losses)} ➜ ${thousand(server_losses)}\nW/L Ratio: ${(database_wins_bedwars/database_losses).toFixed(2)} ➜ ${(server_wins_bedwars/server_losses).toFixed(2)}\nKills: ${thousand(database_kills_bedwars)} ➜ ${thousand(server_kills_bedwars)}\nDeaths: ${thousand(database_deaths_bedwars)} ➜ ${thousand(server_deaths_bedwars)}\nK/D Ratio: ${(database_kills_bedwars/database_deaths_bedwars).toFixed(2)} ➜ ${(server_kills_bedwars/server_deaths_bedwars).toFixed(2)}\nBed Break: ${thousand(database_beds_broken_bedwars)} ➜ ${thousand(server_beds_broken_bedwars)}\nBed Lost: ${thousand(database_beds_lost_bedwars)} ➜ ${thousand(server_beds_lost_bedwars)}\nBB/L Ratio: ${(database_beds_broken_bedwars/database_beds_lost_bedwars).toFixed(2)} ➜ ${(server_beds_broken_bedwars/server_beds_lost_bedwars).toFixed(2)}\nFinal Kills: ${thousand(database_final_kills_bedwars)} ➜ ${thousand(server_final_kills_bedwars)}\nFinal Deaths: ${thousand(database_final_death)} ➜ ${thousand(server_final_death)}\nFK/D Ratio: ${(database_final_kills_bedwars/database_final_death).toFixed(2)} ➜ ${(server_final_kills_bedwars/server_final_death).toFixed(2)}\nCoins: ${thousand(database_coins)} ➜ ${thousand(server_coins)}\nWinstreak: ${winstreak_overall} ➜ ${(winstreak_overall)+1}`
                
                if (server_losses != database_losses && database_losses+1 == server_losses){
                    console.log(LostFormat)
                    const PlayerDataExtra = {
                        "overall_winstreak": `0`
                    }
                    fs.writeFileSync(`./database/${server.player.uuid}.json`, JSON.stringify(server.player));
                    fs.writeFileSync(`./database/${server.player.uuid}_extra.json`, JSON.stringify(PlayerDataExtra));
                    //console.log(`[!] ${server.player.displayname}'s database synced\n`)
                }
                else if (server_losses != database_losses && database_losses+1 != server_losses){
                    console.log(NotifyOutage)
                    console.log(LostFormat)
                    const PlayerDataExtra = {
                        "overall_winstreak": `0`
                    }
                    fs.writeFileSync(`./database/${server.player.uuid}.json`, JSON.stringify(server.player));
                    fs.writeFileSync(`./database/${server.player.uuid}_extra.json`, JSON.stringify(PlayerDataExtra));
                    //console.log(`[!] ${server.player.displayname}'s database synced (Outage)\n`)
                }
                else if(server_wins_bedwars != database_wins_bedwars && database_wins_bedwars+1 == server_wins_bedwars){
                    console.log(WinFormat)
                    const PlayerDataExtra = {
                        "overall_winstreak": `${winstreak_overall+1}`
                    }
                    fs.writeFileSync(`./database/${server.player.uuid}.json`, JSON.stringify(server.player));
                    fs.writeFileSync(`./database/${server.player.uuid}_extra.json`, JSON.stringify(PlayerDataExtra));
                    //console.log(`[!] ${server.player.displayname}'s database synced\n`)
                }
                else if(server_wins_bedwars != database_wins_bedwars && database_wins_bedwars+1 != server_wins_bedwars){
                    console.log(NotifyOutage)
                    console.log(WinFormat)
                    const PlayerDataExtra = {
                        "overall_winstreak": `0`
                    }
                    fs.writeFileSync(`./database/${server.player.uuid}.json`, JSON.stringify(server.player));
                    fs.writeFileSync(`./database/${server.player.uuid}_extra.json`, JSON.stringify(PlayerDataExtra));
                    //console.log(`[!] ${server.player.displayname}'s database synced (Outage)\n`)
                }
                else{
                    return
                }
            })
        });
    }
    catch(e){console.log(`[!] Error: ${e.message}`)}
  }

}
  
module.exports = ClientFunctions;