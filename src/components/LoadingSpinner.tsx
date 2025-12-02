import Image from 'next/image'

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="text-center animate-fade-in">
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          {/* Spinning ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
          {/* Inner pulsing circle with logo */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 animate-pulse flex items-center justify-center">
            <div className="relative w-16 h-16">
              <Image
                src="/logo.svg"
                alt="N S GIFT & DECOR"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Loading...
        </h3>
        <p className="text-muted-foreground">Please wait while we prepare everything for you</p>
      </div>
    </div>
  )
}
