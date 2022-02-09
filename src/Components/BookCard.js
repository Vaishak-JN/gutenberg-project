// ********************** 
// book card component
// ********************** 
export function BookCard({ title, img, author, formats }) {

    const [name] = author.map((item) => item.name);

    // ********************** 
    // function to show the book content
    // ********************** 
    function openTab() {

        if (formats["text/html"]) {
            window.open(`${formats["text/html"]}`)
            return
        } else if (formats["text/plain"]) {
            window.open(`${formats["text/plain"]}`)
        } else if (formats["text/plain; charset=us-ascii"]) {
            window.open(`${formats["text/plain; charset=us-ascii"]}`)
        } else if (formats["text/html; charset=utf-8"]) {
            window.open(`${formats["text/html; charset=utf-8"]}`)
        } else {
            alert("Sorry, no viwable content available")
        }
    }
    return (
        <div className="book-card" onClick={openTab}>
            <img src={img} alt="image" className="book-img" />
            <h4 className="book-title">{title}</h4>
            <p className="book-author">{name}</p>
        </div>

    );
}

