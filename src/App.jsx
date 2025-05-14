import { Features, Quote, Hero, Footer } from './sections'
import { Nav } from './components/Nav';

export default function App() {
  return (
    <>
      <div className='dark:bg-neutral-900'>
        <main className="relative">
          <Nav />
          <section className="padding"> <Hero /></section>
          <section className="padding-x py-10"> <Features /></section>
          <section className="padding-x sm:py-32 py-16 w-full"> <Quote /></section>
          <section className=' bg-black padding-x padding-t pb-8'><Footer /></section>
        </main>
      </div>
    </>
  );
}