import * as bcrypt from 'bcryptjs'
import { ROLES } from '../src/lib/roles'

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
  await db.tacoFood.deleteMany()

  // Alimentos da tabela TACO
  const tacoFoods = await Promise.all([
    db.tacoFood.create({
      data: {
        id: 1,
        name: 'Ovo cozido',
        caloriesPer100g: 146,
        proteinPer100g: 13.3,
        carbsPer100g: 0.6,
        fatPer100g: 9.5,
        fiberPer100g: 0,
      },
    }),
    db.tacoFood.create({
      data: {
        id: 2,
        name: 'Pão integral',
        caloriesPer100g: 253,
        proteinPer100g: 8.9,
        carbsPer100g: 46.3,
        fatPer100g: 3.6,
        fiberPer100g: 5.6,
      },
    }),
    db.tacoFood.create({
      data: {
        id: 3,
        name: 'Iogurte natural',
        caloriesPer100g: 51,
        proteinPer100g: 3.9,
        carbsPer100g: 3.9,
        fatPer100g: 2.4,
        fiberPer100g: 0,
      },
    }),
    db.tacoFood.create({
      data: {
        id: 4,
        name: 'Frango grelhado',
        caloriesPer100g: 159,
        proteinPer100g: 31.5,
        carbsPer100g: 0,
        fatPer100g: 3.8,
        fiberPer100g: 0,
      },
    }),
    db.tacoFood.create({
      data: {
        id: 5,
        name: 'Arroz cozido',
        caloriesPer100g: 128,
        proteinPer100g: 2.5,
        carbsPer100g: 28.1,
        fatPer100g: 0.2,
        fiberPer100g: 1.6,
      },
    }),
    db.tacoFood.create({
      data: {
        id: 6,
        name: 'Feijão carioca',
        caloriesPer100g: 76,
        proteinPer100g: 4.8,
        carbsPer100g: 13.6,
        fatPer100g: 0.5,
        fiberPer100g: 8.4,
      },
    }),
    db.tacoFood.create({
      data: {
        id: 7,
        name: 'Banana prata',
        caloriesPer100g: 98,
        proteinPer100g: 1.3,
        carbsPer100g: 26.0,
        fatPer100g: 0.1,
        fiberPer100g: 2.0,
      },
    }),
    db.tacoFood.create({
      data: {
        id: 8,
        name: 'Salmão grelhado',
        caloriesPer100g: 180,
        proteinPer100g: 24.0,
        carbsPer100g: 0,
        fatPer100g: 9.0,
        fiberPer100g: 0,
      },
    }),
  ])

  // Nutricionista
  const nutritionistUser = await db.user.create({
    data: {
      name: 'Dr. Silva',
      email: 'dr.silva@nutritrack.com',
      password: await bcrypt.hash('senha123', 10),
      role: ROLES.NUTRITIONIST,
    },
  })

  const nutritionistProfile = await db.nutritionistProfile.create({
    data: {
      userId: nutritionistUser.id,
      crn: 'CRN-1234',
      specialty: 'Nutricionista Clínico',
    },
  })

  // Paciente 1
  const ana = await db.user.create({
    data: {
      name: 'Ana Lúcia Oliveira',
      email: 'ana.lucia@email.com',
      password: await bcrypt.hash('senha123', 10),
      role: ROLES.PATIENT,
      patient: {
        create: {
          nutritionistId: nutritionistProfile.id,
          currentWeight: 64.5,
          goalWeight: 60.0,
        },
      },
    },
    include: { patient: true },
  })

  // Plano alimentar da Ana
  const mealPlan = await db.mealPlan.create({
    data: {
      patientId: ana.patient!.id,
      nutritionistId: nutritionistProfile.id,
      name: 'Emagrecimento - Ana',
      targetCalories: 1800,
      targetProtein: 130,
      targetCarbs: 200,
      targetFat: 55,
      isActive: true,
    },
  })

  // Refeições do plano
  const cafeDaManha = await db.meal.create({
    data: {
      mealPlanId: mealPlan.id,
      name: 'Café da manhã',
      mealTime: '08:00',
      order: 1,
    },
  })
  const almoco = await db.meal.create({
    data: {
      mealPlanId: mealPlan.id,
      name: 'Almoço',
      mealTime: '12:30',
      order: 2,
    },
  })
  const lanche = await db.meal.create({
    data: {
      mealPlanId: mealPlan.id,
      name: 'Lanche da tarde',
      mealTime: '16:00',
      order: 3,
    },
  })

  // Registros de hoje da Ana
  const today = new Date()

  await db.foodLog.createMany({
    data: [
      {
        patientId: ana.patient!.id,
        tacoFoodId: tacoFoods[0].id,
        mealId: cafeDaManha.id,
        logDate: today,
        quantityG: 100,
      },
      {
        patientId: ana.patient!.id,
        tacoFoodId: tacoFoods[1].id,
        mealId: cafeDaManha.id,
        logDate: today,
        quantityG: 60,
      },
      {
        patientId: ana.patient!.id,
        tacoFoodId: tacoFoods[3].id,
        mealId: almoco.id,
        logDate: today,
        quantityG: 150,
      },
      {
        patientId: ana.patient!.id,
        tacoFoodId: tacoFoods[4].id,
        mealId: almoco.id,
        logDate: today,
        quantityG: 150,
      },
    ],
  })

  // Logs de peso da Ana
  await db.weightLog.createMany({
    data: [
      {
        patientId: ana.patient!.id,
        weight: 66.0,
        loggedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
      {
        patientId: ana.patient!.id,
        weight: 65.2,
        loggedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      },
      {
        patientId: ana.patient!.id,
        weight: 64.8,
        loggedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      },
      { patientId: ana.patient!.id, weight: 64.5, loggedAt: new Date() },
    ],
  })

  // Paciente 2
  await db.user.create({
    data: {
      name: 'Ricardo Mendonça',
      email: 'r.mendonca@email.com',
      password: await bcrypt.hash('senha123', 10),
      role: ROLES.PATIENT,
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
