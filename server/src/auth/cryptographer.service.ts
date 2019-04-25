import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CryptographerService {

    getHashForString(stringToHash: string) {
        return bcrypt.hashSync(stringToHash, bcrypt.genSaltSync(8));
    }

    public checkPassword(saltedPasswordHash, candidatePassword) {
        return bcrypt.compareSync(candidatePassword, saltedPasswordHash);
      }
}
