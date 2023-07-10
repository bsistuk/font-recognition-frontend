import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect, useState } from 'react';
const HOST_URL = "https://font-recognition-deep.onrender.com"
function App() {
  const [ file, setFile ] = useState(null);
  const [ response, setResponse ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const predict = () => {
    if (file !== null && file !== undefined) {
      // request
      setLoading(true);
      const payload = new FormData();
      payload.append('file', file);
      axios.post(HOST_URL + '/api/upload', payload)
        .then(res => {
          setResponse(res.data);
          setLoading(false);
        })
        .catch(err =>  {
          console.log(err);
          setLoading(false);
        })
    }
  }
  useEffect(() => {
    if (file !== null && file !== undefined) {
      //image preview
      console.log(file)
     const fileReader = new FileReader;

     fileReader.addEventListener('load', () => {
       document.getElementById('img').src = fileReader.result;
     }, false);

     fileReader.readAsDataURL(file);
    }
  }, [file]);
  return (
    <div className="App">
      <section>    
       <div className='wraper text-white'>
          <div className='app-nav p-2'>
            <h1 className='text-white'>Font Recognition System</h1>
          </div>
          <div className='row m-0 p-0'>
            <div className='col-md p-5'>
              <div className='d-flex flex-column justify-content-center align-items-center'>    
                <div className='img-selector'>
                  <img src='' alt='' className='img' id="img"/>
                  <input type='file' onChange={(e)=> setFile(e.target.files[0])} className='img-file'/>
                </div>
                <div className='mt-1'>
                  <h5>{file?file.name:('select the font image.')}</h5>
                </div>
                <div className='mt-5'>
                  <button type='button' onClick={()=>predict()} className='start-btn'>
                    {!loading?(<span className='start-btn-label'>Start</span>):(
                      <div class="spinner-border text-white" role="status">
                    </div>
                    )}
                  </button>
                </div>
              </div>         
            </div> 
            <div className='col-md p-5'>
              <p> This system is based on image recognition by tensorflow python library for CNN </p>
              <div>
                  <h1 className='response'>
                  {response&&response}
                  </h1>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
