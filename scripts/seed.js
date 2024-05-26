const { completeAlbums, user } = require('./placeholder-data');

require('dotenv').config();
const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

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
        summary TEXT,
        price NUMERIC(10, 2),
        cantidadComprada smallint
      );
    `;

    console.log(`Created "albums" table`);

    // Insert data into the "albums" table
    // Insertar datos en la tabla "albums" secuencialmente
    for (const album of albums) {
      try {
        await client.sql`
          INSERT INTO albums (name, artist, smallImage, mediumImage, largeImage, extraLargeImage, megaImage, lastFmUrl, listeners, genre, summary, price, cantidadComprada)
          VALUES (${album.album.name}, ${album.album.artist},
                  ${album.album.image[0]["#text"]}, ${album.album.image[1]["#text"]},
                  ${album.album.image[2]["#text"]}, ${album.album.image[3]["#text"]},
                  ${album.album.image[4]["#text"]}, ${album.album.url}, ${parseInt(album.album.listeners, 10)},
                  ${album.album.genre}, ${album.album.wiki ? album.album.wiki.summary : null}, ${album.album.price},
                  ${album.album.cantidadComprada}
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

async function seedCarts(client) {
  try {
    // Create the "carts" table if it doesn't exist
    await client.sql`
      CREATE TABLE carts (
        email VARCHAR(255) NOT NULL,
        products JSONB NOT NULL DEFAULT '[]'
    );
    `;

    console.log(`Created "Carts" table`);

    // Insert data into the "carts" table

  } catch (error) {
    console.error('Error seeding carts:', error);
    throw error;
  }
}


async function seedUsers(client) {
  try {
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS usersB (
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "users" table`);
    console.log(user.email);

    // Insert data into the "users" table

    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await client.sql`
        INSERT INTO usersB (email, password)
        VALUES (${user.email}, ${hashedPassword})
      `;
    } catch (error) {
      console.error(`Error inserting user: ${user.email}`, error);
    }
    
    console.log(`Seeded user`);

  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedAlbums(client);
  await seedUsers(client);
  await seedCarts(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});