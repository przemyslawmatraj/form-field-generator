import Form from "./components/Form";

const App = () => {
  return (
    <div className="App">
      <header className="Form-header">
        <h1>Form Field Generator</h1>
        <p>
          This form is generated from a zod schema. It uses react-hook-form and
          MUI for the UI. Feel free to play around with it.
        </p>
      </header>
      <Form />
    </div>
  );
};

export default App;
