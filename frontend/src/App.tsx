import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ArtistsPage from "./components/ArtistsPage";
import TracksPage from "./components/TracksPage";
import AlbumsPage from "./components/AlbumPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import TrackHistoryPage from "./components/TrackHistoryPage";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ArtistsPage />} />
        <Route path="/artists/:artistId" element={<AlbumsPage />} />
        <Route path="/albums/:albumId" element={<TracksPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/track_histories" element={<TrackHistoryPage />} />
      </Route>
    </Routes>
  );
};

export default App;
