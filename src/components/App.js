import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  function handleAddQuestion(newQuestion) {
    // You can add logic here to send the new question to a server or update the state as needed
    // For now, we'll just update the state to simulate adding a new question
    setQuestions([...questions, { ...newQuestion, id: questions.length + 1 }]);
  }

  function handleDeleteQuestion(questionId) {
    // You can add logic here to delete the question from the server or update the state as needed
    // For now, we'll just update the state to simulate deleting a question
    setQuestions(questions.filter((question) => question.id !== questionId));
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion} />
      )}
    </main>
  );
}

export default App;
