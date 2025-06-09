export default function Home() {
  return (
    <>
      <div className="demo-note">
        ✅ React Demo - Hover over "MyDayOne" logo!
      </div>

      <header className="header">
        <a href="/" className="logo">MyDayOne</a>
        <nav className="nav">
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <main className="main">
        <h1 className="title">Welcome to MyDayOne</h1>
        <p className="subtitle">Experience the amazing hover effect</p>
        <button className="cta-button">Get Started</button>
      </main>
    </>
  )
}
