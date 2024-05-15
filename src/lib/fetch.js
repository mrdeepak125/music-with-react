export const getSongsByQuery = async (e) => {
    try {
        return await fetch('https://api-jiosaavn.vercel.app/song/?query=' + e);
    }
    catch (e) {
        console.log(e);
    }
};

export const getSongsById = async (e) => {
    try {
        return await fetch('https://api-jiosaavn.vercel.app/song/get/?id=' + e);
    }
    catch (e) {
        console.log(e);
    }
};

export const getSongsLyricsById = async (e) => {
    try {
        return await fetch('https://api-jiosaavn.vercel.app/lyrics?query=' + e);
    }
    catch (e) {
        console.log(e);
    }
};

export const getSongsByArtist = async (artistName) => {
    try {
        const response = await fetch(`https://api-jiosaavn.vercel.app/songs?artist=${artistName}`); // Replace API_ENDPOINT with your actual API endpoint
        return response;
    } catch (error) {
        throw new Error('Error fetching songs by artist:', error);
    }
};