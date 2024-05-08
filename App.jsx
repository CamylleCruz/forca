import { useEffect, useState } from "react";
import './App.css';

const palavras = ['gato' , 'cachorro' , 'elefante' , 'macaco', 'gorila', 'girafa', 
'papagaio', 'urubu', 'pica-pau', 'tartaruga', 'topeira']

function Letras ({letras, onClick}){
  return(
    <div className="letras">
      {letras.map(letra => (
        <button key={letra} onClick={() => onClick(letra)} disable={false}>
          {letra}
        </button>
      ))}
    </div>
  );
}

function Forca() {
  const [palavra, setPalavra] = useState('')
  const [LetrasSelecionadas, setLetrasSelecionadas] = useState([])
  const [tentativasErradas, setTentativasErradas] = useState(0);

  function escolherPalavra() {
    return palavras[Math.floor(Math.random() * palavras.length)]
  }

  useEffect(() => {
    setPalavra(escolherPalavra())
    setLetrasSelecionadas([])
    setTentativasErradas(0)
  }, [])

  function verificarLetra(letra) {
    return palavra.includes(letra)
  }

  function handleLetraclick(letra) {
    if (!LetrasSelecionadas.includes(letra)) {
      const novaLista = [...LetrasSelecionadas, letra]
      setLetrasSelecionadas(novaLista);
      if(!verificarLetra(letra)) {
        setTentativasErradas(tentativasErradas + 1)
      }
    }
  }

  function palavraOculta(){
    return palavra.split('').map(letra => (LetrasSelecionadas.includes(letra) ?
    letra: '_')).join(' ');
  }

  useEffect(() => {
    if(palavra && palavra.split('').every(letra => LetrasSelecionadas.includes(letra))) {
      setTimeout(() => {
      alert('Parabéns! Você ganhou! 🥳');
      reiniciarJogo();
    }, 100)
  }
}, [palavra, LetrasSelecionadas])

  useEffect(() => {
    if(tentativasErradas >= 6) {
      setTimeout(() => {
        alert('Game Over');
        reiniciarJogo();
        }, 100)
      }
    }, [tentativasErradas])

    function reiniciarJogo(){
      setPalavra(escolherPalavra());
      setLetrasSelecionadas([]);
      setTentativasErradas(0)
    }

    return(
      <div className="forca">
        <h1> Jogo da Forca </h1>
        <div> Palavra: {palavraOculta()} </div>
        <Letras letras = {
          ['a','b','c','d','e','f','g','h',
          'i','j','k','l','m','n','o','p',
          'q','r','s','t','u','v','w','x',
          'y','z']} onClick = {handleLetraclick}
          />

          {}
          <div> Letras selecionadas: {LetrasSelecionadas.join(',')} </div>
          <div> Tentativas erradas: {tentativasErradas} de 6 </div>
      </div>
    )

}

export default Forca;

  