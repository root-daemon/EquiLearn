export async function fetchYouTubeVideoId(query: string): Promise<string | undefined> {
  try {
    const response = await fetch(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch YouTube data');
    }

    const html = await response.text();
    const match = html.match(/videoId":"([^"]+)"/);
    return match ? match[1] : undefined;
    
  } catch (error) {
    console.error('Error fetching YouTube video:', error);
    return undefined;
  }
} 