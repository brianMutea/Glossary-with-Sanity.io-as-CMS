import { redirect } from 'next/navigation'

export default function GlossaryPage() {
  // Redirect to home since home is now the glossary
  redirect('/')
}

