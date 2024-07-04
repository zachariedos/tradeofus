import {Card, CardContent} from "@/components/ui/card";
import {forwardRef} from "react";

export const StatsCard = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return  <Card ref={ref}>
        <CardContent>
            {children}
        </CardContent>
    </Card>
})
StatsCard.displayName = "StatsCard"