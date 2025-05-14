import Link from "next/link";

interface Props {
    category: Category;
    isOpen: boolean;
    position: {top: number, left: number}
}

export const SubcategoryMenu = ({
    category,
    isOpen,
    position
}: Props) => {
    if(!isOpen || !category.subcategories || category.subcategories.length === 0){
        return null 
    }

    const backgroundColor = category.color || "green-300"

    return (
        <div className="fixed z-100" style={{
            top: position.top,
            left: position.left
        }}>
            <div className="h-3 w-60"/>
            <div style={{ backgroundColor }} className="w-60 text-white rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]">
                <div>
                    {category.subcategories?.map((subcategory: Category) => (
                        <Link key={subcategory.slug} href='/' className="w-full text-left p-4 hover:bg-green-200 hover:text-green-500 flex justify-between items-center underline font-medium">
                            {subcategory.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}