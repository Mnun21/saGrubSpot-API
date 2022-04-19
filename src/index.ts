import { buildSchema } from "graphql"
import express from "express"
import { graphqlHTTP } from "express-graphql"

const saGrubSpots = [
    { id: 1, name: "Güeritos Red Tacos", location: "8701 FM-1560, San Antonio, TX 78254" },
    { id: 2, name: "The Taco Place", location: "11395 Shaenfield Rd, San Antonio, TX 78254" },
    { id: 3, name: "Holy Smoke BBQ & Taquitos", location: "1009 Av B, San Antonio, TX 78215" },
]

const schema = buildSchema(`
    input GrubInput {
        location: String!
        name: String!
    }

    type GrubSpot {
        id: Int!
        name: String!
        location: String!
    }

    type Mutation {
        createGrubSpot(input: GrubInput): GrubSpot
        updateGrubSpot(id: Int!, input: GrubInput): GrubSpot
    }

    type Query {
        getGrubSpot(id: String): GrubSpot
        getGrubSpots: [GrubSpot]
    }
`)

type GrubSpot = {
    id: number
    name: string
    location: string
}

type GrubInput = Pick<GrubSpot, "location" | "name">

const getGrubSpot = (args: { id: number }): GrubSpot | undefined => 
    saGrubSpots.find(g => g.id === args.id)

const getGrubSpots = (): GrubSpot[] => saGrubSpots

const createGrubSpot = (args: { input: GrubInput}): GrubSpot => {
    const grubSpot = {
        id: saGrubSpots.length + 1,
        ...args.input,
    }
    saGrubSpots.push(grubSpot)

    return grubSpot
}

const updateGrubSpot = (args: { grubSpot: GrubSpot }): GrubSpot => {
    const index = saGrubSpots.findIndex(g => g.id === args.grubSpot.id)
    const targetGrubSpot = saGrubSpots[index]

    if (targetGrubSpot) saGrubSpots[index] = args.grubSpot

    return targetGrubSpot
}

const root = {
    getGrubSpot,
    getGrubSpots,
    createGrubSpot,
    updateGrubSpot,
}

const app = express()

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,

    })
)

const PORT = 8000

app.listen(PORT)

console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`)