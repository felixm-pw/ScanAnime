const axios = require('axios')
const fs = require('fs')
const chalk = require('chalk')
const NetConfig = require('../packs/net_config')

function main(){
    function cache(callback){
        axios({
            method: 'get',
            url: 'http://'+NetConfig.ip+':'+NetConfig.port+'/api/list_all',
            responseType: 'json',
        })
        .then((response) => {
            var newList = []
            var Listkeys = Object.keys(response.data.list)
            for(var i = 0; i < Listkeys.length; i++){
                for(var z = 0; z < response.data.list[Listkeys[i]].length; z++){
                    var animeObject = {
                        title: response.data.list[Listkeys[i]][z].Title,
                        id: response.data.list[Listkeys[i]][z].ID
                    }
                    newList.push(animeObject)
                }
            }
            callback(newList)
        })
        .catch((err) => {
            console.log(chalk.bgRed.black("ERROR: No response from API"))
        })
    }
    
    cache((newList) => {
        let json = JSON.stringify(newList)
        fs.writeFile('cache.json', json, (err) => {
            if (err){
                console.log(chalk.bgRed.black(err))
            } 
            console.log(chalk.bgGreen.black(" Cache Updated At: " + new Date().toLocaleString().replace(",","").replace(/:.. /," ") + " "))
        });
    })

    setTimeout(() => {
        main()
    }, 10800000)
}

main()