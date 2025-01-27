import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <main className="text-center">
        <h1 className="mb-8 text-6xl font-bold text-white">Bava Rentals</h1>
        <p className="mb-8 text-xl text-white">Property management made easy</p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

