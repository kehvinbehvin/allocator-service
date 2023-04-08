import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm"
import { User } from "../../user/entity/User"

@Entity({name: "profile"})
export class Profile extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { nullable: true, length: 200 })
    firstName: string

    @Column("varchar", { nullable: true, length: 200 })
    lastName: string

    @Column("varchar", { nullable: true })
    relationship: string

    @Column("boolean", { default: false })
    deleted: boolean

    @ManyToOne(() => User, (user) => user.profiles)
    user: User
}