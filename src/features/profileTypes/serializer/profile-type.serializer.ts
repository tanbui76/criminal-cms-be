import { ModelSerializer } from 'src/common/serializer/model.serializer';

export const basicFieldGroupsForSerializing: string[] = ['basic'];

export class ProfileTypeSerializer extends ModelSerializer {
  id: number;
}
