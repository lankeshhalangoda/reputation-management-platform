export function LoadingSpinner() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground">Loading ORM</h2>
          <p className="text-sm text-muted-foreground">Preparing your reputation dashboard...</p>
        </div>
      </div>
    </div>
  )
}
