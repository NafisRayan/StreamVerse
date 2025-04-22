// Mock data for the API service
// In a real application, this would make actual API calls to IMDB or other services

import { Media, Cast, Season, Episode, StreamingSource } from '../types';

// Sample data (this would normally come from the API)
const sampleMedia: Media[] = [
  {
    id: 1,
    title: 'The Matrix',
    media_type: 'movie',
    overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    backdrop_path: '/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg',
    vote_average: 8.1,
    release_date: '1999-03-30',
    genres: [{ id: 28, name: 'Action' }, { id: 878, name: 'Science Fiction' }],
    runtime: 136,
  },
  {
    id: 2,
    title: 'Inception',
    media_type: 'movie',
    overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    poster_path: '/edv5CZvWj09upOsy71SPObV4RdD.jpg',
    backdrop_path: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
    vote_average: 8.3,
    release_date: '2010-07-16',
    genres: [{ id: 28, name: 'Action' }, { id: 878, name: 'Science Fiction' }],
    runtime: 148,
  },
  {
    id: 3,
    name: 'Breaking Bad',
    media_type: 'tv',
    overview: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
    poster_path: '/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    backdrop_path: '/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
    vote_average: 8.5,
    first_air_date: '2008-01-20',
    genres: [{ id: 18, name: 'Drama' }, { id: 80, name: 'Crime' }],
    number_of_seasons: 5,
  },
  {
    id: 4,
    name: 'Stranger Things',
    media_type: 'tv',
    overview: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
    poster_path: '/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    backdrop_path: '/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
    vote_average: 8.3,
    first_air_date: '2016-07-15',
    genres: [{ id: 18, name: 'Drama' }, { id: 9648, name: 'Mystery' }, { id: 878, name: 'Science Fiction' }],
    number_of_seasons: 4,
  },
  {
    id: 5,
    name: 'Attack on Titan',
    media_type: 'tv',
    overview: 'Several hundred years ago, humans were nearly exterminated by Titans. A small percentage of humanity survived by walling themselves in a city protected by extremely high walls. Flash forward to the present and the city has not seen a Titan in over 100 years. Teenage boy Eren and his foster sister Mikasa witness something horrific as the city walls are destroyed by a Colossal Titan that appears out of thin air.',
    poster_path: '/aiy35Evcofzl7hNZJlMrqSfKQRQ.jpg',
    backdrop_path: '/sAzw6I1G9JUxm86KokIDdQeWtaq.jpg',
    vote_average: 8.6,
    first_air_date: '2013-04-07',
    genres: [{ id: 16, name: 'Animation' }, { id: 10759, name: 'Action & Adventure' }],
    number_of_seasons: 4,
  },
  {
    id: 6,
    title: 'Avengers: Endgame',
    media_type: 'movie',
    overview: 'After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos\' actions and restore order to the universe once and for all, no matter what consequences may be in store.',
    poster_path: '/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    backdrop_path: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    vote_average: 8.3,
    release_date: '2019-04-26',
    genres: [{ id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }, { id: 878, name: 'Science Fiction' }],
    runtime: 181,
  },
  {
    id: 7,
    title: 'Spirited Away',
    media_type: 'movie',
    overview: 'A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.',
    poster_path: '/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
    backdrop_path: '/Ab8mkHmkYADjU7wQiOkia9BzGvS.jpg',
    vote_average: 8.5,
    release_date: '2001-07-20',
    genres: [{ id: 16, name: 'Animation' }, { id: 10751, name: 'Family' }, { id: 14, name: 'Fantasy' }],
    runtime: 125,
  },
  {
    id: 8,
    name: 'One Piece',
    media_type: 'tv',
    overview: 'Years ago, the fearsome Pirate King, Gold Roger was executed leaving a huge pile of treasure and the famous "One Piece" behind. Whoever claims the "One Piece" will be named the new King of the Pirates.',
    poster_path: '/e3NBGiAifW9Xt8xD5tpARskjccO.jpg',
    backdrop_path: '/mBxsapX4DNhH1XkOlLp15He5sxL.jpg',
    vote_average: 8.7,
    first_air_date: '1999-10-20',
    genres: [{ id: 10759, name: 'Action & Adventure' }, { id: 16, name: 'Animation' }],
    number_of_seasons: 20,
  },
];

const genresList = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

const sampleCast: Cast[] = [
  { id: 1, name: 'Keanu Reeves', character: 'Neo', profile_path: '/4D0PpNI0kmP58hgrwGC3wCjxhnm.jpg' },
  { id: 2, name: 'Carrie-Anne Moss', character: 'Trinity', profile_path: '/xD4jTA3KmVp5Rq3aHcymL9DUGjD.jpg' },
  { id: 3, name: 'Laurence Fishburne', character: 'Morpheus', profile_path: '/8suOhUmPbfKqDM1iyuMcRtrUdqN.jpg' },
  { id: 4, name: 'Hugo Weaving', character: 'Agent Smith', profile_path: '/3rtMxqqII4XTgpzP7fKVEUjLRNT.jpg' },
  { id: 5, name: 'Gloria Foster', character: 'Oracle', profile_path: '/7QzRrm8jEPVjm7sdIUJcBUNdFQm.jpg' },
];

const sampleSeasons: Season[] = [
  {
    id: 1,
    name: 'Season 1',
    season_number: 1,
    episodes: [
      { id: 101, name: 'Pilot', overview: 'The first episode of the series.', episode_number: 1, still_path: '/9GvhICFMiRQA82SOgUJJclHtsQL.jpg', air_date: '2013-04-07' },
      { id: 102, name: 'The First Battle', overview: 'The survey corps face their first titan battle.', episode_number: 2, still_path: '/eWECfJCCWh1jjOfFbPnYs5AL3s3.jpg', air_date: '2013-04-14' },
      { id: 103, name: 'A Dim Light Amid Despair', overview: 'Eren discovers an important ability.', episode_number: 3, still_path: '/A5T7NlC3xW4uDtYa2QyOpn2Ls0K.jpg', air_date: '2013-04-21' },
    ]
  },
  {
    id: 2,
    name: 'Season 2',
    season_number: 2,
    episodes: [
      { id: 201, name: 'Beast Titan', overview: 'A mysterious titan appears outside the walls.', episode_number: 1, still_path: '/iqPJH9AdWPr49E6LXmxHjWWGZod.jpg', air_date: '2017-04-01' },
      { id: 202, name: 'I\'m Home', overview: 'The scouts encounter new challenges.', episode_number: 2, still_path: '/pLZcUMjdaHxZQFpNXYJjZt1imTX.jpg', air_date: '2017-04-08' },
    ]
  }
];

const sampleStreamingSources: StreamingSource[] = [
  { id: 1, url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '720p', provider: 'Main Server' },
  { id: 2, url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', quality: '1080p', provider: 'Main Server' },
  { id: 3, url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', quality: '480p', provider: 'Backup Server' },
];

// Simulate API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API functions
export const getTrending = async (): Promise<Media[]> => {
  await delay(800);
  return sampleMedia.slice(0, 8);
};

export const getPopularMovies = async (): Promise<Media[]> => {
  await delay(600);
  return sampleMedia.filter(item => item.media_type === 'movie');
};

export const getPopularTVShows = async (): Promise<Media[]> => {
  await delay(700);
  return sampleMedia.filter(item => item.media_type === 'tv');
};

export const getPopularAnime = async (): Promise<Media[]> => {
  await delay(500);
  return [sampleMedia[4], sampleMedia[6], sampleMedia[7]];
};

export const getMediaByCategory = async (category: string, filters: any): Promise<Media[]> => {
  await delay(1000);
  let results = [...sampleMedia];
  
  // Apply category filter
  if (category !== 'all') {
    if (category === 'movies') {
      results = results.filter(item => item.media_type === 'movie');
    } else if (category === 'tv') {
      results = results.filter(item => item.media_type === 'tv');
    } else if (category === 'anime') {
      results = [sampleMedia[4], sampleMedia[6], sampleMedia[7]];
    }
  }
  
  // Apply genre filter
  if (filters.genres && filters.genres.length > 0) {
    results = results.filter(item => 
      item.genres?.some(genre => filters.genres.includes(genre.id))
    );
  }
  
  // Apply year filter
  results = results.filter(item => {
    const year = parseInt((item.release_date || item.first_air_date || '').split('-')[0]);
    return year >= filters.yearRange.min && year <= filters.yearRange.max;
  });
  
  return results;
};

export const searchMedia = async (query: string): Promise<Media[]> => {
  await delay(800);
  const lowerQuery = query.toLowerCase();
  return sampleMedia.filter(item => 
    (item.title || item.name || '').toLowerCase().includes(lowerQuery) ||
    (item.overview || '').toLowerCase().includes(lowerQuery)
  );
};

export const getMediaDetails = async (id: number): Promise<Media> => {
  await delay(1000);
  const media = sampleMedia.find(item => item.id === id);
  
  if (!media) {
    throw new Error('Media not found');
  }
  
  if (media.media_type === 'tv') {
    return {
      ...media,
      seasons: sampleSeasons
    };
  }
  
  return media;
};

export const getSimilarMedia = async (id: number, type: string): Promise<Media[]> => {
  await delay(700);
  return sampleMedia
    .filter(item => item.id !== id && item.media_type === type)
    .slice(0, 6);
};

export const getEpisodes = async (seasonId: number): Promise<Episode[]> => {
  await delay(600);
  const season = sampleSeasons.find(s => s.id === seasonId);
  return season?.episodes || [];
};

export const getStreamingSources = async (
  mediaId: number, 
  mediaType: string, 
  episodeId?: number
): Promise<StreamingSource[]> => {
  await delay(800);
  return sampleStreamingSources;
};

export const getGenres = async (): Promise<{id: number; name: string}[]> => {
  await delay(300);
  return genresList;
};

export const getCast = async (mediaId: number, mediaType: string): Promise<Cast[]> => {
  await delay(500);
  return sampleCast;
};

export const getUserWatchlist = async (): Promise<Media[]> => {
  await delay(800);
  // Mock user watchlist with some sample media
  return [sampleMedia[0], sampleMedia[2], sampleMedia[4]];
};

export const getUserWatchHistory = async (): Promise<Media[]> => {
  await delay(800);
  // Mock user watch history with some sample media
  return [sampleMedia[1], sampleMedia[3]];
};