import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const initialFormData = {
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  };

  const [formData, setFormData] = useState(initialFormData);

  function handleChange(event, index) {
    const { name, value } = event.target;
    if (name === "answers") {
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index] = value;
      setFormData({
        ...formData,
        answers: updatedAnswers,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddQuestion(formData);
    setFormData(initialFormData);
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label>
          Answers:
          {formData.answers.map((answer, index) => (
            <input
              key={index}
              type="text"
              name="answers"
              value={answer}
              onChange={(e) => handleChange(e, index)}
            />
          ))}
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={(e) => handleChange(e)}
          >
            {formData.answers.map((_, index) => (
              <option key={index} value={index}>
                {index + 1}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
