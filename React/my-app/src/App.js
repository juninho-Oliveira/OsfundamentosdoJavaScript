
import './App.css';
import CustomButton from './custom/customButton';
import InputVarios from './custom/input';

function App() {
  return (
    <>
    <h1>Botão</h1>
    <CustomButton 
    label={"botão2"}
    onClick={()=> alert('aqui2')}/>

<CustomButton 
    label={"botão2"}
    onClick={()=> alert('aqui2')}/>
    <h2>Inputs</h2>

    <InputVarios tipo="text"  nomeDentro="Digite aqui">input</InputVarios>
    <InputVarios tipo="number"  nomeDentro="Digite o numero">input</InputVarios>
    </>


  );
}

export default App;
