# Advanced Bedwars Tracing Console
A minimal bedwars player statistics tracker using hypixel API with pure .json

# Requirements
- Node.js (v.16.15 recommended)
- Hypixel API Key

# How to use
- **Install node.js** Download and install *(https://nodejs.org/en/download/)*
- **Download tracker** Download directly from **Code** button or *gh repo clone FlyingDigitalz/personal-bedwars-tracker*
- **Retrieve key** Retrieve key using /api new on hypixel and paste api key in *./config/client.json*
- **Start application** run worker.bat or *npm start*

# Configuration
- **Insert Player** Insert a player UUID into player list, An application will automatically detect a new player and start tracking *e.g. ["8e631fb53992414994d607daa099887a", "b8e1f7934f774dc0abbcb2830a8724e6"] (File path: ./config/player.json)*
- **Interval** Set interval (40-60 is recommended), A smaller integer will decrease delay, also the number of players to trace *e.g. "interval": "60" (File path: ./config/client.json)*

# How it works
![IMG](https://github.com/FlyingDigitalz/personal-bedwars-tracker/blob/main/asset/img/howitworks_flowchart.png)
