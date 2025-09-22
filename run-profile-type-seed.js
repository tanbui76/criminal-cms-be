const { createConnection } = require('typeorm');
const {
  ProfileTypeEntity
} = require('./dist/features/profileTypes/entities/profile-type.entity');
const config = require('config');

async function runProfileTypeSeed() {
  const dbConfig = config.get('db');

  const connection = await createConnection({
    type: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [__dirname + '/dist/**/*.entity.{js,ts}'],
    synchronize: false
  });

  console.log('Creating Profile Types...');

  const profileTypesData = [
    {
      name: 'Hồ sơ thi hành án treo',
      description: 'Hồ sơ thi hành án treo - Người được hưởng án treo'
    },
    {
      name: 'Hồ sơ thi hành án phạt cải tạo không giam giữ',
      description:
        'Hồ sơ thi hành án phạt cải tạo không giam giữ - Người đang chấp hành án cải tạo'
    },
    {
      name: 'Hồ sơ thi hành án phạt cấm cư trú',
      description:
        'Hồ sơ thi hành án phạt cấm cư trú - Người bị cấm cư trú tại địa phương'
    },
    {
      name: 'Hồ sơ thi hành án phạt quản chế',
      description:
        'Hồ sơ thi hành án phạt quản chế - Người đang chấp hành án quản chế'
    },
    {
      name: 'Hồ sơ thi hành quyết định hoãn chấp hành án phạt tù',
      description:
        'Hồ sơ thi hành quyết định hoãn chấp hành án phạt tù - Người được hoãn chấp hành án'
    },
    {
      name: 'Hồ sơ thi hành án phạt tước một số quyền công dân',
      description:
        'Hồ sơ thi hành án phạt tước một số quyền công dân - Người bị tước quyền công dân'
    },
    {
      name: 'Hồ sơ thi hành án phạt cấm đảm nhiệm chức vụ, cấm hành nghề hoặc làm công việc nhất định',
      description:
        'Hồ sơ thi hành án phạt cấm đảm nhiệm chức vụ, cấm hành nghề - Người bị cấm hành nghề'
    },
    {
      name: 'Hồ sơ thi hành quyết định tạm đình chỉ chấp hành án phạt tù',
      description:
        'Hồ sơ thi hành quyết định tạm đình chỉ chấp hành án phạt tù - Người được tạm đình chỉ'
    },
    {
      name: 'Hồ sơ phạm nhân của người được tha tù trước thời hạn có điều kiện',
      description:
        'Hồ sơ phạm nhân của người được tha tù trước thời hạn có điều kiện - Người được tha tù trước thời hạn'
    }
  ];

  for (const profileTypeData of profileTypesData) {
    console.log(`Creating profile type: ${profileTypeData.name}`);

    await connection
      .createQueryBuilder()
      .insert()
      .into(ProfileTypeEntity)
      .values(profileTypeData)
      .orIgnore()
      .execute();
  }

  console.log('Profile Types created successfully');
  await connection.close();
}

runProfileTypeSeed().catch(console.error);
