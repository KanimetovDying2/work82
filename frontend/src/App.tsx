import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ArtistsPage from "./components/ArtistsPage";
import TracksPage from "./components/TracksPage";
import AlbumsPage from "./components/AlbumPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import TrackHistoryPage from "./components/TrackHistoryPage";
import NewArtistPage from "./components/NewArtistPage";
import NewAlbumPage from "./components/NewAlbumPage";
import NewTrackPage from "./components/NewTrackPage";
import NotFoundPage from "./components/NotFoundPage";

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
        <Route path="/artists/add" element={<NewArtistPage />} />
        <Route path="/albums/add" element={<NewAlbumPage />} />
        <Route path="/tracks/add" element={<NewTrackPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
