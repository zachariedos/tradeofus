/**
 * ! Executing this script will delete all data in your database and seed it with 10 users.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";
import {classList} from "@/src/lib/classes";
import {prisma} from "@/src/lib/prisma";

async function main() {
    const seed = await createSeedClient();

    // Truncate all tables in the database
    await seed.$resetDatabase();

    await prisma.classes.createMany({
        data: classList.map((c) => ({slug: c}))
    });
    console.log('Classes seeded');

    process.exit();
};

main();