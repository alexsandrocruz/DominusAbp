import { Shell } from "@/components/layout/shell";
import { ClientForm } from "@/components/client/ClientForm";
import { useLocation, useRoute } from "wouter";
import { useClient } from "@/lib/abp/hooks/useClients";
import { Loader2 } from "lucide-react";

export default function EditClientPage() {
    const [, setLocation] = useLocation();
    const [, params] = useRoute("/admin/client/:id/edit");
    const id = params?.id;

    const { data: client, isLoading } = useClient(id || "");

    if (isLoading) {
        return (
            <Shell>
                <div className="flex h-full items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            </Shell>
        );
    }

    return (
        <Shell>
            <ClientForm
                onClose={() => setLocation("/admin/client")}
                initialValues={client}
                isPage
            />
        </Shell>
    );
}
