const vinylId = "id2"; // Example ID
fetch('./data.json')
    .then(response => {
    try {
      return response.json();
    } catch (e) {
      console.log("Error parsing JSON", e);
    }
  })
    .then(data => {
        console.log(data)
    // Access the "sammy" object
        const id = data[vinylId];
        console.log(id)
        if (data.hasOwnProperty(vinylId)) {

        const dataContainer = document.getElementById('dataContainer');
        const imageContainer = document.getElementById('imageContainer');
        const overviewContainer = document.getElementById('overviewContainer');
    
        //create elements
        const artistElement = document.createElement('p');
        artistElement.className = "data";
        artistElement.innerHTML = `Artist: ${id.artist}`;
    
        const albumElement = document.createElement('p');
        albumElement.innerHTML = `Album: ${id.album}`;
    
        const yearElement = document.createElement('p');
        yearElement.innerHTML = `Year: ${id.year}`;
    
        const genreElement = document.createElement('p');
        genreElement.innerHTML = `Genre: ${id.genre}`;
    
        const priceElement = document.createElement('p');
        priceElement.innerHTML = `Price: ${id.price}`;

        const descriptionElement = document.createElement('p');
        descriptionElement.innerHTML = `Description: ${id.description}`;

        const imageElement = document.createElement('a');
        const image = document.createElement('img');
        image.src = id.image;
        imageElement.appendChild(image)
       
        //append elements to html containers
        overviewContainer.appendChild(descriptionElement);

        imageContainer.appendChild(imageElement);
        dataContainer.appendChild(artistElement);
        dataContainer.appendChild(albumElement);
        dataContainer.appendChild(yearElement);
        dataContainer.appendChild(genreElement);
        dataContainer.appendChild(priceElement);
 
    }
    else
    {
        const dataContainer = document.getElementById('dataContainer');
        const priceElement = document.createElement('p');
        priceElement.innerHTML = `cannot be found`;
        dataContainer.appendChild(priceElement);
    }
  });