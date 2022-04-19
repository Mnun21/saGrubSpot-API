import { Field, ObjectType, InputType } from "type-graphql"

@ObjectType()
export class GrubSpot {
    @Field()
    id!: number
    @Field()
    name!: string
    @Field()
    location!: string
}

@InputType()
export class GrubSpotInput implements Pick<GrubSpot, "name" | "location"> {
    @Field()
    name!: string
    @Field()
    location!: string
}