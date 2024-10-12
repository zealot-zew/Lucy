import {CoustmerReviews,Hero,PopularProducts,Services,SpecialOffers,Subscribe,SuperQuality} from './sections'
import { Nav } from './components/Nav';

export default function App() {
  return (
    <>
      <main className="relative">
        <Nav />
        <section className="xl:padding-1 wide:padding-r padding-b">
          <Hero />
        </section>
        <section className="padding"> <PopularProducts/></section>
        <section className="padding"> <SuperQuality /></section>
        <section className="padding-x py-10"> <Services /></section>
        <section className="padding"> <SpecialOffers /></section>
        <section className="padding bg-pale-blue dark:bg-slate-800"> <CoustmerReviews /></section>
        <section className="padding-x sm:py-32 py-16 w-full"> <Subscribe /></section>
      </main>
    </>
  );
}