import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI & ML Glossary - Tech Glossary',
  description: 'Comprehensive glossary of AI, Machine Learning, and Data Science terms with definitions, examples, and learning connections.',
}

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}