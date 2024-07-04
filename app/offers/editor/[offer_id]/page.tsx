// app/offers/page.tsx

import { getAllCharacteristics } from "@/src/lib/getAllCharacteristics";
import OffersPageContent from "@/components/ui/OffersPageContent";

export default async function OffersPage() {
    const characteristicList = await getAllCharacteristics();

    return (
        <div className={"flex-1 flex items-center justify-center"}>
            <OffersPageContent characteristicList={characteristicList} />
        </div>
    );
}
