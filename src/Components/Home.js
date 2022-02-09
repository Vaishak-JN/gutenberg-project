import { GenreCard } from './GenreCard';
import { genreList } from '../genreList';

export function Home() {
    return (
        <div className="home">
            <h1>Gutenberg Project</h1>
            <p>A social cataloging website that allows you to search its database of books,annotations, and reviews.</p>
            <div className="genre-card-container">
                {genreList.map(({ img, type, route }, index) => <GenreCard key={index} img={img} type={type} route={route} />)}
            </div>
        </div>
    );
}
