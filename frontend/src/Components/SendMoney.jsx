import { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil";
import { balanceAtom, friendsNameAtom, friendsUsernameAtom, usernameAtom } from "../stores/Atom";
import { useNavigate } from "react-router-dom";

export function SendMoney(){
    const [transferAmount, setTransferAmount] = useState(0);
    const [balance,setBalance] = useRecoilState(balanceAtom);
    const username = useRecoilValue(usernameAtom);

    const navigate = useNavigate();
    

    const friendsUserName = useRecoilValue(friendsUsernameAtom);
    const firstName = useRecoilValue(friendsNameAtom);

    return <div>
  
        <div className="flex flex-col items-center justify-center min-h-screen">
        
        <div className="box-border h-full w-80 p-4  shadow-2xl">
            <div>
            <h1 className="text-xl font-bold justify-center flex mb-10">Send Money</h1>
            </div>
            <div className="text-xl font-medium mb-2">
            {firstName}
            </div>
            <div className="text-sm font-medium">
                Amount (in Rs)
            </div>
            <div>
                <input type="text" className="border-2 w-72 h-8 mt-4
                  border-grey shadow-inner px-2 mt-2" placeholder="Enter amount"
                  onChange={(e)=>{
                    setTransferAmount(parseInt(e.target.value));
                  }}/>
            </div>
            <div>
            <button className="bg-green-400 text-sm mt-4 text-white w-72 h-8 rounded-md" onClick={()=>{
               
               fetch("http://localhost:3000/api/v1/account/transfer",{
                method: "POST",
                body: JSON.stringify({
                    sendersusername:username,
                    recieversusername:friendsUserName,
                    amount:transferAmount
                }),
                headers:{
                    "Content-Type":"application/json"
                }
               }).then(async function(res){
                const json = await res.json();
                return json;
               }).then(data=>{
                if(data){
                    setBalance((check)=>balance-transferAmount);
                    navigate("/dashboard");

                } else {
                    alert("Insufficient Balance");
                }
               })

                 
            }} >Initial Transfer</button>
            </div>
        </div>
       
       
    </div>
    </div>

}