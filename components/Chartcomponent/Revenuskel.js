import React from 'react'
import { Skeleton } from "@nextui-org/react";
import { Card, CardContent } from "@/components/ui/card";

const Revenuskel = () => {
  return (
    <Card className="pt-4">
      <CardContent>
        <div className="flex justify-center items-end gap-6 w-full">
          <Skeleton className="w-6 h-20 rounded-lg" />
          <Skeleton className="w-6 h-24 rounded-lg" />
          <Skeleton className="w-6 h-52 rounded-lg" />
          <Skeleton className="w-6 h-48 rounded-lg" />
          <Skeleton className="w-6 h-32 rounded-lg" />
          <Skeleton className="w-6 h-36 rounded-lg" />
          <Skeleton className="w-6 h-28 rounded-lg" />
          <Skeleton className="w-6 h-24 rounded-lg" />
          <Skeleton className="w-6 h-16 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  )
}

export default Revenuskel