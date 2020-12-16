import React, {useEffect,useState } from 'react';
import QueryJoke from "./QueryJoke";
import axios from 'axios';
import './App.css';

const App =() => {

  const [randomJoke,setRandomJoke] = useState([]);
  const [search,setSearch] = useState(' ');
  const [query,setQuery] = useState();
  const [queryJokes,setQueryJokes] = useState([]);
  const [categories,setCategories] = useState([]);
  const [catJoke,setCatJoke] = useState();


  useEffect(() => {
    getRandomJoke();
    getCategories();
  },[]);

  useEffect(() => {
    getQueryJoke();
  },[query]);


  const getRandomJoke = async () => {
    const rJoke = await fetch(`https://api.chucknorris.io/jokes/random`);
    const rData = await rJoke.json();
    console.log(rData.value);
    setRandomJoke(rData.value);
  }

  const getCategories = async () => {
    const cJoke = await axios.get(`https://api.chucknorris.io/jokes/categories`);
    setCategories(cJoke.data);
  }

  const getQueryJoke = async () => {
    const qJoke = await fetch(`https://api.chucknorris.io/jokes/search?query=${query}`);
    const qData = await qJoke.json();
    console.log(qData);
    let jokes = []
    console.log(qData.result.length);

    for (let i=0; i<qData.result.length;i++){
      jokes.push(qData.result[i].value);
    }
    setQueryJokes(jokes);
  }


  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
  }

  const getCategory = async () => {
    var selectBox = document.getElementById("select-box");
    var category = selectBox.options[selectBox.selectedIndex].value;
    console.log(category);
    const categoryJokes = await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`);
    console.log(categoryJokes.data);
    setCatJoke(categoryJokes.data.value);
  }

  return(
    <div>
      <h1>Chuck Norris Jokes</h1>

      <label for = "categories">Categories</label>

<select id = "select-box" onChange={getCategory}>
  {categories.map(category => (
    <option key={category.id} value={category}>{category}</option>
  ))}

</select>
      <div className = "formContainer" >

<form onSubmit ={getSearch} 
className = "search-form">
  <input className = "search-bar" type="text" value={search}
  onChange = {updateSearch}/>
  <button className = "search-button" type ="submit">
    Search Joke
  </button>
</form>

</div> 

<p>{randomJoke}</p>
<p className="para">{catJoke}</p>

{queryJokes.map((queryJoke) => (
  <QueryJoke joke = {queryJoke}/>
 
))}

    </div>
  );
}

export default App;
