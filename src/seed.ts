import config from '@payload-config'
import { getPayload } from 'payload'

const categories = [
    {
        name: "All",
        slug: "all"
    },
    {
        name: "Sport and Fitness",
        color: "#00CED1",
        slug: "sport-and-fitness",
        subcategories: [
            {
                name: "Sport wears",
                slug: "sport-wears"
            },
            {
                name: "Footwears",
                slug: "footwears"
            },
            {
                name: "Outdoor Games",
                slug: "outdoor-games"
            }
        ]
    },
    {
        name: "Luggages",
        slug: "luggages",
        color: "#9CAF88",
        subcategories: [
            {
               name: "Suit Cases",
               slug: "suit-cases" 
            },
            {
                name: "Travel Bags",
                slug: "travel-bags"
            },
            {
                name: "Laptop Bags",
                slug: "laptop-bags"
            }
        ]
    },
    {
        name: "Toys and Gifts",
        slug: "toys-and-gifts",
        color: "#355E3B",
        subcategories: [
            {
                name: "Season Gifts",
                slug: "season-gifts"
            },
            {
                name: "Anniversary Gift",
                slug: "anniversary-gifts"
            },
            {
                name: "Baby's Gift",
                slug: "babies-gift"
            }
        ]
    },
    {
        name: "Pets",
        slug: "pets",
        color: "#228B22",
        subcategories: [
            {
                name: "Dogs",
                slug: "dogs"
            },
            {
                name: "Aquatic Pets",
                slug: "aquatic-pets"
            },
            {
                name: "Cats",
                slug: "cats"
            }
        ]
    },
    {

    }
];

const seed = async () => {
    const payload = await getPayload({ config })

    for (const category of categories) {
        const parentCategory = await payload.create({
            collection: "categories",
            data: {
                name: category.name,
                slug: category.slug,
                color: category.color,
                parent: null
            },
        });

        for (const subCategory of category.subcategories || []){
            await payload.create({
                collection: "categories",
                data: {
                    name: subCategory.name,
                    slug: subCategory.slug,
                    parent: parentCategory.id
                }
            })
        }
    }
}

await seed();

process.exit(0)