import WaitlistForm from '../components/WaitlistForm';

export default function Home(){
  return (
    <div className="container">
      <div className="card">
        <header style={{textAlign:'center'}}>
          <h1>VibeCaps</h1>
          <p className="lead">Daily focus, tiny capsule — big vibe.</p>
        </header>

       <section style={{textAlign:'center'}}>
          <p className="muted">We’re building a micro-supplement to help you hit deep focus. Join the waitlist to get early access and exclusive beta offers.</p>
        </section>

        <section style={{marginTop:18}}>
          <WaitlistForm />
        </section>

        <footer>
          Built with ❤️ —  See README & WRITEUP 📂 for details.
        </footer>
      </div>
    </div>
  );
}