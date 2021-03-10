async function getDlcs(array, id) {

    await fetch(`https://api.rawg.io/api/games/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ha ido algo mal...");
            }
            return response.json();
        })
        .then(dlc => {
            let poster = "";
            if (dlc.background_image !== null) {
                poster = dlc.background_image;
            } else {
                poster = "https://i.stack.imgur.com/y9DpT.jpg";
            }
            let release="";
            if(dlc.released!==null){
                release=dlc.released
            }
            const dlcObject = {
                name: dlc.name,
                description: dlc.description,
                poster: poster,
                releaseDate: release
            };
            array.push(dlcObject)


        })
        .catch(error => alert("Something went wrong getting each DLC"));
};

async function getDlcArray(array, id) {
    await fetch(`https://api.rawg.io/api/games/${id}/additions`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ha ido algo mal...");
            }
            return response.json();
        })
        .then(dlcs => {

            dlcs.results.forEach(value => {
                array.push(value.id)
            })

        })
        .catch(error => alert("Something went wrong getting the DLCS"));
}

async function getGame(array, id, images) {

    await fetch(`https://api.rawg.io/api/games/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ha ido algo mal...");
            }
            return response.json();
        })
        .then(game => {

            let imagesArray = [];
            images.forEach(value => imagesArray.push(value.image));
            let platforms = [];
            game.parent_platforms.forEach(value => platforms.push(value.platform.name))
            let minimum = "PC Minimum: Not specified";
            let recomended = "PC Recommended: Not specified";
            if (game.platforms[0].platform.name === "PC") {
                if(game.platforms[0].requirements.minimum!==undefined){
                    minimum = game.platforms[0].requirements.minimum;
                }
                if( game.platforms[0].requirements.recommended!==undefined){
                    recomended = game.platforms[0].requirements.recommended;
                }
            }
            let genres = [];
            game.genres.forEach(value => genres.push(value.name));

            let clip = "";
            if (game.clip !== null) {
                clip = game.clip.clip
            }
            let developers = "";
            if (game.publishers.length !== 0) {
                developers = game.publishers[0].name
            } else {
                developers = game.developers[0].name
            }
            metacritic=0;
            if(game.metacritic!==null){
                metacritic=game.metacritic;
            }

            let gameObject = {
                name: game.name,
                description: game.description,
                poster: game.background_image,
                images: imagesArray,
                clip: clip,
                releaseDate: game.released,
                platforms: platforms,
                pcMinimum: minimum,
                pcRecomended: recomended,
                genres: genres,
                developers: developers,
                metacritic:metacritic ,
                dlcs: []
            }

            array.push(gameObject);
        })
        .catch(error => alert(error))
}


async function getAllGames(array, page) {
    await fetch(`https://api.rawg.io/api/games?page=${page}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ha ido algo mal...");
            }
            return response.json();
        })
        .then(data => {

            data.results.forEach(value => {
                let game = { id: value.id, images: value.short_screenshots };
                array.push(game);
            });
        })
        .catch(error => alert(error));
}


async function getAndPostGame() {
    const allGamesArrayRaw = [];
    for (let i = 1; i <= 20; i++) {
        await getAllGames(allGamesArrayRaw, i);
    }


    console.log(allGamesArrayRaw);

    const allGamesArray = [];

    for (let index = 0; index < allGamesArrayRaw.length; index++) {
        await getGame(allGamesArray, allGamesArrayRaw[index].id, allGamesArrayRaw[index].images)
        let dlcArray = [];
        await getDlcArray(dlcArray, allGamesArrayRaw[index].id);

        for (let i = 0; i < dlcArray.length; i++) {
            await getDlcs(allGamesArray[index].dlcs, dlcArray[i])
        }


    }
    console.log(allGamesArray);


    const options = {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(allGamesArray)
    };

    fetch("http://localhost:8888/add", options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("Send OK");
            console.log(data);
        })
        .catch(error => alert(error));

}

getAndPostGame()


