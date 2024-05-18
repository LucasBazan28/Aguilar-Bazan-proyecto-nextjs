const PlaceHoldersData = [
    {
        artist: "Scorpions",
        album: "Crazy World",
        genre: "rock"
    },
    {
        artist: "Scorpions",
        album: "Blackout",
        genre: "rock"
    },
    {
        artist: "Queen",
        album: "The Game",
        genre: "rock"
    },
    {
        artist: "Queen",
        album: "A Night At The Opera",
        genre: "rock"
    },
    {
        artist: "Metallica",
        album: "Black Album",
        genre: "metal"
    },
    {
        artist: "Metallica",
        album: "Master Of Puppets",
        genre: "metal"
    },
    {
        artist: "Creed",
        album: "My Own Prison",
        genre: "metal"
    },
    {
        artist: "Creed",
        album: "Human Clay",
        genre: "metal"
    },
    {
        artist: "Maria Becerra",
        album: "Animal",
        genre: "pop"
    },
    {
        artist: "Maria Becerra",
        album: "La Nena De Argentina",
        genre: "pop"
    },
    {
        artist: "Aerosmith",
        album: "Rocks",
        genre: "rock"
    },
    {
        artist: "Aerosmith",
        album: "Pump",
        genre: "rock"
    },
    {
        artist: "Aerosmith",
        album: "Get Your Wings",
        genre: "rock"
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
        data.album.genre = PlaceHoldersData[i].genre;
        albums.push(data);
     }
     return albums;
}
module.exports = {
    completeAlbums
  };

/*
async function main() {
    await completeAlbums();

    /*for (let i = 0; i < albums.length; i++) {
        const album = albums[i];
  
        // Imprimir los valores "artist", "name" y "listeners"
        console.log("Artista:", album.album.artist);
        console.log("Nombre del álbum:", album.album.name);
        console.log("Oyentes:", album.album.listeners);

        for (let j = 0; j < album.album.image.length; j++) {        //se muestran las imagenes que tiene cada album
            console.log("Imagen " + j + " size: ", album.album.image[j]["size"])
            console.log("Imagen " + j + " link: ", album.album.image[j]["#text"])
        }

        console.log("Género:", album.album.genre);
  
        // Verificar si el objeto tiene la propiedad "wiki"
        if (album.album.wiki) {
            const wiki = album.album.wiki;
            // Imprimir los valores "summary" y "published" dentro de "wiki"
            console.log("Resumen:", wiki.summary);
            console.log("Publicado:", wiki.published);
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

*/