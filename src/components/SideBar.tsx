import { useEffect } from "react";
import { api } from "../services/api";
import { Button } from "./Button";
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBadProps {
  genres: GenreResponseProps[];
  selectedGenreId: number;
  setGenres: (response: GenreResponseProps[]) => void;
  setSelectedGenreId: (id: number) => void;
}

export function SideBar({ genres, selectedGenreId, setGenres, setSelectedGenreId } : SideBadProps) {
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          id={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleClickButton(genre.id)}
          selected={selectedGenreId === genre.id}
        />
      ))}
    </div>
  </nav>
  );
}