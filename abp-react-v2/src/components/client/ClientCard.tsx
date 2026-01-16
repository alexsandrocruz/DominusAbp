import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, User, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ClientCardProps {
    client: any;
    onEdit: (item: any) => void;
    onDelete: (id: string) => void;
    onDetails?: (item: any) => void;
}

export function ClientCard({ client, onEdit, onDelete, onDetails }: ClientCardProps) {
    // Helper to get initials
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    };

    // Helper to get random color for avatar background (optional, or just use primary)
    // For now using distinct colors based on name length to simulate variety
    const getAvatarColor = (name: string) => {
        const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"];
        return colors[name.length % colors.length];
    };

    return (
        <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2 space-y-0">
                <div className="flex items-center gap-2">
                    {/* Status Indicator */}
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500" title={client.status || "Active"} />

                    {/* Type Badge */}
                    <Badge variant="secondary" className="text-xs font-normal">
                        {client.clientType === 1 ? "PJ" : "PF"}
                    </Badge>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onEdit(client)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => onDelete(client.id)}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>

            <CardContent className="flex flex-col items-center justify-center py-6 gap-4 flex-1">
                <Avatar className={`h-20 w-20 ${getAvatarColor(client.name)}`}>
                    <AvatarFallback className="text-white text-xl font-semibold bg-transparent">
                        {getInitials(client.name)}
                    </AvatarFallback>
                </Avatar>

                <div className="text-center space-y-1">
                    <h3 className="font-semibold text-lg text-foreground line-clamp-2 px-2">
                        {client.name}
                    </h3>
                    {/* Optional: Show company name if exists and different from name */}
                    {client.companyName && client.companyName !== client.name && (
                        <p className="text-sm text-muted-foreground line-clamp-1">{client.companyName}</p>
                    )}
                </div>
            </CardContent>

            <CardFooter className="grid grid-cols-2 gap-3 p-4 pt-0">
                <Button variant="outline" className="w-full gap-2" size="sm" onClick={() => onDetails?.(client)}>
                    <Eye className="h-4 w-4" />
                    Detalhes
                </Button>
                <Button variant="outline" className="w-full gap-2" size="sm" onClick={() => onEdit(client)}>
                    <User className="h-4 w-4" />
                    Contatos
                </Button>
            </CardFooter>
        </Card>
    );
}
