import { useState ,useEffect, useMemo} from "react"
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { balanceAtom, friendsNameAtom, friendsUsernameAtom, userFirstNameAtom, userIdAtom } from "../stores/Atom";
import {  useNavigate } from "react-router-dom";


export function Dashboard(){
    
    return( <div>
            <DashboardApp />    
  </div>)

    

}


function DashboardApp(){
    const navigate = useNavigate();
    const balance = useRecoilValue(balanceAtom)
    const userFirstName = useRecoilValue(userFirstNameAtom);
    const [friendsUsername, setFriendsUsername] = useRecoilState(friendsUsernameAtom);
    const [friendsName, setFriendsName] = useRecoilState(friendsNameAtom);

    const [users,setUsers] = useState([]);

    const [filter,setFilter] = useState([]);

    fetch("http://localhost:3000/api/v1/user/allUsers").then(async function(res){
        const json = await res.json();
        setUsers(json.users);
    })

    const filteredUsers = useMemo(()=>{
        return users.filter(user => user.firstName.includes(filter));
    },[users,filter])
    
    

    return( <div className="box-border h-screen w-screen p-4 ">
        <div className="flex  justify-between">
            <h1 className="text-2xl font-bold">Payments App</h1>
            <div className=" flex items-center">
            <h2 className="mr-2">Hello {userFirstName}  </h2>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
</div>
        </div>
        <div className=" h-0.5 w-full mt-4 mb-7 bg-grey shadow-sm"></div>

        <div>
            <h1 className="text-lg font-semibold">Your Balance ₹{balance}</h1>
        </div>

        <div>
            <input type="text" className=" h-10 w-full border-2 border-grey shadow-inner px-2 mt-2" placeholder="Search users...."
             onChange={(e)=>{
                setFilter(e.target.value);
             }}/>
           
        </div>
        <div className=" pt-4">
        {filteredUsers.map(function(user){
       return <div className="flex  justify-between pb-2">
        <div className="flex">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
            <h1 className="pl-2 text-lg font-semibold">{user.firstName}</h1>
            <h1>{user.username}</h1>
            </div>
            <button className="bg-black text-sm text-white w-32 h-8 rounded-md" onClick={()=>{
                setFriendsUsername((check)=>user.username);
                setFriendsName((check)=>user.firstName);

                navigate("/sendmoney");
            }}>Send Money</button>
            </div>
      
    })}
        </div>
        
    </div>)
}


