import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService {
  constructor(private rolesRepository: RolesRepository) {}

  createRole(name: string) {
    return this.rolesRepository.create(name);
  }

  findByName(name: string) {
    return this.rolesRepository.findByName(name);
  }

  findAll() {
    return this.rolesRepository.findAll();
  }
}