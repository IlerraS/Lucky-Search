console.log('lets goo');
require('dotenv').config()
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ 
    cloud: { id:  process.env.CLOUD_ID},
    auth: { apiKey: process.env.APIKEY} 
});

exports.getSearch = (req,res) =>
{
    //change query values
    const query = {
        index: 'songs',
        body: {
            query: 
            {
                multi_match: 
                {
                    query: `${req.params.query}`, //value here
                    fields: ['column2', 'column1', 'column4', 'column3', 'column5']
                }
            },
            highlight: 
            {
                    fields:
                    {
                        column5: {number_of_fragments: 0}
                    }
            },
            size: 50,
        }
    }

    client.search(query)
    .then(response => {
      res.send(response.hits.hits);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });

}