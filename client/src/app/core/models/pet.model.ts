import { IAnimal, IType } from "./enums"
import { IOwner } from "./owner.model"

export interface IPet {
    name: string,
    age: number,
    price: number,
    color: string,
    type: IType,
    isClubMember: boolean,
    animal: IAnimal,
    hasGenealogicalList: boolean,
    owner: IOwner,
    petShop: string,
    breed: string
  }