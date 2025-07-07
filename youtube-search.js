async function search(term) {
  const resultContainer = document.getElementById("ytResults");
  resultContainer.innerHTML = '';

  if (!term) return;

  const url = `https://youtube-search-and-download.p.rapidapi.com/search?query=${encodeURIComponent(term)}&type=v&sort=r`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e86f84faccmshe7531a3adaebf33p1321e4jsn094db814c6ce',  // <-- Replace this
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    const videos = data.contents;

    if (!videos || videos.length === 0) {
      resultContainer.innerHTML = '<p>No videos found.</p>';
      return;
    }

    videos.slice(0, 6).forEach(video => {
      const v = video.video;
      const div = document.createElement('div');
      div.className = 'video-card';
      div.innerHTML = `
        <a href="https://www.youtube.com/watch?v=${v.videoId}" target="_blank">
          <img src="${v.thumbnails[0].url}" alt="${v.title}">
          <p>${v.title}</p>
        </a>
      `;
      resultContainer.appendChild(div);
    });
  } catch (err) {
    console.error("YouTube API error:", err);
    resultContainer.innerHTML = '<p>Failed to load videos.</p>';
  }
}
