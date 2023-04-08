import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm"
import { Profile } from "../../profile/entity/Profile"

@Entity({name: "interaction"})
export class Interaction extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { nullable: true })
    details: string

    @Column("boolean", { default: false })
    deleted: boolean

    @ManyToOne(() => Profile, (profile) => profile.interactions)
    profile: Profile
}