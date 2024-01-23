import Footer from "./components/Footer"
import JobListings from "./components/JobListings"
import data from "./data/data.json"

const App = () => {
  return (
    <>
      <main className=" min-h-screen bg-[#F0FAFB] relative background z-10 md:background_mobile">
        <JobListings jobListings={data}/>
      </main>
      <Footer />
    </>
  )
}

export default App