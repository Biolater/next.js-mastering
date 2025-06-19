import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const PostLoading = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          
          {/* Title */}
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-8 w-1/2" />
        </div>

        {/* Content Skeleton */}
        <div className="space-y-4 mb-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/5" />
        </div>

        {/* Image Placeholder */}
        <Skeleton className="h-48 w-full rounded-lg mb-6" />

        {/* More Content */}
        <div className="space-y-4 mb-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-18" />
          </div>
          <Skeleton className="h-9 w-24" />
        </div>

        {/* Loading Indicator */}
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm font-medium">Loading post...</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PostLoading;