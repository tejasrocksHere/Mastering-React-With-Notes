import React, { useEffect, useState } from "react";

function App() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    scrapeContests();
  }, []);

  const scrapeContests = async () => {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Use a proxy to bypass CORS if needed
    const targetUrl = "https://www.codechef.com/contests"; // The URL to scrape from

    try {
      const response = await fetch(targetUrl);
      const htmlString = await response.text();

      // Parse the HTML string
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");

      // Select contest elements
      const contestsElements = doc.querySelectorAll(
        "._table__container_7s2sw_344 ._data__container_7s2sw_533"
      );

      const contestsArray = Array.from(contestsElements).map((contest) => {
        const nameElement = contest.querySelector("a span");
        const linkElement = contest.querySelector("a").href;
        const timerElements = contest.querySelectorAll(
          "._timer__container_7s2sw_590 p"
        );

        const name = nameElement ? nameElement.textContent : "Unknown Contest";
        const link = linkElement || "#";
        const time = `${timerElements[0].textContent} ${timerElements[1].textContent}`;

        return {
          name,
          link,
          time,
        };
      });

      setContests(contestsArray);
      setLoading(false);
    } catch (error) {
      console.error("Error scraping contests:", error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Upcoming Contests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {contests.map((contest, index) => (
            <li key={index}>
              <a href={contest.link} target="_blank" rel="noopener noreferrer">
                {contest.name}
              </a>
              <p>{contest.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
