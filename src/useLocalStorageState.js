import { useState,useEffect } from "react";

export function useLocalStorageState(initialState,key){
    const [value, setValue] = useState(function () {
        // get the data from local storage to initialize state
        const storedValue = localStorage.getItem(key);
        return storedValue?JSON.parse(storedValue):initialState; //convert back the data
      });
      useEffect(
        function () {
          localStorage.setItem(key, JSON.stringify(value)); // convert to string and store it
        },
        [value,key]
      );
      return[value,setValue];

}