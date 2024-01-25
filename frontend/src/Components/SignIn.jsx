import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue,RecoilRoot } from "recoil";
import { balanceAtom, userFirstNameAtom, userIdAtom, userLastNameAtom, usernameAtom } from "../stores/Atom";





export function SignIn(){
    return <div>
            <SignInApp />  
        </div>
}

export function SignInApp(){
    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);
    const [userFirstName,setUserFirstName] = useRecoilState(userFirstNameAtom);
    const [userLastName, setUserLastName] = useRecoilState(userLastNameAtom);
    const [usernameAtomValue, setUserNameAtomValue] = useRecoilState(usernameAtom);
    const [userId, setUserId] = useRecoilState(userIdAtom);
    const navigate = useNavigate();
    const [balance,setBalance] = useRecoilState(balanceAtom);

    return <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="box-border h-full w-54 p-4  shadow-2xl">
        <h1 className="text-2xl font-bold text-center pb-4">Sign In</h1>
        <div className="text-slow-Information pb-4 text-center ">Enter your information to access your account</div>

        <div className="w-full max-w-xs text-left">

            <div className=" text-sm font-medium pb-2">Email</div>
            <div className="shadow-sm">
            <input className=" w-80 h-8 rounded-md" type="text"  onChange={(e)=>{
                setUsername(e.target.value);
            }}/>
            </div>
            <br />

            <div className=" text-sm font-medium pb-2">Password</div>
            <div className="shadow-sm">
            <input className="w-80 h-8 rounded-md" type="password"  onChange={(e)=>{
                setPassword(e.target.value);
            }}/>
            </div>
            <br />

        </div>
        <div className="text-center">
            <div >
              <button className="bg-black text-sm text-white w-80 h-8 rounded-md" onClick={()=>{
                    
                fetch("http://localhost:3000/api/v1/user/signin", {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(async function(res){
                const json = await res.json();
                return json;
            }).then(data=>{
                if(!data){
                    alert("Wrong inputs");
                   
                } else {
                    {/*firstName:existingUser.firstName,
                lastName:existingUser.lastName,
                userId:existingUser._id */}

                console.log(data.balance);
                    setUserFirstName((check)=>data.firstName);
                    setUserLastName((check)=>data.lastName);
                    setUserNameAtomValue((check)=>username);
                    setUserId((check)=>data.userId);
                    setBalance((check)=>data.balance);
                    navigate("/dashboard");
                }
            })
              }}>Sign In</button>
        </div>
            <br />
            <h1 className="text-sm">Don't have an account? <button onClick={()=>{
                navigate('/signup');
            }}>Sign Up</button></h1>
            </div>
        
        </div>
        


    </div>
}