import { Query, Resolver, Mutation, Arg } from "type-graphql"
import { GrubSpotInput, GrubSpot } from "./saGrubSpots.schema"

@Resolver(() => GrubSpot)
export class GrubSpotsResolver {
    private saGrubSpots: GrubSpot[] = [
        { id: 1, name: "Güeritos Red Tacos", location: "8701 FM-1560, San Antonio, TX 78254" },
        { id: 2, name: "The Taco Place", location: "11395 Shaenfield Rd, San Antonio, TX 78254" },
        { id: 3, name:  "Holy Smoke BBQ & Taquitos", location: "1009 Av B, San Antonio, TX 78215" },
    ]

    @Query(() => [GrubSpot])
    async getGrubSpots(): Promise<GrubSpot[]> {
        return this.saGrubSpots
    }

    @Query(() => GrubSpot)
    async getGrubSpot(@Arg("id") id: number): Promise<GrubSpot | undefined> {
        const grubSpot = this.saGrubSpots.find(g => g.id === id)
        return grubSpot
    }

    @Mutation(() => GrubSpot)
    async createGrubSpot(@Arg("input") input: GrubSpotInput): Promise<GrubSpot> {
        const grubSpot = {
            id: this.saGrubSpots.length + 1,
            ...input,
        }

        this.saGrubSpots.push(grubSpot)
        return grubSpot
    }

    @Mutation(() => GrubSpot)
    async updateGrubSpot(
        @Arg("id") id: number,
        @Arg("input") input: GrubSpotInput
    ): Promise<GrubSpot> {
        const grubSpot = this.saGrubSpots.find(g => g.id === id)

        if(!grubSpot) {
            throw new Error("GrubSpot")
        }

        const updatedGrubSpot = {
            ...grubSpot,
            ...input,
        }

        this.saGrubSpots = this.saGrubSpots.map(g => (g.id === id ? updatedGrubSpot : g ))

        return updatedGrubSpot
    }
}