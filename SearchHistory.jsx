import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearHistory } from "./locationhandler";

export function SearchHistory() {
  const dispatch = useDispatch();
  const searchHistory = useSelector((state) => state.location.searchHistory);

  return (
    <div style={{ padding: "16px" }}>
      <h2>Search History ({searchHistory.length})</h2>
      <button onClick={() => dispatch(clearHistory())}>Clear History</button>

      {searchHistory.length == 0 ? (
        <p>No search history. </p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {searchHistory.map((item, index) => (
            <li
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "8px",
                borderRadius: "4px",
              }}
            >
              <strong>{item.name}</strong> - <span>{item.timestamp}</span>
              {item.status === "SUCCESS" ? (
                <div>
                  <p>{item.formattedAddress}</p>
                  <small>
                    Lat: {item.coordinates.lat}, Lng: {item.coordinates.lng}
                  </small>
                </div>
              ) : (
                <div style={{ color: "red" }}>
                  <small>Failed: {item.error}</small>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
