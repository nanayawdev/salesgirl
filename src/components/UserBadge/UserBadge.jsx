import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import avatarImage from '@/assets/images/ny.jpg';

const UserBadge = () => {
  const users = [
    { 
      id: 1, 
      imgSrc: avatarImage, 
      fallback: 'JD',
      alt: 'User 1' 
    },
    { 
      id: 2, 
      imgSrc: avatarImage, 
      fallback: 'AS',
      alt: 'User 2' 
    },
    { 
      id: 3, 
      imgSrc: avatarImage, 
      fallback: 'TC',
      alt: 'User 3' 
    },
    { 
      id: 4, 
      imgSrc: avatarImage, 
      fallback: 'RW',
      alt: 'User 4' 
    },
  ];

  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-3">
        {users.map((user) => (
          <Avatar 
            key={user.id}
            className="h-10 w-10 border-2 border-background"
          >
            <AvatarImage 
              className="rounded-full object-cover"
              src={user.imgSrc} 
              alt={user.alt}
            />
            <AvatarFallback className="text-xs">
              {user.fallback}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-semibold">600+</span>
        <span className="text-sm text-muted-foreground">Users</span>
      </div>
    </div>
  );
};

export default UserBadge;