"use strict";

(function() {
  /**
   * Adds function calls when the window is loaded.
   */
  window.addEventListener("load", init);

  /**
   * Initializes the event listeners for each button.
   */
  function init() {
    setupFetchEventListeners();
  }

  /**
   * Sets up event listeners for various fetch operations in the application.
   * Each listener is associated with a specific element and triggers a data fetch
   * and display function based on the configuration provided in the 'actions' array.
   */
  function setupFetchEventListeners() {
    const actions = [
      {id: "fetch-weapons", file: "skins.json", handler: displayWeapons},
      {id: "fetch-stickers", file: "stickers.json", handler: displayStickers},
      {id: "fetch-collections", file: "collections.json", handler: displayCollections},
      {id: "fetch-crates", file: "crates.json", handler: displayCrates},
      {id: "fetch-keys", file: "keys.json", handler: displayKeys},
      {id: "fetch-collectibles", file: "collectibles.json", handler: displayCollectibles},
      {id: "fetch-agents", file: "agents.json", handler: displayAgents},
      {id: "fetch-patches", file: "patches.json", handler: displayPatches},
      {id: "fetch-graffiti", file: "graffiti.json", handler: displayGraffiti},
      {id: "fetch-music-kits", file: "music_kits.json", handler: displayMusicKits}
    ];

    actions.forEach(action => {
      document.getElementById(action.id).addEventListener("click", () => {
        fetchData(action.file, action.handler);
      });
    });
  }

  /**
   * Initializes music playback functionality when the webpage has fully loaded.
   */
  window.addEventListener("load", playMusic);

  /**
   * Fetches data from a specific API endpoint and applies callback function to process the data.
   * @param {string} endpoint - The endpoint URL for the API from which to fetch data.
   * @param {Function} callback - The callback function to process the fetched data.
   */
  function fetchData(endpoint, callback) {
    fetch(`https://bymykel.github.io/CSGO-API/api/en/${endpoint}`)
      .then(statusCheck)
      .then(response => response.json())
      .then(callback)
      .catch(handleError);
  }

  /**
   * Checks the response status and throws an error if the fetch operation was unsuccessful.
   * @param {Response} response - The response from the fetch request.
   * @returns {Response} The response object if successful.
   */
  function statusCheck(response) {
    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }
    return response;
  }

  /**
   * Displays weapon data in the webpage by dynamically creating HTML elements.
   * @param {Array} weapons - An array of weapon objects to display.
   */
  function displayWeapons(weapons) {
    const display = document.getElementById("data-display");
    display.innerHTML = "";
    weapons.forEach(weapon => {
      const weaponDiv = document.createElement("div");
      weaponDiv.classList.add("weapon");
      weaponDiv.innerHTML = `
        <h2>${weapon.name}</h2>
        <p>Category: ${weapon.category.name}</p>
        <p>Rarity: <span style="color: ${weapon.rarity.color}">${weapon.rarity.name}</span></p>
        <img src="${weapon.image}" alt="${weapon.name}" width="300">
      `;
      display.appendChild(weaponDiv);
    });
  }

  /**
   * Plays background music on the webpage. Ensures music starts only
   * after the user interacts with the page.
   */
  function playMusic() {
    const audio = new Audio("csgo_theme.mp3");
    audio.loop = true;
    audio.volume = 0.5;

    document.body.addEventListener("click", function startMusic() {
      audio.play().catch(error => console.error("Music playback failed:", error));
      document.body.removeEventListener("click", startMusic);
    });
  }

  /**
   * Displays sticker data in the webpage by dynamically creating HTML elements.
   * @param {Array} stickers - An array of sticker objects to display.
   */
  function displayStickers(stickers) {
    const display = document.getElementById("data-display");
    display.innerHTML = "";
    stickers.forEach(sticker => {
      const stickerDiv = document.createElement("div");
      stickerDiv.classList.add("sticker");
      stickerDiv.innerHTML = `
        <h2>${sticker.name}</h2>
        <p>Rarity: <span style="color: ${sticker.rarity.color}">${sticker.rarity.name}</span></p>
        <img src="${sticker.image}" alt="${sticker.name}" width="150">
      `;
      display.appendChild(stickerDiv);
    });
  }

  /**
   * Displays collection data in the webpage by dynamically creating HTML elements.
   * @param {Array} collections - An array of collection objects to display.
   */
  function displayCollections(collections) {
    const display = document.getElementById("data-display");
    display.innerHTML = "";
    collections.forEach(collection => {
      const collectionDiv = document.createElement("div");
      collectionDiv.classList.add("collection");
      collectionDiv.innerHTML = `
        <h2>${collection.name}</h2>
        <img src="${collection.image}" alt="${collection.name}" width="150">
      `;
      display.appendChild(collectionDiv);
    });
  }

  /**
   * Displays crate data in the webpage by dynamically creating HTML elements.
   * @param {Array} crates - An array of crate objects to display.
   */
  function displayCrates(crates) {
    const display = document.getElementById("data-display");
    display.innerHTML = "";
    crates.forEach(crate => {
      const crateDiv = document.createElement("div");
      crateDiv.classList.add("crate");
      crateDiv.innerHTML = `
        <h2>${crate.name}</h2>
        <p>Type: ${crate.type}</p>
        <img src="${crate.image}" alt="${crate.name}" width="150">
      `;
      display.appendChild(crateDiv);
    });
  }

  /**
   * Displays key data in the webpage by dynamically creating HTML elements.
   * @param {Array} keys - An array of key objects to display.
   */
  function displayKeys(keys) {
    const display = document.getElementById("data-display");
    display.innerHTML = "";
    keys.forEach(key => {
      const keyDiv = document.createElement("div");
      keyDiv.classList.add("key");
      keyDiv.innerHTML = `
        <h2>${key.name}</h2>
        <img src="${key.image}" alt="${key.name}" width="150">
      `;
      display.appendChild(keyDiv);
    });
  }

  /**
   * Displays collectible data in the webpage by dynamically creating HTML elements.
   * @param {Array} collectibles - An array of collectible objects to display.
   */
  function displayCollectibles(collectibles) {
    const display = document.getElementById("data-display");
    display.innerHTML = "";
    collectibles.forEach(collectible => {
      const collectibleDiv = document.createElement("div");
      collectibleDiv.classList.add("collectible");
      collectibleDiv.innerHTML = `
        <h2>${collectible.name}</h2>
        <p>Rarity: <span style="color: ${collectible.rarity.color}">
        ${collectible.rarity.name}</span></p>
        <img src="${collectible.image}" alt="${collectible.name}" width="150">
      `;
      display.appendChild(collectibleDiv);
    });
  }

  /**
   * Displays agent data in the webpage by dynamically creating HTML elements.
   * @param {Array} agents - An array of agent objects to display.
   */
  function displayAgents(agents) {
    const display = document.getElementById("data-display");
    display.innerHTML = "";
    agents.forEach(agent => {
      const agentDiv = document.createElement("div");
      agentDiv.classList.add("agent");
      agentDiv.innerHTML = `
        <h2>${agent.name}</h2>
        <p>Team: ${agent.team.name}</p>
        <img src="${agent.image}" alt="${agent.name}" width="150">
      `;
      display.appendChild(agentDiv);
    });
  }

  /**
   * Displays patch data in the webpage by dynamically creating HTML elements.
   * Each patch object is presented with its name, rarity, and an image.
   * @param {Array} patches - An array of patch objects to display.
   */
  function displayPatches(patches) {
    const display = document.getElementById("data-display");
    display.innerHTML = "";
    patches.forEach(patch => {
      const patchDiv = document.createElement("div");
      patchDiv.classList.add("patch");
      patchDiv.innerHTML = `
        <h2>${patch.name}</h2>
        <p>Rarity: <span style="color: ${patch.rarity.color}">${patch.rarity.name}</span></p>
        <img src="${patch.image}" alt="${patch.name}" width="150">
       `;
      display.appendChild(patchDiv);
    });
  }

  /**
   * Displays graffiti data in the webpage by dynamically creating HTML elements.
   * Each graffiti is represented with its name, rarity, and an image that illustrates
   * the graffiti style.
   * @param {Array} graffiti - An array of graffiti objects to display.
   */
  function displayGraffiti(graffiti) {
    const display = document.getElementById("data-display");
    display.innerHTML = "";
    graffiti.forEach(graffito => {
      const graffitiDiv = document.createElement("div");
      graffitiDiv.classList.add("graffiti");
      graffitiDiv.innerHTML = `
        <h2>${graffito.name}</h2>
        <p>Rarity: <span style="color: ${graffito.rarity.color}">
        ${graffito.rarity.name}</span></p>
        <img src="${graffito.image}" alt="${graffito.name}" width="150">
      `;
      display.appendChild(graffitiDiv);
    });
  }

  /**
   * Displays music kit data in the webpage by dynamically creating HTML elements.
   * Each music kit is displayed with its name, rarity, and an image of the album cover
   * or related artwork.
   * @param {Array} musicKits - An array of music kit objects to display.
   */
  function displayMusicKits(musicKits) {
    const display = document.getElementById("data-display");
    display.innerHTML = "";
    musicKits.forEach(musicKit => {
      const musicKitDiv = document.createElement("div");
      musicKitDiv.classList.add("music-kit");
      musicKitDiv.innerHTML = `
        <h2>${musicKit.name}</h2>
        <p>Rarity: <span style="color: ${musicKit.rarity.color}">
        ${musicKit.rarity.name}</span></p>
         <img src="${musicKit.image}" alt="${musicKit.name}" width="150">
        `;
      display.appendChild(musicKitDiv);
    });
  }

  /**
   * Handles errors during data fetch operations by displaying error messages on the webpage.
   * @param {Error} error - The error object containing the error details.
   */
  function handleError(error) {
    const display = document.getElementById("data-display");
    display.innerHTML = `<p class="error">${error.message}</p>`;
  }
})();
