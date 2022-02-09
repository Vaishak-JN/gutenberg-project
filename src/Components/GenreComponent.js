import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { BookCard } from './BookCard';
import { Loader } from './Loader';

// ********************** 
// genre component for different routes
// ********************** 
export function GenreComponent({ type, name }) {

    const history = useHistory();

    const [allBooks, setAllBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searching, setSearching] = useState(false);


    // ********************** 
    // function to trigger api fetching for infinite scroll 
    // ********************** 
    const handleScroll = (e) => {
        // scroll-height= window- innerheight + top-height
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            // console.log("bottom reached")
            e.stopPropagation()
            setPage(page => page + 1);
        }
    };

    useEffect(() => {

        // to show loader initially
        setLoading(true);

        // ********************** 
        // window scroll event listener to for infinite scrolling setup
        // ********************** 
        window.addEventListener("scroll", handleScroll);

        // ***********************
        // fetch accordingly with search 
        // ***********************
        if (searchValue === "" && !searching) {
            // setAllBooks(() => [])
            fetch(`http://gutendex.com/books/?mime_type=image%2Fjpeg&page=${page}&topic=${type}`)
                .then(res => res.json())
                .then(data => setAllBooks(prev => [...prev, ...data.results]))
                .then(() => setLoading(false))
                .catch(err => setPage(page => page + 1));
        } else if (searchValue !== "" && searching) {
            setAllBooks(() => [])

            fetch(`http://gutendex.com/books/?mime_type=image%2Fjpeg&page=${page}&topic=${type}&search=${searchValue}`)
                .then(res => res.json())
                .then(data => setAllBooks(prev => [...prev, ...data.results]))
                .then(() => setLoading(false))
                .catch(err => setPage(page => page + 1));
        }

        // cleanup
        return () => {
            window.removeEventListener("scroll", handleScroll)
            setSearching(false)
        }
    }, [page, searchValue, searching]);

    // ********************** 
    // function to handle searching
    // ********************** 
    const handleChange = (e) => {
        setSearchValue(e.target.value);
        if (searchValue !== "") {
            setSearching(true)
        } else if (searchValue === "") {
            setSearching(false)
        }
        setAllBooks([]);
        setPage((1));
    };

    return (
        <div className="genre-page">
            <header className="genre-page-header">
                <div className="genre-heading">
                    <i className="fas fa-arrow-left" style={{ color: "#5e56e7" }} onClick={() => history.goBack()}></i>
                    <h2 onClick={() => history.goBack()}>{name}</h2>
                </div>
                <div className="genre-search">
                    <input autoComplete="off" type="text" placeholder="Search" value={searchValue} onChange={(e) => handleChange(e)} />
                </div>
            </header>
            <div className="book-container">
                <div className="book-card-container">

                    {/* **********************  */}
                    {/* mapping to display books */}
                    {/* **********************  */}
                    {allBooks.map((ele, index) => <BookCard key={index} formats={ele.formats} title={ele.title} img={ele["formats"]["image/jpeg"]} author={[...ele.authors]} />)}
                </div>

                {/* loader */}
                {loading && <Loader />}

            </div>
        </div>
    );
}
