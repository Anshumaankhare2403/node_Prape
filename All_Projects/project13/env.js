// export const PORT = isNaN(process.env.PORT) ? '3000' : parseInt(process.env.PORT);


// env.js
import * as z from "zod";

// Schema expects an object, not just a string
const portSchema = z.object({
    PORT: z.coerce.number().min(1000).max(10000).default(3000),
});

// Wrap env in object
const result = portSchema.safeParse({
    PORT: process.env.PORT,
});

if (!result.success) {
    console.error("❌ Validation Error:", result.error.issues);
    process.exit(1);
}

export const PORT = result.data.PORT;
