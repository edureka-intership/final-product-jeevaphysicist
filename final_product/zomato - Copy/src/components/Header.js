import React,{useState,useEffect} from 'react';
// import "../Styles/Header.css";
import "../styles/Restaurantdetails.css"
import Modal from "react-modal";
import jwt_decode from "jwt-decode" ;
import {GoogleOAuthProvider,GoogleLogin} from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';


Modal.setAppElement("#root");


// modal styling
const customStyles = {
    content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    input:{
       width:"300px"
    }
         }     
   };

export default function Header(props) {

    const [loginmodal,setLoginmodal] = useState(false);

    const [createaccountmodal,setCreateaccountmodal] = useState(false);
   
    const [isloggedIn,setIsloggedin] = useState(false);

    const [username,setUsername] =useState('');

    const [password,Setpassword] =useState('');

    const [FirstName,setFirstName] =useState('');

    const [LastName,setLastName] =useState('');

    const [LogginError,setLogginError] =useState(undefined);

    const [SignupError,setSignupError] =useState(undefined);

    const [local,setLocal] = useState([]);

useEffect(()=>{
  
  if(props.login == true){
    setLoginmodal(true);
  }

},[])

 


    useEffect(()=>{
        setLocal(undefined);
        let loginvalue = localStorage.getItem('user');
        let islogged = localStorage.getItem('isloggedIn');
        console.log("Login value : ",loginvalue);
        if(loginvalue != undefined ){
            loginvalue=JSON.parse(loginvalue);
            setLocal(loginvalue);
            setIsloggedin(islogged);
           // console.log("local ==",local[0].FirstName);
        }
        
      },[loginmodal])
     

     //login handler
     const loginhandler = ()=>{
        console.log("loginhandler !!!!!");
        const  req = {
           email:username,
           password:password
        };
        console.log("req :",req);
        fetch(`http://localhost:8080/createaccount/login`,{method:"POST",
                                             headers:{"Content-Type":"application/json"},
                                             body:JSON.stringify(req)
                                            }).then(res=>res.json())
                                            .then((result)=>{
                                               console.log("result",result);
                                               const user = result. UserData;
                                               console.log("user",user);
                                               if(user != undefined){
                                                localStorage.setItem("user",JSON.stringify(user));
                                                localStorage.setItem("isloggedIn",true)                                         
                                                setIsloggedin(true);
                                                setLogginError(undefined);
                                                setLoginmodal(false);
                                               }
                                               else{
                                                setIsloggedin(false);
                                                setLogginError("username or password");
                                               }
                                               
                                            })
                                             .catch(err=>{
                                               setIsloggedin(false);
                                               setLogginError("username or password");
                                             })
                                      }
                                      
  
      
    //signuphandler 
    
    const signuphandler = ()=>{
     console.log("signuphandler !!!!");
     const req ={
        email:username,
        password:password,
        FirstName :FirstName,
        LastName :LastName
     }
     console.log("req",req);
  
     fetch("http://localhost:8080/createaccount/signup",{method:"POST",
                                           headers:{"Content-Type":"application/json"},
                                           body:JSON.stringify(req)
                                          }).then(res=>res.json())
                                          .then(result=>{
                                            console.log("result",result);
                                            const user = result.UserData;
                                            if(user != undefined){
                                              // localStorage.setItem("user",JSON.stringify(user));
                                              // localStorage.setItem("isloggedIn",true)
                                              setIsloggedin(true);
                                              setSignupError(undefined);
                                              setCreateaccountmodal(false);
                                            }
                                            else{
                                              setIsloggedin(false);
                                              setSignupError("Signup Error");
                                            }
                                           
                                           
                                          })
                                          .catch(err=>{
                                            setIsloggedin(false);
                                            setSignupError("Signup Error");
                                          })
                             }
   //google response login
    const responseGoogle = (response) => {
                                        console.log(response);
                                        const responsePayload = jwt_decode(response.credential);
                                        const {email,name,sub,picture}=responsePayload;
                                        const req = {email:email,
                                                     FullName:name,
                                                     ID:sub            
                                                    }
                                        socialmedialoginhandler(req);    
                                        } 
   //google response signup
    const responseGooglesignup = (response) => {
      console.log("signup handler");
      console.log(response);
      const responsePayload = jwt_decode(response.credential);
      const {email,name,sub}=responsePayload;
      const req = {email:email,
                   FullName:name,
                   ID:sub            
                  }
      socialmediasignuphandler(req);    
      } 
  
    //facebook response login
    const responseFacebook = (response) => {
                                           console.log('response',response);
                                           const {email,name,userID}=response;
                                           const req = {email:email,
                                                        FullName:name,
                                                        ID:userID            
                                                       }
  
                                           socialmedialoginhandler(req);  
                                           } 
  
   //facebook response signup
    const responseFacebooksignup = (response) => {
      console.log("signup handler");
      console.log('response',response);
      const {email,name,userID}=response;
      const req = {email:email,
                   FullName:name,
                   ID:userID            
                  }
  
      socialmediasignuphandler(req);  
      } 
                                       
  
          
     //socialmedia signup handler
          const socialmediasignuphandler = (userdata)=>{        
            fetch('http://localhost:8080/createaccount/socialSignUp',{
              method:"POST",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify(userdata)
             }).then(res=>res.json())
             .then(result=>{
              console.log("Result : ",result);
              const user = result.UserData;
              if( user != undefined){
                // localStorage.setItem("user",JSON.stringify(user));
                // localStorage.setItem("isLoggedIn",true)
                setIsloggedin(true);
                setSignupError(undefined);
                setCreateaccountmodal(false);
              }
              else{
                setIsloggedin(false);
                setSignupError("Signup Error");
              }
              
             
            })
            .catch(err=>{
              setIsloggedin(false);
              setSignupError("Signup Error");
            })
        
             
          }
  
          //socialmedial login handler
          const socialmedialoginhandler =(userdata)=>{
            fetch('http://localhost:8080/createaccount/socialLogin',{
              method:"POST",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify(userdata)
             }).then(res=>res.json())
             .then(result=>{
              console.log("Result : ",result);
              const user = result.UserData;
              if(user != undefined){
                localStorage.setItem("user",JSON.stringify(user));
                localStorage.setItem("isloggedIn",true);
                setIsloggedin(true);
                setSignupError(undefined);
                setLoginmodal(false);
              }
              else{
                setIsloggedin(false);
                setLogginError("login not exist ");
              }
            })
            .catch(err=>{
              setIsloggedin(false);
              setLogginError("login not exist ");
            })
                                            
                                         
           }
  
   
               console.log("local : ",local);
  
                       
  
  
       //logouthandler
       
       const logouthandler = ()=>{
                                 localStorage.removeItem("user");
                                 localStorage.removeItem("isloggedIn");
                                 setLocal(undefined);
                                 setIsloggedin(false);                          
                                 }
  



  return (
  <React.Fragment>
     <div className='logo-part'>
            <div className='row mx-auto'>
                <div className='col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1'></div>
                <div className='col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 logo'>e!</div>
                <div className='col-12 col-sm-12 col-md-3 col-lg-4 col-xl-4'></div>
                <div className='col-12 col-sm-12 col-md-5 col-lg-2 col-xl-2 my-3 '>
                  {isloggedIn && (local !== undefined && local.length >0)?<span className='login '>{ local[0].FirstName || local[0].FullName} </span> : <button className="login" onClick={()=>{setLoginmodal(true)}}>Login</button>}
                </div>
                <div className='col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1 my-3'>
                   {isloggedIn && (local !== undefined && local.length >0)?<button className='create' onClick={()=>logouthandler()}>Logout</button>:<button className="create" onClick={()=>{setCreateaccountmodal(true)}} >SignUp</button>}
                </div>
                <div className='col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2'></div>                
            </div>     
     </div>

      {/* Modals */}
      {/* login modal */}
      <Modal  isOpen={loginmodal}
              style={customStyles}
       >
               Login <button className='btn btn-danger btn-close' onClick={()=>{setLoginmodal(false)}} style={{float:'right'}}></button>
               <br/><br/>
              
            <form className='form'>
               <div>
                  {LogginError ? <div className='alert alert-danger'>{LogginError}</div> : null}
                  <input type="text" className="form-control" placeholder="Email" required onChange={(e)=>{setUsername(e.target.value);setLogginError(undefined)}}/><br/>
                  <input type="password" className="form-control" placeholder="password" required onChange={(e)=>{Setpassword(e.target.value);setLogginError(undefined)}} />
                   <br/>
                   <div className='text-center'>
                     <input type="button" className='btn btn-success'  value="Login" onClick={()=>loginhandler()} />&nbsp;&nbsp;
                     <button className='btn btn-danger' onClick={()=>setLoginmodal(false)}>cancel</button>
                   </div>
               <br/>
               <div>OR</div>
               <br/>
               <div>
                  <FacebookLogin
                    appId="507694954493637"
                    fields="name,email,picture"
                    callback={responseFacebook}
                    cssClass="btn btn-secondary"
                    icon="fa-facebook"/>
               </div>
               <br/>
               <div>OR</div>
               <div>          
                  <GoogleOAuthProvider clientId="426372783422-8qfhleea1m8oq7cmhc26nkoj5grnnrke.apps.googleusercontent.com">
                       <GoogleLogin
                           onSuccess={responseGoogle}
                           onError={() => {
                                          console.log('Login Failed');
                                         }}
                        />
                  </GoogleOAuthProvider>
               </div>  
          </div>               
         </form> 
  </Modal>


  {/* signup modal */}
  <Modal  isOpen={createaccountmodal}
             style={customStyles}
            >
               <span className='text-success' style={{fontSize:"20px"}} >signup</span>  <button className='btn btn-danger btn-close' onClick={()=>{setCreateaccountmodal(false)}} style={{float:'right'}}></button>
               <br/><br/>
              <form className='form'>
               {SignupError? <div className='alert alert-danger'>{SignupError}</div>:null}
               <input type="email" className="form-control" placeholder="Email" required onChange={(e)=>{setUsername(e.target.value);setSignupError(undefined)}}/><br/>
               <input type="password" className="form-control" placeholder="password" required onChange={(e)=>{Setpassword(e.target.value);setSignupError(undefined)}} /><br/>
               <input type="text" className="form-control" placeholder="FirstName" required onChange={(e)=>{setFirstName(e.target.value);setSignupError(undefined)}}/><br/>
               <input type="text" className="form-control" placeholder="LastName" required onChange={(e)=>{setLastName(e.target.value);setSignupError(undefined)}} />
                <br/>
               <div className='text-center'>
                  <input type="button" value="signup" className="btn btn-block btn-success" onClick={()=>{signuphandler()}} />&nbsp;
                  <button className="btn btn-block btn-danger" onClick={()=>{setCreateaccountmodal(false)} }>cancel</button>
               </div>

               <div>
                
               <div>OR</div>
               <FacebookLogin
                    appId="507694954493637"
                    
                    fields="name,email,picture"
                    callback={responseFacebooksignup}
                    cssClass="btn btn-secondary"
                    icon="fa-facebook"/>
               </div>
               <br/>
               <div>OR</div>
              <div>
               <GoogleOAuthProvider clientId="426372783422-8qfhleea1m8oq7cmhc26nkoj5grnnrke.apps.googleusercontent.com">
                       <GoogleLogin
                           onSuccess={responseGooglesignup}
                           onError={() => {
                                          console.log('SignUp  Failed');
                                         }}
                        />
                </GoogleOAuthProvider>
              </div>
        </form>
 </Modal>
             

  </React.Fragment>
  );
}
