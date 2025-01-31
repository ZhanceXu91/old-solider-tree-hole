import { User } from "@/types"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface UserListProps {
  users: User[]
}

export function UserList({ users }: UserListProps) {
  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center p-4 border-b">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 flex-1">
            <div className="flex items-center">
              <h3 className="font-medium">{user.name}</h3>
              <Badge variant="secondary" className="ml-2">Lv.{user.level}</Badge>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {user.tags.map((tag) => (
                <span key={tag} className="text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 