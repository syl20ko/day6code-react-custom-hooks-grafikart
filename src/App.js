import React, { useState, useEffect } from "react";

/* Custom Hook for toggle */
function useToggle(value = true) {
  let [compteurVisible, setCompteurVisible] = useState(value);

  const toggleCompteur = function (e) {
    setCompteurVisible((compteurVisible) => !compteurVisible);
  };

  return [compteurVisible, toggleCompteur];
}

/* Custom Hook for increment !NOT USED IN THE CODE , only for eg ;) */
/* function useIncrement(initial = 0, step = 1) {
  const [count, setCount] = useState(initial);

  const increment = function (e) {
    e.preventDefault();
    setCount((count) => count + step);
  };

  return [count, increment];
} */

/* Custom Hook (with timer) */
function useAutoIncrement(initialeValue = 0, step = 1) {
  const [count, setCount] = useState(initialeValue);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCount((count) => count + step);
    }, 1000);
    /* pour démonter */
    return function () {
      clearInterval(timer);
    };
  });

  return count;
}

/* Use the custom hook for AutoIncrement the button */
function Compteur() {
  const count = useAutoIncrement(10);

  return <button>Incrémenter : {count}</button>;
}

/* Main App who we used an other custom hook */
function App() {
  const [compteurVisible, toggleCompteur] = useToggle(true);

  /* NOTE: the name of const may change eg :*/
  /* const [blablabla, azerty] = useToggle(true) */
  /* With this config you can replace const in below return function  */

  return (
    <div>
      Afficher le Compteur
      <input
        type="checkbox"
        onChange={toggleCompteur}
        checked={compteurVisible}
      />
      <br />
      {compteurVisible && <Compteur />}
      <TodoList />
      <CommentTable />
    </div>
  );
}

/* Fetch Hook */
function useFetch(url) {
  const [state, setState] = useState({
    items: [],
    loading: true,
  });

  useEffect(function () {
    (async function () {
      const response = await fetch(url);
      const responseData = await response.json();
      if (response.ok) {
        setState({ items: responseData, loading: false });
      } else {
        alert(JSON.stringify(responseData));
        setState({
          items: [],
          loading: false
        })
      }
    })();
  });

  return [state.loading, state.items];
}

/* Comment function with hook*/
function CommentTable() {
  const [loading, items] = useFetch("https://jsonplaceholder.typicode.com/comments?_limit=5");


  if (loading) {
    return 'Chargement...'
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* Todos function with hook*/
function TodoList() {
  const [loading, todos] = useFetch("https://jsonplaceholder.typicode.com/comments?_limit=5");


  if (loading) {
    return 'Chargement...'
  }

  return (
    <ul>
      {todos.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

export default App;
