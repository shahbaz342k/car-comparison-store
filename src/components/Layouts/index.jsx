/* eslint-disable react/prop-types */
import SEOHead from "../SEOHead";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({seoTitle, seoDescription,selectedCars,setShowComparison, children}) => {
  return (
    <div className="min-h-screen bg-gray-50">
        <SEOHead title={seoTitle} description={seoDescription} />
        <Header selectedCars={selectedCars} setShowComparison = {setShowComparison} />
          {children}
        <Footer />
    </div>
  )
}

export default Layout;