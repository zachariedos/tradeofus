
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {GoogleLoginButton} from "@/components/ui/AuthButton";

export default function SignIn() {
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
                <CardDescription>Connectez-vous avec google</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <GoogleLoginButton/>
                </div>
            </CardContent>
        </Card>
    )
}