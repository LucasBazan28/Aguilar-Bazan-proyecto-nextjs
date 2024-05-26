const user = 
    {
      email: 'admin@admin.com',
      password: 'admin',
    }

const PlaceHoldersData = [
    {
        artist: "Scorpions",
        album: "Crazy World",
        genre: "rock",
        price: 30.10,
        cantidadComprada: 0
    },
    {
        artist: "Scorpions",
        album: "Blackout",
        genre: "rock",
        price: 20.15,
        cantidadComprada: 0
    },
    {
        artist: "Queen",
        album: "The Game",
        genre: "rock",
        price: 10.10,
        cantidadComprada: 0
    },
    {
        artist: "Queen",
        album: "A Night At The Opera",
        genre: "rock",
        price: 25.10,
        cantidadComprada: 0
    },
    {
        artist: "Metallica",
        album: "Black Album",
        genre: "metal",
        price: 40.10,
        cantidadComprada: 0
    },
    {
        artist: "Metallica",
        album: "Master Of Puppets",
        genre: "metal",
        price: 45.10,
        cantidadComprada: 0
    },
    {
        artist: "Creed",
        album: "My Own Prison",
        genre: "metal",
        price: 50.10,
        cantidadComprada: 0
    },
    {
        artist: "Creed",
        album: "Human Clay",
        genre: "metal",
        price: 15.80,
        cantidadComprada: 0
    },
    {
        artist: "Maria Becerra",
        album: "Animal",
        genre: "pop",
        price: 16.90,
        cantidadComprada: 0
    },
    {
        artist: "Maria Becerra",
        album: "La Nena De Argentina",
        genre: "pop",
        price: 18.90,
        cantidadComprada: 0
    },
    {
        artist: "Aerosmith",
        album: "Rocks",
        genre: "rock",
        price: 11.75,
        cantidadComprada: 0
    },
    {
        artist: "Aerosmith",
        album: "Pump",
        genre: "rock",
        price: 22.76,
        cantidadComprada: 0
    },
    {
        artist: "Aerosmith",
        album: "Get Your Wings",
        genre: "rock",
        price: 23.78,
        cantidadComprada: 0
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
        data.album.price = PlaceHoldersData[i].price;
        data.album.cantidadComprada = PlaceHoldersData[i].cantidadComprada;
        albums.push(data);
     }
     return albums;
}
module.exports = {
    completeAlbums, 
    user
  };

