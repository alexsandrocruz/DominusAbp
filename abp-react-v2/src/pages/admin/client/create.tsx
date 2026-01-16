import { Shell } from "@/components/layout/shell";
import { ClientForm } from "@/components/client/ClientForm";
import { useLocation } from "wouter";

export default function CreateClientPage() {
    const [, setLocation] = useLocation();

    return (
        <Shell>
            <ClientForm
                onClose={() => setLocation("/admin/client")}
                isPage
            />
        </Shell>
    );
}
