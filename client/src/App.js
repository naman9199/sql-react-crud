import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
    const [movieName, setMovieName] = useState("");
    const [movieReview, setMovieReview] = useState("");
    const [movieList, setMovieList] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        postData();
        setMovieName("");
        setMovieReview("");
    }

    const deleteData = (id) => {
        axios
            .delete("http://localhost:3001/api", {
                data: {
                    id: id,
                },
            })
            .then((res) => {
                console.log("id deleted! => ", id, "res => ", res);
                getData();
            })
            .catch((err) => {
                console.log("err => ", err);
            });
    };

    const getData = () => {
        axios
            .get("http://localhost:3001/api")
            .then((res) => {
                console.log("Res => ", res.data);
                setMovieList(res.data);
            })
            .catch((err) => {
                console.log("Err => ", err);
            });
    };

    const postData = () => {
        axios
            .post("http://localhost:3001/api", {
                movieName,
                movieReview,
            })
            .then((res) => {
                if (res.status !== 200) {
                    console.log("Error! ", res);
                } else {
                    console.log("Success! ", res.data);
                    getData();
                }
            })
            .catch((err) => {
                console.log("Error => ", err);
            });
    };

    function printMovieList() {
        return movieList.map((value, key) => (
            <div className="card" key={key}>
                <h3>{value.movieName}</h3>
                <span>{value.movieReview}</span>
                <button
                    className="deleteButton"
                    onClick={() => deleteData(value.id)}
                >
                    Delete
                </button>
            </div>
        ));
    }

    return (
        <div className="App">
            <h1>CRUD WITH SQL</h1>
            <div className="form">
                <label>Movie Name: </label>
                <input
                    type="text"
                    name="movieName"
                    onChange={(e) => setMovieName(e.target.value)}
                    value={movieName}
                />
                <label>Movie Review: </label>
                <input
                    type="text"
                    name="movieReview"
                    onChange={(e) => setMovieReview(e.target.value)}
                    value={movieReview}
                />

                <button onClick={handleSubmit}>Submit</button>
                <button
                    onClick={() => {
                        getData();
                    }}
                >
                    Fetch and Print Data
                </button>
            </div>
            <div className="movieListContainer">
                {movieList.length > 0 && printMovieList()}
            </div>
        </div>
    );
}

export default App;
