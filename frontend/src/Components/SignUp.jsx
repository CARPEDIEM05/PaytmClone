import { useState } from "react";
import {  useNavigate } from "react-router-dom"


export function Signup(){
    const [firstName,setFirstname] = useState(null);
    const [lastName, setLastname] = useState(null);
    const [email,setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const navigate = useNavigate();
    return <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="box-border h-full w-54 p-4  shadow-2xl">
        <h1 className="text-2xl font-bold text-center pb-4">Sign Up</h1>
        <div className="text-slow-Information pb-4 text-center ">Enter your information to create an account</div>

        <div className="w-full max-w-xs text-left">

            <div className=" text-sm font-medium pb-2">First Name</div>
            <div className="shadow-sm">
            <input className=" w-80 h-8 rounded-md" type="text"  onChange={(e)=>{
                setFirstname(e.target.value);
            }}/>
            </div>
            <br />

            <div className=" text-sm font-medium pb-2">Last Name</div>
            <div className="shadow-sm">
            <input className="w-80 h-8 rounded-md" type="text"  onChange={(e)=>{
                setLastname(e.target.value);
            }}/>
            </div>
            <br />

            <div className=" text-sm font-medium pb-2">Email</div>
            <div className="shadow-sm">
            <input className="w-80 h-8 rounded-md" type="text"  onChange={(e)=>{
                setEmail(e.target.value);
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
                {/*username: zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string().min(6) */}
        <button className="bg-black text-sm text-white w-80 h-8 rounded-md" onClick={()=>{
            fetch("http://localhost:3000/api/v1/user/signup",{
                method: "POST",
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    username: email,
                    password: password
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(async function(res){
                const json = await res.json();
                return json;
            }).then(data=>{
                if(data){
                    navigate("/signin");
                } else {
                    alert("Wrong inputs");
                }
            })
        }}>Sign Up</button>
        </div>
            <br />
            <h1 className="text-sm">Already have an account? <button onClick={()=>{
                navigate('/signin');
            }}>Login</button></h1>
            </div>
        
        </div>
        


    </div>
}