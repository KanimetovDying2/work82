import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ArtistsPage from "./components/pages/ArtistsPage";
import TracksPage from "./components/trackspage/TracksPage";
import AlbumsPage from "./components/pages/AlbumPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import TrackHistoryPage from "./components/pages/TrackHistoryPage";
import NewArtistPage from "./components/pages/new/NewArtistPage";
import NewAlbumPage from "./components/pages/new/NewAlbumPage";
import NewTrackPage from "./components/pages/new/NewTrackPage";
import NotFoundPage from "./components/pages/NotFoundPage";

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
