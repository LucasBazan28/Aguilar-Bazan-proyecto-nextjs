const PlaceHoldersData = [
    {
        artist: "Scorpions",
        album: "Crazy World" 
    },
    {
        artist: "Scorpions",
        album: "Blackout" 
    },
    {
        artist: "Queen",
        album: "The Game" 
    },
    {
        artist: "Queen",
        album: "A Night At The Opera" 
    }
]

const apiKey = "7bdea081f9cfb2778ce14d92ef7cc2ed"

let albums = []

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

async function completeAlbums(){
  
    for (let i = 0; i < PlaceHoldersData.length; i++) {
        let url = "https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key="+apiKey+"&artist="+PlaceHoldersData[i].artist+"&album="+PlaceHoldersData[i].album+"&format=json";
        const data = await fetchData(url);
        albums.push(data)
     }

}

async function main() {
    await completeAlbums();

    for (let i = 0; i < albums.length; i++) {
        const album = albums[i];
  
        // Imprimir los valores "artist", "name" y "listeners"
        console.log("Artista:", album.album.artist);
        console.log("Nombre del álbum:", album.album.name);
        console.log("Oyentes:", album.album.listeners);
  
        // Verificar si el objeto tiene la propiedad "wiki"
        if (album.album.wiki) {
            const wiki = album.album.wiki;
            // Imprimir los valores "summary" y "published" dentro de "wiki"
            console.log("Resumen:", wiki.summary);
            console.log("Publicado:", wiki.published);
            console.log("Imagen 1: ", album.album.image[0]["#text"])
        } else {
            console.log("Este álbum no tiene información de wiki.");
        }
    }
}
  
main().catch((err) => {
    console.error(
      "An error occurred while attempting to catch the data",
      err,
    );
  });

module.exports = {
    albums
};