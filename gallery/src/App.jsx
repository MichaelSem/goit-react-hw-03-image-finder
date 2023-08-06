import React from 'react';
import ImageGallery from './assets/image-finder/ImageGallery';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div>
      <h1 className="text-center mt-4">Pixabay Image Gallery</h1>
      <ImageGallery />
    </div>
  );
};

export default App;
