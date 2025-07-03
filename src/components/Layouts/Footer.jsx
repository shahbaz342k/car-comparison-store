const Footer = () => {
  return (
    <>
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p>&copy; { new Date().getFullYear() } CarCompare </p>
              <p className="mt-2 text-sm">Instantly compare cars side-by-side by brand, model, price, performance, features and ratings.</p>
            </div>
          </div>
        </footer>
    </>
  )
}

export default Footer;