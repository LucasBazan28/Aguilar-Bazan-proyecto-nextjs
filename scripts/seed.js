const { completeAlbums } = require('./placeholder-data');

require('dotenv').config();
const { db } = require('@vercel/postgres');
const { createPool } = require('@vercel/postgres');

// Utiliza la variable de entorno para la cadena de conexión
const connectionString = process.env.POSTGRES_URL;

async function seedAlbums(client) {
  try {
    const albums = await completeAlbums();

    // Create the "albums" table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS albums (
        name VARCHAR(255) NOT NULL,
        artist VARCHAR(255) NOT NULL,
        smallImage VARCHAR(255),
        mediumImage VARCHAR(255),
        largeImage VARCHAR(255),
        extraLargeImage VARCHAR(255),   
        megaImage VARCHAR(255),
        lastFmUrl VARCHAR(255),
        listeners INT, 
        genre VARCHAR(255),
        summary TEXT
      );
    `;

    console.log(`Created "albums" table`);

    // Insert data into the "albums" table
    // Insertar datos en la tabla "albums" secuencialmente
    for (const album of albums) {
      try {
        await client.sql`
          INSERT INTO albums (name, artist, smallImage, mediumImage, largeImage, extraLargeImage, megaImage, lastFmUrl, listeners, genre, summary)
          VALUES (${album.album.name}, ${album.album.artist},
                  ${album.album.image[0]["#text"]}, ${album.album.image[1]["#text"]},
                  ${album.album.image[2]["#text"]}, ${album.album.image[3]["#text"]},
                  ${album.album.image[4]["#text"]}, ${album.album.url}, ${parseInt(album.album.listeners, 10)},
                  ${album.album.genre}, ${album.album.wiki ? album.album.wiki.summary : null}
          )
        `;
      } catch (error) {
        console.error(`Error inserting album: ${album.album.name}`, error);
      }
    }

    console.log(`Seeded albums`);

  } catch (error) {
    console.error('Error seeding albums:', error);
    throw error;
  }
}

async function main() {
  // Verificar que la variable de entorno POSTGRES_URL está definida
  if (!connectionString) {
    throw new Error('Missing POSTGRES_URL environment variable');
  }

  const pool = createPool({ connectionString });
  const client = await pool.connect();

  await seedAlbums(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});