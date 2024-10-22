import { IAnimal, IBreed, IOwner, IType } from "."

export interface IPet {
    id: string,
    name: string,
    age: number,
    price: number,
    color: string,
    type: IType,
    isClubMember: boolean,
    animal: IAnimal,
    hasGenealogicalList: boolean,
    owner?: IOwner,
    petShop?: string,
    breed?: IBreed,
  }
  
export interface IAddPet {
    name: string;
    age: number;
    animal: IAnimal; 
    price: number;
    type: IType; 
    color: string;
    hasGenealogicalList: boolean;
    isClubMember: boolean;
    owner?: IOwner;
    petShop?: string;
    breed?: string;
}

export interface ISearchPet {
  name?: string;
  age?: number;
  animal?: IAnimal;
  type?: IType;
}