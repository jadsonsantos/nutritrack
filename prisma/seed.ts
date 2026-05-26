import * as bcrypt from 'bcryptjs'

async function main() {
  const { PrismaClient } = await import('@prisma/client')
  const db = new PrismaClient()

  await db.foodLog.deleteMany()
  await db.weightLog.deleteMany()
  await db.meal.deleteMany()
  await db.mealPlan.deleteMany()
  await db.patientProfile.deleteMany()
  await db.nutritionistProfile.deleteMany()
  await db.session.deleteMany()
  await db.account.deleteMany()
  await db.user.deleteMany()

  const nutritionistUser = await db.user.create({
    data: {
      name: 'Dr. Silva',
      email: 'dr.silva@nutritrack.com',
      password: await bcrypt.hash('senha123', 10),
      role: 'NUTRITIONIST',
    },
  })

  const nutritionistProfile = await db.nutritionistProfile.create({
    data: {
      userId: nutritionistUser.id,
      crn: 'CRN-1234',
      specialty: 'Nutricionista Clínico',
    },
  })

  await db.user.create({
    data: {
      name: 'Ana Lúcia Oliveira',
      email: 'ana.lucia@email.com',
      password: await bcrypt.hash('senha123', 10),
      role: 'PATIENT',
      patient: {
        create: {
          nutritionistId: nutritionistProfile.id,
          currentWeight: 64.5,
          goalWeight: 60.0,
        },
      },
    },
  })

  await db.user.create({
    data: {
      name: 'Ricardo Mendonça',
      email: 'r.mendonca@email.com',
      password: await bcrypt.hash('senha123', 10),
      role: 'PATIENT',
      patient: {
        create: {
          nutritionistId: nutritionistProfile.id,
          currentWeight: 89.2,
          goalWeight: 82.0,
        },
      },
    },
  })

  console.log('✓ Seed concluído!')
  console.log('  Nutricionista: dr.silva@nutritrack.com')
  console.log('  Paciente 1: ana.lucia@email.com')
  console.log('  Paciente 2: r.mendonca@email.com')
  console.log('  Senha de todos: senha123')

  await db.$disconnect()
}

main().catch(console.error)
