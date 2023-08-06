import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [numberOfImages, setNumberOfImages] = useState(20); // Number of images to fetch initially
  const [page, setPage] = useState(1); // Current page for pagination
  const [hasMoreImages, setHasMoreImages] = useState(true); // To track if there are more images to load
  const [loading, setLoading] = useState(false); // To track loading state for the "Load More" button

  const API_KEY = '38671191-2b9b796ca32db4435fa7efa9d';

  const handleSearch = async () => {
    try {
      setLoading(true); // Set loading state to true while fetching images
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(searchTerm)}&per_page=${numberOfImages}&page=${page}`
      );

      if (page === 1) {
        setImages(response.data.hits);
      } else {
        setImages((prevImages) => [...prevImages, ...response.data.hits]);
      }

      // Check if there are more images to load
      setHasMoreImages(response.data.hits.length > 0);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false); // Set loading state to false after fetching images
    }
  };

  useEffect(() => {
    handleSearch();
  }, [page]); // Fetch images when the page changes

  const handleSearchClick = () => {
    setPage(1); // Reset page to 1 when performing a new search
    handleSearch();
  };

  const loadMoreImages = () => {
    if (!loading && hasMoreImages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <div className="mt-4 w-75">
        <div className="input-group mb-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
            placeholder="Search for images..."
          />
          <button onClick={handleSearchClick} className="btn btn-primary">Search</button>
        </div>
      </div>
      {images.length === 0 && !loading ? (
        <div className="row w-75">
          <div className="col text-center">
            <h3>No Images on preferred topic</h3>
          </div>
        </div>
      ) : (
        <div className="row w-75">
          {images.map((image) => (
            <div className="col-md-4" key={image.id}>
              <img src={image.webformatURL} alt={image.tags} className="img-fluid mb-3" />
            </div>
          ))}
        </div>
      )}
      {hasMoreImages && !loading && images.length > 0 && (
        <div className="row mt-4 w-75">
          <div className="col text-center">
            <button onClick={loadMoreImages} className="btn btn-primary">Load More</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
