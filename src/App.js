import React,{useEffect} from 'react'
import * as qna from '@tensorflow-models/qna';
import * as tf from '@tensorflow/tfjs-core'



var model;

function App() {

const [loading,setLoading] = React.useState(true)
const [fields, setFields] = React.useState({})
const [answers,setAnswers] = React.useState([])
const [noAnswer,setNoAnswer] = React.useState(false)


useEffect(()=>{
  tf.setBackend('webgl')
  qna.load().then(models => {
model=models
setLoading(false)
  })
},[])

const getAnswers=()=>{
  setAnswers([])
  model.findAnswers(fields.question, fields.passage).then(answers => {
    setAnswers(answers)
    if(answers.length==0){
      setNoAnswer(true)
    }
    else{
      setNoAnswer(false)
    }
  });
}



const handleChange = (event) => {
  setFields({ ...fields, [event.target.name]: event.target.value });
};


  return (
   <div style={{textAlign:"center"}}>
    {loading ? <p>Loading Model..</p>
  :
  (<div>
    <p>Enter Passage:</p>
    <textarea onChange = {handleChange} name="passage" rows="20" cols="100"/>
    <p>Enter Question:</p>
    <input onChange = {handleChange} name="question" style={{width:"500px"}}/>
    <button onClick={getAnswers}>Get Answer</button>
    {answers.length>0 && answers.map((v,i)=>{
      return(
<p key={i}>{i+1}. {v.text}</p>
      )
    })}
  </div>)  
  }
  {noAnswer && <p>No Answers</p>}
   </div>
  );
}

export default App;
