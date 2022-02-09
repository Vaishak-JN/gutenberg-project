import { useHistory } from "react-router-dom";

// ********************** 
// genre cards in the home page
// ********************** 
export function GenreCard({ type, img, route }) {
    const history = useHistory()
    return (
        <div className="genre-card" onClick={() => history.push(`/${route}`)}>
            <img className="genre-img" src={img} />
            <span>{type}</span>
            <i className="fas fa-arrow-right" style={{ color: "#5e56e7" }}></i>
        </div >
    );
}
