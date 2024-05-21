## INTRO

- This is a app I created for fun that uses weaviates vector database to make an image search engine
- I have included landscape images to populate the database

## INSTALLS

- make sure to install Node.JS https://nodejs.org/en/download/package-manager
- make sure to install Docker https://www.docker.com/

## COMMANDS

| COMMAND | ACTION |  
| `docker-compose up -d` | Launches docker maybe be slow the first time |
| `npm install` | Installs dependencies |
| `npm run dev` | Starts local dev server at `localhost:3000` |
| `docker-compose down` | shut down database & also empties it |

## USAGE

- Add a image you want to search for by adding it to the image folder and using, const test = Buffer.from( fs.readFileSync(IMAGE PATH GOES HERE) ).toString('base64');

- if you want to add to the database put an image in the img foler and use storeImage()
