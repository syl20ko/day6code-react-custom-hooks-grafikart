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

function CommentTable() {
  const [comments, setComments] = useState([]);

  useEffect(function () {
    (async function () {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments?_limit=3"
      );
      const responseData = await response.json();
      if (response.ok) {
        setComments(responseData);
      } else {
        alert(JSON.stringify(responseData));
      }
    })();
  });

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
        {comments.map((c) => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    (async function () {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=5"
      );
      const responseData = await response.json();
      if (response.ok) {
        setTodos(responseData);
      } else {
        alert(JSON.stringify(responseData));
      }
      setLoading(false);
    })();
  });

  if (loading) {
    return "Chargement...";
  }

  return (
    <ul>
      {todos.map((t) => (
        <li key={t.id}>{t.title}</li>
      ))}
    </ul>
  );
}

export default App;
