export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">About Us</h3>
            <p className="text-gray-600 text-sm">
              My Store is your destination for quality products.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">Contact Us</a></li>
              <li><a href="#" className="hover:text-black">Shipping Info</a></li>
              <li><a href="#" className="hover:text-black">Returns</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">Facebook</a></li>
              <li><a href="#" className="hover:text-black">Instagram</a></li>
              <li><a href="#" className="hover:text-black">Twitter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} My Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
