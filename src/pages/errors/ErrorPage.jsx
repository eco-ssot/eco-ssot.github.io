import Button from '../../components/button/Button';

export default function ErrorPage({ error, resetErrorBoundary }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-8">
      <div className="text-2xl font-medium">Something went wrong</div>
      <Button onClick={() => window.location.reload()}>Try again</Button>
    </div>
  );
}
