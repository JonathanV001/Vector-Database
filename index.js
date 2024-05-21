
import weaviate from 'weaviate-ts-client';
import * as fs from 'fs';


const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
});

/*creates scheme only need to run once*/
const schemaConfig = {
    'class': 'Landscape',
    'vectorizer': 'img2vec-neural',
    'vectorIndexType': 'hnsw',
    'moduleConfig':{
        'img2vec-neural':{
            'imageFields':[
                'image'
            ]
        }
    },
    'properties': [
        {
            'name': 'image',
            'dataType': ['blob']
        },
        {
            'name': 'text',
            'dataType': ['string']
        }
    ]
}

await client.schema.
    classCreator().
    withClass(schemaConfig)
    .do();
/*                                               */

/*function to store images tkae in file path and text to desscribe the image*/
async function storeImage(fileName, text){
    const img = fs.readFileSync(fileName);
    const b64 = Buffer.from(img).toString('base64');
    
    const res = await client.data.creator()
    .withClassName('Landscape')
    .withProperties({
        image: b64,
        text: text
    }).do();

}

storeImage('img/image1.jpg', 'savannah');
storeImage('img/image2.jpg', 'mountain');
storeImage('img/image3.jpg', 'desert_mountain');
storeImage('img/image4.jpg', 'forest_mountain');
storeImage('img/image5.jpg', 'snowy_mountain');
storeImage('img/image6.jpg', 'ocean_side');
storeImage('img/image7.jpg', 'waterfalls');
storeImage('img/image8.jpg', 'tropical');
storeImage('img/image10.jpg', 'flower_fields');
storeImage('img/image11.jpg', 'jungle');
storeImage('img/image12.png', 'ocean_mountains');


/*test image is the file you use to search the database*/
const test = Buffer.from( fs.readFileSync('img/volcano.jpg') ).toString('base64');

const resImage = await client.graphql.get()
    .withClassName('Landscape')
    .withFields(['image'])
    .withNearImage({image: test})
    .withLimit(1)
    .do();

    
const result = resImage.data.Get.Landscape[0].image;
fs.writeFileSync('./result.jpg', result, 'base64');