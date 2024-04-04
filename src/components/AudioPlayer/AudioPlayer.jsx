function AudioPlayer({ previewUrl }) {
    console.log("Preview URL in AudioPlayer:", previewUrl); 
  
    if (!previewUrl) {
      return <p>Aucun extrait disponible</p>;
    }
  
    return (
      <audio className=" w-[40%]" controls src={previewUrl}>
        Votre navigateur ne supporte pas l'élément audio.
      </audio>
    );
  }
  
    export default AudioPlayer; 