import "reflect-metadata"
import { buildSchema } from "type-graphql"
import express from "express"
import { graphqlHTTP } from "express-graphql"

import { GrubSpotsResolver } from "../saGrubSpots/saGrubSpots.resolvers"

async function main() {
    const schema = await buildSchema({
        resolvers: [GrubSpotsResolver],
        emitSchemaFile: true,
    })


const app = express()

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        graphiql: true,

    })
)

const PORT = 8000

app.listen(PORT)

console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`)
}

main()