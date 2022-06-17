
fetch(`https://api.mcsrvstat.us/2/play.netherdepths.com`)
    .then(json => {
        json.json()
            .then(pong => {
                console.log(pong);
                if (pong.online) {
                    document.getElementById("status").innerText = `${pong.hostname} | ${pong.players.online} / ${pong.players.max} players online`;
                }
                else {
                    fetch(`https://api.mcsrvstat.us/2/play.chopsticksmc.net`)
                        .then(json => {
                            json.json()
                                .then(backup => {
                                    if (backup.online) {
                                        document.getElementById("status").innerText = `${backup.hostname} | ${backup.players.online} / ${backup.players.max} players online`;
                                    }
                                    else {
                                        document.getElementById("status").innerText = `play.netherdepths.com | Offline`;
                                    }
                                })
                        });
                }
            })
    });