

const languagesReducer = async (state:any, action:any) => {
  if(!state){
    // let all = await fetch(action.payload, {
    let all = await fetch("http://localhost:5001/mparablas/us-central1/api/getAllLanguages", {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
  }).then(data=> {
      debugger;
      return data.json();
    }).catch(e=>{
      debugger;
    });
    debugger
    state = {
      allLanguges:all,
      userLanguages:[{
        title: "Hebrew",
        flag: "https://mparablas.web.app/images/iw.png"
        },
        {
        title: "English",
        flag: "https://mparablas.web.app/images/en.png"
        },
        {
        flag: "https://mparablas.web.app/images/eo.png",
        title: "Esperanto"
        }]
    };
  }
  switch (action.type) {
    default:
      return state
  }
};

export default languagesReducer;
