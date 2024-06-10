import { PrismaClient } from '@prisma/client';
import { users } from './mock_data/users';
import { meetings } from './mock_data/meetings';

const prisma = new PrismaClient();

async function runSeeders() {
  // Users
  await Promise.all(
    users.map(async (user) =>
      prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: user,
      }),
    ),
  );

  // Meetings
  await Promise.all(
    meetings.map(async (meeting) =>
      prisma.meeting.upsert({
        where: { id: meeting.id },
        update: {},
        create: meeting,
      }),
    ),
  );
}

runSeeders()
  .catch((e) => {
    console.error(`There was an error while seeding: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Successfully seeded database. Closing connection.');
    await prisma.$disconnect();
  });
