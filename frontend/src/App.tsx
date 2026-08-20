import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ArtistsPage from "./components/ArtistsPage";
import TracksPage from "./components/TracksPage";
import AlbumsPage from "./components/AlbumPage";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ArtistsPage />} />
        <Route path="/artists/:artistId" element={<AlbumsPage />} />
        <Route path="/albums/:albumId" element={<TracksPage />} />
      </Route>
    </Routes>
  );
};

export default App;
