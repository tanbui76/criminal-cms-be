const { createConnection } = require('typeorm');
const { CriminalEntity } = require('./dist/features/criminals/entities/criminal.entity');
const { ProfileTypeEntity } = require('./dist/features/profileTypes/entities/profile-type.entity');
const config = require('config');

async function runSeed() {
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
  
  console.log('Creating Criminals...');
  
  // Lấy tất cả profile types
  const profileTypes = await connection
    .getRepository(ProfileTypeEntity)
    .createQueryBuilder('profileType')
    .getMany();

  if (profileTypes.length === 0) {
    console.log('No profile types found, skipping criminal seed');
    return;
  }

  console.log('Available profile types:', profileTypes.map(pt => pt.name));

  const criminalsData = [
    {
      name: 'Nguyễn Văn A',
      description: 'Phạm tội trộm cắp tài sản, được hưởng án treo 2 năm',
      birthplace: 'Hà Nội',
      birthdate: new Date('1990-05-15'),
      address: '123 Đường ABC, Quận 1, TP.HCM',
      startExecuteDate: new Date('2023-01-15'),
      endExecuteDate: new Date('2025-01-15'),
      doneExecuteDate: null,
      profileTypeNames: ['Hồ sơ thi hành án treo', 'Hồ sơ thi hành án phạt cấm cư trú']
    },
    {
      name: 'Trần Thị B',
      description: 'Phạm tội buôn bán ma túy, đang chấp hành án cải tạo 3 năm',
      birthplace: 'TP.HCM',
      birthdate: new Date('1985-08-22'),
      address: '456 Đường XYZ, Quận 3, TP.HCM',
      startExecuteDate: new Date('2022-06-10'),
      endExecuteDate: new Date('2025-06-10'),
      doneExecuteDate: null,
      profileTypeNames: ['Hồ sơ thi hành án phạt cải tạo không giam giữ', 'Hồ sơ thi hành án phạt tước một số quyền công dân', 'Hồ sơ thi hành án phạt cấm đảm nhiệm chức vụ, cấm hành nghề hoặc làm công việc nhất định']
    },
    {
      name: 'Lê Văn C',
      description: 'Phạm tội cố ý gây thương tích, bị cấm cư trú tại TP.HCM 2 năm',
      birthplace: 'Đà Nẵng',
      birthdate: new Date('1988-12-03'),
      address: '789 Đường DEF, Quận 5, TP.HCM',
      startExecuteDate: new Date('2023-03-20'),
      endExecuteDate: new Date('2025-03-20'),
      doneExecuteDate: null,
      profileTypeNames: ['Hồ sơ thi hành án phạt cấm cư trú']
    },
    {
      name: 'Phạm Thị D',
      description: 'Phạm tội lừa đảo chiếm đoạt tài sản, đang chấp hành án quản chế 2 năm',
      birthplace: 'Cần Thơ',
      birthdate: new Date('1992-04-18'),
      address: '321 Đường GHI, Quận 7, TP.HCM',
      startExecuteDate: new Date('2023-08-05'),
      endExecuteDate: new Date('2025-08-05'),
      doneExecuteDate: null,
      profileTypeNames: ['Hồ sơ thi hành án phạt quản chế', 'Hồ sơ thi hành án phạt cấm cư trú']
    },
    {
      name: 'Hoàng Văn E',
      description: 'Phạm tội giết người, được hoãn chấp hành án phạt tù do lý do sức khỏe',
      birthplace: 'Hải Phòng',
      birthdate: new Date('1980-11-30'),
      address: '654 Đường JKL, Quận 2, TP.HCM',
      startExecuteDate: new Date('2021-12-01'),
      endExecuteDate: null,
      doneExecuteDate: null,
      profileTypeNames: ['Hồ sơ thi hành quyết định hoãn chấp hành án phạt tù', 'Hồ sơ thi hành quyết định tạm đình chỉ chấp hành án phạt tù']
    },
    {
      name: 'Võ Thị F',
      description: 'Phạm tội tham nhũng, bị tước quyền công dân 5 năm',
      birthplace: 'Bình Dương',
      birthdate: new Date('1987-03-12'),
      address: '987 Đường MNO, Quận 8, TP.HCM',
      startExecuteDate: new Date('2023-05-10'),
      endExecuteDate: new Date('2028-05-10'),
      doneExecuteDate: null,
      profileTypeNames: ['Hồ sơ thi hành án phạt tước một số quyền công dân', 'Hồ sơ thi hành án phạt cấm đảm nhiệm chức vụ, cấm hành nghề hoặc làm công việc nhất định', 'Hồ sơ thi hành quyết định tạm đình chỉ chấp hành án phạt tù']
    },
    {
      name: 'Đặng Văn G',
      description: 'Phạm tội tham nhũng, bị cấm đảm nhiệm chức vụ 3 năm',
      birthplace: 'Đồng Nai',
      birthdate: new Date('1975-09-25'),
      address: '147 Đường PQR, Quận 9, TP.HCM',
      startExecuteDate: new Date('2022-11-15'),
      endExecuteDate: new Date('2025-11-15'),
      doneExecuteDate: null,
      profileTypeNames: ['Hồ sơ thi hành án phạt cấm đảm nhiệm chức vụ, cấm hành nghề hoặc làm công việc nhất định']
    },
    {
      name: 'Lý Thị H',
      description: 'Phạm nhân được tha tù trước thời hạn có điều kiện',
      birthplace: 'Long An',
      birthdate: new Date('1995-07-08'),
      address: '258 Đường STU, Quận 10, TP.HCM',
      startExecuteDate: new Date('2024-01-20'),
      endExecuteDate: new Date('2026-01-20'),
      doneExecuteDate: null,
      profileTypeNames: ['Hồ sơ phạm nhân của người được tha tù trước thời hạn có điều kiện', 'Hồ sơ thi hành quyết định tạm đình chỉ chấp hành án phạt tù']
    }
  ];

  for (const criminalData of criminalsData) {
    console.log(`Creating criminal: ${criminalData.name}`);
    
    // Tách profileTypeNames ra khỏi criminalData
    const { profileTypeNames, ...criminalInfo } = criminalData;
    const criminal = new CriminalEntity(criminalInfo);
    
    // Tìm profile types phù hợp cho criminal này
    const criminalProfileTypes = profileTypes.filter(pt => 
      profileTypeNames.includes(pt.name)
    );
    
    criminal.profileTypes = criminalProfileTypes;
    
    await connection.manager.save(criminal);
    console.log(`Criminal created with ${criminalProfileTypes.length} profile types: ${criminalProfileTypes.map(pt => pt.name).join(', ')}`);
  }
  
  console.log('Criminals created successfully');
  await connection.close();
}

runSeed().catch(console.error); 