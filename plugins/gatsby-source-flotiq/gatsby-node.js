const fetch = require("node-fetch");
const crypto = require('crypto');

let headers = {
    "accept": "application/json"
};
let apiUrl;

exports.sourceNodes = async ({actions}, {baseUrl, authToken}) => {
    const { createNode } = actions;
    apiUrl = baseUrl.replace(/\/$/, "");
    headers['X-AUTH-TOKEN'] = authToken;

    const response = await fetch(apiUrl + '/api/v1/content/event?hydrate=1', {
        headers: headers
    });
    if(response.ok) {
        let json = await response.json();
        let nodes = await Promise.all(json.data.map(async datum => {
            return createNode({
                // custom
                slug: datum.slug,
                name: datum.name,
                description: datum.description,
                address: datum.address,
                date: datum.date,
                gallery: datum.gallery,
                flotiqInternal: datum.internal,
                //required
                id: datum.id,
                parent: null,
                children: [],
                internal: {
                    type: `FlotiqEvent`,
                    contentDigest: crypto
                        .createHash(`md5`)
                        .update(JSON.stringify(datum))
                        .digest(`hex`),
                }
            })
        }));
        return await nodes;
    }

    return
};

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
    type FlotiqProject implements Node {
      slug: String!
      name: String!
      description: String!
      address: String!
      date: String!
      gallery: [FlotiqGallery]!
      flotiqInternal: FlotiqInternal!
    }
    type FlotiqGallery {
      id: String!
      extension: String!
    }
    type FlotiqInternal {
      createdAt: String!
      deletedAt: String!
      updatedAt: String!
      contentType: String!
    }
  `
    createTypes(typeDefs)
}
