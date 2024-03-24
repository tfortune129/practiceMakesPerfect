import { useState, useEffect } from "react";


const App = () => {
    const [data, setData] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState('');
    
    
    // console.log(data);
    
    useEffect(() => {
        const getPhotos = async () => {
            let url = 'https://api.thecatapi.com/v1/images/search?limit=10';
            if (selectedBreed) {
                url += `&breed_ids=${selectedBreed}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            
            setData(data);
        }
        getPhotos();
     },[selectedBreed]);

// know this --> []

     useEffect(() =>{
        const getBreeds = async () => {
            const response = await fetch('https://api.thecatapi.com/v1/breeds');
            const data = await response.json();
            setBreeds(data);

        }
        getBreeds();
     },[]);


    const handleClickedPics = (photo) => {
        console.log(`${photo.id} clicked`);

        const updatedData = data.filter((item) => item.id !== photo.id);
        setData(updatedData);

        setFavorites([...favorites, photo]);

    };

    const handleClickedBreed = (event) => {
        setSelectedBreed(event.target.value);
    };

     return (
        <div>
            <div style={{  marginBottom: '10px' }}>
                <select value={selectedBreed} onChange={handleClickedBreed}>
                    <option value="">Select Breed</option>
                    {breeds.map((breed) => (
                        <option key={breed.id} value={breed.id}>
                            {breed.name}
                        </option>

                    ))}
                </select>
            </div>

            <div style={{ display: 'flex' }}>
                {data.map((photo) => {
                    const {id, title, url} = photo
                    // console.log(id)
                    return (
                    <div key={id} style={{ marginBottom: '10px' }}>
                        <img src={url} alt={title} width={100} />
                        <button onClick={() => handleClickedPics(photo)}>Click me</button>
                    {/* '() =>' controls when function runs (only clicked otherwise it will run automatically) */}
                    </div>
                    )})}
            </div>
             
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <h2>Faves:</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex' }}>
                {favorites.map((favorites) => (
                <li key={favorites.id} style= {{ margin: '0 10px' }}>
                    <img src={favorites.url} alt={favorites.title} width={100}/>
                    </li>
                    ))}
            </ul>
            </div>
        </div>


    );
};


export default App;

