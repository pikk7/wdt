import React, {useState} from "react";
import wiki from 'wikijs';
import {Button, Grid} from "@material-ui/core";
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCpB91T2gEBG3T99B71Q-P1FqysJikJ3vM",
    authDomain: "why-drink-today-58bb6.firebaseapp.com",
    projectId: "why-drink-today-58bb6",
    storageBucket: "why-drink-today-58bb6.appspot.com",
    messagingSenderId: "53627491369",
    appId: "1:53627491369:web:716cb6d3a3ed8adb1bb838",
    measurementId: "G-Y2PYY6NKXZ"
};


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const analytics=firebase.analytics();

export default function Reason() {
    const [reasons,setReasons]=useState(null);
    const [getNum,setGetNum]=useState(false);
    const [rand_num,setRandNum]=useState(0);
    const [getDay,setGetDay]=useState("");

    // const [networkDataReceived,setNetworkDataReceived]=useState(false);

   const getReasons=()=>{
       analytics.logEvent("use_app")

       const months=["January","February","March","April","May","June","July","August","September","October","November","December"]
        //const hu_months=["Január","Február","Március","Április","Május","Június","Július","Augusztus","Szeptember","Október","November","December"]
        // const days=[32,30,32,31,32,31,32,32,31,32,31,32]
       let now=new Date();

       let j=now.getMonth();
       let i=now.getDate();
        let getDate=months[j]+" "+i;
        const baseURL='https://en.wikipedia.org/w/api.php'
        wiki({ apiUrl: baseURL})
            .page(getDate)
            .then(page => page.content())
            .then(data=>data[0]["content"])
            .then(data=>data.split('\n'))
            .then((data)=> {
               // setNetworkDataReceived(true);
                data.sort(()=>Math.random()-0.5)
                setReasons(data)
                setGetDay(getDate)
            })
            .catch(( err ) => {
                console.log( err );

                throw err;
            })
    }

    const forward=()=>{
        // console.log(rand_num)
        analytics.logEvent("next_event")
        if(rand_num<reasons.length-1){
            setRandNum(rand_num+1);
        }else{
            setRandNum(0)
        }
    }

    const backward=()=>{
        // console.log(rand_num)

        analytics.logEvent("before_event")

        if(rand_num>0){
            setRandNum(rand_num-1);
        }else{
            setRandNum(reasons.length-1)
        }
    }
    function randomIntFromInterval(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    if(!getNum){
        getReasons();
    }


    if(reasons && !getNum){
        setRandNum(randomIntFromInterval(0,reasons.length))
        setGetNum(true)
    }

    return  (
      <>
          {reasons&&reasons[rand_num]&&
              <div>
                  <h1>{getDay}</h1>
                  <h2>{reasons[rand_num].split(" – ")[0]}</h2>
                  <p>{reasons[rand_num].split(" – ")[1]}</p>

              </div>
          }
          <Grid container justify="center" spacing={3}>
              <Grid  item>
                  <Button variant="contained" color="primary" onClick={backward}>Back</Button>
              </Grid>
              <Grid item>
                  <Button variant="contained" color="primary" onClick={forward}>Forward</Button>
              </Grid>
          </Grid>


  </>
  );
  
}

