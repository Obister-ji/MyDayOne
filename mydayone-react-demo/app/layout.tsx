import './globals.css'
import HoverEffect from './components/HoverEffect'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <HoverEffect />
      </body>
    </html>
  )
}
