# Skill: UI Pattern - Card View & Toggle

This document details the implementation pattern for 'Card View' and 'View Toggling' (Grid/List). Use this pattern to update screen generators for other entities.

## 1. Overview
The goal is to provide two visualization modes for entity lists:
- **Grid View (Cards)**: Default. Visual, rich representation using a reusable Card component.
- **List View (Table)**: Optional. Dense, tabular representation using the standard Table component.
- **Toggle**: Controls in the toolbar to switch between modes.

## 2. Component Structure

### A. The Card Component (`{Entity}Card.tsx`)
Create a dedicated component to render a single entity item as a card.

**Path**: `src/components/{entity}/{Entity}Card.tsx`

**Key Elements:**
- **Props**: `{entity}` object, `onEdit`, `onDelete`, `onDetails`.
- **UI Libraries**: `shadcn/ui` (Card, Button, Badge, DropdownMenu, Avatar).
- **Layout**:
    - **Header**: Status indicators, Type badges, Actions menu (Ellipsis).
    - **Body**: Avatar (if applicable) or Icon, Main Title (Name), Subtitle (Company/Description).
    - **Footer**: Specific action buttons (e.g., 'Detalhes', 'Contatos').

**Example Code:**
```tsx
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// ... imports

interface ClientCardProps {
  client: ClientDto;
  onEdit: (item: ClientDto) => void;
  onDelete: (id: string) => void;
  onDetails?: (item: ClientDto) => void;
}

export function ClientCard({ client, onEdit, onDelete, onDetails }: ClientCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader className="...">
         {/* Status, Badge, DropdownMenu */}
      </CardHeader>
      <CardContent className="...">
         {/* Avatar, Name, Description */}
      </CardContent>
      <CardFooter className="...">
         {/* Action Buttons */}
      </CardFooter>
    </Card>
  );
}
```

### B. The List Component (`{Entity}List.tsx`)
Update the main list component to handle the view state and conditional rendering.

**Path**: `src/components/{entity}/{Entity}List.tsx`

**Key Changes:**
1.  **State**: Add `viewMode`.
    ```tsx
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    ```
2.  **Imports**: Import `LayoutGrid`, `List` icons from `lucide-react`, and the `{Entity}Card` component.
3.  **Toolbar**: Add toggle buttons next to filters.
    ```tsx
    <div className="flex items-center gap-2 border rounded-md p-1 bg-muted/20">
      <Button variant={viewMode === "grid" ? "secondary" : "ghost"} onClick={() => setViewMode("grid")}>
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button variant={viewMode === "list" ? "secondary" : "ghost"} onClick={() => setViewMode("list")}>
        <List className="h-4 w-4" />
      </Button>
    </div>
    ```
4.  **Conditional Rendering**:
    ```tsx
    {viewMode === "list" ? (
      <Table>...</Table>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.items.map((item) => (
          <ClientCard key={item.id} client={item} ... />
        ))}
      </div>
    )}
    ```

## 3. Best Practices
- **Responsiveness**: Use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` to adapt to screen sizes.
- **Empty States**: Ensure the empty state works for both views (or shared parent).
- **Loading States**: Full-page or container-level loader avoids layout shift during toggle (though client-side toggle is instant).
