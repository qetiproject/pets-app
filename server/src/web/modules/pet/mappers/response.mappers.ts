import { PetResponseDto } from '../dto';
import { PetEntity } from '../entities';

export class PetResponseMapper {
  mapPetToResponseDto(pet: PetEntity): PetResponseDto {
    const petResponseDto: PetResponseDto = {
      id: pet.id,
      name: pet.name,
      age: pet.age,
      price: pet.price,
      color: pet.color,
      type: pet.type,
      isClubMember: pet.isClubMember,
      animal: pet.animal,
      hasGenealogicalList: pet.hasGenealogicalList,
      breed: pet.breed,
    };

    return petResponseDto;
  }
}
