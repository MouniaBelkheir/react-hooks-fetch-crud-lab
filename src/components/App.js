import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch questions when the application loads
    async function fetchQuestions() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:4000/questions");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }

    fetchQuestions();
  }, []);

  async function handleAddQuestion(newQuestion) {
    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });

      if (!response.ok) {
        throw new Error("Failed to add question");
      }

      const data = await response.json();
      setQuestions([...questions, data]);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteQuestion(questionId) {
    try {
      const response = await fetch(
        `http://localhost:4000/questions/${questionId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete question");
      }

      setQuestions(questions.filter((question) => question.id !== questionId));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateCorrectAnswer(questionId, correctIndex) {
    try {
      const response = await fetch(
        `http://localhost:4000/questions/${questionId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ correctIndex }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update correct answer");
      }

      // Update the correctIndex in the local state
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === questionId
            ? { ...question, correctIndex }
            : question
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
          isLoading={isLoading}
        />
      )}
    </main>
  );
}

export default App;
