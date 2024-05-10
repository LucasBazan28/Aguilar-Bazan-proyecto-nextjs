const { db } = require('@vercel/postgres');
const {
  albums
} = require('../app/lib/placeholder-data.js');

async function seedAlbums(client) {
  try {

    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
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
        published VARCHAR(255),
        summary TEXT
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedAlbums = await Promise.all(
      albums.map(async (album) => {
        return client.sql`
        INSERT INTO albums (name, artist, smallImage, mediumImage, largeImage, extraLargeImage, megaImage, lastFmUrl, listeners, published, summary)
        VALUES (${album.album.name}, ${album.album.artist},
            ${album.album.image[0]["#text"]}, ${album.album.image[1]["#text"]},
            ${album.album.image[2]["#text"]}, ${album.album.image[3]["#text"]},
            ${album.album.image[4]["#text"]}, ${album.album.url}, ${parseInt(album.album.listeners, 10)},
            ${album.album.wiki.published}, ${album.album.wiki.summary}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedAlbums.length} albums`);

    return {
      createTable,
      albums: insertedAlbums,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedAlbums(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});