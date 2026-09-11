import { useState } from 'react'
import './App.css'
import './index.css'

function App() {

  // Search input ki value store karne ke liye
  const [value, setValue] = useState("");

  // API se aane wali images store karne ke liye
  const [result, setResult] = useState([]);

  // Unsplash API se images fetch karne ka function
  const fetchImages = async () => {

    // API ko request bhej rahe hain
    const response = await fetch(
      `https://api.unsplash.com/search/photos?client_id=VUYfp9Bp-1oMNnbxJLGDYc2KAUGPfoY4noJaCpEi5fY&query=${value}&orientation=squarish`
    );

    // API response ko JSON mein convert kar rahe hain
    const data = await response.json();

    // API ka data console mein check karne ke liye
    console.log(data);

    // API ke results ko result state mein store kar rahe hain
setResult(data.results || []);
  }

  return (
    <>
      {/* Search label + input + button */}
      <div className="search-box">

        {/* Search Label */}
        <label className="search-label">
          Search
        </label>

        {/* Search Input */}
        <input
          type="text"
          value={value}
          placeholder="Search here..."
          onChange={(e) => setValue(e.target.value)}
        />

        {/* Search Button */}
        <button onClick={fetchImages}>
          Search
        </button>

      </div>


      {/* 
        Agar search kiya hai aur result 0 hai,
        to "No Results Found" message show hoga
      */}
      {value && result.length === 0 && (
        <div className="no-result">

          <h2>No Results Found</h2>

          <p>
            We couldn't find any images for
            <strong> "{value}"</strong>
          </p>

          <span>
            Try searching for something else.
          </span>

        </div>
      )}


      {/* 
        Agar images available hain,
        to images display hongi
      */}
      {result.length > 0 && (
        <div className="image-container">

          {result.map((item) => (
            <img
              className="item"
              key={item.id}
              src={item.urls.regular}
              alt={item.alt_description}
            />
          ))}

        </div>
      )}

    </>
  )
}

export default App
