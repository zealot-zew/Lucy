import { Features, Subscribe, SuperQuality, Footer } from './sections'
import { Nav } from './components/Nav';

export default function App() {
  return (
    <>
      <main className="relative">
        <Nav />
        <section className="padding"> <SuperQuality /></section>
        <section className="padding-x py-10"> <Features /></section>
        <section className="padding-x sm:py-32 py-16 w-full"> <Subscribe /></section>
        <section className=' bg-black padding-x padding-t pb-8'><Footer /></section>
      </main>
    </>
  );
}