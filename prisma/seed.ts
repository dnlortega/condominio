import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    const services = [
        {
            category: "Concessionárias",
            icon: "Flame",
            providers: [
                { name: "Ultragaz (Gás)", contact: "0800 7010 123" },
                { name: "CPFL (Energia)", contact: "0800 010 1010" }
            ],
        },
        {
            category: "Conectividade",
            icon: "Wifi",
            providers: [
                { name: "Vivo Fibra", contact: "103 15" },
                { name: "Claro/NET", contact: "0800 721 0027" }
            ],
        },
        {
            category: "Manutenção",
            icon: "Wrench",
            providers: [
                { name: "Zeladoria Local", contact: "Ramal 101" },
                { name: "Suporte Técnico", contact: "(14) 9988-7766" }
            ],
        },
        {
            category: "Operacional",
            icon: "PhoneCall",
            providers: [
                { name: "Portaria 24h", contact: "Ramal 100" },
                { name: "Administradora", contact: "(14) 3222-1234" }
            ],
        }
    ];

    for (const item of services) {
        const category = await prisma.category.upsert({
            where: { name: item.category },
            update: { icon: item.icon },
            create: {
                name: item.category,
                icon: item.icon,
            },
        });

        for (const provider of item.providers) {
            // Check if provider already exists for this category to avoid duplicates on multiple seed runs
            const existing = await prisma.serviceProvider.findFirst({
                where: {
                    name: provider.name,
                    categoryId: category.id
                }
            });

            if (!existing) {
                await prisma.serviceProvider.create({
                    data: {
                        name: provider.name,
                        contact: provider.contact,
                        categoryId: category.id,
                    },
                });
            }
        }
    }

    console.log('Seed completed.');
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
