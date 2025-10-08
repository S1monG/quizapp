import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen bg-blue-100">
      <h1 className="text-2xl font-bold mb-4">Page not found</h1>
      <Button asChild>
        <Link to="/">Go to home page</Link>
      </Button>
    </div>
  );
}
